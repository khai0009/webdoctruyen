import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { UserProvider } from './contexts/UserContext';
import Menu from './menu'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Đọc truyện hay",
  description: "Nơi hội tụ truyện xuất sắc",
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <html lang="vn">
      <head>
      <link rel="icon" href="/vercel.svg" sizes="any" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-white`}
      > 
     <UserProvider>
      <Menu></Menu>
       {children} 
       </UserProvider>
      </body>
    </html>
    </>
  );
}
