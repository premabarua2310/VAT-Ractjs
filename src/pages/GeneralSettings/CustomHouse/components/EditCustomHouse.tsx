import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import IconFile from '../../../components/Icon/IconFile';
import IconTrashLines from '../../../components/Icon/IconTrashLines';

const EditCustomHouse = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Custom House Edit'));
    });

    return (
        <div>
            <div className="panel flex items-center justify-between flex-wrap gap-4">
                <h2 className="text-xl font-bold">Custom House</h2>
            </div>
            <div className="panel mt-6">
                {/* Grid */}
                <div id="forms_grid">
                    <div className="flex items-center justify-between mb-5">
                        <h3 className="font-semibold text-lg dark:text-white-light">Edit Custom-House</h3>
                    </div>
                    <div className="mb-5">
                        <form className="space-y-5">
                            <div className="grid gap-4">
                                <div>
                                    <label htmlFor="unitName">Custom House Name</label>
                                    <input id="unitName" type="text" placeholder="Enter Unit Name" className="form-input" name="unitName" required />
                                </div>
                            </div>
                            <div className="grid gap-4">
                                <div>
                                    <label htmlFor="abbr">Custom House Code</label>
                                    <input id="abbr" type="text" placeholder="Enter Abbr" className="form-input" name="abbr" required />
                                </div>
                            </div>
                            <div className="grid gap-4">
                                <div>
                                    <label htmlFor="abbr">Custom House Address</label>
                                    <input id="abbr" type="text" placeholder="Enter Abbr" className="form-input" name="abbr" required />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="tagging">
                                <div>
                                    <label htmlFor="inputStatus">Status</label>
                                    <div>
                                        <select className="form-select text-dark " x-model="form3.select" required >
                                            <option value="1">Active</option>
                                            <option value="0">Inactive</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center  justify-center gap-6">
                                <button type="submit" className="btn btn-primary gap-2">
                                    <IconFile className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                    Update
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

export default EditCustomHouse;