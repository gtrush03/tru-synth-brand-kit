
import React from 'react';
import { motion } from 'framer-motion';
import { Theme } from '../../types';

interface SegmentedControlProps {
  items: { id: string; label: string }[];
  activeIndex: number;
  onChange: (index: number) => void;
  theme: Theme;
}

export const SegmentedControl = ({ items, activeIndex, onChange, theme }: SegmentedControlProps) => {
  const isGold = theme === 'gold';

  return (
    <div
      role="tablist"
      aria-label="Product navigation"
      className="inline-flex items-center backdrop-blur-md border rounded-full p-1 gap-0.5 transition-colors duration-700 bg-white/5 border-white/10"
    >
      {items.map((item, idx) => {
        const isActive = activeIndex === idx;
        return (
          <button
            key={item.id}
            role="tab"
            aria-selected={isActive}
            aria-label={item.label}
            onClick={() => onChange(idx)}
            className="relative px-5 py-2.5 rounded-full text-xs font-medium transition-colors duration-300 whitespace-nowrap cursor-pointer"
            style={{
              color: isActive
                ? '#000000'
                : isGold
                  ? 'rgba(146,132,102,0.6)'
                  : 'rgba(255,255,255,0.5)',
            }}
          >
            {isActive && (
              <motion.div
                layoutId="segment-bg"
                className="absolute inset-0 rounded-full"
                style={{
                  background: isGold
                    ? 'linear-gradient(to right, #928466, #E8E0CC, #786a4e)'
                    : '#ffffff',
                  boxShadow: isGold
                    ? '0 0 12px rgba(146,132,102,0.4)'
                    : '0 0 8px rgba(255,255,255,0.15)',
                }}
                transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
              />
            )}
            <span className="relative z-10">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};
