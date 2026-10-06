"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import Button from "./Button";

const navLinks = [
  { name: "About Us", href: "/about" },
  { name: "Campaigns", href: "/campaigns" },
  { name: "Get Involved", href: "/get-involved" },
  { name: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Foundation Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-11 h-11 transition-transform group-hover:scale-105">
              <Image
                src="/images/sheko_logo.png"
                alt="Sheko Kerjen Foundation Logo"
                fill
                sizes="(max-width: 768px) 100px, 150px"
                className="object-contain"
                priority
              />
            </div>
            <span className="font-black text-xl tracking-tight text-brand-darkText">
              SHEKO KERJEN <span className="text-brand-primary">FOUNDATION</span>
            </span>
          </Link>

          {/* Desktop Navigation Links with Purple Hover Effect */}
          <nav className="hidden md:flex items-center space-x-9">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-800 hover:text-brand-primary font-semibold text-sm tracking-wide transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Wider Solid Purple Donate CTA Button */}
          <div className="hidden md:flex items-center">
            <Button href="/donate" variant="primary" size="md">
              Donate
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-brand-darkText p-2 rounded-full hover:bg-gray-100 focus:outline-none transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-6 pt-3 pb-8 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2.5 text-base font-semibold text-brand-darkText hover:text-brand-primary hover:bg-purple-50/50 rounded-full transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2">
            <Button
              href="/donate"
              variant="primary"
              size="lg"
              fullWidth
              onClick={() => setIsOpen(false)}
            >
              Donate
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}