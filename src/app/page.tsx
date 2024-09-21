"use client";

import { useState, useRef } from "react";
import { FaCopy, FaCheck, FaMoon, FaSun } from "react-icons/fa";
import Image from "next/image";
import GradualSpacing from "@/components/magicui/gradual-spacing";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("curl https://NexSpectations.com");
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      style={{ backgroundColor: darkMode ? "#121212" : "#f8f8f8", color: darkMode ? "#f8f8f8" : "#000000" }}
      className={`flex flex-col justify-start items-center min-h-screen pt-20 pb-20 sm:pt-32 sm:pb-32 font-[family-name:var(--font-geist-sans)] gap-16 overflow-y-scroll transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <button
        onClick={toggleDarkMode}
        className="absolute top-6 right-6 bg-gray-300 dark:bg-gray-700 p-2 rounded-lg shadow-md hover:shadow-lg transition-all"
        aria-label="Toggle Dark Mode"
      >
        {darkMode ? (
          <FaSun className="text-yellow-500" size={20} />
        ) : (
          <FaMoon className="text-gray-800" size={20} />
        )}
      </button>

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
          <GradualSpacing
            className="text-6xl font-bold"
            text="Nex"
          />
          <GradualSpacing
            className="text-m font-bold"
            text="DISTRIBUTED PACKAGE MANAGER"
          />
        </div>
        <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-3 shadow-2xl">
          <p className="bg-transparent text-gray-800 dark:text-gray-200 font-mono px-4 py-2 outline-none w-fit">
            curl https://NexSpectations.com
          </p>
          <button
            onClick={handleCopy}
            className={`px-4 py-2 rounded-md ml-2 transition hover:text-black dark:hover:text-white ${
              copied ? "animate-pulse" : ""
            }`}
            style={{
              transition: "color 0.3s ease",
            }}
          >
            {copied ? (
              <FaCheck className="animate-fade-in-out" />
            ) : (
              <FaCopy />
            )}
          </button>
        </div>
      </main>
    </div>
  );
}
