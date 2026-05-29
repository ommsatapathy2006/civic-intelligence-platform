import Link from "next/link";
import StatusAnalyticsChart from "@/components/StatusAnalyticsChart";
import { AlertTriangle, Map, BrainCircuit } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-orange-500/30">
      
      {/* Hero Section */}
      <section className="relative px-6 py-24 md:py-32 flex flex-col items-center justify-center text-center overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/20 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center px-3 py-1 mb-6 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-sm font-medium tracking-wide">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse mr-2"></span>
            Smart City Initiative
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-transparent">
            AI Civic Intelligence Platform
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Empowering citizens to report, track, and resolve community issues in real-time. Driven by artificial intelligence and transparency to build better cities together.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/report"
              className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold text-lg transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(249,115,22,0.5)]"
            >
              Report an Issue
            </Link>
            <Link
              href="/map"
              className="px-8 py-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white rounded-xl font-semibold text-lg transition-all"
            >
              View Live Map
            </Link>
          </div>
        </div>
      </section>

      {/* Analytics & Transparency Section */}
      <section className="px-6 py-20 bg-zinc-950 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Transparency by Design</h2>
            <p className="text-zinc-400 text-lg mb-6 leading-relaxed">
              We believe in open data. Our platform publicly tracks every issue reported by the community, categorizing them and monitoring their resolution status in real-time.
            </p>
            <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
              Hold your local government accountable by seeing exactly how quickly civic issues are being addressed in your neighborhood.
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center text-orange-400 hover:text-orange-300 font-semibold text-lg transition-colors"
            >
              Explore Dashboard Analytics →
            </Link>
          </div>
          
          <div className="h-[400px]">
            <StatusAnalyticsChart />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-24 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            A seamless bridge between citizens and government officials, powered by modern technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-zinc-900/50 p-8 rounded-3xl border border-zinc-800 hover:border-orange-500/30 transition-colors">
            <div className="w-14 h-14 bg-orange-500/10 text-orange-500 rounded-2xl flex items-center justify-center mb-6">
              <AlertTriangle size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3">1. Report</h3>
            <p className="text-zinc-400 leading-relaxed">
              Snap a photo and easily submit details about potholes, flooding, garbage, and other civic issues happening around you.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-zinc-900/50 p-8 rounded-3xl border border-zinc-800 hover:border-orange-500/30 transition-colors">
            <div className="w-14 h-14 bg-green-500/10 text-green-500 rounded-2xl flex items-center justify-center mb-6">
              <Map size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3">2. Locate</h3>
            <p className="text-zinc-400 leading-relaxed">
              Our system automatically tags the geographic coordinates of your report, placing a marker on our live interactive city map.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-zinc-900/50 p-8 rounded-3xl border border-zinc-800 hover:border-orange-500/30 transition-colors">
            <div className="w-14 h-14 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center mb-6">
              <BrainCircuit size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3">3. Analyze & Resolve</h3>
            <p className="text-zinc-400 leading-relaxed">
              Officials use our AI-powered admin dashboard to prioritize issues based on severity and mark them as resolved once fixed.
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}