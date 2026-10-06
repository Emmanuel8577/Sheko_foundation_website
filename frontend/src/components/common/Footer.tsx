import Link from "next/link";
import { Heart, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const primaryLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Campaigns", href: "/campaigns" },
    { label: "Get Involved", href: "/get-involved" },
  ];

  const secondaryLinks = [
    { label: "Contact Us", href: "/contact" },
    { label: "Privacy Policy", href: "/#" },
    { label: "Terms of Service", href: "/#" },
  ];

  return (
    <footer className="bg-[#18151E] text-white pt-16 pb-12 border-t border-gray-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-16">
          
          {/* Brand & Contact Info */}
          <div className="md:col-span-5 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight font-serif">
              Shekor Kerjen <br />
              <span className="text-[#8B72DE]">Foundation</span>
            </h2>

            <div className="text-gray-300 font-normal text-sm leading-relaxed space-y-1">
              <p className="font-semibold text-white mb-1">Contact Us</p>
              <p>
                <a href="tel:18001234567" className="hover:text-[#8B72DE] transition-colors">
                  +234 800 123 4567
                </a>
              </p>
              <p>
                <a href="mailto:info@shekorkerjen.org" className="hover:text-[#8B72DE] transition-colors">
                  info@shekorkerjen.org
                </a>
              </p>
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center space-x-4 pt-2">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#8B72DE] hover:bg-[#8B72DE] hover:text-white transition-all"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#8B72DE] hover:bg-[#8B72DE] hover:text-white transition-all"
                aria-label="Instagram"
              >
                <svg
                  className="w-4 h-4 fill-none stroke-current"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              {/* Twitter / X */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#8B72DE] hover:bg-[#8B72DE] hover:text-white transition-all"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#8B72DE] hover:bg-[#8B72DE] hover:text-white transition-all"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links 1 */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Navigation</h3>
            <ul className="space-y-3 text-sm text-gray-300 font-medium">
              {primaryLinks.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="hover:text-[#8B72DE] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links 2 */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Resources</h3>
            <ul className="space-y-3 text-sm text-gray-300 font-medium">
              {secondaryLinks.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="hover:text-[#8B72DE] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Donation Call-to-Action Card (Right Side) */}
          <div className="md:col-span-3 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-xl">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#8B72DE]/20 text-[#8B72DE] flex items-center justify-center">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <h4 className="text-lg font-bold text-white">Support Our Cause</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Your generosity empowers communities and transforms lives across the nation.
              </p>
            </div>

            <Link
              href="/donate"
              className="group inline-flex items-center justify-between w-full bg-[#8B72DE] hover:bg-[#7A61CD] text-white text-sm font-bold py-3.5 px-5 rounded-xl transition-all shadow-lg shadow-purple-900/20 active:scale-[0.98]"
            >
              <span>Make a Donation</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

        </div>

        {/* Bottom Bar Separator */}
        <div className="border-t border-gray-800/80 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400 gap-4">
          <p>© {currentYear} Shekor Kerjen Foundation. All rights reserved.</p>

          <div className="flex items-center space-x-6">
            <Link href="/#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}