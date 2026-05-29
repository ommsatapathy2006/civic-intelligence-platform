"use client";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase/config";

export default function LoginPage() {

  const handleGoogleLogin = async () => {

    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
      alert("Login Successful");
    } catch (error) {
      console.error(error);
      alert("Login Failed");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center">

      <h1 className="text-4xl font-bold mb-8">
        Civic Intelligence Login
      </h1>

      <button
        onClick={handleGoogleLogin}
        className="bg-white text-black px-6 py-3 rounded-xl"
      >
        Sign in with Google
      </button>

    </main>
  );
}