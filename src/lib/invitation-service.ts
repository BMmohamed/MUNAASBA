import { InvitationData, RsvpResponse } from '@/types/invitation';
import { INITIAL_INVITATIONS } from './constants';

// In-memory store for server runtime (retained during server lifetime)
// When deployed on Vercel or locally, this provides immediate operational data.
// It also has an easy pluggable interface for Supabase or SQLite.
declare global {
  // eslint-disable-next-line no-var
  var __INVITATIONS_CACHE__: Map<string, InvitationData> | undefined;
  // eslint-disable-next-line no-var
  var __DEVICE_RSVP_SET__: Set<string> | undefined; // "invitationSlug:deviceFingerprint"
}

function getStore(): Map<string, InvitationData> {
  if (!global.__INVITATIONS_CACHE__) {
    const store = new Map<string, InvitationData>();
    INITIAL_INVITATIONS.forEach((inv) => {
      store.set(inv.slug, { ...inv });
      store.set(inv.id, { ...inv });
    });
    global.__INVITATIONS_CACHE__ = store;
  }
  return global.__INVITATIONS_CACHE__;
}

function getDeviceSet(): Set<string> {
  if (!global.__DEVICE_RSVP_SET__) {
    global.__DEVICE_RSVP_SET__ = new Set<string>();
  }
  return global.__DEVICE_RSVP_SET__;
}

export async function getAllInvitations(): Promise<InvitationData[]> {
  const store = getStore();
  // Return distinct by id
  const seen = new Set<string>();
  const list: InvitationData[] = [];
  store.forEach((inv) => {
    if (!seen.has(inv.id)) {
      seen.add(inv.id);
      list.push({ ...inv });
    }
  });
  return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getInvitationBySlug(slug: string): Promise<InvitationData | null> {
  const store = getStore();
  const inv = store.get(slug);
  if (inv) {
    return { ...inv };
  }
  // Try searching by id
  for (const item of store.values()) {
    if (item.slug === slug || item.id === slug) {
      return { ...item };
    }
  }
  return null;
}

export async function createInvitation(data: Partial<InvitationData>): Promise<InvitationData> {
  const store = getStore();
  const id = `inv-${Date.now()}`;
  const slug = (data.slug || `invite-${Date.now()}`)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\u0621-\u064A-]/g, '');

  const newInvitation: InvitationData = {
    id,
    slug,
    templateId: data.templateId || 'template-1',
    title: data.title || 'دعوة زفاف مبارك',
    eventTitle: data.eventTitle || 'حفل الزفاف المبارك',
    groomName: data.groomName || 'العريس',
    brideName: data.brideName || 'العروس',
    groomParents: data.groomParents || 'أهل العريس الكرام',
    brideParents: data.brideParents || 'أهل العروس الكرام',
    eventDate: data.eventDate || '2026-12-01T20:00:00',
    eventDateHijri: data.eventDateHijri || '١ رجب ١٤٤٨ هـ',
    dayOfWeek: data.dayOfWeek || 'الجمعة',
    timeFormatted: data.timeFormatted || 'الساعة ٨:٠٠ مساءً',
    venueName: data.venueName || 'قصر الاحتفالات',
    venueHall: data.venueHall || 'القاعة الملكية',
    venueCity: data.venueCity || 'الرياض',
    venueAddress: data.venueAddress || 'الرياض، المملكة العربية السعودية',
    googleMapsUrl: data.googleMapsUrl || 'https://maps.google.com',
    headerVerse: data.headerVerse || 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً',
    verseSource: data.verseSource || 'سورة الروم',
    welcomeMessage: data.welcomeMessage || 'يتشرفون بدعوتكم لحضور حفل الزفاف ومشاركتهم الفرحة والسرور.',
    rsvpCount: data.rsvpCount || 0,
    rsvpDeviceList: [],
    toggles: {
      showCountdown: data.toggles?.showCountdown ?? true,
      showCalendar: data.toggles?.showCalendar ?? true,
      showLocation: data.toggles?.showLocation ?? true,
      showRsvp: data.toggles?.showRsvp ?? true,
      showChildrenAdvisory: data.toggles?.showChildrenAdvisory ?? true,
      childrenAdvisoryText: data.toggles?.childrenAdvisoryText || 'جنة الأطفال منازلهم.. نعتذر عن استقبال الأطفال لمشاركتنا فرحة هادئة.',
      showDressCode: data.toggles?.showDressCode ?? true,
      dressCodeText: data.toggles?.dressCodeText || 'الزي الرسمي السعودي',
      showTimeline: data.toggles?.showTimeline ?? true,
      showMusic: data.toggles?.showMusic ?? true,
      musicUrl: data.toggles?.musicUrl || 'https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3',
    },
    timeline: data.timeline || [
      { id: 't1', time: '٠٨:٠٠ م', label: 'استقبال الضيوف الكرام', icon: 'coffee' },
      { id: 't2', time: '٠٩:٣٠ م', label: 'مراسم الزفة والاحتفال', icon: 'ring' },
      { id: 't3', time: '١٠:٣٠ م', label: 'مأدبة العشاء الفاخر', icon: 'dinner' },
    ],
    themeAccentColor: data.themeAccentColor || '#d4af37',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  store.set(slug, newInvitation);
  store.set(id, newInvitation);
  return newInvitation;
}

export async function updateInvitation(id: string, data: Partial<InvitationData>): Promise<InvitationData | null> {
  const store = getStore();
  const existing = store.get(id);
  if (!existing) {
    return null;
  }

  const updated: InvitationData = {
    ...existing,
    ...data,
    toggles: {
      ...existing.toggles,
      ...(data.toggles || {}),
    },
    updatedAt: new Date().toISOString(),
  };

  // If slug changed, delete old mapping
  if (data.slug && data.slug !== existing.slug) {
    store.delete(existing.slug);
    store.set(data.slug, updated);
  } else {
    store.set(existing.slug, updated);
  }
  store.set(id, updated);
  return updated;
}

export async function registerRsvp(slugOrId: string, deviceFingerprint: string): Promise<RsvpResponse> {
  const store = getStore();
  const deviceSet = getDeviceSet();

  let target: InvitationData | undefined = store.get(slugOrId);
  if (!target) {
    for (const item of store.values()) {
      if (item.slug === slugOrId || item.id === slugOrId) {
        target = item;
        break;
      }
    }
  }

  if (!target) {
    return {
      success: false,
      message: 'الدعوة غير موجودة',
      newCount: 0,
    };
  }

  const lockKey = `${target.id}:${deviceFingerprint}`;

  // Check if device already RSVPed
  if (deviceSet.has(lockKey) || (target.rsvpDeviceList && target.rsvpDeviceList.includes(deviceFingerprint))) {
    return {
      success: true,
      message: 'لقد قمت بتأكيد حضورك مسبقاً من هذا الجهاز. نسعد بلقائكم!',
      newCount: target.rsvpCount,
      alreadyRsvped: true,
    };
  }

  // Increment counter and mark device
  target.rsvpCount += 1;
  if (!target.rsvpDeviceList) {
    target.rsvpDeviceList = [];
  }
  target.rsvpDeviceList.push(deviceFingerprint);
  deviceSet.add(lockKey);

  // Sync both keys in store
  store.set(target.slug, { ...target });
  store.set(target.id, { ...target });

  return {
    success: true,
    message: 'تم تأكيد حضورك بنجاح! نتشرف بوجودكم معنا.',
    newCount: target.rsvpCount,
    alreadyRsvped: false,
  };
}

export async function resetRsvpCount(idOrSlug: string): Promise<boolean> {
  const store = getStore();
  const deviceSet = getDeviceSet();

  let target: InvitationData | undefined = store.get(idOrSlug);
  if (!target) {
    for (const item of store.values()) {
      if (item.slug === idOrSlug || item.id === idOrSlug) {
        target = item;
        break;
      }
    }
  }

  if (!target) return false;

  target.rsvpCount = 0;
  target.rsvpDeviceList = [];

  // Remove corresponding device keys
  for (const key of Array.from(deviceSet.keys())) {
    if (key.startsWith(`${target.id}:`)) {
      deviceSet.delete(key);
    }
  }

  store.set(target.slug, { ...target });
  store.set(target.id, { ...target });
  return true;
}
