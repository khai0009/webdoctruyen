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
    
<ul className="mx-auto md:w-[70%] w-[90%]">
{
books.map((book) => (

    <li className=" mt-2 bg-gray-50 p-2 rounded-md w-full " key={book.ID} >
    <Link className="flex  space-x-4 rtl:space-x-reverse" href={`/List/Detail/${book.ID}`}>
    
       <div className="flex-shrink-0">
          <Image className="h-full w-20 object-cover md:h-full md:w-40" src={book.anh} alt={book.Tentruyen} width={1080} height={1924}/>
       </div>
       <div className="flex-1 min-w-0 ">
          <p className="text-start md:text-lg font-bold text-gray-900 truncate text-base">
          {book.Tentruyen}
          </p>
          <p className="text-sm text-gray-500  w-auto h-auto md:line-clamp-6 md:text-base line-clamp-2 ">
          {book.Gioithieu}
          </p>
       </div>
       <div className="inline-flex items-center text-base font-semibold text-gray-900 ">
      
       </div>
    </Link>
   
 </li>
       
        ))}
   
    
</ul>


)
}