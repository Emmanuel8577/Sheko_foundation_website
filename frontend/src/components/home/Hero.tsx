"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/common/Button";

interface Campaign {
  id: string | number;
  slug?: string;
  title: string;
  description?: string;
  caption?: string;
  image?: string;
}

interface Slide {
  id: string | number;
  image: string;
  title: React.ReactNode;
  subtitle: string;
  primaryButtonText: string;
  primaryButtonHref: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://shekokerjen-backend.onrender.com/api/v1";

export default function Hero() {
  const [slides, setSlides] = useState<Slide[]>([
    // Default static slide requested to be maintained
    {
      id: "static-default",
      image: "/images/hero-bg.png",
      title: (
        <>
          Empowering Communities, <br className="hidden sm:inline" />
          <span className="text-brand-primary">Transforming Futures</span>
        </>
      ),
      subtitle:
        "Dedicated to humanitarian relief, healthcare, child welfare, and youth empowerment across vulnerable communities.",
      primaryButtonText: "Support Our Cause",
      primaryButtonHref: "/donate",
      secondaryButtonText: "Learn More",
      secondaryButtonHref: "/about",
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch last 2 campaigns on mount
  useEffect(() => {
    async function fetchLatestCampaigns() {
      try {
        const response = await fetch(`${API_BASE_URL}/campaigns/`);
        if (!response.ok) return;
        const data = await response.json();
        const campaignsList = Array.isArray(data) ? data : data.results || [];

        // Take the last 2 recently added campaigns
        const recentCampaigns = campaignsList.slice(-2);

        if (recentCampaigns.length > 0) {
          const campaignSlides: Slide[] = recentCampaigns.map((camp: Campaign) => ({
            id: camp.id,
            image: camp.image || "/images/hero-bg.png",
            title: camp.title,
            subtitle: camp.description || camp.caption || "Join us in making an impact through this active campaign.",
            primaryButtonText: "Learn More",
            primaryButtonHref: `/campaigns/${camp.slug || camp.id}`,
            secondaryButtonText: "Support Our Cause",
            secondaryButtonHref: "/donate",
          }));

          // Keep the static slide first, then append the dynamic campaign slides
          setSlides((prev) => [prev[0], ...campaignSlides]);
        }
      } catch (err) {
        console.error("Error fetching campaigns for hero carousel:", err);
      }
    }

    fetchLatestCampaigns();
  }, []);

  // Auto-scroll timer (reasonable interval of 6 seconds per slide)
  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const currentSlide = slides[currentIndex];

  return (
    <section className="relative w-full h-[85vh] min-h-[600px] max-h-[850px] flex items-center justify-center overflow-hidden bg-brand-darkText">
      
      {/* Background Image with AnimatePresence for smooth crossfade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={currentSlide.image}
            alt={typeof currentSlide.title === "string" ? currentSlide.title : "Sheko Kerjen Foundation Hero"}
            fill
            priority
            className="object-cover object-center"
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/60 to-black/40 z-10" />

      {/* Foreground Text & Buttons */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-white drop-shadow-md">
              {currentSlide.title}
            </h1>

            <p className="mt-6 text-base sm:text-xl text-gray-200 max-w-3xl mx-auto font-medium drop-shadow line-clamp-3">
              {currentSlide.subtitle}
            </p>

            <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
              <Button href={currentSlide.primaryButtonHref} variant="primary" size="lg">
                {currentSlide.primaryButtonText}
              </Button>
              {currentSlide.secondaryButtonText && currentSlide.secondaryButtonHref && (
                <Button href={currentSlide.secondaryButtonHref} variant="outline" size="lg">
                  {currentSlide.secondaryButtonText}
                </Button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Indicators / Dots */}
        {slides.length > 1 && (
          <div className="absolute -bottom-16 left-0 right-0 flex justify-center items-center gap-2 z-30">
            {slides.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? "w-8 bg-brand-primary" : "w-2.5 bg-white/50 hover:bg-white"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}