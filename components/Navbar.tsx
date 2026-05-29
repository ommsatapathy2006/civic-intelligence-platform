"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "@/firebase/config";

export default function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
    <nav
      className={`sticky top-0 z-50 p-4 transition-all duration-500 ${
        scrolled
          ? "glass-nav shadow-lg shadow-black/20"
          : "bg-transparent border-b border-zinc-800/50"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold text-white flex items-center gap-2 group"
        >
          <span className="text-2xl transition-transform duration-300 group-hover:rotate-12">
            🏛️
          </span>
          <span className="text-orange-500 transition-colors">Civic</span>
          <span className="transition-colors">Intelligence</span>
        </Link>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-zinc-400 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {mobileOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-1 items-center">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                pathname === link.href
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {link.name}
            </Link>
          ))}
          {user ? (
            <button
              onClick={handleLogout}
              className="ml-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 text-zinc-400 hover:text-white hover:bg-red-500/20 hover:text-red-400"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className={`ml-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                pathname === "/login"
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden mt-4 glass-card rounded-2xl p-4 animate-fade-in-up space-y-2">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                pathname === link.href
                  ? "bg-orange-500 text-white"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {link.name}
            </Link>
          ))}
          {user ? (
            <button
              onClick={() => {
                handleLogout();
                setMobileOpen(false);
              }}
              className="block w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-zinc-400 hover:text-red-400 hover:bg-red-500/10"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 rounded-xl text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
