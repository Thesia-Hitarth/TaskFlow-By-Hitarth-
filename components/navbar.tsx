'use client';

import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { CheckSquare, Menu, X, ArrowUp } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Calendar', href: '#calendar' },
  { name: 'Tasks', href: '#tasks' },
  { name: 'Profile', href: '#profile' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navRef = useRef<HTMLDivElement>(null);

  // Scroll tracking for parallax effect
  const { scrollY } = useScroll();
  
  // Parallax transforms - dynamic based on isHidden state
  const navY = useTransform(scrollY, 
    (value) => isHidden ? -80 : 0
  );
  
  const navOpacity = useTransform(scrollY,
    (value) => isHidden ? 0 : 1
  );
  
  const navBlur = useTransform(scrollY,
    (value) => isHidden ? 8 : 0
  );
  
  const navScale = useTransform(scrollY,
    (value) => isHidden ? 0.96 : 1
  );

  // Smart scroll direction detection (from reference code)
  useMotionValueEvent(scrollY, "change", (latest) => {
    const difference = latest - lastScrollY;
    
    setIsScrolled(latest > 20);
    setShowScrollTop(latest > 400);
    
    // Hide navbar when scrolling down, show when scrolling up
    // Using the threshold from reference code
    if (latest > 50) {
      // More sensitive detection - scroll down threshold
      if (difference > 0 && difference > 3) {
        setIsHidden(true);
        setIsOpen(false); // Close mobile menu when hiding
      } 
      // Show on scroll up - scroll up threshold
      else if (difference < -3) {
        setIsHidden(false);
      }
    } else {
      // Always show at the top
      setIsHidden(false);
    }
    
    setLastScrollY(latest);
  });

  // Auto-detect active section based on scroll position
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = `#${entry.target.id}`;
          setActiveSection(id);
          
          if (window.location.hash !== id) {
            window.history.replaceState(null, '', id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navLinks.forEach((link) => {
      const element = document.querySelector(link.href);
      if (element) {
        observer.observe(element);
      }
    });

    if (window.location.hash) {
      setActiveSection(window.location.hash);
    }

    return () => observer.disconnect();
  }, []);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
      
      if (e.altKey && !isNaN(Number(e.key))) {
        const index = Number(e.key) - 1;
        if (index >= 0 && index < navLinks.length) {
          e.preventDefault();
          const link = navLinks[index];
          scrollToSection(link.href);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const scrollToSection = (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => {
    e?.preventDefault();
    setActiveSection(href);
    setIsOpen(false);
    
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }

    window.history.pushState(null, '', href);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-lg border-b shadow-md' 
            : 'bg-white/80 backdrop-blur-md border-b shadow-sm'
        }`}
        style={{ 
          y: navY,
          opacity: navOpacity,
          scale: navScale,
          filter: useTransform(navBlur, (blur) => `blur(${blur}px)`),
        }}
        initial={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.4,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div 
              className="flex items-center gap-2 cursor-pointer select-none"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              onClick={() => scrollToSection('#home')}
              role="button"
              aria-label="Go to home"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  scrollToSection('#home');
                }
              }}
            >
              <CheckSquare className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">TaskFlow</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(link.href, e)}
                  className={`font-medium transition-colors relative group ${
                    activeSection === link.href 
                      ? 'text-blue-600' 
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  title={`Go to ${link.name} (Alt+${index + 1})`}
                >
                  {link.name}
                  <motion.span 
                    className="absolute -bottom-1 left-0 h-0.5 bg-blue-600"
                    initial={{ width: 0 }}
                    animate={{ 
                      width: activeSection === link.href ? '100%' : 0 
                    }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </motion.a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button 
              className="md:hidden text-gray-700 hover:text-blue-600 transition-colors p-2 hover:bg-blue-50 rounded-lg"
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              <motion.div
                initial={false}
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop overlay */}
              <motion.div
                className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden"
                style={{ top: '64px' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsOpen(false)}
              />
              
              {/* Menu content */}
              <motion.div
                className="md:hidden overflow-hidden"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ 
                  duration: 0.3, 
                  ease: [0.33, 1, 0.68, 1]
                }}
              >
                <div className="px-4 pt-2 pb-4 space-y-1 bg-white/95 backdrop-blur-lg border-t shadow-lg">
                  {navLinks.map((link, index) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => scrollToSection(link.href, e)}
                      className={`block px-4 py-3 font-medium rounded-lg transition-all ${
                        activeSection === link.href 
                          ? 'bg-blue-50 text-blue-600' 
                          : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ 
                        delay: index * 0.05, 
                        duration: 0.2,
                        ease: "easeOut"
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {link.name}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            className="fixed bottom-8 right-8 z-40 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl transition-colors"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.1, y: -10 }}
            whileTap={{ scale: 0.9 }}
            transition={{ 
              duration: 0.3,
              ease: [0.33, 1, 0.68, 1]
            }}
            aria-label="Scroll to top"
            title="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}