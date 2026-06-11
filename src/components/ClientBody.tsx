'use client';

import { CursorFollowingBackground } from "@/components/CursorFollowingBackground";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { LangSwitcher } from "@/components/LangSwitcher";
import { AudioPlayer } from "@/components/AudioPlayer";
import { LangContext, Lang } from "@/components/LangContext";
import { useMotionValue, motion } from "framer-motion";
import React, { useState, useEffect } from "react";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [lang, setLang] = useState<Lang>('ru');
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const versionField = document.getElementById('app-version') as HTMLInputElement | null;
    if (versionField) {
      console.log(
        `%c[System] Version: ${versionField.value} `,
        'background: #1a202c; color: #F2F5F0; border: 1px solid #A3BF6F; padding: 2px 6px; border-radius: 4px; font-family: monospace;'
      );
    }

    console.log(
      '%c Ну что ты смотришь? Тут нет бекенда 😎 ',
      'background: #FF8234; color: #1a202c; font-size: 18px; font-weight: bold; padding: 8px 16px; border-radius: 8px;'
    );
    console.log(
      '%c Но если хочешь что-то поисследовать — загляни в мои проекты 👇 ',
      'background: #A3BF6F; color: #1a202c; font-size: 14px; padding: 6px 12px; border-radius: 6px;'
    );
    console.log(
      '%c 🔗 yumk-rasp.ru • huesos.pro • ip.kqrf.click • qr.kqrf.click ',
      'color: #FF8234; font-size: 13px; padding: 4px 0;'
    );
    console.log(
      '%c А вообще, если ты сюда добрался — респект. Напиши мне в Telegram: @underfined 🤝 ',
      'background: #F2F5F0; color: #1a202c; font-size: 13px; padding: 6px 12px; border-radius: 6px; font-style: italic;'
    );
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <body onMouseMove={handleMouseMove} className="min-h-full flex flex-col relative bg-cream-peach text-dark-bg dark:bg-dark-bg dark:text-cream-peach">
        <input type="hidden" id="app-version" value={process.env.APP_VERSION || "1.0.0"} />
        <div className="absolute top-4 right-4 z-50 flex items-center gap-3">
          <AudioPlayer />
          <LangSwitcher />
          <ThemeSwitcher theme={theme} setTheme={setTheme} />
        </div>
        <CursorFollowingBackground mouseX={mouseX} mouseY={mouseY} />
        <motion.div 
          className="relative z-10 flex flex-col flex-grow"
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      </body>
    </LangContext.Provider>
  );
}
