import type { Metadata } from "next";
import localFont from 'next/font/local';
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import 'easymde/dist/easymde.min.css';

const workSans = localFont({
  src: [
    {
      path: './fonts/WorkSans-ExtraLight.ttf',
      weight: '100',
      style: 'normal', 
    },
    {
      path: './fonts/WorkSans-Regular.ttf',
      weight: '400',
      style: 'normal', 
    },
    {
      path: './fonts/WorkSans-Medium.ttf',
      weight: '500',
      style: 'normal', 
    },
    {
      path: './fonts/WorkSans-SemiBold.ttf',
      weight: '600',
      style: 'normal', 
    },
    {
      path: './fonts/WorkSans-Bold.ttf',
      weight: '700',
      style: 'normal', 
    },
    {
      path: './fonts/WorkSans-ExtraBold.ttf',
      weight: '800',
      style: 'normal', 
    },
    {
      path: './fonts/WorkSans-Black.ttf',
      weight: '900',
      style: 'normal', 
    }
  ],
  variable: "--font-work-sans", // the class which will be used to set these fonts
})
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "NextJSProject",
  description: "NextJs Project for NextJs Learning Purposes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={workSans.variable}
      >
        {children}
      </body>
    </html>
  );
}
function customLocalFont(arg0: {}) {
  throw new Error("Function not implemented.");
}

