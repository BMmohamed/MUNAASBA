export interface CalendarEventDetails {
  title: string;
  description: string;
  location: string;
  startDate: string; // ISO 8601 string, e.g. "2026-11-20T20:00:00"
  durationHours?: number;
}

function formatDateToUtcString(date: Date): string {
  return date
    .toISOString()
    .replace(/-|:|\.\d\d\d/g, '')
    .slice(0, 15) + 'Z';
}

export function generateGoogleCalendarUrl(details: CalendarEventDetails): string {
  const start = new Date(details.startDate);
  const duration = details.durationHours || 4;
  const end = new Date(start.getTime() + duration * 60 * 60 * 1000);

  const startUtc = formatDateToUtcString(start);
  const endUtc = formatDateToUtcString(end);

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: details.title,
    dates: `${startUtc}/${endUtc}`,
    details: details.description,
    location: details.location,
    trp: 'true',
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function generateIcsContent(details: CalendarEventDetails): string {
  const start = new Date(details.startDate);
  const duration = details.durationHours || 4;
  const end = new Date(start.getTime() + duration * 60 * 60 * 1000);

  const startUtc = formatDateToUtcString(start);
  const endUtc = formatDateToUtcString(end);
  const nowUtc = formatDateToUtcString(new Date());
  const uid = `invite-${Date.now()}@munaasaba.vercel.app`;

  // Escape special chars for ICS format
  const escapeIcs = (str: string) =>
    str.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Munaasaba//Arabic Wedding Invitation//AR',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${nowUtc}`,
    `DTSTART:${startUtc}`,
    `DTEND:${endUtc}`,
    `SUMMARY:${escapeIcs(details.title)}`,
    `DESCRIPTION:${escapeIcs(details.description)}`,
    `LOCATION:${escapeIcs(details.location)}`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'BEGIN:VALARM',
    'TRIGGER:-PT24H',
    'ACTION:DISPLAY',
    'DESCRIPTION:تذكير: موعد حفل الزفاف غداً',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

export function downloadAppleIcsFile(details: CalendarEventDetails, filename = 'wedding-invitation.ics'): void {
  if (typeof window === 'undefined') return;

  const icsData = generateIcsContent(details);
  const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}
