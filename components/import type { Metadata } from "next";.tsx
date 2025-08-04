import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Remodely.AI - Professional Construction Marketplace",
  description: "Connect with verified contractors for your construction and remodeling projects",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          defaultTheme="system"
          storageKey="remodely-ui-theme"
        >
          {children}
          
          {/* Floating Theme Toggle - Bottom Right */}
          <div className="fixed bottom-6 right-6 z-[100] floating-theme-toggle">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              <div className="relative flex items-center justify-center w-12 h-12 bg-background/90 backdrop-blur-xl border border-border/50 rounded-full shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 hover:scale-110 hover:border-primary/50">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
