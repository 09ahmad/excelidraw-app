"use client";

import { Input } from "@repo/ui/input";

export function AuthPage({ isSignin }: { isSignin: boolean }) {
  return (
    <div className=" w-screen h-screen flex justify-center items-center">
      <div className="p-6 m-2 bg-white rounded">
        <div className="p-2">
          <Input type="text" placeholder="Email" className="text-black" />
        </div>
        <div className="p-2">
          <Input
            type="password"
            placeholder="Password"
            className="text-black"
          />
        </div>
        <div className="pt-2">
          <button className="text-black" onClick={() =>alert("Hello")}>
            {isSignin ? "Sign in" : "Sign up"}{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
