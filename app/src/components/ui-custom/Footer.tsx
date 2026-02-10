import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Briefcase, Twitter, Linkedin, Instagram } from 'lucide-react';

const footerLinks = {
  candidates: [
    { label: 'Browse jobs', href: '/jobs' },
    { label: 'Companies', href: '/companies' },
    { label: 'Salaries', href: '#' },
    { label: 'Career guides', href: '#' },
  ],
  employers: [
    { label: 'Post a job', href: '/post-job' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'ATS integrations', href: '#' },
    { label: 'Employer blog', href: '#' },
  ],
  resources: [
    { label: 'Help center', href: '#' },
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
    { label: 'Cookies', href: '#' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#0B1A3A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl">JobPortal Pro</span>
            </Link>
            <p className="text-gray-400 max-w-sm mb-6">
              Find your next move. Hire your next builder. The modern job platform for tech professionals.
            </p>
            <div className="flex gap-3">
              <motion.a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#F05A44] transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#F05A44] transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#F05A44] transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Candidates</h4>
            <ul className="space-y-3">
              {footerLinks.candidates.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Employers</h4>
            <ul className="space-y-3">
              {footerLinks.employers.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            © 2026 JobPortal Pro. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="#" className="text-gray-400 hover:text-white transition-colors">
              Privacy
            </Link>
            <Link to="#" className="text-gray-400 hover:text-white transition-colors">
              Terms
            </Link>
            <Link to="#" className="text-gray-400 hover:text-white transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
