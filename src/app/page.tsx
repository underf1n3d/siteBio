'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ikebana } from '@/components/Ikebana';
import { useLang } from '@/components/LangContext';

type SectionName = 'Проекты' | 'Обо мне' | 'Контакты';



const projectsData = [
  {
    num: "01",
    title: { ru: "МантисПэй", en: "MantisPay" },
    description: {
      ru: "Надежный платежный шлюз для ваших услуг бизнеса.",
      en: "A reliable payment gateway for your business services.",
    },
    tech: ["In development", "Next.js", "Kotlin", "Spring", "C#", "Golang", "PostgreSQL", "Redis"],
    site: "pay.kqrf.click",
  },
  {
    num: "02",
    title: { ru: "ЮУМК Расписание Бот", en: "YUMK Schedule Bot" },
    description: {
      ru: "Неофициальная отказоустойчивая платформа для получения расписания ЮУМК. Двухуровневое кеширование, удобный API, максимальная стабильность.",
      en: "Unofficial fault-tolerant platform for accessing YUMK college schedules. Two-level caching, convenient API, maximum stability.",
    },
    tech: ["Node.js", "Redis", "Telegram API", "LRU Cache"],
    site: "yumk-rasp.ru",
    telegram: "@yumk_rasp_bot",
  },
  {
    num: "03",
    title: { ru: "HuesosMail", en: "HuesosMail" },
    description: {
      ru: "Приватный и защищённый почтовый сервис. Передовые протоколы шифрования и строгие правила конфиденциальности.",
      en: "Private and secure email service. Advanced encryption protocols and strict privacy policies.",
    },
    tech: ["Go", "React", "PostgreSQL", "E2E Encryption"],
    site: "www.huesos.pro",
    telegram: "@huesos_mail",
  },
  {
    num: "04",
    title: { ru: "ConnectInfoApi", en: "ConnectInfoApi" },
    description: {
      ru: "Молниеносный API на Cloudflare Workers. Информация об IP, генерация баннеров, минимальный веб-интерфейс для документации.",
      en: "Lightning-fast API on Cloudflare Workers. IP information, banner generation, minimal web interface for documentation.",
    },
    tech: ["Vanilla JS", "Cloudflare Workers", "SVG Generation"],
    site: "ip.kqrf.click",
  },
  {
    num: "05",
    title: { ru: "QR Art Studio", en: "QR Art Studio" },
    description: {
      ru: "Помощник по созданию максимально гибких и кастомизированных QR-кодов с интеграцией логотипов и брендовых цветов.",
      en: "A tool for creating highly flexible and customized QR codes with logo and brand color integration.",
    },
    tech: ["Next.js", "TypeScript", "Canvas API"],
    site: "qr.kqrf.click",
  },
];

const i18n = {
  ru: {
    projectsLabel: "Портфолио",
    projectsH1: "Избранные",
    projectsH2: "проекты",
    siteCta: "Сайт",
    aboutLabel: "Манифест",
    aboutH1: "Кто",
    aboutH2: "стоит за этим",
    quote: "«Творец цифровых миров, ломающий шаблоны»",
    bio1: <>Привет! Я — <span className="font-serif font-bold text-2xl text-olive-green dark:text-cream-peach">Underfined</span>, разработчик и цифровой исследователь. Мой путь в вебе вдохновлён желанием превращать сухой код в плавное интерактивное искусство.</>,
    bio2: "Современный сайт — это живой организм. У него своя гравитация, ритм и дыхание. Эстетика никогда не приносится в жертву скорости: каждая анимация обязана летать даже на самых скромных устройствах.",
    skillsAesthetics: "Эстетика",
    skillsArchitecture: "Архитектура",
    skillsPhilosophy: "Философия",
    principles: ["Privacy by Design", "Оптимизация скорости", "Живые интерфейсы", "Семантика / A11Y"],
    contactsLabel: "Контакты",
    contactsH1: "Связаться",
    contactsH2: "со мной",
    backBtn: "Главная",
    hint: "Нажмите на бутон для перехода",
    contactLabels: {
      tgChannel: "Telegram канал",
      tgProfile: "Telegram профиль",
      vk: "Профиль ВКонтакте",
      email1: "Основная почта",
      email2: "Резервная почта",
    },
  },
  en: {
    projectsLabel: "Portfolio",
    projectsH1: "Featured",
    projectsH2: "projects",
    siteCta: "Visit",
    aboutLabel: "Manifesto",
    aboutH1: "The mind",
    aboutH2: "behind this",
    quote: '"A creator of digital worlds, breaking every mold"',
    bio1: <>Hi! I'm <span className="font-serif font-bold text-2xl text-olive-green dark:text-cream-peach">Underfined</span>, a developer and digital explorer. My journey in web is driven by the desire to turn raw code into smooth interactive art.</>,
    bio2: "A modern website is a living organism. It has its own gravity, rhythm and breath. Aesthetics should never be sacrificed for speed: every animation must fly even on the most humble devices.",
    skillsAesthetics: "Aesthetics",
    skillsArchitecture: "Architecture",
    skillsPhilosophy: "Philosophy",
    principles: ["Privacy by Design", "Speed optimization", "Living interfaces", "Semantics / A11Y"],
    contactsLabel: "Contacts",
    contactsH1: "Get in",
    contactsH2: "touch",
    backBtn: "Home",
    hint: "Click a blossom to navigate",
    contactLabels: {
      tgChannel: "Telegram channel",
      tgProfile: "Telegram profile",
      vk: "Profile VKontakte",
      email1: "Primary email",
      email2: "Backup email",
    },
  },
};

const skillsData = {
  frontend: ["React / Next.js", "TypeScript", "Framer Motion", "Tailwind CSS v4", "Canvas API"],
  backend: ["Node.js", "Go", "Cloudflare Workers", "REST / WS", "Redis / SQL"],
};


const ProjectsSection = () => {
  const { lang } = useLang();
  const t = i18n[lang];

  return (
    <div className="w-full flex flex-col gap-14 py-2">
      <div className="flex flex-col gap-3">
        <span className="text-sm font-mono font-semibold uppercase tracking-[0.35em] text-juicy-orange">{t.projectsLabel}</span>
        <h2 className="font-serif text-4xl sm:text-6xl md:text-8xl font-light leading-[0.9] text-olive-green dark:text-cream-peach">
          {t.projectsH1}<br />
          <span className="italic text-juicy-orange">{t.projectsH2}</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-10">
        {projectsData.map((project, index) => (
          <motion.div
            key={project.title.en}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.08, duration: 0.5, ease: 'easeOut' }}
            className="group relative border border-olive-green/15 dark:border-olive-green/10 rounded-2xl p-5 sm:p-8 md:p-10 bg-cream-peach/5 dark:bg-dark-bg/30 backdrop-blur-sm hover:border-juicy-orange/30 transition-all duration-500"
          >
            <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-juicy-orange/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>

            <div className="flex flex-col md:flex-row justify-between gap-8">
              <div className="flex-grow">
                <span className="font-serif text-5xl sm:text-7xl md:text-9xl font-light text-juicy-orange/20 dark:text-juicy-orange/15 leading-none select-none absolute top-3 right-4 sm:top-4 sm:right-6 md:right-10 pointer-events-none">
                  {project.num}
                </span>

                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-olive-green dark:text-cream-peach group-hover:text-juicy-orange transition-colors duration-300 relative z-10">
                  {project.title[lang]}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-dark-bg/80 dark:text-cream-peach/70 max-w-xl relative z-10">
                  {project.description[lang]}
                </p>

                <div className="mt-6 flex flex-wrap gap-2 relative z-10">
                  {project.tech.map((tech) => (
                    <span key={tech} className="text-xs px-3 py-1.5 rounded-full border border-olive-green/20 text-olive-green/80 dark:text-cream-peach/60 font-mono bg-olive-green/5 dark:bg-olive-green/5">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex md:flex-col justify-start items-start md:items-end gap-3 shrink-0 relative z-10">
                <a
                  href={`https://${project.site}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 border border-olive-green/25 dark:border-olive-green/15 hover:border-juicy-orange hover:text-juicy-orange rounded-xl text-sm font-semibold transition-all group/btn flex items-center gap-2"
                >
                  {t.siteCta}
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
                {project.telegram && (
                  <a
                    href={`https://t.me/${project.telegram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-olive-green/10 hover:bg-juicy-orange hover:text-cream-peach dark:bg-olive-green/5 dark:hover:bg-juicy-orange dark:hover:text-dark-bg rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M1.946 9.315c-.522-.174-.527-.455.01-.664L21.044 1.5c.647-.236 1.226.148 1.011.824l-6.662 19.33c-.22.65-.63.67-1.15.22l-5.75-4.57-2.73 2.62c-.31.3-.57.3-.85-.14l-1.07-5.06-2.9-1.39zm15.11-6.19-12.86 6.8 3.51 1.7 8.35-7.39c.39-.36.75-.17.46.1l-6.85 6.64-.17 4.3 2.45-2.2 4.19 3.2 5.03-15.15z"/>
                    </svg>
                    Telegram
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};


const AboutSection = () => {
  const { lang } = useLang();
  const t = i18n[lang];

  return (
    <div className="w-full flex flex-col gap-14 py-2">
      <div className="flex flex-col gap-3">
        <span className="text-sm font-mono font-semibold uppercase tracking-[0.35em] text-juicy-orange">{t.aboutLabel}</span>
        <h2 className="font-serif text-4xl sm:text-6xl md:text-8xl font-light leading-[0.9] text-olive-green dark:text-cream-peach">
          {t.aboutH1}<br />
          <span className="italic text-juicy-orange">{t.aboutH2}</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        <motion.div
          className="md:col-span-5 border-l-[3px] border-juicy-orange pl-8 py-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="font-serif text-2xl sm:text-3xl md:text-4xl italic leading-snug text-juicy-orange/85 dark:text-juicy-orange">
            {t.quote}
          </p>
        </motion.div>

        <motion.div
          className="md:col-span-7 flex flex-col gap-5 text-lg leading-relaxed text-dark-bg/80 dark:text-cream-peach/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p>{t.bio1}</p>
          <p>{t.bio2}</p>
        </motion.div>
      </div>

      <div className="border-t border-olive-green/15 dark:border-olive-green/10 pt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {[
          { title: t.skillsAesthetics, items: skillsData.frontend },
          { title: t.skillsArchitecture, items: skillsData.backend },
          { title: t.skillsPhilosophy, items: t.principles, isList: true }
        ].map((block, bi) => (
          <motion.div
            key={block.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.35 + bi * 0.1 }}
            className="flex flex-col gap-5"
          >
            <h4 className="font-serif text-2xl sm:text-3xl font-medium text-olive-green dark:text-cream-peach">{block.title}</h4>
            {block.isList ? (
              <ul className="flex flex-col gap-3 text-sm font-mono text-dark-bg/75 dark:text-cream-peach/65">
                {block.items.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-juicy-orange shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-wrap gap-2.5">
                {block.items.map((skill) => (
                  <span key={skill} className="text-sm px-3 py-2 rounded-lg border border-olive-green/20 text-olive-green dark:text-cream-peach/75 font-mono bg-cream-peach/5 dark:bg-olive-green/5">
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};


const ContactSection = () => {
  const { lang } = useLang();
  const t = i18n[lang];
  const cl = t.contactLabels;

  const contacts = [
    { label: cl.tgChannel, value: "@underfined_channel", href: "https://t.me/underfined_channel", num: "01" },
    { label: cl.tgProfile, value: "@underfined", href: "https://t.me/underfined", num: "02" },
    { label: cl.vk, value: "vk.com/russian2d", href: "https://vk.com/russian2d", num: "03" },
    { label: cl.email1, value: "dev@huesos.pro", href: "mailto:dev@huesos.pro", num: "04" },
    { label: cl.email2, value: "j72043587@gmail.com", href: "mailto:j72043587@gmail.com", num: "05" },
  ];

  return (
    <div className="w-full flex flex-col gap-14 py-2">
      <div className="flex flex-col gap-3">
        <span className="text-sm font-mono font-semibold uppercase tracking-[0.35em] text-juicy-orange">{t.contactsLabel}</span>
        <h2 className="font-serif text-4xl sm:text-6xl md:text-8xl font-light leading-[0.9] text-olive-green dark:text-cream-peach">
          {t.contactsH1}<br />
          <span className="italic text-juicy-orange">{t.contactsH2}</span>
        </h2>
      </div>

      <div className="flex flex-col border-t border-olive-green/15 dark:border-olive-green/10">
        {contacts.map((contact, index) => (
          <motion.a
            key={contact.label}
            href={contact.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-between py-7 md:py-8 border-b border-olive-green/15 dark:border-olive-green/10 hover:border-juicy-orange/30 transition-colors duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 + index * 0.06, duration: 0.4, ease: 'easeOut' }}
          >
            <div className="absolute inset-0 bg-olive-green/[0.03] dark:bg-olive-green/[0.03] scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-300 ease-out pointer-events-none rounded-sm" />

            <div className="flex items-center gap-5 md:gap-10 z-10 pl-2 md:pl-6 transition-transform duration-300 group-hover:translate-x-3">
              <span className="font-mono text-sm text-olive-green/40 dark:text-olive-green/30 group-hover:text-juicy-orange transition-colors w-6">
                {contact.num}
              </span>
              <div className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-[0.2em] text-olive-green/60 dark:text-cream-peach/50 group-hover:text-olive-green dark:group-hover:text-cream-peach/70 transition-colors">
                  {contact.label}
                </span>
                <span className="font-serif text-lg sm:text-2xl md:text-3xl font-medium text-olive-green dark:text-cream-peach group-hover:text-juicy-orange transition-colors duration-300">
                  {contact.value}
                </span>
              </div>
            </div>

            <div className="z-10 pr-2 md:pr-6 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-6 group-hover:translate-x-0">
              <span className="text-juicy-orange text-2xl">→</span>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
};


export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionName | null>(null);
  const [hoveredSection, setHoveredSection] = useState<SectionName | null>(null);
  const { lang } = useLang();
  const t = i18n[lang];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'Проекты': return <ProjectsSection />;
      case 'Обо мне': return <AboutSection />;
      case 'Контакты': return <ContactSection />;
      default: return null;
    }
  };

  const isOpen = !!activeSection;

  return (
    <main className="w-full min-h-[100dvh] flex flex-col items-center justify-center px-4 pt-20 pb-6 sm:pt-24 sm:pb-8 sm:px-6 md:flex-row md:p-12 overflow-x-hidden relative">
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-center gap-6 md:gap-0 relative min-h-[80dvh]">


        <div
          className={[
            "flex flex-col items-center justify-center shrink-0 z-20 w-full",
            "transition-[width,padding,opacity] duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]",
            isOpen
              ? "md:w-[33%] pb-4 md:pb-0 md:pr-12"
              : "md:w-full flex-grow py-4 sm:py-8",
          ].join(" ")}
        >
          <div
            className={[
              "absolute left-0 right-0 md:left-auto md:right-auto md:top-0 md:bottom-0",
              "bottom-0 h-px md:h-full md:w-px bg-olive-green/15 dark:bg-olive-green/10",
              "transition-opacity duration-500",
              isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
            ].join(" ")}
            style={{ left: undefined }}
          />

          <AnimatePresence>
            {isOpen && (
              <motion.button
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                onClick={() => setActiveSection(null)}
                className="mb-3 md:mb-4 px-4 py-1.5 sm:px-5 sm:py-2 text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase border border-olive-green/25 hover:border-juicy-orange rounded-full text-olive-green hover:text-juicy-orange dark:text-cream-peach/80 dark:hover:text-juicy-orange flex items-center gap-2 group transition-colors duration-300"
              >
                <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1.5">←</span> {t.backBtn}
              </motion.button>
            )}
          </AnimatePresence>

          <div
            className={[
              "transition-[width] duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]",
              isOpen
                ? "w-[220px] sm:w-[260px] md:w-[300px]"
                : "w-[340px] sm:w-[420px] md:w-[480px] lg:w-[550px]",
            ].join(" ")}
          >
            <Ikebana
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              hoveredSection={hoveredSection}
              setHoveredSection={setHoveredSection}
              compact={isOpen}
            />
          </div>

          <AnimatePresence>
            {!isOpen && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-3 sm:mt-4 text-[10px] sm:text-[11px] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-olive-green/50 dark:text-cream-peach/40 font-mono text-center px-4"
              >
                {t.hint}
              </motion.p>
            )}
          </AnimatePresence>
        </div>


        <div
          className={[
            "w-full md:w-[67%] flex flex-col justify-start md:pl-12",
            "transition-opacity duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]",
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none h-0 md:h-auto overflow-hidden",
          ].join(" ")}
        >
          <AnimatePresence mode="wait">
            {activeSection && (
              <motion.div
                key={activeSection}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: 0.15 }}
                className="w-full md:max-h-[88vh] md:overflow-y-auto pr-0 md:pr-8 pb-8"
              >
                {renderActiveSection()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
