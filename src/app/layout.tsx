import { Manrope, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

import AppShell from "@/components/shared/layout/AppShell";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300","400","500","600","700"],
  variable: "--font-manrope",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-heading",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${cormorant.variable} font-body`}>
        <AppShell>{children}</AppShell>

        <Toaster
          position="top-center"
          richColors
          toastOptions={{
            className:
              "!rounded-[12px] !bg-white !px-[18px] !py-[14px] !text-[14px] !text-[#1A3C34]",
          }}
        />
      </body>
    </html>
  );
}
