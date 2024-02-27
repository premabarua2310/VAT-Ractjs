import React, { ChangeEvent, ChangeEventHandler } from 'react';
import { useEffect, useState, useRef } from 'react';
import IconFile from '../../../../../components/Icon/IconFile';
import IconTrashLines from '../../../../../components/Icon/IconTrashLines';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../../../store/themeConfigSlice';
import sortBy from 'lodash/sortBy';
import axios from 'axios';
// import * as $ from 'jquery';
import { number } from 'yup';


const AddDebitNote: React.FC = () => {
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

    interface chalanNo {
        id: number;
        chalanNo: string;
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
    const [all_chalan, setAllChalanNo] = useState<chalanNo[]>([]);
    const [all_suggestitm, setSuggestItem] = useState<suggestItem[]>([]);
    const [itemDetails, setItemDetails] = useState<detailsItem[]>([]);
    const [SuppAddress, setAddress] = useState("");

    const [supplier, setSupplier] = useState("");
    const [chalanNo, setChalanNo] = useState("");
    const [entryDate, setEntryDate] = useState("");
    const [vehicleInfo, setVehicleInfo] = useState("");
    // const [customerAddress, setSupplierAdd] = useState("");
    // const [chalanDate, setChalanDate] = useState("");
    // const [fiscalYear, setFiscalYear] = useState("");

    const [note, setNote] = useState('');
    const [totalVat, setTotalVat] = useState('');
    const [totalSd, setTotalSD] = useState('');
    const [amountTotal, setTotalAmount] = useState('');


    useEffect(() => {

        const token = localStorage.getItem('Token');

        if (token) {
            const bearer = token.slice(1, -1);

            const headers = { Authorization: `Bearer ${bearer}` }

            axios.get('http://localhost:8080/bmitvat/api/customer/all_customer', { headers })
                .then((response) => {
                    setAllSupplier(response.data);

                })
                .catch((error) => {
                    console.error('Error fetching data:', error);

                });

        }
    }, []);

    const getSupplierId: ChangeEventHandler<HTMLSelectElement> = (event) => {
        const selectedOptionId = event.target.value;

        const token = localStorage.getItem('Token');
        if (token) {
            const bearer = JSON.parse(token);
            const headers = { Authorization: `Bearer ${bearer}` }

            axios.get(`http://localhost:8080/bmitvat/api/customer/get_customer/${selectedOptionId}`, { headers })
                .then((response) => {
                    const data = response.data;
                    setSupplier(data.id)
                    setAddress(data.customerAddress)

                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }
    };

    const getChalanNo: ChangeEventHandler<HTMLSelectElement> = (event) => {
        const selectedOptionId = event.target.value;

        const token = localStorage.getItem('Token');
        if (token) {
            const bearer = JSON.parse(token);
            const headers = { Authorization: `Bearer ${bearer}` }

            axios.get(`http://localhost:8080/bmitvat/api/customer/get_customer/${selectedOptionId}`, { headers })
                .then((response) => {
                    const data = response.data;
                    setChalanNo(data.id)
                    setAddress(data.customerAddress)

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
                setSuggestItem(suggestions);
                // console.log(total);

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
                selectedLiElements.forEach(async (liElement) => {

                    liElement.addEventListener('click', () => {
                        const clickedValue = (liElement as HTMLLIElement).value;
                        const liElementTyped = liElement as HTMLElement;
                        liElementTyped.style.backgroundColor = 'green';

                        // Now 'clickedValue' contains the value of the clicked li element
                        console.log('Clicked Item ID:', clickedValue);
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
                                const dataTable = document.querySelector('#dataTable tbody') as HTMLTableElement;

                                const arrayData: any[] = [];

                                var id = data.id;
                                console.log(id);
                                const inputId = document.createElement('input');
                                inputId.type = 'hidden';
                                inputId.name = 'itemId';
                                inputId.value = data.id;
                                inputId.autocomplete = 'off';
                                inputId.disabled = true;
                                inputId.style.cssText = 'width: 1px;';

                                const input = document.createElement('input');
                                input.type = 'text';
                                input.name = 'itemName';
                                input.value = data.itemName;
                                input.autocomplete = 'off';
                                input.disabled = true;
                                input.style.cssText = 'border: 1px solid black; width: 180px;';

                                const input1 = document.createElement('input');
                                input1.type = 'number';
                                input1.name = 'quantity';
                                input1.className = '';
                                input1.value = '';
                                input1.id = 'qtyId';
                                input1.autocomplete = 'off';
                                input1.min = '0';
                                input1.style.cssText = 'border: 1px solid black; width: 100px;';

                                const input2 = document.createElement('input');
                                input2.type = 'number';
                                input2.name = 'rate';
                                input2.className = 'rateClass';
                                input2.value = '';
                                input1.id = 'rateId';
                                input2.autocomplete = 'off';
                                input2.min = '0';
                                input2.style.cssText = 'border: 1px solid black; width: 100px;';

                                input1.addEventListener('keyup', calculateValue);
                                input2.addEventListener('keyup', calculateValue);


                                function calculateValue() {
                                    const value1 = parseFloat(input1.value) || 0;
                                    const value2 = parseFloat(input2.value) || 0;
                                    const value4 = parseFloat(input4.value) || 0;
                                    const value8 = parseFloat(input8.value) || 0;

                                    const onlyValue = value1 * value2;
                                    input3.value = onlyValue.toString();

                                    //sd
                                    const sdWithValue = (onlyValue * value4) / 100;
                                    input5.value = sdWithValue.toString();

                                    const vatAblValue = onlyValue + sdWithValue;
                                    input6.value = vatAblValue.toString();

                                    // vat
                                    const vatAmout = (vatAblValue * value8) / 100;
                                    input9.value = vatAmout.toString();

                                    const totalAmount = (parseFloat(input6.value) + vatAmout);
                                    input10.value = totalAmount.toString();
                                }

                                const input3 = document.createElement('input');
                                input3.type = 'number';
                                input3.name = 'amount';
                                input3.className = '';
                                input3.value = '';
                                input3.autocomplete = 'off';
                                input3.disabled = true;
                                input3.min = '0';
                                input3.style.cssText = 'border: 1px solid black; width: 150px;';

                                const input4 = document.createElement('input');
                                input4.type = 'number';
                                input4.name = 'sd';
                                input4.className = '';
                                input4.value = data.sd;
                                input4.autocomplete = 'off';
                                input4.disabled = true;
                                input4.min = '0';
                                input4.style.cssText = 'border: 1px solid black; width: 100px;';

                                const input5 = document.createElement('input');
                                input5.type = 'number';
                                input5.name = 'returnQty';
                                input5.className = 'total_sd';
                                input5.value = '';
                                input5.autocomplete = 'off';
                                input5.disabled = true;
                                input5.min = '0';
                                input5.style.cssText = 'border: 1px solid black; width: 100px;';

                                const input6 = document.createElement('input');
                                input6.type = 'number';
                                input6.name = 'returnVat';
                                input6.className = '';
                                input6.value = '';
                                input6.autocomplete = 'off';
                                input6.disabled = true;
                                input6.min = '0';
                                input6.style.cssText = 'border: 1px solid black; width: 160px;';

                                const selectElement = document.createElement('select');
                                selectElement.name = 'vat';
                                selectElement.className = '';
                                selectElement.style.cssText = 'border: 1px solid black; width: 180px;';

                                const option0 = document.createElement('option');
                                option0.value = '';
                                option0.selected = true;
                                option0.textContent = 'Select Vat %';
                                selectElement.appendChild(option0);

                                const option1 = document.createElement('option');
                                option1.value = '1';
                                option1.textContent = 'Standard Rate(15%)';
                                selectElement.appendChild(option1);

                                const option2 = document.createElement('option');
                                option2.value = '2';
                                option2.textContent = 'Zero Rate(0%)';
                                selectElement.appendChild(option2);

                                const option3 = document.createElement('option');
                                option3.value = '3';
                                option3.textContent = 'Exempted';
                                selectElement.appendChild(option3);

                                const option4 = document.createElement('option');
                                option4.value = '4';
                                option4.textContent = 'Specific';
                                selectElement.appendChild(option4);

                                const option5 = document.createElement('option');
                                option5.value = '5';
                                option5.textContent = 'Other Than Standard Rate';
                                selectElement.appendChild(option5);

                                const option6 = document.createElement('option');
                                option6.value = '6';
                                option6.textContent = 'Unregistered Entities';
                                selectElement.appendChild(option6);

                                const option7 = document.createElement('option');
                                option7.value = '7';
                                option7.textContent = 'Turnover TAX';
                                selectElement.appendChild(option7);

                                selectElement.addEventListener('change', () => {
                                    const selectedValue = selectElement.value;
                                    if (selectedValue == '1') {
                                        input8.value = '15';
                                        input8.style.cssText = 'border: 1px solid black; width: 100px; display:block;';
                                        selectStandard.style.cssText = 'border: 1px solid black; width: 100px; display:none;';
                                    } if (selectedValue == '2') {
                                        input8.value = '0';
                                        input8.style.cssText = 'border: 1px solid black; width: 100px; display:block;';
                                        selectStandard.style.cssText = 'border: 1px solid black; width: 100px; display:none;';
                                    } if (selectedValue == '3') {
                                        input8.value = '0';
                                        input8.style.cssText = 'border: 1px solid black; width: 100px; display:block;';
                                        selectStandard.style.cssText = 'border: 1px solid black; width: 100px; display:none;';
                                    } if (selectedValue == '4') {
                                        input8.value = '';
                                        input8.style.cssText = 'border: 1px solid black; width: 100px; display:block; disabled: false;';
                                        selectStandard.style.cssText = 'border: 1px solid black; width: 100px; display:none;';
                                    } if (selectedValue == '5') {
                                        selectStandard.style.cssText = 'border: 1px solid black; width: 100px; display:block;';
                                        input8.style.cssText = 'border: 1px solid black; width: 100px; display:none;';
                                    } if (selectedValue == '6') {
                                        input8.value = '';
                                        input8.style.cssText = 'border: 1px solid black; width: 100px; display:block;';
                                        selectStandard.style.cssText = 'border: 1px solid black; width: 100px; display:none;';
                                    } if (selectedValue == '7') {
                                        input8.value = '4';
                                        input8.style.cssText = 'border: 1px solid black; width: 100px; display:block;';
                                        selectStandard.style.cssText = 'border: 1px solid black; width: 100px; display:none;';
                                    }
                                    console.log('Selected Value:', selectedValue);
                                });

                                const input8 = document.createElement('input');
                                input8.type = 'number';
                                input8.name = 'vatRate';
                                input8.className = '';
                                input8.value = data.vat;
                                input8.autocomplete = 'off';
                                input8.disabled = true;
                                input8.min = '0';
                                input8.style.cssText = 'border: 1px solid black; width: 100px; display:block;';

                                const selectStandard = document.createElement('select');
                                selectStandard.name = 'vatRate';
                                selectStandard.className = '';
                                selectStandard.style.cssText = 'border: 1px solid black; width: 100px; display:none;';

                                const optionSt0 = document.createElement('option');
                                optionSt0.value = '';
                                optionSt0.selected = true;
                                optionSt0.textContent = 'Select Vat';
                                selectStandard.appendChild(optionSt0);

                                const optionSt1 = document.createElement('option');
                                optionSt1.value = '2';
                                optionSt1.textContent = '2';
                                selectStandard.appendChild(optionSt1);

                                const optionSt2 = document.createElement('option');
                                optionSt2.value = '2.4';
                                optionSt2.textContent = '2.4';
                                selectStandard.appendChild(optionSt2);

                                const optionSt3 = document.createElement('option');
                                optionSt3.value = '3';
                                optionSt3.textContent = '3';
                                selectStandard.appendChild(optionSt3);

                                const optionSt4 = document.createElement('option');
                                optionSt4.value = '5';
                                optionSt4.textContent = '5';
                                selectStandard.appendChild(optionSt4);

                                const optionSt5 = document.createElement('option');
                                optionSt5.value = '7.5';
                                optionSt5.textContent = '7.5';
                                selectStandard.appendChild(optionSt5);

                                const optionSt6 = document.createElement('option');
                                optionSt6.value = '10';
                                optionSt6.textContent = '10';
                                selectStandard.appendChild(optionSt6);

                                //Both Select Calculation
                                selectElement.addEventListener('change', calculateVat1);
                                function calculateVat1() {
                                    const value1 = parseFloat(input8.value) || 0;

                                    const vat = (parseFloat(input6.value) * value1) / 100;
                                    input9.value = vat.toString();

                                    const totalAmout = (parseFloat(input6.value) + vat);
                                    input10.value = totalAmout.toString();
                                }

                                selectStandard.addEventListener('change', calculateVat);

                                function calculateVat() {
                                    const value2 = parseFloat(selectStandard.value) || 0;
                                    const vat = (parseFloat(input6.value) * value2) / 100;
                                    input9.value = vat.toString();

                                    const totalAmout = (parseFloat(input6.value) + vat);
                                    input10.value = totalAmout.toString();

                                }

                                const input9 = document.createElement('input');
                                input9.type = 'number';
                                input9.name = 'returnAmount';
                                input9.className = 'total_vat';
                                input9.value = '';
                                input9.autocomplete = 'off';
                                input9.disabled = true;
                                input9.min = '0';
                                input9.style.cssText = 'border: 1px solid black; width: 100px;';

                                const selectVds = document.createElement('select');
                                selectVds.name = 'returnSd';
                                selectVds.className = '';
                                selectVds.style.cssText = 'border: 1px solid black; width: 180px;';

                                const optionV = document.createElement('option');
                                optionV.value = '1';
                                optionV.textContent = 'Yes';
                                selectVds.appendChild(optionV);

                                const optionV1 = document.createElement('option');
                                optionV1.value = '2';
                                optionV1.textContent = 'No';
                                selectVds.appendChild(optionV1);

                                const selectReb = document.createElement('select');
                                selectReb.name = 'action';
                                selectReb.className = '';
                                selectReb.style.cssText = 'border: 1px solid black; width: 180px;';

                                const optionR = document.createElement('option');
                                optionR.value = '1';
                                optionR.textContent = 'Yes';
                                selectReb.appendChild(optionR);

                                const optionR1 = document.createElement('option');
                                optionR1.value = '2';
                                optionR1.textContent = 'No';
                                selectReb.appendChild(optionR1);

                                const optionR2 = document.createElement('option');
                                optionR2.value = '3';
                                optionR2.textContent = 'Zero/Exmptd/Turn/unreg';
                                selectReb.appendChild(optionR2);

                                const input10 = document.createElement('input');
                                input10.type = 'number';
                                input10.name = 'totalAmount';
                                input10.className = 'total_amount';
                                input10.value = '';
                                input10.autocomplete = 'off';
                                input10.disabled = true;
                                input10.min = '0';
                                input10.style.cssText = 'border: 1px solid black; width: 180px;';

                                input1.addEventListener('keyup', calculateTotalValue);
                                input2.addEventListener('keyup', calculateTotalValue);
                                selectElement.addEventListener('change', calculateTotalValue);
                                selectStandard.addEventListener('change', calculateTotalValue);

                                function calculateTotalValue() {
                                    // Grand Total VAT Calculation
                                    let amountTotalVat = 0;
                                    const VatInput = document.querySelectorAll(`.total_vat`) as NodeListOf<HTMLInputElement>;

                                    if (VatInput) {
                                        VatInput.forEach((input: HTMLInputElement) => {
                                            const value = parseFloat(input.value) || 0;
                                            amountTotalVat += value;
                                        });

                                        const amountTotalVatId = document.getElementById('vatTotal') as HTMLInputElement | null;
                                        if (amountTotalVatId !== null) {
                                            amountTotalVatId.value = amountTotalVat.toString();
                                        }
                                    }

                                    // Grand Total SD Calculation
                                    let amountTotalSd = 0;
                                    const SdInput = document.querySelectorAll(`.total_sd`) as NodeListOf<HTMLInputElement>;

                                    if (SdInput) {
                                        SdInput.forEach((input: HTMLInputElement) => {
                                            const value = parseFloat(input.value) || 0;
                                            amountTotalSd += value;
                                        });

                                        const amountTotalSdInput = document.getElementById('sdTotal') as HTMLInputElement | null;
                                        if (amountTotalSdInput !== null) {
                                            amountTotalSdInput.value = amountTotalSd.toString();
                                        }
                                    }

                                    // Grand Total Amount Calculation
                                    let amountTotal = 0;
                                    const inputs = document.querySelectorAll(`.total_amount`) as NodeListOf<HTMLInputElement>;

                                    if (inputs) {
                                        inputs.forEach((input: HTMLInputElement) => {
                                            const value = parseFloat(input.value) || 0;
                                            amountTotal += value;
                                        });

                                        const amountTotalInput = document.getElementById('amountTotal') as HTMLInputElement | null;
                                        if (amountTotalInput !== null) {
                                            amountTotalInput.value = amountTotal.toString();
                                        }
                                    }

                                }
                                const newRow = dataTable.insertRow();

                                const cellId = newRow.insertCell();
                                cellId.appendChild(inputId);
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
                                cell7.appendChild(selectElement);
                                const cell8 = newRow.insertCell();
                                cell8.appendChild(input8);
                                cell8.appendChild(selectStandard);
                                const cell9 = newRow.insertCell();
                                cell9.appendChild(input9);
                                const cell10 = newRow.insertCell();
                                cell10.appendChild(selectVds);
                                const cell11 = newRow.insertCell();
                                cell11.appendChild(selectReb);
                                const cell12 = newRow.insertCell();
                                cell12.appendChild(input10);
                            }

                        }
                    });
                });
            } catch (error) {
                console.error('Error fetching suggestions:', error);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const dataTable = document.querySelector('#dataTable tbody') as HTMLTableElement;
        const arrayData: any[] = [];
        if (dataTable) {
            dataTable.querySelectorAll('tr').forEach((row) => {

                const rowData: any = {};

                row.querySelectorAll('td input').forEach((input) => {
                    const inputElement = input as HTMLInputElement;
                    rowData[inputElement.name || 'itemId'] = inputElement.value;
                    rowData[inputElement.name || 'itemName'] = inputElement.value;
                    rowData[inputElement.name || 'quantity'] = inputElement.value;
                    rowData[inputElement.name || 'rate'] = inputElement.value;
                    rowData[inputElement.name || 'amount'] = inputElement.value;
                    rowData[inputElement.name || 'vatRate'] = inputElement.value;
                    rowData[inputElement.name || 'vat'] = inputElement.value;
                    rowData[inputElement.name || 'sd'] = inputElement.value;
                    rowData[inputElement.name || 'returnQty'] = inputElement.value;
                    rowData[inputElement.name || 'returnAmount'] = inputElement.value;
                    rowData[inputElement.name || 'returnVat'] = inputElement.value;
                    rowData[inputElement.name || 'returnSd'] = inputElement.value;
                    // rowData[inputElement.name || 'action'] = inputElement.value;
                    // rowData[inputElement.name || 'totalAmount'] = inputElement.value;
                });
                arrayData.push(rowData);

            });

        } else {
            console.error("Could not find #dataTable tbody element");
        }
        // const jsonAllItemsData = JSON.stringify(arrayData);
        const AllTotal = document.getElementById('amountTotal') as HTMLInputElement;
        const TotalVat = document.getElementById('vatTotal') as HTMLInputElement;
        const TotalSD = document.getElementById('sdTotal') as HTMLInputElement;


        if (TotalVat || TotalSD || AllTotal) {
            const Vat = TotalVat.value;
            const SD = TotalSD.value;
            const ALL = AllTotal.value;

            const purchase = {
                supplierId: supplier,
                chalanNo: chalanNo,
                entryDate: entryDate,
                vehicleInfo: vehicleInfo,
                // chalanDate: chalanDate,
                // fiscalYear: fiscalYear,
                purchaseItems: arrayData,
                totalTax: Vat,
                totalSd: SD,
                amountTotal: ALL,
                note: note
            }
            console.log(purchase);

            const token = localStorage.getItem('Token');
            if (token) {
                const bearer = JSON.parse(token);
                const headers = { Authorization: `Bearer ${bearer}` }
                try {
                    await axios.post("http://localhost:8080/bmitvat/api/purchase/add-local-purchase", purchase, { headers })
                        .then(function (response) {
                            navigate("/pages/procurment/local_purchase/index");
                        })
                } catch (err) {
                    console.log(err);
                }
            }
        }
    };

    return (
        <div>
            <div className="panel flex items-center justify-between flex-wrap gap-4 text-black">
                <h2 className="text-xl font-bold">Debit Note</h2>
            </div>
            <div className="pt-5 gap-2">
                <div className="mb-5">
                    <div className="panel" id="browser_default">
                        <div className="flex items-center justify-between mb-7">
                            <h5 className="font-semibold text-lg dark:text-white-light">Add New Debit Note</h5>
                        </div>
                        <div className="mb-5">
                            <form className="space-y-5">
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
                                        <label htmlFor="getChalanNo">Chalan No</label>
                                        <select id="getChalanNo" onChange={getChalanNo} className="form-select text-dark col-span-4 text-sm" required >
                                            <option>Please Select</option>
                                            {all_chalan.map((option, index) => (
                                                <option key={index} value={option.id}>
                                                    {option.chalanNo}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="browserLname">Entry Date</label>
                                        <input id="browserLname" type="date" placeholder="" className="form-input" onChange={(e) => setEntryDate(e.target.value)} />
                                    </div>
                                    <div>
                                        <label htmlFor="browserLname">Vehicle Info</label>
                                        <input id="browserLname" type="text" placeholder="" className="form-input" onChange={(e) => setVehicleInfo(e.target.value)} />
                                    </div>
                                </div>
                                <div className="border overflow-hidden overflow-x-auto">
                                    <table id="dataTable" className="whitespace-nowrap table-hover border dataTable">
                                        <thead>
                                            <tr className="whitespace-nowrap border overflow-x-auto">
                                                <th className="w-14" >Item name</th>
                                                <th className="w-9 border-black" >Quantity</th>
                                                <th className="w-9" >Rate(BDT)</th>
                                                <th className="w-10 border-x-1 border-black" >Vat Rate</th>
                                                <th className="w-6" >VAT</th>
                                                <th className="w-9 border-x-1 border-black" >SD</th>
                                                <th className="w-14" >Return Qty</th>
                                                <th className="w-14 border-x-1 border-black" >Return Amount</th>
                                                <th className="w-7" >Return Vat</th>
                                                <th className="w-14 border-x-1 border-black" >Return SD</th>
                                                <th className="w-7" >Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>

                                    <table className='mt-4'>
                                        <tr className="h-10 border border-black form-input">
                                            <td className="border-r-2 w-3/5" align="right"><strong>Total Amount(BDT)</strong></td>
                                            <td align="left"><strong><input type="text" id="amountTotal" onChange={(e) => setTotalAmount(e.target.value)} disabled /></strong>
                                                <p></p>
                                            </td>
                                        </tr>
                                        <tr className="h-10 border border-black form-input">
                                            <td className="border-r-2 w-3/5" align="right"><strong>Total Vat(BDT)</strong></td>
                                            <td align="left"><strong><input type='text' id='vatTotal' onChange={(e) => setTotalVat(e.target.value)} disabled /></strong></td>
                                        </tr>
                                        <tr className="h-10 border border-black form-input">
                                            <td className="border-r-2 w-3/5" align="right"><strong>Total SD(BDT)</strong></td>
                                            <td align="left"><strong id=""><input type='text' id='sdTotal' onChange={(e) => setTotalSD(e.target.value)} disabled /></strong></td>
                                        </tr>
                                    </table>
                                </div>

                                <div className="grid grid-cols-5 gap--x-2 gap-y-3">
                                    {/* <input type="hidden" name="allPurchaseItems" id="allPurchaseItems" /> */}
                                    <label htmlFor="userName" className='col-span-1 text-sm'>Note</label>
                                    <textarea id="userName" placeholder="Notes..." className="form-input py-2.5 text-sm col-span-4" onChange={(e) => setNote(e.target.value)} />
                                </div>

                                <div className="flex items-center justify-center gap-6 pt-4">
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
                </div>
            </div>
        </div>
    );
};

export default AddDebitNote;


