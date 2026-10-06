"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Button from "@/components/common/Button";

export default function Hero() {
  return (
    <section className="relative w-full h-[85vh] min-h-[600px] max-h-[850px] flex items-center justify-center overflow-hidden bg-brand-darkText">
      
      {/* Background Image */}
      <Image
        src="/images/hero-bg.png"
        alt="Children smiling - Sheko Kerjen Foundation"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Dark Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/60 to-black/40 z-10" />

      {/* Foreground Text & Buttons */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-black leading-tight tracking-tight text-white drop-shadow-md"
        >
          Empowering Communities, <br className="hidden sm:inline" />
          <span className="text-brand-primary">Transforming Futures</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-lg sm:text-2xl text-gray-200 max-w-3xl mx-auto font-medium drop-shadow"
        >
          Dedicated to humanitarian relief, healthcare, child welfare, and youth empowerment across vulnerable communities.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6"
        >
          <Button href="/donate" variant="primary" size="lg">
            Support Our Cause
          </Button>
          <Button href="/about" variant="outline" size="lg">
            Learn More
          </Button>
        </motion.div>

      </div>
    </section>
  );
}