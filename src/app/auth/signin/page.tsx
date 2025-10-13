"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPasswrod] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn("credentials", { email, password, callbackUrl: "/" });
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleLogin}
        className="p-6 bg-white rounded-xl shadow-xl w-80"
      >
        <h1 className="text-xl font-bold mb-4">signIn</h1>
        <input
          type="email"
          className="border w-full p-2 mb-3 rounded"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="border w-full p-2 mb-3 rounded"
          placeholder="passwrod"
          value={password}
          onChange={(e) => setPasswrod(e.target.value)}
        />
        <button className="bg-blue-600 text-white w-full py-2 rounded">
          signIn
        </button>
        <Link href={"/auth/signup"}>SignUp</Link>
      </form>
    </div>
  );
}
