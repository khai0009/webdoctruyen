"use client"
import { collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./firebase";

export default function Dropdowngenre(){
const [isOpen, setIsOpen] = useState(false);
const [theloai,settheloai] = useState<Array<{ID: string,TenTheLoai: string}>>([]);

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
      }, [])

      return (
      <div className="relative inline-block text-left  h-full">
        <div className="flex items-center">
      <a
        type="button"
        className=" px-3 my-auto text-white rounded  md:p-0  "
        id="menu-button"
        aria-expanded="false"   

        aria-haspopup="true"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        Thể loại
      </a>
      </div>
      {isOpen && (
        <div
          className="origin-top-right md:absolute relative right-0 w-56   
 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none md:top-6"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"   
          onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
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
              onMouseEnter={() => setIsOpen(true)}
            >
              {theLoai.TenTheLoai}
              
            </a>
          ))}
          </div>
        </div>
      )}
    </div>
      );
}