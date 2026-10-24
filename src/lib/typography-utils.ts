import { TypographySettings } from '@/types/invitation';

export function getFontFamilyClass(font?: 'ruqaa' | 'amiri' | 'cairo' | 'tajawal', fallback: string = 'font-ruqaa'): string {
  switch (font) {
    case 'ruqaa':
      return 'font-ruqaa';
    case 'amiri':
      return 'font-amiri';
    case 'cairo':
      return 'font-cairo';
    case 'tajawal':
      return 'font-tajawal';
    default:
      return fallback;
  }
}

export function getFontFamilyStyle(font?: 'ruqaa' | 'amiri' | 'cairo' | 'tajawal'): React.CSSProperties | undefined {
  switch (font) {
    case 'ruqaa':
      return { fontFamily: "'Aref Ruqaa', serif" };
    case 'amiri':
      return { fontFamily: "'Amiri', serif" };
    case 'cairo':
      return { fontFamily: "'Cairo', sans-serif" };
    case 'tajawal':
      return { fontFamily: "'Tajawal', sans-serif" };
    default:
      return undefined;
  }
}

export function getNamesSizeClass(size?: TypographySettings['namesSize']): string {
  switch (size) {
    case 'normal':
      return 'text-2xl sm:text-4xl';
    case 'large':
      return 'text-3xl sm:text-5xl';
    case 'huge':
      return 'text-5xl sm:text-7xl';
    case 'xlarge':
    default:
      return 'text-4xl sm:text-6xl';
  }
}

export function getVerseSizeClass(size?: TypographySettings['verseSize']): string {
  switch (size) {
    case 'small':
      return 'text-xs sm:text-sm';
    case 'large':
      return 'text-base sm:text-lg';
    case 'medium':
    default:
      return 'text-sm sm:text-base';
  }
}

export function getParentsSizeClass(size?: TypographySettings['parentsSize']): string {
  switch (size) {
    case 'small':
      return 'text-xs sm:text-sm';
    case 'large':
      return 'text-base sm:text-lg';
    case 'medium':
    default:
      return 'text-sm sm:text-base';
  }
}
