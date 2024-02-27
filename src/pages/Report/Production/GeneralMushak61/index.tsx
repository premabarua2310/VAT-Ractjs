import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import IconFile from '../../../components/Icon/IconFile';
import sortBy from 'lodash/sortBy';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import IconEdit from '../../../components/Icon/IconEdit';
import IconDownload from '../../../Components/Icon/IconDownload';
import axios from 'axios';


const index = () => {

    const col = ['month', 'itemName', 'action'];
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
        dispatch(setPageTitle('General Mushak 6.2'));
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
                    item.month.toLowerCase().includes(search.toLowerCase()) ||
                    item.itemName.toLowerCase().includes(search.toLowerCase()) ||
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
    const header = ['Month', 'Item Name', 'Action'];

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
            <div className="panel flex items-center justify-between flex-wrap gap-4 text-black mb-5">
                <h2 className="text-xl font-bold">Generate Mushak 6.1</h2>
            </div>

            <div className="pt-5 gap-2">
                <div className="panel mb-5">
                    <form className="flex gap-4" >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="browserLname">Select Date</label>
                                <input id="browserLname" type="date" placeholder="" className="form-input" required />
                            </div>
                            <div>
                                <label htmlFor="gridState">Items</label>
                                <select id="gridState" className="form-select text-dark col-span-4 text-sm" required >
                                    <option>Select Item</option>
                                    <option>A</option>
                                    <option>B</option>
                                    <option>C</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit" className="h-10 mt-6 gap-4 btn btn-success" >
                            <IconFile />
                            Submit
                        </button>
                    </form>
                </div>
            </div>

            <div className="pt-5">
                {/*----------------- Generate Mushak Table ---------------*/}
                <div className="panel mt-6">
                    <div className="datatables">
                        <DataTable
                            highlightOnHover
                            className="whitespace-nowrap table-hover"
                            records={recordsData}
                            columns={[
                                { accessor: 'month', title: 'Month', sortable: true },
                                { accessor: 'itemName', title: 'Item Name', sortable: true },
                                {
                                    accessor: 'action',
                                    title: 'Action',
                                    sortable: false,
                                    textAlignment: 'center',
                                    render: ({ id }) => (
                                        <div className="flex gap-4 items-center w-max mx-auto">
                                            <NavLink to={"/pages/report/production/generate_mushak62/view"} className="flex btn btn-outline-primary btn-sm m-1 p-2">
                                                <IconEdit className="w-4.5 h-4.5 mr-2" />
                                                View
                                            </NavLink>
                                            <NavLink to={"/pages/report/production/generate_mushak62/down"} className="flex btn btn-outline-primary btn-sm m-1 p-2">
                                                <IconDownload className="w-4.5 h-4.5 mr-2" />
                                                Download
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
            </div>
        </div>
    );
};

export default index;