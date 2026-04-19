import React, { useId } from 'react';

const GlowButton = ({ children = 'Explore Solutions' }) => {
  const id = useId().replace(/:/g, '');
  const filters = {
    unopaq: `unopaq-${id}`,
    unopaq2: `unopaq2-${id}`,
    unopaq3: `unopaq3-${id}`,
  };

  return (
    <div className="relative group inline-flex items-center justify-center isolate">
      {/* SVG Filters */}
      <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}>
        <defs>
          <filter width="300%" x="-100%" height="300%" y="-100%" id={filters.unopaq}>
            <feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 9 0" />
          </filter>
          <filter width="300%" x="-100%" height="300%" y="-100%" id={filters.unopaq2}>
            <feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 3 0" />
          </filter>
          <filter width="300%" x="-100%" height="300%" y="-100%" id={filters.unopaq3}>
            <feColorMatrix values="1 0 0 0.2 0 0 1 0 0.2 0 0 0 1 0.2 0 0 0 0 2 0" />
          </filter>
        </defs>
      </svg>

      {/* Hidden Button for clickability */}
      <button className="absolute w-[160px] h-[60px] z-20 outline-none border-none rounded-[17px] cursor-pointer opacity-0 pointer-events-auto" />

      {/* Button Container */}
      <div className="relative pointer-events-none">
        {/* Outer Glow Layer - Golden */}
        <div
          className="absolute inset-0 -z-20 opacity-50 overflow-hidden transition-opacity duration-300
                     group-hover:opacity-75 group-active:opacity-100 rounded-[17px]"
          style={{ filter: `blur(2em) url(#${filters.unopaq})`, willChange: 'opacity' }}
        >
          <div
            className="absolute inset-[-150%] group-hover:animate-[speen_8s_cubic-bezier(0.56,0.15,0.28,0.86)_infinite,woah_4s_infinite]"
            style={{
              background: 'linear-gradient(90deg, #FCF6BA 30%, #0000 50%, #E8E0CC 70%)',
            }}
          />
        </div>

        {/* Middle Glow Layer - Golden */}
        <div
          className="absolute inset-[-0.125em] -z-20 opacity-50 overflow-hidden transition-opacity duration-300
                     group-hover:opacity-75 group-active:opacity-100"
          style={{
            filter: `blur(0.25em) url(#${filters.unopaq2})`,
            borderRadius: '0.75em',
            willChange: 'opacity'
          }}
        >
          <div
            className="absolute inset-[-150%] group-hover:animate-[speen_8s_cubic-bezier(0.56,0.15,0.28,0.86)_infinite,woah_4s_infinite]"
            style={{
              background: 'linear-gradient(90deg, #FCF6BA 20%, #0000 45% 55%, #E8E0CC 80%)',
            }}
          />
        </div>

        {/* Button Border */}
        <div
          className="p-0.5 bg-[#0005] overflow-hidden"
          style={{
            clipPath: 'path("M 120 0 C 151 0 156 5 156 33 C 156 61 151 66 120 66 L 33 66 C 5 66 0 61 0 33 C 0 5 5 0 33 0 Z")',
            borderRadius: '17px',
            contain: 'layout style paint'
          }}
        >
          <div className="relative">
            {/* Inner Glow Layer - Golden */}
            <div
              className="absolute inset-[-2px] -z-10 opacity-50 overflow-hidden transition-opacity duration-300
                         group-hover:opacity-75 group-active:opacity-100"
              style={{
                filter: `blur(2px) url(#${filters.unopaq3})`,
                borderRadius: 'inherit',
                willChange: 'opacity'
              }}
            >
              <div
                className="absolute inset-[-150%] group-hover:animate-[speen_8s_cubic-bezier(0.56,0.15,0.28,0.86)_infinite,woah_4s_infinite]"
                style={{
                  background: 'linear-gradient(90deg, #FCF6BA 30%, #0000 45% 55%, #928466 70%)',
                }}
              />
            </div>

            {/* Button Surface */}
            <div
              className="flex flex-col items-center justify-center w-[150px] h-[60px] bg-[#111215] text-white overflow-hidden"
              style={{
                clipPath: 'path("M 120 0 C 145 0 150 5 150 30 C 150 55 145 60 120 60 L 30 60 C 5 60 0 55 0 30 C 0 5 5 0 30 0 Z")',
                borderRadius: '0.875em',
                contain: 'layout style paint'
              }}
            >
              <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#E8E0CC]">
                {children}
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes speen {
          0% { transform: rotate(10deg); }
          50% { transform: rotate(190deg); }
          100% { transform: rotate(370deg); }
        }
        @keyframes woah {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(0.75); }
        }
      `}</style>
    </div>
  );
};

export { GlowButton };
