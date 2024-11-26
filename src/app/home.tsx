

import Image from "next/image";
import React, { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup, signOut, User } from 'firebase/auth';
import { auth } from './firebase/firebase';

export default function Home() {
  const [user, setUser] = useState<null | User>(null)

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);
      console.log(user);   
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };
  const logout = async () => {
    setUser(null);
  }
  return (
    <div className="">
        <input ></input>
      <button onClick={handleGoogleSignIn}>Đăng nhập bằng Google</button>
      {user && <><div>Xin chào, {user.displayName}</div><button onClick={logout}>Dang xuat</button></>}
    </div>
  );
};
