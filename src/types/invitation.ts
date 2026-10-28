export type InvitationTemplateId =
  | 'template-1' // Bab Al-Farah / Classic Arch
  | 'template-2' // Modern Minimalist
  | 'template-3' // Royal Floral
  | 'template-4' // Luxury Night / Midnight Elegance
  | 'template-5'; // Heritage / Traditional

export interface TimelineItem {
  id: string;
  time: string; // e.g., "08:00 م"
  label: string; // e.g., "استقبال الضيوف الكرام"
  icon?: 'door' | 'coffee' | 'ring' | 'cake' | 'dinner' | 'music';
}

export interface InvitationToggles {
  showCountdown: boolean;
  showCalendar: boolean;
  showLocation: boolean;
  showRsvp: boolean;
  showChildrenAdvisory: boolean;
  childrenAdvisoryText: string;
  showDressCode: boolean;
  dressCodeText: string;
  showNoPhotography?: boolean;
  noPhotographyText?: string;
  showTimeline: boolean;
  showMusic: boolean;
  musicUrl?: string;
  allowGuestNameInRsvp?: boolean;
  showVerse?: boolean;
  showParents?: boolean;
  showShare?: boolean;
  isPublic?: boolean;
}

export interface TypographySettings {
  // Font Families
  namesFontFamily?: 'ruqaa' | 'amiri' | 'cairo' | 'tajawal';
  verseFontFamily?: 'amiri' | 'ruqaa' | 'cairo' | 'tajawal';
  parentsFontFamily?: 'tajawal' | 'cairo' | 'amiri' | 'ruqaa';

  // Font Sizes
  namesSize?: 'normal' | 'large' | 'xlarge' | 'huge';
  verseSize?: 'small' | 'medium' | 'large';
  parentsSize?: 'small' | 'medium' | 'large';

  // Font Colors
  namesColor?: string;
  verseColor?: string;
  parentsColor?: string;
  welcomeColor?: string;
  timelineColor?: string;
}

export interface InvitationData {
  id: string;
  slug: string;
  templateId: InvitationTemplateId;
  title: string;
  eventTitle: string; // e.g. "حفل زفاف", "عقد قران", "حفل خطوبة"
  groomName: string;
  brideName: string;
  groomParents: string;
  brideParents: string;
  eventDate: string; // ISO 8601 string: "2026-11-20T20:00:00"
  eventDateHijri: string; // e.g. "١٥ ربيع الأول ١٤٤٨ هـ"
  dayOfWeek: string; // e.g. "الجمعة"
  timeFormatted: string; // e.g. "الساعة ٨:٠٠ مساءً"
  venueName: string;
  venueHall?: string;
  venueCity: string;
  venueAddress: string;
  googleMapsUrl: string;
  headerVerse: string;
  verseSource?: string;
  welcomeMessage: string;
  rsvpCount: number;
  rsvpDeviceList?: string[]; // stored device fingerprints that already RSVPed
  isPublic?: boolean; // هل الدعوة عامة تظهر في المعرض أم خاصة وسرية برابط فقط
  toggles: InvitationToggles;
  timeline: TimelineItem[];
  typography?: TypographySettings;
  themeAccentColor?: string;
  coverMusicTrack?: string;
  customVideoUrl?: string;
  customImageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RsvpRequest {
  fingerprint: string;
  guestCount?: number;
  guestName?: string;
}

export interface RsvpResponse {
  success: boolean;
  message: string;
  newCount: number;
  alreadyRsvped?: boolean;
}
