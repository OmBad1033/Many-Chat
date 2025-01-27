import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/provider/theme-provider"
import { Toaster } from "sonner";
import ReactQueryProvider from "@/provider/react-query-provider";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Slide",
  description: "Automate DMs and comments on instagram",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body suppressHydrationWarning className={jakarta.className}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            disableTransitionOnChange
          >
            <ReactQueryProvider>{children}</ReactQueryProvider>

            
            <Toaster />
          </ThemeProvider>

        </body>
      </html>
    </ClerkProvider>
  );
}
