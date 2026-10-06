"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Target, Eye, ShieldCheck, Users, Globe, ArrowRight } from "lucide-react";
import Footer from "@/components/common/Footer";

const values = [
  {
    icon: Heart,
    title: "Compassion First",
    description: "Every initiative starts with empathy, placing human dignity and community well-being at the heart of our decisions.",
  },
  {
    icon: ShieldCheck,
    title: "Integrity & Transparency",
    description: "We hold ourselves to the highest standards of financial accountability and operational clarity for our partners and beneficiaries.",
  },
  {
    icon: Users,
    title: "Community Empowerment",
    description: "We don't offer temporary fixes; we provide tools, training, and resources so communities lead their own growth.",
  },
  {
    icon: Globe,
    title: "Sustainable Impact",
    description: "Our programs are engineered to build self-reliance and lasting prosperity that endures across generations.",
  },
];

const impactPillars = [
  {
    number: "01",
    title: "Quality Education & Youth Development",
    description: "Providing scholarships, upgrading local learning centers, and offering digital skill training to equip youth for the modern economy.",
  },
  {
    number: "02",
    title: "Healthcare Outreach & Medical Support",
    description: "Delivering mobile medical clinics, maternal healthcare resources, and health education to underserved rural populations.",
  },
  {
    number: "03",
    title: "Micro-Financing & Economic Empowerment",
    description: "Offering interest-free micro-grants and vocational training to female entrepreneurs and small business owners.",
  },
  {
    number: "04",
    title: "Community Relief & Sustainable Growth",
    description: "Deploying rapid response aid during emergencies while building long-term infrastructure for clean water and power.",
  },
];

export default function AboutPage() {
  return (
    <>
      <main className="min-h-screen bg-white pt-16">
        
        {/* Hero Banner */}
        <section className="relative bg-[#18151E] text-white py-24 sm:py-32 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#8B72DE_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <span className="text-sm font-semibold text-[#8B72DE] uppercase tracking-widest block mb-4">
                About Shekor Kerjen Foundation
              </span>
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight mb-6">
                Driven by Purpose. <br />
                <span className="text-[#8B72DE]">Rooted in Community.</span>
              </h1>
              <p className="text-gray-300 text-lg sm:text-xl font-normal leading-relaxed">
                Shekor Kerjen Foundation is a non-profit organization dedicated to transforming underserved communities through education, healthcare access, economic empowerment, and sustainable development.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Our Story & Origin */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-6 space-y-6"
              >
                <span className="text-sm font-semibold text-[#8B72DE] uppercase tracking-widest block">
                  Our Origin & Mission
                </span>
                <h2 className="text-3xl sm:text-5xl font-black text-[#1F1B2D] tracking-tight leading-tight">
                  Building a Foundation Where Hope Thrives
                </h2>
                <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                  Founded with a conviction that every individual deserves equal opportunity, Shekor Kerjen Foundation began as a localized community aid initiative. Over time, it expanded into a multi-sector development organization working across critical social focus areas.
                </p>
                <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                  We bridge the gap between resources and grassroots need, ensuring that families gain access to functional healthcare, youth receive actionable education, and local micro-businesses get the capital required to achieve financial independence.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-6 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-gray-100"
              >
                <Image
                  src="/images/gallery/gallery-2.png"
                  alt="Shekor Kerjen Foundation community outreach"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>

            </div>
          </div>
        </section>

        {/* Mission & Vision Cards */}
        <section className="py-16 bg-[#F8F9FA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 bg-[#8B72DE]/10 text-[#8B72DE] rounded-2xl flex items-center justify-center mb-6">
                    <Target className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-black text-[#1F1B2D] mb-4">Our Mission</h3>
                  <p className="text-gray-600 leading-relaxed text-base">
                    To deliver sustainable interventions in education, health, and economic development that empower individuals and build self-reliant communities across regions in need.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 bg-[#8B72DE]/10 text-[#8B72DE] rounded-2xl flex items-center justify-center mb-6">
                    <Eye className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-black text-[#1F1B2D] mb-4">Our Vision</h3>
                  <p className="text-gray-600 leading-relaxed text-base">
                    A world where poverty, lack of access to quality education, and basic healthcare no longer limit human potential, creating an equitable society where all communities can flourish.
                  </p>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* Impact Pillars */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-sm font-semibold text-[#8B72DE] uppercase tracking-widest block mb-2">
                What We Do
              </span>
              <h2 className="text-4xl sm:text-5xl font-black text-[#1F1B2D] tracking-tight">
                Our Core Pillars of Impact
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {impactPillars.map((pillar, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-[#F8F9FA] p-8 rounded-3xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100"
                >
                  <span className="text-3xl font-black text-[#8B72DE] block mb-4">
                    {pillar.number}
                  </span>
                  <h3 className="text-xl font-bold text-[#1F1B2D] mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* Core Values Grid */}
        <section className="py-20 bg-[#18151E] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-sm font-semibold text-[#8B72DE] uppercase tracking-widest block mb-2">
                Guiding Principles
              </span>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
                The Values That Drive Us
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((val, idx) => {
                const IconComponent = val.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm"
                  >
                    <div className="w-12 h-12 bg-[#8B72DE]/20 text-[#8B72DE] rounded-xl flex items-center justify-center mb-6">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{val.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {val.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </section>

        {/* Call To Action Banner */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-gradient-to-r from-[#8B72DE] to-purple-600 rounded-3xl p-10 sm:p-16 text-white shadow-2xl">
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-6">
                Be Part of the Story
              </h2>
              <p className="text-white/90 text-base sm:text-lg max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
                Whether you wish to volunteer, partner with our campaigns, or support our community funds, your contribution accelerates life-changing work.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Link
                  href="/get-involved"
                  className="bg-white text-[#1F1B2D] px-8 py-4 rounded-full font-extrabold hover:bg-gray-100 transition-all flex items-center space-x-2"
                >
                  <span>Get Involved</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/contact"
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-extrabold hover:bg-white/10 transition-all"
                >
                  Contact Our Team
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}