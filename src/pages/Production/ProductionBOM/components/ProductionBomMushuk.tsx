import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import IconFile from '../../../../components/Icon/IconFile';
// import * as $ from 'jquery';
import { number } from 'yup';


const ProductionBomMushuk: React.FC = () => {
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
                    <img className="object-none object-centerw-24 h-24 pt-8" src="..." />
                </div>
                <div className="font-bold text-center grid grid-rows-2 grid-flow-col gap-4 pt-8">
                    <h3 className='text-xl'>গনপ্রজাতন্ত্রী বাংলাদেশ সরকার</h3>
                    <h3>জাতীয় রাজস্ব বোর্ড</h3>
                </div>
                <div>
                    <button type="submit" className="btn btn-primary gap-2 float-right" >
                        <IconFile className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                        Print
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-right mr-7 ">
                <div></div>
                <div>
                    <button type="submit" className="bg-white text-gray-800 font-semibold py-2 px-4 border border-gray-400" >
                        মূসক- ৪.৩
                    </button>
                </div>
            </div>

            <div className="pt-5 gap-2 m-5">
                <div className="mb-5">
                    <div className="" id="browser_default">
                        <div className="flex flex-col items-center justify-between mb-7">
                            <h5 className="text-base dark:text-white-light font-bold">উপকরন-উৎপাদন সহগ (Input-Output Coefficent) ঘোষণা</h5>
                            <h5 className="text-base dark:text-white-light">[ বিধি ২১ দ্রষ্টব্য ]</h5>
                        </div>
                        <div className="pb-5">
                            <div className='flex flex-col text-right gap-2'>
                                <div className='flex sm:flex-row flex-row'>
                                    <label className="mr-3 text-sm  font-normal"> প্রতিষ্ঠানের নাম: </label>
                                    <p className="text-sm font-medium"> SQ Wire & Cable Co. Ltd.</p>
                                </div>
                                <div className='flex sm:flex-row flex-row'>
                                    <label className="mr-3 text-sm  font-normal"> ঠিকানা: </label>
                                    <p className="text-sm font-medium"> Kewdhala, Madanpur, Bandar, Narayangonj</p>
                                </div>
                                <div className='flex sm:flex-row flex-row'>
                                    <label className="mr-3 text-sm font-normal"> বিন: </label>
                                    <p className="text-sm font-medium"> 537186682592</p>
                                </div>
                                <div className='flex sm:flex-row flex-row'>
                                    <label className="mr-3 text-sm font-normal"> দাখিলের তারিখ: </label>
                                    <p className="text-sm font-medium"> 2022-10-01</p>
                                </div>
                                <div className='flex sm:flex-row flex-row'>
                                    <label className="mr-3 text-sm font-normal"> ঘোষিত সহগ অনুযায়ী পণ্য তারিখ: </label>
                                    <p className="text-sm font-medium"> 2022-10-01</p>
                                </div>
                                <div className='flex sm:flex-row flex-row'>
                                    <label className="mr-3 text-sm font-normal"> Declarion-No: </label>
                                    <p className="text-sm font-medium"> bom-20221221-0001</p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-5">
                            <div className="border-separate border border-slate-400 overflow-hidden overflow-x-auto">
                                <table className="table table-xs">
                                    <thead>
                                        <tr>
                                            <th className='border px-8 py-4'>ক্রমিক সংখ্যা</th>
                                            <th className='border px-8 py-4'>পণ্যের এইচ এস কোড</th>
                                            <th className='border px-8 py-4'>পণ্যের নাম ও বিবরণ</th>
                                            <th className='border px-8 py-4'>সরবরাহের একক</th>
                                            <th className='border px-8 py-4'>একক পণ্য/কাঁচামালের এবং প্যাকিং সামগ্রীর বিবরণ, পরিমাণ ও ক্রয়মূল্য (উপকরণ ভিত্তিক অপচয়ের শতকরা হারসহ)
                                                <div className="grid grid-rows-1 grid-flow-col gap-2">
                                                    <div className="col-span-10 mt-4">বিবরণ</div>
                                                    <div className="col-span-4 mt-4">অপচয়সহ পরিমাণ</div>
                                                    <div className="col-span-4 mt-4">ক্রয় মূল্য</div>
                                                    <div className="col-span-4 mt-4">অপচয়ের পরিমাণ</div>
                                                    <div className="col-span-4 mt-4">শতকরা হার</div>
                                                </div>
                                            </th>
                                            <th className='border px-8 py-4'>মূল্য সংযোজনের বিবরণ
                                                <div className="grid grid-rows-1 grid-flow-col gap-4">
                                                    <div className="col-span-6 mt-4">মূল্য সংযোজনের খাত</div>
                                                    <div className="col-span-5 mt-4">মূল্য</div>
                                                </div>
                                            </th>
                                            <th className='border px-8 py-4'>মন্তব্য</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border border-slate-200">
                                            <td className='border px-8 py-4'>1</td>
                                            <td className='border px-8 py-4'>2X0.65 RM T/T (FLEXIBLE)</td>
                                            <td className='border px-8 py-4'>Meter</td>
                                            <td className='border px-8 py-4'>300</td>
                                            <td className='border px-8 py-4'>
                                                <td className="grid grid-rows-1 grid-flow-col">
                                                    <td className="col-span-4 mt-4">বিবরণ</td>
                                                    <td className="col-span-4 mt-4">অপচয়সহ পরিমাণ</td>
                                                    <td className="col-span-4 mt-4">ক্রয় মূল্য</td>
                                                    <td className="col-span-4 mt-4">অপচয়ের পরিমাণ</td>
                                                    <td className="col-span-4 mt-4">শতকরা হার</td>
                                                </td>
                                            </td>
                                            <td className='border px-8 py-4'>2151.54</td>
                                            <td className='border px-8 py-4'>0.00</td>
                                        </tr>
                                        <tr className="border border-slate-200">
                                            <td className='border px-8 py-4'>2</td>
                                            <td className='border px-8 py-4'>2X0.65 RM T/T (FLEXIBLE)</td>
                                            <td className='border'>Meter</td>
                                            <td className='border px-8 py-4'>300</td>
                                            <td className='border px-8 py-4'>
                                                <td className="grid grid-rows-1 grid-flow-col">
                                                    <td className="col-span-4 mt-4">Antimony Tri-Oxide(K.G)</td>
                                                    <td className="col-span-4 mt-4">0</td>
                                                    <td className="col-span-4 mt-4">0.22</td>
                                                    <td className="col-span-4 mt-4">0</td>
                                                    <td className="col-span-4 mt-4">5%</td>
                                                </td>
                                            </td>
                                            <td className='border px-8 py-4'>2151.54
                                            <td>10</td>
                                            </td>
                                            <td className='border px-8 py-4'>0.00</td>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductionBomMushuk;


