import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { InventoryProvider } from '@/components/inventory-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BPN Inventory Dashboard',
  description: 'Dark-mode inventory management MVP for PT Bumi Palma Nusantara.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <InventoryProvider>{children}</InventoryProvider>
      </body>
    </html>
  );
}
