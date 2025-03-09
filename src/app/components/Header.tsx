"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Home, UploadCloud, LogIn, Sun, Moon, Menu, X } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Ensure dark mode works after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-white">
          <Home className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          ImageKit ReelsPro
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {session && (
            <Link href="/upload" className="flex items-center gap-2 px-4 py-2 bg-blue-600 dark:bg-blue-500 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-400 transition-all">
              <UploadCloud className="w-4 h-4" />
              Upload
            </Link>
          )}

          {session ? (
            <button onClick={() => signOut()} className="px-4 py-2 bg-red-500 dark:bg-red-600 rounded-lg hover:bg-red-600 dark:hover:bg-red-500 transition-all">
              Sign Out
            </button>
          ) : (
            <Link href="/login" className="px-4 py-2 bg-green-500 dark:bg-green-600 rounded-lg hover:bg-green-600 dark:hover:bg-green-500 transition-all">
              Login
            </Link>
          )}

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all"
          >
            {theme === "dark" ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-full bg-gray-200 dark:bg-gray-800"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-4 px-6">
          {session && (
            <Link
              href="/upload"
              className="block py-2 px-4 bg-blue-600 dark:bg-blue-500 rounded-lg text-center text-white mb-2"
            >
              Upload
            </Link>
          )}

          {session ? (
            <button
              onClick={() => signOut()}
              className="block w-full py-2 px-4 bg-red-500 dark:bg-red-600 rounded-lg text-center text-white"
            >
              Sign Out
            </button>
          ) : (
            <Link
              href="/login"
              className="block py-2 px-4 bg-green-500 dark:bg-green-600 rounded-lg text-center text-white"
            >
              Login
            </Link>
          )}

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="mt-3 w-full py-2 px-4 bg-gray-200 dark:bg-gray-800 rounded-lg text-center text-gray-900 dark:text-white"
          >
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      )}
    </nav>
  );
}

