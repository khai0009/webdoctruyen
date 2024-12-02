'use client'
import { useEffect, useState } from 'react';
import List from './List/page';
import Image from 'next/image'
import { collection, query, getDocs } from 'firebase/firestore';
import {db} from "./firebase"


export default function Page(){
  const [isOpen, setIsOpen] = useState(false);
  const [theloai,settheloai] = useState<Array<{ID: string,TenTheLoai: string}>>([]);
  const toggle = () => setIsOpen(!isOpen);



  useEffect(() => {
    const danhsachtheloai = async () =>{
        const q = query(collection(db, 'theloai'));
        const querySnapshot = await getDocs(q);
        const bookData = querySnapshot.docs.map((doc) => ({            
            ID: doc.data().ID,
            TenTheLoai: doc.data().TenTheLoai,
            
          }));
          settheloai(bookData);
        };
        danhsachtheloai();
      }, []);

return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
        <Image src="https://th.bing.com/th/id/OIP.TPuUm5Dh-z4tpbOBS3zJrQHaHa?rs=1&pid=ImgDetMain" className="h-8" width={100} height={100} alt="Flowbite Logo" />
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
      </a>
      <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
        </svg>
      </button>
      <div className="hidden w-full md:block md:w-auto" id="navbar-default">
        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li>
          <div className="relative inline-block text-left">
      <a
        type="button"
        className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
        id="menu-button"
        aria-expanded="false"   

        aria-haspopup="true"
        onClick={toggle}
      >
        Thể loại
      </a>
      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56   
 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"   

          tabIndex={-1}
        >
          <div className="py-1" role="none">
          {theloai.map((theLoai) => (
            <a
              href="#"
              className="block   
 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
              tabIndex={-1}
              id="menu-item-0"
              key={theLoai.ID}
            >
              {theLoai.TenTheLoai}
              
            </a>
          ))}
          </div>
        </div>
      )}
    </div>
          </li>
          <li>
            <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</a>
          </li>
          <li>
            <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Services</a>
          </li>
          <li>
            <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Pricing</a>
          </li>
          <li>
            <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</a>
          </li>
          <li>  
                <a href="./Login" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Đăng nhập</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
      <List></List>
    </>
  );
}