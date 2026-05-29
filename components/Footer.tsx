import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#111] text-zinc-300 py-12 px-6 border-t border-zinc-800 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand Column */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="text-orange-500 font-bold text-2xl">🏛️ CivicIntell</div>
          </div>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Empowering citizens with smart reporting tools, connecting them directly with government officials to foster transparency, action, and smart city growth.
          </p>
        </div>

        {/* Quick Links Column */}
        <div>
          <h3 className="font-bold text-white mb-4 tracking-wider text-sm uppercase">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/" className="hover:text-orange-400 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="hover:text-orange-400 transition-colors">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/report" className="hover:text-orange-400 transition-colors">
                Report Issue
              </Link>
            </li>
            <li>
              <Link href="/map" className="hover:text-orange-400 transition-colors">
                Live Map
              </Link>
            </li>
          </ul>
        </div>

        {/* Platform Values Column */}
        <div>
          <h3 className="font-bold text-white mb-4 tracking-wider text-sm uppercase">Platform Values</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              <span>Transparency</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              <span>Community Driven</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              <span>Real-time Action</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              <span>AI-Powered Analytics</span>
            </li>
          </ul>
        </div>

        {/* Get In Touch Column */}
        <div>
          <h3 className="font-bold text-white mb-4 tracking-wider text-sm uppercase">Get In Touch</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start space-x-3">
              <MapPin size={18} className="text-green-500 mt-0.5 shrink-0" />
              <span>INDIA</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone size={18} className="text-green-500 shrink-0" />
              <span>+91 9827350712</span>
            </li>
            <li className="flex items-center space-x-3">
              <Mail size={18} className="text-green-500 shrink-0" />
              <a href="mailto:support@civil-intelligence.org" className="hover:text-white transition-colors">
                support@civil-intelligence.org
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-zinc-800 flex flex-col items-center space-y-4">
        <p className="text-sm">
          Made with <span className="text-red-500">❤️</span> by <span className="text-green-500 font-medium">OMM</span>
        </p>
        
        <div className="flex space-x-6">
          <a
            href="https://github.com/ommsatapathy2006"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.18-.38 6.52-1.65 6.52-7.1a5.1 5.1 0 0 0-1.4-3.6 5.3 5.3 0 0 0-.1-3.5s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a5.3 5.3 0 0 0-.1 3.5 5.1 5.1 0 0 0-1.4 3.6c0 5.4 3.3 6.7 6.5 7.1a4.8 4.8 0 0 0-1 3.03V22"></path><path d="M9 20c-5 1.5-5-2.5-7-3"></path></svg>
          </a>
          <a
            href="https://www.linkedin.com/in/omm-prakash-satapathy-4761b7322?utm_source=share_via&utm_content=profile&utm_medium=member_android"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
        </div>

        <p className="text-xs text-zinc-500 mt-2 text-center">
          © 2026 civic-intelligence Corporation Limited. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
