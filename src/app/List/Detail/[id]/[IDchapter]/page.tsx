"use client";
import { db } from '@/app/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type chapter = {
    ID: string,
    IDchuong: string,
    Chuong: string,
    Ngaycapnhat: string,
    Noidung: string;
  };
  const Chapter: React.FC  =  () => {
    const { IDchapter } = useParams(); 
    const [chapter,setchapter] = useState<chapter | null>();
  
    useEffect(() => {
      const fetchBook = async () => {
  
        if (IDchapter) {
          try {
            const q = query(collection(db, 'Chuong'), where('IDchuong', '==', IDchapter));
            const querySnapshot = await getDocs(q);
            const chapterdata = querySnapshot.docs.map((doc) => ({
              ID: doc.data().ID,
              Chuong: doc.data().Chuong,
              IDchuong: doc.data().IDchuong,
              Ngaycapnhat: doc.data().Ngaycapnhat,
              Noidung: doc.data().Noidung,
            }));
            if (chapterdata.length > 0) {
              setchapter(chapterdata[0]);
            } else {
              console.log('No such document!');
            }
  
          } catch (error) {
            console.error('Error fetching document: ', error);
          }
        }
      };
      fetchBook();
    }, [IDchapter]);
  
    if (!chapter) {
      return <div>Loading...</div>;
    }
  
    return (
      <div>
        <h1>{chapter.Noidung}</h1>
 
     
 
      </div>
    );
  };
  
  export default Chapter;