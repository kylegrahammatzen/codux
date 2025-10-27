import type { Metadata } from "next";
import { ThemeProvider } from "@/providers/theme-provider";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Codux",
  description: "An open-source platform to create, edit, and deploy full-stack web applications.",
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout(props: RootLayoutProps) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="antialiased h-full">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {props.children}
        </ThemeProvider>
      </body>
    </html>
  );
}


