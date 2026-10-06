"use client";

import React from "react";
import Image from "next/image";
import { Megaphone } from "lucide-react";

interface AdvocateSectionProps {
  onContactClick?: () => void;
}

export default function AdvocateSection({ onContactClick }: AdvocateSectionProps) {
  return (
    <section className="w-full bg-[#f8f9fa] py-8 px-4 sm:px-6 lg:px-8">
      {/* Advocate Card Container */}
      <div className="relative bg-white rounded-3xl p-8 sm:p-12 lg:p-16 shadow-sm border border-slate-100 max-w-5xl mx-auto mt-12">
        
        {/* Floating Megaphone Icon Badge */}
        <div className="absolute -top-10 left-8 sm:left-12 flex items-center justify-center">
          {/* Soft Purple Glow Backdrop */}
          <div className="absolute inset-0 rounded-full bg-[#8c76e7] opacity-40 blur-xl scale-125" />
          
          {/* Purple Icon Circle */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-b from-[#9b85f3] to-[#7f66e4] text-white flex items-center justify-center shadow-lg border-4 border-white">
            <Megaphone className="w-9 h-9 sm:w-11 sm:h-11 stroke-[1.75]" />
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center pt-6 sm:pt-4">
          {/* Left Content Column */}
          <div className="lg:col-span-5 space-y-5">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif">
              Advocate for us
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Raise awareness about our cause and help us amplify our
              message. Use your voice to share our mission with your
              network, organize fundraising events, or advocate for policy
              changes that support our work. Your advocacy can inspire
              others to join the movement and make a difference.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={onContactClick}
                className="px-8 py-2.5 rounded-xl border-2 border-[#917bf0] text-[#8168e8] font-semibold text-sm hover:bg-[#917bf0] hover:text-white transition-all duration-200 shadow-sm"
              >
                Contact us
              </button>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-7">
            <div className="relative w-full h-[320px] sm:h-[380px] lg:h-[400px] rounded-2xl overflow-hidden shadow-sm">
              <Image
                src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=1200"
                alt="Volunteers wearing blue safety vests giving high fives"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}