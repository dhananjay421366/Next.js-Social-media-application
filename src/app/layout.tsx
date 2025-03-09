import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "./components/Providers";
import Header from "./components/Header";
import { NotificationProvider } from "./components/Notification";
import Footer from "./components/Footer";
import { ThemeProvider } from "next-themes";
import MouseTrail from './components/MouseTrail'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ImageKit Next.js Integration",
  description: "Demo of ImageKit integration with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" enableSystem disableTransitionOnChange>
          <Providers>
            <NotificationProvider>
              <Header />
              <MouseTrail/>
              <main className="container mx-auto px-4 py-8">{children}</main>
              <Footer />
            </NotificationProvider>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
