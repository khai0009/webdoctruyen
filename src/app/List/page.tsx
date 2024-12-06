"use client";

import Image from 'next/image'
import getBooks from '../Data'
import { useEffect, useState } from 'react';
import Link from 'next/link';
export default function List(){

   
   const [books, setBooks] = useState<Array<{ ID: string, Tentruyen: string, Gioithieu: string,anh: string }>>([]); 
   useEffect(() => { const fetchBooks = async () => 
      { try { const bookData = await getBooks(); 
         setBooks(bookData); 
      } 
      catch (error) 
      { console.error("Error fetching books: ", error); } }; 
      fetchBooks(); }, []);


         
return(
    
<ul className=" divide-y divide-gray-200 dark:divide-gray-700 mx-auto md:w-[70%] w-[90%]">
{
books.map((book) => (

    <li className="pb-3 sm:pb-4 mt-2" key={book.ID}>
    <Link className="flex items-center space-x-4 rtl:space-x-reverse" href={`/List/Detail/${book.ID}`}>
    
       <div className="flex-shrink-0">
          <img className="h-full w-20 object-cover md:h-full md:w-40" src={book.anh} alt={book.Tentruyen}/>
       </div>
       <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
          {book.Tentruyen}
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
          {book.Gioithieu}
          </p>
       </div>
       <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
       {book.ID}
       </div>
    </Link>
   
 </li>
       
        ))}
   
    
</ul>


)
}