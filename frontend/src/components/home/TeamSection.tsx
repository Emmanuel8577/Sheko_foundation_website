"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, Variants, Easing } from "framer-motion";
import { User } from "lucide-react";

interface TeamMember {
  id: string;
  full_name: string;
  role: string;
  bio?: string;
  image?: string;
  order?: number;
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://shekokerjen-backend.onrender.com";

export default function TeamSection() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTeamMembers() {
      try {
        const response = await fetch(`${API_BASE_URL}/team-members/`);
        if (!response.ok) {
          throw new Error("Failed to load team members");
        }
        const data = await response.json();
        const membersList = Array.isArray(data) ? data : data.results || [];
        setTeamMembers(membersList);
      } catch (err: unknown) {
        console.error("Error fetching team members:", err);
        setError("Unable to load team members at this time.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchTeamMembers();
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <section className="bg-gray-50/60 py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-xl mx-auto mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1F1B2D] tracking-tight">
            Our team
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 font-medium">
            Meet the dedicated individuals driving our mission and making a lasting impact in our communities.
          </p>
        </motion.div>

        {/* Loading State Skeletons */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-white rounded-2xl p-6 text-center border border-gray-100 flex flex-col items-center animate-pulse"
              >
                <div className="w-24 h-24 rounded-full bg-gray-200 mb-4" />
                <div className="h-5 w-36 bg-gray-200 rounded mb-2" />
                <div className="h-3.5 w-24 bg-gray-200 rounded mb-3" />
                <div className="h-3.5 w-full bg-gray-200 rounded mb-1" />
                <div className="h-3.5 w-3/4 bg-gray-200 rounded" />
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
        {!isLoading && !error && teamMembers.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            <p>No team members listed yet.</p>
          </div>
        )}

        {/* Dynamic Compact Team Cards Grid */}
        {!isLoading && !error && teamMembers.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {teamMembers.map((member) => (
              <motion.div
                key={member.id}
                variants={itemVariants}
                className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col items-center"
              >
                {/* Compact Avatar */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden mb-4 flex-shrink-0 bg-purple-50 flex items-center justify-center border border-purple-100 shadow-inner">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.full_name}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 640px) 96px, 112px"
                    />
                  ) : (
                    <User className="w-10 h-10 text-[#8C76E5]" />
                  )}
                </div>

                {/* 1. Name First */}
                <h3 className="text-lg sm:text-xl font-bold text-[#1F1B2D] tracking-tight mb-1">
                  {member.full_name}
                </h3>

                {/* 2. Role Second */}
                <span className="text-xs font-semibold text-purple-600 uppercase tracking-wider block mb-3">
                  {member.role}
                </span>

                {/* 3. Bio */}
                {member.bio && (
                  <p className="text-gray-600 text-xs sm:text-sm font-normal leading-relaxed line-clamp-3">
                    {member.bio}
                  </p>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

      </div>
    </section>
  );
}