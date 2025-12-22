// src/components/layout/footer.tsx
import {
  Code,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";

const footerLinks = [
  {
    title: "خدمات",
    links: [
      { label: "توسعه وب پیشرفته", href: "/services/web" },
      { label: "اپلیکیشن موبایل", href: "/services/mobile" },
      { label: "طراحی UI/UX", href: "/services/design" },
      { label: "مشاوره فنی و معماری", href: "/services/consulting" },
    ],
  },
  {
    title: "شرکت",
    links: [
      { label: "درباره ما", href: "/about" },
      { label: "تیم متخصص", href: "/team" },
      { label: "فرصت‌های شغلی", href: "/careers" },
      { label: "بلاگ و اخبار", href: "/blog" },
    ],
  },
  {
    title: "پشتیبانی",
    links: [
      { label: "مستندات", href: "/docs" },
      { label: "راهنمای استفاده", href: "/help" },
      { label: "سوالات متداول", href: "/faq" },
      { label: "گزارش مشکل", href: "/support" },
    ],
  },
  {
    title: "تماس با ما",
    items: [
      {
        icon: MapPin,
        text: "تهران، خیابان ولیعصر، پلاک ۱۲۳۴",
        href: "https://maps.google.com/...",
      },
      { icon: Phone, text: "۰۲۱-۱۲۳۴۵۶۷۸", href: "tel:02112345678" },
      {
        icon: Mail,
        text: "info@salargholami021.com",
        href: "mailto:info@salargholami021.com",
      },
    ],
  },
];

const socialLinks = [
  { icon: Github, href: "https://github.com/yourcompany", label: "گیت‌هاب" },
  {
    icon: Linkedin,
    href: "https://linkedin.com/company/yourcompany",
    label: "لینکدین",
  },
  { icon: Twitter, href: "https://twitter.com/yourcompany", label: "توییتر" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* بخش برند و توضیحات */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="gradient-bg p-2 rounded-xl">
                <Code className="w-8 h-8 text-white" />
              </div>
              <span className="flex flex-col justify-center gap-2">
                <span className="text-2xl font-bold">تیم نما</span>
                <span className="text-primary-400 text-sm">
                  {" "}
                  سامانه مدیریت یکپارچه
                </span>
              </span>
            </div>

            <p className="text-primary-300 leading-7 max-w-md">
              پلتفرمی قدرتمند و امن برای مدیریت سازمانی، کنترل دسترسی‌ها،
              داشبوردهای هوشمند و گزارش‌گیری پیشرفته با تمرکز بر تجربه کاربری
              فارسی‌زبان.
            </p>

            {/* شبکه‌های اجتماعی */}
            <div className="flex gap-4 mt-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-muted-foreground hover:text-primary transition-colors p-2 bg-muted/50 rounded-lg hover:bg-muted transition-all"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* لینک‌های فوتر */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {footerLinks.map((section) => (
              <div key={section.title} className="flex flex-col gap-4">
                <h3 className="font-semibold text-xl">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links
                    ? section.links.map((link) => (
                        <li key={link.label}>
                          <a
                            href={link.href}
                            className="text-primary-300 text-sm leading-relaxed"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))
                    : section.items?.map((item) => (
                        <li
                          key={item.text}
                          className="flex items-center gap-3 text-sm"
                        >
                          <item.icon className="w-4 h-4 text-muted-foreground" />
                          <a
                            href={item.href}
                            className="text-muted-foreground hover:text-primary transition-colors"
                          >
                            {item.text}
                          </a>
                        </li>
                      ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
