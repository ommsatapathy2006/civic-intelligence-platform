"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "@/firebase/config";

export default function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  const links = [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Report Issue", href: "/report" },
    { name: "Map View", href: "/map" },
    { name: "AI Analysis", href: "/ai-test" },
    { name: "Admin", href: "/admin" },
  ];

  return (
    <nav className="bg-zinc-900 border-b border-zinc-800 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-orange-500">Civic</span>Intelligence
        </Link>
        <div className="flex gap-4 items-center">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "bg-orange-500 text-white"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800"
              }`}
            >
              {link.name}
            </Link>
          ))}
          {user ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-colors text-zinc-400 hover:text-white hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                pathname === "/login"
                  ? "bg-orange-500 text-white"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800"
              }`}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
