"use client"
import { useEffect, useState } from "react";
import { useUser } from './contexts/UserContext';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import Image from 'next/image'


export default function Dropdownaccount() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useUser();
  const toggle = () => setIsOpen(!isOpen);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      setUser(null);
    }).catch((error) => {
      console.error('Error signing out:', error);
    });
  };
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);

      
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [setUser]);
  
  const profileImage = user?.photoURL || '/images/account.jpg';
  const parts = user?.displayName?.split(" ") || "";
  const firstname = parts[0];

  return (
    <>
      {user?.displayName ? (
        <div className="relative inline-block text-left w-28 ">
          <div
            className=" text-white md:hover:bg-transparent  md:hover:bg-red-200  dark:hover:text-white md:dark:hover:bg-transparent relative"
            onClick={toggle}
          > 
            <div className=" flex flex-row items-center text-center  space-x-1 h-full mx-auto w-fit"><Image width={45} height={45} className="rounded-full border-cyan-50 border-2" src={profileImage} alt={user.displayName}></Image><p>{firstname}</p></div>
          </div>
          {isOpen && (
            <div
              className="origin-top-right relative right-0 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none md:absolute"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              onMouseLeave={() => setIsOpen(false)}
              tabIndex={-1}
            >
              <ul className=" text-black rounded-sm py-1" role="none">
                <li className="hover:bg-gray-200 pl-2 pt-1">
                <div className="text-black">{user.displayName}</div>
                </li>
                <li className="hover:bg-gray-200 pl-2 pt-1">
                <a href="#">Thông tin tài khoản</a>
                </li>
                <li className="hover:bg-gray-200 pl-2 pt-1" onClick={handleSignOut}>
                <div >Đăng xuất</div>
                </li>
                
              </ul>
            </div>
          )}
        </div>
      ) : (
        <a
          href="./Login"
          className="w-28  block my-3 text-center text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
        >
          Đăng nhập
        </a>
      )}
    </>
  );
}
