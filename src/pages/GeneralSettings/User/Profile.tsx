import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../store';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { useEffect } from 'react';
import IconMail from '../../../components/Icon/IconMail';
import IconPhone from '../../../components/Icon/IconPhone';
import IconFile from '../../../components/Icon/IconFile';
import IconTrashLines from '../../../components/Icon/IconTrashLines';
import change from "../../../public/assets/images/change-password.svg"


const Profile = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Profile'));
    });
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    return (
        <div>
            <div className="panel flex items-center justify-between flex-wrap gap-4 mb-3">
                <h2 className="text-lg">Profile Information</h2>
            </div>
            <div className="pt-5">
                <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 gap-5 mb-5">
                    <div className="panel">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Profile</h5>
                        </div>
                        <div className="mb-6">
                            <div className="flex flex-col justify-center items-center">
                                <img src="/assets/images/profile-34.jpeg" alt="img" className="w-24 h-24 rounded-full object-cover  mb-5" />
                                <p className="font-semibold text-primary text-xl">John Deo</p>
                            </div>
                            <ul className="mt-5 flex flex-col max-w-[160px] m-auto space-y-4 font-semibold text-white-dark">
                                <li>
                                    <button className="flex items-center gap-2">
                                        <IconMail className="w-5 h-5 shrink-0" />
                                        <span className="text-primary truncate">jimmy@gmail.com</span>
                                    </button>
                                </li>
                                <li className="flex items-center gap-2">
                                    <IconPhone />
                                    <span className="whitespace-nowrap" dir="ltr">
                                        +1 (530) 555-12121
                                    </span>
                                </li>
                                <button type="button" className="btn btn-success ">
                                    <img src={change} alt="" className='w-8 h-8' />
                                    <span className="whitespace-nowrap" dir="ltr">
                                        Change password
                                    </span>
                                </button>
                            </ul>
                        </div>
                    </div>
                    <div className=" lg:col-span-8 xl:col-span-3">
                        <div className="panel flex items-center justify-between flex-wrap gap-4 mb-3">
                            <h2 className="text-lg">Information</h2>
                        </div>
                        {/* Horizontal */}
                        <div className="panel " id="user_form">
                            <div className="flex items-center justify-between mb-7">
                                <div className="mb-4">
                                    <form className="space-y-5">
                                        <div className="flex sm:flex-row flex-col">
                                            <label htmlFor="horizontalEmail" className="mb-0 sm:w-1/4 sm:ltr:mr-2 rtl:ml-2">
                                                First Name
                                            </label>
                                            <input id="horizontalEmail" type="email" placeholder="Enter Email" className="form-input flex-1" required />
                                        </div>
                                        <div className="flex sm:flex-row flex-col">
                                            <label htmlFor="horizontalEmail" className="mb-0 sm:w-1/4 sm:ltr:mr-2 rtl:ml-2">
                                                Last Name
                                            </label>
                                            <input id="horizontalEmail" type="email" placeholder="Enter Email" className="form-input flex-1" required />
                                        </div>
                                        <div className="flex sm:flex-row flex-col">
                                            <label htmlFor="horizontalEmail" className="mb-0 sm:w-1/4 sm:ltr:mr-2 rtl:ml-2">
                                                Email
                                            </label>
                                            <input id="horizontalEmail" type="email" placeholder="Enter Email" className="form-input flex-1" required />
                                        </div>
                                        <div className="flex sm:flex-row flex-col">
                                            <label htmlFor="horizontalEmail" className="mb-0 sm:w-1/4 sm:ltr:mr-2 rtl:ml-2">
                                                Last Name
                                            </label>
                                            <input id="horizontalEmail" type="email" placeholder="Enter Email" className="form-input flex-1" required />
                                        </div>
                                        <div className="flex sm:flex-row flex-col ">
                                            <label htmlFor="horizontalEmail" className="ml-4 mb-0 sm:w-1/4 sm:ltr:mr-2 rtl:ml-2">
                                                Profile
                                            </label>
                                            <div >
                                                <input id="horizontalEmail" type="email" placeholder="Enter Email" className="form-input flex-1" required />
                                                <span className="text-white-dark">Images only (image/*)
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center  justify-center gap-6">
                                            <button type="submit" className="btn btn-primary gap-2">
                                                <IconFile className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                                Submit
                                            </button>
                                            <Link to={"/units"} >
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
                </div>
            </div>
        </div>
    );
};

export default Profile;
