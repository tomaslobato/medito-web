import type { Metadata } from "next";
import "./globals.css";
import SideBar from "@/components/SideBar";
import StreakCount from "@/components/StreakCount";

export const metadata: Metadata = {
  title: "medito-web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-row">
        <SideBar />
        {children}
        <StreakCount />
      </body>
    </html>
  );
}
