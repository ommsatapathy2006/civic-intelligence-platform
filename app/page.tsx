"use client";

import Link from "next/link";
import StatusAnalyticsChart from "@/components/StatusAnalyticsChart";
import { AlertTriangle, Map, BrainCircuit, Shield, Users, BarChart3 } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-orange-500/30 overflow-hidden">

      {/* ====== Hero Section ====== */}
      <section className="relative px-6 py-28 md:py-40 flex flex-col items-center justify-center text-center overflow-hidden">
        {/* Animated background orbs */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-orange-600/15 blur-[150px] rounded-full pointer-events-none animate-glow-pulse"></div>
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none animate-glow-pulse delay-500"></div>
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-emerald-500/8 blur-[100px] rounded-full pointer-events-none animate-glow-pulse delay-300"></div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="animate-fade-in-up inline-flex items-center px-4 py-1.5 mb-8 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-sm font-medium tracking-wide">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse mr-2"></span>
            Smart City Initiative • Powered by AI
          </div>
          <h1 className="animate-fade-in-up delay-100 text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 bg-gradient-to-br from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent leading-tight">
            AI Civic Intelligence
          </h1>
          <p className="animate-fade-in-up delay-200 text-lg md:text-xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Empowering citizens to report, track, and resolve community issues in real-time. Driven by artificial intelligence and transparency to build better cities together.
          </p>
          <div className="animate-fade-in-up delay-300 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/report"
              className="press-effect px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-2xl font-semibold text-lg transition-all shadow-[0_0_50px_-12px_rgba(249,115,22,0.6)] hover:shadow-[0_0_60px_-8px_rgba(249,115,22,0.7)]"
            >
              🚨 Report an Issue
            </Link>
            <Link
              href="/map"
              className="press-effect px-8 py-4 glass-card text-white rounded-2xl font-semibold text-lg transition-all hover:border-orange-500/30"
            >
              🗺️ View Live Map
            </Link>
          </div>
        </div>

        {/* Floating decorative elements */}
        <div className="absolute bottom-10 left-10 w-3 h-3 bg-orange-500/40 rounded-full animate-float delay-200"></div>
        <div className="absolute top-20 right-16 w-2 h-2 bg-emerald-500/40 rounded-full animate-float delay-500"></div>
        <div className="absolute bottom-20 right-20 w-4 h-4 bg-amber-500/30 rounded-full animate-float delay-700"></div>
      </section>

      {/* ====== Stats Bar ====== */}
      <section className="px-6 py-12 border-t border-zinc-900 bg-zinc-950/50">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Active Cities", value: "50+", icon: "🏙️" },
            { label: "Issues Reported", value: "10K+", icon: "📋" },
            { label: "Issues Resolved", value: "8.5K+", icon: "✅" },
            { label: "Citizens Engaged", value: "25K+", icon: "👥" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className={`animate-fade-in-up delay-${(i + 1) * 100} glass-card hover-lift rounded-2xl p-6 text-center transition-all duration-300 cursor-default`}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-zinc-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ====== Analytics & Transparency Section ====== */}
      <section className="px-6 py-24 bg-zinc-950 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="animate-slide-in-left">
            <div className="inline-flex items-center px-3 py-1 mb-4 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-medium tracking-wider uppercase">
              Live Analytics
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Transparency by <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">Design</span>
            </h2>
            <p className="text-zinc-400 text-lg mb-6 leading-relaxed">
              We believe in open data. Our platform publicly tracks every issue reported by the community, categorizing them and monitoring their resolution status in real-time.
            </p>
            <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
              Hold your local government accountable by seeing exactly how quickly civic issues are being addressed in your neighborhood.
            </p>
            <Link
              href="/dashboard"
              className="press-effect inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 font-semibold transition-all duration-300"
            >
              <BarChart3 size={20} />
              Explore Dashboard Analytics →
            </Link>
          </div>

          <div className="animate-slide-in-right h-[400px]">
            <StatusAnalyticsChart />
          </div>
        </div>
      </section>

      {/* ====== How It Works ====== */}
      <section className="px-6 py-28 max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <div className="animate-fade-in-up inline-flex items-center px-3 py-1 mb-4 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-medium tracking-wider uppercase">
            How It Works
          </div>
          <h2 className="animate-fade-in-up delay-100 text-3xl md:text-5xl font-bold mb-4">
            Three Simple Steps
          </h2>
          <p className="animate-fade-in-up delay-200 text-zinc-400 text-lg max-w-2xl mx-auto">
            A seamless bridge between citizens and government officials, powered by modern technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <AlertTriangle size={28} />,
              color: "orange",
              title: "1. Report",
              desc: "Snap a photo and easily submit details about potholes, flooding, garbage, and other civic issues happening around you.",
            },
            {
              icon: <Map size={28} />,
              color: "emerald",
              title: "2. Locate",
              desc: "Our system automatically tags the geographic coordinates of your report, placing a marker on our live interactive city map.",
            },
            {
              icon: <BrainCircuit size={28} />,
              color: "blue",
              title: "3. Analyze & Resolve",
              desc: "Officials use our AI-powered admin dashboard to prioritize issues based on severity and mark them as resolved once fixed.",
            },
          ].map((feature, i) => (
            <div
              key={feature.title}
              className={`animate-fade-in-up delay-${(i + 1) * 200} glass-card hover-lift p-8 rounded-3xl transition-all duration-300 cursor-default`}
            >
              <div
                className={`w-14 h-14 bg-${feature.color}-500/10 text-${feature.color}-500 rounded-2xl flex items-center justify-center mb-6`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-zinc-400 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ====== Why Choose Us ====== */}
      <section className="px-6 py-24 bg-zinc-950 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="animate-fade-in-up text-3xl md:text-5xl font-bold mb-4">
              Why Choose <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">Civic Intelligence</span>
            </h2>
            <p className="animate-fade-in-up delay-100 text-zinc-400 text-lg max-w-2xl mx-auto">
              Built with cutting-edge technology to serve communities better.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield size={24} />,
                title: "Secure & Private",
                desc: "Your data is encrypted and protected. We follow the highest security standards to keep your information safe.",
              },
              {
                icon: <Users size={24} />,
                title: "Community-Driven",
                desc: "Built by citizens, for citizens. Every feature is designed to maximize civic participation and government accountability.",
              },
              {
                icon: <BarChart3 size={24} />,
                title: "AI-Powered Insights",
                desc: "Our AI engine analyzes complaint patterns, predicts issue hotspots, and helps governments prioritize resources effectively.",
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className={`animate-fade-in-up delay-${(i + 1) * 200} glass-card hover-lift p-8 rounded-3xl transition-all duration-300 cursor-default group`}
              >
                <div className="w-12 h-12 bg-orange-500/10 text-orange-400 rounded-xl flex items-center justify-center mb-5 group-hover:bg-orange-500/20 transition-colors duration-300">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== CTA Section ====== */}
      <section className="px-6 py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-black"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-600/10 blur-[140px] rounded-full pointer-events-none animate-glow-pulse"></div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="animate-fade-in-up text-3xl md:text-5xl font-bold mb-6">
            Ready to Make Your City Smarter?
          </h2>
          <p className="animate-fade-in-up delay-100 text-zinc-400 text-lg mb-10">
            Join thousands of citizens who are already using AI-powered tools to improve their communities. Your voice matters.
          </p>
          <div className="animate-fade-in-up delay-200 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/report"
              className="press-effect px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-2xl font-semibold text-lg shadow-[0_0_50px_-12px_rgba(249,115,22,0.6)] hover:shadow-[0_0_60px_-8px_rgba(249,115,22,0.7)] transition-all"
            >
              Get Started — It&apos;s Free
            </Link>
            <Link
              href="/dashboard"
              className="press-effect px-8 py-4 glass-card text-white rounded-2xl font-semibold text-lg transition-all"
            >
              View Analytics
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}