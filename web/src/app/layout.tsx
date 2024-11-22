import type { Metadata } from "next";
import "./globals.css";
import { DM_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";

const font = DM_Sans({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Media Flow...",
  description:
    " Conveys a sense of seamless media management, transcoding, and editing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${font.className} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            storageKey="Fuzzie"
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
