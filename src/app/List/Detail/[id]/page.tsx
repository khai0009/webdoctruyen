"use client";
import { db } from '@/app/firebase';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

type Book = {
  ID: string;
  Tentruyen: string;
  Gioithieu: string;
};
type chapter = {
  ID: string,
  IDchuong: string,
  Chuong: string,
  Ngaycapnhat: string,
};
const Detail: React.FC  =  () => {
  const { id } = useParams(); 
  const [book, setBook] = useState<Book | null>(null);
  const [chapter,setchapter] = useState<Array<chapter>>([]);

  useEffect(() => {
    const fetchBook = async () => {

      if (id) {
       
        try {
          const q = query(collection(db, 'truyen'), where('ID', '==', id));
          const querySnapshot = await getDocs(q);
          const bookData = querySnapshot.docs.map((doc) => ({
            ID: doc.data().ID,
            Tentruyen: doc.data().Tentruyen,
            Gioithieu: doc.data().Gioithieu,
          }));
          if (bookData.length > 0) {
            setBook(bookData[0]);
          } else {
            console.log('No such document!');
          }

        } catch (error) {
          console.error('Error fetching document: ', error);
        }

        try {
          const q = query(collection(db, 'Chuong'), where('ID', '==', id),orderBy("Ngaycapnhat"));
          const querySnapshot = await getDocs(q);
          const chapterdata = querySnapshot.docs.map((doc) => ({
            ID: doc.data().ID,
            Chuong: doc.data().Chuong,
            IDchuong: doc.data().IDchuong,
            Ngaycapnhat: doc.data().Ngaycapnhat,
          }));
          if (chapterdata.length > 0) {
            setchapter(chapterdata);
          } else {
            console.log('No such document!');
          }

        } catch (error) {
          console.error('Error fetching document: ', error);
        }
      }
    };
    fetchBook();
  }, [id]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{book.Tentruyen}</h1>
      <p>{book.Gioithieu}</p>
          
<ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
    
   {chapter.map((chapter) => (
    <li className="pt-3 pb-0 sm:pt-4" key={chapter.IDchuong}>
      <Link className="w-auto" href={`/List/Detail/${book.ID}/${chapter.IDchuong}`}>
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
       <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
          Chương {chapter.Chuong}
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
          
          </p>
       </div>
       <div className="min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
          Ngày cập nhật
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
          {chapter.Ngaycapnhat}
          </p>
       </div>
    </div>
      </Link>
    
 </li>
   ))}
   
</ul>
    </div>


  );
};

export default Detail;
