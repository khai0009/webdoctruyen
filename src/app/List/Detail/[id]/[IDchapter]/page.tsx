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
    <div>
      <h1>{chapter.Noidung}</h1>
      <button onClick={pre}>Chương trước</button>
      <button onClick={next}>Chương sau</button>
    </div>
  );
};

export default Chapter;
