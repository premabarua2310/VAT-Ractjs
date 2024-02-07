import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import sortBy from 'lodash/sortBy';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import IconPlus from '../../../../components/Icon/IconPlus';
import IconEdit from '../../../../components/Icon/IconEdit';
import axios from 'axios';


const index = () => {

    const col = ['serialNo', 'supplierName', 'vdsNo', 'issueDate', 'invoiceAmount', 'vatAmount', 'vdsAmount', 'receiveAmount', 'action'];
    useEffect(() => {
        axios.get('http://localhost:8080/bmitvat/api/v1/unit/allunits')
            .then((response) => {
                setInitialRecords(response.data);

            })
            .catch((error) => {
                console.error('Error fetching data:', error);

            });
    }, []);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Export Table'));
    });
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState([]);
    const [recordsData, setRecordsData] = useState(initialRecords);

    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'id', direction: 'asc' });

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        setInitialRecords(() => {
            return initialRecords.filter((item: any) => {
                return (
                    item.serialNo.toString().includes(search.toLowerCase()) ||
                    item.supplierName.toLowerCase().includes(search.toLowerCase()) ||
                    item.vdsNo.toLowerCase().includes(search.toLowerCase()) ||
                    item.issueDate.toLowerCase().includes(search.toLowerCase()) ||
                    item.invoiceAmount.toLowerCase().includes(search.toLowerCase()) ||
                    item.vatAmount.toLowerCase().includes(search.toLowerCase()) ||
                    item.vdsAmount.toLowerCase().includes(search.toLowerCase()) ||
                    item.receiveAmount.toLowerCase().includes(search.toLowerCase()) ||
                    item.action.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
    }, [search]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
    }, [sortStatus]);
    const header = ['Serial No', 'Supplier Name', 'VDS No', 'Issue Date', 'Invoice Amount', 'Vat Amount', 'VDS Amount', 'Receive Amount', 'Action'];

    // const changeValue = (e: any) => {
    //     const { value, id } = e.target;
    //     setParams({ ...params, [id]: value });
    // };


    const [addContactModal, setAddContactModal] = useState<any>(false);

    const [defaultParams] = useState({
        file: '',
    });

    const [params, setParams] = useState<any>(JSON.parse(JSON.stringify(defaultParams)));

    const editUser = (user: any = null) => {
        const json = JSON.parse(JSON.stringify(defaultParams));
        setParams(json);
        if (user) {
            let json1 = JSON.parse(JSON.stringify(user));
            setParams(json1);
        }
        setAddContactModal(true);
    };


    return (
        <div>
            <div className="panel flex items-center justify-between flex-wrap gap-4 text-black">
                <h2 className="text-xl font-bold">Receive VDS</h2>
                <div className="flex items-https://www.sqcables.bmitvat.com/Production_sales_creditnote/AddcreditNotecenter flex-wrap gap-3">
                    <Link to="/pages/sales/receive_vds/add" className="btn btn-primary gap-1">
                        <IconPlus />
                        Add New
                    </Link>
                </div>
            </div>

            <div className="pt-5">
                {/*----------------- User list start ---------------*/}
                <div className="panel col-span-3 " id="stack_form">
                    <div className="flex md:items-center justify-between md:flex-row flex-col mb-4.5 gap-5">
                        <div className="flex items-center justify-between mb-3">
                            <h5 className="font-semibold text-lg dark:text-white-light">Receive VDS List</h5>
                        </div>
                        <input type="search" className="form-input w-auto mb-3 " placeholder="Search..." />
                    </div>
                    <div className="datatables">
                        <DataTable
                            highlightOnHover
                            className="whitespace-nowrap table-hover"
                            records={recordsData}
                            columns={[
                                { accessor: 'serialNo', title: 'Serial No', sortable: true },
                                { accessor: 'supplierName', title: 'Supplier Name', sortable: true },
                                { accessor: 'vdsNo', title: 'VDS No', sortable: true },
                                { accessor: 'issueDate', title: 'Issue Date', sortable: true },
                                { accessor: 'invoiceAmount', title: 'Invoice Amount', sortable: true },
                                { accessor: 'vatAmount', title: 'Vat Amount', sortable: true },
                                { accessor: 'vdsAmount', title: 'VDS Amount', sortable: true },
                                { accessor: 'receiveAmount', title: 'Receive Amount', sortable: true },
                                {
                                    accessor: 'action',
                                    title: 'Action',
                                    sortable: false,
                                    textAlignment: 'center',
                                    render: ({ action }) => (
                                        <div className="flex gap-4 items-center w-max mx-auto">
                                            <NavLink to="/pages/user/userRole/edit" className="flex btn btn-outline-primary btn-sm m-1 p-2">
                                                <IconEdit className="w-4.5 h-4.5 mr-2" />
                                                Edit
                                            </NavLink>
                                        </div>
                                    ),
                                },
                            ]}
                            totalRecords={initialRecords.length}
                            recordsPerPage={pageSize}
                            page={page}
                            onPageChange={(p) => setPage(p)}
                            recordsPerPageOptions={PAGE_SIZES}
                            onRecordsPerPageChange={setPageSize}
                            sortStatus={sortStatus}
                            onSortStatusChange={setSortStatus}
                            minHeight={200}
                            paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                        />
                    </div>
                </div>
                {/*-------------- User list end -------------*/}


            </div>
        </div>
    );
};

export default index;