import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "@/components/common/Navbar";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sheko Kerjen Foundation | Empowering Communities",
  description: "Official portal for Sheko Kerjen Foundation - Promoting public health, child protection, humanitarian assistance, and youth empowerment.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${jakarta.className} bg-white text-gray-900 antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}