"use client"
import Image from 'next/image';
import Dropdowngenre from './dropdowngenre';
import Dropdownaccount from './dropdownaccount';
import { useState } from 'react';


export default function Menu(){
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <nav className=" border-gray-200 bg-red-400 pt-4 h-24">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-2 md:w-[80%] h-20">
          <a href="https://webdoctruyen.vercel.app/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <Image src="/vercel.svg" priority={true} className="h-8" width={100} height={100} alt="Đọc truyện hay" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Đọc truyện hay</span>
          </a>
          <button data-collapse-toggle="navbar-default" onClick={toggle} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden  focus:outline-none focus:ring-2 focus:ring-gray-200  " aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto h-12" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 md:m-0  rounded-lg bg-white md:flex-row md: rtl:space-x-reverse  md:bg-red-400  ">
            <li>
                
                <form className="mx-2 h-8 sm:w-36 lg:w-44">   
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tìm kiếm..." required />
                       
                    </div>
                </form>
                
                              </li>
              <li className="py-3">
              <Dropdowngenre/>
              </li>
    
              <li>  
              <Dropdownaccount/>
              </li>
            </ul>
          </div>
          { isOpen && (
          <div className=" w-full  relative z-10 md:hidden mt-3 border-y-4 border-gray-100" id="navbar-default">
            <ul className="font-medium  flex-col md:p-0 mt-4  m-auto   md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:hover:bg-red-400  ">
              
              <li>
              <Dropdowngenre/>
              </li>
    
              <li>  
              <Dropdownaccount/>
              </li>
            </ul>
          </div>
          )
          }
        </div>
      </nav>
    )
}