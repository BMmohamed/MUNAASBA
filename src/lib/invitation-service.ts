import { InvitationData, RsvpResponse } from '@/types/invitation';
import { INITIAL_INVITATIONS } from './constants';
import { getSupabaseAdmin, getSupabase, isSupabaseConfigured } from './supabase';

// In-memory store fallback for server runtime (when Supabase credentials are not set)
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
      store.set(inv.slug, { ...inv, isPublic: inv.isPublic ?? true });
      store.set(inv.id, { ...inv, isPublic: inv.isPublic ?? true });
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

// Map Supabase snake_case table row to TypeScript camelCase model
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapDbToInvitation(row: any): InvitationData {
  return {
    id: row.id,
    slug: row.slug,
    templateId: row.template_id || 'template-1',
    title: row.title || '',
    eventTitle: row.event_title || 'حفل الزفاف المبارك',
    groomName: row.groom_name || '',
    brideName: row.bride_name || '',
    groomParents: row.groom_parents || '',
    brideParents: row.bride_parents || '',
    eventDate: row.event_date || '',
    eventDateHijri: row.event_date_hijri || '',
    dayOfWeek: row.day_of_week || '',
    timeFormatted: row.time_formatted || '',
    venueName: row.venue_name || '',
    venueHall: row.venue_hall || '',
    venueCity: row.venue_city || '',
    venueAddress: row.venue_address || '',
    googleMapsUrl: row.google_maps_url || '',
    headerVerse: row.header_verse || '',
    verseSource: row.verse_source || '',
    welcomeMessage: row.welcome_message || '',
    rsvpCount: typeof row.rsvp_count === 'number' ? row.rsvp_count : 0,
    rsvpDeviceList: Array.isArray(row.rsvp_device_list) ? row.rsvp_device_list : [],
    isPublic:
      row.is_public !== undefined && row.is_public !== null
        ? Boolean(row.is_public)
        : row.toggles?.isPublic !== undefined
        ? Boolean(row.toggles.isPublic)
        : true,
    toggles: {
      ...(row.toggles || {}),
      isPublic:
        row.is_public !== undefined && row.is_public !== null
          ? Boolean(row.is_public)
          : row.toggles?.isPublic !== undefined
          ? Boolean(row.toggles.isPublic)
          : true,
    },
    timeline: Array.isArray(row.timeline) ? row.timeline : [],
    typography: row.typography || {},
    themeAccentColor: row.theme_accent_color || '#d4af37',
    coverMusicTrack: row.cover_music_track || '',
    customVideoUrl: row.custom_video_url || '',
    customImageUrl: row.custom_image_url || '',
    createdAt: row.created_at || new Date().toISOString(),
    updatedAt: row.updated_at || new Date().toISOString(),
  };
}

// Helper to detect if Supabase returned a column missing error (PostgREST or Postgres)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isColumnMissingError(err: any, colName: string): boolean {
  if (!err) return false;
  const code = String(err.code || '');
  const msg = String(err.message || '').toLowerCase();
  return (
    code === '42703' ||
    code === 'PGRST204' ||
    msg.includes(`'${colName.toLowerCase()}'`) ||
    msg.includes(colName.toLowerCase())
  );
}

// Map TypeScript camelCase model to Supabase snake_case table row
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapInvitationToDb(inv: Partial<InvitationData>): any {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dbRow: any = {};
  if (inv.id !== undefined) dbRow.id = inv.id;
  if (inv.slug !== undefined) dbRow.slug = inv.slug;
  if (inv.templateId !== undefined) dbRow.template_id = inv.templateId;
  if (inv.title !== undefined) dbRow.title = inv.title;
  if (inv.eventTitle !== undefined) dbRow.event_title = inv.eventTitle;
  if (inv.groomName !== undefined) dbRow.groom_name = inv.groomName;
  if (inv.brideName !== undefined) dbRow.bride_name = inv.brideName;
  if (inv.groomParents !== undefined) dbRow.groom_parents = inv.groomParents;
  if (inv.brideParents !== undefined) dbRow.bride_parents = inv.brideParents;
  if (inv.eventDate !== undefined) dbRow.event_date = inv.eventDate;
  if (inv.eventDateHijri !== undefined) dbRow.event_date_hijri = inv.eventDateHijri;
  if (inv.dayOfWeek !== undefined) dbRow.day_of_week = inv.dayOfWeek;
  if (inv.timeFormatted !== undefined) dbRow.time_formatted = inv.timeFormatted;
  if (inv.venueName !== undefined) dbRow.venue_name = inv.venueName;
  if (inv.venueHall !== undefined) dbRow.venue_hall = inv.venueHall;
  if (inv.venueCity !== undefined) dbRow.venue_city = inv.venueCity;
  if (inv.venueAddress !== undefined) dbRow.venue_address = inv.venueAddress;
  if (inv.googleMapsUrl !== undefined) dbRow.google_maps_url = inv.googleMapsUrl;
  if (inv.headerVerse !== undefined) dbRow.header_verse = inv.headerVerse;
  if (inv.verseSource !== undefined) dbRow.verse_source = inv.verseSource;
  if (inv.welcomeMessage !== undefined) dbRow.welcome_message = inv.welcomeMessage;
  if (inv.rsvpCount !== undefined) dbRow.rsvp_count = inv.rsvpCount;
  if (inv.rsvpDeviceList !== undefined) dbRow.rsvp_device_list = inv.rsvpDeviceList;
  if (inv.isPublic !== undefined) dbRow.is_public = inv.isPublic;

  // Always mirror isPublic into toggles JSONB so it is guaranteed to persist even if is_public column is absent
  const togglesCopy = { ...(inv.toggles || {}) };
  if (inv.isPublic !== undefined) {
    togglesCopy.isPublic = inv.isPublic;
  }
  dbRow.toggles = togglesCopy;

  if (inv.timeline !== undefined) dbRow.timeline = inv.timeline;
  if (inv.typography !== undefined) dbRow.typography = inv.typography;
  if (inv.themeAccentColor !== undefined) dbRow.theme_accent_color = inv.themeAccentColor;
  if (inv.coverMusicTrack !== undefined) dbRow.cover_music_track = inv.coverMusicTrack;
  if (inv.customVideoUrl !== undefined) dbRow.custom_video_url = inv.customVideoUrl;
  if (inv.customImageUrl !== undefined) dbRow.custom_image_url = inv.customImageUrl;
  if (inv.createdAt !== undefined) dbRow.created_at = inv.createdAt;
  if (inv.updatedAt !== undefined) dbRow.updated_at = inv.updatedAt;
  return dbRow;
}

export async function getAllInvitations(onlyPublic: boolean = false): Promise<InvitationData[]> {
  const store = getStore();

  if (isSupabaseConfigured()) {
    try {
      const client = getSupabaseAdmin() || getSupabase();
      if (client) {
        const { data, error } = await client
          .from('invitations')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.warn('[Supabase] Warning fetching invitations:', error.message);
        } else if (data) {
          const dbItems = data.map(mapDbToInvitation);

          // Sync into memory cache so it stays warm and never loses records
          const map = new Map<string, InvitationData>();
          dbItems.forEach((inv) => {
            map.set(inv.id, inv);
            store.set(inv.id, inv);
            store.set(inv.slug, inv);
          });

          // Also preserve any in-memory items
          store.forEach((inv) => {
            if (!map.has(inv.id)) {
              map.set(inv.id, inv);
            }
          });

          const combined = Array.from(map.values()).sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );

          if (onlyPublic) {
            return combined.filter((inv) => inv.isPublic !== false);
          }
          return combined;
        }
      }
    } catch (err) {
      console.warn('[Supabase] Falling back to local store due to error:', err);
    }
  }

  // Fallback in-memory store
  const seen = new Set<string>();
  const list: InvitationData[] = [];
  store.forEach((inv) => {
    if (!seen.has(inv.id)) {
      seen.add(inv.id);
      if (!onlyPublic || inv.isPublic !== false) {
        list.push({ ...inv });
      }
    }
  });
  return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getInvitationBySlug(slug: string): Promise<InvitationData | null> {
  const store = getStore();

  if (isSupabaseConfigured()) {
    try {
      const client = getSupabaseAdmin() || getSupabase();
      if (client) {
        const { data, error } = await client
          .from('invitations')
          .select('*')
          .or(`slug.eq.${slug},id.eq.${slug}`)
          .maybeSingle();

        if (error) {
          console.warn('[Supabase] Warning fetching invitation by slug:', error.message);
        } else if (data) {
          const mapped = mapDbToInvitation(data);
          store.set(mapped.slug, mapped);
          store.set(mapped.id, mapped);
          return mapped;
        }
      }
    } catch (err) {
      console.warn('[Supabase] Falling back to local store for slug:', err);
    }
  }

  // Fallback in-memory store
  const inv = store.get(slug);
  if (inv) {
    return { ...inv };
  }
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
    eventDateHijri: data.eventDateHijri || '١ رجب ١٤٨ هـ',
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
    isPublic: data.isPublic !== undefined ? data.isPublic : true,
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
      showVerse: data.toggles?.showVerse ?? true,
      showParents: data.toggles?.showParents ?? true,
      showShare: data.toggles?.showShare ?? true,
      musicUrl: data.toggles?.musicUrl || 'https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3',
    },
    typography: data.typography || {
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
    timeline: data.timeline || [
      { id: 't1', time: '٠٨:٠٠ م', label: 'استقبال الضيوف الكرام', icon: 'coffee' },
      { id: 't2', time: '٠٩:٣٠ م', label: 'مراسم الزفة والاحتفال', icon: 'ring' },
      { id: 't3', time: '١٠:٣٠ م', label: 'مأدبة العشاء الفاخر', icon: 'dinner' },
    ],
    themeAccentColor: data.themeAccentColor || '#d4af37',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // Sync with Supabase if configured
  if (isSupabaseConfigured()) {
    try {
      const client = getSupabaseAdmin() || getSupabase();
      if (client) {
        const row = mapInvitationToDb(newInvitation);
        let { error } = await client.from('invitations').insert(row);
        if (error && isColumnMissingError(error, 'is_public')) {
          console.warn('[Supabase] Retrying insert without is_public column:', error.message);
          delete row.is_public;
          const retry = await client.from('invitations').insert(row);
          error = retry.error;
        }
        if (error) {
          console.error('[Supabase] Error creating invitation in DB:', error.message);
        } else {
          console.log('[Supabase] Successfully inserted invitation into Supabase:', newInvitation.id);
        }
      }
    } catch (err) {
      console.error('[Supabase] Exception creating invitation in DB:', err);
    }
  }

  // Always keep memory cache in sync
  store.set(slug, newInvitation);
  store.set(id, newInvitation);
  return newInvitation;
}

export async function updateInvitation(id: string, data: Partial<InvitationData>): Promise<InvitationData | null> {
  const store = getStore();
  const existing = (await getInvitationBySlug(id)) || store.get(id);
  if (!existing) {
    return null;
  }

  const updated: InvitationData = {
    ...existing,
    ...data,
    isPublic: data.isPublic !== undefined ? data.isPublic : (existing.isPublic ?? true),
    toggles: {
      ...existing.toggles,
      ...(data.toggles || {}),
      isPublic: data.isPublic !== undefined ? data.isPublic : (existing.isPublic ?? true),
    },
    typography: {
      ...(existing.typography || {}),
      ...(data.typography || {}),
    },
    updatedAt: new Date().toISOString(),
  };

  // Sync with Supabase if configured
  if (isSupabaseConfigured()) {
    try {
      const client = getSupabaseAdmin() || getSupabase();
      if (client) {
        const row = mapInvitationToDb(updated);
        let { error } = await client.from('invitations').update(row).eq('id', id);
        if (error && isColumnMissingError(error, 'is_public')) {
          console.warn('[Supabase] Retrying update without is_public column:', error.message);
          delete row.is_public;
          const retry = await client.from('invitations').update(row).eq('id', id);
          error = retry.error;
        }
        if (error) {
          console.error('[Supabase] Error updating invitation:', error.message);
        } else {
          console.log('[Supabase] Successfully updated invitation in Supabase:', id);
        }
      }
    } catch (err) {
      console.error('[Supabase] Exception updating invitation:', err);
    }
  }

  // Update memory cache
  if (data.slug && data.slug !== existing.slug) {
    store.delete(existing.slug);
    store.set(data.slug, updated);
  } else {
    store.set(existing.slug, updated);
  }
  store.set(id, updated);
  return updated;
}

export async function deleteInvitation(id: string): Promise<boolean> {
  const store = getStore();
  const existing = store.get(id);

  if (isSupabaseConfigured()) {
    try {
      const client = getSupabaseAdmin() || getSupabase();
      if (client) {
        const { error } = await client.from('invitations').delete().eq('id', id);
        if (error) {
          console.error('[Supabase] Error deleting invitation:', error.message);
        } else {
          console.log('[Supabase] Successfully deleted invitation:', id);
        }
      }
    } catch (err) {
      console.error('[Supabase] Exception deleting invitation:', err);
    }
  }

  if (existing) {
    store.delete(existing.slug);
  }
  store.delete(id);
  return true;
}

export async function registerRsvp(
  slugOrId: string,
  deviceFingerprint: string,
  guestCount: number = 1,
  guestName: string = ''
): Promise<RsvpResponse> {
  const store = getStore();
  const deviceSet = getDeviceSet();
  const countToAdd = Math.max(1, Math.min(20, Number(guestCount) || 1));

  let target: InvitationData | null = null;
  if (isSupabaseConfigured()) {
    target = await getInvitationBySlug(slugOrId);
  } else {
    target = store.get(slugOrId) || null;
    if (!target) {
      for (const item of store.values()) {
        if (item.slug === slugOrId || item.id === slugOrId) {
          target = item;
          break;
        }
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

  // If Supabase is connected, check rsvp_logs table
  if (isSupabaseConfigured()) {
    try {
      const client = getSupabaseAdmin() || getSupabase();
      if (client) {
        // 1. Check if device already logged
        const { data: existingLog } = await client
          .from('rsvp_logs')
          .select('id')
          .eq('invitation_id', target.id)
          .eq('device_fingerprint', deviceFingerprint)
          .maybeSingle();

        if (existingLog) {
          return {
            success: true,
            message: 'لقد قمت بتأكيد حضورك مسبقاً من هذا الجهاز. نسعد بلقائكم!',
            newCount: target.rsvpCount,
            alreadyRsvped: true,
          };
        }

        // 2. Insert new rsvp_log with guest_count & guest_name
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const logPayload: any = {
          invitation_id: target.id,
          invitation_slug: target.slug,
          device_fingerprint: deviceFingerprint,
          guest_count: countToAdd,
          guest_name: guestName || '',
        };
        const { error: insertErr } = await client.from('rsvp_logs').insert(logPayload);
        if (insertErr && insertErr.code === '42703') {
          delete logPayload.guest_count;
          await client.from('rsvp_logs').insert(logPayload);
        }

        // 3. Update rsvp_count in invitations table (+ countToAdd)
        const newCount = target.rsvpCount + countToAdd;
        const updatedList = Array.isArray(target.rsvpDeviceList)
          ? [...target.rsvpDeviceList, deviceFingerprint]
          : [deviceFingerprint];

        await client
          .from('invitations')
          .update({
            rsvp_count: newCount,
            rsvp_device_list: updatedList,
            updated_at: new Date().toISOString(),
          })
          .eq('id', target.id);

        // Update local memory cache too
        target.rsvpCount = newCount;
        target.rsvpDeviceList = updatedList;
        store.set(target.slug, { ...target });
        store.set(target.id, { ...target });
        deviceSet.add(lockKey);

        const guestSuffix = countToAdd > 1 ? ` لـ (${countToAdd}) أفراد` : '';
        return {
          success: true,
          message: `تم تأكيد حضوركم${guestSuffix} بنجاح! نتشرف بوجودكم معنا.`,
          newCount,
          alreadyRsvped: false,
        };
      }
    } catch (err) {
      console.warn('[Supabase] Error during RSVP sync, falling back to memory store:', err);
    }
  }

  // Memory fallback logic
  if (deviceSet.has(lockKey) || (target.rsvpDeviceList && target.rsvpDeviceList.includes(deviceFingerprint))) {
    return {
      success: true,
      message: 'لقد قمت بتأكيد حضورك مسبقاً من هذا الجهاز. نسعد بلقائكم!',
      newCount: target.rsvpCount,
      alreadyRsvped: true,
    };
  }

  target.rsvpCount += countToAdd;
  if (!target.rsvpDeviceList) {
    target.rsvpDeviceList = [];
  }
  target.rsvpDeviceList.push(deviceFingerprint);
  deviceSet.add(lockKey);

  store.set(target.slug, { ...target });
  store.set(target.id, { ...target });

  const guestSuffix = countToAdd > 1 ? ` لـ (${countToAdd}) أفراد` : '';
  return {
    success: true,
    message: `تم تأكيد حضوركم${guestSuffix} بنجاح! نتشرف بوجودكم معنا.`,
    newCount: target.rsvpCount,
    alreadyRsvped: false,
  };
}

export async function resetRsvpCount(idOrSlug: string): Promise<boolean> {
  const store = getStore();
  const deviceSet = getDeviceSet();

  let target: InvitationData | null = null;
  if (isSupabaseConfigured()) {
    target = await getInvitationBySlug(idOrSlug);
  } else {
    target = store.get(idOrSlug) || null;
    if (!target) {
      for (const item of store.values()) {
        if (item.slug === idOrSlug || item.id === idOrSlug) {
          target = item;
          break;
        }
      }
    }
  }

  if (!target) return false;

  // Sync reset with Supabase if configured
  if (isSupabaseConfigured()) {
    try {
      const client = getSupabaseAdmin() || getSupabase();
      if (client) {
        await client
          .from('invitations')
          .update({
            rsvp_count: 0,
            rsvp_device_list: [],
            updated_at: new Date().toISOString(),
          })
          .eq('id', target.id);

        await client.from('rsvp_logs').delete().eq('invitation_id', target.id);
      }
    } catch (err) {
      console.error('[Supabase] Error resetting RSVP in database:', err);
    }
  }

  // Reset in-memory cache
  target.rsvpCount = 0;
  target.rsvpDeviceList = [];

  for (const key of Array.from(deviceSet.keys())) {
    if (key.startsWith(`${target.id}:`)) {
      deviceSet.delete(key);
    }
  }

  store.set(target.slug, { ...target });
  store.set(target.id, { ...target });
  return true;
}

export async function adjustRsvpCount(
  idOrSlug: string,
  options: { delta?: number; exact?: number }
): Promise<{ success: boolean; newCount: number }> {
  const store = getStore();

  let target: InvitationData | null = null;
  if (isSupabaseConfigured()) {
    target = await getInvitationBySlug(idOrSlug);
  } else {
    target = store.get(idOrSlug) || null;
    if (!target) {
      for (const item of store.values()) {
        if (item.slug === idOrSlug || item.id === idOrSlug) {
          target = item;
          break;
        }
      }
    }
  }

  if (!target) {
    return { success: false, newCount: 0 };
  }

  let newCount = target.rsvpCount;
  if (typeof options.exact === 'number' && !isNaN(options.exact)) {
    newCount = Math.max(0, Math.round(options.exact));
  } else if (typeof options.delta === 'number' && !isNaN(options.delta)) {
    newCount = Math.max(0, Math.round(target.rsvpCount + options.delta));
  }

  target.rsvpCount = newCount;
  target.updatedAt = new Date().toISOString();

  // Sync with Supabase if configured
  if (isSupabaseConfigured()) {
    try {
      const client = getSupabaseAdmin() || getSupabase();
      if (client) {
        await client
          .from('invitations')
          .update({ rsvp_count: newCount, updated_at: target.updatedAt })
          .eq('id', target.id);
      }
    } catch (err) {
      console.warn('[Supabase] Error adjusting RSVP count in DB:', err);
    }
  }

  // Update memory cache
  store.set(target.slug, { ...target });
  store.set(target.id, { ...target });

  return { success: true, newCount };
}

