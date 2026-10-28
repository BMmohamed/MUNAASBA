'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Smartphone,
  CalendarCheck,
  MapPin,
  Clock,
  HeartHandshake,
  CheckCircle2,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Eye,
  ExternalLink,
  Layers,
  Crown,
  Plus,
  Heart,
  Music,
  CameraOff,
} from 'lucide-react';
import { BismillahCalligraphy, MashrabiyaWatermark, AmbientParticles } from '@/components/common/CalligraphyDecorations';
import { InvitationData } from '@/types/invitation';

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [publicInvitations, setPublicInvitations] = useState<InvitationData[]>([]);

  useEffect(() => {
    async function loadPublicInvitations() {
      try {
        const res = await fetch('/api/invitations');
        const data = await res.json();
        if (data.invitations) {
          const filtered = data.invitations.filter((inv: InvitationData) => inv.isPublic !== false);
          setPublicInvitations(filtered);
        }
      } catch (e) {
        console.error('Error fetching public invitations:', e);
      }
    }
    loadPublicInvitations();
  }, []);

  const templates = [
    {
      id: 'template-1',
      title: 'باب الفرح / الأقواس الكلاسيكية',
      subtitle: 'Bab Al-Farah / Classic Arch',
      slug: 'demo-bab',
      badge: 'الأكثر طلباً',
      thumbnail: '/images/thumbnails/thumb_classic_arch.jpg',
      color: 'from-emerald-900 via-emerald-950 to-neutral-900',
      accentBorder: 'border-amber-400/50',
      accentText: 'text-amber-800',
      tag: 'أقواس إسلامية • زخارف أندلسية • ذهب كلاسيكي',
      desc: 'مستوحى من عراقة الأقواس الشرقية والزخارف الذهبية الملكية، بانتقال انسيابي مباشر لواجهة العريس والعروس الفاخرة.',
      coupleNames: 'أحمد بن خالد & ريم بنت منصور',
      eventTitle: 'حفل الزفاف المبارك',
      venue: 'قصر الثريا للاحتفالات - الرياض',
      themeStyle: 'emerald-gold',
    },
    {
      id: 'template-2',
      title: 'المودرن البسيط والشمبانيا',
      subtitle: 'Modern Minimalist',
      slug: 'modern-minimalist',
      badge: 'عصري ناعم',
      thumbnail: '/images/thumbnails/thumb_modern_minimal.jpg',
      color: 'from-stone-800 via-stone-900 to-neutral-900',
      accentBorder: 'border-stone-400/50',
      accentText: 'text-stone-700',
      tag: 'خلفية عاجية • خطوط تحريرية ناعمة • إطار ذهبي دقيق',
      desc: 'بساطة فاخرة تركز على أناقة الأسماء وتناغم الخطوط العربية الراقية في بيئة هادئة ومريحة للعين وبطاقة عاجية دافئة.',
      coupleNames: 'زياد الحربي & سارة الشريف',
      eventTitle: 'عقد قران وزفاف مبارك',
      venue: 'فندق فورسيزونز قاعة المملكة - الرياض',
      themeStyle: 'minimal-champagne',
    },
    {
      id: 'template-3',
      title: 'الورود الملكية والباستيل',
      subtitle: 'Royal Floral',
      slug: 'royal-floral',
      badge: 'رومانسي حالم',
      thumbnail: '/images/thumbnails/thumb_royal_floral.jpg',
      color: 'from-rose-900 via-rose-950 to-neutral-900',
      accentBorder: 'border-rose-400/50',
      accentText: 'text-rose-800',
      tag: 'ألوان الباستيل • إكليل الزهور • بتلات متحركة',
      desc: 'طابع زهري شاعري بألوان الباستيل والورود المائية الناعمة مع حركة بتلات متطايرة تحاكي أرقى لحظات الفرح.',
      coupleNames: 'طارق بن ناصر & لمى بنت فهد',
      eventTitle: 'أمسية الفرح والبهجة',
      venue: 'منتجع الريتز كارلتون - جدة',
      themeStyle: 'royal-floral',
    },
    {
      id: 'template-4',
      title: 'ليلة العمر / الفخامة الليلية',
      subtitle: 'Midnight Elegance',
      slug: 'midnight-stars',
      badge: 'فخامة ملكية',
      thumbnail: '/images/thumbnails/thumb_midnight_stars.svg',
      color: 'from-slate-900 via-[#0a0f1d] to-[#04060c]',
      accentBorder: 'border-amber-400/50',
      accentText: 'text-amber-800',
      tag: 'سواد ليلي عميق • بريق النجوم • ذهب شمبانيا',
      desc: 'أمسية سماوية آسرة تجمع بين الخلفية الليلية المظلمة وتوهج النجوم مع تفاصيل ذهبية معدنية متلألئة.',
      coupleNames: 'فيصل بن بدر & نورة بنت سلطان',
      eventTitle: 'أمسية الزفاف الملكية',
      venue: 'فندق الفيصلية ماندرين أورينتال - الرياض',
      themeStyle: 'midnight-gold',
    },
    {
      id: 'template-5',
      title: 'التراث الأصيل والمشربية',
      subtitle: 'Heritage / Traditional',
      slug: 'heritage-andalus',
      badge: 'أصالة وعراقة',
      thumbnail: '/images/thumbnails/thumb_heritage.svg',
      color: 'from-amber-900 via-[#231208] to-neutral-900',
      accentBorder: 'border-amber-600/50',
      accentText: 'text-amber-900',
      tag: 'نقوش المشربية • درجات التيراكوتا • خط رقعة أصيل',
      desc: 'يستحضر عبق الضيافة العربية ودفء رمال الصحراء وتطريزات السدو والمشربية التقليدية بهوية سعودية عريقة.',
      coupleNames: 'ماجد بن تركي & هيا بنت عبدالله',
      eventTitle: 'حفل الزواج التراثي الأصيل',
      venue: 'قصر الدرعية التراثي - حي البجيري',
      themeStyle: 'heritage-warm',
    },
    {
      id: 'template-6',
      title: 'خاتم المحبس والرباط الذهبي',
      subtitle: 'Golden Wedding Rings',
      slug: 'golden-rings',
      badge: 'تصميم غير تقليدي',
      thumbnail: '/images/thumbnails/thumb_golden_rings.jpg',
      color: 'from-[#2a1b0d] via-[#150d06] to-neutral-900',
      accentBorder: 'border-amber-400/60',
      accentText: 'text-amber-800',
      tag: 'محبسان ذهبيان متداخلان • انحناء كبسولي مفرغ • بريق ألماسي',
      desc: 'قالب غير تقليدي كلياً متحرر من الصناديق والمربعات، يعتمد على أيقونة محبسين متشابكين مع بريق ماسي وانحناءات كبسولية فخمة وموسيقى بيانو ناعمة.',
      coupleNames: 'عبدالرحمن بن سعود & رزان بنت فهد',
      eventTitle: 'حفل الزفاف والرباط المبارك',
      venue: 'قصر الفرسان للاحتفالات والمؤتمرات - الرياض',
      themeStyle: 'golden-rings',
    },
    {
      id: 'template-7',
      title: 'شلال الورود وأمطار البتلات',
      subtitle: 'Floral Cascade & Petals Rain',
      slug: 'floral-cascade',
      badge: 'تأثير أمطار البتلات',
      thumbnail: '/images/thumbnails/thumb_yasmin.jpg',
      color: 'from-[#3a1524] via-[#1a080f] to-neutral-900',
      accentBorder: 'border-rose-400/60',
      accentText: 'text-rose-800',
      tag: 'أمطار بتلات متساقطة على الشاشة • إكليل زهور عضوي • تموجات وردية',
      desc: 'تجربة حية تنهمر فيها بتلات الورد المتطايرة على الشاشة بانسيابية شلالية، مع إكليل زهور نباتي دائري وإطار مموج وموسيقى بيانو رومانسية هادئة.',
      coupleNames: 'سعود بن عبدالعزيز & ديمة بنت منصور',
      eventTitle: 'ليلة الياسمين وشلال الفرح',
      venue: 'منتجع بارك حياة - قاعة الصحبة - جدة',
      themeStyle: 'floral-cascade',
    },
    {
      id: 'template-8',
      title: 'الميدالية الملكية والتاج الباروكي',
      subtitle: 'Royal Baroque Medallion',
      slug: 'baroque-medallion',
      badge: 'طابع باروكي ملكي',
      thumbnail: '/images/thumbnails/thumb_baroque_reverie.jpg',
      color: 'from-[#251838] via-[#090412] to-neutral-900',
      accentBorder: 'border-purple-400/50',
      accentText: 'text-amber-800',
      tag: 'إطار بيضاوي مذهب • تاج ملكي أرستقراطي • نقوش مفرغة نبيلة',
      desc: 'تصميم ملكي مستوحى من الميداليات الأرستقراطية الكلاسيكية بإطار بيضاوي مقوّس وزخارف فيليغري ذهبية مذهلة يتوسطها تاج الفرح.',
      coupleNames: 'بدر بن خالد & سارة بنت فيصل',
      eventTitle: 'المراسم الملكية لعقد القران',
      venue: 'فندق الفيصلية - قاعة أمسيات الكبرى - الرياض',
      themeStyle: 'baroque-medallion',
    },
  ];

  const currentTmpl = templates[activeSlide];

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % templates.length);
  };

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + templates.length) % templates.length);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#faf6f0] via-[#fcfaf7] to-[#f5f0e6] text-stone-800 font-cairo overflow-hidden selection:bg-amber-200 selection:text-amber-900">
      
      {/* Background Watermark & Ambient Warmth */}
      <MashrabiyaWatermark opacity={0.03} color="#b89028" />
      <AmbientParticles count={16} color="#d4af37" />

      {/* Romantic Ambient Halos */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-amber-200/35 via-rose-100/25 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[600px] right-[-100px] w-[500px] h-[500px] bg-amber-100/30 rounded-full blur-[130px] pointer-events-none" />

      {/* Hero Header Section */}
      <header className="relative pt-14 pb-12 px-4 sm:px-6 text-center z-10 max-w-4xl mx-auto">
        
        {/* Soft Romantic Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 border border-amber-200/70 text-amber-900 text-xs font-tajawal mb-6 shadow-sm backdrop-blur-sm">
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/20" />
          <span>منصة مناسبة • بطاقات ودعوات زفاف إلكترونية تفاعلية</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        </div>

        {/* Bismillah Calligraphy */}
        <BismillahCalligraphy color="#b88a24" className="w-64 sm:w-72 h-auto mx-auto mb-5" />

        <h1 className="text-3xl sm:text-5xl font-extrabold font-cairo text-stone-900 leading-tight">
          دعوات زفاف إلكترونية مفعمة
          <span className="block mt-2 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 bg-clip-text text-transparent">
            بالحنان والبهجة والرقي الملكي
          </span>
        </h1>

        <p className="mt-4 text-sm sm:text-base text-stone-600 font-tajawal max-w-2xl mx-auto leading-relaxed">
          نصنع تجربة استثنائية لضيوفكم مع بطاقات دعوة تفاعلية ناعمة خالية من التعقيد، مدعومة بتأكيد الحضور الذكي (RSVP)، حفظ الموعد في التقويم، وخلفيات موسيقية حالمة، وتنبيه احترام الخصوصية ومنع التصوير.
        </p>

        {/* Feature Highlights Pills (Soft Floating Bubbles) */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 text-xs font-tajawal text-stone-700">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/85 border border-amber-200/60 shadow-sm backdrop-blur-sm">
            <HeartHandshake className="w-4 h-4 text-emerald-600" />
            <span>تأكيد حضور سلس مع تحديد عدد المرافقين</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/85 border border-amber-200/60 shadow-sm backdrop-blur-sm">
            <Crown className="w-4 h-4 text-amber-600" />
            <span>رابط خاص بأهل الحفل مع عداد الحضور الحي</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/85 border border-amber-200/60 shadow-sm backdrop-blur-sm">
            <CalendarCheck className="w-4 h-4 text-sky-600" />
            <span>حفظ فوري في تقويم Apple و Google</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/85 border border-amber-200/60 shadow-sm backdrop-blur-sm">
            <CameraOff className="w-4 h-4 text-rose-500" />
            <span>تنبيه منع التصوير واحترام الخصوصية</span>
          </div>
        </div>
      </header>

      {/* Interactive Carousel & Live Slide Showcase */}
      <section className="relative py-10 px-4 sm:px-8 max-w-6xl mx-auto z-10">
        <div className="text-center mb-8">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-widest font-cairo">
            معاينة سريعة وتفاعلية
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold font-cairo text-stone-900 mt-1">
            تشكيلة القوالب الملكية المميزة (٨ قوالب)
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 font-tajawal mt-1">
            تنقل بين القوالب لمشاهدة لقطة حقيقية من كل بطاقة واختيار ما يناسب حفلكم
          </p>
        </div>

        {/* Template Slide Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 max-w-5xl mx-auto scrollbar-none px-2">
          {templates.map((tmpl, index) => (
            <button
              key={tmpl.id}
              onClick={() => setActiveSlide(index)}
              className={`px-4 py-2 rounded-full text-xs font-bold font-cairo whitespace-nowrap transition-all cursor-pointer border ${
                activeSlide === index
                  ? 'bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-600/25 scale-105'
                  : 'bg-white/80 text-stone-600 border-amber-100 hover:text-stone-900 hover:bg-white hover:border-amber-300'
              }`}
            >
              <span>{tmpl.badge}: {tmpl.title.split('/')[0]}</span>
            </button>
          ))}
        </div>

        {/* Featured Live Slide Showcase Card - Free-flowing, Warm & Light */}
        <div className="relative mt-4 rounded-3xl bg-white/85 border border-amber-200/50 p-6 sm:p-10 shadow-xl shadow-amber-950/5 backdrop-blur-md overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left: Template Details & Metadata */}
            <div className="lg:col-span-6 space-y-5 text-right" dir="rtl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>{currentTmpl.badge}</span>
                <span className="text-stone-300">•</span>
                <span className="font-mono text-[11px] text-stone-500">{currentTmpl.subtitle}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold font-cairo text-stone-900">
                {currentTmpl.title}
              </h3>

              <p className="text-xs sm:text-sm text-amber-700 font-tajawal font-semibold">
                {currentTmpl.tag}
              </p>

              <p className="text-xs sm:text-sm text-stone-600 font-tajawal leading-relaxed">
                {currentTmpl.desc}
              </p>

              {/* Info Pill */}
              <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/40 space-y-2 text-xs font-tajawal">
                <div className="flex items-center justify-between text-stone-700">
                  <span className="text-stone-500">العريس والعروس:</span>
                  <span className="font-bold text-amber-800">{currentTmpl.coupleNames}</span>
                </div>
                <div className="flex items-center justify-between text-stone-700">
                  <span className="text-stone-500">القاعة والمدينة:</span>
                  <span className="font-medium text-stone-800">{currentTmpl.venue}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href={`/d/${currentTmpl.slug}`}
                  className="flex-1 py-3 px-6 rounded-2xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-700 hover:to-amber-600 text-white font-bold text-xs sm:text-sm font-cairo flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-600/20"
                >
                  <Eye className="w-4 h-4" />
                  <span>معاينة كرت الدعوة الكامل</span>
                </Link>

                <Link
                  href={`/d/${currentTmpl.slug}?view=host`}
                  className="py-3 px-4 rounded-2xl bg-white hover:bg-amber-50 text-amber-800 border border-amber-300 text-xs font-bold font-cairo flex items-center gap-1.5 transition-colors shadow-sm"
                  title="عرض كرت أهل العرس المزود بعداد الحضور"
                >
                  <Crown className="w-4 h-4 text-amber-600" />
                  <span className="hidden sm:inline">رابط أهل العرس</span>
                </Link>
              </div>

              {/* Slide Navigation Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-amber-100 text-xs text-stone-500 font-tajawal">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrevSlide}
                    className="p-2.5 rounded-xl bg-white hover:bg-amber-50 border border-amber-200 text-stone-700 transition-colors cursor-pointer shadow-sm"
                    aria-label="القالب السابق"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextSlide}
                    className="p-2.5 rounded-xl bg-white hover:bg-amber-50 border border-amber-200 text-stone-700 transition-colors cursor-pointer shadow-sm"
                    aria-label="القالب التالي"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </div>
                <span className="font-tajawal text-stone-600">القالب {activeSlide + 1} من {templates.length}</span>
              </div>
            </div>

            {/* Right: Authentic High-Resolution Card Thumbnail Photoshoot */}
            <div className="lg:col-span-6 flex justify-center items-center">
              <div className="relative group max-w-[340px] sm:max-w-[380px] w-full">
                {/* Floating Soft Shadow & Halo */}
                <div className="absolute -inset-2 bg-gradient-to-r from-amber-200/50 to-rose-200/50 rounded-[36px] blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Card Thumbnail Display */}
                <div className="relative rounded-[32px] overflow-hidden bg-white border border-amber-200/60 shadow-2xl transition-all duration-500">
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100">
                    <img
                      src={currentTmpl.thumbnail}
                      alt={currentTmpl.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Gradient Overlay for Title */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />

                    {/* Top Badge */}
                    <div className="absolute top-4 right-4 z-10">
                      <span className="px-3 py-1 rounded-full text-xs font-bold font-cairo bg-white/90 text-stone-800 shadow-md backdrop-blur-md">
                        {currentTmpl.badge}
                      </span>
                    </div>

                    {/* Bottom Floating Info */}
                    <div className="absolute bottom-4 left-4 right-4 text-center z-10 text-white">
                      <p className="text-xs font-amiri text-amber-200 tracking-wide">
                        {currentTmpl.coupleNames}
                      </p>
                      <h4 className="text-base font-bold font-cairo text-white mt-0.5">
                        {currentTmpl.title.split('/')[0]}
                      </h4>
                      <Link
                        href={`/d/${currentTmpl.slug}`}
                        className="mt-2 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-500/90 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-colors backdrop-blur-sm"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>فتح لمعاينة الكرت</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Templates Showcase Grid (Real Thumbnails Photoshoot Gallery) */}
      <section className="relative py-12 px-4 sm:px-8 max-w-6xl mx-auto z-10">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-widest font-cairo">
            معرض البطاقات
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-cairo text-stone-900 mt-1">
            لقطات حقيقية من كروت الدعوة المعتمدة
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 font-tajawal mt-1">
            انقر على أي كرت لمعاينته حياً بكل تفاصيله وموسيقاه وتأثيراته البصرية
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {templates.map((tmpl, index) => (
            <div
              key={tmpl.id}
              className="group relative rounded-3xl bg-white/90 border border-amber-200/50 hover:border-amber-400 transition-all duration-300 flex flex-col justify-between shadow-lg shadow-amber-950/5 hover:shadow-2xl hover:shadow-amber-900/10 hover:-translate-y-1.5 overflow-hidden backdrop-blur-sm"
            >
              {/* Card Real Photoshoot Thumbnail Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                <img
                  src={tmpl.thumbnail}
                  alt={tmpl.title}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                />

                {/* Subtle Luxury Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-black/20 to-black/30" />

                {/* Top Badge & Slide Switcher */}
                <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between z-10">
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-white/90 text-stone-800 shadow-md backdrop-blur-md">
                    {tmpl.badge}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveSlide(index);
                      window.scrollTo({ top: 350, behavior: 'smooth' });
                    }}
                    className="text-[11px] font-tajawal text-white hover:text-amber-200 flex items-center gap-1 bg-black/40 hover:bg-black/60 px-2.5 py-1 rounded-full border border-white/20 transition-colors backdrop-blur-sm"
                  >
                    <Layers className="w-3 h-3" />
                    <span>عرض بالشريحة</span>
                  </button>
                </div>

                {/* Thumbnail Couple & Title Info */}
                <div className="absolute bottom-3.5 inset-x-3.5 z-10 text-right" dir="rtl">
                  <span className="text-[12px] text-amber-300 font-amiri block">
                    {tmpl.coupleNames}
                  </span>
                  <h4 className="text-base font-bold font-cairo text-white mt-0.5">
                    {tmpl.title}
                  </h4>
                </div>
              </div>

              {/* Card Info & Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4 text-right" dir="rtl">
                <div>
                  <p className="text-xs text-amber-700 font-tajawal font-bold">
                    {tmpl.tag}
                  </p>

                  <p className="text-xs text-stone-600 font-tajawal mt-2 leading-relaxed">
                    {tmpl.desc}
                  </p>
                </div>

                {/* Triple Action Buttons */}
                <div className="pt-4 border-t border-amber-100/80 space-y-2">
                  <Link
                    href={`/d/${tmpl.slug}`}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-700 hover:to-amber-600 text-white font-bold text-xs font-cairo flex items-center justify-center gap-1.5 transition-all shadow-md shadow-amber-600/15"
                  >
                    <span>معاينة القالب الكامل</span>
                    <ChevronLeft className="w-4 h-4" />
                  </Link>

                  <Link
                    href={`/d/${tmpl.slug}?view=host`}
                    className="w-full py-1.5 px-3 rounded-lg bg-amber-50/70 hover:bg-amber-100 text-amber-900 text-[11px] font-tajawal flex items-center justify-center gap-1.5 transition-colors border border-amber-200/60 font-medium"
                  >
                    <Crown className="w-3 h-3 text-amber-600" />
                    <span>معاينة رابط أهل العرس (مع العداد)</span>
                  </Link>

                  <Link
                    href={`/admin?fromTemplate=${tmpl.id}`}
                    className="w-full py-1.5 px-3 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-tajawal flex items-center justify-center gap-1.5 transition-colors border border-stone-200 font-medium"
                  >
                    <Plus className="w-3 h-3 text-amber-600" />
                    <span>تخصيص كرت دعوة لزبون من هذا القالب</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Breakdown Section (Warm Ivory Cards) */}
      <section className="relative py-14 px-4 sm:px-8 max-w-5xl mx-auto z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center sm:text-right" dir="rtl">
          
          <div className="p-6 rounded-3xl bg-white/80 border border-amber-200/40 shadow-sm backdrop-blur-sm">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-3 mx-auto sm:mr-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-stone-900 font-cairo">
              تأكيد حضور مرن مع عدد الأفراد
            </h4>
            <p className="text-xs text-stone-600 font-tajawal mt-1.5 leading-relaxed">
              إمكانية زيادة عدد الأفراد القادمين (+ و -) لتسجيل العائلة أو المرافقين بكل سلاسة مع قفل الجهاز لمنع التكرار العشوائي.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white/80 border border-amber-200/40 shadow-sm backdrop-blur-sm">
            <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mb-3 mx-auto sm:mr-0">
              <Crown className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-stone-900 font-cairo">
              رابط خاص بأهل الحفل
            </h4>
            <p className="text-xs text-stone-600 font-tajawal mt-1.5 leading-relaxed">
              رابط مخصص لأهل العريس أو العروس لمتابعة إحصائيات وعداد الحضور لحظياً، مع إخفاء العداد عن كروت المعازيم.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white/80 border border-amber-200/40 shadow-sm backdrop-blur-sm">
            <div className="w-11 h-11 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 mb-3 mx-auto sm:mr-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-stone-900 font-cairo">
              متزامن سحابياً مع Supabase
            </h4>
            <p className="text-xs text-stone-600 font-tajawal mt-1.5 leading-relaxed">
              حفظ مركزي فوري لجميع البيانات وتأكيدات الحضور على قاعدة بيانات سحابية تتزامن بين كافة الهواتف والأجهزة حول العالم.
            </p>
          </div>

        </div>
      </section>

      {/* Discreet Public Footer */}
      <footer className="relative py-8 px-4 text-center border-t border-amber-200/40 text-stone-500 text-xs font-tajawal z-10">
        <p className="font-medium text-stone-600">
          منصة مناسبة • بطاقات ودعوات زفاف إلكترونية تفاعلية فاخرة
        </p>
        <p className="text-[11px] text-stone-400 mt-1">
          جميع الحقوق محفوظة © ٢٠٢٦
        </p>
      </footer>

    </div>
  );
}
