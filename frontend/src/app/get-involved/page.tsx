"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Gift, Heart, Megaphone, Mail, LucideIcon } from "lucide-react";
import Footer from "@/components/common/Footer";
import GallerySection from "@/components/home/GallerySection";

// Reusable Section Interface
interface SectionItem {
  id: string;
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  imageSrc: string;
  imageAlt: string;
  icon: LucideIcon;
  iconFill?: boolean;
}

const SECTIONS_DATA: SectionItem[] = [
  {
    id: "donate",
    title: "Donate",
    description:
      "Your generous contributions help us fund vital programs and initiatives. Whether it's a one-time donation or a recurring gift, your support enables us to provide education, healthcare, and economic opportunities to those who need it most. Every dollar makes a difference.",
    buttonText: "Donate",
    buttonHref: "/donate",
    imageSrc: "/images/donate_image.png",
    imageAlt: "Volunteer holding donation box",
    icon: Gift,
  },
  {
    id: "volunteer",
    title: "Volunteer",
    description:
      "Offer your time and skills to support our projects on the ground. Whether you're a teacher, a healthcare professional, a financial expert, or someone with a passion for environmental conservation, your expertise is invaluable. Join our team of dedicated volunteers and experience the profound impact of your efforts firsthand.",
    buttonText: "Contact us",
    buttonHref: "/contact",
    imageSrc: "/images/connect_image.png",
    imageAlt: "Volunteers standing together",
    icon: Heart,
    iconFill: true,
  },
  {
    id: "advocate",
    title: "Advocate for us",
    description:
      "Raise awareness about our cause and help us amplify our message. Use your voice to share our mission with your network, organize fundraising events, or advocate for policy changes that support our work. Your advocacy can inspire others to join the movement and make a difference.",
    buttonText: "Contact us",
    buttonHref: "/contact",
    imageSrc: "/images/volunteer_image.png",
    imageAlt: "Advocates high fiving",
    icon: Megaphone,
  },
];

export default function GetInvolvedPage() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert("Thank you for subscribing!");
      setEmail("");
    }
  };

  return (
    <>
      <main className="min-h-screen bg-[#F8F9FC] pt-16 pb-20 font-sans text-slate-800">
        
        {/* Header Section */}
        <section className="text-center max-w-2xl mx-auto pt-12 pb-16 px-4">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Get Involved
          </h1>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed">
            At Hope, we believe that every person has the power to make a difference.
            Together, we can create a brighter, more hopeful future for all. Join us in our
            mission and make an impact today.
          </p>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

          {/* Render Donate, Volunteer & Advocate Sections */}
          {SECTIONS_DATA.map((item) => (
            <InvolveCard key={item.id} data={item} />
          ))}

          {/* Stay Connected Section */}
          <section id="stay-connected" className="relative bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
            <div className="absolute -top-9 left-10 sm:left-14 w-20 h-20 bg-[#8C76E5] rounded-full flex items-center justify-center shadow-lg shadow-purple-200 ring-8 ring-[#F8F9FC]">
              <Mail className="w-9 h-9 text-white stroke-[2]" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-6">
              <div className="lg:col-span-6 space-y-6 pr-0 lg:pr-6">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                  Stay Connected
                </h2>
                <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                  Stay connected with Hope and be the first to know about our latest initiatives, success stories, and upcoming events. By subscribing to our newsletter, you&apos;ll receive regular updates straight to your inbox, giving you an inside look at the impact we&apos;re making and the lives we&apos;re transforming.
                </p>
                
                {/* Email Subscription Form */}
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <input
                    type="email"
                    required
                    placeholder="Input Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full sm:w-2/3 bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl text-sm outline-none focus:border-[#8C76E5] transition-colors"
                  />
                  <button
                    type="submit"
                    className="w-full sm:w-1/3 bg-[#8C76E5] hover:bg-[#7B63DC] text-white font-semibold text-sm py-3 px-6 rounded-xl transition-all shadow-sm"
                  >
                    Sign up
                  </button>
                </form>
              </div>

              {/* Image & Social Links */}
              <div className="lg:col-span-6 space-y-4">
                <div className="relative rounded-2xl overflow-hidden shadow-sm aspect-[4/3] bg-gray-100">
                  <Image
                    src="/images/partner_image.png"
                    alt="Group huddle team hands in"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    className="bg-[#8C76E5] hover:bg-[#7B63DC] text-white py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center space-x-2 transition-all shadow-sm"
                  >
                    <FacebookIcon className="w-4 h-4 fill-current" />
                    <span>Facebook</span>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="bg-[#8C76E5] hover:bg-[#7B63DC] text-white py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center space-x-2 transition-all shadow-sm"
                  >
                    <InstagramIcon className="w-4 h-4" />
                    <span>Instagram</span>
                  </a>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* Gallery Section Component */}
      <GallerySection />
      
      {/* Footer Component */}
      <Footer />
    </>
  );
}

// Sub-component for individual Involve Cards (Donate, Volunteer, Advocate)
function InvolveCard({ data }: { data: SectionItem }) {
  const Icon = data.icon;

  return (
    <section id={data.id} className="relative bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
      <div className="absolute -top-9 left-10 sm:left-14 w-20 h-20 bg-[#8C76E5] rounded-full flex items-center justify-center shadow-lg shadow-purple-200 ring-8 ring-[#F8F9FC]">
        <Icon className={`w-9 h-9 text-white stroke-[2] ${data.iconFill ? "fill-white" : ""}`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-6">
        <div className="lg:col-span-6 space-y-6 pr-0 lg:pr-6">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            {data.title}
          </h2>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed">
            {data.description}
          </p>
          <div className="pt-2">
            <Link
              href={data.buttonHref}
              className="inline-block border-2 border-[#8C76E5] text-[#8C76E5] hover:bg-[#8C76E5] hover:text-white font-semibold text-sm px-8 py-2.5 rounded-xl transition-all duration-200"
            >
              {data.buttonText}
            </Link>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="relative rounded-2xl overflow-hidden shadow-sm aspect-[4/3] bg-gray-100">
            <Image
              src={data.imageSrc}
              alt={data.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// Inline Social Icons
function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.891h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}