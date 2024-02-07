import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import IconFile from '../../../../../components/Icon/IconFile';
// import * as $ from 'jquery';
import { number } from 'yup';


const LocalSalesMushuk: React.FC = () => {
    const navigate = useNavigate();

    // Function to get today's date in the format "YYYY-MM-DD"
    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
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
                    rowData[inputElement.name || 'ক্রমিক সংখ্যা'] = inputElement.value;
                    rowData[inputElement.name || 'পন্ন্য বা সেবার বর্ণনা( প্রযোজ্য ক্ষেত্রে ব্র্যান্ড নামসহ)'] = inputElement.value;
                    rowData[inputElement.name || 'সরবরাহের একক'] = inputElement.value;
                    rowData[inputElement.name || 'পরিমান'] = inputElement.value;
                    rowData[inputElement.name || 'একক মূল্য (টাকায়)'] = inputElement.value;
                    rowData[inputElement.name || 'মোটমূল্য (টাকায়)'] = inputElement.value;
                    rowData[inputElement.name || 'সম্পূরক শুল্কের পরিমান (টাকায়)'] = inputElement.value;
                    rowData[inputElement.name || 'মূল্য সংযজন করের হার/ সুনিদ্রিসট কর'] = inputElement.value;
                    rowData[inputElement.name || 'মূল্য সংযজন কর এর পরিমান(টাকায়)'] = inputElement.value;
                    rowData[inputElement.name || 'সরবরাহের একক'] = inputElement.value;
                });
                arrayData.push(rowData);

            });

        } else {
            console.error("Could not find #dataTable tbody element");
        }
    };

    return (
        <div className='p-1'>
            <div className="items-center justify-between flex-wrap text-black m-6 grid grid-cols-3 gap-4">
                <div>
                    <img className="object-none object-centerw-24 h-24" src="..." />
                </div>
                <div className="font-bold text-center grid grid-rows-2 grid-flow-col gap-4">
                    <h3 className='text-xl'>গনপ্রজাতন্ত্রী বাংলাদেশ সরকার</h3>
                    <h3>জাতীয় রাজস্ব বোর্ড</h3>
                </div>
                <div>
                    <button type="submit" className="btn btn-success gap-2 float-right" >
                        <IconFile className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                        PDF Copy
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-right mr-7 ">
                <div></div>
                <div>
                    <button type="submit" className="bg-white text-gray-800 font-semibold py-2 px-4 border border-gray-400" >
                        মূসক- ৬.৩
                    </button>
                </div>
            </div>
            <div className="pt-5 gap-2 m-5">
                <div className="mb-5">
                    <div className="" id="browser_default">
                        <div className="flex flex-col items-center justify-between mb-7">
                            <h5 className="text-base dark:text-white-light">কর চালান পত্র</h5>
                            <h5 className="text-base dark:text-white-light">[বিধি ৪০ উপ-বিধি এর (১) এর দফা (গ) ও দফা (চ) দ্রষ্টব্য]</h5>
                            <div className='flex sm:flex-row flex-row pt-6'>
                                <label className="mr-3 text-base font-normal"> নিবন্ধিত বাক্তির নাম:- </label>
                                <p className="text-base font-medium"> SQ Wire & Cable Co. Ltd. </p>
                            </div>
                            <div className='flex sm:flex-row flex-row'>
                                <label className="mr-3 text-base font-normal"> নিবন্ধিত বাক্তির বিআইএন:- </label>
                                <p className="text-base font-medium">000342146-0304 </p>
                            </div>
                            <div className='flex sm:flex-row flex-row'>
                                <label className="mr-3 text-base font-normal"> চালানপত্র ইস্যুর ঠিকানা:- </label>
                                <p className="text-base font-medium"> Kewdhala, Madanpur, Bandar, Narayangonj.-. 1207 </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 pb-5">
                            <div className='flex flex-col text-right gap-3'>
                                <div className='flex sm:flex-row flex-row'>
                                    <label className="mr-3 text-sm  font-normal"> ক্রেতার নাম: </label>
                                    <p className="text-sm font-medium"> Prince Electricals Ltd.</p>
                                </div>
                                <div className='flex sm:flex-row flex-row'>
                                    <label className="mr-3 text-sm  font-normal"> ক্রেতার বিআইএন: </label>
                                    <p className="text-sm font-medium"> 000282483-0303</p>
                                </div>
                                <div className='flex sm:flex-row flex-row'>
                                    <label className="mr-3 text-sm font-normal"> পন্নের গন্তব্বস্থল: </label>
                                    <p className="text-sm font-medium"> Birabo,Kanchan, Narayangonj</p>
                                </div>
                                <div className='flex sm:flex-row flex-row'>
                                    <label className="mr-3 text-sm font-normal"> যানবাহনের প্রকৃতি ও নম্বর: </label>
                                    <p className="text-sm font-medium"> micro</p>
                                </div>
                            </div>
                            <div></div>
                            <div className='flex flex-col  gap-3 pl-10'>
                                <div className='flex sm:flex-row flex-row text-right'>
                                    <label className="mr-3 text-sm font-normal text-right"> চালানপত্র নম্বর: </label>
                                    <p className="text-sm font-medium text-right" > SC-20221222-0001 </p>
                                </div>
                                <div className='flex sm:flex-row flex-row text-right'>
                                    <label className="mr-3 text-sm font-normal text-right"> ইস্যুর তারিখ: </label>
                                    <p className="text-sm font-medium text-right" > 22-12-20221 </p>
                                </div>
                                <div className='flex sm:flex-row flex-row text-right'>
                                    <label className="mr-3 text-sm font-normal text-right"> ইস্যুর সময়: </label>
                                    <p className="text-sm font-medium text-right" > 10:08:11 </p>
                                </div>
                                {/* <div>চালানপত্র নম্বর: SC-20221222-0001</div>
                                <div>ইস্যুর তারিখ: 22-12-2022</div>
                                <div>ইস্যুর সময়: 10:08:11</div> */}
                            </div>
                        </div>
                        <div className="mb-5">
                            <div className="border-collapse border border-slate-400 overflow-hidden overflow-x-auto">
                                <table className="table table-xs">
                                    <thead>
                                        <tr className="border border-slate-300">
                                            <th >ক্রমিক সংখ্যা</th>
                                            <th>পন্ন্য বা সেবার বর্ণনা( প্রযোজ্য ক্ষেত্রে ব্র্যান্ড নামসহ)</th>
                                            <th>সরবরাহের একক</th>
                                            <th>পরিমান</th>
                                            <th>একক মূল্য (টাকায়)</th>
                                            <th>মোটমূল্য (টাকায়)</th>
                                            <th>সম্পূরক শুল্কের পরিমান (টাকায়)</th>
                                            <th>মূল্য সংযজন করের হার/ সুনিদ্রিসট কর</th>
                                            <th>মূল্য সংযজন কর এর পরিমান(টাকায়)</th>
                                            <th>সরবরাহের একক</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border border-slate-200">
                                            <td>1</td>
                                            <td>2X0.65 RM T/T (FLEXIBLE)</td>
                                            <td>Meter</td>
                                            <td>300</td>
                                            <td>7.17</td>
                                            <td>2151.54</td>
                                            <td>0.00</td>
                                            <td>15</td>
                                            <td>322.73</td>
                                            <td>2474.27</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div>
                            <div className="pb-2">
                                <div className='flex flex-col text-right gap-3'>
                                    <div className='flex sm:flex-row flex-row'>
                                        <label className="mr-3 text-sm  font-semibold"> প্রতিষ্ঠান করতিপক্ষের দায়িত্বপ্রাপ্ত বাক্তির নাম: </label>
                                        <p className="text-sm font-medium"> Superadmin</p>
                                    </div>
                                    <div className='flex sm:flex-row flex-row'>
                                        <label className="mr-3 text-sm  font-semibold"> পদবি: </label>
                                        <p className="text-sm font-medium"> </p>
                                    </div>
                                    <div className='flex sm:flex-row flex-row'>
                                        <label className="mr-3 text-sm font-semibold"> স্বাক্ষর: </label>
                                        <p className="text-sm font-medium"> </p>
                                    </div>
                                    <div className='flex sm:flex-row flex-row'>
                                        <label className="mr-3 text-sm font-semibold"> সিল: </label>
                                        <p className="text-sm font-medium"> </p>
                                    </div>
                                </div>
                                <p className='pt-3 font-semibold'>*উৎসে কর্তনযোগ্য সরবরাহের ক্ষেত্রে ফর্মটি সমন্নিত কর চালানপত্র ও উৎসে কর সনদপত্র হিসাবে বিবেচিত হইবে এবং উৎসে কর্তনযোগ্য সরবরাহের ক্ষেত্রে প্রযোজ্য হইবে</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LocalSalesMushuk;


