'use client';

import { motion } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';
import { useLang } from './LangContext';

const labels = {
  ru: { projects: 'Проекты', about: 'Обо мне', contacts: 'Контакты', name: 'Underfined' },
  en: { projects: 'Projects', about: 'About', contacts: 'Contacts', name: 'Underfined' },
};

type SectionName = 'Проекты' | 'Обо мне' | 'Контакты';

interface IkebanaProps {
  activeSection: SectionName | null;
  setActiveSection: Dispatch<SetStateAction<SectionName | null>>;
  hoveredSection: SectionName | null;
  setHoveredSection: Dispatch<SetStateAction<SectionName | null>>;
  compact?: boolean;
}

const Leaf = ({ 
  x, y, scale = 1, rotate = 0, isHighlighted 
}: { 
  x: number; y: number; scale?: number; rotate?: number; isHighlighted: boolean;
}) => (
  <motion.g
    style={{ x, y, rotate, scale, originX: '0px', originY: '0px' }}
    animate={{ scale, rotate: isHighlighted ? rotate + 12 : rotate }}
    transition={{ type: 'spring', stiffness: 80, damping: 12 }}
  >
    <motion.path
      d="M 0 0 C 12 -18, 30 -12, 36 0 C 30 12, 12 18, 0 0 Z"
      fill="currentColor"
      className="transition-colors duration-500"
      animate={{ color: isHighlighted ? 'var(--color-juicy-orange)' : 'var(--color-olive-green)' }}
      style={{ opacity: isHighlighted ? 1 : 0.55 }}
    />
  </motion.g>
);


const Blossom = ({ 
  x, y, isActive, isHovered 
}: { 
  x: number; y: number; isActive: boolean; isHovered: boolean;
}) => {
  const blooming = isActive || isHovered;

  return (
    <motion.g
      style={{ x, y, originX: '0px', originY: '0px' }}
      animate={{
        color: blooming ? 'var(--color-juicy-orange)' : 'var(--color-olive-green)',
      }}
      transition={{
        color: { duration: 0.8, ease: 'easeInOut' },
      }}
    >

      <motion.circle
        r={22}
        fill="currentColor"
        animate={{ opacity: blooming ? 0.15 : 0, scale: blooming ? 1 : 0.5 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      />


      <motion.circle
        r={5}
        fill="currentColor"
        animate={{ 
          scale: blooming ? 1.3 : 1, 
          opacity: 1 
        }}
        transition={{ type: 'spring', stiffness: 60, damping: 14 }}
      />


      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <motion.path
          key={i}
          d="M 0 0 C -4 -8, -6.5 -13, 0 -18 C 6.5 -13, 4 -8, 0 0 Z"
          fill="currentColor"
          style={{ originX: '0px', originY: '0px' }}
          initial={{ rotate: angle, scale: 0.55, opacity: 0.6 }}
          animate={{ 
            rotate: blooming ? angle + i * 2.5 : angle,
            scale: blooming ? 1.1 : 0.55,
            opacity: blooming ? 0.95 : 0.6,
          }}
          transition={{ 
            type: 'spring',
            stiffness: 30,
            damping: 10,
            mass: 1,
            delay: blooming ? i * 0.06 : 0,
          }}
        />
      ))}
    </motion.g>
  );
};

export const Ikebana = ({
  activeSection, setActiveSection, hoveredSection, setHoveredSection, compact
}: IkebanaProps) => {
  const { lang } = useLang();
  const t = labels[lang];

  const handleSelect = (section: SectionName) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const labelSize = compact ? 'text-xl' : 'text-3xl sm:text-4xl md:text-5xl';
  const nameSize = compact ? 'text-base' : 'text-xl sm:text-2xl md:text-3xl';

  const branchProps = (section: SectionName) => ({
    isHovered: hoveredSection === section,
    isActive: activeSection === section,
    highlighted: hoveredSection === section || activeSection === section,
  });

  return (
    <div className="relative w-full aspect-square flex items-center justify-center select-none">
      <svg viewBox="-50 50 700 600" className="w-full h-full overflow-visible">
        

        <motion.g
          animate={{ rotate: [-0.5, 0.5, -0.5] }}
          transition={{ repeat: Infinity, duration: 9, ease: 'easeInOut' }}
          style={{ originX: '300px', originY: '580px' }}
        >
          <motion.path
            d="M300,580 Q295,490 300,420"
            stroke="var(--color-olive-green)"
            strokeWidth="4"
            fill="transparent"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="opacity-60 dark:opacity-40"
          />
          <Leaf x={296} y={530} rotate={-40} scale={0.9} isHighlighted={false} />
          <Leaf x={304} y={475} rotate={40} scale={0.9} isHighlighted={false} />
        </motion.g>


        <motion.g
          animate={{ rotate: [-1.2, 1.2, -1.2] }}
          transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
          style={{ originX: '300px', originY: '420px' }}
          className="cursor-pointer"
          onClick={() => handleSelect('Проекты')}
          onMouseEnter={() => setHoveredSection('Проекты')}
          onMouseLeave={() => setHoveredSection(null)}
        >
          <motion.path
            d="M300,420 C230,430 140,340 100,220"
            stroke={branchProps('Проекты').highlighted ? 'var(--color-juicy-orange)' : 'var(--color-olive-green)'}
            strokeWidth={branchProps('Проекты').highlighted ? '3.5' : '2.5'}
            fill="transparent" strokeLinecap="round"
            className="opacity-75 dark:opacity-50 transition-all duration-500"
          />
          <Leaf x={240} y={395} rotate={-50} scale={1} isHighlighted={branchProps('Проекты').isHovered} />
          <Leaf x={165} y={320} rotate={-130} scale={1} isHighlighted={branchProps('Проекты').isHovered} />
          <Blossom x={100} y={220} isActive={branchProps('Проекты').isActive} isHovered={branchProps('Проекты').isHovered} />

          <motion.text
            x={100} y={220} dx={-28} dy={10}
            textAnchor="end"
            className={`${labelSize} font-serif font-light select-none transition-colors duration-300 ${
              branchProps('Проекты').highlighted ? 'fill-juicy-orange font-medium' : 'fill-olive-green dark:fill-cream-peach/80'
            }`}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
          >
            {t.projects}
          </motion.text>
        </motion.g>


        <motion.g
          animate={{ rotate: [-1, 1, -1] }}
          transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
          style={{ originX: '300px', originY: '420px' }}
          className="cursor-pointer"
          onClick={() => handleSelect('Контакты')}
          onMouseEnter={() => setHoveredSection('Контакты')}
          onMouseLeave={() => setHoveredSection(null)}
        >
          <motion.path
            d="M300,420 C370,430 460,320 500,200"
            stroke={branchProps('Контакты').highlighted ? 'var(--color-juicy-orange)' : 'var(--color-olive-green)'}
            strokeWidth={branchProps('Контакты').highlighted ? '3.5' : '2.5'}
            fill="transparent" strokeLinecap="round"
            className="opacity-75 dark:opacity-50 transition-all duration-500"
          />
          <Leaf x={360} y={390} rotate={50} scale={1} isHighlighted={branchProps('Контакты').isHovered} />
          <Leaf x={435} y={310} rotate={130} scale={1} isHighlighted={branchProps('Контакты').isHovered} />
          <Blossom x={500} y={200} isActive={branchProps('Контакты').isActive} isHovered={branchProps('Контакты').isHovered} />

          <motion.text
            x={500} y={200} dx={28} dy={10}
            textAnchor="start"
            className={`${labelSize} font-serif font-light select-none transition-colors duration-300 ${
              branchProps('Контакты').highlighted ? 'fill-juicy-orange font-medium' : 'fill-olive-green dark:fill-cream-peach/80'
            }`}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
          >
            {t.contacts}
          </motion.text>
        </motion.g>


        <motion.g
          animate={{ rotate: [-1.3, 1.3, -1.3] }}
          transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut' }}
          style={{ originX: '300px', originY: '420px' }}
          className="cursor-pointer"
          onClick={() => handleSelect('Обо мне')}
          onMouseEnter={() => setHoveredSection('Обо мне')}
          onMouseLeave={() => setHoveredSection(null)}
        >
          <motion.path
            d="M300,420 C275,320 325,200 300,120"
            stroke={branchProps('Обо мне').highlighted ? 'var(--color-juicy-orange)' : 'var(--color-olive-green)'}
            strokeWidth={branchProps('Обо мне').highlighted ? '3.5' : '2.5'}
            fill="transparent" strokeLinecap="round"
            className="opacity-80 dark:opacity-55 transition-all duration-500"
          />
          <Leaf x={288} y={300} rotate={-90} scale={1} isHighlighted={branchProps('Обо мне').isHovered} />
          <Leaf x={315} y={210} rotate={90} scale={1} isHighlighted={branchProps('Обо мне').isHovered} />
          <Blossom x={300} y={120} isActive={branchProps('Обо мне').isActive} isHovered={branchProps('Обо мне').isHovered} />

          <motion.text
            x={300} y={120} dy={-28}
            textAnchor="middle"
            className={`${labelSize} font-serif font-light select-none transition-colors duration-300 ${
              branchProps('Обо мне').highlighted ? 'fill-juicy-orange font-medium' : 'fill-olive-green dark:fill-cream-peach/80'
            }`}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
          >
            {t.about}
          </motion.text>
        </motion.g>


        <g className="cursor-pointer" onClick={() => handleSelect('Контакты')}>
          <circle cx={300} cy={420} r={55} fill="var(--color-cream-peach)" className="opacity-30 dark:fill-dark-bg transition-colors duration-300" />
          <circle cx={300} cy={420} r={14} fill="transparent" stroke="var(--color-olive-green)" strokeWidth="1.5" className="opacity-70" />
          <circle cx={300} cy={420} r={6} fill="var(--color-juicy-orange)" />
          <motion.text
            x={300} y={420} dy={40}
            textAnchor="middle"
            className={`${nameSize} font-serif tracking-[0.25em] font-bold fill-olive-green dark:fill-cream-peach/90 select-none uppercase hover:fill-juicy-orange dark:hover:fill-juicy-orange transition-colors duration-300`}
            whileHover={{ scale: 1.05 }}
          >
            {t.name}
          </motion.text>
        </g>
      </svg>
    </div>
  );
};
