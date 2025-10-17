import type { Metadata } from "next";
import { AppProvider } from "@/components/app-context";
import "./globals.css";

export const metadata: Metadata = {
  title: "Codux",
  description: "An open-source platform to create, edit, and deploy full-stack web applications.",
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout(props: RootLayoutProps) {
  return (
    <html lang="en" className="h-full">
      <body className="antialiased bg-gray-100 p-2 h-full flex flex-col overflow-hidden">
        <AppProvider>{props.children}</AppProvider>
      </body>
    </html>
  );
}


