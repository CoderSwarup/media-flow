import type { Metadata } from "next";
import "./globals.css";
import { DM_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { BillingProvider } from "@/components/providers/billing-provider";

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
          <BillingProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem={false}
              storageKey="Fuzzie"
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </BillingProvider>
          <Toaster position="bottom-right" />
        </body>
      </html>
    </ClerkProvider>
  );
}
