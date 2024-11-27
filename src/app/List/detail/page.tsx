"use client"

import { db } from '@/app/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Detail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [books, setBooks] = useState<{ID: number, Tentruyen: string, Gioithieu: string} | null>(null);

  useEffect(() => {
    const danhsachtruyen = async () => {
      if (id) {
        try {
          const q = query(collection(db, 'truyen'), where("ID", "==", id));
          const querySnapshot = await getDocs(q);
          const bookData = querySnapshot.docs.map((doc) => ({
            ID: doc.data().ID,
            Tentruyen: doc.data().Tentruyen,
            Gioithieu: doc.data().Gioithieu
          }));
          if (bookData.length > 0) {
            setBooks(bookData[0]);
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching documents: ", error);
        }
      }
    };
    danhsachtruyen();
  }, [id]);

  if (!books) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{books.Tentruyen}</h1>
      <p>{books.Gioithieu}</p>
      {/* Thêm thông tin chi tiết về sách ở đây */}
    </div>
  );
};

export default Detail;
