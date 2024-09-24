"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import logo from "../../public/assets/logo.png";
import { StarFilledIcon, PieChartIcon, MixerHorizontalIcon, GearIcon } from "@radix-ui/react-icons";
import { FiX } from 'react-icons/fi';

export default function SideBar({ isOpen, onClose }) {
  const pathname = usePathname();

  const baseLinkClass = "flex gap-2 py-2 px-3 rounded";
  const getLinkClass = (path) =>
    pathname === path 
      ? `${baseLinkClass} bg-green-700 text-white`
      : `${baseLinkClass} hover:bg-green-700 text-green-700 hover:text-white`;
  const iconClass = "w-5 h-5";

  return (
    <aside className={`bg-white h-full md:h-screen text-gray-800 w-64 p-4 fixed top-0 left-0 z-50 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 ease-in-out md:relative md:translate-x-0`}>
      <div className="flex flex-col justify-between items-center mb-4 md:hidden">
      <button onClick={onClose} className="text-gray-700 self-end">
        <FiX size={24} />
      </button>
        <Image
          src={logo}
          alt="Logo"
          className="h-40 w-40"
        />
      </div>

      <div className="w-full flex-col items-center justify-center mb-4 hidden md:flex">
        <Image
          src={logo}
          alt="Logo"
          className="h-40 w-40"
        />
      </div>

      <nav>
        <ul className="space-y-4">
          <li>
            <Link href="/campanhas" className={getLinkClass("/campanhas")}>
              <StarFilledIcon className={iconClass} />
              Campanhas
            </Link>
          </li>
          <li>
            <Link href="/dashboard" className={getLinkClass("/dashboard")}>
              <PieChartIcon className={iconClass} />
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/permissoes" className={getLinkClass("/permissoes")}>
              <MixerHorizontalIcon className={iconClass} />
              Permissões
            </Link>
          </li>
          <li>
            <Link href="/configuracoes" className={getLinkClass("/configuracoes")}>
              <GearIcon className={iconClass} />
              Configurações
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
