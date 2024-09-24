"use client";
import { useState } from 'react';
import Header from './Header';
import SideBar from './SideBar';
import { usePathname } from 'next/navigation';

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  return (
    <>
      {!isLoginPage ? (
        <div className="flex">
          <SideBar isOpen={isSideBarOpen} onClose={() => setIsSideBarOpen(false)} />

          <div className="flex-1">
            <Header onMenuClick={() => setIsSideBarOpen(true)} />

            <main className="">
              {children}
            </main>
          </div>
        </div>
      ) : (
        <div>{children}</div>
      )}
    </>
  );
}
