/**
 * True on phones/tablets (coarse pointer) and small screens. Evaluated once at
 * startup — used to switch off expensive animations and effects on mobile.
 */
export const IS_MOBILE =
  typeof window !== 'undefined' &&
  window.matchMedia('(pointer: coarse), (max-width: 767px)').matches;
