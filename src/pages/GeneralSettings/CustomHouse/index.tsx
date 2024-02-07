import React from 'react';
import { Link, NavLink, useNavigate, useParams  }  from 'react-router-dom';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';
import IconPlus from '../../components/Icon/IconPlus';
import IconEdit from '../../components/Icon/IconEdit';
import axios from 'axios';



const rowData = [
    {
        id: 1,
        customHouseName: 'Excel House',
        customHouseCode: 999,
        customHouseAddress: 'Excel Port',
        action: '',
    },
    {
        id: 2,
        customHouseName: 'Customs House,Chattogram',
        customHouseCode: 301,
        customHouseAddress: 'Chattogram',
        action: '',
    },
    
];


const index = () => {

    const [customHouseName,setCustomHouseName]=useState("");
    const [customHouseCode,setCustomHouseCode]=useState("");
    const [customHouseAddress,setCustomHouseAddress]=useState("");
    const [action,setAction]=useState("");
      const params = useParams();
      const navigate = useNavigate();

      const getCustomHousetDetails = async()=>{
        const token = localStorage.getItem('Token');
        if(token){
            const bearer = JSON.parse(token);
            const headers= { Authorization: `Bearer ${bearer}` }

        await axios.get(`http://localhost:8080/bmitvat/api/unit/edit/${params.id}`,{headers})
            .then((response) => {
                // setInitialRecords(response.data);
                const data = response.data;
                console.log(data);
                setCustomHouseName(data.customHouseName)
                setCustomHouseCode(data.customHouseCode)
                setCustomHouseAddress(data.customHouseAddress)
                setAction(data.action)
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
        }

        // let result = await axios.get( `http://localhost:8080/bmitvat/api/unit/${params.id}`);
        // if(result){
        // const data = result.data;
        // setName(data.unitName)
        // setAbbr(data.abbr)
        // setStatus(data.status)
        // }
        }






    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Export Table'));
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
                    item.customHouseName.toLowerCase().includes(search.toLowerCase()) ||
                    item.customHouseCode.toString().toLowerCase().includes(search.toLowerCase()) ||
                    item.customHouseAddress.toLowerCase().includes(search.toLowerCase()) ||
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

    // const header = ['Id', 'Unit Name', 'customHouseAddress', 'Status', 'Action' ];


    return (
        <div>
            <div className="panel flex items-center justify-between flex-wrap gap-4 text-black">
                <h2 className="text-xl font-bold">Custom House</h2>
                <div className="flex items-center flex-wrap gap-3">
                    <Link to="/pages/customHouse/custom/add" className="btn btn-primary gap-1">
                        <IconPlus />
                        Add New
                    </Link>
                </div>
            </div>

            <div className="panel mt-6">
                
                <div className="datatables">
                <DataTable
                        highlightOnHover
                        className="whitespace-nowrap table-hover"
                        records={recordsData}
                        columns={[
                            { accessor: 'id', title: 'Id', sortable: true },
                            { accessor: 'customHouseName', title: 'Custom House Name', sortable: true },
                            { accessor: 'customHouseCode', title: 'Custom House Code', sortable: true },
                            { accessor: 'customHouseAddress', title: 'Custom House Address', sortable: true },
                            {
                                accessor: 'action',
                                title: 'Action',
                                sortable: false,
                                textAlignment: 'center',
                                render: ({ action }) => (
                                    <div className="flex gap-4 items-center w-max mx-auto">
                                        <NavLink to="/pages/customHouse/custom/edit" className="flex btn btn-outline-primary btn-sm m-1 p-2">
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
        </div>
    );
};

export default index;
