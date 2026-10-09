"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Gift } from "lucide-react";

interface DonateSectionProps {
  onDonateClick?: () => void;
}

export default function DonateSection({ onDonateClick }: DonateSectionProps) {
  return (
    <section className="w-full bg-[#f8f9fa] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Top Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight font-serif">
            Get Involved
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            At Hope, we believe that every person has the power to make a difference.
            Together, we can create a brighter, more hopeful future for all. Join us in our
            mission and make an impact today.
          </p>
        </div>

        {/* Donate Section Card */}
        <div className="relative bg-white rounded-3xl p-8 sm:p-12 lg:p-16 shadow-sm border border-slate-100 max-w-5xl mx-auto mt-12">
          
          {/* Floating Gift Icon Badge */}
          <div className="absolute -top-10 left-8 sm:left-12 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-[#8c76e7] opacity-40 blur-xl scale-125" />
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-b from-[#9b85f3] to-[#7f66e4] text-white flex items-center justify-center shadow-lg border-4 border-white">
              <Gift className="w-9 h-9 sm:w-11 sm:h-11 stroke-[1.75]" />
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center pt-6 sm:pt-4">
            <div className="lg:col-span-5 space-y-5">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif">
                Donate
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Your generous contributions help us fund vital programs and
                initiatives. Whether it&apos;s a one-time donation or a recurring
                gift, your support enables us to provide education,
                healthcare, and economic opportunities to those who need it
                most. Every dollar makes a difference.
              </p>

              <div className="pt-2">
                <Link
                  href="/donate"
                  onClick={onDonateClick}
                  className="inline-flex items-center justify-center px-8 py-2.5 rounded-xl border-2 border-[#917bf0] text-[#8168e8] font-semibold text-sm hover:bg-[#917bf0] hover:text-white transition-all duration-200 shadow-sm cursor-pointer"
                >
                  Donate
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative w-full h-[320px] sm:h-[380px] lg:h-[400px] rounded-2xl overflow-hidden shadow-sm">
                <Image
                  src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=1200"
                  alt="Volunteer holding a donation box"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}