import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers/AppProviders";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ScrapeFlow",
  description: "ScrapeFlow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* You can add meta tags or other head elements here if needed */}
      </head>
      <body className={inter.className}>
        <ClerkProvider
          afterSignOutUrl={"/sign-in"}
          appearance={{
            elements: {
              formButtonPrimary:
                "bg-primary hover:bg-primary/90 text-sm !shadow-none",
            },
          }}
        >
          <AppProviders>{children}</AppProviders>
          <Toaster richColors />
          <section
            aria-label="Notifications alt+T"
            tabIndex={-1}
            aria-live="polite"
            aria-relevant="additions text"
            aria-atomic="false"
          >
            {/* Your notification content here */}
          </section>
        </ClerkProvider>
      </body>
    </html>
  );
}