// "use client";

// import Link from "next/link";
// import { useSession, signOut } from "next-auth/react";
// import { Home, User } from "lucide-react";
// import { useNotification } from "./Notification";

// export default function Header() {
//   const { data: session } = useSession();
//   const { showNotification } = useNotification();

//   const handleSignOut = async () => {
//     try {
//       await signOut();
//       showNotification("Signed out successfully", "success");
//     } catch {
//       showNotification("Failed to sign out", "error");
//     }
//   };

//   return (
//     <div className="navbar bg-base-300 sticky top-0 z-40">
//       <div className="container mx-auto">
//         <div className="flex-1 px-2 lg:flex-none">
//           <Link
//             href="/"
//             className="btn btn-ghost text-xl gap-2 normal-case font-bold"
//             prefetch={true}
//             onClick={() =>
//               showNotification("Welcome to ImageKit ReelsPro", "info")
//             }
//           >
//             <Home className="w-5 h-5" />
//             ImageKit ReelsPro
//           </Link>
//         </div>
//         <div className="flex flex-1 justify-end px-2">
//           <div className="flex items-stretch gap-2">
//             <div className="dropdown dropdown-end">
//               <div
//                 tabIndex={0}
//                 role="button"
//                 className="btn btn-ghost btn-circle"
//               >
//                 <User className="w-5 h-5" />
//               </div>
//               <ul
//                 tabIndex={0}
//                 className="dropdown-content z-[1] shadow-lg bg-base-100 rounded-box w-64 mt-4 py-2"
//               >
//                 {session ? (
//                   <>
//                     <li className="px-4 py-1">
//                       <span className="text-sm opacity-70">
//                         {session.user?.email?.split("@")[0]}
//                       </span>
//                     </li>
//                     <div className="divider my-1"></div>

//                     <li>
//                       <Link
//                         href="/upload"
//                         className="px-4 py-2 hover:bg-base-200 block w-full"
//                         onClick={() =>
//                           showNotification("Welcome to Admin Dashboard", "info")
//                         }
//                       >
//                         Video Upload
//                       </Link>
//                     </li>

//                     <li>
//                       <button
//                         onClick={handleSignOut}
//                         className="px-4 py-2 text-error hover:bg-base-200 w-full text-left"
//                       >
//                         Sign Out
//                       </button>
//                     </li>
//                   </>
//                 ) : (
//                   <li>
//                     <Link
//                       href="/login"
//                       className="px-4 py-2 hover:bg-base-200 block w-full"
//                       onClick={() =>
//                         showNotification("Please sign in to continue", "info")
//                       }
//                     >
//                       Login
//                     </Link>
//                   </li>
//                 )}
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

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

