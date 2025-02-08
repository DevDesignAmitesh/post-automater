"use client";

import { signIn } from "next-auth/react";
import React from "react";
import { FcGoogle } from "react-icons/fc";

const page = () => {
  return (
    <main className="w-full h-screen bg-[#111827] text-white flex justify-center items-center">
      <button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="border border-white px-4 py-2 rounded-md flex items-center gap-2"
      >
        <FcGoogle size={20} />
        Sign in with Google
      </button>
    </main>
  );
};

export default page;
