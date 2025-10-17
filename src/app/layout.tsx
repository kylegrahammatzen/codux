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
    <html lang="en">
      <body className="antialiased bg-gray-200 p-2 h-screen overflow-hidden flex flex-col gap-2">
        <AppProvider>{props.children}</AppProvider>
      </body>
    </html>
  );
}
