import { ReactNode } from 'react';
import './globals.css';
import './reset.css';

export const metadata = {
  title: '궁예',
  description: '소소한 미래 예측',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
