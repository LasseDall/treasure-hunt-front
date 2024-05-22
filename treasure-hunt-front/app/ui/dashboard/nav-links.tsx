import React, { useEffect, useState } from 'react';
import {
  PlayIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  KeyIcon
} from '@heroicons/react/24/outline';
import { logout } from '../../lib/data'

const links = [
  { name: 'News', href: '/news', icon: HomeIcon },
  {
    name: 'Archive',
    href: '/archive',
    icon: DocumentDuplicateIcon,
  },
  {
    name: 'Live Feed',
    href: '/live-feed',
    icon: PlayIcon,
  },
  {
    name: localStorage.getItem('username') ? 'Logout' : 'Login',
    href: localStorage.getItem('username') ? '/logout' : '/login',
    icon: KeyIcon,
  },
];

export default function NavLinks() {
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const handleLogout = () => {
    logout()
  };

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = currentPath === link.href;
        const activeClass = isActive ? 'bg-sky-600 text-white' : 'hover:bg-sky-100 hover:text-blue-600';
        const activeLinkStyle = isActive ? 'bg-sky-400 text-white' : '';

        return (
          <a
            key={link.name}
            href={link.href}
            className={`flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3 ${activeClass} ${activeLinkStyle}`}
            onClick={link.name === 'Logout' ? handleLogout : undefined}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </a>
        );
      })}
    </>
  );
}
