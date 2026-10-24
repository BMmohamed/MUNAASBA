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
  monthNumber: string;
  year: string;
  numericDate: string;
  timeString: string;
} {
  const date = new Date(isoString);
  if (isNaN(date.getTime())) {
    return {
      dayName: 'الجمعة',
      dayNumber: '20',
      monthName: '11',
      monthNumber: '11',
      year: '2026',
      numericDate: '20 / 11 / 2026 م',
      timeString: '٠٨:٠٠ م',
    };
  }

  const dayNames = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
  const dayName = dayNames[date.getDay()];
  const rawDay = date.getDate().toString().padStart(2, '0');
  const rawMonth = (date.getMonth() + 1).toString().padStart(2, '0');
  const rawYear = date.getFullYear().toString();

  const dayNumber = rawDay;
  const monthNumber = rawMonth;
  // Provide monthNumber for monthName as well so no template ever prints 'نوفمبر' or 'ديسمبر'
  const monthName = monthNumber;
  const year = rawYear;
  const numericDate = `${dayNumber} / ${monthNumber} / ${year} م`;

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? 'م' : 'ص';
  hours = hours % 12 || 12;
  const timeString = `${toArabicNumerals(hours)}:${toArabicNumerals(minutes.toString().padStart(2, '0'))} ${period}`;

  return { dayName, dayNumber, monthName, monthNumber, year, numericDate, timeString };
}
