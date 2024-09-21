"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { FaCopy, FaCheck } from "react-icons/fa";

export default function Home() {
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);

  const handleCopy = () => {
    navigator.clipboard.writeText("curl https://NexSpectations.com");
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  useEffect(() => {
    if (inputRef.current) {
      const inputWidth = inputRef.current.scrollWidth;
      inputRef.current.style.width = `${inputWidth}px`;
    }
  }, []);

  return (
    <div
      style={{ backgroundColor: "#f8f8f8" }}
      className="flex flex-col justify-start items-center min-h-screen pt-20 pb-20 sm:pt-32 sm:pb-32 font-[family-name:var(--font-geist-sans)] gap-16 overflow-y-scroll"
    >
      <main className="flex flex-col gap-6 items-center text-center w-full max-w-2xl">
        <div className="relative w-32 sm:w-48">
          <Image
            src="/assets/logo.png"
            alt="Logo"
            layout="intrinsic"
            width={192}
            height={160}
            objectFit="contain"
          />
        </div>
        <div className="gap-6">
          <h1 className="text-6xl font-bold text-black">Nex</h1>
          <p className="text-m font-bold text-black">
            Distributed package manager
          </p>
        </div>
        <div className="flex items-center bg-gray-100 rounded-lg p-3 shadow-2xl w-full max-w">
          <input
            className="bg-transparent text-gray-800 font-mono px-4 py-2 outline-none w-full max-w-3xl"
            type="text"
            value="curl https://NexSpectations.com"
            readOnly
          />
          <button
            onClick={handleCopy}
            className={`text-gray-800 px-4 py-2 rounded-md ml-2 transition hover:text-black ${
              copied ? "animate-pulse" : ""
            }`}
            style={{
              transition: "color 0.3s ease",
            }}
          >
            {copied ? <FaCheck className="animate-fade-in-out" /> : <FaCopy />}
          </button>
        </div>
      </main>
    </div>
  );
}
