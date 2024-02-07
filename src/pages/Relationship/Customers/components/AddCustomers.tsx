import React from 'react';
import IconFile from '../../../../components/Icon/IconFile';
import IconTrashLines from '../../../../components/Icon/IconTrashLines';

const AddCustomers = () => {

    return (
        <div>
            <div className="panel flex items-center justify-between flex-wrap gap-4">
                <h2 className="text-xl font-bold">Customers</h2>
            </div>
            <div className="panel mt-6">
                {/*---------------- Customer add form -----------------------*/}
                <div id="forms_grid">
                    <div className="flex items-center justify-between mb-5">
                        <h3 className="font-semibold text-lg dark:text-white-light">Add New Customer</h3>
                    </div>
                    <div className="mb-5">
                        <form className="space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="cuName">Name</label>
                                    <input id="cuName" type="text" placeholder="Enter Name" className="form-input" name="cu_name" required />
                                </div>
                                <div>
                                    <label htmlFor="cuEmail">Email</label>
                                    <input id="cuEmail" type="email" placeholder="Enter Email" className="form-input" name="cu_email" required />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="cuPhone">Phone</label>
                                    <input id="cuPhone" type="tel" placeholder="Enter Phone Number" className="form-input" name="cu_phone" required />
                                </div>
                                <div>
                                    <label htmlFor="customerType">Customer Type</label>
                                    <div>
                                        <select className="form-select text-dark " defaultValue="active" name="customer_type" required >
                                            <option value="1">Local</option>
                                            <option value="0">Foregin</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="tagging">
                                <div>
                                    <label htmlFor="countryId">Country</label>
                                    <div>
                                        <select className="form-select text-dark" defaultValue="active" name="country_id" required >
                                            <option value="1">Active</option>
                                            <option value="0">Inactive</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="cuAddress">Address</label>
                                    <input id="cuAddress" type="text" placeholder="Enter Address" defaultValue="1234 Main St" className="form-input" name="cu_address" required />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="cuBinNid">BIN/NID</label>
                                    <input id="cuBinNid" type="tel" placeholder="BIN or NID" className="form-input" name="cu_bin_nid" required />
                                </div>
                                <div>
                                    <div>
                                        <label htmlFor="cuTin">TIN</label>
                                        <input id="cuTin" type="tel" placeholder="TIN Number" className="form-input" name="cu_tin" required />
                                    </div>
                                    <div>
                                        <h1 className='mt-5 mb-5'>
                                            If Customer type is local then BIN/NID or TIN must be submitted.
                                            If Customer type is Foreign then no need BIN/NID or TIN.
                                        </h1>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center  justify-center gap-6">
                                <button type="submit" className="btn btn-success gap-2">
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
    )
}

export default AddCustomers;
