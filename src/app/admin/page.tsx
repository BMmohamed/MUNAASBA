'use client';

import React, { useState, useEffect } from 'react';
import {
  Lock,
  Plus,
  Copy,
  ExternalLink,
  RotateCcw,
  Edit,
  Sparkles,
  Users,
  Calendar,
  MapPin,
  Check,
  Eye,
  Sliders,
  X,
  FileText,
  Volume2,
  Share2,
  ShieldCheck,
  ChevronLeft,
  Video,
  Image as ImageIcon
} from 'lucide-react';
import { InvitationData, InvitationTemplateId, TimelineItem } from '@/types/invitation';
import { QURANIC_AND_POETIC_PRESETS } from '@/lib/constants';
import { toArabicNumerals } from '@/lib/date-utils';

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passcode, setPasscode] = useState<string>('');
  const [authError, setAuthError] = useState<string | null>(null);

  const [invitations, setInvitations] = useState<InvitationData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  // Editor Modal State
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [editingInv, setEditingInv] = useState<Partial<InvitationData> | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load passcode from sessionStorage if already unlocked
  useEffect(() => {
    const saved = sessionStorage.getItem('munaasaba_admin_pass');
    if (saved === 'admin123') {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch invitations
  const fetchInvitations = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/invitations');
      const data = await res.json();
      if (data.invitations) {
        setInvitations(data.invitations);
      }
    } catch (err) {
      console.error('Failed to fetch invitations:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchInvitations();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'admin123' || passcode === 'admin') {
      sessionStorage.setItem('munaasaba_admin_pass', 'admin123');
      setIsAuthenticated(true);
      setAuthError(null);
    } else {
      setAuthError('كلمة المرور غير صحيحة. كلمة المرور الافتراضية هي: admin123');
    }
  };

  const handleCopyLink = (slug: string) => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const url = `${origin}/d/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 3000);
  };

  const handleResetRsvp = async (slug: string, id: string) => {
    if (!window.confirm('هل أنت متأكد من رغبتك في إعادة ضبط عداد الحضور إلى الصفر؟')) {
      return;
    }
    try {
      const res = await fetch(`/api/invitations/${slug}/reset-rsvp`, { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setInvitations((prev) =>
          prev.map((inv) => (inv.id === id ? { ...inv, rsvpCount: 0 } : inv))
        );
        showToast('تمت إعادة ضبط عداد الحضور بنجاح');
      }
    } catch {
      showToast('تعذر إعادة ضبط العداد');
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const openCreateModal = () => {
    const newDraft: Partial<InvitationData> = {
      templateId: 'template-1',
      title: 'دعوة زفاف جديدة',
      eventTitle: 'حفل الزفاف المبارك',
      slug: `invite-${Date.now().toString(36)}`,
      groomName: 'عبدالرحمن بن سعود',
      brideName: 'سارة بنت عبدالله',
      groomParents: 'أبناء الشيخ سعود آل مبارك رحمه الله',
      brideParents: 'وكريمة الأستاذ عبدالله الشمري',
      eventDate: '2026-12-15T20:00:00',
      eventDateHijri: '٦ رجب ١٤٤٨ هـ',
      dayOfWeek: 'الجمعة',
      timeFormatted: 'الساعة ٨:٠٠ مساءً',
      venueName: 'قصر الاحتفالات الملكي',
      venueHall: 'القاعة الكبرى',
      venueCity: 'الرياض',
      venueAddress: 'طريق الملك فهد، الرياض',
      googleMapsUrl: 'https://maps.google.com/?q=24.7136,46.6753',
      headerVerse: QURANIC_AND_POETIC_PRESETS[0].verse,
      verseSource: QURANIC_AND_POETIC_PRESETS[0].source,
      welcomeMessage: 'يتشرفون بدعوتكم لحضور حفل الزفاف ومشاركتهم الفرحة والسرور، وبحضوركم يتم لنا الفرح والسرور.',
      rsvpCount: 0,
      toggles: {
        showCountdown: true,
        showCalendar: true,
        showLocation: true,
        showRsvp: true,
        showChildrenAdvisory: true,
        childrenAdvisoryText: 'جنة الأطفال منازلهم.. نعتذر عن استقبال الأطفال لمشاركتنا فرحة هادئة.',
        showDressCode: true,
        dressCodeText: 'الزي الرسمي السعودي (ثوب وبشت)',
        showTimeline: true,
        showMusic: true,
        musicUrl: 'https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3',
      },
      timeline: [
        { id: 't1', time: '٠٨:٠٠ م', label: 'استقبال الضيوف الكرام', icon: 'coffee' },
        { id: 't2', time: '٠٩:٣٠ م', label: 'مراسم الزفة المباركة', icon: 'ring' },
        { id: 't3', time: '١٠:٣٠ م', label: 'تناول طعام العشاء الفاخر', icon: 'dinner' },
      ],
    };
    setEditingInv(newDraft);
    setIsEditorOpen(true);
  };

  const openEditModal = (inv: InvitationData) => {
    setEditingInv(JSON.parse(JSON.stringify(inv)));
    setIsEditorOpen(true);
  };

  const handleSaveInvitation = async () => {
    if (!editingInv) return;
    setIsSaving(true);
    try {
      const isNew = !editingInv.id;
      const url = '/api/invitations';
      const method = 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingInv),
      });

      const data = await res.json();
      if (data.success && data.invitation) {
        if (isNew) {
          setInvitations((prev) => [data.invitation, ...prev]);
        } else {
          setInvitations((prev) =>
            prev.map((item) => (item.id === data.invitation.id ? data.invitation : item))
          );
        }
        setIsEditorOpen(false);
        showToast(isNew ? 'تم إنشاء الدعوة بنجاح!' : 'تم حفظ تعديلات الدعوة بنجاح!');
      }
    } catch {
      showToast('حدث خطأ أثناء الحفظ');
    } finally {
      setIsSaving(false);
    }
  };

  // Preset verses switcher helper
  const handleSelectPresetVerse = (presetId: string) => {
    const found = QURANIC_AND_POETIC_PRESETS.find((p) => p.id === presetId);
    if (found && editingInv) {
      setEditingInv({
        ...editingInv,
        headerVerse: found.verse,
        verseSource: found.source,
      });
    }
  };

  // Add timeline milestone
  const handleAddTimelineItem = () => {
    if (!editingInv) return;
    const current = editingInv.timeline || [];
    const newItem: TimelineItem = {
      id: `t_${Date.now()}`,
      time: '٠٩:٠٠ م',
      label: 'فقرة احتفائية جديدة',
      icon: 'ring',
    };
    setEditingInv({
      ...editingInv,
      timeline: [...current, newItem],
    });
  };

  // Delete timeline item
  const handleDeleteTimelineItem = (id: string) => {
    if (!editingInv) return;
    setEditingInv({
      ...editingInv,
      timeline: (editingInv.timeline || []).filter((item) => item.id !== id),
    });
  };

  // Template names mapping
  const templateNames: Record<InvitationTemplateId, { name: string; color: string }> = {
    'template-1': { name: 'باب الفرح / الأقواس الكلاسيكية', color: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/40' },
    'template-2': { name: 'المودرن البسيط (Modern Minimalist)', color: 'text-stone-300 border-stone-500/40 bg-stone-900/60' },
    'template-3': { name: 'الورود الملكية (Royal Floral)', color: 'text-rose-300 border-rose-500/40 bg-rose-950/40' },
    'template-4': { name: 'ليلة العمر / الفخامة الليلية (Midnight)', color: 'text-amber-300 border-amber-500/40 bg-slate-900/80' },
    'template-5': { name: 'التراث الأصيل (Heritage Mashrabiya)', color: 'text-amber-400 border-amber-700/50 bg-amber-950/50' },
  };

  // Passcode Gate View
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4 font-cairo">
        <div className="w-full max-w-md p-8 rounded-3xl bg-neutral-900/90 border border-neutral-800 shadow-2xl text-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto mb-4">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-neutral-100 mb-2">
            لوحة إدارة الدعوات الإلكترونية
          </h1>
          <p className="text-xs text-neutral-400 font-tajawal mb-6">
            منطقة الإدارة محمية، يرجى إدخال رمز المرور للمتابعة.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="رمز المرور (الافتراضي: admin123)"
                className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-amber-500 text-center font-cairo text-sm"
              />
            </div>
            {authError && (
              <p className="text-xs text-rose-400 font-tajawal">{authError}</p>
            )}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-neutral-950 font-bold text-sm transition-all"
            >
              تسجيل الدخول
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-neutral-800 text-[11px] text-neutral-500 font-tajawal">
            ملاحظة: هذا المسار سري وغير معلن في واجهة الموقع العامة.
          </div>
        </div>
      </div>
    );
  }

  const totalRsvps = invitations.reduce((acc, curr) => acc + (curr.rsvpCount || 0), 0);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-cairo selection:bg-amber-500/30">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-xl bg-amber-500 text-neutral-950 font-bold text-xs shadow-xl flex items-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Admin Navbar */}
      <header className="sticky top-0 z-40 bg-neutral-900/90 border-b border-neutral-800 backdrop-blur-md px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-neutral-100 flex items-center gap-2">
                <span>لوحة التحكم الإدارية</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-normal">
                  سري ومحمي
                </span>
              </h1>
              <p className="text-xs text-neutral-400 font-tajawal">
                إدارة بطاقات الدعوة والتصاميم وتأكيدات الحضور (RSVP)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={openCreateModal}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-neutral-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>إنشاء دعوة جديدة</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
        
        {/* Metric Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 flex items-center justify-between">
            <div>
              <span className="text-xs text-neutral-400 font-tajawal">إجمالي الدعوات المنشورة</span>
              <div className="text-2xl sm:text-3xl font-bold text-neutral-100 mt-1">
                {toArabicNumerals(invitations.length)}
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <FileText className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 flex items-center justify-between">
            <div>
              <span className="text-xs text-neutral-400 font-tajawal">إجمالي الحضور المؤكدين (RSVP)</span>
              <div className="text-2xl sm:text-3xl font-bold text-emerald-400 mt-1">
                {toArabicNumerals(totalRsvps)}
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 flex items-center justify-between">
            <div>
              <span className="text-xs text-neutral-400 font-tajawal">القوالب الفاخرة المعتمدة</span>
              <div className="text-2xl sm:text-3xl font-bold text-amber-400 mt-1">
                {toArabicNumerals(5)} قوالب
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Sparkles className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Invitations Table / List */}
        <div className="rounded-3xl bg-neutral-900/70 border border-neutral-800 overflow-hidden shadow-xl">
          <div className="p-6 border-b border-neutral-800 flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-base font-bold text-neutral-100">
                قائمة بطاقات الدعوة الحالية
              </h2>
              <p className="text-xs text-neutral-400 font-tajawal">
                يمكنك معاينة الدعوة، نسخ الرابط المباشر، تعديل النصوص والقالب، أو إعادة ضبط عداد الحضور.
              </p>
            </div>
            <button
              type="button"
              onClick={fetchInvitations}
              className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-tajawal"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>تحديث البيانات</span>
            </button>
          </div>

          {isLoading ? (
            <div className="p-12 text-center text-neutral-400 text-sm font-tajawal">
              جاري تحميل بيانات الدعوات...
            </div>
          ) : invitations.length === 0 ? (
            <div className="p-12 text-center text-neutral-400 text-sm font-tajawal">
              لا توجد دعوات حالية. انقر على &ldquo;إنشاء دعوة جديدة&rdquo; للبدء.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-right text-sm">
                <thead className="bg-neutral-950/50 text-neutral-400 text-xs font-tajawal border-b border-neutral-800">
                  <tr>
                    <th className="py-4 px-6">عنوان الدعوة / العروسين</th>
                    <th className="py-4 px-6">القالب المعتمد</th>
                    <th className="py-4 px-6">الموعد والمكان</th>
                    <th className="py-4 px-6 text-center">حضور مؤكد (RSVP)</th>
                    <th className="py-4 px-6 text-center">الرابط الفريد</th>
                    <th className="py-4 px-6 text-center">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60 font-tajawal">
                  {invitations.map((inv) => {
                    const tmpl = templateNames[inv.templateId] || templateNames['template-1'];
                    return (
                      <tr key={inv.id} className="hover:bg-neutral-800/30 transition-colors">
                        {/* Title & Couple */}
                        <td className="py-4 px-6">
                          <div className="font-bold font-cairo text-neutral-100 text-sm">
                            {inv.groomName} & {inv.brideName}
                          </div>
                          <div className="text-xs text-neutral-400 font-tajawal mt-0.5">
                            {inv.eventTitle}
                          </div>
                        </td>

                        {/* Template Badge */}
                        <td className="py-4 px-6">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${tmpl.color}`}
                          >
                            {tmpl.name}
                          </span>
                        </td>

                        {/* Date & Location */}
                        <td className="py-4 px-6 text-xs text-neutral-300">
                          <div>{inv.dayOfWeek} • {inv.timeFormatted}</div>
                          <div className="text-neutral-500 mt-0.5">{inv.venueName} - {inv.venueCity}</div>
                        </td>

                        {/* RSVP Counter Badge */}
                        <td className="py-4 px-6 text-center">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold font-cairo text-xs">
                            <Users className="w-3.5 h-3.5" />
                            <span>{toArabicNumerals(inv.rsvpCount)} ضيف</span>
                          </span>
                        </td>

                        {/* Slug & Copy Link */}
                        <td className="py-4 px-6 text-center">
                          <div className="inline-flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleCopyLink(inv.slug)}
                              title="نسخ الرابط"
                              className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-mono flex items-center gap-1.5 transition-colors"
                            >
                              {copiedSlug === inv.slug ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-400" />
                                  <span className="text-emerald-400">تم النسخ</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>/d/{inv.slug}</span>
                                </>
                              )}
                            </button>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-6 text-center">
                          <div className="flex items-center justify-center gap-2">
                            {/* View in new tab */}
                            <a
                              href={`/d/${inv.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="معاينة الدعوة"
                              className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>

                            {/* Edit */}
                            <button
                              type="button"
                              onClick={() => openEditModal(inv)}
                              title="تعديل الدعوة"
                              className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-amber-300 transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                            </button>

                            {/* Reset RSVP */}
                            <button
                              type="button"
                              onClick={() => handleResetRsvp(inv.slug, inv.id)}
                              title="تصفير عداد الحضور"
                              className="p-2 rounded-lg bg-neutral-800 hover:bg-rose-950/50 text-neutral-400 hover:text-rose-400 transition-colors"
                            >
                              <RotateCcw className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Create / Edit Drawer Modal */}
      {isEditorOpen && editingInv && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end animate-fadeIn">
          <div className="w-full max-w-2xl bg-neutral-900 border-r border-neutral-800 h-full overflow-y-auto p-6 sm:p-8 flex flex-col justify-between">
            
            <div className="space-y-6">
              
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-neutral-100">
                    {editingInv.id ? 'تعديل بيانات الدعوة' : 'إنشاء بطاقة دعوة جديدة'}
                  </h3>
                  <p className="text-xs text-neutral-400 font-tajawal">
                    خصص القالب والأسماء والنصوص ومفاتيح الأقسام التفاعلية.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="p-2 rounded-xl bg-neutral-800 text-neutral-400 hover:text-neutral-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 1. Template Selection */}
              <div>
                <label className="block text-xs font-bold text-amber-300 mb-2 font-cairo">
                  اختر قالب الدعوة (١ إلى ٥)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(
                    [
                      { id: 'template-1', title: '١. باب الفرح / الأقواس الإسلامية', desc: 'أقواس شرقية ملكية، زمردي وذهبي فاخر' },
                      { id: 'template-2', title: '٢. المودرن البسيط (Minimalist)', desc: 'عاجي هادئ وخطوط تحريرية ناعمة' },
                      { id: 'template-3', title: '٣. الورود الملكية (Royal Floral)', desc: 'ألوان الباستيل وبتلات الورد العائمة' },
                      { id: 'template-4', title: '٤. ليلة العمر (Midnight Elegance)', desc: 'كحلي ليلي فاخر وبريق النجوم والذهب' },
                      { id: 'template-5', title: '٥. التراث الأصيل (Heritage)', desc: 'طابع ترابي ودفء المشربيات الأندلسية' },
                    ] as const
                  ).map((t) => (
                    <button
                      type="button"
                      key={t.id}
                      onClick={() => setEditingInv({ ...editingInv, templateId: t.id })}
                      className={`p-3 rounded-xl border text-right transition-all ${
                        editingInv.templateId === t.id
                          ? 'border-amber-400 bg-amber-500/10 text-amber-200 shadow-md'
                          : 'border-neutral-800 bg-neutral-950/60 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      <div className="text-xs font-bold font-cairo">{t.title}</div>
                      <div className="text-[11px] font-tajawal opacity-75 mt-0.5">{t.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Basic Identification & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">
                    الرابط الفريد (Slug)
                  </label>
                  <input
                    type="text"
                    value={editingInv.slug || ''}
                    onChange={(e) => setEditingInv({ ...editingInv, slug: e.target.value })}
                    placeholder="e.g. demo-bab"
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs font-mono text-neutral-200 focus:outline-none focus:border-amber-500"
                  />
                  <span className="text-[10px] text-neutral-500 mt-1 block font-tajawal">
                    سيكون الرابط: /d/{editingInv.slug || 'slug'}
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">
                    عنوان المناسبة
                  </label>
                  <input
                    type="text"
                    value={editingInv.eventTitle || ''}
                    onChange={(e) => setEditingInv({ ...editingInv, eventTitle: e.target.value })}
                    placeholder="حفل الزفاف المبارك / عقد قران"
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* 3. Bride & Groom Names */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">
                    اسم العريس
                  </label>
                  <input
                    type="text"
                    value={editingInv.groomName || ''}
                    onChange={(e) => setEditingInv({ ...editingInv, groomName: e.target.value })}
                    placeholder="أحمد بن خالد"
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-200 focus:outline-none focus:border-amber-500 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">
                    اسم العروس
                  </label>
                  <input
                    type="text"
                    value={editingInv.brideName || ''}
                    onChange={(e) => setEditingInv({ ...editingInv, brideName: e.target.value })}
                    placeholder="ريم بنت منصور"
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-200 focus:outline-none focus:border-amber-500 font-bold"
                  />
                </div>
              </div>

              {/* 4. Parents & Welcome message */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">
                    أولياء أمور العريس (صيغة الدعوة)
                  </label>
                  <input
                    type="text"
                    value={editingInv.groomParents || ''}
                    onChange={(e) => setEditingInv({ ...editingInv, groomParents: e.target.value })}
                    placeholder="أبناء الشيخ خالد بن إبراهيم آل سعود رحمه الله"
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-200 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">
                    أولياء أمور العروس (صيغة الدعوة)
                  </label>
                  <input
                    type="text"
                    value={editingInv.brideParents || ''}
                    onChange={(e) => setEditingInv({ ...editingInv, brideParents: e.target.value })}
                    placeholder="وكريمة معالي الأستاذ منصور بن عبدالعزيز التميمي"
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-200 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">
                    نص الترحيب الرسمي
                  </label>
                  <textarea
                    rows={2}
                    value={editingInv.welcomeMessage || ''}
                    onChange={(e) => setEditingInv({ ...editingInv, welcomeMessage: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-200 focus:outline-none focus:border-amber-500 font-tajawal"
                  />
                </div>
              </div>

              {/* 5. Dynamic Text Customization (Quranic / Poetry Presets) */}
              <div className="p-4 rounded-2xl bg-neutral-950/70 border border-neutral-800 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-amber-300 font-cairo">
                    التخصيص الديناميكي للآية الكريمة أو الأبيات الشعرية
                  </label>
                </div>
                
                {/* Presets buttons */}
                <div className="flex flex-wrap gap-1.5">
                  {QURANIC_AND_POETIC_PRESETS.map((p) => (
                    <button
                      type="button"
                      key={p.id}
                      onClick={() => handleSelectPresetVerse(p.id)}
                      className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-[11px] text-neutral-300 font-tajawal border border-neutral-700"
                    >
                      {p.title}
                    </button>
                  ))}
                </div>

                <textarea
                  rows={3}
                  value={editingInv.headerVerse || ''}
                  onChange={(e) => setEditingInv({ ...editingInv, headerVerse: e.target.value })}
                  placeholder="نص الآية القرآنية أو الشعر الترحيبي..."
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-amber-200 focus:outline-none focus:border-amber-500 font-amiri leading-relaxed"
                />

                <input
                  type="text"
                  value={editingInv.verseSource || ''}
                  onChange={(e) => setEditingInv({ ...editingInv, verseSource: e.target.value })}
                  placeholder="المصدر (مثال: سورة الروم - آية ٢١)"
                  className="w-full px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-[11px] text-neutral-400 focus:outline-none"
                />
              </div>

              {/* 6. Date, Time & Venue */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">
                    تاريخ ووقت المناسبة (ISO)
                  </label>
                  <input
                    type="datetime-local"
                    value={editingInv.eventDate?.slice(0, 16) || '2026-11-20T20:00'}
                    onChange={(e) => setEditingInv({ ...editingInv, eventDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-200 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">
                    التاريخ الهجري
                  </label>
                  <input
                    type="text"
                    value={editingInv.eventDateHijri || ''}
                    onChange={(e) => setEditingInv({ ...editingInv, eventDateHijri: e.target.value })}
                    placeholder="١١ جمادى الأولى ١٤٤٨ هـ"
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-200 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">
                    اليوم والوقت المنسق
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={editingInv.dayOfWeek || ''}
                      onChange={(e) => setEditingInv({ ...editingInv, dayOfWeek: e.target.value })}
                      placeholder="الجمعة"
                      className="px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-200 focus:outline-none"
                    />
                    <input
                      type="text"
                      value={editingInv.timeFormatted || ''}
                      onChange={(e) => setEditingInv({ ...editingInv, timeFormatted: e.target.value })}
                      placeholder="الساعة ٨:٠٠ م"
                      className="px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-200 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">
                    اسم القاعة والمدينة
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={editingInv.venueName || ''}
                      onChange={(e) => setEditingInv({ ...editingInv, venueName: e.target.value })}
                      placeholder="قصر الثريا"
                      className="px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-200 focus:outline-none"
                    />
                    <input
                      type="text"
                      value={editingInv.venueCity || ''}
                      onChange={(e) => setEditingInv({ ...editingInv, venueCity: e.target.value })}
                      placeholder="الرياض"
                      className="px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-200 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1">
                  رابط خرائط Google المباشر
                </label>
                <input
                  type="text"
                  value={editingInv.googleMapsUrl || ''}
                  onChange={(e) => setEditingInv({ ...editingInv, googleMapsUrl: e.target.value })}
                  placeholder="https://maps.google.com/?q=..."
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs font-mono text-neutral-200 focus:outline-none"
                />
              </div>

              {/* 7. Section Feature Toggles */}
              <div className="p-4 rounded-2xl bg-neutral-950/70 border border-neutral-800 space-y-3">
                <div className="text-xs font-bold text-amber-300 font-cairo flex items-center gap-1.5">
                  <Sliders className="w-4 h-4" />
                  <span>تفعيل وتعطيل الأقسام التفاعلية (Section Toggles)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {[
                    { key: 'showCountdown', label: 'العداد التنازلي المباشر' },
                    { key: 'showCalendar', label: 'أزرار حفظ التقويم (Google / Apple)' },
                    { key: 'showLocation', label: 'بطاقة المكان وخريطة Google' },
                    { key: 'showRsvp', label: 'زر تأكيد الحضور (RSVP) والعداد' },
                    { key: 'showChildrenAdvisory', label: 'تنويه الأطفال ("جنة الأطفال منازلهم")' },
                    { key: 'showDressCode', label: 'الزي المعتمد (Dress Code)' },
                    { key: 'showTimeline', label: 'برنامج ومراسم الحفل (Timeline)' },
                    { key: 'showMusic', label: 'مشغل الموسيقى الخلفية الهادئة' },
                  ].map((item) => (
                    <label
                      key={item.key}
                      className="flex items-center gap-2.5 p-2 rounded-xl bg-neutral-900 border border-neutral-800 cursor-pointer text-xs font-tajawal text-neutral-300 hover:border-neutral-700"
                    >
                      <input
                        type="checkbox"
                        checked={Boolean(editingInv.toggles?.[item.key as keyof typeof editingInv.toggles])}
                        onChange={(e) =>
                          setEditingInv({
                            ...editingInv,
                            toggles: {
                              ...editingInv.toggles!,
                              [item.key]: e.target.checked,
                            },
                          })
                        }
                        className="w-4 h-4 rounded text-amber-500 bg-neutral-950 border-neutral-700 focus:ring-0"
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>

                {/* Sub-inputs for toggled sections */}
                {editingInv.toggles?.showChildrenAdvisory && (
                  <div className="mt-2">
                    <label className="block text-[11px] text-neutral-400 mb-1">
                      نص تنويه الأطفال:
                    </label>
                    <input
                      type="text"
                      value={editingInv.toggles?.childrenAdvisoryText || ''}
                      onChange={(e) =>
                        setEditingInv({
                          ...editingInv,
                          toggles: {
                            ...editingInv.toggles!,
                            childrenAdvisoryText: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-neutral-200"
                    />
                  </div>
                )}

                {editingInv.toggles?.showDressCode && (
                  <div className="mt-2">
                    <label className="block text-[11px] text-neutral-400 mb-1">
                      الزي الرسمي المطلوب:
                    </label>
                    <input
                      type="text"
                      value={editingInv.toggles?.dressCodeText || ''}
                      onChange={(e) =>
                        setEditingInv({
                          ...editingInv,
                          toggles: {
                            ...editingInv.toggles!,
                            dressCodeText: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-neutral-200"
                    />
                  </div>
                )}
              </div>

              {/* 8. Background Media Customization (AI Image / Slow-Motion Loop Video) */}
              <div className="p-4 rounded-2xl bg-neutral-950/70 border border-neutral-800 space-y-3">
                <div className="text-xs font-bold text-amber-300 font-cairo flex items-center gap-1.5">
                  <Video className="w-4 h-4" />
                  <span>خلفية كرت الدعوة (فيديو سلو موشن أو صورة ذكاء اصطناعي)</span>
                </div>
                <p className="text-[11px] text-neutral-400 font-tajawal">
                  يتم تطبيق فيديو سلو موشن سلس وصورة ذكاء اصطناعي مخصصة افتراضياً لكل قالب مع تدرج حماية للقراءة. يمكنك تخصيص الرابط إذا رغبت:
                </p>

                <div className="space-y-2">
                  <div>
                    <label className="block text-[11px] text-neutral-300 mb-1">
                      رابط فيديو سلو موشن لوب (MP4 / WebM):
                    </label>
                    <input
                      type="text"
                      value={editingInv.customVideoUrl || ''}
                      onChange={(e) => setEditingInv({ ...editingInv, customVideoUrl: e.target.value })}
                      placeholder="https://...mp4 (اتركه فارغاً للاعتماد على فيديو القالب السلس الافتراضي)"
                      className="w-full px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-neutral-200 font-mono focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-neutral-300 mb-1">
                      رابط صورة الذكاء الاصطناعي البديلة (Poster Image):
                    </label>
                    <input
                      type="text"
                      value={editingInv.customImageUrl || ''}
                      onChange={(e) => setEditingInv({ ...editingInv, customImageUrl: e.target.value })}
                      placeholder="/images/backgrounds/bg_classic_arch.jpg (أو رابط خارجي)"
                      className="w-full px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-neutral-200 font-mono focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* 9. Event Timeline Items Manager */}
              <div className="p-4 rounded-2xl bg-neutral-950/70 border border-neutral-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-300 font-cairo">
                    مراسم وبرنامج الحفل (Timeline)
                  </span>
                  <button
                    type="button"
                    onClick={handleAddTimelineItem}
                    className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-tajawal"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>إضافة فقرة</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {(editingInv.timeline || []).map((tl, index) => (
                    <div key={tl.id || index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={tl.time}
                        onChange={(e) => {
                          const updated = [...(editingInv.timeline || [])];
                          updated[index].time = e.target.value;
                          setEditingInv({ ...editingInv, timeline: updated });
                        }}
                        placeholder="الوقت"
                        className="w-24 px-2 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-neutral-200 text-center"
                      />
                      <input
                        type="text"
                        value={tl.label}
                        onChange={(e) => {
                          const updated = [...(editingInv.timeline || [])];
                          updated[index].label = e.target.value;
                          setEditingInv({ ...editingInv, timeline: updated });
                        }}
                        placeholder="اسم الفقرة (مثال: الزفة المباركة)"
                        className="flex-1 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-neutral-200"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteTimelineItem(tl.id)}
                        className="p-1.5 text-neutral-500 hover:text-rose-400"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Drawer Actions */}
            <div className="pt-6 border-t border-neutral-800 flex items-center justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => setIsEditorOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs sm:text-sm font-bold font-cairo"
              >
                إلغاء
              </button>
              <button
                type="button"
                onClick={handleSaveInvitation}
                disabled={isSaving}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-neutral-950 text-xs sm:text-sm font-bold font-cairo shadow-lg shadow-amber-500/20"
              >
                {isSaving ? 'جاري الحفظ...' : 'حفظ ونشر الدعوة'}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
