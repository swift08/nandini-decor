'use client';

import { useState, useEffect } from 'react';
import { Home, Info, Briefcase, Image as ImageIcon, MessageSquare, Phone, Sparkles, Crown, Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const menuItems = [
  { id: 'home', label: 'Home', href: '#', icon: Home },
  { id: 'services', label: 'Services', href: '#services', icon: Briefcase },
  { id: 'portfolio', label: 'Portfolio', href: '#portfolio', icon: ImageIcon },
  { id: 'testimonials', label: 'Testimonials', href: '#testimonials', icon: MessageSquare },
  { id: 'tribute', label: 'Offers', href: '#tribute', icon: Sparkles },
  { id: 'about', label: 'About', href: '#about', icon: Info },
  { id: 'legacy', label: 'Legacy', href: '#legacy', icon: Sparkles },
  { id: 'founder', label: 'Founders', href: '#founder', icon: Crown },
  { id: 'contact', label: 'Contact', href: '#contact', icon: Phone },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [activeMenuPosition, setActiveMenuPosition] = useState({ left: 0, width: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    let rafId: number | null = null;
    let lastScrollY = 0;
    let lastUpdateTime = 0;
    let scrollVelocity = 0;
    const throttleDelay = 100; // Minimum time between updates (ms)
    
    const handleScroll = () => {
      try {
        const scrollY = window.scrollY || window.pageYOffset || 0;
        const now = Date.now();
        const timeDelta = now - lastUpdateTime;
        
        // Calculate scroll velocity
        scrollVelocity = Math.abs(scrollY - lastScrollY) / (timeDelta || 1);
        
        // Skip updates if scrolling too fast (prevent crashes)
        if (scrollVelocity > 50 && timeDelta < throttleDelay) {
          lastScrollY = scrollY;
          return;
        }
        
        // Cancel any pending animation frame
        if (rafId !== null) {
          cancelAnimationFrame(rafId);
        }

        rafId = requestAnimationFrame(() => {
          try {
            setIsScrolled(scrollY > 50);

            // Only update section if not scrolling too fast
            if (scrollVelocity < 30) {
              // Detect active section - order matches page structure
              const sections = ['home', 'services', 'portfolio', 'testimonials', 'tribute', 'about', 'legacy', 'founder', 'contact'];
              const scrollPosition = scrollY + 150;

              let currentSection = 'home';
              
              // Check home section first
              if (scrollY < 100) {
                setActiveSection('home');
                lastScrollY = scrollY;
                lastUpdateTime = now;
                rafId = null;
                return;
              }

              // Check other sections - with error handling
              try {
                for (const section of sections) {
                  if (section === 'home') continue;
                  
                  const element = document.getElementById(section);
                  if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                      currentSection = section;
                      break;
                    }
                    if (scrollPosition >= offsetTop) {
                      currentSection = section;
                    }
                  }
                }
                
                setActiveSection(currentSection);
              } catch (err) {
                // Silently handle DOM errors during fast scroll
                if (process.env.NODE_ENV === 'development') {
                  console.warn('Section detection error:', err);
                }
              }
            }
            
            lastScrollY = scrollY;
            lastUpdateTime = now;
            rafId = null;
          } catch (err) {
            // Prevent crashes from scroll handler errors
            if (process.env.NODE_ENV === 'development') {
              console.error('Scroll handler error:', err);
            }
            rafId = null;
          }
        });
      } catch (err) {
        // Prevent crashes from scroll event errors
        if (process.env.NODE_ENV === 'development') {
          console.error('Scroll event error:', err);
        }
      }
    };

    try {
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); // Initial check
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to add scroll listener:', err);
      }
    }
    
    return () => {
      try {
        window.removeEventListener('scroll', handleScroll);
        if (rafId !== null) {
          cancelAnimationFrame(rafId);
        }
      } catch (err) {
        // Ignore cleanup errors
      }
    };
  }, []);

  useEffect(() => {
    // Update tracking ball position - improved calculation
    const updateBallPosition = () => {
      const activeElement = document.querySelector(`[data-menu-id="${activeSection}"]`) as HTMLElement;
      
    if (activeElement) {
        // Find the menu container (the flex container with menu items)
        const menuContainer = activeElement.closest('.flex.flex-nowrap') as HTMLElement;
        
        if (menuContainer) {
          const activeRect = activeElement.getBoundingClientRect();
          const containerRect = menuContainer.getBoundingClientRect();
          
          // Calculate center position relative to the menu container
          const relativeLeft = activeRect.left - containerRect.left;
          const centerX = relativeLeft + (activeRect.width / 2);
          
          setActiveMenuPosition({
            left: centerX,
            width: activeRect.width,
          });
        } else {
          // Fallback: calculate relative to nav
          const navElement = activeElement.closest('nav') as HTMLElement;
          if (navElement) {
            const activeRect = activeElement.getBoundingClientRect();
            const navRect = navElement.getBoundingClientRect();
            const centerX = activeRect.left - navRect.left + (activeRect.width / 2);
            
        setActiveMenuPosition({
              left: centerX,
              width: activeRect.width,
        });
      }
    }
      } else {
        // If no active element found, hide the ball
        setActiveMenuPosition({ left: 0, width: 0 });
      }
    };

    // Use requestAnimationFrame for smooth updates
    const rafId = requestAnimationFrame(() => {
      updateBallPosition();
    });
    
    // Also update after a short delay to ensure DOM is ready after scroll
    const timeoutId = setTimeout(updateBallPosition, 200);
    
    // Update on window resize
    window.addEventListener('resize', updateBallPosition);
    
    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updateBallPosition);
    };
  }, [activeSection, isScrolled]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  const handleMenuClick = (href: string, id: string) => {
    setActiveSection(id);
    setIsMenuOpen(false);
    
    if (href.startsWith('#')) {
      const element = href === '#' 
        ? document.querySelector('section')
        : document.querySelector(href);
      
      if (element) {
        const yOffset = window.innerWidth < 768 ? -80 : -120; // Smaller offset on mobile
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Unified Navbar for Desktop and Mobile - Always Fixed */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isScrolled 
            ? 'py-1 md:py-2 lg:py-2.5' 
            : 'py-1 md:py-3 lg:py-4'
        }`}
        style={{
          background: 'transparent',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
        }}
      >
        <div className="container mx-auto px-2 md:px-6 lg:px-8">
            <div className={`relative backdrop-blur-md md:backdrop-blur-2xl border border-white/20 md:border-2 rounded-lg md:rounded-3xl shadow-lg md:shadow-2xl transition-all duration-300 ${
            isScrolled ? 'shadow-[0_0_20px_rgba(250,209,231,0.2)] md:shadow-[0_0_30px_rgba(250,209,231,0.3)]' : 'shadow-[0_0_10px_rgba(250,209,231,0.15)] md:shadow-[0_0_20px_rgba(250,209,231,0.2)]'
          }`}
          style={{
            background: 'linear-gradient(135deg, rgba(15, 61, 86, 0.92) 0%, rgba(164, 62, 119, 0.85) 50%, rgba(15, 61, 86, 0.92) 100%)',
            borderColor: isScrolled ? 'rgba(250, 209, 231, 0.4)' : 'rgba(250, 209, 231, 0.3)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}>
            {/* Floral Animated Border Glow - Hidden on mobile for performance */}
            <div className="hidden md:block absolute -inset-[1px] rounded-lg md:rounded-3xl opacity-30 blur-sm animate-pulse" 
              style={{
                background: 'linear-gradient(135deg, rgba(250, 209, 231, 0.8) 0%, rgba(188, 225, 241, 0.8) 50%, rgba(250, 209, 231, 0.8) 100%)'
              }}
            />
            
            {/* Inner Glass Layer - Removed white overlay */}
            
            {/* Shimmer Effect */}
            <div className="absolute inset-0 rounded-lg md:rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" />
            </div>
            
            {/* Tracking Ball Indicator - Enhanced */}
            <div
              className="absolute bottom-0 transition-all duration-700 ease-out z-30 hidden md:block"
              style={{
                left: activeMenuPosition.left > 0 ? `${activeMenuPosition.left}px` : '0px',
                transform: 'translateX(-50%) translateY(50%)',
                willChange: 'left',
                opacity: activeMenuPosition.left > 0 ? 1 : 0,
              }}
            >
              <div className="relative flex flex-col items-center">
                {/* Vertical Connection Line */}
                <div className="w-[2px] h-5 bg-gradient-to-b from-gold/60 via-gold to-gold-dark mb-1" />
                
                {/* Multi-layer Glowing Ball */}
                <div className="relative">
                  {/* Outer Glow Rings */}
                  <div className="absolute inset-0 w-6 h-6 bg-gold/40 rounded-full blur-xl animate-pulse" style={{ animationDuration: '2s' }} />
                  <div className="absolute inset-0 w-6 h-6 bg-gold/60 rounded-full blur-lg animate-pulse" style={{ animationDuration: '1.5s', animationDelay: '0.3s' }} />
                  
                  {/* Main Ball with Crown Effect */}
                  <div className="relative w-6 h-6 rounded-full bg-gradient-to-br from-gold-light via-gold to-gold-dark shadow-2xl flex items-center justify-center" 
                       style={{ 
                         boxShadow: '0 0 40px rgba(251, 191, 36, 1), 0 0 80px rgba(251, 191, 36, 0.7), inset 0 2px 4px rgba(255, 255, 255, 0.6), 0 4px 15px rgba(0, 0, 0, 0.4)' 
                       }}
                  >
                    {/* Inner Highlight */}
                    <div className="w-2.5 h-2.5 rounded-full bg-white/70" />
                  </div>
                  
                  {/* Sparkle Effect */}
                  <div className="absolute -top-1 -right-1">
                    <Sparkles className="w-3.5 h-3.5 text-gold-light animate-pulse" style={{ animationDuration: '1.5s' }} />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative flex flex-row items-center justify-between px-2 md:px-6 lg:px-8 py-1.5 md:py-2.5 lg:py-3 gap-2 md:gap-4 lg:gap-5">
              {/* Logo with Enhanced Breathing and Royal Crown - Compact on Mobile */}
              <Link href="#" onClick={() => handleMenuClick('#', 'home')} className="flex items-center justify-center group flex-shrink-0">
                <div className="relative">
                  <Image
                    src="/assets/logo.png"
                    alt="Nandini Decoration Logo"
                    width={160}
                    height={160}
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
                    style={{ filter: 'drop-shadow(0 0 12px rgba(251, 191, 36, 0.7))' }}
                    unoptimized
                    priority
                  />
                  <div className="hidden md:block absolute inset-0 bg-gold/30 blur-2xl rounded-full animate-pulse scale-125" />
                </div>
              </Link>

              {/* Mobile Hamburger - Compact */}
              <button
                type="button"
                className="md:hidden inline-flex items-center justify-center rounded-lg border border-white/30 text-white px-2.5 py-1.5 gap-1.5 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-200 z-50"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                style={{
                  backdropFilter: 'blur(4px)',
                  WebkitBackdropFilter: 'blur(4px)',
                }}
              >
                {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
                <span className="text-xs font-semibold">Menu</span>
              </button>

              {/* Menu Items - No Overflow, All Visible */}
              <div className="hidden md:flex flex-nowrap items-center justify-center gap-1.5 md:gap-2 lg:gap-3 relative flex-1 md:flex-none">
                {menuItems.map((item, index) => (
                  <a
                    key={item.id}
                    data-menu-id={item.id}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleMenuClick(item.href, item.id);
                    }}
                    className={`relative text-white font-medium text-[10px] md:text-xs lg:text-sm transition-all duration-300 group menu-item flex items-center gap-0.5 md:gap-0 px-1 py-0.5 md:px-1.5 md:py-1 lg:px-2 lg:py-1.5 rounded-lg md:rounded-none whitespace-nowrap ${
                      activeSection === item.id 
                        ? 'text-gold scale-105 md:scale-105 tracking-wide bg-gold/20 md:bg-transparent' 
                        : 'hover:text-gold-light hover:scale-105 hover:bg-white/10 md:hover:bg-transparent'
                    }`}
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      textShadow: activeSection === item.id ? '0 0 15px rgba(251, 191, 36, 0.8), 0 0 30px rgba(251, 191, 36, 0.4)' : 'none'
                    }}
                  >
                    {/* Show icon on mobile, hide on desktop */}
                    <item.icon size={14} className="md:hidden" />
                    <span className="relative z-10">{item.label}</span>
                    
                    {/* Wave Underline - Desktop only */}
                    <span className="hidden md:block absolute bottom-[-6px] left-0 w-0 h-[3px] bg-gradient-to-r from-transparent via-gold-light to-transparent opacity-0 group-hover:w-full group-hover:opacity-100 transition-all duration-700 ease-out rounded-full" 
                          style={{ boxShadow: '0 0 10px rgba(251, 191, 36, 0.8)' }} 
                    />
                    
                    {/* Active State Effects - Desktop only */}
                    {activeSection === item.id && (
                      <>
                        <span className="hidden md:block absolute inset-0 bg-gradient-radial from-gold/20 via-gold/10 to-transparent blur-2xl scale-150 animate-pulse" />
                        <span className="hidden md:block absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-[3px] bg-gradient-to-r from-transparent via-gold to-transparent rounded-full" 
                              style={{ boxShadow: '0 0 15px rgba(251, 191, 36, 1)' }}
                        />
                      </>
                    )}
                  </a>
                ))}
              </div>

              {/* CTA Button - Enhanced Royal Style */}
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleMenuClick('#contact', 'contact');
                }}
                className="relative px-2 md:px-4 lg:px-5 py-1 md:py-1.5 lg:py-2 bg-gradient-to-r from-blue-600 via-blue-500 to-gold rounded-full text-white font-semibold text-[10px] md:text-xs lg:text-sm shadow-2xl overflow-hidden group border-2 border-gold/50 hover:border-gold transition-all duration-500 hidden md:flex items-center gap-1 md:gap-1.5 flex-shrink-0 whitespace-nowrap"
                style={{
                  animation: 'cta-breathing 4s ease-in-out infinite',
                  boxShadow: '0 10px 40px rgba(59, 130, 246, 0.5), 0 0 30px rgba(251, 191, 36, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.3)'
                }}
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  <Sparkles size={16} className="animate-pulse" style={{ animationDuration: '1.5s' }} />
                  Book Your Event
                </span>
                
                {/* Animated Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-gold via-gold-light to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Shimmer Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </a>
              {/* Mobile Menu Drawer */}
              {isMenuOpen && (
                <div className="md:hidden mt-2 w-full">
                  <div className="rounded-xl bg-white/15 backdrop-blur-md border border-white/30 shadow-lg flex flex-col divide-y divide-white/10"
                    style={{
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                    }}
                  >
                    {menuItems.map((item) => (
                      <button
                        key={item.id}
                        className={`flex items-center gap-3 px-4 py-3 text-left text-white font-semibold transition-all ${
                          activeSection === item.id ? 'bg-gold/20 text-gold' : 'hover:bg-white/10'
                        }`}
                        onClick={() => handleMenuClick(item.href, item.id)}
                      >
                        <item.icon size={18} />
                        <span>{item.label}</span>
                      </button>
                    ))}
                    <button
                      className="flex items-center gap-3 px-4 py-3 text-left text-white font-semibold hover:bg-white/10 transition-all"
                      onClick={() => handleMenuClick('#contact', 'contact')}
                    >
                      <Sparkles size={18} />
                      <span>Book Your Event</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed navbar - Compact on mobile */}
      <div className={`transition-all duration-300 ${isScrolled ? 'h-16 md:h-20 lg:h-24' : 'h-20 md:h-24 lg:h-28'}`} />
    </>
  );
}