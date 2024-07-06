"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [password, setPassword] = useState("");
  const route = useRouter();
  const handleClick = (password) => {
    if (password === "Peryton@12345") {
      alert("Login Successful");
      localStorage.setItem("password", password);
      route.push("/admin")
    } else {
      alert("Wrong passWord");
      setPassword("");
    }
  };
  return (
    <main className="flex flex-col bg-black justify-center items-center w-[100%] h-[100%]">
      <div className="text-white ">Enter Password</div>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="text-black outline-none px-[1.5vw] py-[0.5vw] rounded-lg mt-[1vw]"
        placeholder="password"
      />
      <button
        className="bg-gray-300 mt-[1vw]  px-[0.5vw] py-[0.3vw] rounded-lg "
        onClick={() => handleClick(password)}
      >
        Login
      </button>
    </main>
  );
}
