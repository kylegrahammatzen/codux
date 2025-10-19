import type { Metadata } from "next";
import "./globals.css";
import "@/styles/sandpack.css";

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
      <body className="antialiased bg-gray-100 h-full flex flex-col overflow-hidden">
        {props.children}
      </body>
    </html>
  );
}


