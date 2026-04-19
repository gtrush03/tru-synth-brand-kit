import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlickeringGrid } from '../ui/flickering-grid';
import { X as XIcon, Mail } from 'lucide-react';

interface NavMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: number, cardIndex?: number) => void;
  currentView: number;
}

export const NavMenu = ({ isOpen, onClose, onNavigate, currentView }: NavMenuProps) => {
  const navItems = [
    { label: 'Spend', view: 1, cardIndex: 0, subtitle: 'Ontology-powered spend intelligence' },
    { label: 'SynthOS', view: 1, cardIndex: 1, subtitle: 'Enterprise AI operating systems' },
    { label: 'Workforce', view: 1, cardIndex: 2, subtitle: 'Automation that delivers results' },
  ];

  const handleNavClick = (view: number, cardIndex?: number) => {
    onClose();
    onNavigate(view, cardIndex);
  };

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Stagger animation variants
  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.25,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 w-full h-full z-[200] flex items-center justify-center"
          initial={{ opacity: 0, backgroundColor: 'rgba(5, 5, 5, 0)' }}
          animate={{ opacity: 1, backgroundColor: '#050505' }}
          exit={{ opacity: 0, backgroundColor: 'rgba(5, 5, 5, 0)' }}
          transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
        >
          {/* FlickeringGrid Background */}
          <motion.div
            className="absolute inset-0 w-full h-full pointer-events-none"
            initial={{
              maskImage: 'radial-gradient(circle at center, black 0%, transparent 0%)',
              WebkitMaskImage: 'radial-gradient(circle at center, black 0%, transparent 0%)',
            }}
            animate={{
              maskImage: 'radial-gradient(circle at center, black 100%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(circle at center, black 100%, transparent 100%)',
            }}
            exit={{
              maskImage: 'radial-gradient(circle at center, black 0%, transparent 0%)',
              WebkitMaskImage: 'radial-gradient(circle at center, black 0%, transparent 0%)',
            }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <FlickeringGrid
              className="absolute inset-0 w-full h-full"
              squareSize={4}
              gridGap={6}
              color="#928466"
              maxOpacity={0.3}
              flickerChance={0.3}
              height={1080}
              width={1920}
            />
          </motion.div>

          {/* Ambient Gold Gradient Orb */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: '600px',
              height: '600px',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, rgba(146, 132, 102, 0.08) 0%, transparent 70%)',
              filter: 'blur(80px)',
            }}
          />

          {/* GLASS CONTAINER */}
          <style>{`
            .navmenu-glass {
              backdrop-filter: blur(16px) saturate(1.2);
              -webkit-backdrop-filter: blur(16px) saturate(1.2);
            }
            @media (min-width: 768px) {
              .navmenu-glass {
                backdrop-filter: blur(40px) saturate(1.2);
                -webkit-backdrop-filter: blur(40px) saturate(1.2);
              }
            }
          `}</style>
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="navmenu-glass relative z-10 w-full max-w-3xl mx-4 md:mx-auto
                       rounded-2xl md:rounded-3xl
                       bg-white/[0.05] md:bg-white/[0.04]
                       border border-white/[0.08]
                       px-6 py-6 md:px-10 md:py-8
                       max-h-[90vh] overflow-y-auto"
            style={{
              boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.3)',
            }}
          >

            {/* Content wrapper with stagger */}
            <motion.div
              className="relative z-10"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={contentVariants}
            >
              {/* 1. HEADER: Logo + Close */}
              <motion.div
                variants={childVariants}
                className="flex items-center justify-between mb-8 md:mb-10"
              >
                <img
                  src="https://i.imgur.com/p6POhEa.png"
                  alt="TRU SYNTH"
                  className="h-5 md:h-6 w-auto object-contain brightness-100"
                />
                <button
                  onClick={onClose}
                  aria-label="Close navigation menu"
                  className="w-10 h-10 flex items-center justify-center
                             rounded-full border border-[#928466]/20 bg-white/[0.03]
                             hover:bg-white/[0.06] hover:border-[#928466]/40
                             transition-all duration-300 cursor-pointer group
                             focus-visible:ring-2 focus-visible:ring-[#928466]/50 focus-visible:outline-none"
                >
                  <XIcon className="w-4 h-4 text-[#928466]/70 group-hover:text-[#E8E0CC] transition-colors" />
                </button>
              </motion.div>

              {/* 2. NAV LINKS with sibling dimming */}
              <div className="flex flex-col gap-0 mb-8 md:mb-10 group/nav">
                {navItems.map((item, index) => (
                  <motion.button
                    key={index}
                    variants={childVariants}
                    onClick={() => handleNavClick(item.view, item.cardIndex)}
                    className="group/item text-left w-full py-4 md:py-5 border-b border-white/[0.06]
                               last:border-b-0 hover:bg-white/[0.02] transition-all duration-300
                               rounded-lg px-2 -mx-2
                               group-hover/nav:opacity-40 hover:!opacity-100
                               focus-visible:ring-2 focus-visible:ring-[#928466]/50 focus-visible:outline-none"
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      {/* Label */}
                      {item.label === 'SynthOS' ? (
                        <h2 className="text-lg md:text-xl font-satoshi tracking-tight shrink-0
                                       group-hover/item:opacity-100 opacity-90 transition-opacity duration-300">
                          <span
                            style={{
                              backgroundImage: 'linear-gradient(135deg, #E8E0CC 0%, #928466 50%, #E8E0CC 100%)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              backgroundClip: 'text',
                            }}
                          >
                            <span className="font-medium">Synth</span>
                            <span className="font-black">OS</span>
                          </span>
                        </h2>
                      ) : (
                        <h2 className="text-lg md:text-xl font-satoshi font-medium tracking-tight
                                       text-white/90 group-hover/item:text-white transition-colors duration-300
                                       shrink-0">
                          {item.label}
                        </h2>
                      )}

                      {/* Dot Leader + Subtitle */}
                      <div className="flex-1 flex items-baseline gap-3 min-w-0">
                        <div className="flex-1 border-b border-dotted border-white/[0.08]
                                        translate-y-[-4px] hidden md:block" />
                        <p className="text-xs font-sans tracking-wide text-white/30
                                      group-hover/item:text-white/50 transition-colors duration-300
                                      shrink-0 whitespace-nowrap">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* 3. GOLD HAIRLINE DIVIDER */}
              <motion.div
                variants={childVariants}
                className="h-px bg-gradient-to-r from-[#928466]/30 via-[#928466]/15 to-transparent my-1"
              />

              {/* 4. SECONDARY LINKS */}
              <motion.div
                variants={childVariants}
                className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-6 md:mb-8 mt-5 md:mt-6"
              >
                {['Documentation', 'Investor Relations', 'Careers', 'Trust Center'].map((link, i, arr) => (
                  <React.Fragment key={link}>
                    <a
                      href="#"
                      className="text-[11px] font-satoshi font-medium tracking-[0.08em] uppercase
                                 text-white/25 hover:text-white/50 transition-colors duration-300
                                 focus-visible:ring-2 focus-visible:ring-[#928466]/50 focus-visible:outline-none"
                    >
                      {link}
                    </a>
                    {i < arr.length - 1 && (
                      <span className="text-[#928466]/30 text-[6px] leading-none select-none">&bull;</span>
                    )}
                  </React.Fragment>
                ))}
              </motion.div>

              {/* 5. GOLD HAIRLINE DIVIDER */}
              <motion.div
                variants={childVariants}
                className="h-px bg-gradient-to-r from-[#928466]/30 via-[#928466]/15 to-transparent my-1"
              />

              {/* 6. FOOTER: Email + Locations + Social */}
              <motion.div variants={childVariants}>
                {/* Desktop: single row */}
                <div className="hidden md:flex items-center justify-between gap-4 mt-5 mb-4">
                  {/* Email */}
                  <a
                    href="mailto:hello@trusynth.com"
                    className="flex items-center gap-2 text-xs text-white/40
                               hover:text-white/70 transition-colors duration-300 group shrink-0
                               focus-visible:ring-2 focus-visible:ring-[#928466]/50 focus-visible:outline-none"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#928466]/60 group-hover:text-[#928466] transition-colors" />
                    <span className="font-mono text-[11px] tracking-wide">hello@trusynth.com</span>
                  </a>

                  {/* Locations */}
                  <div className="flex items-center gap-2 text-[11px] text-white/20">
                    <span>New York</span>
                    <span className="text-[#928466]/30 text-[5px]">&#9670;</span>
                    <span>Prague</span>
                    <span className="text-[#928466]/30 text-[5px]">&#9670;</span>
                    <span>Paris</span>
                  </div>

                  {/* Social Icons */}
                  <div className="flex items-center gap-2">
                    <a
                      href="https://twitter.com/trusynth"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 flex items-center justify-center rounded-full
                                 border border-white/[0.06] hover:border-[#928466]/30
                                 hover:bg-white/[0.03] transition-all duration-300 group
                                 focus-visible:ring-2 focus-visible:ring-[#928466]/50 focus-visible:outline-none"
                    >
                      <svg className="w-3 h-3 text-white/25 group-hover:text-[#E8E0CC] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>
                    <a
                      href="https://linkedin.com/company/trusynth"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 flex items-center justify-center rounded-full
                                 border border-white/[0.06] hover:border-[#928466]/30
                                 hover:bg-white/[0.03] transition-all duration-300 group
                                 focus-visible:ring-2 focus-visible:ring-[#928466]/50 focus-visible:outline-none"
                    >
                      <svg className="w-3 h-3 text-white/25 group-hover:text-[#E8E0CC] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Mobile: compact stack */}
                <div className="flex flex-col gap-3 mt-5 mb-4 md:hidden">
                  {/* Email */}
                  <a
                    href="mailto:hello@trusynth.com"
                    className="flex items-center gap-2 text-xs text-white/40
                               hover:text-white/70 transition-colors duration-300 group"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#928466]/60 group-hover:text-[#928466] transition-colors" />
                    <span className="font-mono text-[11px] tracking-wide">hello@trusynth.com</span>
                  </a>

                  {/* Locations + Social on same line */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[11px] text-white/20">
                      <span>New York</span>
                      <span className="text-[#928466]/30 text-[5px]">&#9670;</span>
                      <span>Prague</span>
                      <span className="text-[#928466]/30 text-[5px]">&#9670;</span>
                      <span>Paris</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href="https://twitter.com/trusynth"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 flex items-center justify-center rounded-full
                                   border border-white/[0.06] hover:border-[#928466]/30
                                   hover:bg-white/[0.03] transition-all duration-300 group"
                      >
                        <svg className="w-3 h-3 text-white/25 group-hover:text-[#E8E0CC] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      </a>
                      <a
                        href="https://linkedin.com/company/trusynth"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 flex items-center justify-center rounded-full
                                   border border-white/[0.06] hover:border-[#928466]/30
                                   hover:bg-white/[0.03] transition-all duration-300 group"
                      >
                        <svg className="w-3 h-3 text-white/25 group-hover:text-[#E8E0CC] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 7. SIGNATURE: Tagline + Copyright */}
              <motion.div
                variants={childVariants}
                className="flex items-center justify-between pt-2"
              >
                <p className="text-[11px] md:text-xs font-satoshi font-light italic tracking-[0.04em] text-white/20">
                  Synthesizing Truth into Action.
                </p>
                <p className="text-[10px] text-white/15 tracking-wide font-mono">
                  &copy; 2026 TRU SYNTH
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NavMenu;
