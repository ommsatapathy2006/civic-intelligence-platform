import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-zinc-300 py-16 px-6 border-t border-zinc-800/50 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Brand Column */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🏛️</span>
            <div className="font-bold text-2xl">
              <span className="text-orange-500">Civic</span>
              <span className="text-white">Intell</span>
            </div>
          </div>
          <p className="text-sm text-zinc-500 leading-relaxed">
            Empowering citizens with smart reporting tools, connecting them directly with government officials to foster transparency, action, and smart city growth.
          </p>
        </div>

        {/* Quick Links Column */}
        <div>
          <h3 className="font-bold text-white mb-5 tracking-wider text-xs uppercase">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            {[
              { name: "Home", href: "/" },
              { name: "Dashboard", href: "/dashboard" },
              { name: "Report Issue", href: "/report" },
              { name: "Live Map", href: "/map" },
            ].map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-zinc-500 hover:text-orange-400 transition-colors duration-300"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Platform Values Column */}
        <div>
          <h3 className="font-bold text-white mb-5 tracking-wider text-xs uppercase">Platform Values</h3>
          <ul className="space-y-3 text-sm">
            {["Transparency", "Community Driven", "Real-time Action", "AI-Powered Analytics"].map((value) => (
              <li key={value} className="flex items-center space-x-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span className="text-zinc-500">{value}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Get In Touch Column */}
        <div>
          <h3 className="font-bold text-white mb-5 tracking-wider text-xs uppercase">Get In Touch</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start space-x-3">
              <MapPin size={16} className="text-emerald-500 mt-0.5 shrink-0" />
              <span className="text-zinc-500">INDIA</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone size={16} className="text-emerald-500 shrink-0" />
              <span className="text-zinc-500">+91 9827350712</span>
            </li>
            <li className="flex items-center space-x-3">
              <Mail size={16} className="text-emerald-500 shrink-0" />
              <a
                href="mailto:support@civil-intelligence.org"
                className="text-zinc-500 hover:text-white transition-colors duration-300"
              >
                support@civil-intelligence.org
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-zinc-800/50 flex flex-col items-center space-y-5">
        <p className="text-sm text-zinc-500">
          Made with{" "}
          <span className="text-red-500 animate-pulse inline-block">❤️</span>{" "}
          by{" "}
          <span className="text-orange-400 font-semibold">OMM</span>
        </p>

        <div className="flex space-x-5">
          <a
            href="https://github.com/ommsatapathy2006"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 hover:text-white transition-all duration-300 hover:scale-110"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.18-.38 6.52-1.65 6.52-7.1a5.1 5.1 0 0 0-1.4-3.6 5.3 5.3 0 0 0-.1-3.5s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a5.3 5.3 0 0 0-.1 3.5 5.1 5.1 0 0 0-1.4 3.6c0 5.4 3.3 6.7 6.5 7.1a4.8 4.8 0 0 0-1 3.03V22"></path><path d="M9 20c-5 1.5-5-2.5-7-3"></path></svg>
          </a>
          <a
            href="https://www.linkedin.com/in/omm-prakash-satapathy-4761b7322?utm_source=share_via&utm_content=profile&utm_medium=member_android"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 hover:text-white transition-all duration-300 hover:scale-110"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
        </div>

        <p className="text-xs text-zinc-600 text-center">
          © 2026 civic-intelligence Corporation Limited. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
