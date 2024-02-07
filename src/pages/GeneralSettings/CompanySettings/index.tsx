import React from 'react';
import IconFile from '../../components/Icon/IconFile';
import IconTrashLines from '../../components/Icon/IconTrashLines';

const index = () => {

    return (
        <div>
            <div className="panel flex items-center justify-between flex-wrap gap-4">
                <h2 className="text-xl font-bold">Company Settings</h2>
            </div>
            <div className="panel mt-6">
                {/*---------------- Company Settings form -----------------------*/}
                <div id="forms_grid">
                    <div className="flex items-center justify-between mb-5">
                        <h3 className="font-semibold text-lg dark:text-white-light">Company Details</h3>
                    </div>
                    <div className="mb-5">
                        <form className="space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="coName">Name</label>
                                    <input id="coName" type="text" placeholder="Enter Name" className="form-input" name = "company_name" required />
                                </div>
                                <div>
                                    <label htmlFor="countryId">Country</label>
                                    <div>
                                        <select className="form-select text-dark"name = "country_id" required >
                                            <option value="">Select Country</option>
                                            <option value="1">Afganistan</option>
                                            <option value="0">American Samoa</option>
                                            <option value="0">Australia</option>
                                            <option value="0">Bangladesh</option>
                                            <option value="0">Bhutan</option>
                                            <option value="0">China</option>
                                            <option value="0">Denmark</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="coShortName">Site Short Name</label>
                                    <input id="coShortName" type="text" placeholder="Enter Site Short Name" className="form-input" name = "co_short_name" required />
                                </div>
                                <div>
                                    <label htmlFor="coAddress">Address</label>
                                    <input id="coAddress" type="text" placeholder="Enter Address" className="form-input" name="com_address" required />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="tagging">
                                <div>
                                    <label htmlFor="coEmail">Email</label>
                                    <input id="coEmail" type="email" placeholder="Enter Email" className="form-input" name = "com_email" required />
                                </div>
                                <div>
                                    <label htmlFor="coTin">TIN</label>
                                    <input id="coTin" type="tel" placeholder="Enter TIN Number" className="form-input" name = "com_tin" required />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="coPhone">Phone</label>
                                    <input id="coPhone" type="tel" placeholder="Enter Phone Number" className="form-input" name = "com_phone" required />
                                </div>
                                <div>
                                    <div>
                                        <label htmlFor="loginPageLogo">Login Page Logo</label>
                                        <input id="loginPageLogo" type="file" placeholder="Enter User Email" className="form-input col-span-4 relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary" />
                                    </div>
                                    <div>
                                        <h1 className='mt-2'>
                                            Recomended size: 300*120
                                        </h1>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="coBankName">Bank Name</label>
                                    <input id="coBankName" type="text" placeholder="Enter Bank Name" className="form-input" name="com_bank" required />
                                </div>
                                <div>
                                    <label htmlFor="coBranch">Branch</label>
                                    <input id="coBranch" type="text" placeholder="Enter Branch" className="form-input" name="com_branch" required />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="coAcNo">A/C No</label>
                                    <input id="coAcNo" type="text" placeholder="Enter A/C No" className="form-input" name="com_ac" required />
                                </div>
                                <div>
                                    <div>
                                        <label htmlFor="invoiceLogo">Invoice Logo</label>
                                        <input id="invoiceLogo" type="file" placeholder="Enter User Email" className="form-input col-span-4 relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary" />
                                    </div>
                                    <div>
                                        <h1 className='mt-2'>
                                            Recomended size: 300*120
                                        </h1>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="customerType">Default Currancy</label>
                                    <div>
                                        <select className="form-select text-dark" name="customer_type" required >
                                            <option value="">Select Currency</option>
                                            <option value="1">Taka</option>
                                            <option value="0">Rupee</option>
                                            <option value="0">Dollar</option>
                                            <option value="0">Euro</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="coBin">BIN</label>
                                    <input id="coBin" type="tel" placeholder="Enter BIN Number" className="form-input" name = "com_bin" required />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="coBusinessNature">Business Nature</label>
                                    <input id="coBusinessNature" type="text" placeholder="Enter Business Nature" className="form-input" name = "business_nature" required />
                                </div>
                                <div>
                                    <label htmlFor="coBusinessEconomics">Business Economics</label>
                                    <input id="coBusinessEconomics" type="text" placeholder="Enter Business Economics" className="form-input" name = "business_economics" required />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="customerType">Company Vat Type</label>
                                    <div>
                                        <select className="form-select text-dark" name="customer_type" required >
                                            <option value="">Please Select Company Vat Type</option>
                                            <option value="1">Deducted</option>
                                            <option value="0">Not Deducted</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="authorisedPersonId">Authorised Person</label>
                                    <div>
                                        <select className="form-select text-dark" name = "authorised_person_id" required >
                                            <option value="">Select Authorised Person</option>
                                            <option value="1"></option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-center gap-6 pt-10">
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

export default index;
