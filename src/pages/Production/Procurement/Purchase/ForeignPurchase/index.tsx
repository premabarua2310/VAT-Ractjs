import React from 'react';
import { Link } from 'react-router-dom';
import { useState, Fragment, useEffect } from 'react';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import sortBy from 'lodash/sortBy';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';
import IconPlus from '../../../components/Icon/IconPlus';
import axios from 'axios';


const index = () => {

    const col = ['serial', 'invoiceNo', 'Supplier'];
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
                    item.id.toString().includes(search.toLowerCase()) ||
                    item.invoiceNo.toLowerCase().includes(search.toLowerCase()) ||
                    item.supplier.toLowerCase().includes(search.toLowerCase()) ||
                    item.lcNo.toLowerCase().includes(search.toLowerCase()) 
                );
            });
        });
    }, [search]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
    }, [sortStatus]);
    const header = ['Serial', 'Invoice No', 'Supplier', 'LC No'];

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
                <h2 className="text-xl font-bold">Production Foreign Purchase</h2>
                <div className="flex items-center flex-wrap gap-3">
                    <Link to="/pages/production/foreign_purchase/add" className="btn btn-primary gap-1">
                        <IconPlus />
                        Add New
                    </Link>
                </div>
            </div>

            <div className="pt-5">
                {/*----------------- User list start ---------------*/}
                <div className="panel col-span-3 " id="stack_form">
                    <div className="flex md:items-center justify-between md:flex-row flex-col mb-4.5 gap-5">
                        <div className="flex items-center justify-between mb-6">
                            <h5 className="font-semibold text-lg dark:text-white-light">Local Purchase List</h5>
                        </div>
                        <input type="search" className="form-input w-auto" placeholder="Search..." />
                    </div>

                    <div className="datatables">
                        <DataTable
                            highlightOnHover
                            className="whitespace-nowrap table-hover"
                            records={recordsData}
                            columns={[
                                { accessor: 'serial', title: 'Serial', sortable: true },
                                { accessor: 'invoiceNo', title: 'Invoice No', sortable: true },
                                { accessor: 'supplier', title: 'Supplier', sortable: true },
                                { accessor: 'lcNo', title: 'LC No', sortable: true },
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