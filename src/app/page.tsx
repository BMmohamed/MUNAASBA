'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Smartphone,
  CalendarCheck,
  MapPin,
  Clock,
  HeartHandshake,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  ChevronLeft
} from 'lucide-react';
import { BismillahCalligraphy, MashrabiyaWatermark, AmbientParticles } from '@/components/common/CalligraphyDecorations';

export default function HomePage() {
  const templates = [
    {
      id: 'template-1',
      title: 'باب الفرح / الأقواس الكلاسيكية',
      subtitle: 'Bab Al-Farah / Classic Arch',
      slug: 'demo-bab',
      badge: 'الأكثر طلباً',
      color: 'from-emerald-950 via-emerald-900 to-[#041a14]',
      accent: 'border-amber-500/50 text-amber-300',
      tag: 'أقواس إسلامية • زخارف أندلسية • ذهب كلاسيكي',
      desc: 'مستوحى من عراقة الأقواس الشرقية والزخارف الذهبية الملكية، بانتقال انسيابي مباشر لواجهة العريس والعروس الفاخرة.',
    },
    {
      id: 'template-2',
      title: 'المودرن البسيط',
      subtitle: 'Modern Minimalist',
      slug: 'modern-minimalist',
      badge: 'عصري هادئ',
      color: 'from-stone-900 via-stone-800 to-neutral-900',
      accent: 'border-stone-400/40 text-stone-200',
      tag: 'خلفية عاجية • خطوط تحريرية ناعمة • إطار ذهبي دقيق',
      desc: 'بساطة فاخرة تركز على أناقة الأسماء وتناغم الخطوط العربية الراقية في بيئة هادئة ومريحة للعين.',
    },
    {
      id: 'template-3',
      title: 'الورود الملكية',
      subtitle: 'Royal Floral',
      slug: 'royal-floral',
      badge: 'رومانسي حالم',
      color: 'from-rose-950 via-pink-950 to-neutral-950',
      accent: 'border-rose-400/40 text-rose-300',
      tag: 'ألوان الباستيل • إكليل الزهور • بتلات متحركة',
      desc: 'طابع زهري شاعري بألوان الباستيل والورود المائية الناعمة مع حركة بتلات متطايرة تحاكي أرقى لحظات الفرح.',
    },
    {
      id: 'template-4',
      title: 'ليلة العمر / الفخامة الليلية',
      subtitle: 'Midnight Elegance',
      slug: 'midnight-stars',
      badge: 'فخامة ملكية',
      color: 'from-slate-950 via-indigo-950 to-[#060a14]',
      accent: 'border-amber-400/40 text-amber-200',
      tag: 'سواد ليلي عميق • بريق النجوم • ذهب شمبانيا',
      desc: 'أمسية سماوية آسرة تجمع بين الخلفية الليلية المظلمة وتوهج النجوم مع تفاصيل ذهبية معدنية متلألئة.',
    },
    {
      id: 'template-5',
      title: 'التراث الأصيل',
      subtitle: 'Heritage / Traditional',
      slug: 'heritage-andalus',
      badge: 'أصالة وعراقة',
      color: 'from-amber-950 via-amber-900 to-[#1e1008]',
      accent: 'border-amber-600/40 text-amber-300',
      tag: 'نقوش المشربية • درجات التيراكوتا • خط رقعه أصيل',
      desc: 'يستحضر عبق الضيافة العربية ودفء رمال الصحراء وتطريزات السدو والمشربية التقليدية بهوية سعودية عريقة.',
    },
  ];

  return (
    <div className="relative min-h-screen bg-neutral-950 text-neutral-100 font-cairo overflow-hidden selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Background Watermark & Ambient Sparkles */}
      <MashrabiyaWatermark opacity={0.04} color="#d4af37" />
      <AmbientParticles count={18} color="#e5c158" />

      {/* Hero Header Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Hero Section */}
      <header className="relative pt-16 pb-12 px-4 sm:px-6 text-center z-10 max-w-4xl mx-auto">
        
        {/* Emblem Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-tajawal mb-6">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>الجيل الجديد لبطاقات الدعوة الرقمية الفاخرة</span>
        </div>

        {/* Bismillah Calligraphy */}
        <BismillahCalligraphy color="#e5c158" className="w-64 sm:w-72 h-auto mx-auto mb-4" />

        <h1 className="text-3xl sm:text-5xl font-bold font-cairo text-neutral-100 leading-tight">
          دعوات زفاف إلكترونية تفاعلية
          <span className="block mt-2 gold-text-shimmer">
            بأرقى الخطوط العربية والتقنيات الحديثة
          </span>
        </h1>

        <p className="mt-4 text-sm sm:text-base text-neutral-300 font-tajawal max-w-2xl mx-auto leading-relaxed">
          منصة متكاملة لتصميم ومشاركة بطاقات الأفراح والمناسبات الراقية، مزودة بتأكيد الحضور (RSVP) بلمسة واحدة، وحفظ الموعد في تقويم Google و Apple، وتحديد الموقع الجغرافي.
        </p>

        {/* Feature Highlights Pills */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs font-tajawal text-neutral-300">
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-neutral-900/80 border border-neutral-800">
            <HeartHandshake className="w-4 h-4 text-emerald-400" />
            <span>تأكيد حضور بلمسة واحدة ومنع التكرار</span>
          </div>
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-neutral-900/80 border border-neutral-800">
            <CalendarCheck className="w-4 h-4 text-amber-400" />
            <span>إضافة مباشرة لتقويم Apple و Google</span>
          </div>
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-neutral-900/80 border border-neutral-800">
            <MapPin className="w-4 h-4 text-rose-400" />
            <span>ملاحة خرائط Google بنقرة واحدة</span>
          </div>
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-neutral-900/80 border border-neutral-800">
            <Clock className="w-4 h-4 text-blue-400" />
            <span>عداد تنازلي ذكي متوافق مع الهجري</span>
          </div>
        </div>
      </header>

      {/* Templates Showcase Grid */}
      <section className="relative py-12 px-4 sm:px-8 max-w-6xl mx-auto z-10">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold font-cairo text-neutral-100">
            استعرض القوالب الخمسة المتميزة
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-tajawal mt-1">
            اختر أي قالب لمعاينته وتجربة زر الحضور ومزامنة التقويم مباشرة
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((tmpl) => (
            <div
              key={tmpl.id}
              className="group relative rounded-3xl p-6 bg-gradient-to-b border border-neutral-800 hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-1"
            >
              <div>
                {/* Top Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[11px] font-bold px-3 py-1 rounded-full border bg-neutral-950/60 ${tmpl.accent}`}>
                    {tmpl.badge}
                  </span>
                  <span className="text-[11px] text-neutral-500 font-mono">
                    {tmpl.subtitle}
                  </span>
                </div>

                {/* Card Title */}
                <h3 className="text-lg font-bold font-cairo text-neutral-100 group-hover:text-amber-300 transition-colors">
                  {tmpl.title}
                </h3>

                <p className="text-xs text-amber-400/80 font-tajawal mt-1 font-semibold">
                  {tmpl.tag}
                </p>

                <p className="text-xs text-neutral-400 font-tajawal mt-3 leading-relaxed">
                  {tmpl.desc}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between">
                <Link
                  href={`/d/${tmpl.slug}`}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-neutral-950 font-bold text-xs font-cairo flex items-center justify-center gap-1.5 transition-all shadow-md shadow-amber-500/15"
                >
                  <span>معاينة الدعوة التفاعلية</span>
                  <ChevronLeft className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Breakdown Section */}
      <section className="relative py-14 px-4 sm:px-8 max-w-5xl mx-auto z-10 border-t border-neutral-900">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center sm:text-right">
          
          <div className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800/80">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3 mx-auto sm:mr-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-neutral-100 font-cairo">
              تأكيد حضور ذكي (Anti-Spam)
            </h4>
            <p className="text-xs text-neutral-400 font-tajawal mt-1.5 leading-relaxed">
              نقرة واحدة فقط لتأكيد الحضور مع قفل الجهاز (Device Fingerprint + LocalStorage) دون الحاجة لملء استبيانات طويلة أو إدخال أرقام هواتف.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800/80">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3 mx-auto sm:mr-0">
              <Smartphone className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-neutral-100 font-cairo">
              متجاوب 100% للجوال
            </h4>
            <p className="text-xs text-neutral-400 font-tajawal mt-1.5 leading-relaxed">
              مصمم خصيصاً ليمنح الضيوف على الهواتف الذكية تجربة تشبه تطبيقات الآيفون والأندرويد الفاخرة، مع إطار أنيق لمعاينة الحاسوب.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800/80">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-3 mx-auto sm:mr-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-neutral-100 font-cairo">
              جاهز للربط والنشر
            </h4>
            <p className="text-xs text-neutral-400 font-tajawal mt-1.5 leading-relaxed">
              هيكلية كود نظيفة قابلة للربط المباشر مع قواعد بيانات Supabase أو SQLite أو النشر بضغطة زر على منصة Vercel عبر GitHub.
            </p>
          </div>

        </div>
      </section>

      {/* Discreet Public Footer (No admin links exposed) */}
      <footer className="relative py-8 px-4 text-center border-t border-neutral-900 text-neutral-500 text-xs font-tajawal z-10">
        <p>
          منصة مناسبة • بطاقات ودعوات زفاف إلكترونية تفاعلية فاخرة
        </p>
        <p className="text-[11px] text-neutral-600 mt-1">
          جميع الحقوق محفوظة © ٢٠٢٦
        </p>
      </footer>

    </div>
  );
}
