import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import sortBy from 'lodash/sortBy';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';
import IconPlus from '../../../components/Icon/IconPlus';
import IconEdit from '../../../components/Icon/IconEdit';
import axios from 'axios';


const index = () => {

    const col = ['bomNo', 'hsCode', 'name', 'unit', 'salesPrice', 'status', 'action'];
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
                    item.bomNo.toString().includes(search.toLowerCase()) ||
                    item.hsCode.toLowerCase().includes(search.toLowerCase()) ||
                    item.name.toLowerCase().includes(search.toLowerCase()) ||
                    item.unit.toLowerCase().includes(search.toLowerCase()) ||
                    item.salesPrice.toLowerCase().includes(search.toLowerCase()) ||
                    item.status.tooltip.toLowerCase().includes(search.toLowerCase()) ||
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
    const header = ['BOM-No', 'HS-Code', 'Name', 'Unit', 'Sales Price', 'Status', 'Action'];

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
                <h2 className="text-xl font-bold">Generate Mushak</h2>

            </div>

            <div className="pt-5">
                {/*----------------- User list start ---------------*/}
                <div className="panel col-span-3 " id="stack_form">
                    <div className="flex md:items-center justify-between md:flex-row flex-col mb-4.5 gap-5">
                        <div className="flex items-center justify-between mb-3">
                            <h5 className="font-semibold text-lg dark:text-white-light">Generate Mushak List</h5>
                        </div>
                    </div>
                    <div className="flex items-center flex-wrap gap-4">
                        <button className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-3 px-20 rounded">
                        <Link to="/pages/report/production/generate_mushak61">
                                General Mushak- 6.1
                            </Link>
                        </button>
                        <button className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-3 px-20 rounded">
                        <Link to="/pages/report/production/generate_mushak62">
                                General Mushak- 6.2
                            </Link>
                        </button>
                        <button className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-3 px-20 rounded">
                        <Link to="/pages/report/production/generate_mushak62">
                                Generate- 6.10
                            </Link>
                            </button>
                        <button className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-3 px-20 rounded">
                            <Link to="/pages/production/generate_mushak62">
                                Sub-Form-ক
                            </Link>
                            </button>
                        <button className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-3 px-24 rounded">
                            <Link to="/pages/production/generate_mushak62">
                                Sub-Form-ক
                            </Link>
                            </button>
                        <button className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-3 px-16 rounded">
                            <Link to="/pages/production/generate_mushak62">
                                General Mushak- 9.1
                            </Link>
                            </button>
                    </div>
                </div>
                {/*-------------- User list end -------------*/}


            </div>
        </div>
    );
};

export default index;