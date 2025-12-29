"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Code,
  Smartphone,
  Globe,
  Database,
  Cloud,
  Shield,
  Zap,
  UsersRound,
  Star,
} from "lucide-react";
import { motion } from "framer-motion";
import FloatingStars from "../layout/FloatingCircles";
import GradientOverlay from "../layout/GradientOverlay";
import { Button } from "./button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";


// Hero Cards
const cards = [
  { id: 1, label: "توسعه وب", icon: <Code size={22} /> },
  { id: 2, label: "اپلیکیشن موبایل", icon: <Smartphone size={22} /> },
  { id: 3, label: "UI/UX طراحی", icon: <Globe size={22} /> },
  { id: 4, label: "پایگاه داده", icon: <Database size={22} /> },
  { id: 5, label: "خدمات ابری", icon: <Cloud size={22} /> },
  { id: 6, label: "امنیت سایبری", icon: <Shield size={22} /> },
];

// Services Section
const services = [
  {
    id: 1,
    title: "توسعه وب",
    desc: "ارائه خدمات حرفه‌ای توسعه وب با استفاده از بهترین ابزارها و تکنیک‌های روز دنیا",
    icon: <Code className="" size={30} />,
  },
  {
    id: 2,
    title: "اپلیکیشن موبایل",
    desc: "ارائه خدمات حرفه‌ای اپلیکیشن موبایل با استفاده از بهترین ابزارها و تکنیک‌های روز دنیا",
    icon: <Smartphone size={30} />,
  },
  {
    id: 3,
    title: "UI/UX طراحی",
    desc: "ارائه خدمات UI/UX با استفاده از بهترین ابزارها و متدهای طراحی",
    icon: <Globe size={30} />,
  },
  {
    id: 4,
    title: "پایگاه داده",
    desc: "طراحی و پیاده‌سازی پایگاه داده‌های امن و مقیاس‌پذیر",
    icon: <Database size={30} />,
  },
  {
    id: 5,
    title: "خدمات ابری",
    desc: "راهکارهای ابری برای استقرار، مقیاس و امنیت نرم‌افزار شما",
    icon: <Cloud size={30} />,
  },
  {
    id: 6,
    title: "امنیت سایبری",
    desc: "محافظت از سیستم‌های شما با راهکارهای امنیتی مدرن",
    icon: <Shield size={30} />,
  },
];

// featrue Section
const featrue = [
  {
    id: 1,
    title: "سرعت بالا",
    desc: "توسعه سریع و کارآمد پروژه‌ها",
    icon: <Zap size={45} />,
  },
  {
    id: 2,
    title: "تیم حرفه‌ای",
    desc: "متخصصین با تجربه و خبره",
    icon: <UsersRound size={45} />,
  },
  {
    id: 3,
    title: "رشد مستمر",
    desc: "به‌روزترین تکنولوژی‌ها",
    icon: <Globe size={45} />,
  },
  {
    id: 4,
    title: "کیفیت برتر",
    desc: "استانداردهای جهانی",
    icon: <Database size={45} />,
  },
];


const testimonials = [
  {
    name: "علی رضایی",
    role: "CEO – Fintech Startup",
    text: "سرعت و کیفیت تحویل این تیم واقعاً در سطح شرکت‌های بین‌المللی بود.",
  },
  {
    name: "مریم احمدی",
    role: "Product Manager",
    text: "طراحی UI/UX دقیقاً مطابق نیاز بازار و بسیار کاربرپسند بود.",
  },
  {
    name: "محمد نادری",
    role: "CTO – SaaS",
    text: "کدی که تحویل گرفتیم تمیز، تست‌پذیر و کاملاً scalable بود.",
  },
  {
    name: "سارا کاظمی",
    role: "Startup Founder",
    text: "بعد از لانچ محصول، نرخ تبدیل ما به‌طور چشمگیری افزایش پیدا کرد.",
  },
  {
    name: "رضا شریفی",
    role: "Tech Lead",
    text: "بهترین تجربه همکاری فنی که تا امروز داشتم.",
  },
  {
    name: "نگار حیدری",
    role: "UX Designer",
    text: "توجه به جزئیات در طراحی، واقعاً سطح کار را بالا برد.",
  },
];

export default function LandingPage() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const i = setInterval(() => setActive((v) => (v + 1) % cards.length), 2500);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      <FloatingStars />
      <GradientOverlay />

      {/* HERO SECTION */}
      <div className="relative z-10 flex min-h-screen items-center">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-6 md:grid-cols-2">
          {/* LEFT HERO */}
          <div className="flex flex-col gap-8">
            <div className="w-fit rounded-full gradient-bg-glasses px-4 py-2 backdrop-blur-xl">
              <span className="text-sm font-semibold tracking-wide text-white">
                پیشرو در توسعه نرم‌ افزار
              </span>
            </div>

            <div>
              <h1 className="text-4xl font-extrabold md:text-5xl">
                تحول دیجیتال با
              </h1>
              <h2 className="text-5xl md:text-6xl font-extrabold gradient-text">
                تکنولوژی نوین
              </h2>
            </div>

            <p className="max-w-xl text-base text-primary-200">
              ما راهکارهای نرم‌افزاری حرفه‌ای و مقیاس‌پذیر برای کسب‌وکارهای مدرن
              ارائه می‌دهیم. از ایده تا اجرا، در کنار شما هستیم.
            </p>

            <div className="flex gap-4 pt-4">
              <Button
                className="rounded-xl px-6 py-3 font-semibold btn"
                icon={<ArrowLeft size={20} />}
              >
                شروع کنید
              </Button>
              <Button className="rounded-xl border border-primary-400 px-6 py-3 font-semibold text-primary-200 hover:bg-white/5">
                بیشتر بدانید
              </Button>
            </div>
          </div>

          {/* RIGHT HERO CARDS */}
          <div className="hidden md:grid grid-cols-2 gap-4">
            {cards.map((card, idx) => {
              const isHot = idx === active;
              return (
                <motion.div
                  key={card.id}
                  animate={
                    isHot ? { scale: 1.08, rotate: 2 } : { scale: 1, rotate: 0 }
                  }
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className={`relative flex items-center gap-3 p-4 rounded-xl border backdrop-blur-xl cursor-pointer transition-all
                    ${
                      isHot
                        ? "gradient-bg-glasses border-[rgba(0,255,200,0.6)] text-white shadow-[0_0_40px_rgba(0,255,200,0.25)]"
                        : "bg-primary-800 border-white/10 text-primary-100"
                    }`}
                >
                  <span className="p-2 rounded-full transition-colors gradient-bg text-white">
                    {card.icon}
                  </span>
                  <span className="font-semibold">{card.label}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* SERVICES SECTION */}
      <section className="relative z-10 flex mb-32">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h3 className="text-4xl font-extrabold mb-3">خدمات ما</h3>
          <p className="text-primary-300 max-w-2xl mx-auto mb-16">
            ارائه کامل‌ترین خدمات توسعه نرم‌افزار با بهره‌گیری از جدیدترین
            تکنولوژی‌ها
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:grid-cols-3">
            {services.map((s) => (
              <motion.div
                key={s.id}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-start gap-2 p-4 rounded-xl cursor-pointer transition-all border border-white/10 bg-primary-700/50 "
              >
                {/* Icon with global gradient class */}
                <div
                  className={`w-16 h-16 mb-2 text-white rounded-lg flex items-center justify-center icon-gradient-${s.id}`}
                >
                  {s.icon}
                </div>

                <h4 className="text-xl font-bold">{s.title}</h4>
                <p className="text-primary-200 flex text-start">{s.desc}</p>
                <span className="text-sm flex gap-1 justify-center items-center text-blue-400 mt-2 cursor-pointer">
                  اطلاعات بیشتر
                  <span>
                    <ArrowLeft size={18} />
                  </span>
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <div className="relative z-10 flex my-10">
        <div className="w-full mx-auto max-w-7xl px-6">
          <h3 className="text-4xl font-extrabold mb-3 w-full text-center">
            چرا ما را انتخاب کنید؟
          </h3>
          <p className="text-primary-300 max-w-2xl mx-auto mb-16 w-full text-center">
            مزایای همکاری با تیم متخصص و حرفه‌ای ما
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:grid-cols-4">
            {featrue.map((s) => (
              <motion.div
                key={s.id}
                className="flex flex-col items-center gap-2 px-4 py-2 rounded-xl transition-all"
              >
                {/* Icon with global gradient class */}
                <div
                  className={`w-20 h-20 mb-2 text-white rounded-lg flex items-center justify-center icon-glasses`}
                >
                  {s.icon}
                </div>

                <div className="flex flex-col items-center justify-center mt-2 gap-2">
                  <h4 className="text-xl font-bold">{s.title}</h4>
                  <p className="text-primary-200 flex text-center">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* comment client */}
      <section className="relative z-10 py-32">
        <div className="mx-auto max-w-7xl px-6">
          <h3 className="text-4xl font-extrabold mb-3 text-center">
            نظر مشتریان ما
          </h3>
          <p className="text-primary-300 max-w-2xl mx-auto mb-16 text-center">
            تجربه همکاری با تیم ما از نگاه کسانی که واقعاً از خدمات ما استفاده
            کرده‌اند
          </p>

          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            loop
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i} className="pb-8">
                <div className="h-full">
                  <div className="flex flex-col h-full rounded-2xl bg-primary-700/50 border border-white/10 p-8 shadow-xl">
                    {/* header */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 shrink-0 rounded-full bg-gradient-to-br from-indigo-500/40 to-purple-500/40 flex items-center justify-center text-lg font-bold">
                        {t.name.charAt(0)}
                      </div>

                      <div>
                        <p className="font-semibold">{t.name}</p>
                        <p className="text-sm">{t.role}</p>
                      </div>
                    </div>

                    {/* stars */}
                    <div className="flex gap-1 text-yellow-400 mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>

                    {/* text */}
                    <p className="leading-relaxed flex-1">
                      “{t.text}”
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
  );
}
