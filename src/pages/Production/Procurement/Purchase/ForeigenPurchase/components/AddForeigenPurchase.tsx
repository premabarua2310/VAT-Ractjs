import React, { ChangeEvent, ChangeEventHandler } from 'react';
import { useEffect, useState, Fragment } from 'react';
import IconFile from '../../../../../components/Icon/IconFile';
import IconTrashLines from '../../../../../components/Icon/IconTrashLines';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../../../store/themeConfigSlice';
import sortBy from 'lodash/sortBy';
import axios from 'axios';


// const rowData = [
//     {
//         description: '',
//         quantity: '',
//         rate: '',
//         value: '',
//         sd: '',
//         sdBDT: '',
//         vatableValue: '',
//         vatType: '',
//         vat: '',
//         vatBDT: '',
//         vds: '',
//         rebate: '',
//         action: '',
//     },
// ];

// const col = ['description', 'quantity', 'rate', 'value', 'sd', 'sdBDT', 'vatableValue', 'vatType', 'vat', 'vatBDT', 'vds', 'rebate', '', ''];


const AddForeigenPurchase = () => {

    const navigate = useNavigate();

    // Function to get today's date in the format "YYYY-MM-DD"
    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [dateValue, setDateValue] = useState(getTodayDate());

    interface suppliers {
        id: number;
        supplierName: string;
        supplierAddress: string;
    }

    interface suggestItem {
        id: number;
        itemName: string;
    }

    interface detailsItem {
        id: number;
        itemName: string;
        hsCodeId: number;
        hsCode: string;
        sd: number;
        vat: number;
    }

    const [all_suppliers, setAllSupplier] = useState<suppliers[]>([]);
    const [all_suggestitm, setSuggestItem] = useState<suggestItem[]>([]);
    const [itemDetails, setItemDetails] = useState<detailsItem[]>([]);
    const [SuppAddress, setAddress] = useState("");

    const [itemId, setItemId] = useState("");
    const [qty, setQty] = useState(0);
    const [rate, setRate] = useState(0);
    const [value, setValue] = useState(0);

    const getSupplierId: ChangeEventHandler<HTMLSelectElement> = (event) => {
        const selectedOptionId = event.target.value;
        // console.log('Selected Option ID:', selectedOptionId);

        const token = localStorage.getItem('Token');
        if (token) {
            const bearer = JSON.parse(token);
            const headers = { Authorization: `Bearer ${bearer}` }

            axios.get(`http://localhost:8080/bmitvat/api/supplier/get_supplier/${selectedOptionId}`, { headers })
                .then((response) => {
                    const data = response.data;
                    setAddress(data.supplierAddress)

                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }
    };

    async function getItemByKeyUp(event: React.FormEvent<HTMLInputElement>) {

        const searchInput = event.currentTarget as HTMLInputElement;
        const suggestionsList = document.getElementById('suggestionsList');

        if (suggestionsList) {
            suggestionsList.style.display = 'block';
        }

        if (!suggestionsList) {
            return;
        }

        if (searchInput.value.trim() === '') {
            suggestionsList.innerHTML = '';
            return;
        }
        const token = localStorage.getItem('Token');
        if (token) {
            const bearer = JSON.parse(token);
            const headers = { Authorization: `Bearer ${bearer}` }

            const searchTerm = searchInput.value;
            try {
                const response = await axios.post('http://localhost:8080/bmitvat/api/item/getItemSuggestions', searchTerm, { headers });
                // <string[]>
                const suggestions = response.data;
                setSuggestItem(response.data);

                suggestionsList.innerHTML = '';
                all_suggestitm.forEach(suggestion => {
                    const listItem = document.createElement('li');
                    listItem.style.width = '500px';
                    listItem.style.padding = '10px';
                    listItem.className = 'suggestion-item';
                    listItem.value = suggestion.id;
                    listItem.textContent = suggestion.itemName;
                    suggestionsList.appendChild(listItem);
                });

                const selectedLiElements = document.querySelectorAll('.suggestion-item');
                selectedLiElements.forEach((liElement) => {
                    liElement.addEventListener('click', () => {
                        const clickedValue = (liElement as HTMLLIElement).value;
                        const liElementTyped = liElement as HTMLElement;
                        liElementTyped.style.backgroundColor = 'green';

                        // Now 'clickedValue' contains the value of the clicked li element
                        console.log('Clicked Value:', clickedValue);
                        if (suggestionsList) {
                            suggestionsList.style.display = 'none';
                        }

                        if (clickedValue > 0) {


                            const token = localStorage.getItem('Token');
                            if (token) {
                                const bearer = JSON.parse(token);
                                const headers = { Authorization: `Bearer ${bearer}` }

                                axios.get(`http://localhost:8080/bmitvat/api/purchase/get_item_details/${clickedValue}`, { headers })
                                    .then((response) => {
                                        const data = response.data;
                                        //  console.log(data.itemName);
                                        setItemDetails(data);
                                        addRow(data);
                                    })
                                    .catch((error) => {
                                        console.error('Error fetching data:', error);
                                    });
                            }


                            function addRow(data: any) {
                                const dataTable = document.getElementById('dataTable') as HTMLTableElement;
                                // const dataTable = document.getElementById('dataTable') as HTMLTableRowElement;
                                var rowData = [data.hsCode, data.itemName];
                                console.log(rowData);

                                const row = document.createElement('tr');
                                // const col = document.createElement('td');

                                const input = document.createElement('input');
                                input.type = 'text';
                                input.value = data.itemName;
                                input.autocomplete = 'off';
                                input.disabled = true;
                                input.style.cssText = 'border: 1px solid black; width: 180px;';

                                const input1 = document.createElement('input');
                                input1.type = 'number';
                                input1.name = name + '[]';
                                input1.className = '';
                                input1.value = data.sd;
                                input1.autocomplete = 'off';
                                input1.min = '0';
                                input1.style.cssText = 'border: 1px solid black; width: 100px;';

                                const input2 = document.createElement('input');
                                input2.type = 'number';
                                input2.name = name + '[]';
                                input2.className = '';
                                input2.value = data.sd;
                                input2.autocomplete = 'off';
                                input2.min = '0';
                                input2.style.cssText = 'border: 1px solid black; width: 100px;';

                                const input3 = document.createElement('input');
                                input3.type = 'number';
                                input3.name = name + '[]';
                                input3.className = '';
                                input3.value = data.sd;
                                input3.autocomplete = 'off';
                                input3.min = '0';
                                input3.style.cssText = 'border: 1px solid black; width: 150px;';


                                const input4 = document.createElement('input');
                                input4.type = 'number';
                                input4.name = name + '[]';
                                input4.className = '';
                                input4.value = data.sd;
                                input4.autocomplete = 'off';
                                input4.min = '0';
                                input4.style.cssText = 'border: 1px solid black; width: 100px;';


                                const input5 = document.createElement('input');
                                input5.type = 'number';
                                input5.name = name + '[]';
                                input5.className = '';
                                input5.value = data.sd;
                                input5.autocomplete = 'off';
                                input5.min = '0';
                                input5.style.cssText = 'border: 1px solid black; width: 100px;';

                                const input6 = document.createElement('input');
                                input6.type = 'number';
                                input6.name = name + '[]';
                                input6.className = '';
                                input6.value = data.sd;
                                input6.autocomplete = 'off';
                                input6.min = '0';
                                input6.style.cssText = 'border: 1px solid black; width: 160px;';

                                const input7 = document.createElement('input');
                                input7.type = 'number';
                                input7.name = name + '[]';
                                input7.className = '';
                                input7.value = data.sd;
                                input7.autocomplete = 'off';
                                input7.min = '0';
                                input7.style.cssText = 'border: 1px solid black; width: 100px;';

                                const input8 = document.createElement('input');
                                input8.type = 'number';
                                input8.name = name + '[]';
                                input8.className = '';
                                input8.value = data.sd;
                                input8.autocomplete = 'off';
                                input8.min = '0';
                                input8.style.cssText = 'border: 1px solid black; width: 100px;';

                                const input9 = document.createElement('input');
                                input9.type = 'number';
                                input9.name = name + '[]';
                                input9.className = '';
                                input9.value = data.sd;
                                input9.autocomplete = 'off';
                                input9.min = '0';
                                input9.style.cssText = 'border: 1px solid black; width: 100px;';


                                const input10 = document.createElement('input');
                                input10.type = 'number';
                                input10.name = name + '[]';
                                input10.className = '';
                                input10.value = '';
                                input10.autocomplete = 'off';
                                input10.min = '0';
                                input10.style.cssText = 'border: 1px solid black; width: 100px;';

                                const input11 = document.createElement('input');
                                input11.type = 'number';
                                input11.name = name + '[]';
                                input11.className = '';
                                input11.value = data.vat;
                                input11.autocomplete = 'off';
                                input11.min = '0';
                                input11.style.cssText = 'border: 1px solid black; width: 100px;';


                                const input12 = document.createElement('input');
                                input12.type = 'number';
                                input12.name = name + '[]';
                                input12.className = '';
                                input12.value = '';
                                input12.autocomplete = 'off';
                                input12.min = '0';
                                input12.style.cssText = 'border: 1px solid black; width: 180px;';

                                // const trtd= row.appendChild(col);

                                const newRow = dataTable.insertRow();

                                const cell = newRow.insertCell();
                                cell.appendChild(input);
                                const cell1 = newRow.insertCell();
                                cell1.appendChild(input1);
                                const cell2 = newRow.insertCell();
                                cell2.appendChild(input2);
                                const cell3 = newRow.insertCell();
                                cell3.appendChild(input3);
                                const cell4 = newRow.insertCell();
                                cell4.appendChild(input4);
                                const cell5 = newRow.insertCell();
                                cell5.appendChild(input5);
                                const cell6 = newRow.insertCell();
                                cell6.appendChild(input6);
                                const cell7 = newRow.insertCell();
                                cell7.appendChild(input7);
                                const cell8 = newRow.insertCell();
                                cell8.appendChild(input8);
                                const cell9 = newRow.insertCell();
                                cell9.appendChild(input9);
                                const cell10 = newRow.insertCell();
                                cell10.appendChild(input10);
                                const cell11 = newRow.insertCell();
                                cell11.appendChild(input11);
                                const cell12 = newRow.insertCell();
                                cell12.appendChild(input12);

                                //     // Populate cells with data
                                // rowData.forEach(data => {
                                //     const cell = newRow.insertCell();
                                //     cell.textContent = data;
                                // });
                            }

                        }
                    });
                });
            } catch (error) {
                console.error('Error fetching suggestions:', error);
            }

        }
    };






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
                    item.description.toString().includes(search.toLowerCase()) ||
                    item.quantity.toLowerCase().includes(search.toLowerCase()) ||
                    item.rate.toLowerCase().includes(search.toLowerCase()) ||
                    item.value.toLowerCase().includes(search.toLowerCase()) ||
                    item.sd.toLowerCase().includes(search.toLowerCase()) ||
                    item.sdBDT.toLowerCase().includes(search.toLowerCase()) ||
                    item.vatableValue.toLowerCase().includes(search.toLowerCase()) ||
                    item.vatType.toLowerCase().includes(search.toLowerCase()) ||
                    item.vat.toLowerCase().includes(search.toLowerCase()) ||
                    item.vatBDT.toLowerCase().includes(search.toLowerCase()) ||
                    item.vds.toLowerCase().includes(search.toLowerCase()) ||
                    item.vatBDT.toLowerCase().includes(search.toLowerCase()) ||
                    item.vds.toLowerCase().includes(search.toLowerCase()) ||
                    item.rebate.toLowerCase().includes(search.toLowerCase()) ||
                    item.totalAmount.toLowerCase().includes(search.toLowerCase()) ||
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
    const header = ['Description', 'Quantity', 'Rate', 'Value', 'Sd%', 'SD(BDT)', 'Vatable Value(BDT)', 'VAT Type', 'VAT(%)', 'VAT(BDT)', 'VDS', ''];

    return (
        <div>
            <div className="panel flex items-center justify-between flex-wrap gap-4 text-black">
                <h2 className="text-xl font-bold">Production Foreign Purchase</h2>
            </div>
            <div className="pt-5 gap-2">
                <div className="mb-5">
                    <form className="space-y-5 pt-4">
                        <div className="panel" id="browser_default">
                            <div className="flex items-center justify-between mb-7">
                                <h5 className="font-semibold text-lg dark:text-white-light">Add New Foreign Purchase</h5>
                            </div>
                            <div className="mb-5">
                                <form className="space-y-5" >
                                    <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
                                        <div>
                                            <label htmlFor="getSupplier">Supplier</label>
                                            <select id="getSupplier" onChange={getSupplierId} className="form-select text-dark col-span-4 text-sm" required >
                                                <option>Select Supplier</option>
                                                {all_suppliers.map((option, index) => (
                                                    <option key={index} value={option.id}>
                                                        {option.supplierName}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="browserLname">Supplier Address</label>
                                            <input id="browserLname" type="text" value={SuppAddress} className="form-input" />
                                        </div>
                                        <div>
                                            <label htmlFor="browserLname">Entry Date</label>
                                            <input id="browserLname" type="date" placeholder="" className="form-input" required />
                                        </div>
                                        <div>
                                            <label htmlFor="browserLname">Bill Of Entry</label>
                                            <input id="browserLname" type="text" placeholder="" className="form-input" required />
                                        </div>
                                        <div>
                                            <label htmlFor="browserLname">Bill Of Entry Date</label>
                                            <input id="browserLname" type="date" placeholder="" className="form-input" required />
                                        </div>
                                        <div>
                                            <label htmlFor="browserLname">LC Number</label>
                                            <input id="browserLname" type="text" placeholder="" className="form-input" required />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-6 gap-5 pt-4">
                                        <div>
                                            <label htmlFor="browserLname">LC Date</label>
                                            <input id="browserLname" type="date" placeholder="" className="form-input" required />
                                        </div>
                                        <div>
                                            <label htmlFor="gridState">Custom House</label>
                                            <select id="gridState" className="form-select text-dark col-span-4 text-sm">
                                                <option>Select Custom House</option>
                                                <option>A</option>
                                                <option>B</option>
                                                <option>C</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="browserLname">House Code</label>
                                            <input id="browserLname" type="text" placeholder="" className="form-input" required />
                                        </div>
                                        <div>
                                            <label htmlFor="gridState">Country Of Origin</label>
                                            <select id="gridState" className="form-select text-dark col-span-4 text-sm">
                                                <option>Select Country</option>
                                                <option>A</option>
                                                <option>B</option>
                                                <option>C</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="gridState">Data Source</label>
                                            <select id="gridState" className="form-select text-dark col-span-4 text-sm">
                                                <option>Boe Data</option>
                                                <option>Boe Data</option>
                                                <option>Manual Entry For Service</option>
                                                <option>Manual Entry For BoE</option>
                                            </select>
                                        </div>
                                        <div >
                                            <label htmlFor="gridState">CPC Code</label>
                                            <select id="gridState" className="form-select text-dark col-span-4 text-sm" required>
                                                <option >Select CPC Code</option>
                                                <option>2023-2024</option>
                                                <option>2022-2023</option>
                                            </select>
                                        </div>
                                        <div className='pt-4'>
                                            <label htmlFor="gridState">Fiscal Year</label>
                                            <select id="gridState" className="form-select text-dark col-span-4 text-sm" required>
                                                <option >Please Select</option>
                                                <option>2023-2024</option>
                                                <option>2022-2023</option>
                                            </select>
                                            <h5 className='pt-4 text-danger text-sm font-semibold'>*Please Select Fiscal Year</h5>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-5 gap--x-2 gap-y-3">
                                        <label htmlFor="searchInput" className='col-span-1 text-sm'>Add Items</label>
                                        <input id="searchInput" type="text" placeholder="Enter Product Name" className="form-input py-2.5 text-sm col-span-4" onInput={getItemByKeyUp} />
                                        <ul style={{ cursor: 'pointer' }} className="mt-10 ml-80 absolute bg-slate-300" id="suggestionsList"></ul>
                                    </div>
                                    <div>
                                        <div className="mt-6 mb-6">
                                            <div className="datatables">
                                                <DataTable
                                                    highlightOnHover
                                                    className="whitespace-nowrap table-hover"
                                                    records={recordsData}
                                                    columns={[
                                                        { accessor: 'description', title: 'Description', sortable: true },
                                                        { accessor: 'boeItemNo', title: 'BOE Item No', sortable: true },
                                                        { accessor: 'quantity', title: 'Quantity', sortable: true },
                                                        { accessor: 'assessableValue', title: 'Assessable Value', sortable: true },
                                                        { accessor: 'rate', title: 'Rate(BDT)', sortable: true },
                                                        { accessor: 'cdPercent	', title: 'CD Percent', sortable: true },
                                                        { accessor: 'cdBDT', title: 'CD (BDT)', sortable: true },
                                                        { accessor: 'rdPercent', title: 'RD Percent', sortable: true },
                                                        { accessor: 'rdBDT', title: 'RD(BDT)', sortable: true },
                                                        { accessor: 'sdPercent', title: 'SD Percent', sortable: true },
                                                        { accessor: 'sdBDT', title: 'SD(BDT)', sortable: true },
                                                        { accessor: 'baseValue', title: 'Base Value of VAT(BDT)', sortable: true },
                                                        { accessor: 'vatType', title: 'VAT Type', sortable: true },
                                                        { accessor: 'vatPercent', title: 'VAT Percent', sortable: true },
                                                        { accessor: 'vatBDT', title: 'VAT(BDT)', sortable: true },
                                                        { accessor: 'aitBDT', title: 'AIT Percent', sortable: true },
                                                        { accessor: 'aitBDT', title: 'AIT(BDT)', sortable: true },
                                                        { accessor: 'aitPercent', title: 'AIT Percent', sortable: true },
                                                        { accessor: 'atBDT', title: 'AT(BDT)', sortable: true },
                                                        { accessor: 'rebate', title: 'Rebate', sortable: true },
                                                        { accessor: 'totalAmount', title: 'Total Amount', sortable: true },
                                                        {
                                                            accessor: 'action',
                                                            title: 'Action',
                                                            sortable: false,
                                                            textAlignment: 'center',
                                                        },
                                                    ]}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex-col pt-6 pb-6">
                                            <div className="sm:w-2/5">
                                                <div className="flex items-center justify-between text-lg font-bold">
                                                    <div>Total Vat (BDT)</div>
                                                </div>
                                                <div className="flex items-center justify-between mt-4 text-lg font-bold">
                                                    <div>Total At (BDT)</div>
                                                </div>
                                                <div className="flex items-center justify-between mt-4 font-semibold text-base">
                                                    <div>Grand Total (BDT)</div>
                                                    <div>$0.00</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-5 gap--x-2 gap-y-3">
                                            <label htmlFor="userName" className='col-span-1 text-sm'>Note</label>
                                            <textarea id="userName" placeholder="Notes..." className="form-input py-2.5 text-sm col-span-4" name="user_name" />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center gap-6 pt-9">
                                        <button type="submit" className="btn btn-success gap-2" >
                                            <IconFile className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                            Submit
                                        </button>
                                        <button type="button" className="btn btn-danger gap-2" >
                                            <IconTrashLines className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddForeigenPurchase;
