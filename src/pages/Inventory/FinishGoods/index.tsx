import React from 'react';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';
import IconFile from '../../../components/Icon/IconFile';
import { ImageListType } from 'react-images-uploading';
import axios from 'axios';


const rowData = [
  {
    serial: 1,
    itemID: 'superadmin',
    itemName: 'superadmin',
    openingQuantity: 'arifulislamfiverr007@gmail.com',
    openingRate: 22222,
    openingAmount: 2023,
    openingDate: 'Raw Materials',
  },
  {
    serial: 2,
    itemID: 'superadmin',
    itemName: 'superadmin',
    openingQuantity: 'arifulislamfiverr007@gmail.com',
    openingRate: 22222,
    openingAmount: 2023,
    openingDate: 'Raw Materials',
  },
];

const col = ['serial', 'itemID', 'itemName', 'openingQuantity', 'openingRate', 'openingAmount', 'openingDate'];


const index = () => {

  const [date, setDate] = useState();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle('Export Table'));
  });
  const [page, setPage] = useState(1);
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [initialRecords, setInitialRecords] = useState(sortBy(rowData, 'serial'));
  const [recordsData, setRecordsData] = useState(initialRecords);

  const [search, setSearch] = useState('');
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'serial', direction: 'asc' });

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
          item.serial.toString().includes(search.toLowerCase()) ||
          item.itemID.toLowerCase().includes(search.toLowerCase()) ||
          item.itemName.toLowerCase().includes(search.toLowerCase()) ||
          item.openingQuantity.toLowerCase().includes(search.toLowerCase()) ||
          item.openingRate.toLowerCase().includes(search.toLowerCase()) ||
          item.openingAmount.toLowerCase().includes(search.toLowerCase()) ||
          item.openingDate.toLowerCase().includes(search.toLowerCase()) ||
          item.status.tooltip.toLowerCase().includes(search.toLowerCase())
        );
      });
    });
  }, [search]);

  useEffect(() => {
    const data = sortBy(initialRecords, sortStatus.columnAccessor);
    setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
    setPage(1);
  }, [sortStatus]);
  const header = ['Serial', 'Item ID', 'Item Name', 'Opening Quantity', 'Opening Rate', 'Opening Amount', 'Opening Date'];

  // File Upload
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
        <h2 className="text-xl font-bold">Finish Goods Opening Stock</h2>
      </div>

      <div className="pt-5 gap-2">
        <div className="mb-5">
          <form className="space-y-5 pt-4">
            <div className="panel">
              <div className="mb-5">
                <form className="space-y-5 flex items-center justify-center" >
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-5 pr-5">
                    <div>
                      <label htmlFor="gridState">Items</label>
                      <select id="gridState" className="form-select text-dark col-span-4 text-sm" required >
                        <option>Select Item</option>
                        <option>A</option>
                        <option>B</option>
                        <option>C</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="browserLname">Opening Quantity </label>
                      <input id="browserLname" type="number" placeholder="0" className="form-input" required />
                    </div>
                    <div>
                      <label htmlFor="browserLname">Opening Rate</label>
                      <input id="browserLname" type="number" placeholder="0" className="form-input" required />
                    </div>
                    <div>
                      <label htmlFor="browserLname">Opening Amount </label>
                      <input id="browserLname" type="text" placeholder="0" className="form-input" required />
                    </div>
                    <div>
                      <label htmlFor="browserLname">Opening Date</label>
                      <input id="browserLname" type="date" placeholder="" className="form-input" onChange={e => setDate(e.target.value)} required />
                    </div>

                  </div>
                  <button type="submit" className="btn btn-success gap-2" >
                    <IconFile />
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="panel mt-6">
        <div className="flex items-center justify-between mb-6">
          <h5 className="font-semibold text-lg dark:text-white-light">Finish Goods Stock List</h5>
          <input type="search" className="form-input w-auto" placeholder="Search..." />
        </div>
        <div className="datatables">
          <DataTable
            highlightOnHover
            className="whitespace-nowrap table-hover"
            records={recordsData}
            columns={[
              { accessor: 'serial', title: 'Serial', sortable: true },
              { accessor: 'itemID', title: 'Item ID', sortable: true },
              { accessor: 'itemName', title: 'Item Name', sortable: true },
              { accessor: 'openingQuantity', title: 'Opening Quantity', sortable: true },
              // { accessor: 'openingRate', title: 'Opening Rate', sortable: true },
              { accessor: 'openingAmount', title: 'Opening Amount', sortable: true },
              { accessor: 'openingDate', title: 'Opening Date', sortable: true },
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
