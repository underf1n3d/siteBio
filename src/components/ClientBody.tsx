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
          <a
            href="https://github.com/underf1n3d/siteBio"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-olive-green/20 text-olive-green dark:text-cream-peach hover:border-juicy-orange hover:text-juicy-orange transition-all duration-300 bg-cream-peach/5 dark:bg-olive-green/5 backdrop-blur-sm"
            aria-label="GitHub Repository"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"></path>
            </svg>
          </a>
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
