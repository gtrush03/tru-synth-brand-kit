import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Theme } from '../../types';

interface HeaderProps {
    theme: Theme;
    onLogoClick?: () => void;
    onGetInTouch?: () => void;
}

export const Header = React.memo(({ theme, onLogoClick, onGetInTouch }: HeaderProps) => (
  <>
    {/* Mobile Soft Blur Gradient Backdrop */}
    <div className="md:hidden fixed top-0 left-0 right-0 h-28 z-40 pointer-events-none transition-opacity duration-700">
       {/* Gradient Mask for Blur - fades out at the bottom */}
       <div 
         className="absolute inset-0 backdrop-blur-md [contain:paint]"
         style={{
           maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
           WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)'
         }}
       />
       {/* Subtle gradient overlay to help logo contrast */}
       <div className={`absolute inset-0 bg-gradient-to-b ${theme === 'light' ? 'from-white/60' : 'from-black/60'} to-transparent`} />
    </div>

    <header className="fixed top-0 left-0 right-0 h-20 md:h-24 flex items-center justify-between px-6 md:px-10 z-50 pointer-events-none">
      
      {/* Logo Container - Moved lower (pt-4) and adjusted size */}
      <div className="pointer-events-auto pt-4 md:pt-0 cursor-pointer" onClick={onLogoClick}>
          <img 
              src="https://i.imgur.com/p6POhEa.png" 
              alt="Logo" 
              className={`h-5 md:h-6 w-auto object-contain transition-[filter] duration-700 ${theme === 'light' ? 'invert' : 'brightness-100'}`}
          />
      </div>

      {/* CTA Button */}
      <button
        onClick={onGetInTouch}
        className={`hidden md:flex pointer-events-auto group items-center gap-2 px-5 py-2.5 rounded-full font-medium text-xs md:text-sm transition-[color,background-color,transform] duration-300 shadow-lg
        ${theme === 'dark' ? 'bg-white text-black hover:bg-gray-200' :
          theme === 'gold' ? 'bg-[linear-gradient(135deg,#928466,#E8E0CC,#786a4e)] text-white border border-[#928466]/20 hover:scale-105' : 'bg-black text-white hover:bg-gray-800'}`}>
        Get in Touch
        <ArrowUpRight size={16} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300" />
      </button>
    </header>
  </>
));