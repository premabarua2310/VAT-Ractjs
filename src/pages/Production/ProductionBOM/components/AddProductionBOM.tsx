import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import IconFile from '../../../components/Icon/IconFile';
import IconTrashLines from '../../../components/Icon/IconTrashLines';
import axios from 'axios';


const AddProductionBOM = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Production BOM Table'));
    });

    const [date, setDate] = useState();

    const [unitName, setName] = useState("");
    const [unitAbbr, setAbbr] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async () => {
        const units = {
            unitName: unitName,
            abbr: unitAbbr,
            status: true,
            createdBy: '0',
            updatedBy: '0'
        }
        try {
            const data = await axios.post("http://localhost:8080/bmitvat/api/v1/unit", units)
                .then(function (response) {
                    console.log(response);
                    navigate("/pages/settings/unit");
                })
            // if(response.status==200){
            // }else{
            //   console.warn("Insert Unsuccessfull");
            //   navigate("/pages/settings/unit/add");
            // }
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div>
            <div className="panel flex items-center justify-between flex-wrap gap-4 ">
                <h2 className="text-2xl ml-5 font-bold">Production BOM</h2>
            </div>
            <div className="panel mt-5">

                {/*------------------ Form section -----------------*/}
                <div className="flex items-center justify-between m-5">
                    <h5 className="font-semibold text-xl mb-2 dark:text-white-light">Production BOM Information</h5>
                </div>
                <div className="m-5">
                    <form className="space-y-5">

                        <div className="grid grid-cols-5 gap--x-2 gap-y-3">
                            <label htmlFor="userEmail" className='col-span-1 text-sm'>SKU</label>
                            <input id="userEmail" type="text" placeholder="Enter SKU" className="form-input py-2.5 text-sm col-span-3" name="user_name" required />
                        </div>
                        <div className="grid grid-cols-5 gap--x-2 gap-y-3">
                            <label htmlFor="lastName" className='col-span-1 text-sm'>Submisssion Date</label>
                            <input id="browserLname" type="date" placeholder="" className="form-input py-2.5 text-sm col-span-3" required />
                        </div>
                        <div className="grid grid-cols-5 gap--x-2 gap-y-3">
                            <label htmlFor="lastName" className='col-span-1 text-sm'>Effective Date</label>
                            <input id="browserLname" type="date" placeholder="" className="form-input py-2.5 text-sm col-span-3" required />
                        </div>
                        <div className="grid grid-cols-5 gap--x-2 gap-y-3" >
                            <label htmlFor="inputPerson" className='col-span-1 text-sm '>Item Name</label>
                            <select className="form-select col-span-3 text-sm">
                                <option value="1">Select Item</option>
                                <option value="0">Barisal Sales Center</option>
                                <option value="0">Barisal Sales Center</option>
                                <option value="0">Barisal Sales Center</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-5 gap--x-2 gap-y-3">
                            <label htmlFor="userEmail" className='col-span-1 text-sm'>Units (Units Of Measurement)</label>
                            <input id="userEmail" type="text" placeholder="Enter Units" className="form-input py-2.5 text-sm col-span-3" name="user_email" required />
                        </div>
                        <div className="grid grid-cols-5 gap--x-2 gap-y-3">
                            <label htmlFor="userNid" className='col-span-1 text-sm'>HS-CODE</label>
                            <input id="userNid" type="tel" placeholder="Enter HS-CODE" className="form-input py-2.5 text-sm col-span-3" name="user_nid" required />
                        </div>

                        <div className="grid grid-cols-5 gap--x-2 gap-y-3">
                            <label htmlFor="userPhone" className='col-span-1 text-sm'>Remarks</label>
                            <input id="userPhone" type="text" placeholder="Enter Remarks" className="form-input py-2.5 text-sm col-span-3" name="user_phone" required />
                        </div>
                        <div className="grid grid-cols-5 gap--x-2 gap-y-3">
                            <label htmlFor="password" className='col-span-1 text-sm'>Refference</label>
                            <input id="password" type="text" placeholder="Enter Refference" className="form-input py-2.5 text-sm col-span-3" name="password" required />
                        </div>
                        <div >
                            <label htmlFor="browserLname" className='col-span-1 text-sm'>Items</label>
                            <div className="grid grid-cols-2">
                                <input id="browserLname" type="text" placeholder="Enter Items" className="form-input py-2.5 text-sm" required />
                            </div>
                        </div>

                        <div className="border overflow-hidden">
                            <table id="dataTable" className="whitespace-nowrap table-hover border">
                                <thead>
                                    <tr className="whitespace-nowrap border overflow-x-auto ">
                                        <th className="w-14" >Name</th>
                                        <th className="w-9 border-x-1 border-black" >Quantity</th>
                                        <th className="w-9" >Unit Name</th>
                                        <th className="w-10 border-x-1 border-black">Rate</th>
                                        <th className="w-6" >Amount</th>
                                        <th className="w-9 border-x-1 border-black" >Wastage(%)</th>
                                        <th className="w-14" >Wastage Quantity</th>
                                        <th className="w-14 border-x-1 border-black"  >Wastage Rate</th>
                                        <th className="w-7" >Wastage Amount</th>
                                        <th className="w-14 border-x-1 border-black" >Total Quantity</th>
                                        <th className="w-7" >Total Amount</th>
                                        <th className="w-7 border-x-1 border-black" >Action</th>
                                    </tr>
                                    <tr className="whitespace-nowrap border overflow-x-auto">
                                        <th className="w-14" >Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>

                        <div >
                            <label htmlFor="browserLname" className='col-span-1 text-sm'>Costing List</label>
                            <div className="grid grid-cols-2">
                                <input id="browserLname" type="text" placeholder="Enter Costing List" className="form-input py-2.5 text-sm" required />
                            </div>
                        </div>
                        <div className="pt-5">
                            <table className="border-separate border-spacing-2">
                                <tr className="h-10 border border-black form-input ">
                                    <td className="border-r-2 w-3/5" align="right"><strong>Total Vat(BDT)</strong></td>
                                    <td align="left"><strong><input type='text' id='vatTotal' disabled /></strong></td>
                                </tr>
                                <tr className="h-10 border border-black form-input">
                                    <td className="border-r-2 w-3/5" align="right"><strong>Total SD(BDT)</strong></td>
                                    <td align="left"><strong id=""><input type='text' id='sdTotal' disabled /></strong></td>
                                </tr>
                                <tr className="h-10 border border-black form-input">
                                    <td className="border-r-2 w-3/5" align="right"><strong>Grand Discount(BDT)</strong></td>
                                    <td align="left"><strong id=""><input type='text' id='sdTotal' disabled /></strong></td>
                                </tr>
                                <tr className="h-10 border border-black form-input">
                                    <td className="border-r-2 w-3/5" align="right"><strong>Grand Total(BDT)</strong></td>
                                    <td align="left"><strong><input type="text" id="grandTotal" disabled /></strong></td>
                                </tr>
                            </table>
                        </div>

                        <div className="flex items-center justify-center gap-6 pt-8">
                            <button type="submit" className="btn btn-primary gap-2" onClick={handleSubmit}>
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
    )
}
export default AddProductionBOM;
