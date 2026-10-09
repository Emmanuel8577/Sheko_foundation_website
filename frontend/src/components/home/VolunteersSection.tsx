"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, Variants, Easing } from "framer-motion";
import { User, Quote, HeartHandshake } from "lucide-react";

interface Volunteer {
  id: string | number;
  full_name?: string;
  name?: string;
  author?: string;
  skills?: string;
  role?: string;
  quote?: string;
  motivation?: string;
  impact?: string;
  image?: string;
  avatar?: string;
  is_approved?: boolean;
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://shekokerjen-backend.onrender.com/api/v1";

// Helper function to convert Django relative paths into absolute URLs
const getImageUrl = (imagePath?: string | null): string | null => {
  if (!imagePath || typeof imagePath !== "string") return null;
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  const backendBase = API_BASE_URL.replace(/\/api\/v1\/?$/, "");
  return `${backendBase}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
};

// Helper function to safely format string quote text (replaced any with unknown)
const formatQuote = (text: unknown): string => {
  if (typeof text !== "string") return "";
  return text.replace(/^["']|["']$/g, "").trim();
};

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Volunteer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const response = await fetch(`${API_BASE_URL}/volunteers/`);
        if (!response.ok) {
          throw new Error("Failed to load testimonials");
        }
        const data = await response.json();
        const list = Array.isArray(data) ? data : data.results || [];

        const approvedList = list.filter(
          (item: Volunteer) => item && item.is_approved !== false
        );

        setTestimonials(approvedList);
      } catch (err: unknown) {
        console.error("Error fetching testimonials:", err);
        setError("Unable to load testimonials at this time.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchTestimonials();
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut" as Easing,
      },
    },
  };

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12 lg:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <HeartHandshake className="w-4 h-4 text-purple-600" />
            Voices of Impact
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-3xl font-black text-[#1F1B2D] tracking-tight">
            Voices from Volunteers/partners
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 font-medium">
            Discover how Avenia Care Foundation empowers our volunteers and transforms local communities through service.
          </p>
        </motion.div>

        {/* Loading Skeletons */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-[#F8F9FA] rounded-2xl p-6 flex flex-col justify-between animate-pulse"
              >
                <div>
                  <div className="w-12 h-12 rounded-full bg-gray-200 mb-4" />
                  <div className="h-3.5 w-full bg-gray-200 rounded mb-2" />
                  <div className="h-3.5 w-5/6 bg-gray-200 rounded mb-2" />
                  <div className="h-3.5 w-4/6 bg-gray-200 rounded mb-6" />
                </div>
                <div className="h-4 w-32 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div className="text-center text-gray-500 py-8">
            <p>{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && testimonials.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            <p>No stories or testimonials available at the moment.</p>
          </div>
        )}

        {/* Dynamic 3-Column Testimonials Grid */}
        {!isLoading && !error && testimonials.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {testimonials.map((item, index) => {
              const rawImage = item.image || item.avatar;
              const imageUrl = getImageUrl(rawImage);
              const authorName =
                typeof item.full_name === "string" && item.full_name.trim()
                  ? item.full_name
                  : typeof item.name === "string" && item.name.trim()
                  ? item.name
                  : typeof item.author === "string" && item.author.trim()
                  ? item.author
                  : "Community Member";

              const rawQuote = item.quote || item.motivation || item.impact;
              const formattedQuote = formatQuote(rawQuote);

              const roleOrSkills =
                typeof item.skills === "string" && item.skills.trim()
                  ? item.skills
                  : typeof item.role === "string" && item.role.trim()
                  ? item.role
                  : "Volunteer";

              return (
                <motion.div
                  key={item.id || index}
                  variants={itemVariants}
                  className="bg-[#F8F9FA] rounded-2xl p-6 flex flex-col justify-between text-left border border-gray-100 transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                >
                  <div>
                    {/* Header Row: Avatar & Quote Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-purple-100 flex items-center justify-center border border-purple-200">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={authorName}
                            fill
                            unoptimized
                            className="object-cover object-center"
                            sizes="48px"
                          />
                        ) : (
                          <User className="w-6 h-6 text-[#8C76E5]" />
                        )}
                      </div>
                      <Quote className="w-6 h-6 text-purple-300 flex-shrink-0 opacity-60" />
                    </div>

                    {/* Impact Quote Text */}
                    {formattedQuote ? (
                      <p className="text-gray-600 font-normal leading-relaxed text-xs sm:text-sm mb-6 line-clamp-6">
                        &quot;{formattedQuote}&quot;
                      </p>
                    ) : (
                      <p className="text-gray-400 italic text-xs sm:text-sm mb-6">
                        &quot;Proud to contribute to the mission of empowering lives through Avenia Care Foundation.&quot;
                      </p>
                    )}
                  </div>

                  {/* Author Name & Foundation Role/Skills */}
                  <div className="pt-4 border-t border-gray-200/60">
                    <h3 className="font-extrabold text-[#1F1B2D] text-sm tracking-tight">
                      {authorName}
                    </h3>
                    {roleOrSkills && (
                      <p className="text-xs font-semibold text-purple-600 mt-0.5">
                        {roleOrSkills}
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

      </div>
    </section>
  );
}