import { useEffect, useState } from 'react';
import {db} from './firebase/firebase';
import Detail from './detail'
import { collection, query, orderBy, onSnapshot, addDoc, doc, getDocs } from 'firebase/firestore';

export default function List(){

    const [books, setBooks] = useState<Array<{ID: number,Tentruyen: string, Gioithieu: string}>>([]);
    const [selectedBook, setSelectedBook] = useState<null | { ID: number; Tentruyen: string; Gioithieu: string }>(null);
    const [showHome, setShowHome] = useState(false);

    useEffect(() => {
    const danhsachtruyen = async () =>{
        const q = query(collection(db, 'truyen'));
        const querySnapshot = await getDocs(q);
        const bookData = querySnapshot.docs.map((doc) => ({            
            ID: doc.data().ID,
            Tentruyen: doc.data().Tentruyen,
            Gioithieu: doc.data().Gioithieu
          }));
          setBooks(bookData);
        };
        danhsachtruyen();
      }, []);


      const handleBookClick = (book: { ID: number; Tentruyen: string; Gioithieu: string }) => {
         setSelectedBook(book); // Update selectedBook state on click
         
       };
      if(selectedBook != null){
        return (
            
         <Detail Gioithieu={selectedBook.Gioithieu} Tentruyen={selectedBook.Tentruyen} ID={selectedBook.ID} ></Detail>
          
        )
      }
      else

return(
    
<ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
{books.map((book) => (

      
    <li className="pb-3 sm:pb-4" key={book.ID} onClick={() => handleBookClick(book)}>
    <div className="flex items-center space-x-4 rtl:space-x-reverse">
       <div className="flex-shrink-0">
          <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Neil image"></img>
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
    </div>
   
 </li>
       
        ))}
   
    
</ul>


)
}