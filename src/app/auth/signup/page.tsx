"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function SignUp() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      alert("success");
      router.push("/auth/signin");
    } else {
      alert(data.error || "error");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white rounded-xl shadow-xl w-80"
      >
        <h1 className="text-xl font-bold mb-4">SignUp</h1>
        <input
          type="text"
          className="border w-full p-2 mb-3 rounded"
          placeholder="name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="border w-full p-2 mb-3 rounded"
          type="email"
          placeholder="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="border w-full p-2 mb-3 rounded"
          type="password"
          placeholder="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white w-full py-2 rounded"
        >
          {" "}
          {loading ? "signUp" : "signUping"}
        </button>
      </form>
    </div>
  );
}

export default SignUp;
