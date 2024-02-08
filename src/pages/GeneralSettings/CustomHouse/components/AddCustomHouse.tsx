import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import IconFile from '../../../components/Icon/IconFile';
import IconTrashLines from '../../../components/Icon/IconTrashLines';
import axios from 'axios';


const AddCustomHouse = () => {

    const [customHouseName, setCustomHouseName] = useState("");
    const [customHouseCode, setCustomHouseCode] = useState("");
    const [customHouseAddress, setCustomHouseAddress] = useState("");
    const [status, setStatus] = useState("");
    const params = useParams();
    const navigate = useNavigate();


    const getCustomHouseDetails = async () => {
        const token = localStorage.getItem('Token');
        if (token) {
            const bearer = JSON.parse(token);
            const headers = { Authorization: `Bearer ${bearer}` }

            await axios.get(`http://localhost:8080/bmitvat/api/customHouse/edit/${params.id}`, { headers })
                .then((response) => {
                    // setInitialRecords(response.data);
                    const data = response.data;
                    console.log(data);
                    setCustomHouseName(data.customHouseName)
                    setCustomHouseCode(data.customHouseCode)
                    setCustomHouseAddress(data.customHouseAddress)
                    setStatus(data.status)
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);

                }); 
        }


        // let result = await axios.get( `http://localhost:8080/bmitvat/api/customHouse/${params.id}`);
        // if(result){
        // const data = result.data;
        // setName(data.unitName)
        // setAbbr(data.abbr)
        // setStatus(data.status)
        // }
    }

    useEffect(() => {
        getCustomHouseDetails();   //create this function
    }, [])  //Use array
    const handleSubmit = async () => {
        const customHouse = {
            customHouseName: customHouseName,
            customHouseCode: customHouseCode,
            customHouseAddress: customHouseAddress,
            status: status,
            createdBy: '1',
            updatedBy: '1'
        }

        const token = localStorage.getItem('Token');
        if (token) {
            const bearer = JSON.parse(token);
            const headers = { Authorization: `Bearer ${bearer}` }

            try {
                console.log(customHouse);
                await axios.put(`http://localhost:8080/bmitvat/api/customHouse/update/${params.id}`, customHouse, { headers })
                    .then(function (response) {
                        navigate("/pages/customHouse/custom");
                    })
                // if(response.status==200){
                // }else{
                //   console.warn("Insert Unsuccessfull");
                //   navigate("/pages/settings/customHouse/add");
                // }
            } catch (err) {
                console.log(err);
            }
        }
        console.log(customHouseName);
    };

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Custom House Add'));
    });


    return (
        <div>
            <div className="panel flex items-center justify-between flex-wrap gap-4 text-black">
                <h2 className="text-xl font-bold">Custom-House</h2>
            </div>
            <div className="pt-5 gap-2">
                <div className='panel'>
                    <div className="flex items-center justify-between mb-7">
                        <h3 className="font-semibold text-lg dark:text-white-light">Add New Custom-House</h3>
                    </div>
                    <div className="mb-5">
                        <form className="space-y-5">
                            <div className="grid grid-cols-5 gap--x-2 gap-y-3">
                                <label htmlFor="houseName" className='col-span-1 text-base'>Custom House Name</label>
                                <input id="houseName" type="text" placeholder="Enter Custom House Name" className="form-input py-2.5 text-base col-span-4" name="house_name" value={customHouseName} onChange={(e) => setCustomHouseName(e.target.value)} required />
                            </div>
                            <div className="grid grid-cols-5 gap--x-2 gap-y-3">
                                <label htmlFor="houseCode" className='col-span-1 text-base'>Custom House Code</label>
                                <input id="houseCode" type="text" placeholder="Enter Custom House Code" className="form-input py-2.5 text-base col-span-4" name="house_code" value={customHouseCode} onChange={(e) => setCustomHouseCode(e.target.value)} required />
                            </div>
                            <div className="grid grid-cols-5 gap--x-2 gap-y-3">
                                <label htmlFor="houseAddress" className='col-span-1 text-base'>Custom House Address</label>
                                <input id="houseAddress" type="text" placeholder="Enter Custom House Address" className="form-input py-2.5 text-base col-span-4" name="house_address" value={customHouseAddress} onChange={(e) => setCustomHouseAddress(e.target.value)} required />
                            </div>
                            <div className="grid grid-cols-5 gap--x-2 gap-y-3 pb-3" >
                                <label htmlFor="inputPerson" className='col-span-1 text-base'>Status</label>
                                <select id='inputPerson' name='input_person' placeholder="Choose..." className="form-select text-dark col-span-4 text-base">
                                    <option value="1">Active</option>
                                    <option value="0">Inactive</option>
                                </select>
                            </div>
                            <div className="flex items-center justify-center gap-6">
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
        </div>
    );
};

export default AddCustomHouse;
