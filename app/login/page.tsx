"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, FC } from "react";
import { useAppDispatch } from "../redux/hooks";
import { loginUser } from "../redux/reducers/UserSlice";

const Login: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const dispatch = useAppDispatch();

  const login = async (): Promise<void> => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const result = await res.json();
      router.push("/");
      console.log(result);

      if (result.StatusCode === 200) {
        dispatch(loginUser(result.token));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-[400px] flex flex-col justify-center items-center gap-4 shadow-xl py-5 px-3 border-[1px] border-gray-300">
        <h1 className="text-2xl">Login</h1>
        <input
          type="text"
          placeholder="Email..."
          className="border-[1px] border-gray-300 w-full p-2 rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-[1px] border-gray-300 w-full p-2 rounded-md"
        />
        <button
          type="button"
          className="w-full py-2 rounded-md bg-teal-500 text-white font-semibold"
          title="login"
          onClick={login}
        >
          Login
        </button>
        <div className="w-full flex justify-between items-center">
          <Link href="/" className="text-sm text-teal-500 ">
            Back to Home
          </Link>
          <Link href="/register" className="text-sm text-teal-500 ">
            Don't have an account? Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
