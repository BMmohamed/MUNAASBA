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
  showTimeline: boolean;
  showMusic: boolean;
  musicUrl?: string;
  allowGuestNameInRsvp?: boolean;
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
  toggles: InvitationToggles;
  timeline: TimelineItem[];
  themeAccentColor?: string;
  coverMusicTrack?: string;
  customVideoUrl?: string;
  customImageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RsvpRequest {
  fingerprint: string;
  guestName?: string;
}

export interface RsvpResponse {
  success: boolean;
  message: string;
  newCount: number;
  alreadyRsvped?: boolean;
}
