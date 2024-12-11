"use client";
import { db } from '@/app/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type Chapter = {
  ID: string,
  IDchuong: string,
  Chuong: string,
  Ngaycapnhat: string,
  Noidung: string;
};

const Chapter: React.FC = () => {
  const params = useParams(); 
  const [IDchapter, setIDChapter] = useState<string | undefined>(params?.IDchapter?.toLocaleString());
  const [chapter, setChapter] = useState<Chapter | null>(null);
  
  const next = () => {
    if (IDchapter) {
      const newID = (parseInt(IDchapter.toString()) + 1).toString();
      setIDChapter(newID);
      console.log(newID);
    }
  }

  const pre = () => {
    if (IDchapter) {
      const newID = (parseInt(IDchapter.toString()) - 1).toString();
      setIDChapter(newID);
      console.log(newID);
    }
  }

  useEffect(() => {
    const fetchBook = async () => {
      if (IDchapter) {
        try {
          const q = query(collection(db, 'Chuong'), where('IDchuong', '==', IDchapter));
          const querySnapshot = await getDocs(q);
          const chapterData = querySnapshot.docs.map((doc) => ({
            ID: doc.data().ID,
            Chuong: doc.data().Chuong,
            IDchuong: doc.data().IDchuong,
            Ngaycapnhat: doc.data().Ngaycapnhat,
            Noidung: doc.data().Noidung,
          }));
          if (chapterData.length > 0) {
            setChapter(chapterData[0]);
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error('Error fetching document: ', error);
        }
      }
    };
    fetchBook();
  }, [IDchapter]); // Re-fetch data whenever IDchapter changes

  if (!chapter) {
    return <div>Loading...</div>;
  }

  return (
    <div className="md:w-[80%] m-auto w-[90%] mt-1">
      <h1 className='text-black font-bold text-2xl'>{chapter.Chuong}</h1>
      <p className='mt-2 p-1 w-full h-full rounded-sm text-black border border-black text-xl'>{chapter.Noidung}</p>
      <div className="w-fit m-auto mt-2 space-x-2">
         <span className="bg-red-100 text-red-800 text-xl font-medium  px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300 cursor-pointer" onClick={pre}>Chương trước</span>
         <span className="text-black text-center w-10 text-xl">{chapter.IDchuong}</span>
         <span className="bg-red-100 text-red-800 text-xl font-medium  px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300 cursor-pointer" onClick={next}>Chương sau</span>
      </div>
     
    </div>
  );
};

export default Chapter;
