"use client";
import { db } from '@/app/firebase';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';


type Chapter = {
  ID: string,
  IDchuong: string,
  Chuong: string,
  Ngaycapnhat: string,
  Noidung: string;
};

const Chapter: React.FC = () => {
  const Router = useRouter();
  const maxlength = useRef(0);
  const params = useParams<{id: string, IDchapter: string}>(); 
  const [chapter, setChapter] = useState<Chapter | null>(null);



  useEffect(() => {
    const fetchBook = async () => {
      if (params.IDchapter) {
        try {
          const q = query(collection(db, 'Chuong'),where('ID','==',params.id),orderBy('Ngaycapnhat','asc'));
          const querySnapshot = await getDocs(q);
          const chapterData = querySnapshot.docs.map((doc) => ({
            ID: doc.data().ID,
            Chuong: doc.data().Chuong,
            IDchuong: doc.data().IDchuong,
            Ngaycapnhat: doc.data().Ngaycapnhat,
            Noidung: doc.data().Noidung,
            
          }));
          maxlength.current = chapterData.length;
          if (chapterData.length > 0) {
            setChapter(chapterData[parseInt(params.IDchapter.toString())-1]);
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error('Error fetching document: ', error);
        }
      }
    };
    fetchBook();
  }, [params.IDchapter,params.id]); // Re-fetch data whenever IDchapter changes

  const next = () => {
    if (params.IDchapter && (parseInt(params.IDchapter.toString()) < maxlength.current)) {
      const newID = (parseInt(params.IDchapter.toString()) + 1).toString();
      Router.push('/List/Detail/'+params.id+'/'+newID)
      }
  }
  

  const prev = () => {
    if (params.IDchapter && (parseInt(params.IDchapter.toString()) > 1)) {
      const newID = (parseInt(params.IDchapter.toString()) - 1).toString();
      Router.push('/List/Detail/'+params.id+'/'+newID)
      
    }
  }

  if (!chapter) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" m-auto md:w-[70%] mt-1 w-[90%]">
      <h1 className='text-black font-bold text-2xl'>{chapter.Chuong}</h1>
      <p className='mt-2 p-1 w-full max-h-dvh rounded-sm text-black border border-black text-xl overflow-x-auto'>{chapter.Noidung}</p>
      <div className="w-fit m-auto mt-2 space-x-2">
         <span className="bg-red-100 text-red-800 md:text-xl text-sm font-medium  px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300 cursor-pointer" onClick={prev}>Chương trước</span>
         <span className="text-black text-center w-10 text-xl">{chapter.IDchuong}</span> 
          <span className="bg-red-100 text-red-800 md:text-xl text-sm font-medium  px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300 cursor-pointer" onClick={next}>Chương sau</span>
         
      </div>
     
    </div>
  );
};

export default Chapter;
