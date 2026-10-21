export interface CountdownValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export function calculateCountdown(targetDateIso: string): CountdownValues {
  const target = new Date(targetDateIso).getTime();
  const now = new Date().getTime();
  const difference = target - now;

  if (isNaN(target) || difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, isExpired: false };
}

// Convert English digits to Arabic-Indic digits if needed
export function toArabicNumerals(num: number | string): string {
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return String(num).replace(/[0-9]/g, (w) => arabicDigits[+w]);
}

export function formatArabicDateDisplay(isoString: string): {
  dayName: string;
  dayNumber: string;
  monthName: string;
  year: string;
  timeString: string;
} {
  const date = new Date(isoString);
  if (isNaN(date.getTime())) {
    return {
      dayName: 'الجمعة',
      dayNumber: '٢٠',
      monthName: 'نوفمبر',
      year: '٢٠٢٦',
      timeString: '٠٨:٠٠ م',
    };
  }

  const dayNames = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
  const monthNames = [
    'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
  ];

  const dayName = dayNames[date.getDay()];
  const dayNumber = toArabicNumerals(date.getDate());
  const monthName = monthNames[date.getMonth()];
  const year = toArabicNumerals(date.getFullYear());

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? 'م' : 'ص';
  hours = hours % 12 || 12;
  const timeString = `${toArabicNumerals(hours)}:${toArabicNumerals(minutes.toString().padStart(2, '0'))} ${period}`;

  return { dayName, dayNumber, monthName, year, timeString };
}
