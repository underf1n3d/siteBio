'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLang } from '@/components/LangContext';

export default function NotFound() {
  const { lang } = useLang();

  const t = {
    ru: {
      label: "Ошибка навигации",
      h1: "Эта ветвь была",
      h2: "отсечена",
      desc: "Здесь ничего нет. Страница, которую вы ищете, растворилась в цифровом эфире.",
      btn: "Вернуться к корням"
    },
    en: {
      label: "Navigation Error",
      h1: "This branch has been",
      h2: "pruned",
      desc: "There is nothing here. The page you are looking for has dissolved into the digital ether.",
      btn: "Return to the roots"
    }
  }[lang];

  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center justify-center px-6 relative overflow-hidden">
      
      <motion.h1 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="font-serif text-[10rem] sm:text-[14rem] md:text-[20rem] leading-none text-olive-green/[0.04] dark:text-cream-peach/[0.03] select-none absolute z-0 pointer-events-none"
      >
        404
      </motion.h1>

      <div className="z-10 flex flex-col items-center text-center gap-6 mt-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-sm font-mono font-semibold uppercase tracking-[0.35em] text-juicy-orange">
            {t.label}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-olive-green dark:text-cream-peach">
            {t.h1} <span className="italic text-juicy-orange">{t.h2}</span>
          </h2>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-sm sm:text-base text-dark-bg/60 dark:text-cream-peach/50 max-w-md font-mono leading-relaxed"
        >
          {t.desc}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8"
        >
          <Link 
            href="/"
            className="px-8 py-3.5 rounded-full border border-olive-green/20 hover:border-juicy-orange text-olive-green hover:text-juicy-orange dark:border-olive-green/30 dark:text-cream-peach dark:hover:text-juicy-orange transition-all duration-300 uppercase tracking-[0.2em] text-[10px] sm:text-xs font-bold flex items-center gap-3 group bg-cream-peach/5 dark:bg-olive-green/5 backdrop-blur-sm"
          >
            <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1.5 text-lg leading-none">←</span> 
            {t.btn}
          </Link>
        </motion.div>
      </div>

      <motion.svg
        initial={{ y: '-20vh', x: 0, rotate: 0, opacity: 0 }}
        animate={{ 
          y: '80vh', 
          x: [0, -40, 30, -20, 0],
          rotate: [0, 60, -40, 90],
          opacity: [0, 0.4, 0.4, 0] 
        }}
        transition={{ 
          duration: 12, 
          repeat: Infinity, 
          ease: "linear",
          delay: 1
        }}
        className="absolute top-0 right-[20%] md:right-[30%] w-10 h-10 pointer-events-none z-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--color-juicy-orange)"
        strokeWidth="1"
      >
        <path d="M12 2C8 2 4 6 4 10c0 5 8 12 8 12s8-7 8-12c0-4-4-8-8-8z" />
        <path d="M12 2v20" strokeOpacity="0.3" />
      </motion.svg>

    </div>
  );
}
