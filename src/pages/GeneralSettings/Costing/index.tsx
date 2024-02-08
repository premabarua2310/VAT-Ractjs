import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useEffect, useState, Fragment } from 'react';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { Dialog, Transition } from '@headlessui/react';
import sortBy from 'lodash/sortBy';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';
import IconFile from '../../components/Icon/IconFile';
import IconPrinter from '../../../components/Icon/IconPrinter';
import IconEdit from '../../../components/Icon/IconEdit';
import IconTrashLines from '../../components/Icon/IconTrashLines';
import IconUpload from '../../../components/Icon/IconUpload';
import IconDownload from '../../../components/Icon/IconDownload';
import IconX from '../../../components/Icon/IconX';
import IconSend from '../../../components/Icon/IconSend';
import axios from 'axios';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import CostingAdd from './components/AddCosting';



const rowData = [
    {
        id: 1,
        costingName: 'Factory Rent',
        costingType: 'Direct Cost',
        status: { tooltip: 'Active', color: 'success' },
        action: '',
    },
    {
        id: 2,
        costingName: 'Bank charges',
        costingType: 'Indirect Cost',
        status: { tooltip: 'Inactive', color: 'danger' },
        action: '',
    },

];


const index = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Costing Table'));
    });
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(rowData, 'id'));
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
            return rowData.filter((item: any) => {
                return (
                    item.id.toString().includes(search.toLowerCase()) ||
                    item.unitName.toLowerCase().includes(search.toLowerCase()) ||
                    item.description.toLowerCase().includes(search.toLowerCase()) ||
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
    const header = ['Id', 'Costing Name', 'Costing Type', 'Status', 'Action'];



    const [addFileModal, setAddFileModal] = useState<any>(false);

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
        setAddFileModal(true);
    };


    // File Upload
    const [codeArr, setCodeArr] = useState<string[]>([]);

    const toggleCode = (name: string) => {
        if (codeArr.includes(name)) {
            setCodeArr((value) => value.filter((d) => d !== name));
        } else {
            setCodeArr([...codeArr, name]);
        }
    };

    const [images, setImages] = useState<any>([]);
    const [images2, setImages2] = useState<any>([]);
    const maxNumber = 69;

    const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setImages(imageList as never[]);
    };

    const onChange2 = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setImages2(imageList as never[]);
    };



    return (
        <div>
            <div className="panel flex items-center justify-between flex-wrap gap-4 text-black">
                <h2 className="text-xl font-bold">Costing</h2>
                <div className="flex items-center flex-wrap gap-3">
                    <button type="button" className="btn btn-primary">
                        <IconDownload className="ltr:mr-2 rtl:ml-2" />
                        Download Sample File
                    </button>
                    <button type="button" className="btn btn-primary" onClick={() => editUser()}>
                        <IconUpload className="ltr:mr-2 rtl:ml-2" />
                        Excel File Upload
                    </button>
                </div>
            </div>

            <Transition appear show={addFileModal} as={Fragment}>
                <Dialog as="div" open={addFileModal} onClose={() => setAddFileModal(false)} className="relative z-[51]">
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-[black]/60" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center px-4 py-8">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                                    <button
                                        type="button"
                                        onClick={() => setAddFileModal(false)}
                                        className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                    >
                                        <IconX />
                                    </button>
                                    <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                        Excel File
                                    </div>
                                    <div className="p-5">
                                        <form>
                                            {/* <div className="mb-5">
                                                <label className="custom-file-container__custom-file">File Upload</label>
                                                <input id="file" type="file" />
                                            </div> */}

                                            <div className="file_upload p-5 relative border-4 border-dotted border-gray-300 rounded-lg width-450px" >
                                                <svg className="text-indigo-500 w-24 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                                                <div className="input_field flex flex-col w-max mx-auto text-center">
                                                    <label className="custom-file-container__custom-file">
                                                        <input id="file" className="text-sm cursor-pointer w-36 hidden" type="file" multiple />
                                                        <div className="text bg-indigo-600 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-indigo-500">Select</div>
                                                    </label>

                                                    <div className="title text-indigo-500 uppercase">or drop files here</div>
                                                </div>
                                            </div>

                                            <div className="flex justify-end items-center mt-8">
                                                <button type="button" className="btn btn-outline-success" onClick={() => setAddFileModal(false)}>
                                                    <IconSend className="ltr:mr-2 rtl:ml-2 " />
                                                    Upload
                                                </button>
                                                <button type="button" className="btn btn-outline-danger ltr:ml-4 rtl:mr-4" onClick={() => setAddFileModal(false)}>
                                                    <IconTrashLines className="ltr:mr-2 rtl:ml-2 " />
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            <div className="pt-5 grid grid-cols-5 grid-flow-row-dense gap-2">
                <div className="panel col-span-2 " >
                    <CostingAdd />
                </div>
                {/*----------------- Costing list start ---------------*/}
                <div className="panel col-span-3 " id="stack_form">
                    <div className="flex items-center justify-between mb-2">
                        <h5 className="font-semibold text-lg dark:text-white-light">Costing List</h5>
                    </div>
                    <div className="flex md:items-center justify-between md:flex-row flex-col mb-2 gap-5">
                        <div className="flex items-center flex-wrap"></div>
                        <input type="search" className="form-input w-auto mb-2" placeholder="Search..." />
                    </div>

                    <div className="datatables">
                        <DataTable
                            highlightOnHover
                            className="whitespace-nowrap table-hover"
                            records={recordsData}
                            columns={[
                                { accessor: 'id', title: 'Id', sortable: true },
                                { accessor: 'costingName', title: 'Costing Name', sortable: true },
                                { accessor: 'costingType', title: 'Costing Type', sortable: true },
                                {
                                    accessor: 'status',
                                    title: 'Status',
                                    sortable: true,
                                    render: ({ status }) => <span className={`p-2 badge badge-outline-${status.color} `}>{status.tooltip}</span>,
                                },
                                {
                                    accessor: 'action',
                                    title: 'Action',
                                    sortable: false,
                                    textAlignment: 'center',
                                    render: ({ action }) => (
                                        <div className="flex gap-4 items-center w-max mx-auto">
                                            <NavLink to="/pages/settings/costing/edit" className="flex btn btn-outline-primary btn-sm m-1 p-2">
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
                {/*-------------- Costing list end -------------*/}
            </div>
        </div>
    );
};

export default index;
