'use client';

const DEVICE_STORAGE_KEY = 'munaasaba_device_fp_token';
const RSVP_STORAGE_PREFIX = 'munaasaba_rsvp_done_';

/**
 * Generate a consistent, robust device fingerprint combining a persistent UUID
 * with client hardware/browser telemetry to enforce one-tap-per-device.
 */
export function getDeviceFingerprint(): string {
  if (typeof window === 'undefined') {
    return 'server-render-token';
  }

  let persistentToken = localStorage.getItem(DEVICE_STORAGE_KEY);
  if (!persistentToken) {
    persistentToken = 'fp_' + Math.random().toString(36).substring(2, 15) + '_' + Date.now().toString(36);
    try {
      localStorage.setItem(DEVICE_STORAGE_KEY, persistentToken);
    } catch {
      // Ignore Safari private browsing storage errors
    }
  }

  // Combine with browser signals
  const screenSignal = `${window.screen.width}x${window.screen.height}x${window.screen.colorDepth}`;
  const tzSignal = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
  const langSignal = navigator.language || '';
  const agentSignal = navigator.userAgent ? navigator.userAgent.slice(0, 40) : '';

  // Simple DJB2-like string hash
  const rawEntropy = `${persistentToken}_${screenSignal}_${tzSignal}_${langSignal}_${agentSignal}`;
  let hash = 5381;
  for (let i = 0; i < rawEntropy.length; i++) {
    hash = (hash * 33) ^ rawEntropy.charCodeAt(i);
  }

  return `${persistentToken}_${(hash >>> 0).toString(16)}`;
}

export function hasLocalRsvpRecord(invitationId: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem(`${RSVP_STORAGE_PREFIX}${invitationId}`) === 'true';
  } catch {
    return false;
  }
}

export function setLocalRsvpRecord(invitationId: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`${RSVP_STORAGE_PREFIX}${invitationId}`, 'true');
  } catch {
    // Ignore storage quota
  }
}
