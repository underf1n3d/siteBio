'use client';

import { motion } from 'framer-motion';
import { useLang, Lang } from './LangContext';

const petalAngles = [0, 72, 144, 216, 288];

const BloomHalf = ({
  label,
  isActive,
  onClick,
  side,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
  side: 'left' | 'right';
}) => {
  const cx = side === 'left' ? 22 : 58;

  return (
    <g
      className="cursor-pointer"
      onClick={onClick}
    >
      {/* Petals */}
      {petalAngles.map((angle, i) => (
        <motion.path
          key={i}
          d="M 0 0 C -2.5 -5, -4 -8, 0 -11 C 4 -8, 2.5 -5, 0 0 Z"
          fill={isActive ? 'var(--color-juicy-orange)' : 'var(--color-olive-green)'}
          style={{ originX: '0px', originY: '0px', x: cx, y: 20 }}
          animate={{
            rotate: angle + (isActive ? i * 3 : 0),
            scale: isActive ? 1 : 0.4,
            opacity: isActive ? 0.9 : 0.35,
          }}
          transition={{
            type: 'spring',
            stiffness: 50,
            damping: 12,
            delay: isActive ? i * 0.04 : 0,
          }}
        />
      ))}

      {/* Center pistil */}
      <motion.circle
        cx={cx}
        cy={20}
        r={isActive ? 4 : 3}
        fill={isActive ? 'var(--color-juicy-orange)' : 'var(--color-olive-green)'}
        animate={{
          scale: isActive ? 1 : 0.8,
          opacity: isActive ? 1 : 0.5,
        }}
        transition={{ type: 'spring', stiffness: 60, damping: 10 }}
      />

      {/* Label */}
      <motion.text
        x={cx}
        y={20}
        dy={24}
        textAnchor="middle"
        className="font-mono select-none pointer-events-none"
        style={{ fontSize: '9px' }}
        animate={{
          fill: isActive ? 'var(--color-juicy-orange)' : 'var(--color-olive-green)',
          opacity: isActive ? 1 : 0.5,
          fontWeight: isActive ? 700 : 400,
        }}
        transition={{ duration: 0.3 }}
      >
        {label}
      </motion.text>
    </g>
  );
};

export const LangSwitcher = () => {
  const { lang, setLang } = useLang();

  return (
    <div className="flex items-center justify-center">
      <svg
        viewBox="0 0 80 48"
        className="w-[80px] h-[48px] overflow-visible"
      >
        {/* Connecting stem between the two blooms */}
        <motion.path
          d="M 22 28 Q 40 36 58 28"
          stroke="var(--color-olive-green)"
          strokeWidth="1.2"
          fill="transparent"
          strokeLinecap="round"
          className="opacity-40"
        />

        <BloomHalf
          label="RU"
          isActive={lang === 'ru'}
          onClick={() => setLang('ru')}
          side="left"
        />
        <BloomHalf
          label="EN"
          isActive={lang === 'en'}
          onClick={() => setLang('en')}
          side="right"
        />
      </svg>
    </div>
  );
};
