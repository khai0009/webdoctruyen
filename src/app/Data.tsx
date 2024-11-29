

import { db } from './firebase'; 
import { collection, getDocs, query } from 'firebase/firestore'; 

const getBooks = async () => { 
  const q = query(collection(db, 'truyen')); 
  const querySnapshot = await getDocs(q); 
  const bookData = querySnapshot.docs.map((doc) => 
    ({ ID: doc.data().ID, 
      Tentruyen: doc.data().Tentruyen, 
      Gioithieu: doc.data().Gioithieu })); 
  return bookData; }; 
export default getBooks