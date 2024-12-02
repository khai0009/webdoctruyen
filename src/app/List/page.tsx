"use client";

import Image from 'next/image'
import getBooks from '../Data'
import { useEffect, useState } from 'react';
import Link from 'next/link';
export default function List(){

   
   const [books, setBooks] = useState<Array<{ ID: string, Tentruyen: string, Gioithieu: string }>>([]); 
   useEffect(() => { const fetchBooks = async () => 
      { try { const bookData = await getBooks(); setBooks(bookData); } 
      catch (error) 
      { console.error("Error fetching books: ", error); } }; 
      fetchBooks(); }, []);


         
return(
    
<ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
{books.map((book) => (
    <li className="pb-3 sm:pb-4" key={book.ID}>
    <Link className="flex items-center space-x-4 rtl:space-x-reverse" href={`/List/Detail/${book.ID}`}>
       <div className="flex-shrink-0">
          <Image className="w-8 h-8 rounded-full" src="https://th.bing.com/th?id=ORMS.5bddfc08472abf5d2a920a5efe7fd841&pid=Wdp&w=268&h=140&qlt=90&c=1&rs=1&dpr=1&p=0" width={100} height={100} alt="image"/>
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