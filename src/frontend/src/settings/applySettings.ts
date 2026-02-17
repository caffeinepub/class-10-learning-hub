import type { Settings } from './settingsSchema';

export function applySettings(settings: Settings): void {
  const root = document.documentElement;

  // Dark mode
  if (settings.darkMode) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }

  // Font size
  if (typeof settings.fontSize === 'number') {
    root.style.setProperty('--content-font-size', `${settings.fontSize}px`);
  }

  // Line spacing
  if (settings.lineSpacing === 'compact') {
    root.style.setProperty('--content-line-height', '1.4');
  } else if (settings.lineSpacing === 'relaxed') {
    root.style.setProperty('--content-line-height', '1.8');
  } else {
    root.style.setProperty('--content-line-height', '1.6');
  }

  // High contrast
  if (settings.highContrast) {
    root.classList.add('high-contrast');
  } else {
    root.classList.remove('high-contrast');
  }

  // Reduced motion
  if (settings.reducedMotion) {
    root.style.setProperty('--animation-duration', '0.01ms');
  } else {
    root.style.setProperty('--animation-duration', '');
  }

  // Compact mode
  if (settings.compactMode) {
    root.classList.add('compact-mode');
  } else {
    root.classList.remove('compact-mode');
  }
}
