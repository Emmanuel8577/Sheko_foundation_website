"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Mail } from "lucide-react";

// Custom Facebook Icon to match Lucide style
function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.891h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

export default function StayConnectedSection() {
  const [email, setEmail] = useState("");

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert(`Subscribed with: ${email}`);
      setEmail("");
    }
  };

  return (
    <section className="w-full bg-[#f8f9fa] py-8 px-4 sm:px-6 lg:px-8">
      {/* Stay Connected Card Container */}
      <div className="relative bg-white rounded-3xl p-8 sm:p-12 lg:p-16 shadow-sm border border-slate-100 max-w-5xl mx-auto mt-12">
        {/* Floating Mail Icon Badge */}
        <div className="absolute -top-10 left-8 sm:left-12 flex items-center justify-center">
          {/* Soft Purple Glow Backdrop */}
          <div className="absolute inset-0 rounded-full bg-[#8c76e7] opacity-40 blur-xl scale-125" />

          {/* Purple Icon Circle */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-b from-[#9b85f3] to-[#7f66e4] text-white flex items-center justify-center shadow-lg border-4 border-white">
            <Mail className="w-9 h-9 sm:w-11 sm:h-11 stroke-[1.75]" />
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start pt-6 sm:pt-4">
          {/* Left Content Column */}
          <div className="lg:col-span-5 space-y-5">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif">
              Stay Connected
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Stay connected with Hope and be the first to know about our latest
              initiatives, success stories, and upcoming events. By subscribing
              to our newsletter, you&apos;ll receive regular updates straight to
              your inbox, giving you an inside look at the impact we&apos;re
              making and the lives we&apos;re transforming.
            </p>

            {/* Email Form */}
            <form
              onSubmit={handleSignUp}
              className="flex items-center gap-2 pt-2"
            >
              <input
                type="email"
                required
                placeholder="Input Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-[#f5f6f8] text-slate-700 text-xs sm:text-sm px-4 py-3 rounded-xl border border-transparent focus:border-[#917bf0] focus:bg-white focus:outline-none transition-all placeholder:text-slate-400"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#917bf0] hover:bg-[#7f66e4] text-white font-semibold text-xs sm:text-sm transition-all duration-200 shadow-sm shrink-0"
              >
                Sign up
              </button>
            </form>
          </div>

          {/* Right Image & Social Buttons Column */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative w-full h-[280px] sm:h-[320px] rounded-2xl overflow-hidden shadow-sm">
              <Image
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=1200"
                alt="Group of friends putting their hands together in a circle"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Social Link Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-full bg-[#917bf0] hover:bg-[#7f66e4] text-white font-semibold py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all shadow-sm"
              >
                <FacebookIcon />
                <span>Facebook</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-full bg-[#917bf0] hover:bg-[#7f66e4] text-white font-semibold py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all shadow-sm"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
