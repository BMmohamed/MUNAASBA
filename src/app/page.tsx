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
      color: 'from-emerald-950 via-[#042017] to-neutral-950',
      accentBorder: 'border-amber-400/50',
      accentText: 'text-amber-300',
      tag: 'أقواس إسلامية • زخارف أندلسية • ذهب كلاسيكي',
      desc: 'مستوحى من عراقة الأقواس الشرقية والزخارف الذهبية الملكية، بانتقال انسيابي مباشر لواجهة العريس والعروس الفاخرة.',
      coupleNames: 'أحمد بن خالد & ريم بنت منصور',
      eventTitle: 'حفل الزفاف المبارك',
      venue: 'قصر الثريا للاحتفالات - الرياض',
      themeStyle: 'emerald-gold',
    },
    {
      id: 'template-2',
      title: 'المودرن البسيط',
      subtitle: 'Modern Minimalist',
      slug: 'modern-minimalist',
      badge: 'عصري هادئ',
      color: 'from-stone-950 via-stone-900 to-neutral-950',
      accentBorder: 'border-stone-400/50',
      accentText: 'text-stone-200',
      tag: 'خلفية عاجية • خطوط تحريرية ناعمة • إطار ذهبي دقيق',
      desc: 'بساطة فاخرة تركز على أناقة الأسماء وتناغم الخطوط العربية الراقية في بيئة هادئة ومريحة للعين.',
      coupleNames: 'زياد الحربي & سارة الشريف',
      eventTitle: 'عقد قران وزفاف مبارك',
      venue: 'فندق فورسيزونز قاعة المملكة - الرياض',
      themeStyle: 'minimal-champagne',
    },
    {
      id: 'template-3',
      title: 'الورود الملكية',
      subtitle: 'Royal Floral',
      slug: 'royal-floral',
      badge: 'رومانسي حالم',
      color: 'from-rose-950 via-[#1e0a13] to-neutral-950',
      accentBorder: 'border-rose-400/50',
      accentText: 'text-rose-300',
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
      color: 'from-slate-950 via-[#0a0f1d] to-[#04060c]',
      accentBorder: 'border-amber-400/50',
      accentText: 'text-amber-200',
      tag: 'سواد ليلي عميق • بريق النجوم • ذهب شمبانيا',
      desc: 'أمسية سماوية آسرة تجمع بين الخلفية الليلية المظلمة وتوهج النجوم مع تفاصيل ذهبية معدنية متلألئة.',
      coupleNames: 'فيصل بن بدر & نورة بنت سلطان',
      eventTitle: 'أمسية الزفاف الملكية',
      venue: 'فندق الفيصلية ماندرين أورينتال - الرياض',
      themeStyle: 'midnight-gold',
    },
    {
      id: 'template-5',
      title: 'التراث الأصيل',
      subtitle: 'Heritage / Traditional',
      slug: 'heritage-andalus',
      badge: 'أصالة وعراقة',
      color: 'from-amber-950 via-[#231208] to-neutral-950',
      accentBorder: 'border-amber-600/50',
      accentText: 'text-amber-300',
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
      color: 'from-[#1e150a] via-[#120c04] to-neutral-950',
      accentBorder: 'border-amber-400/60',
      accentText: 'text-amber-300',
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
      color: 'from-[#2b0d18] via-[#1a080f] to-neutral-950',
      accentBorder: 'border-rose-400/60',
      accentText: 'text-rose-300',
      tag: 'أمطار بتلات متساقطة على الشاشة • إكليل زهور عضوي • تموجات وردية',
      desc: 'تجربة حية تنهمر فيها بتلات الورد المتطايرة على الشاشة بانسيابية شلالية، مع إكليل زهور نباتي دائري وإطار مموج وموسيقى بيانو رومانسية هادئة.',
      coupleNames: 'سعود بن عبدالعزيز & ديمة بنت منصور',
      eventTitle: 'ليلة الياسمين وشلال الفرح',
      venue: 'منتجع بارك حياة - قاعة الصحبة - جدة',
      themeStyle: 'floral-cascade',
    },
    {
      id: 'template-8',
      title: 'الميدالية الملكية والتاج',
      subtitle: 'Royal Baroque Medallion',
      slug: 'baroque-medallion',
      badge: 'طابع باروكي ملكي',
      color: 'from-[#140b24] via-[#090412] to-neutral-950',
      accentBorder: 'border-purple-400/50',
      accentText: 'text-amber-300',
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
    <div className="relative min-h-screen bg-neutral-950 text-neutral-100 font-cairo overflow-hidden selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Background Watermark & Ambient Sparkles */}
      <MashrabiyaWatermark opacity={0.04} color="#d4af37" />
      <AmbientParticles count={18} color="#e5c158" />

      {/* Hero Header Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Hero Section */}
      <header className="relative pt-16 pb-10 px-4 sm:px-6 text-center z-10 max-w-4xl mx-auto">
        
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
          منصة متكاملة لتصميم ومشاركة بطاقات الأفراح والمناسبات الراقية، مزودة بتأكيد الحضور (RSVP) بعدد الضيوف، وحفظ الموعد في تقويم Google و Apple، ورابط خاص بأهل الحفل لمتابعة الحضور المباشر.
        </p>

        {/* Feature Highlights Pills */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs font-tajawal text-neutral-300">
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-neutral-900/80 border border-neutral-800">
            <HeartHandshake className="w-4 h-4 text-emerald-400" />
            <span>تأكيد حضور مع زيادة عدد الأفراد</span>
          </div>
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-neutral-900/80 border border-neutral-800">
            <Crown className="w-4 h-4 text-amber-400" />
            <span>رابط خاص بأهل العرس لمتابعة العداد</span>
          </div>
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-neutral-900/80 border border-neutral-800">
            <CalendarCheck className="w-4 h-4 text-blue-400" />
            <span>إضافة مباشرة لتقويم Apple و Google</span>
          </div>
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-neutral-900/80 border border-neutral-800">
            <MapPin className="w-4 h-4 text-rose-400" />
            <span>ملاحة خرائط Google بنقرة واحدة</span>
          </div>
        </div>
      </header>

      {/* Interactive Carousel & Live Slide Quick View Section */}
      <section className="relative py-12 px-4 sm:px-8 max-w-6xl mx-auto z-10">
        <div className="text-center mb-8">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider font-cairo">
            استعراض فوري وسريع
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold font-cairo text-neutral-100 mt-1">
            لمحة سريعة على تشكيلة القوالب الملكية (٨ قوالب مميزة)
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-tajawal mt-1">
            تنقّل بين الشرائح لاكتشاف أسلوب كل تصميم وهويته البصرية قبل المعاينة الكاملة
          </p>
        </div>

        {/* Template Slide Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 max-w-4xl mx-auto scrollbar-none">
          {templates.map((tmpl, index) => (
            <button
              key={tmpl.id}
              onClick={() => setActiveSlide(index)}
              className={`px-4 py-2 rounded-xl text-xs font-bold font-cairo whitespace-nowrap transition-all cursor-pointer border ${
                activeSlide === index
                  ? 'bg-amber-500 text-neutral-950 border-amber-400 shadow-lg shadow-amber-500/20 scale-105'
                  : 'bg-neutral-900/80 text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-700'
              }`}
            >
              <span>{tmpl.badge}: {tmpl.title.split('/')[0]}</span>
            </button>
          ))}
        </div>

        {/* Featured Live Slide Showcase Card */}
        <div className="relative mt-4 rounded-3xl bg-neutral-900/90 border border-neutral-800 p-6 sm:p-10 shadow-2xl backdrop-blur-xl overflow-hidden">
          
          {/* Background Ambient Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-amber-500/5 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left: Template Details & Metadata */}
            <div className="lg:col-span-6 space-y-5 text-right" dir="rtl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{currentTmpl.badge}</span>
                <span className="text-neutral-500">•</span>
                <span className="font-mono text-[11px] text-neutral-400">{currentTmpl.subtitle}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold font-cairo text-white">
                {currentTmpl.title}
              </h3>

              <p className="text-xs sm:text-sm text-amber-300/90 font-tajawal font-semibold">
                {currentTmpl.tag}
              </p>

              <p className="text-xs sm:text-sm text-neutral-300 font-tajawal leading-relaxed">
                {currentTmpl.desc}
              </p>

              <div className="p-4 rounded-2xl bg-neutral-950/70 border border-neutral-800 space-y-2 text-xs font-tajawal">
                <div className="flex items-center justify-between text-neutral-300">
                  <span className="text-neutral-500">العريس والعروس:</span>
                  <span className="font-bold text-amber-200">{currentTmpl.coupleNames}</span>
                </div>
                <div className="flex items-center justify-between text-neutral-300">
                  <span className="text-neutral-500">القاعة والمدينة:</span>
                  <span>{currentTmpl.venue}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href={`/d/${currentTmpl.slug}`}
                  className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-neutral-950 font-bold text-xs sm:text-sm font-cairo flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20"
                >
                  <Eye className="w-4 h-4" />
                  <span>معاينة كرت الدعوة الكامل</span>
                </Link>

                <Link
                  href={`/d/${currentTmpl.slug}?view=host`}
                  className="py-3 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-amber-300 border border-amber-500/30 text-xs font-bold font-cairo flex items-center gap-1.5 transition-colors"
                  title="عرض كرت أهل العرس المزود بعداد الحضور"
                >
                  <Crown className="w-4 h-4" />
                  <span className="hidden sm:inline">رابط أهل العرس</span>
                </Link>
              </div>

              {/* Slide Navigation Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-neutral-800 text-xs text-neutral-400 font-tajawal">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrevSlide}
                    className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white transition-colors cursor-pointer"
                    aria-label="القالب السابق"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextSlide}
                    className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white transition-colors cursor-pointer"
                    aria-label="القالب التالي"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </div>
                <span>القالب {activeSlide + 1} من {templates.length}</span>
              </div>
            </div>

            {/* Right: Realistic Phone Mockup Thumbnail with Authentic Design Visuals */}
            <div className="lg:col-span-6 flex justify-center items-center">
              <div className="w-full max-w-[320px] sm:max-w-[340px] rounded-[44px] bg-neutral-950 p-2.5 border-[7px] border-neutral-800 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(212,175,55,0.15)] ring-1 ring-white/10 relative overflow-hidden transition-all duration-500">
                
                {/* Phone Top Speaker & Notch */}
                <div className="w-full pt-1 pb-1.5 flex justify-center items-center z-20">
                  <div className="w-20 h-3 bg-neutral-900 rounded-full flex items-center justify-center gap-1.5">
                    <div className="w-6 h-1 bg-neutral-700 rounded-full" />
                    <div className="w-1.5 h-1.5 bg-neutral-700 rounded-full" />
                  </div>
                </div>

                {/* Inner Miniature Template Preview Canvas */}
                <div
                  className={`w-full min-h-[440px] rounded-[32px] p-5 flex flex-col justify-between text-center relative overflow-hidden border ${currentTmpl.accentBorder} bg-gradient-to-b ${currentTmpl.color}`}
                >
                  {/* Decorative Elements based on style */}
                  {currentTmpl.themeStyle === 'emerald-gold' && (
                    <>
                      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px]" />
                      <div className="border border-amber-400/30 rounded-t-[90px] rounded-b-xl p-3 h-full flex flex-col justify-between relative z-10">
                        <div>
                          <div className="w-8 h-8 mx-auto text-amber-400 mb-1">👑</div>
                          <span className="text-[10px] text-amber-200/80 font-amiri block">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span>
                          <span className="text-[10px] text-amber-400 font-bold block mt-2">حفل الزفاف المبارك</span>
                          <h4 className="text-lg font-bold font-ruqaa text-amber-300 mt-2">أحمد بن خالد</h4>
                          <span className="text-xs text-amber-400 font-ruqaa block">&</span>
                          <h4 className="text-lg font-bold font-ruqaa text-amber-300">ريم بنت منصور</h4>
                        </div>
                        <div className="space-y-1.5 py-2">
                          <div className="text-[10px] text-neutral-300">الجمعة • ٨:٠٠ مساءً</div>
                          <div className="text-[9px] text-amber-200">قصر الثريا للاحتفالات</div>
                        </div>
                        <div className="py-2 px-3 rounded-lg bg-gradient-to-r from-amber-500 to-amber-400 text-neutral-950 font-bold text-[11px] shadow">
                          سأحضر (تأكيد الحضور)
                        </div>
                      </div>
                    </>
                  )}

                  {currentTmpl.themeStyle === 'minimal-champagne' && (
                    <div className="border border-stone-600/40 rounded-2xl p-4 h-full flex flex-col justify-between relative z-10 bg-stone-900/60">
                      <div>
                        <span className="text-[9px] text-stone-400 font-tajawal tracking-widest block uppercase">WEDDING INVITATION</span>
                        <div className="w-12 h-px bg-stone-500 mx-auto my-2" />
                        <span className="text-[10px] text-stone-300 font-amiri block">بارك الله لهما وبارك عليهما</span>
                        <h4 className="text-base font-bold font-cairo text-stone-100 mt-3">زياد الحربي</h4>
                        <span className="text-xs text-stone-400 block my-0.5">&</span>
                        <h4 className="text-base font-bold font-cairo text-stone-100">سارة الشريف</h4>
                      </div>
                      <div className="text-[10px] text-stone-300 space-y-1">
                        <div>السبت • ٧:٣٠ مساءً</div>
                        <div className="text-stone-400">فندق فورسيزونز قاعة المملكة</div>
                      </div>
                      <div className="py-2 px-3 rounded-lg bg-stone-100 text-stone-950 font-bold text-[11px] shadow">
                        تأكيد الحضور
                      </div>
                    </div>
                  )}

                  {currentTmpl.themeStyle === 'royal-floral' && (
                    <div className="border border-rose-400/40 rounded-3xl p-4 h-full flex flex-col justify-between relative z-10 bg-rose-950/40">
                      <div>
                        <div className="text-sm text-rose-300 mb-1">🌸</div>
                        <span className="text-[10px] text-rose-200 font-amiri block">في ليلةٍ من ليالي العمرِ زاهيةٍ</span>
                        <div className="my-2 p-2 rounded-2xl bg-rose-500/10 border border-rose-400/30">
                          <h4 className="text-base font-bold font-ruqaa text-rose-100">طارق بن ناصر</h4>
                          <span className="text-xs text-rose-300 block">&</span>
                          <h4 className="text-base font-bold font-ruqaa text-rose-100">لمى بنت فهد</h4>
                        </div>
                      </div>
                      <div className="text-[10px] text-rose-200">
                        <div>السبت • ٨:٣٠ مساءً</div>
                        <div className="text-rose-300/80">منتجع الريتز كارلتون - جدة</div>
                      </div>
                      <div className="py-2 px-3 rounded-lg bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-[11px] shadow">
                        تأكيد الحضور
                      </div>
                    </div>
                  )}

                  {currentTmpl.themeStyle === 'midnight-gold' && (
                    <div className="border border-amber-400/35 rounded-3xl p-4 h-full flex flex-col justify-between relative z-10 bg-slate-950/80">
                      <div>
                        <div className="text-sm text-amber-300 mb-1">✨ 🌙 ✨</div>
                        <span className="text-[9px] text-amber-200/80 font-amiri block">وَأَلَّفَ بَيْنَ قُلُوبِهِمْ</span>
                        <span className="text-[10px] text-amber-300 font-bold block mt-2">أمسية الزفاف الملكية</span>
                        <h4 className="text-base font-bold font-ruqaa text-yellow-300 mt-2">فيصل بن بدر</h4>
                        <span className="text-xs text-amber-300 block">&</span>
                        <h4 className="text-base font-bold font-ruqaa text-yellow-300">نورة بنت سلطان</h4>
                      </div>
                      <div className="text-[10px] text-amber-100 space-y-1">
                        <div>الجمعة • ٨:٠٠ مساءً</div>
                        <div className="text-amber-300/70">فندق الفيصلية - الرياض</div>
                      </div>
                      <div className="py-2 px-3 rounded-lg bg-gradient-to-r from-amber-400 to-yellow-300 text-neutral-950 font-bold text-[11px] shadow">
                        تأكيد الحضور
                      </div>
                    </div>
                  )}

                  {currentTmpl.themeStyle === 'heritage-warm' && (
                    <div className="border border-amber-600/40 rounded-3xl p-4 h-full flex flex-col justify-between relative z-10 bg-amber-950/50">
                      <div>
                        <div className="text-sm text-amber-400 mb-1">☕ 🏛️ ☕</div>
                        <span className="text-[10px] text-amber-200 font-amiri block">عرس الأصالة والتراث</span>
                        <div className="my-2 p-2 rounded-xl border border-amber-600/40 bg-black/30">
                          <h4 className="text-base font-bold font-amiri text-amber-200">ماجد بن تركي</h4>
                          <span className="text-xs text-amber-400 block">&</span>
                          <h4 className="text-base font-bold font-amiri text-amber-200">هيا بنت عبدالله</h4>
                        </div>
                      </div>
                      <div className="text-[10px] text-amber-200">
                        <div>الجمعة • ٧:٠٠ مساءً</div>
                        <div className="text-amber-300/80">قصر الدرعية التراثي</div>
                      </div>
                      <div className="py-2 px-3 rounded-lg bg-gradient-to-r from-amber-600 to-amber-500 text-neutral-950 font-bold text-[11px] shadow">
                        تأكيد الحضور
                      </div>
                    </div>
                  )}

                  {currentTmpl.themeStyle === 'golden-rings' && (
                    <div className="border border-amber-400/50 rounded-t-[100px] rounded-b-[40px] p-4 h-full flex flex-col justify-between relative z-10 bg-amber-950/40 shadow-inner">
                      <div>
                        <div className="text-lg text-amber-300 mb-1">💍</div>
                        <span className="text-[9px] text-amber-200/90 font-amiri block">وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا</span>
                        <div className="my-2 p-2 rounded-full border border-amber-400/40 bg-black/40">
                          <h4 className="text-sm font-bold font-cairo text-amber-200">عبدالرحمن & رزان</h4>
                        </div>
                      </div>
                      <div className="text-[10px] text-amber-200/90 space-y-0.5">
                        <div>الخميس • ٨:٠٠ مساءً</div>
                        <div className="text-amber-300/80 text-[9px]">قصر الفرسان للاحتفالات</div>
                      </div>
                      <div className="py-2 px-3 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-neutral-950 font-bold text-[11px] shadow">
                        تأكيد الحضور
                      </div>
                    </div>
                  )}

                  {currentTmpl.themeStyle === 'floral-cascade' && (
                    <div className="border border-rose-400/50 rounded-[40px] p-4 h-full flex flex-col justify-between relative z-10 bg-rose-950/40 shadow-inner overflow-hidden">
                      <div className="text-[10px] text-rose-300/60 animate-pulse">🌸 🍃 🌸</div>
                      <div>
                        <div className="w-10 h-10 mx-auto rounded-full border border-rose-400/50 flex items-center justify-center text-sm mb-1 bg-rose-500/10">
                          🌿
                        </div>
                        <span className="text-[9px] text-rose-200/90 font-amiri block">شلال البهجة والمسرات</span>
                        <h4 className="text-sm font-bold font-amiri text-rose-100 mt-1">سعود & ديمة</h4>
                      </div>
                      <div className="text-[10px] text-rose-200/90 space-y-0.5">
                        <div>الجمعة • ٨:٣٠ مساءً</div>
                        <div className="text-rose-300/80 text-[9px]">منتجع بارك حياة جدة</div>
                      </div>
                      <div className="py-2 px-3 rounded-2xl bg-gradient-to-r from-rose-500 to-amber-400 text-neutral-950 font-bold text-[11px] shadow">
                        سأحضر بكل سرور
                      </div>
                    </div>
                  )}

                  {currentTmpl.themeStyle === 'baroque-medallion' && (
                    <div className="border-2 border-amber-400/60 rounded-full p-4 h-full flex flex-col justify-between relative z-10 bg-purple-950/40 shadow-2xl">
                      <div>
                        <div className="text-base text-amber-300 mb-0.5">👑</div>
                        <span className="text-[8px] text-amber-300 tracking-widest block uppercase">ROYAL WEDDING</span>
                        <div className="my-1.5 p-1.5 border-y border-amber-400/40">
                          <h4 className="text-xs font-bold font-cairo text-amber-200">بدر بن خالد</h4>
                          <span className="text-[9px] text-amber-400/80 block">&</span>
                          <h4 className="text-xs font-bold font-cairo text-amber-200">سارة بنت فيصل</h4>
                        </div>
                      </div>
                      <div className="text-[9px] text-purple-200/90">
                        <div>السبت • ٨:٠٠ مساءً</div>
                        <div className="text-amber-300/70 text-[8px]">فندق الفيصلية - أمسيات</div>
                      </div>
                      <div className="py-1.5 px-3 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 text-neutral-950 font-bold text-[10px] shadow">
                        تأكيد الحضور الملكي
                      </div>
                    </div>
                  )}

                </div>

                {/* Bottom Indicator */}
                <div className="w-full py-1.5 flex justify-center items-center">
                  <div className="w-20 h-1 bg-neutral-700 rounded-full" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Templates Showcase Grid (Thumbnails) */}
      <section className="relative py-12 px-4 sm:px-8 max-w-6xl mx-auto z-10 border-t border-neutral-900">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold font-cairo text-neutral-100">
            معرض القوالب الأساسية المعتمدة
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-tajawal mt-1">
            اختر أي قالب لمعاينته مباشرة، أو اضغط لإنشاء كرت دعوة لزبون بالاعتماد على تصميمه
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((tmpl, index) => (
            <div
              key={tmpl.id}
              className="group relative rounded-3xl bg-neutral-900/80 border border-neutral-800 hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-1 overflow-hidden"
            >
              {/* Card Mini Thumbnail Banner */}
              <div
                className={`w-full h-36 p-4 flex flex-col justify-between relative overflow-hidden bg-gradient-to-b ${tmpl.color} border-b border-neutral-800/80`}
              >
                <div className="flex items-center justify-between relative z-10">
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border bg-neutral-950/70 ${tmpl.accentBorder} ${tmpl.accentText}`}>
                    {tmpl.badge}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveSlide(index);
                      window.scrollTo({ top: 350, behavior: 'smooth' });
                    }}
                    className="text-[10px] font-tajawal text-neutral-300 hover:text-amber-300 flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded-lg border border-white/10 transition-colors"
                  >
                    <Layers className="w-3 h-3" />
                    <span>عرض بالشريحة</span>
                  </button>
                </div>

                <div className="relative z-10 text-center">
                  <span className="text-[11px] text-amber-200/90 font-amiri block">
                    {tmpl.coupleNames}
                  </span>
                  <h4 className="text-sm font-bold font-cairo text-white mt-0.5">
                    {tmpl.title}
                  </h4>
                </div>
              </div>

              {/* Card Info */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <p className="text-xs text-amber-400 font-tajawal font-semibold">
                    {tmpl.tag}
                  </p>

                  <p className="text-xs text-neutral-400 font-tajawal mt-2 leading-relaxed">
                    {tmpl.desc}
                  </p>
                </div>

                {/* Triple Action Buttons */}
                <div className="pt-4 border-t border-neutral-800/80 space-y-2">
                  <Link
                    href={`/d/${tmpl.slug}`}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-neutral-950 font-bold text-xs font-cairo flex items-center justify-center gap-1.5 transition-all shadow-md shadow-amber-500/15"
                  >
                    <span>معاينة القالب الكامل</span>
                    <ChevronLeft className="w-4 h-4" />
                  </Link>

                  <Link
                    href={`/d/${tmpl.slug}?view=host`}
                    className="w-full py-1.5 px-3 rounded-lg bg-neutral-800/80 hover:bg-neutral-800 text-amber-300 text-[11px] font-tajawal flex items-center justify-center gap-1.5 transition-colors border border-amber-500/20"
                  >
                    <Crown className="w-3 h-3 text-amber-400" />
                    <span>معاينة رابط أهل العرس (مع العداد)</span>
                  </Link>

                  <Link
                    href={`/admin?fromTemplate=${tmpl.id}`}
                    className="w-full py-1.5 px-3 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-[11px] font-tajawal flex items-center justify-center gap-1.5 transition-colors border border-amber-500/30"
                  >
                    <Plus className="w-3 h-3 text-amber-400" />
                    <span>تخصيص كرت دعوة لزبون من هذا القالب</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Breakdown Section */}
      <section className="relative py-14 px-4 sm:px-8 max-w-5xl mx-auto z-10 border-t border-neutral-900">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center sm:text-right" dir="rtl">
          
          <div className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800/80">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3 mx-auto sm:mr-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-neutral-100 font-cairo">
              تأكيد حضور مرن مع عدد الأفراد
            </h4>
            <p className="text-xs text-neutral-400 font-tajawal mt-1.5 leading-relaxed">
              إمكانية زيادة عدد الأفراد القادمين (+ و -) لتسجيل العائلة أو المرافقين بكل سلاسة مع قفل الجهاز لمنع التكرار العشوائي.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800/80">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3 mx-auto sm:mr-0">
              <Crown className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-neutral-100 font-cairo">
              رابط خاص بأهل الحفل
            </h4>
            <p className="text-xs text-neutral-400 font-tajawal mt-1.5 leading-relaxed">
              رابط مخصص لأهل العريس أو العروس لمتابعة إحصائيات وعداد الحضور لحظياً، مع إخفاء العداد عن كروت المعازيم.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800/80">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-3 mx-auto sm:mr-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-neutral-100 font-cairo">
              متزامن سحابياً مع Supabase
            </h4>
            <p className="text-xs text-neutral-400 font-tajawal mt-1.5 leading-relaxed">
              حفظ مركزي فوري لجميع البيانات وتأكيدات الحضور على قاعدة بيانات سحابية تتزامن بين كافة الهواتف والأجهزة حول العالم.
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
