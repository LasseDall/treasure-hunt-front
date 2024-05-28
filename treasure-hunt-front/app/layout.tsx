'use client'

import SideNav from '@/app/ui/dashboard/sidenav';
import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import styles from './ui/home.module.css'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type='image/jpeg' href="/assets/treasure.png" />
        <title>Treasure Hunt</title>
      </head>
      <body className={`${inter.className} antialiased`}>
          {children}
      </body>    
    </html>
  );
}


