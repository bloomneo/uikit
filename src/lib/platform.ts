/**
 * @fileoverview Platform detection utilities for @bloomneo/uikit
 * @description Detects runtime platform for adaptive component rendering with TypeScript support
 * @package @bloomneo/uikit
 * @file /src/lib/platform.ts
 */

/**
 * Extend Window interface to include Tauri globals
 */
declare global {
  interface Window {
    __TAURI__?: any;
    __TAURI_IPC__?: any;
    __TAURI_INVOKE__?: any;
  }
}

/**
 * Available platforms enum for type safety
 */
export const PLATFORMS = {
  WEB: 'web',
  NATIVE: 'native',
  TAURI: 'tauri',
  UNKNOWN: 'unknown',
} as const;

/**
 * Platform type derived from PLATFORMS values
 */
export type Platform = typeof PLATFORMS[keyof typeof PLATFORMS];

/**
 * Browser information interface
 */
export interface BrowserInfo {
  name: string;
  version: string;
  platform: Platform;
}

/**
 * Platform capabilities interface
 */
export interface PlatformCapabilities {
  hasClipboard: boolean;
  hasNotifications: boolean;
  hasGeolocation: boolean;
  hasCamera: boolean;
  hasFileSystem: boolean;
  hasLocalStorage: boolean;
  hasWebGL: boolean;
}

/**
 * Detects the current platform with type safety
 * @returns {Platform} Platform identifier from PLATFORMS
 */
export function detectPlatform(): Platform {
  // Check if we're in a browser environment
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    // Check for Tauri
    if (
      window.__TAURI__ !== undefined || 
      window.__TAURI_IPC__ !== undefined ||
      window.__TAURI_INVOKE__ !== undefined
    ) {
      return PLATFORMS.TAURI;
    }
    return PLATFORMS.WEB;
  }

  // Check for React Native
  if (
    typeof navigator !== 'undefined' && 
    navigator.product === 'ReactNative'
  ) {
    return PLATFORMS.NATIVE;
  }

  // Check for Node.js environment
  if (
    typeof process !== 'undefined' && 
    process.versions && 
    process.versions.node
  ) {
    return PLATFORMS.UNKNOWN;
  }

  return PLATFORMS.UNKNOWN;
}

/**
 * Determines if code is running in browser environment
 * @returns {boolean} True if running in browser
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

/**
 * Determines if code is running in React Native environment
 * @returns {boolean} True if running in React Native
 */
export function isNative(): boolean {
  return (
    typeof navigator !== 'undefined' && 
    navigator.product === 'ReactNative'
  );
}

/**
 * Determines if code is running in Tauri environment
 * @returns {boolean} True if running in Tauri
 */
export function isTauri(): boolean {
  return (
    typeof window !== 'undefined' &&
    (
      window.__TAURI__ !== undefined || 
      window.__TAURI_IPC__ !== undefined ||
      window.__TAURI_INVOKE__ !== undefined
    )
  );
}

/**
 * Determines if code is running in Node.js environment
 * @returns {boolean} True if running in Node.js
 */
export function isNode(): boolean {
  return (
    typeof process !== 'undefined' && 
    process.versions && 
    process.versions.node !== undefined
  );
}

/**
 * Determines if code is running server-side (SSR)
 * @returns {boolean} True if running server-side
 */
export function isSSR(): boolean {
  return typeof window === 'undefined';
}

/**
 * Gets basic browser information
 * @returns {BrowserInfo} Browser information object
 */
export function getBrowserInfo(): BrowserInfo {
  if (!isBrowser()) {
    return {
      name: 'Unknown',
      version: 'Unknown',
      platform: PLATFORMS.UNKNOWN,
    };
  }

  const userAgent = navigator.userAgent;
  let name = 'Unknown';
  let version = 'Unknown';

  // Detect browser name and version
  if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
    name = 'Chrome';
    const match = userAgent.match(/Chrome\/(\d+)/);
    version = match ? match[1] : 'Unknown';
  } else if (userAgent.includes('Firefox')) {
    name = 'Firefox';
    const match = userAgent.match(/Firefox\/(\d+)/);
    version = match ? match[1] : 'Unknown';
  } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
    name = 'Safari';
    const match = userAgent.match(/Version\/(\d+)/);
    version = match ? match[1] : 'Unknown';
  } else if (userAgent.includes('Edg')) {
    name = 'Edge';
    const match = userAgent.match(/Edg\/(\d+)/);
    version = match ? match[1] : 'Unknown';
  }

  return {
    name,
    version,
    platform: detectPlatform(),
  };
}

/**
 * Detects platform capabilities
 * @returns {PlatformCapabilities} Object describing platform capabilities
 */
export function getPlatformCapabilities(): PlatformCapabilities {
  if (!isBrowser()) {
    return {
      hasClipboard: false,
      hasNotifications: false,
      hasGeolocation: false,
      hasCamera: false,
      hasFileSystem: false,
      hasLocalStorage: false,
      hasWebGL: false,
    };
  }

  return {
    hasClipboard: 'clipboard' in navigator,
    hasNotifications: 'Notification' in window,
    hasGeolocation: 'geolocation' in navigator,
    hasCamera: 'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices,
    hasFileSystem: 'showOpenFilePicker' in window,
    hasLocalStorage: (() => {
      try {
        const test = '__storage_test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
      } catch {
        return false;
      }
    })(),
    hasWebGL: (() => {
      try {
        const canvas = document.createElement('canvas');
        return !!(
          canvas.getContext('webgl') || 
          canvas.getContext('experimental-webgl')
        );
      } catch {
        return false;
      }
    })(),
  };
}

/**
 * Gets the operating system from user agent
 * @returns {string} Operating system name
 */
export function getOperatingSystem(): string {
  if (!isBrowser()) return 'Unknown';

  const userAgent = navigator.userAgent;
  
  if (userAgent.includes('Win')) return 'Windows';
  if (userAgent.includes('Mac')) return 'macOS';
  if (userAgent.includes('Linux')) return 'Linux';
  if (userAgent.includes('Android')) return 'Android';
  if (userAgent.includes('iPhone') || userAgent.includes('iPad')) return 'iOS';
  
  return 'Unknown';
}

/**
 * Checks if the current device is mobile
 * @returns {boolean} True if running on mobile device
 */
export function isMobile(): boolean {
  if (!isBrowser()) return false;

  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

/**
 * Checks if the current device is tablet
 * @returns {boolean} True if running on tablet device
 */
export function isTablet(): boolean {
  if (!isBrowser()) return false;

  return /iPad|Android(?!.*Mobile)/i.test(navigator.userAgent);
}

/**
 * Checks if the current device is desktop
 * @returns {boolean} True if running on desktop device
 */
export function isDesktop(): boolean {
  return !isMobile() && !isTablet();
}

/**
 * Gets device type
 * @returns {'mobile' | 'tablet' | 'desktop' | 'unknown'} Device type
 */
export function getDeviceType(): 'mobile' | 'tablet' | 'desktop' | 'unknown' {
  if (!isBrowser()) return 'unknown';
  
  if (isMobile()) return 'mobile';
  if (isTablet()) return 'tablet';
  if (isDesktop()) return 'desktop';
  
  return 'unknown';
}

/**
 * Checks if the current browser supports a specific feature
 * @param {string} feature - Feature name to check
 * @returns {boolean} True if feature is supported
 */
export function supportsFeature(feature: string): boolean {
  if (!isBrowser()) return false;

  const features: Record<string, () => boolean> = {
    webgl: () => {
      try {
        const canvas = document.createElement('canvas');
        return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
      } catch {
        return false;
      }
    },
    webgl2: () => {
      try {
        const canvas = document.createElement('canvas');
        return !!canvas.getContext('webgl2');
      } catch {
        return false;
      }
    },
    webrtc: () => 'RTCPeerConnection' in window,
    websockets: () => 'WebSocket' in window,
    serviceworker: () => 'serviceWorker' in navigator,
    indexeddb: () => 'indexedDB' in window,
    localstorage: () => {
      try {
        const test = '__test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
      } catch {
        return false;
      }
    },
    clipboard: () => 'clipboard' in navigator,
    notifications: () => 'Notification' in window,
    geolocation: () => 'geolocation' in navigator,
    camera: () => 'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices,
    filesystem: () => 'showOpenFilePicker' in window,
  };

  const checker = features[feature.toLowerCase()];
  return checker ? checker() : false;
}

/**
 * Platform-specific utility object
 */
export const platform = {
  // Core detection
  detect: detectPlatform,
  is: {
    browser: isBrowser,
    native: isNative,
    tauri: isTauri,
    node: isNode,
    ssr: isSSR,
  },
  
  // Device detection
  device: {
    isMobile,
    isTablet,
    isDesktop,
    getType: getDeviceType,
  },
  
  // Browser info
  browser: {
    getInfo: getBrowserInfo,
    getOS: getOperatingSystem,
  },
  
  // Capabilities
  capabilities: getPlatformCapabilities,
  supports: supportsFeature,
  
  // Constants
  PLATFORMS,
} as const;

/**
 * Default export for convenience
 */
export default platform;