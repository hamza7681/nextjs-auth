"use client";

import Link from "next/link";
import React, { FC } from "react";
import { usePathname } from "next/navigation";
import { Routes } from "@/app/interfaces";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { logoutUser } from "@/app/redux/reducers/UserSlice";

const Navbar: FC = () => {
  const pathname: string = usePathname();
  const { token } = useAppSelector((s) => s.users);
  const dispatch = useAppDispatch();
  const routes: Routes[] = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Blog",
      path: "/blog",
    },
  ];
  return (
    <nav className="flex justify-between items-center h-[70px] bg-teal-500 px-8">
      <div>
        <p className="text-3xl italic font-semibold text-white">Logo</p>
      </div>
      <div className="flex justify-start items-center gap-3  font-semibold ">
        {routes.map((val, id) => {
          return (
            <Link
              key={id}
              href={val.path}
              className={`px-3 py-2 rounded-sm ${
                pathname === val.path ? "bg-white text-teal-500" : "text-white"
              }`}
            >
              {val.name}
            </Link>
          );
        })}
        {token ? (
          <button
            className="bg-black px-4 py-2 rounded-full text-white font-semibold"
            title="logout"
            type="button"
            onClick={() => dispatch(logoutUser())}
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              href="/login"
              className="bg-black px-4 py-2 rounded-full text-white font-semibold"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="bg-white px-4 py-2 rounded-full text-black font-semibold"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
