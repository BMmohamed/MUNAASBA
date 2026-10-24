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
  Image as ImageIcon,
  Type,
  Palette,
  Smartphone,
  Database,
  Crown,
  Globe,
  EyeOff,
  Loader2,
  MessageCircle,
} from 'lucide-react';
import { InvitationData, InvitationTemplateId, TimelineItem } from '@/types/invitation';
import { TemplateRenderer } from '@/components/templates/TemplateRenderer';
import { QURANIC_AND_POETIC_PRESETS } from '@/lib/constants';
import { toArabicNumerals } from '@/lib/date-utils';

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passcode, setPasscode] = useState<string>('');
  const [authError, setAuthError] = useState<string | null>(null);

  const [invitations, setInvitations] = useState<InvitationData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [updatingPrivacyId, setUpdatingPrivacyId] = useState<string | null>(null);

  // Editor Modal State
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [editingInv, setEditingInv] = useState<Partial<InvitationData> | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [editorTab, setEditorTab] = useState<'editor' | 'preview'>('editor');

  // Supabase Database Connection State
  const [dbStatus, setDbStatus] = useState<{
    configured: boolean;
    connected: boolean;
    message: string;
    invitationsCount?: number;
  } | null>(null);
  const [isCheckingDb, setIsCheckingDb] = useState<boolean>(false);
  const [isDbModalOpen, setIsDbModalOpen] = useState<boolean>(false);

  // Load passcode from sessionStorage if already unlocked
  useEffect(() => {
    const saved = sessionStorage.getItem('munaasaba_admin_pass');
    if (saved === 'Noor1234') {
      setIsAuthenticated(true);
    }
  }, []);

  const checkDbStatus = async () => {
    setIsCheckingDb(true);
    try {
      const res = await fetch('/api/supabase/status');
      const data = await res.json();
      setDbStatus(data);
    } catch {
      setDbStatus({
        configured: false,
        connected: false,
        message: 'تعذر الاتصال بمسار فحص قاعدة البيانات',
      });
    } finally {
      setIsCheckingDb(false);
    }
  };

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
      checkDbStatus();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'Noor1234') {
      sessionStorage.setItem('munaasaba_admin_pass', 'Noor1234');
      setIsAuthenticated(true);
      setAuthError(null);
    } else {
      setAuthError('كلمة المرور غير صحيحة. يرجى إدخال رمز المرور الصحيح.');
    }
  };

  const handleCopyLink = (slug: string, type: 'guest' | 'host' = 'guest', inv?: InvitationData) => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const vParam = inv?.updatedAt ? `?v=${new Date(inv.updatedAt).getTime().toString(36)}` : '';
    const url = type === 'host' ? `${origin}/d/${slug}?view=host` : `${origin}/d/${slug}${vParam}`;
    navigator.clipboard.writeText(url);
    const key = `${slug}-${type}`;
    setCopiedSlug(key);
    setTimeout(() => setCopiedSlug(null), 3000);
    showToast(
      type === 'host'
        ? 'تم نسخ رابط أهل العرس (المزود بعداد الحضور المباشر) 👑'
        : 'تم نسخ رابط المعازيم (كرت الدعوة بدون عداد) 💌'
    );
  };

  const handleCopyWhatsAppMessage = (inv: InvitationData) => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const vParam = inv.updatedAt ? `?v=${new Date(inv.updatedAt).getTime().toString(36)}` : '';
    const url = `${origin}/d/${inv.slug}${vParam}`;
    const venueDisplay = [inv.venueName, inv.venueCity].filter(Boolean).join(' - ');
    const text = `✨ *دعوة خاصة لحضور ${inv.eventTitle}* ✨

"وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً"

يتشرف أهل العروسين بدعوتكم الكريمة لمشاركتهم الفرحة والسرور بمناسبة حفل زفاف:
💍 *${inv.groomName} & ${inv.brideName}* 💍

📅 *الموعد:* ${inv.dayOfWeek} ${inv.eventDateHijri ? `(${inv.eventDateHijri})` : ''}
⏰ *الوقت:* ${inv.timeFormatted}
📍 *المكان:* ${venueDisplay}

يسعدنا ويشرفنا حضوركم ومشاركتكم فرحتنا، لمشاهدة بطاقة الدعوة وتأكيد الحضور (RSVP) تفضلوا بالدخول عبر الرابط:
${url}`;

    navigator.clipboard.writeText(text);
    const key = `${inv.slug}-wa`;
    setCopiedSlug(key);
    setTimeout(() => setCopiedSlug(null), 3000);
    showToast('تم نسخ نص رسالة الواتساب الجاهزة مع الرابط للمشاركة 📲');
  };

  // Toggle privacy directly from dashboard table without opening modal
  const handleTogglePrivacy = async (inv: InvitationData) => {
    const currentIsPublic = inv.isPublic !== false;
    const nextIsPublic = !currentIsPublic;
    setUpdatingPrivacyId(inv.id);

    // Optimistic UI update
    setInvitations((prev) =>
      prev.map((item) =>
        item.id === inv.id
          ? {
              ...item,
              isPublic: nextIsPublic,
              toggles: { ...(item.toggles || {}), isPublic: nextIsPublic },
            }
          : item
      )
    );

    try {
      const res = await fetch('/api/invitations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: inv.id,
          isPublic: nextIsPublic,
          toggles: {
            ...(inv.toggles || {}),
            isPublic: nextIsPublic,
          },
        }),
      });
      const data = await res.json();
      if (data.success && data.invitation) {
        setInvitations((prev) =>
          prev.map((item) => (item.id === inv.id ? data.invitation : item))
        );
        showToast(
          nextIsPublic
            ? 'تم تحويل الدعوة إلى: عامة في الموقع 🟢 (تظهر في الرئيسية)'
            : 'تم تحويل الدعوة إلى: خاصة وسرية 🔒 (مخفية عن الرئيسية)'
        );
      } else {
        throw new Error(data.error || 'فشل التحديث');
      }
    } catch {
      // Rollback on error
      setInvitations((prev) =>
        prev.map((item) => (item.id === inv.id ? inv : item))
      );
      showToast('تعذر تغيير وضع الخصوصية');
    } finally {
      setUpdatingPrivacyId(null);
    }
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
      isPublic: true,
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
        showVerse: true,
        showParents: true,
        showShare: true,
        musicUrl: 'https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3',
      },
      typography: {
        namesFontFamily: 'ruqaa',
        verseFontFamily: 'amiri',
        parentsFontFamily: 'tajawal',
        namesSize: 'xlarge',
        verseSize: 'medium',
        parentsSize: 'medium',
        namesColor: '#fde047',
        verseColor: '#fef3c7',
        parentsColor: '#ffffff',
        welcomeColor: '#fef3c7',
        timelineColor: '#fef3c7',
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
    const cloned = JSON.parse(JSON.stringify(inv));
    if (!cloned.typography) {
      cloned.typography = {
        namesFontFamily: 'ruqaa',
        verseFontFamily: 'amiri',
        parentsFontFamily: 'tajawal',
        namesSize: 'xlarge',
        verseSize: 'medium',
        parentsSize: 'medium',
        namesColor: '#fde047',
        verseColor: '#fef3c7',
        parentsColor: '#ffffff',
        welcomeColor: '#fef3c7',
        timelineColor: '#fef3c7',
      };
    }
    if (!cloned.typography.timelineColor) {
      cloned.typography.timelineColor = '#fef3c7';
    }
    if (!cloned.typography.namesFontFamily) cloned.typography.namesFontFamily = 'ruqaa';
    if (!cloned.typography.verseFontFamily) cloned.typography.verseFontFamily = 'amiri';
    if (!cloned.typography.parentsFontFamily) cloned.typography.parentsFontFamily = 'tajawal';
    if (cloned.toggles.showVerse === undefined) cloned.toggles.showVerse = true;
    if (cloned.toggles.showParents === undefined) cloned.toggles.showParents = true;
    if (cloned.toggles.showShare === undefined) cloned.toggles.showShare = true;
    if (cloned.isPublic === undefined) cloned.isPublic = true;
    if (cloned.venueAddress === undefined) cloned.venueAddress = '';
    if (cloned.venueHall === undefined) cloned.venueHall = '';
    setEditingInv(cloned);
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
                placeholder="أدخل رمز المرور السري"
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

  // Real-time complete invitation object for live preview card
  const previewInvitation: InvitationData | null = editingInv
    ? {
        id: editingInv.id || 'preview-id',
        slug: editingInv.slug || 'preview-slug',
        templateId: (editingInv.templateId as InvitationTemplateId) || 'template-1',
        title: editingInv.title || 'معاينة الدعوة',
        eventTitle: editingInv.eventTitle || 'حفل زفاف مبارك',
        groomName: editingInv.groomName || 'اسم العريس',
        brideName: editingInv.brideName || 'اسم العروس',
        groomParents: editingInv.groomParents || 'أهل العريس الكرام',
        brideParents: editingInv.brideParents || 'أهل العروس الكرام',
        eventDate: editingInv.eventDate || '2026-12-01T20:00:00',
        eventDateHijri: editingInv.eventDateHijri || '١ رجب ١٤٤٨ هـ',
        dayOfWeek: editingInv.dayOfWeek || 'الجمعة',
        timeFormatted: editingInv.timeFormatted || 'الساعة ٨:٠٠ مساءً',
        venueName: editingInv.venueName || 'قصر الاحتفالات الملكي',
        venueHall: editingInv.venueHall !== undefined ? editingInv.venueHall : '',
        venueCity: editingInv.venueCity || 'الرياض',
        venueAddress: editingInv.venueAddress !== undefined ? editingInv.venueAddress : '',
        googleMapsUrl: editingInv.googleMapsUrl || 'https://maps.google.com',
        headerVerse:
          editingInv.headerVerse ||
          'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً',
        verseSource: editingInv.verseSource || 'سورة الروم',
        welcomeMessage:
          editingInv.welcomeMessage ||
          'يتشرفون بدعوتكم لحضور حفل الزفاف المبارك ومشاركتهم الفرحة والسرور.',
        rsvpCount: editingInv.rsvpCount ?? 0,
        rsvpDeviceList: editingInv.rsvpDeviceList || [],
        toggles: {
          showCountdown: editingInv.toggles?.showCountdown ?? true,
          showCalendar: editingInv.toggles?.showCalendar ?? true,
          showLocation: editingInv.toggles?.showLocation ?? true,
          showRsvp: editingInv.toggles?.showRsvp ?? true,
          showChildrenAdvisory: editingInv.toggles?.showChildrenAdvisory ?? true,
          childrenAdvisoryText:
            editingInv.toggles?.childrenAdvisoryText ||
            'جنة الأطفال منازلهم.. نعتذر عن استقبال الأطفال لمشاركتنا فرحة هادئة.',
          showDressCode: editingInv.toggles?.showDressCode ?? true,
          dressCodeText: editingInv.toggles?.dressCodeText || 'الزي الرسمي السعودي (ثوب وبشت)',
          showTimeline: editingInv.toggles?.showTimeline ?? true,
          showMusic: editingInv.toggles?.showMusic ?? true,
          musicUrl: editingInv.toggles?.musicUrl || '',
          showVerse: editingInv.toggles?.showVerse ?? true,
          showParents: editingInv.toggles?.showParents ?? true,
          showShare: editingInv.toggles?.showShare ?? true,
        },
        timeline:
          editingInv.timeline && editingInv.timeline.length > 0
            ? editingInv.timeline
            : [
                { id: 't1', time: '٠٨:٠٠ م', label: 'استقبال الضيوف الكرام', icon: 'coffee' },
                { id: 't2', time: '٠٩:٣٠ م', label: 'مراسم الزفة المباركة', icon: 'ring' },
                { id: 't3', time: '١٠:٣٠ م', label: 'تناول طعام العشاء الفاخر', icon: 'dinner' },
              ],
        typography: {
          namesFontFamily: editingInv.typography?.namesFontFamily || 'ruqaa',
          verseFontFamily: editingInv.typography?.verseFontFamily || 'amiri',
          parentsFontFamily: editingInv.typography?.parentsFontFamily || 'tajawal',
          namesSize: editingInv.typography?.namesSize || 'xlarge',
          verseSize: editingInv.typography?.verseSize || 'medium',
          parentsSize: editingInv.typography?.parentsSize || 'medium',
          namesColor: editingInv.typography?.namesColor || '#fde047',
          verseColor: editingInv.typography?.verseColor || '#fef3c7',
          parentsColor: editingInv.typography?.parentsColor || '#ffffff',
          welcomeColor: editingInv.typography?.welcomeColor || '#fef3c7',
          timelineColor: editingInv.typography?.timelineColor || '#fef3c7',
        },
        themeAccentColor: editingInv.themeAccentColor || '#d4af37',
        customImageUrl: editingInv.customImageUrl || '',
        customVideoUrl: editingInv.customVideoUrl || '',
        createdAt: editingInv.createdAt || new Date().toISOString(),
        updatedAt: editingInv.updatedAt || new Date().toISOString(),
      }
    : null;

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
              onClick={() => setIsDbModalOpen(true)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-tajawal transition-all cursor-pointer ${
                dbStatus?.connected
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
                  : 'bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20'
              }`}
              title="إعدادات وقاعدة بيانات Supabase"
            >
              <Database className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {dbStatus?.connected
                  ? 'متصل بـ Supabase 🟢'
                  : dbStatus?.configured
                  ? 'فحص اتصال Supabase 🟡'
                  : 'الربط بـ Supabase ⚪'}
              </span>
              <span className="sm:hidden">
                {dbStatus?.connected ? '🟢 متصل' : '⚪ Supabase'}
              </span>
            </button>

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
                    <th className="py-4 px-6 text-center">الظهور</th>
                    <th className="py-4 px-6 text-center">حضور مؤكد (RSVP)</th>
                    <th className="py-4 px-6 text-center">روابط الدعوة والمشاركة</th>
                    <th className="py-4 px-6 text-center">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60 font-tajawal">
                  {invitations.map((inv) => {
                    const tmpl = templateNames[inv.templateId] || templateNames['template-1'];
                    const isPublic = inv.isPublic !== false;
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

                        {/* Interactive Privacy Toggle Button */}
                        <td className="py-4 px-6 text-center">
                          <button
                            type="button"
                            onClick={() => handleTogglePrivacy(inv)}
                            disabled={updatingPrivacyId === inv.id}
                            title={
                              isPublic
                                ? 'الدعوة عامة ومعروضة في الواجهة الرئيسية. انقر للتحويل إلى خاصة وسرية 🔒'
                                : 'الدعوة خاصة وسرية ولا تظهر في الواجهة الرئيسية. انقر للتحويل إلى عامة 🟢'
                            }
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border shadow-sm cursor-pointer hover:scale-105 active:scale-95 ${
                              isPublic
                                ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/25 hover:border-emerald-500/50'
                                : 'bg-amber-500/15 text-amber-400 border-amber-500/30 hover:bg-amber-500/25 hover:border-amber-500/50'
                            }`}
                          >
                            {updatingPrivacyId === inv.id ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin text-neutral-400" />
                            ) : isPublic ? (
                              <>
                                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                                <span>عامة بالموقع 🟢</span>
                              </>
                            ) : (
                              <>
                                <Lock className="w-3.5 h-3.5 text-amber-400" />
                                <span>خاصة وسرية 🔒</span>
                              </>
                            )}
                          </button>
                        </td>

                        {/* RSVP Counter Badge */}
                        <td className="py-4 px-6 text-center">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold font-cairo text-xs">
                            <Users className="w-3.5 h-3.5" />
                            <span>{toArabicNumerals(inv.rsvpCount)} ضيف</span>
                          </span>
                        </td>

                        {/* Dual Links (Guest vs Host) */}
                        <td className="py-4 px-6 text-center">
                          <div className="flex flex-col gap-1.5 items-stretch min-w-[210px]">
                            {/* Guest Link (No counter) */}
                            <button
                              type="button"
                              onClick={() => handleCopyLink(inv.slug, 'guest', inv)}
                              title="نسخ رابط المعازيم (كرت الدعوة بدون عداد الحضور)"
                              className="px-2.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs flex items-center justify-between gap-2 transition-all border border-neutral-700 cursor-pointer"
                            >
                              <span className="flex items-center gap-1.5 text-[11px] font-cairo">
                                <Copy className="w-3.5 h-3.5 text-amber-400" />
                                <span>رابط المعازيم (بدون عداد)</span>
                              </span>
                              {copiedSlug === `${inv.slug}-guest` ? (
                                <span className="text-emerald-400 font-bold text-[10px]">✓ نُسخ</span>
                              ) : (
                                <span className="text-[10px] text-neutral-400 font-mono">/d/{inv.slug}</span>
                              )}
                            </button>

                            {/* Host Link (With live counter) */}
                            <button
                              type="button"
                              onClick={() => handleCopyLink(inv.slug, 'host')}
                              title="نسخ رابط أهل العرس (مزود بعداد الحضور المباشر)"
                              className="px-2.5 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs flex items-center justify-between gap-2 transition-all border border-amber-500/30 cursor-pointer"
                            >
                              <span className="flex items-center gap-1.5 text-[11px] font-cairo font-bold">
                                <Crown className="w-3.5 h-3.5 text-amber-400" />
                                <span>رابط أهل العرس (مع العداد)</span>
                              </span>
                              {copiedSlug === `${inv.slug}-host` ? (
                                <span className="text-emerald-400 font-bold text-[10px]">✓ نُسخ</span>
                              ) : (
                                <span className="text-[10px] text-amber-400/70 font-mono">?view=host</span>
                              )}
                            </button>

                            {/* WhatsApp Ready-to-Send Message */}
                            <button
                              type="button"
                              onClick={() => handleCopyWhatsAppMessage(inv)}
                              title="نسخ رسالة واتساب جاهزة مزودة بنص الدعوة وتفاصيل العروسين والرابط"
                              className="px-2.5 py-1.5 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 text-xs flex items-center justify-between gap-2 transition-all border border-emerald-500/30 cursor-pointer"
                            >
                              <span className="flex items-center gap-1.5 text-[11px] font-cairo font-bold">
                                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                                <span>رسالة واتساب جاهزة</span>
                              </span>
                              {copiedSlug === `${inv.slug}-wa` ? (
                                <span className="text-emerald-400 font-bold text-[10px]">✓ نُسخت الرسالة</span>
                              ) : (
                                <span className="text-[10px] text-emerald-400/70 font-mono">WhatsApp 📲</span>
                              )}
                            </button>
                          </div>
                        </td>

                        {/* Actions (Edit / Preview / Reset RSVP) */}
                        <td className="py-4 px-6 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              type="button"
                              onClick={() => openEditModal(inv)}
                              title="تعديل وتخصيص بيانات الدعوة والقالب"
                              className="p-2 rounded-xl bg-neutral-800 hover:bg-amber-500/20 text-neutral-300 hover:text-amber-400 border border-neutral-700 hover:border-amber-500/40 transition-all cursor-pointer"
                            >
                              <Edit className="w-4 h-4" />
                            </button>

                            <a
                              href={`/d/${inv.slug}`}
                              target="_blank"
                              rel="noreferrer"
                              title="معاينة كرت الدعوة في تبويب جديد"
                              className="p-2 rounded-xl bg-neutral-800 hover:bg-blue-500/20 text-neutral-300 hover:text-blue-400 border border-neutral-700 hover:border-blue-500/40 transition-all cursor-pointer inline-flex items-center justify-center"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>

                            <button
                              type="button"
                              onClick={() => handleResetRsvp(inv.slug, inv.id)}
                              title="إعادة ضبط عداد الحضور إلى ٠"
                              className="p-2 rounded-xl bg-neutral-800 hover:bg-rose-500/20 text-neutral-300 hover:text-rose-400 border border-neutral-700 hover:border-rose-500/40 transition-all cursor-pointer"
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

      {/* Create / Edit Customizer Studio Modal with Live Center Card Preview */}
      {isEditorOpen && editingInv && previewInvitation && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col animate-fadeIn overflow-hidden">
          
          {/* Studio Top Header Bar */}
          <header className="h-16 px-4 sm:px-6 bg-neutral-950/95 border-b border-neutral-800 flex items-center justify-between shrink-0 z-30 shadow-lg" dir="rtl">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-neutral-100 font-cairo flex items-center gap-2">
                  <span>{editingInv.id ? 'استوديو تخصيص الدعوة' : 'استوديو تصميم دعوة جديدة'}</span>
                  <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-tajawal bg-amber-500/15 text-amber-300 border border-amber-500/30">
                    {editingInv.templateId === 'template-1' && 'قالب باب الفرح الملكي'}
                    {editingInv.templateId === 'template-2' && 'قالب المودرن البسيط'}
                    {editingInv.templateId === 'template-3' && 'قالب الورود الملكية'}
                    {editingInv.templateId === 'template-4' && 'قالب ليلة العمر'}
                    {editingInv.templateId === 'template-5' && 'قالب التراث الأصيل'}
                  </span>
                </h3>
                <p className="text-[11px] text-neutral-400 font-tajawal hidden md:block">
                  عدّل خيارات الدعوة على اليسار، وتنعكس مباشرة على الكارت التفاعلي في المنتصف
                </p>
              </div>
            </div>

            {/* Mobile / Tablet View Switcher (Under xl screens) */}
            <div className="flex xl:hidden items-center bg-neutral-900 p-1 rounded-xl border border-neutral-800">
              <button
                type="button"
                onClick={() => setEditorTab('editor')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-cairo font-bold transition-all ${
                  editorTab === 'editor'
                    ? 'bg-amber-500 text-neutral-950 shadow'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>البيانات والتعديل</span>
              </button>
              <button
                type="button"
                onClick={() => setEditorTab('preview')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-cairo font-bold transition-all ${
                  editorTab === 'preview'
                    ? 'bg-amber-500 text-neutral-950 shadow'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>معاينة الكارت</span>
              </button>
            </div>

            {/* Studio Header Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => setIsEditorOpen(false)}
                className="px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200 text-xs font-cairo font-medium transition-colors"
              >
                إلغاء
              </button>
              <button
                type="button"
                onClick={handleSaveInvitation}
                disabled={isSaving}
                className="flex items-center gap-2 px-4 sm:px-5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-neutral-950 text-xs sm:text-sm font-bold font-cairo shadow-lg shadow-amber-500/20 disabled:opacity-60 transition-all"
              >
                <Check className="w-4 h-4" />
                <span>{isSaving ? 'جاري الحفظ...' : 'حفظ ونشر الدعوة'}</span>
              </button>
              <button
                type="button"
                onClick={() => setIsEditorOpen(false)}
                className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 transition-colors"
                title="إغلاق"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </header>

          {/* Main Studio Split Layout: Form on Left + Preview Card in Center/Right */}
          <div className="flex-1 flex flex-col xl:flex-row overflow-hidden relative" dir="ltr">
            
            {/* Form Settings Panel (On the Left) */}
            <div
              className={`w-full xl:w-[540px] 2xl:w-[600px] shrink-0 border-r border-neutral-800 bg-neutral-900/95 overflow-y-auto p-5 sm:p-7 space-y-6 transition-all shadow-xl z-10 ${
                editorTab === 'editor' ? 'block' : 'hidden xl:block'
              }`}
              dir="rtl"
            >
              <div className="space-y-6">

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

              {/* Privacy Setting & Dual Links Helper */}
              <div className="p-3.5 rounded-2xl bg-neutral-950/80 border border-neutral-800 space-y-2.5">
                <label className="block text-xs font-bold text-amber-300 font-cairo">
                  ظهور وخصوصية الدعوة:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingInv({ ...editingInv, isPublic: true })}
                    className={`p-2.5 rounded-xl border text-right transition-all cursor-pointer ${
                      editingInv.isPublic !== false
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300 font-bold'
                        : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <div className="text-xs flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-emerald-400" />
                      <span>دعوة عامة</span>
                    </div>
                    <div className="text-[10px] text-neutral-400 mt-0.5 font-tajawal">تظهر في الرئيسية والمعرض</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setEditingInv({ ...editingInv, isPublic: false })}
                    className={`p-2.5 rounded-xl border text-right transition-all cursor-pointer ${
                      editingInv.isPublic === false
                        ? 'border-amber-500 bg-amber-500/10 text-amber-300 font-bold'
                        : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <div className="text-xs flex items-center gap-1.5">
                      <EyeOff className="w-3.5 h-3.5 text-amber-400" />
                      <span>دعوة خاصة</span>
                    </div>
                    <div className="text-[10px] text-neutral-400 mt-0.5 font-tajawal">برابط فقط ولا تظهر بالرئيسية</div>
                  </button>
                </div>

                {/* Dual links info */}
                <div className="pt-2 border-t border-neutral-800/80 space-y-1.5 text-xs font-tajawal">
                  <div className="flex items-center justify-between bg-neutral-900 p-2 rounded-xl border border-neutral-800">
                    <div className="flex items-center gap-1.5 text-neutral-300">
                      <Copy className="w-3.5 h-3.5 text-amber-400" />
                      <span className="font-bold">رابط المعازيم:</span>
                      <span className="text-[11px] text-neutral-400 font-mono">/d/{editingInv.slug || 'slug'}</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">بدون عداد الحضور</span>
                  </div>

                  <div className="flex items-center justify-between bg-amber-500/5 p-2 rounded-xl border border-amber-500/20">
                    <div className="flex items-center gap-1.5 text-amber-300">
                      <Crown className="w-3.5 h-3.5 text-amber-400" />
                      <span className="font-bold">رابط أهل العرس:</span>
                      <span className="text-[11px] text-amber-400/80 font-mono">/d/{editingInv.slug || 'slug'}?view=host</span>
                    </div>
                    <span className="text-[10px] text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded">مع العداد المباشر</span>
                  </div>
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
                      placeholder="قصر الاحتفالات"
                      className="px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-200 focus:outline-none focus:border-amber-500"
                    />
                    <input
                      type="text"
                      value={editingInv.venueCity || ''}
                      onChange={(e) => setEditingInv({ ...editingInv, venueCity: e.target.value })}
                      placeholder="الرياض"
                      className="px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-200 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* Sub-hall and Street / Detailed Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">
                    اسم الصالة / القاعة الفرعية (اختياري)
                  </label>
                  <input
                    type="text"
                    value={editingInv.venueHall !== undefined ? editingInv.venueHall : ''}
                    onChange={(e) => setEditingInv({ ...editingInv, venueHall: e.target.value })}
                    placeholder="مثال: القاعة الكبرى (امسحه لحذفه)"
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-200 focus:outline-none focus:border-amber-500 font-tajawal"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">
                    العنوان التفصيلي / الشارع (مثل: طريق الملك فهد - امسحه لحذفه)
                  </label>
                  <input
                    type="text"
                    value={editingInv.venueAddress !== undefined ? editingInv.venueAddress : ''}
                    onChange={(e) => setEditingInv({ ...editingInv, venueAddress: e.target.value })}
                    placeholder="مثال: طريق الملك فهد (امسح الحقل بالكامل لإخفائه نهائياً)"
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-200 focus:outline-none focus:border-amber-500 font-tajawal"
                  />
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
                    { key: 'showVerse', label: 'الآية القرآنية أو النص الشعري' },
                    { key: 'showParents', label: 'إعلان الداعين (الأبوين والترحيب)' },
                    { key: 'showCountdown', label: 'العداد التنازلي المباشر' },
                    { key: 'showCalendar', label: 'أزرار حفظ التقويم (Google / Apple)' },
                    { key: 'showLocation', label: 'بطاقة المكان وخريطة Google' },
                    { key: 'showRsvp', label: 'زر تأكيد الحضور (RSVP) والعداد' },
                    { key: 'showShare', label: 'زر مشاركة الدعوة (WhatsApp / رابط)' },
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

              {/* 8. Typography, Font Sizes & Colors Control */}
              <div className="p-4 rounded-2xl bg-neutral-950/70 border border-neutral-800 space-y-4">
                <div className="text-xs font-bold text-amber-300 font-cairo flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Type className="w-4 h-4 text-amber-400" />
                    <span>تخصيص الخطوط والأحجام والألوان (Typography & Colors)</span>
                  </div>
                  <span className="text-[10px] font-tajawal text-neutral-400">تحكم كامل بالنصوص والخطوط</span>
                </div>

                {/* Sub-section A: Font Families */}
                <div className="space-y-3 pt-1">
                  <div className="text-[11px] font-bold text-neutral-300 font-cairo">
                    ١. نوع الخطوط العربية (Font Families)
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Groom & Bride Font */}
                    <div>
                      <label className="block text-[11px] text-neutral-400 mb-1">
                        خط أسماء العروسين:
                      </label>
                      <select
                        value={editingInv.typography?.namesFontFamily || 'ruqaa'}
                        onChange={(e) =>
                          setEditingInv({
                            ...editingInv,
                            typography: {
                              ...editingInv.typography,
                              namesFontFamily: e.target.value as any,
                            },
                          })
                        }
                        className="w-full px-2.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-200 focus:outline-none focus:border-amber-500 font-cairo"
                      >
                        <option value="ruqaa">خط الرقعة الفاخر (ملكي أصيل)</option>
                        <option value="amiri">خط الأميري (النسخي الكلاسيكي)</option>
                        <option value="cairo">خط كايرو (عصري بارز)</option>
                        <option value="tajawal">خط تجوال (هادئ وناعم)</option>
                      </select>
                    </div>

                    {/* Verse Font */}
                    <div>
                      <label className="block text-[11px] text-neutral-400 mb-1">
                        خط الآية / النص الشعري:
                      </label>
                      <select
                        value={editingInv.typography?.verseFontFamily || 'amiri'}
                        onChange={(e) =>
                          setEditingInv({
                            ...editingInv,
                            typography: {
                              ...editingInv.typography,
                              verseFontFamily: e.target.value as any,
                            },
                          })
                        }
                        className="w-full px-2.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-200 focus:outline-none focus:border-amber-500 font-cairo"
                      >
                        <option value="amiri">خط الأميري القرآني</option>
                        <option value="ruqaa">خط الرقعة العربي</option>
                        <option value="cairo">خط كايرو العصري</option>
                        <option value="tajawal">خط تجوال الأنيق</option>
                      </select>
                    </div>

                    {/* Parents Font */}
                    <div>
                      <label className="block text-[11px] text-neutral-400 mb-1">
                        خط إعلان الأبوين والترحيب:
                      </label>
                      <select
                        value={editingInv.typography?.parentsFontFamily || 'tajawal'}
                        onChange={(e) =>
                          setEditingInv({
                            ...editingInv,
                            typography: {
                              ...editingInv.typography,
                              parentsFontFamily: e.target.value as any,
                            },
                          })
                        }
                        className="w-full px-2.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-200 focus:outline-none focus:border-amber-500 font-cairo"
                      >
                        <option value="tajawal">خط تجوال الواضح</option>
                        <option value="cairo">خط كايرو البارز</option>
                        <option value="amiri">خط الأميري الكلاسيكي</option>
                        <option value="ruqaa">خط الرقعة</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Sub-section B: Font Sizes */}
                <div className="space-y-3 pt-2 border-t border-neutral-800/80">
                  <div className="text-[11px] font-bold text-neutral-300 font-cairo">
                    ٢. أحجام الخطوط (Font Sizes)
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Names Size */}
                    <div>
                      <label className="block text-[11px] text-neutral-400 mb-1">
                        حجم أسماء العروسين:
                      </label>
                      <div className="grid grid-cols-4 gap-1">
                        {[
                          { id: 'normal', label: 'عادي' },
                          { id: 'large', label: 'كبير' },
                          { id: 'xlarge', label: 'كبير جداً' },
                          { id: 'huge', label: 'ضخم' },
                        ].map((sz) => (
                          <button
                            type="button"
                            key={sz.id}
                            onClick={() =>
                              setEditingInv({
                                ...editingInv,
                                typography: {
                                  ...editingInv.typography,
                                  namesSize: sz.id as any,
                                },
                              })
                            }
                            className={`py-1.5 rounded-lg text-[11px] font-cairo border transition-all ${
                              (editingInv.typography?.namesSize || 'xlarge') === sz.id
                                ? 'bg-amber-500 text-neutral-950 font-bold border-amber-400'
                                : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-700'
                            }`}
                          >
                            {sz.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Verse Size */}
                    <div>
                      <label className="block text-[11px] text-neutral-400 mb-1">
                        حجم الآية / الشعر:
                      </label>
                      <div className="grid grid-cols-3 gap-1">
                        {[
                          { id: 'small', label: 'صغير' },
                          { id: 'medium', label: 'متوسط' },
                          { id: 'large', label: 'كبير' },
                        ].map((sz) => (
                          <button
                            type="button"
                            key={sz.id}
                            onClick={() =>
                              setEditingInv({
                                ...editingInv,
                                typography: {
                                  ...editingInv.typography,
                                  verseSize: sz.id as any,
                                },
                              })
                            }
                            className={`py-1.5 rounded-lg text-[11px] font-cairo border transition-all ${
                              (editingInv.typography?.verseSize || 'medium') === sz.id
                                ? 'bg-amber-500 text-neutral-950 font-bold border-amber-400'
                                : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-700'
                            }`}
                          >
                            {sz.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Parents Size */}
                    <div>
                      <label className="block text-[11px] text-neutral-400 mb-1">
                        حجم إعلان الأبوين:
                      </label>
                      <div className="grid grid-cols-3 gap-1">
                        {[
                          { id: 'small', label: 'صغير' },
                          { id: 'medium', label: 'متوسط' },
                          { id: 'large', label: 'كبير' },
                        ].map((sz) => (
                          <button
                            type="button"
                            key={sz.id}
                            onClick={() =>
                              setEditingInv({
                                ...editingInv,
                                typography: {
                                  ...editingInv.typography,
                                  parentsSize: sz.id as any,
                                },
                              })
                            }
                            className={`py-1.5 rounded-lg text-[11px] font-cairo border transition-all ${
                              (editingInv.typography?.parentsSize || 'medium') === sz.id
                                ? 'bg-amber-500 text-neutral-950 font-bold border-amber-400'
                                : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-700'
                            }`}
                          >
                            {sz.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sub-section C: Colors */}
                <div className="space-y-3 pt-2 border-t border-neutral-800/80">
                  <div className="text-[11px] font-bold text-neutral-300 font-cairo flex items-center justify-between">
                    <span>٣. ألوان النصوص والخطوط (Text Colors)</span>
                    <span className="text-[10px] text-neutral-500 font-tajawal">حدد بالقطارة أو اختر لوناً جاهزاً</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Names Color */}
                    <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] text-neutral-300 font-medium">لون أسماء العروسين:</label>
                        <div className="flex items-center gap-1.5">
                          <input
                            type="color"
                            value={editingInv.typography?.namesColor || '#fde047'}
                            onChange={(e) =>
                              setEditingInv({
                                ...editingInv,
                                typography: {
                                  ...editingInv.typography,
                                  namesColor: e.target.value,
                                },
                              })
                            }
                            className="w-6 h-6 rounded-md cursor-pointer bg-transparent border-0"
                          />
                          <span className="text-[11px] font-mono text-neutral-400">
                            {editingInv.typography?.namesColor || '#fde047'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-neutral-500">سريع:</span>
                        {[
                          { c: '#fde047', label: 'ذهبي' },
                          { c: '#ffffff', label: 'أبيض' },
                          { c: '#f472b6', label: 'وردي' },
                          { c: '#34d399', label: 'زمردي' },
                          { c: '#fb923c', label: 'برونزي' },
                          { c: '#e2e8f0', label: 'فضي' },
                        ].map((p) => (
                          <button
                            key={p.c}
                            type="button"
                            title={p.label}
                            onClick={() =>
                              setEditingInv({
                                ...editingInv,
                                typography: {
                                  ...editingInv.typography,
                                  namesColor: p.c,
                                },
                              })
                            }
                            className="w-4 h-4 rounded-full border border-neutral-700 hover:scale-125 transition-transform"
                            style={{ backgroundColor: p.c }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Verse Color */}
                    <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] text-neutral-300 font-medium">لون الآية / النص الشعري:</label>
                        <div className="flex items-center gap-1.5">
                          <input
                            type="color"
                            value={editingInv.typography?.verseColor || '#fef3c7'}
                            onChange={(e) =>
                              setEditingInv({
                                ...editingInv,
                                typography: {
                                  ...editingInv.typography,
                                  verseColor: e.target.value,
                                },
                              })
                            }
                            className="w-6 h-6 rounded-md cursor-pointer bg-transparent border-0"
                          />
                          <span className="text-[11px] font-mono text-neutral-400">
                            {editingInv.typography?.verseColor || '#fef3c7'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-neutral-500">سريع:</span>
                        {[
                          { c: '#fef3c7', label: 'عاجي ذهبي' },
                          { c: '#ffffff', label: 'أبيض' },
                          { c: '#fde047', label: 'أصفر ذهبي' },
                          { c: '#ffe4e6', label: 'وردي ناعم' },
                          { c: '#ffedd5', label: 'ترابي دافئ' },
                        ].map((p) => (
                          <button
                            key={p.c}
                            type="button"
                            title={p.label}
                            onClick={() =>
                              setEditingInv({
                                ...editingInv,
                                typography: {
                                  ...editingInv.typography,
                                  verseColor: p.c,
                                },
                              })
                            }
                            className="w-4 h-4 rounded-full border border-neutral-700 hover:scale-125 transition-transform"
                            style={{ backgroundColor: p.c }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Parents Color */}
                    <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] text-neutral-300 font-medium">لون أسماء الأبوين:</label>
                        <div className="flex items-center gap-1.5">
                          <input
                            type="color"
                            value={editingInv.typography?.parentsColor || '#ffffff'}
                            onChange={(e) =>
                              setEditingInv({
                                ...editingInv,
                                typography: {
                                  ...editingInv.typography,
                                  parentsColor: e.target.value,
                                },
                              })
                            }
                            className="w-6 h-6 rounded-md cursor-pointer bg-transparent border-0"
                          />
                          <span className="text-[11px] font-mono text-neutral-400">
                            {editingInv.typography?.parentsColor || '#ffffff'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-neutral-500">سريع:</span>
                        {[
                          { c: '#ffffff', label: 'أبيض ناصع' },
                          { c: '#fef3c7', label: 'عاجي' },
                          { c: '#fde047', label: 'ذهبي' },
                          { c: '#fecdd3', label: 'وردي' },
                          { c: '#fed7aa', label: 'أندلسي' },
                        ].map((p) => (
                          <button
                            key={p.c}
                            type="button"
                            title={p.label}
                            onClick={() =>
                              setEditingInv({
                                ...editingInv,
                                typography: {
                                  ...editingInv.typography,
                                  parentsColor: p.c,
                                },
                              })
                            }
                            className="w-4 h-4 rounded-full border border-neutral-700 hover:scale-125 transition-transform"
                            style={{ backgroundColor: p.c }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Welcome Message Color */}
                    <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] text-neutral-300 font-medium">لون نص رسالة الترحيب:</label>
                        <div className="flex items-center gap-1.5">
                          <input
                            type="color"
                            value={editingInv.typography?.welcomeColor || '#fef3c7'}
                            onChange={(e) =>
                              setEditingInv({
                                ...editingInv,
                                typography: {
                                  ...editingInv.typography,
                                  welcomeColor: e.target.value,
                                },
                              })
                            }
                            className="w-6 h-6 rounded-md cursor-pointer bg-transparent border-0"
                          />
                          <span className="text-[11px] font-mono text-neutral-400">
                            {editingInv.typography?.welcomeColor || '#fef3c7'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-neutral-500">سريع:</span>
                        {[
                          { c: '#fef3c7', label: 'عاجي' },
                          { c: '#ffffff', label: 'أبيض' },
                          { c: '#fde047', label: 'ذهبي' },
                          { c: '#fecdd3', label: 'وردي' },
                          { c: '#e2e8f0', label: 'فضي' },
                        ].map((p) => (
                          <button
                            key={p.c}
                            type="button"
                            title={p.label}
                            onClick={() =>
                              setEditingInv({
                                ...editingInv,
                                typography: {
                                  ...editingInv.typography,
                                  welcomeColor: p.c,
                                },
                              })
                            }
                            className="w-4 h-4 rounded-full border border-neutral-700 hover:scale-125 transition-transform"
                            style={{ backgroundColor: p.c }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Timeline / Programs Color */}
                    <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] text-neutral-300 font-medium">لون خط برنامج وفقرات الحفل:</label>
                        <div className="flex items-center gap-1.5">
                          <input
                            type="color"
                            value={editingInv.typography?.timelineColor || '#fef3c7'}
                            onChange={(e) =>
                              setEditingInv({
                                ...editingInv,
                                typography: {
                                  ...editingInv.typography,
                                  timelineColor: e.target.value,
                                },
                              })
                            }
                            className="w-6 h-6 rounded-md cursor-pointer bg-transparent border-0"
                          />
                          <span className="text-[11px] font-mono text-neutral-400">
                            {editingInv.typography?.timelineColor || '#fef3c7'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-neutral-500">سريع:</span>
                        {[
                          { c: '#fef3c7', label: 'عاجي' },
                          { c: '#fde047', label: 'ذهبي' },
                          { c: '#ffffff', label: 'أبيض' },
                          { c: '#fbcfe8', label: 'وردي' },
                          { c: '#fed7aa', label: 'أندلسي' },
                          { c: '#93c5fd', label: 'سماوي' },
                        ].map((p) => (
                          <button
                            key={p.c}
                            type="button"
                            title={p.label}
                            onClick={() =>
                              setEditingInv({
                                ...editingInv,
                                typography: {
                                  ...editingInv.typography,
                                  timelineColor: p.c,
                                },
                              })
                            }
                            className="w-4 h-4 rounded-full border border-neutral-700 hover:scale-125 transition-transform"
                            style={{ backgroundColor: p.c }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

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
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-amber-300 font-cairo">
                      مراسم وبرنامج الحفل (Timeline)
                    </span>
                    <div className="flex items-center gap-1.5 px-2 py-1 bg-neutral-900 border border-neutral-800 rounded-lg">
                      <span className="text-[10px] text-neutral-400 font-tajawal">لون خط البرامج:</span>
                      <input
                        type="color"
                        value={editingInv.typography?.timelineColor || '#fef3c7'}
                        onChange={(e) =>
                          setEditingInv({
                            ...editingInv,
                            typography: {
                              ...editingInv.typography,
                              timelineColor: e.target.value,
                            },
                          })
                        }
                        className="w-5 h-5 rounded cursor-pointer bg-transparent border-0"
                        title="تغيير لون خط برنامج الحفل"
                      />
                      <span className="text-[10px] font-mono text-neutral-300">
                        {editingInv.typography?.timelineColor || '#fef3c7'}
                      </span>
                    </div>
                  </div>
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

              {/* Form Bottom Save / Cancel Actions */}
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

            {/* LIVE PREVIEW CANVAS (In Center / Middle of Screen) */}
            <div
              className={`flex-1 bg-[#05070a] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-neutral-950 to-neutral-950 relative flex flex-col items-center justify-start overflow-y-auto p-4 sm:p-7 transition-all ${
                editorTab === 'preview' ? 'flex' : 'hidden xl:flex'
              }`}
              dir="rtl"
            >
              {/* Preview Status Bar Badge */}
              <div className="w-full max-w-[420px] flex items-center justify-between py-2 px-3.5 mb-3 rounded-2xl bg-neutral-900/90 border border-neutral-800/80 backdrop-blur-md shadow-md">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400/50" />
                  <span className="text-xs font-bold text-neutral-200 font-cairo">
                    معاينة حية ومباشرة للكارت
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-amber-300 font-tajawal bg-amber-500/10 px-2.5 py-0.5 rounded-lg border border-amber-500/20">
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>شاشة الجوال الفعلية</span>
                </div>
              </div>

              {/* Realistic Mobile Device Card Mockup */}
              <div className="w-full max-w-[420px] my-auto bg-neutral-950 rounded-[48px] border-[9px] border-neutral-800 shadow-[0_30px_90px_rgba(0,0,0,0.95),0_0_50px_rgba(212,175,55,0.12)] ring-1 ring-white/10 overflow-hidden flex flex-col relative shrink-0">
                {/* Phone Speaker & Camera Notch */}
                <div className="w-full pt-2 pb-1 bg-neutral-900/90 flex justify-center items-center z-20 border-b border-white/5">
                  <div className="w-24 h-3.5 bg-neutral-950 rounded-full flex items-center justify-center gap-2 px-2 border border-neutral-800">
                    <div className="w-8 h-1 bg-neutral-700 rounded-full" />
                    <div className="w-1.5 h-1.5 bg-neutral-700 rounded-full" />
                  </div>
                </div>

                {/* Inner Screen Scroll Container with Template Live Render */}
                <div className="overflow-y-auto max-h-[calc(100vh-170px)] min-h-[640px] scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-neutral-900 bg-neutral-950">
                  <TemplateRenderer
                    key={`${previewInvitation.templateId}-${previewInvitation.typography?.namesFontFamily}-${previewInvitation.typography?.verseFontFamily}-${previewInvitation.typography?.parentsFontFamily}-${previewInvitation.typography?.namesSize}-${previewInvitation.typography?.verseSize}-${previewInvitation.typography?.parentsSize}`}
                    invitation={previewInvitation}
                  />
                </div>

                {/* Phone bottom home indicator bar */}
                <div className="w-full py-1.5 bg-neutral-900/90 flex justify-center items-center z-20 border-t border-white/5">
                  <div className="w-28 h-1 bg-neutral-600 rounded-full" />
                </div>
              </div>

              {/* Interactive Hint */}
              <p className="text-[11px] text-neutral-400 font-tajawal mt-3 text-center">
                مرّر داخل شاشة الكارت للأعلى والأسفل لمعاينة كافة الفقرات والعد التنازلي وتأكيد الحضور
              </p>
            </div>

          </div>
        </div>
      )}

      {/* Supabase Database Connection Modal */}
      {isDbModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setIsDbModalOpen(false)}
              className="absolute top-6 left-6 p-2 rounded-xl bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Database className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-neutral-100">
                  ربط قاعدة بيانات Supabase
                </h3>
                <p className="text-xs text-neutral-400 font-tajawal">
                  تخزين بطاقات الدعوة وسجلات الحضور بشكل دائم وسحابي
                </p>
              </div>
            </div>

            {/* Status Card */}
            <div
              className={`p-4 rounded-2xl border flex items-start gap-3 ${
                dbStatus?.connected
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  : dbStatus?.configured
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                  : 'bg-neutral-800/80 border-neutral-700 text-neutral-300'
              }`}
            >
              <div className="mt-0.5">
                {dbStatus?.connected ? (
                  <Check className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Database className="w-5 h-5 text-amber-400" />
                )}
              </div>
              <div className="flex-1 text-xs font-tajawal space-y-1">
                <div className="font-bold text-sm">
                  {dbStatus?.connected
                    ? 'قاعدة البيانات متصلة وجاهزة للعمل!'
                    : dbStatus?.configured
                    ? 'المفاتيح مدخلة، ولكن الاتصال تعثر'
                    : 'قيد العمل على الذاكرة المؤقتة (لم يتم إدخال مفاتيح Supabase)'}
                </div>
                <p className="opacity-90">{dbStatus?.message}</p>
                {dbStatus?.connected && typeof dbStatus?.invitationsCount === 'number' && (
                  <p className="text-emerald-400 font-bold">
                    عدد الدعوات المسجلة في Supabase: {toArabicNumerals(dbStatus.invitationsCount)}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={checkDbStatus}
                disabled={isCheckingDb}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-tajawal flex items-center gap-1 transition-all disabled:opacity-50"
              >
                <RotateCcw className={`w-3.5 h-3.5 ${isCheckingDb ? 'animate-spin' : ''}`} />
                <span>إعادة الفحص</span>
              </button>
            </div>

            {/* Quick Setup Instructions */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-neutral-200">
                خطوات الربط السريع في دقيقتين:
              </h4>

              <div className="space-y-3 font-tajawal text-xs text-neutral-300">
                <div className="p-3.5 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-1.5">
                  <span className="font-bold text-amber-400">١. تشغيل كود إنشاء الجداول (SQL Script):</span>
                  <p className="text-neutral-400">
                    تم إنشاء ملف جاهز في مشروعك باسم <code className="text-amber-300 font-mono">supabase/schema.sql</code>. افتح لوحة تحكم Supabase ثم اضغط على <b>SQL Editor</b> والصق محتواه واضغط <b>Run</b>.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-1.5">
                  <span className="font-bold text-amber-400">٢. نسخ المفاتيح إلى ملف .env.local:</span>
                  <p className="text-neutral-400">
                    من لوحة تحكم Supabase اذهب إلى <code className="text-amber-300">Project Settings → API</code> وانسخ:
                  </p>
                  <pre className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-[11px] font-mono text-neutral-300 overflow-x-auto text-left" dir="ltr">
NEXT_PUBLIC_SUPABASE_URL=https://your-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
                  </pre>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-1.5">
                  <span className="font-bold text-amber-400">٣. المزامنة الفورية:</span>
                  <p className="text-neutral-400">
                    بمجرد حفظ ملف <code className="text-amber-300 font-mono">.env.local</code> وإعادة تشغيل السيرفر، ستعمل جميع عمليات إضافة وتعديل بطاقات الدعوة وتسجيل تأكيدات الحضور (RSVP) مباشرة على Supabase.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setIsDbModalOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs transition-colors"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
