import { useState } from "react";
import {useUser} from './contexts/UserContext';

export default function Dropdownaccount(){
    const [isOpen, setIsOpen] = useState(false);
    const router = useUser();
    const toggle = ()=>setIsOpen(true);

    const sighout = () => {
        router.setUser(null);
    }
    return (
        <>
          {router.user?.displayName ? (
            <div className="relative inline-block text-left">
              <div
                className="py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent relative inline-block text-left"
                onClick={() => toggle()}
              >
                {router.user?.displayName}
              </div>
              {isOpen && (
                <div
                  className="origin-top-right absolute right-0 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  onMouseLeave={() => setIsOpen(false)}
                  tabIndex={-1}
                >
                  <div className="py-1" role="none">
                    <a >Thông tin tài khoản</a>
                    <button onClick={()=>sighout()}>Đăng xuất</button>
                  </div>

                </div>
              )}
            </div>
          ) : (
            <a
              href="./Login"
              className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            >
              Đăng nhập
            </a>
          )}
        </>
      );
      
}