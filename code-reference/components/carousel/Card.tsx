
import React, { useState, useEffect } from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import { CardData } from '../../types';

interface CardProps {
  index: number;
  scrollX: MotionValue<number>;
  data: CardData;
  cardWidth: number;
  onTap: () => void;
  onExplore?: () => void;
}

// ─── PRODUCT SNEAK PEEKS ─────────────────────────────────────

const SpendPeek = () => (
  <svg viewBox="0 0 300 220" className="w-full" preserveAspectRatio="xMidYMin meet">
    <rect width="300" height="220" rx="10" fill="#0c0c0c" />

    {/* Window chrome */}
    <circle cx="14" cy="12" r="2.5" fill="rgba(255,255,255,0.08)" />
    <circle cx="23" cy="12" r="2.5" fill="rgba(255,255,255,0.08)" />
    <circle cx="32" cy="12" r="2.5" fill="rgba(255,255,255,0.08)" />
    <text x="150" y="14" textAnchor="middle" fontSize="5.5" fontWeight="500" fill="rgba(255,255,255,0.2)" fontFamily="Inter">spend.trusynth.com</text>

    {/* Metric cards */}
    {[
      { x: 12, label: 'Total Spend', value: '$2.4M', sub: 'this quarter', accent: false },
      { x: 108, label: 'Waste Detected', value: '$186K', sub: '-12% vs last Q', accent: true },
      { x: 204, label: 'Active Vendors', value: '847', sub: '+24 new', accent: false },
    ].map((m, i) => (
      <g key={i}>
        <rect x={m.x} y="28" width="84" height="54" rx="8" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.045)" strokeWidth="0.5" />
        <text x={m.x + 10} y="43" fontSize="5.5" fontWeight="500" fill="rgba(255,255,255,0.3)" fontFamily="Inter">{m.label}</text>
        <text x={m.x + 10} y="63" fontSize="16" fontWeight="700" fill={m.accent ? '#ef4444' : 'rgba(255,255,255,0.9)'} fontFamily="Inter">{m.value}</text>
        <text x={m.x + 10} y="75" fontSize="5" fill={m.accent ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.18)'} fontFamily="Inter">{m.sub}</text>
      </g>
    ))}

    <text x="12" y="100" fontSize="6" fontWeight="600" fill="rgba(255,255,255,0.35)" fontFamily="Inter">Vendor Spend Distribution</text>

    {/* Vendor bars */}
    {[
      { label: 'Amazon Web Services', w: 220, amount: '$142K', alert: false },
      { label: 'Salesforce', w: 162, amount: '$98K', alert: true },
      { label: 'Slack', w: 118, amount: '$67K', alert: false },
      { label: 'Datadog', w: 72, amount: '$41K', alert: true },
      { label: 'Figma', w: 50, amount: '$24K', alert: false },
    ].map((row, i) => (
      <g key={i} transform={`translate(12, ${110 + i * 22})`}>
        <rect x="0" y="0" width="276" height="16" rx="4" fill="rgba(255,255,255,0.015)" />
        <rect x="0" y="0" width={row.w} height="16" rx="4" fill={row.alert ? 'rgba(239,68,68,0.12)' : 'rgba(146,132,102,0.15)'} />
        <rect x="0" y="0" width={row.w * 0.6} height="16" rx="4" fill={row.alert ? 'rgba(239,68,68,0.2)' : 'rgba(146,132,102,0.25)'} />
        <text x="8" y="11" fontSize="6" fontWeight="500" fill="rgba(255,255,255,0.55)" fontFamily="Inter">{row.label}</text>
        <text x="270" y="11" textAnchor="end" fontSize="6" fontWeight="600" fill={row.alert ? 'rgba(239,68,68,0.6)' : 'rgba(255,255,255,0.3)'} fontFamily="Inter">{row.amount}</text>
        {row.alert && <circle cx="248" cy="8" r="2.5" fill="#ef4444" opacity="0.4" />}
      </g>
    ))}
  </svg>
);

const SynthOSPeek = () => (
  <svg viewBox="0 0 300 220" className="w-full" preserveAspectRatio="xMidYMin meet">
    <rect width="300" height="220" rx="10" fill="#100e08" />

    {/* Window chrome */}
    <circle cx="14" cy="12" r="2.5" fill="rgba(146,132,102,0.2)" />
    <circle cx="23" cy="12" r="2.5" fill="rgba(146,132,102,0.2)" />
    <circle cx="32" cy="12" r="2.5" fill="rgba(146,132,102,0.2)" />

    {/* Left sidebar */}
    <rect x="0" y="24" width="44" height="196" fill="rgba(146,132,102,0.03)" />
    <line x1="44" y1="24" x2="44" y2="220" stroke="rgba(146,132,102,0.06)" strokeWidth="0.5" />
    {['O', 'A', 'T', 'R'].map((letter, i) => (
      <g key={i}>
        <rect x="8" y={32 + i * 36} width="28" height="28" rx="7" fill={i === 1 ? 'rgba(34,197,94,0.08)' : 'rgba(146,132,102,0.04)'} stroke={i === 1 ? 'rgba(34,197,94,0.12)' : 'rgba(146,132,102,0.06)'} strokeWidth="0.5" />
        <text x="22" y={50 + i * 36} textAnchor="middle" fontSize="8" fontWeight="700" fill={i === 1 ? 'rgba(34,197,94,0.5)' : 'rgba(146,132,102,0.25)'} fontFamily="Inter">{letter}</text>
        {i < 3 && <circle cx="34" cy={34 + i * 36} r="2" fill="#22c55e" opacity="0.6" />}
      </g>
    ))}

    {/* Main header */}
    <text x="56" y="40" fontSize="9" fontWeight="700" fill="rgba(255,255,255,0.7)" fontFamily="Inter">Agent Operations</text>
    {/* Live badge */}
    <rect x="150" y="30" width="36" height="14" rx="7" fill="rgba(34,197,94,0.08)" stroke="rgba(34,197,94,0.15)" strokeWidth="0.5" />
    <circle cx="158" cy="37" r="2" fill="#22c55e" opacity="0.7" />
    <text x="164" y="40" fontSize="5.5" fontWeight="600" fill="rgba(34,197,94,0.5)" fontFamily="Inter">LIVE</text>
    <rect x="190" y="30" width="48" height="14" rx="7" fill="rgba(146,132,102,0.06)" stroke="rgba(146,132,102,0.08)" strokeWidth="0.5" />
    <text x="214" y="40" textAnchor="middle" fontSize="5.5" fill="rgba(146,132,102,0.35)" fontFamily="Inter">142 today</text>

    {/* Agent grid — 2 columns */}
    {[
      { name: 'Due Diligence Bot', task: 'Series B VDR · 847 docs', progress: 0.78, status: 'active' },
      { name: 'Compliance Agent', task: 'SOC 2 · 23 controls', progress: 0.45, status: 'active' },
      { name: 'Vendor Risk Scorer', task: '12 vendors · policy check', progress: 0.92, status: 'active' },
      { name: 'Report Generator', task: 'Memo v2.4 queued', progress: 0, status: 'queue' },
    ].map((agent, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const ax = 52 + col * 124;
      const ay = 52 + row * 48;
      const isActive = agent.status === 'active';
      return (
        <g key={i}>
          <rect x={ax} y={ay} width="116" height="42" rx="8" fill="rgba(146,132,102,0.04)" stroke="rgba(146,132,102,0.08)" strokeWidth="0.5" />
          <circle cx={ax + 12} cy={ay + 14} r="4" fill={isActive ? '#22c55e' : '#eab308'} opacity="0.12" />
          <circle cx={ax + 12} cy={ay + 14} r="1.8" fill={isActive ? '#22c55e' : '#eab308'} opacity="0.8" />
          <text x={ax + 20} y={ay + 17} fontSize="6.5" fontWeight="700" fill="rgba(255,255,255,0.65)" fontFamily="Inter">{agent.name}</text>
          <text x={ax + 12} y={ay + 28} fontSize="5" fill="rgba(255,255,255,0.2)" fontFamily="Inter">{agent.task}</text>
          {isActive && (
            <g>
              <rect x={ax + 12} y={ay + 34} width="80" height="3" rx="1.5" fill="rgba(255,255,255,0.04)" />
              <rect x={ax + 12} y={ay + 34} width={80 * agent.progress} height="3" rx="1.5" fill="#928466" opacity="0.5" />
              <text x={ax + 100} y={ay + 37} textAnchor="end" fontSize="4.5" fontWeight="600" fill="rgba(146,132,102,0.4)" fontFamily="Inter">{Math.round(agent.progress * 100)}%</text>
            </g>
          )}
        </g>
      );
    })}

    {/* Activity log */}
    <rect x="52" y="152" width="240" height="62" rx="8" fill="rgba(146,132,102,0.025)" stroke="rgba(146,132,102,0.06)" strokeWidth="0.5" />
    <text x="64" y="166" fontSize="6" fontWeight="600" fill="rgba(255,255,255,0.3)" fontFamily="Inter">Live Activity</text>
    <line x1="64" y1="170" x2="280" y2="170" stroke="rgba(146,132,102,0.04)" strokeWidth="0.5" />
    {[
      { icon: '✓', text: 'Vendor risk assessment complete — 3 flagged', time: '2s ago', color: '#22c55e' },
      { icon: '→', text: 'Compliance check running on batch #47', time: 'now', color: '#928466' },
      { icon: '✓', text: 'Memo v2.3 delivered to LP portal', time: '1m ago', color: '#22c55e' },
    ].map((item, i) => (
      <g key={i} transform={`translate(64, ${176 + i * 11})`}>
        <text x="0" y="6" fontSize="5.5" fill={item.color} opacity="0.6" fontFamily="Inter">{item.icon}</text>
        <text x="12" y="6" fontSize="5" fill="rgba(255,255,255,0.3)" fontFamily="Inter">{item.text}</text>
        <text x="218" y="6" textAnchor="end" fontSize="4" fill="rgba(255,255,255,0.12)" fontFamily="Inter">{item.time}</text>
      </g>
    ))}
  </svg>
);

const AgentsPeek = () => (
  <svg viewBox="0 0 300 220" className="w-full" preserveAspectRatio="xMidYMin meet">
    <rect width="300" height="220" rx="10" fill="#0a0a0a" />

    {/* Window chrome */}
    <circle cx="14" cy="12" r="2.5" fill="rgba(255,255,255,0.08)" />
    <circle cx="23" cy="12" r="2.5" fill="rgba(255,255,255,0.08)" />
    <circle cx="32" cy="12" r="2.5" fill="rgba(255,255,255,0.08)" />

    {/* Filter chips */}
    {['All Agents', 'Sales', 'Finance', 'Content', 'Ops'].map((tab, i) => {
      const w = i === 0 ? 50 : 38;
      const x = i === 0 ? 12 : 12 + 54 + (i - 1) * 42;
      return (
        <g key={i}>
          <rect x={x} y="26" width={w} height="16" rx="8" fill={i === 0 ? 'rgba(146,132,102,0.15)' : 'rgba(255,255,255,0.02)'} stroke={i === 0 ? 'rgba(146,132,102,0.25)' : 'rgba(255,255,255,0.05)'} strokeWidth="0.5" />
          <text x={x + w / 2} y="37" textAnchor="middle" fontSize="5.5" fontWeight={i === 0 ? '600' : '400'} fill={i === 0 ? 'rgba(146,132,102,0.8)' : 'rgba(255,255,255,0.2)'} fontFamily="Inter">{tab}</text>
        </g>
      );
    })}

    {/* Agent rows */}
    {[
      { name: 'Sales Outreach Pro', cat: 'Sales', installs: '2,400+', rating: '4.9', active: true },
      { name: 'Invoice Scanner', cat: 'Finance', installs: '1,800+', rating: '4.7', active: true },
      { name: 'Content Writer AI', cat: 'Content', installs: '3,100+', rating: '4.8', active: false },
      { name: 'Compliance Bot', cat: 'Finance', installs: '890+', rating: '4.6', active: true },
      { name: 'Lead Qualifier', cat: 'Sales', installs: '1,200+', rating: '4.5', active: false },
      { name: 'Data Enrichment', cat: 'Ops', installs: '2,100+', rating: '4.9', active: false },
    ].map((agent, i) => (
      <g key={i} transform={`translate(12, ${52 + i * 28})`}>
        <rect x="0" y="0" width="276" height="24" rx="6" fill="rgba(255,255,255,0.015)" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
        <rect x="6" y="4" width="16" height="16" rx="4.5" fill="rgba(146,132,102,0.08)" stroke="rgba(146,132,102,0.1)" strokeWidth="0.5" />
        <text x="14" y="15" textAnchor="middle" fontSize="7" fontWeight="700" fill="rgba(146,132,102,0.45)" fontFamily="Inter">{agent.name[0]}</text>
        <text x="28" y="11" fontSize="6.5" fontWeight="600" fill="rgba(255,255,255,0.6)" fontFamily="Inter">{agent.name}</text>
        <text x="28" y="20" fontSize="4.5" fill="rgba(255,255,255,0.18)" fontFamily="Inter">{agent.cat} · {agent.installs} · ★ {agent.rating}</text>
        <rect x="222" y="4" width="46" height="16" rx="8" fill={agent.active ? 'rgba(34,197,94,0.08)' : 'rgba(146,132,102,0.1)'} stroke={agent.active ? 'rgba(34,197,94,0.15)' : 'rgba(146,132,102,0.15)'} strokeWidth="0.5" />
        <text x="245" y="15" textAnchor="middle" fontSize="5" fontWeight="600" fill={agent.active ? 'rgba(34,197,94,0.6)' : 'rgba(146,132,102,0.55)'} fontFamily="Inter">{agent.active ? 'Active' : 'Install'}</text>
      </g>
    ))}
  </svg>
);


const WorkforcePeek = () => (
  <svg viewBox="0 0 300 220" className="w-full" preserveAspectRatio="xMidYMin meet">
    <rect width="300" height="220" rx="10" fill="#0b0908" />

    {/* Window chrome */}
    <circle cx="14" cy="12" r="2.5" fill="rgba(146,132,102,0.15)" />
    <circle cx="23" cy="12" r="2.5" fill="rgba(146,132,102,0.15)" />
    <circle cx="32" cy="12" r="2.5" fill="rgba(146,132,102,0.15)" />
    <text x="150" y="14" textAnchor="middle" fontSize="5.5" fontWeight="500" fill="rgba(146,132,102,0.25)" fontFamily="Inter">workforce.trusynth.com</text>

    {/* 3x2 Agent Grid */}
    {[
      { name: 'Sales Outreach', category: 'Sales', stat: '847 prospects', dotColor: '#22c55e' },
      { name: 'Content Writer', category: 'Content', stat: '12 drafts/wk', dotColor: '#22c55e' },
      { name: 'Competitive Intel', category: 'Research', stat: '24 tracked', dotColor: '#eab308' },
      { name: 'Invoice Processor', category: 'Finance', stat: '94 cleared', dotColor: '#22c55e' },
      { name: 'Social Media', category: 'Marketing', stat: '3 platforms', dotColor: '#22c55e' },
      { name: 'Lead Qualifier', category: 'Sales', stat: '156 scored', dotColor: '#eab308' },
    ].map((agent, i) => {
      const col = i % 3;
      const row = Math.floor(i / 3);
      const tileW = 84;
      const tileH = 80;
      const gapX = 12;
      const gapY = 12;
      const offsetX = 14;
      const offsetY = 30;
      const tx = offsetX + col * (tileW + gapX);
      const ty = offsetY + row * (tileH + gapY);
      return (
        <g key={i}>
          {/* Tile background */}
          <rect x={tx} y={ty} width={tileW} height={tileH} rx="6" fill="rgba(255,255,255,0.02)" stroke="rgba(146,132,102,0.06)" strokeWidth="0.5" />

          {/* Status dot */}
          <circle cx={tx + 10} cy={ty + 12} r="3" fill={agent.dotColor} opacity="0.1" />
          <circle cx={tx + 10} cy={ty + 12} r="1.5" fill={agent.dotColor} opacity="0.75" />

          {/* Agent name */}
          <text x={tx + 10} y={ty + 30} fontSize="6.5" fontWeight="700" fill="rgba(255,255,255,0.65)" fontFamily="Inter">{agent.name}</text>

          {/* Category */}
          <text x={tx + 10} y={ty + 40} fontSize="4.5" fill="rgba(255,255,255,0.2)" fontFamily="Inter">{agent.category}</text>

          {/* Activity bar */}
          <rect x={tx + 10} y={ty + 52} width={tileW - 20} height="3" rx="1.5" fill="rgba(255,255,255,0.04)" />
          <rect x={tx + 10} y={ty + 52} width={(tileW - 20) * (0.5 + (i * 0.08))} height="3" rx="1.5" fill="rgba(146,132,102,0.3)" />

          {/* Stat metric */}
          <text x={tx + 10} y={ty + 68} fontSize="5" fontWeight="500" fill="rgba(146,132,102,0.4)" fontFamily="Inter">{agent.stat}</text>
        </g>
      );
    })}
  </svg>
);

const CardInner: React.FC<CardProps> = ({ index, scrollX, data, cardWidth, onTap, onExplore }) => {
  const offset = useTransform(scrollX, (value: number) => index - value);
  const [isNearCenter, setIsNearCenter] = useState(Math.abs(offset.get() as number) < 1.5);
  const [isActive, setIsActive] = useState(Math.abs(offset.get() as number) < 0.6);

  useEffect(() => {
    return offset.on('change', (v) => {
      const near = Math.abs(v) < 1.5;
      const active = Math.abs(v) < 0.6;
      if (near !== isNearCenter) setIsNearCenter(near);
      if (active !== isActive) setIsActive(active);
    });
  }, [offset, isNearCenter, isActive]);

  const scale = useTransform(offset, [-1, 0, 1], [0.78, 1, 0.78]);
  const opacity = useTransform(offset, [-1.2, -0.6, 0, 0.6, 1.2], [0, 0.3, 1, 0.3, 0]);
  const zIndex = useTransform(offset, (v) => Math.round(10 - Math.abs(v) * 10));
  const rotateY = useTransform(offset, [-1, 0, 1], [25, 0, -25]);
  const translateZ = useTransform(offset, [-1, 0, 1], [-60, 0, -60]);
  const x = useTransform(offset, value => value * cardWidth);

  let cardBg = '';
  let textTitle = '';
  let textMuted = '';
  let tagColor = '';
  let PeekComponent: React.FC = SpendPeek;
  let glowColor = 'rgba(146,132,102,0.2)';
  // Metallic border gradient — different for each card
  let borderGradient = '';

  if (data.id === 'truspend') {
    cardBg = 'bg-[#080808]';
    textTitle = 'text-white';
    textMuted = 'text-white/40';
    tagColor = 'text-[#928466]';
    PeekComponent = SpendPeek;
    glowColor = 'rgba(146,132,102,0.15)';
    borderGradient = 'linear-gradient(160deg, rgba(255,255,255,0.25) 0%, rgba(146,132,102,0.18) 25%, rgba(255,255,255,0.06) 45%, rgba(146,132,102,0.15) 65%, rgba(255,255,255,0.22) 85%, rgba(146,132,102,0.1) 100%)';
  } else if (data.id === 'synthos') {
    cardBg = 'bg-[linear-gradient(155deg,#c9a84c_0%,#f5e6a3_18%,#b8942f_42%,#f0dfa0_68%,#8c6210_100%)]';
    textTitle = 'text-black';
    textMuted = 'text-black/50';
    tagColor = 'text-black/35';
    PeekComponent = SynthOSPeek;
    glowColor = 'rgba(200,168,76,0.35)';
    borderGradient = 'linear-gradient(160deg, rgba(255,255,255,0.85) 0%, rgba(252,246,186,0.6) 15%, rgba(200,168,76,0.3) 30%, rgba(255,255,255,0.7) 45%, rgba(200,168,76,0.5) 60%, rgba(252,246,186,0.7) 75%, rgba(255,255,255,0.5) 90%, rgba(200,168,76,0.4) 100%)';
  } else if (data.id === 'truagents') {
    cardBg = 'bg-[#070707]';
    textTitle = 'text-white';
    textMuted = 'text-white/40';
    tagColor = 'text-[#928466]';
    PeekComponent = AgentsPeek;
    glowColor = 'rgba(146,132,102,0.18)';
    borderGradient = 'linear-gradient(160deg, rgba(146,132,102,0.3) 0%, rgba(255,255,255,0.18) 25%, rgba(146,132,102,0.08) 45%, rgba(255,255,255,0.14) 65%, rgba(146,132,102,0.25) 85%, rgba(255,255,255,0.12) 100%)';
  } else if (data.id === 'workforce') {
    cardBg = 'bg-[#080808]';
    textTitle = 'text-white';
    textMuted = 'text-white/40';
    tagColor = 'text-[#928466]';
    PeekComponent = WorkforcePeek;
    glowColor = 'rgba(160,140,100,0.18)';
    borderGradient = 'linear-gradient(160deg, rgba(146,132,102,0.22) 0%, rgba(255,220,160,0.14) 20%, rgba(255,255,255,0.1) 40%, rgba(146,132,102,0.18) 55%, rgba(255,220,160,0.12) 75%, rgba(255,255,255,0.15) 90%, rgba(146,132,102,0.14) 100%)';
  } else {
    cardBg = 'bg-[#080808]';
    textTitle = 'text-white';
    textMuted = 'text-white/40';
    tagColor = 'text-white/25';
    PeekComponent = SpendPeek;
    glowColor = 'rgba(146,132,102,0.15)';
    borderGradient = 'linear-gradient(160deg, rgba(255,255,255,0.12) 0%, rgba(146,132,102,0.08) 50%, rgba(255,255,255,0.1) 100%)';
  }

  const isGold = data.id === 'synthos';

  return (
    <motion.div
      style={{
        scale,
        opacity,
        zIndex,
        rotateY,
        x,
        translateZ,
        perspective: 1200,
        transformStyle: "preserve-3d",
        willChange: isNearCenter ? "transform, opacity" : "auto",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        contain: 'layout paint',
        boxShadow: isGold
          ? `0 40px 100px -25px rgba(200,168,76,0.45), 0 20px 40px -15px rgba(0,0,0,0.5), 0 0 80px -20px ${glowColor}`
          : `0 40px 100px -25px rgba(0,0,0,0.9), 0 20px 40px -15px rgba(0,0,0,0.7), 0 0 80px -20px ${glowColor}`,
      }}
      onClick={onTap}
      className={`absolute top-0 left-0 right-0 mx-auto w-[82vw] max-w-[300px] md:w-[300px] md:max-w-none lg:w-[330px] aspect-[3/4] rounded-[1.25rem] md:rounded-[1.75rem] flex flex-col transition-colors duration-300 cursor-grab active:cursor-grabbing overflow-hidden ${cardBg}`}
    >
      {isNearCenter && (
        <>
          {/* === Metallic border ring — outer bright edge with shimmer === */}
          <div className="absolute inset-0 rounded-[inherit] pointer-events-none z-20"
            style={{
              padding: isGold ? '2px' : '1.5px',
              background: borderGradient,
              backgroundSize: '300% 300%',
              animation: isGold ? 'border-shimmer 6s ease-in-out infinite' : 'border-shimmer 10s ease-in-out infinite',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
            }}
          />
          {/* === Inner secondary ring — depth illusion === */}
          <div className="absolute rounded-[inherit] pointer-events-none z-20"
            style={{
              inset: isGold ? '3px' : '2px',
              padding: isGold ? '0.75px' : '0.5px',
              background: isGold
                ? 'linear-gradient(160deg, rgba(0,0,0,0.25) 0%, rgba(120,90,30,0.1) 30%, transparent 50%, rgba(0,0,0,0.2) 70%, transparent 100%)'
                : 'linear-gradient(160deg, rgba(255,255,255,0.06) 0%, transparent 40%, rgba(255,255,255,0.04) 60%, transparent 100%)',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
            }}
          />

          {/* === 3D Texture Layers === */}

          {/* Top bevel highlight */}
          <div className="absolute inset-0 rounded-[inherit] pointer-events-none"
            style={{
              boxShadow: isGold
                ? 'inset 0 2px 0 0 rgba(255,255,255,0.5), inset 1px 0 0 0 rgba(255,255,255,0.25), inset 0 -1px 0 0 rgba(0,0,0,0.2)'
                : 'inset 0 1.5px 0 0 rgba(255,255,255,0.14), inset 1px 0 0 0 rgba(255,255,255,0.07), inset 0 -1px 0 0 rgba(0,0,0,0.4)',
            }}
          />

          {/* Inner depth shadow */}
          <div className="absolute inset-0 rounded-[inherit] pointer-events-none"
            style={{
              boxShadow: isGold
                ? 'inset 0 -6px 16px 0 rgba(0,0,0,0.2), inset -4px 0 10px 0 rgba(0,0,0,0.08)'
                : 'inset 0 -6px 20px 0 rgba(0,0,0,0.5), inset -4px 0 12px 0 rgba(0,0,0,0.25)',
            }}
          />

          {/* Noise */}
          <div className="absolute inset-0 rounded-[inherit] pointer-events-none opacity-[0.03] mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: '128px 128px',
            }}
          />

          {/* Shine sweep */}
          {isGold ? (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-white/35 via-transparent to-transparent opacity-60 pointer-events-none mix-blend-overlay" />
              <div className="absolute -inset-full bg-gradient-to-tr from-transparent via-white/35 to-transparent rotate-45 pointer-events-none animate-[shine_5s_infinite]" />
            </>
          ) : (
            <div className="absolute -inset-full bg-gradient-to-tr from-transparent via-white/[0.025] to-transparent rotate-45 pointer-events-none animate-[shine_12s_infinite]" />
          )}

          {/* Top light */}
          <div className="absolute inset-x-0 top-0 h-1/3 rounded-t-[inherit] pointer-events-none"
            style={{
              background: isGold
                ? 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%)'
                : 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 100%)',
            }}
          />

          {/* Card glow */}
          <div className="absolute inset-0 pointer-events-none"
            style={{
              background: isGold
                ? 'radial-gradient(ellipse 120% 60% at 50% -10%, rgba(252,246,186,0.2), transparent 65%)'
                : data.id === 'truagents'
                  ? 'radial-gradient(ellipse 100% 50% at 50% -5%, rgba(146,132,102,0.18), transparent 60%)'
                  : data.id === 'workforce'
                    ? 'radial-gradient(ellipse 100% 50% at 50% -5%, rgba(160,140,100,0.15), transparent 60%)'
                    : 'radial-gradient(ellipse 100% 50% at 50% -5%, rgba(146,132,102,0.12), transparent 60%)',
            }}
          />
        </>
      )}

      {/* ─── CONTENT ─── */}
      <div className="relative z-10 flex flex-col h-full pointer-events-none select-none">

        {/* Text area */}
        <div className="px-5 md:px-6 lg:px-7 pt-5 md:pt-6 lg:pt-7">
          {/* Category */}
          <span className={`text-[8px] md:text-[9px] font-semibold tracking-[0.2em] uppercase ${tagColor}`}
            style={{ fontFamily: "'Inter', sans-serif" }}>
            {data.category}
          </span>

          {/* Product name */}
          {data.id === 'synthos' ? (
            <h2 className="text-[26px] md:text-[30px] lg:text-[34px] leading-[1.15] tracking-[-0.04em] mt-1.5 md:mt-2 pb-0.5"
              style={{
                fontFamily: "'Satoshi', 'Inter', sans-serif",
                backgroundImage: 'linear-gradient(180deg, #5a5a5a 0%, #3a3a3a 40%, #4a4a4a 60%, #2e2e2e 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
              <span className="font-medium">Synth</span><span className="font-black">OS</span>
            </h2>
          ) : (data.id === 'truspend' || data.id === 'truagents' || data.id === 'workforce') ? (
            <h2 className={`text-[26px] md:text-[30px] lg:text-[34px] leading-[1] font-bold tracking-[-0.04em] mt-1.5 md:mt-2 ${textTitle}`}
              style={{ fontFamily: "'Satoshi', 'Inter', sans-serif" }}>
              {data.id === 'truspend' ? 'Spend' : data.id === 'truagents' ? 'Agents' : 'Workforce'}
            </h2>
          ) : (
            <h2 className={`text-[26px] md:text-[30px] lg:text-[34px] leading-[1] font-bold tracking-[-0.04em] mt-1.5 md:mt-2 ${textTitle}`}
              style={{ fontFamily: "'Satoshi', 'Inter', sans-serif" }}>
              {data.title}
            </h2>
          )}

          {/* Full description */}
          <p className={`text-[10.5px] md:text-[12px] leading-[1.55] tracking-[-0.005em] mt-2 md:mt-2.5 max-w-[95%] ${textMuted}`}
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>
            {data.desc}
          </p>
        </div>

        {/* ─── Product Peek ─── */}
        <div className="flex-1 mt-3 md:mt-4 mx-3 md:mx-4 mb-3 md:mb-4 rounded-lg md:rounded-xl overflow-hidden relative min-h-0"
          style={{
            backgroundColor: data.id === 'synthos' ? '#100e08' : data.id === 'truagents' ? '#0a0a0a' : data.id === 'workforce' ? '#0b0908' : '#0c0c0c',
            boxShadow: isGold
              ? '0 6px 24px -6px rgba(0,0,0,0.5), inset 0 0.5px 0 rgba(255,255,255,0.08)'
              : '0 6px 24px -6px rgba(0,0,0,0.6), inset 0 0.5px 0 rgba(255,255,255,0.05)',
            border: isGold ? '0.5px solid rgba(0,0,0,0.12)' : '0.5px solid rgba(255,255,255,0.05)',
          }}
        >
          <PeekComponent />
          {/* Bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-12 pointer-events-none"
            style={{
              background: isGold
                ? 'linear-gradient(transparent, rgba(16,14,8,0.9))'
                : `linear-gradient(transparent, ${data.id === 'truagents' ? 'rgba(7,7,7,0.95)' : data.id === 'workforce' ? 'rgba(11,9,8,0.95)' : 'rgba(8,8,8,0.95)'})`,
            }}
          />
          {/* Explore button — centered, visible on both mobile and desktop */}
          {isActive && onExplore && (
            <div
              className="absolute bottom-3 md:bottom-4 inset-x-0 z-10 flex justify-center pointer-events-auto"
              onClick={(e) => { e.stopPropagation(); onExplore(); }}
            >
              <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full backdrop-blur-md [contain:paint] border bg-white/10 border-white/15 text-white/60 hover:text-white/90 text-[9px] md:text-[10px] font-medium tracking-wide uppercase cursor-pointer transition-[color,transform] hover:scale-105">
                <span>Scroll to explore</span>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M7 10l5 5 5-5" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Corner accents */}
      <div className={`absolute top-4 right-4 w-3 h-3 border-t border-r transition-colors duration-1000 ${isGold ? 'border-black/[0.08]' : 'border-white/[0.06]'}`} />
      <div className={`absolute bottom-4 left-4 w-3 h-3 border-b border-l transition-colors duration-1000 ${isGold ? 'border-black/[0.08]' : 'border-white/[0.06]'}`} />
    </motion.div>
  );
};

export const Card = React.memo(CardInner);
