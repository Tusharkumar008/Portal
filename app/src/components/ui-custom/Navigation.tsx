import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Briefcase, Menu, X, User, LogOut, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navLinks = [
  // { label: 'Jobs', href: '/jobs' },
  { label: 'Companies', href: '/companies' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  // Extracted isRecruiter here!
  const { user, isAuthenticated, isRecruiter, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => location.pathname === href;

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.96] }}
        // Sticky header fixed!
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.nav
            className={`flex items-center justify-between h-14 px-6 rounded-full transition-all duration-300 ${
              isScrolled 
                ? 'bg-white/95 backdrop-blur-md shadow-lg' 
                : 'bg-white/80 backdrop-blur-sm'
            }`}
            layout
          >
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <motion.div 
                className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0B1A3A] to-[#1a2d5c] flex items-center justify-center"
                whileHover={{ scale: 1.05, rotate: 3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Briefcase className="w-4 h-4 text-white" />
              </motion.div>
              <span className="font-bold text-lg text-[#0B1A3A]">JobPortal</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link key={link.href} to={link.href}>
                  <motion.div
                    className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                      isActive(link.href) 
                        ? 'text-[#F05A44]' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {link.label}
                    {isActive(link.href) && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-[#F05A44]/10 rounded-full"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </motion.div>
                </Link>
              ))}
              {isAuthenticated && (
                <Link to={isRecruiter ? "/recruit/jobs" : "/dashboard"}>
                  <motion.div
                    className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                      isActive(isRecruiter ? '/recruit/jobs' : '/dashboard') 
                        ? 'text-[#F05A44]' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Dashboard
                    {isActive(isRecruiter ? '/recruit/jobs' : '/dashboard') && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-[#F05A44]/10 rounded-full"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </motion.div>
                </Link>
              )}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              {isAuthenticated ? (
                <>
                  {/* Recruiter specific 'Post a Job' button */}
                  {isRecruiter && (
                    <Link to="/post-job">
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button 
                          className="text-sm font-medium bg-[#F05A44] hover:bg-[#e04d38] text-white rounded-full px-5"
                        >
                          Post a job
                        </Button>
                      </motion.div>
                    </Link>
                  )}
                  
                  {/* User Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <motion.button
                        className="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-gray-100 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0B1A3A] to-[#1a2d5c] flex items-center justify-center text-white text-sm font-medium">
                          {user?.name?.charAt(0) || 'U'}
                        </div>
                        <span className="text-sm font-medium text-gray-700">{user?.name?.split(' ')[0]}</span>
                      </motion.button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem asChild>
                        <Link to={isRecruiter ? "/recruit/jobs" : "/dashboard"} className="cursor-pointer">
                          <Briefcase className="w-4 h-4 mr-2" />
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                      
                      <DropdownMenuItem asChild>
                        <Link to="/chat" className="cursor-pointer">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Messages
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem asChild>
                        <Link to="/profile" className="cursor-pointer">
                          <User className="w-4 h-4 mr-2" />
                          Edit Profile
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-600">
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button 
                        variant="ghost" 
                        className="text-sm font-medium text-gray-600 hover:text-gray-900"
                      >
                        Sign in
                      </Button>
                    </motion.div>
                  </Link>
                  <Link to="/signup">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button 
                        className="text-sm font-medium bg-[#F05A44] hover:bg-[#e04d38] text-white rounded-full px-5"
                      >
                        Sign up
                      </Button>
                    </motion.div>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 rounded-full hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-gray-600" />
              ) : (
                <Menu className="w-5 h-5 text-gray-600" />
              )}
            </motion.button>
          </motion.nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-20 z-40 px-4 md:hidden"
          >
            <div className="bg-white rounded-2xl shadow-xl p-4 space-y-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      isActive(link.href)
                        ? 'bg-[#F05A44]/10 text-[#F05A44]'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              
              {isAuthenticated && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Link
                    to={isRecruiter ? "/recruit/jobs" : "/dashboard"}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      isActive(isRecruiter ? '/recruit/jobs' : '/dashboard')
                        ? 'bg-[#F05A44]/10 text-[#F05A44]'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    Dashboard
                  </Link>
                </motion.div>
              )}

              <div className="pt-2 border-t border-gray-100 space-y-2">
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center gap-3 px-4 py-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0B1A3A] to-[#1a2d5c] flex items-center justify-center text-white font-medium">
                        {user?.name?.charAt(0) || 'U'}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{user?.name}</p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                      </div>
                    </div>
                    <Link to="/chat" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Messages
                      </Button>
                    </Link>
                    <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start">
                        <User className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Button>
                    </Link>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-red-600"
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start">
                        <User className="w-4 h-4 mr-2" />
                        Sign in
                      </Button>
                    </Link>
                    <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button className="w-full bg-[#F05A44] hover:bg-[#e04d38] text-white">
                        Sign up
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}