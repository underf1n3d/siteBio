'use client';

import { motion } from 'framer-motion';

interface Props {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export const ThemeSwitcher = ({ theme, setTheme }: Props) => {
  const isDark = theme === 'dark';

  return (
    <div
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={`w-14 h-8 flex items-center bg-dark-bg/50 dark:bg-cream-peach/20 rounded-full p-1 cursor-pointer ${isDark ? 'justify-start' : 'justify-end'}`}
    >
      <motion.div
        className="w-6 h-6 bg-olive-green rounded-full"
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    </div>
  );
};
