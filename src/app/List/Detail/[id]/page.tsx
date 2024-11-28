"use client";
import { db } from '@/app/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type Book = {
  ID: number;
  Tentruyen: string;
  Gioithieu: string;
};

const Detail: React.FC  =  () => {
  const { id } = useParams(); 

  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    const fetchBook = async () => {

      if (id) {
       
        try {
          const q = query(collection(db, 'truyen'), where('ID', '==', parseInt(id.toString())));
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
    </div>
  );
};

export default Detail;
