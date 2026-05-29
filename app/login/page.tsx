"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase/config";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.push("/dashboard");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push("/dashboard");
    } catch (error: any) {
      console.error(error);
      alert("Login Failed: " + (error.message || "Unknown error"));
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/10 blur-[150px] rounded-full pointer-events-none animate-glow-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-amber-500/8 blur-[100px] rounded-full pointer-events-none animate-glow-pulse delay-500"></div>

      <div className="animate-scale-in glass-card rounded-3xl p-10 md:p-14 max-w-md w-full text-center relative z-10">
        <div className="text-6xl mb-6 animate-float">🏛️</div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Welcome Back</h1>
        <p className="text-zinc-400 mb-10 text-sm leading-relaxed">
          Sign in to your Civic Intelligence account to report issues, track resolutions, and make your city smarter.
        </p>

        <button
          onClick={handleGoogleLogin}
          className="press-effect w-full flex items-center justify-center gap-3 bg-white text-black px-6 py-4 rounded-2xl font-semibold hover:bg-zinc-100 transition-all duration-300 shadow-lg shadow-white/5"
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Sign in with Google
        </button>

        <p className="text-zinc-600 text-xs mt-8">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </main>
  );
}