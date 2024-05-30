import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Nav } from "./components/nav";
import { UserProvider } from "../context/user";

const inter = Inter({
  subsets: ["latin"],
  weight: "900",
});

export const metadata: Metadata = {
  title: "Flow State",
  description: "Welcome to flow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={inter.className}>
          <Nav />
          {children}
        </body>
      </UserProvider>
    </html>
  );
}
