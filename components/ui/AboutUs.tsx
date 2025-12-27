"use client";

import {
  Eye,
  Globe,
  Heart,
  Target,
  TrendingUp,
  UsersRound,
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

const stats = [
  { label: "پروژه تکمیل شده", value: 500, suffix: "+" },
  { label: "سال تجربه", value: 10, suffix: "+" },
  { label: "تیم متخصص", value: 50, suffix: "+" },
  { label: "مشتری راضی", value: 300, suffix: "+" },
];

const features = [
  {
    title: "ماموریت ما",
    description: `ماموریت ما ارائه راهکارهای نرم‌افزاری با کیفیت بالا و قابل اعتماد است که به کسب‌وکارها کمک می‌کند تا در عصر دیجیتال رشد کنند و به اهداف خود دست یابند. ما معتقدیم که تکنولوژی باید در خدمت بهبود زندگی و کسب‌وکار باشد.`,
    icon: Target,
  },
  {
    title: "چشم‌انداز ما",
    description: `چشم‌انداز ما تبدیل شدن به پیشروترین شرکت توسعه نرم‌افزار در منطقه است که با نوآوری، خلاقیت و تعهد به کیفیت، الگویی برای دیگران باشد و در تحول دیجیتال کسب‌وکارها نقش کلیدی ایفا کند.`,
    icon: Eye,
  },
];

const services = [
  {
    id: 1,
    title: "تمرکز بر کیفیت",
    desc: "ما همیشه کیفیت را بر کمیت ترجیح می‌دهیم و بهترین راهکارها را ارائه می‌کنیم",
    icon: <Target size={30} />,
  },
  {
    id: 2,
    title: "تیم حرفه‌ای",
    desc: "تیمی متشکل از بهترین متخصصان با سال‌ها تجربه در صنعت فناوری",
    icon: <UsersRound size={30} />,
  },
  {
    id: 3,
    title: "نوآوری مداوم",
    desc: "همواره در جستجوی راهکارهای نوین و به‌روز برای حل مسائل پیچیده",
    icon: <TrendingUp size={30} />,
  },
  {
    id: 6,
    title: "رضایت مشتری",
    desc: "رضایت و موفقیت مشتریان ما، مهم‌ترین اولویت و هدف ماست",
    icon: <Heart size={30} />,
  },
];

type TeamMember = {
  name: string;
  role: string;
  description?: string;
  image: string;
};

const team: TeamMember[] = [
  {
    name: "علی احمدی",
    role: "مدیر عامل و بنیان‌گذار",
    description: "15 سال تجربه در مدیریت پروژه‌های نرم‌افزاری",
    image: "/images/team/modiri.jpg",
  },
  {
    name: "سارا محمدی",
    role: "مدیر فناوری",
    description: "متخصص معماری نرم‌افزار و سیستم‌های مقیاس‌پذیر",
    image: "/images/team/1.jpg",
  },
  {
    name: "رضا کریمی",
    role: "مدیر طراحی",
    description: "با تجربه کار در شرکت‌های UI/UX بین‌المللی",
    image: "/images/team/milad-KeyMaram.jpg",
  },
  {
    name: "مینا رضایی",
    role: "مدیر توسعه",
    description: "کارشناس ارشد توسعه وب و موبایل",
    image: "/images/team/2.jpg",
  },
];

export default function AboutUs() {
  const [counts, setCounts] = useState<number[]>(stats.map(() => 0));
  const [ref, inView] = useInView({}); // triggerOnce حذف شد

  useEffect(() => {
    if (inView) {
      setCounts(stats.map(() => 0));
      stats.forEach((stat, index) => {
        let start = 0;
        const duration = 2000;
        const increment = stat.value / (duration / 50);

        const interval = setInterval(() => {
          start += increment;
          if (start >= stat.value) {
            start = stat.value;
            clearInterval(interval);
          }
          setCounts((prev) => {
            const newCounts = [...prev];
            newCounts[index] = Math.floor(start);
            return newCounts;
          });
        }, 50);
      });
    }
  }, [inView]);

  return (
    <section className="py-20 max-w-7xl mx-auto">
      <div className="flex flex-col justify-center items-center gap-10">
        <div className="flex justify-center items-center flex-col gap-5">
          <Globe
            size={70}
            className="text-white p-2 rounded-full gradient-bg"
          />
          <div className="flex flex-col justify-center items-center gap-2 text-center max-w-2xl">
            <h1 className="text-4xl font-extrabold">درباره تیم نما</h1>
            <span className="text-primary-300/90">
              ما یک تیم پرشور و متعهد هستیم که با استفاده از جدیدترین
              تکنولوژی‌ها، راهکارهای نرم‌افزاری نوآورانه و کارآمد برای
              کسب‌وکارها ارائه می‌دهیم
            </span>
          </div>
        </div>

        {/* شمارنده‌ها */}
        <div
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center w-full max-w-4xl"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.3 }}
              viewport={{ once: false }}
              className="text-2xl font-bold"
            >
              <span className="gradient-text text-3xl">
                {counts[index]}
                {stat.suffix}
              </span>
              <p className="text-primary-300/90 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* ویژگی‌ها */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ margin: "-80px", once: false }}
          className="flex flex-col md:flex-row justify-center gap-6 w-full py-10"
        >
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{
                  opacity: 0,
                  x: idx % 2 === 0 ? -120 : 120,
                  filter: "blur(10px)",
                  scale: 0.9,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  filter: "blur(0px)",
                  scale: 1,
                }}
                transition={{
                  duration: 0.8,
                  delay: idx * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                viewport={{ once: false }}
                whileHover={{
                  y: -6,
                  scale: 1.02,
                }}
                className="relative flex-1 p-6 flex flex-col gap-4 rounded-xl border border-white/10 bg-primary-700/40 backdrop-blur-xl shadow-xl"
              >
                <Icon
                  size={60}
                  className="text-white p-1.5 rounded-md gradient-bg"
                />
                <h2 className="text-3xl font-bold">{feature.title}</h2>
                <p className="text-primary-300 leading-relaxed">
                  {feature.description}
                </p>
                <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* سرویس‌ها */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ margin: "-100px", once: false }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } },
          }}
          className="relative z-10 flex py-10"
        >
          <div className="mx-auto max-w-7xl px-4 text-center">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false }}
              className="text-4xl font-extrabold mb-3"
            >
              ارزش‌های ما
            </motion.h3>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: false }}
              className="text-primary-300/90 max-w-2xl mx-auto mb-10"
            >
              اصولی که همواره در مسیر کاری ما راهنمای ما بوده‌اند
            </motion.p>

            <motion.div
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.15 } },
              }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {services.map((s, i) => (
                <motion.div
                  key={s.id}
                  variants={{
                    hidden: { opacity: 0, y: 40, scale: 0.95 },
                    show: { opacity: 1, y: 0, scale: 1 },
                  }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.05,
                    ease: "easeOut",
                  }}
                  whileHover={{ y: -6, scale: 1.04 }}
                  className="flex flex-col items-start gap-2 p-4 rounded-xl cursor-pointer border border-white/10 bg-primary-700/50 backdrop-blur-xl shadow-xl"
                >
                  <div
                    className={`w-16 h-16 mb-2 rounded-lg flex items-center justify-center icon-gradient-${s.id}`}
                  >
                    {s.icon}
                  </div>
                  <h4 className="text-xl font-bold">{s.title}</h4>
                  <p className="text-primary-300/90 text-start leading-relaxed">
                    {s.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* تیم ما */}
        <div className="relative z-10 w-full py-10">
          <div className="mx-auto max-w-7xl px-6 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: false }}
              className="text-4xl font-extrabold text-primary-200 mb-4"
            >
              تیم ما
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: false }}
              className="text-gray-400 mb-16"
            >
              افرادی که تک‌کمپانی را می‌سازند
            </motion.p>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: false }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.15 } },
              }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
            >
              {team.map((member) => (
                <motion.article
                  key={member.name}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    show: { opacity: 1, y: 0 },
                  }}
                  whileHover="hover"
                  className="group relative overflow-hidden rounded-2xl bg-primary-900 border border-white/5 shadow-xl"
                >
                  <div className="relative h-60 w-full overflow-hidden">
                    <motion.div
                      variants={{ hover: { scale: 1.08 } }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </motion.div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      variants={{ hover: { opacity: 1, y: 0 } }}
                      className="absolute inset-0 flex items-end p-6"
                    >
                      <p className="text-sm text-gray-200 leading-relaxed">
                        {member.description}
                      </p>
                    </motion.div>
                  </div>

                  <div className="relative z-10 px-5 py-4 bg-primary-800/80 backdrop-blur">
                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    <p className="gradient-text">{member.role}</p>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
