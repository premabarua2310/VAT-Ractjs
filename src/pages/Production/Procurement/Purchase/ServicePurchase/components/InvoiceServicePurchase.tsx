import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import sortBy from 'lodash/sortBy';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../../../store/themeConfigSlice';
import axios from 'axios';


const InvoiceSerivicePurchase = () => {

    const col = ['serial', 'itemName', 'hsCode', 'quantity', 'rate', 'value', 'sdAmount', 'vatableAmount', 'vatAmount', 'totalAmount'];
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
                    item.serial.toString().includes(search.toLowerCase()) ||
                    item.itemName.toLowerCase().includes(search.toLowerCase()) ||
                    item.hsCode.toLowerCase().includes(search.toLowerCase()) ||
                    item.quantity.toLowerCase().includes(search.toLowerCase()) ||
                    item.rate.toLowerCase().includes(search.toLowerCase()) ||
                    item.value.toLowerCase().includes(search.toLowerCase()) ||
                    item.sdAmount.toLowerCase().includes(search.toLowerCase()) ||
                    item.vatableAmount.toLowerCase().includes(search.toLowerCase()) ||
                    item.vatAmount.toLowerCase().includes(search.toLowerCase()) ||
                    item.totalAmount.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
    }, [search]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
    }, [sortStatus]);
    const header = ['Serial No', 'Item Name', 'HS-Code', 'Quantity', 'Rate', 'Value', 'Sd Amount', 'Vatable Amount', 'Vat Amount', 'Total Amount'];

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
                <h2 className="text-xl font-bold">Invoice</h2>
            </div>

            <div className="pt-2">
                {/*----------------- Invoice Form start ---------------*/}
                <div className="panel col-span-3 mt-6" id="stack_form" >
                    <div id="forms_grid">
                        <div className="mt-2">
                            <form className="space-y-2">
                                <div className="grid grid-cols-2 gap-8">
                                    <div>
                                        <div className='flex sm:flex-row flex-col pb-3'>
                                            <label htmlFor="cuPhone" className="mb-0 sm:w-1/4 sm:ltr:mr-2 rtl:ml-2 font-bold text-sm">Supplier Name:</label>
                                            <p className="flex-1 text-sm font-medium"> Suzhou Star Materials Co. Ltd.</p>
                                        </div>
                                        <div className='flex sm:flex-row flex-col pb-3'>
                                            <label htmlFor="cuPhone" className="mb-0 sm:w-1/4 sm:ltr:mr-2 rtl:ml-2 font-bold text-sm">Supplier Phone:</label>
                                            <p className="flex-1 text-sm font-medium"> </p>
                                        </div>
                                        <div className='flex sm:flex-row flex-col pb-3'>
                                            <label htmlFor="cuPhone" className="mb-0 sm:w-1/4 sm:ltr:mr-2 rtl:ml-2 font-bold text-sm">Supplier Email:</label>
                                            <p className="flex-1 text-sm font-medium"> </p>
                                        </div>
                                        <div className='flex sm:flex-row flex-col pb-3'>
                                            <label htmlFor="cuPhone" className="mb-0 sm:w-1/4 sm:ltr:mr-2 rtl:ml-2 font-bold text-sm">Supplier Address:</label>
                                            <p className="flex-1 text-sm font-medium"> </p>
                                        </div>
                                    </div>
                                    <div>
                                        <div className='flex sm:flex-row flex-col pb-3'>
                                            <label htmlFor="cuPhone" className="mb-0 sm:w-1/4 sm:ltr:mr-2 rtl:ml-2 font-bold text-sm">Date:</label>
                                            <p className="flex-1 text-sm font-medium"> </p>
                                        </div>
                                        <div className='flex sm:flex-row flex-col pb-3'>
                                            <label htmlFor="cuPhone" className="mb-0 sm:w-1/4 sm:ltr:mr-2 rtl:ml-2 font-bold text-sm">Supplier Type:</label>
                                            <p className="flex-1 text-sm font-medium"> </p>
                                        </div>
                                        <div className='flex sm:flex-row flex-col pb-3'>
                                            <label htmlFor="cuPhone" className="mb-0 sm:w-1/4 sm:ltr:mr-2 rtl:ml-2 font-bold text-sm">Supplier TIN:</label>
                                            <p className="flex-1 text-sm font-medium"> </p>
                                        </div>
                                        <div className='flex sm:flex-row flex-col pb-3'>
                                            <label htmlFor="cuPhone" className="mb-0 sm:w-1/4 sm:ltr:mr-2 rtl:ml-2 font-bold text-sm">Country Name:</label>
                                            <p className="flex-1 text-sm font-medium"> </p>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {/*----------------- Invoice Table start ---------------*/}
                <div className="datatables mt-7">
                    <DataTable
                        highlightOnHover
                        className="whitespace-nowrap table-hover"
                        records={recordsData}
                        columns={[
                            { accessor: 'serial', title: 'Serial No', sortable: true },
                            { accessor: 'itemName', title: 'Item Name', sortable: true },
                            { accessor: 'hsCode', title: 'HS-Code', sortable: true },
                            { accessor: 'quantity', title: 'Quantity', sortable: true },
                            { accessor: 'rate', title: 'Rate', sortable: true },
                            { accessor: 'value', title: 'Value', sortable: true },
                            { accessor: 'sdAmount', title: 'Sd Amount', sortable: true },
                            { accessor: 'vatableAmount', title: 'Vatable Amount', sortable: true },
                            { accessor: 'vatAmount', title: 'Vat Amount', sortable: true },
                            { accessor: 'totalAmount', title: 'Total Amount', sortable: true },
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

    );
};

export default InvoiceSerivicePurchase;