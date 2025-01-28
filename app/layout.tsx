import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Link from "next/link"
import { CommandMenu } from "./components/command-menu"
import { ThemeProvider } from "./components/theme-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Kris Yotam",
  description: "Investor and founder",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="max-w-2xl mx-auto px-4 py-12">
            <header className="flex justify-between mb-12">
              <Link href="/" className="text-lg font-medium">
                Kris Yotam
              </Link>
              <nav className="space-x-6 flex items-center">
                <Link
                  href="/investing"
                  className="text-gray-600 hover:text-gray-900 dark:text-dark-text dark:hover:text-gray-300"
                >
                  Investing
                </Link>
                <Link
                  href="/press"
                  className="text-gray-600 hover:text-gray-900 dark:text-dark-text dark:hover:text-gray-300"
                >
                  Press
                </Link>
              </nav>
            </header>
            {children}
          </div>
          <CommandMenu />
        </ThemeProvider>
      </body>
    </html>
  )
}

