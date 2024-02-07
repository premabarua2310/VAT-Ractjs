import React, { useState, useEffect } from 'react';
import IconFile from '../../../components/Icon/IconFile';
import IconTrashLines from '../../../components/Icon/IconTrashLines';
import { Link, useNavigate, useParams  } from "react-router-dom";
import axios from 'axios';


const editUnit = () => {
    const [unitName,setName]=useState("");
    const [abbr,setAbbr]=useState("");
    const [status,setStatus]=useState("");
      const params = useParams();
      const navigate = useNavigate();

    const getUnitDetails = async()=>{
        const token = localStorage.getItem('Token');
        if(token){
            const bearer = JSON.parse(token);
            const headers= { Authorization: `Bearer ${bearer}` }

        await axios.get(`http://localhost:8080/bmitvat/api/get_unit/${params.id}`,{headers})
            .then((response) => {
                // setInitialRecords(response.data);
                const data = response.data;
                console.log(data);
                setName(data.unitName)
                setAbbr(data.abbr)
                setStatus(data.status)

            })
            .catch((error) => {
                console.error('Error fetching data:', error);

            });

        }


    }
    useEffect(()=>{
        getUnitDetails();   //create this function
    },[])  //Use array
    const handleSubmit = async () => {
        const units = {
          unitName: unitName,
          abbr:abbr,
          status: status,
          createdBy: '1',
          updatedBy: '1'
        }

        const token = localStorage.getItem('Token');
        if(token){
            const bearer = JSON.parse(token);
            const headers= { Authorization: `Bearer ${bearer}` }


        try {
            console.log(units);
           await axios.put(`http://localhost:8080/bmitvat/api/update_unit/${params.id}`, units, {headers})
          .then(function (response){
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
        }
      };

      
    return (
        <div>
            <div className="panel flex items-center justify-between flex-wrap gap-4">
                <h2 className="text-xl">Edit Unit</h2>
            </div>
            <div className="panel mt-6">
                <div id="forms_grid">
                    <div className="flex items-center justify-between mb-5">
                        <h3 className="font-semibold text-lg dark:text-white-light">Edit Unit</h3>
                    </div>
                    <div className="mb-5">
                        <form className="space-y-5">
                            <div className="grid  gap-4">
                                <div>
                                    <label htmlFor="gridEmail">Unit Name</label>
                                    <input id="gridEmail" type="text" placeholder="Enter Unit Name" className="form-input" value={unitName} onChange={(e)=>setName(e.target.value)} />
                                </div>
                            </div>
                            <div className="grid  gap-4">
                                <div>
                                    <label htmlFor="gridEmail">Address</label>
                                    <input id="gridEmail" type="text" placeholder="Enter Address" className="form-input" value={abbr} onChange={(e)=>setAbbr(e.target.value)} />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="tagging">
                                <div>
                                    <label htmlFor="inputPerson">Status</label>
                                    <div>
                                        <select className="form-select text-dark " x-model="form3.select" value={status} onChange={(e)=>setStatus(e.target.value)} required>
                                            <option value="" disabled>Select One</option>
                                            <option value="1">Active</option>
                                            <option value="0">Inactive</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center  justify-center gap-6">
                                <button type="button" className="btn btn-primary gap-2" onClick={handleSubmit}>
                                    <IconFile className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                    Submit
                                </button>
                                <Link to={"/pages/settings/unit"} >
                                <button type="button" className="btn btn-danger gap-2" >
                                    <IconTrashLines className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                    Cancel
                                </button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default editUnit;