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
export declare const PLATFORMS: {
    readonly WEB: "web";
    readonly NATIVE: "native";
    readonly TAURI: "tauri";
    readonly UNKNOWN: "unknown";
};
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
export declare function detectPlatform(): Platform;
/**
 * Determines if code is running in browser environment
 * @returns {boolean} True if running in browser
 */
export declare function isBrowser(): boolean;
/**
 * Determines if code is running in React Native environment
 * @returns {boolean} True if running in React Native
 */
export declare function isNative(): boolean;
/**
 * Determines if code is running in Tauri environment
 * @returns {boolean} True if running in Tauri
 */
export declare function isTauri(): boolean;
/**
 * Determines if code is running in Node.js environment
 * @returns {boolean} True if running in Node.js
 */
export declare function isNode(): boolean;
/**
 * Determines if code is running server-side (SSR)
 * @returns {boolean} True if running server-side
 */
export declare function isSSR(): boolean;
/**
 * Gets basic browser information
 * @returns {BrowserInfo} Browser information object
 */
export declare function getBrowserInfo(): BrowserInfo;
/**
 * Detects platform capabilities
 * @returns {PlatformCapabilities} Object describing platform capabilities
 */
export declare function getPlatformCapabilities(): PlatformCapabilities;
/**
 * Gets the operating system from user agent
 * @returns {string} Operating system name
 */
export declare function getOperatingSystem(): string;
/**
 * Checks if the current device is mobile
 * @returns {boolean} True if running on mobile device
 */
export declare function isMobile(): boolean;
/**
 * Checks if the current device is tablet
 * @returns {boolean} True if running on tablet device
 */
export declare function isTablet(): boolean;
/**
 * Checks if the current device is desktop
 * @returns {boolean} True if running on desktop device
 */
export declare function isDesktop(): boolean;
/**
 * Gets device type
 * @returns {'mobile' | 'tablet' | 'desktop' | 'unknown'} Device type
 */
export declare function getDeviceType(): 'mobile' | 'tablet' | 'desktop' | 'unknown';
/**
 * Checks if the current browser supports a specific feature
 * @param {string} feature - Feature name to check
 * @returns {boolean} True if feature is supported
 */
export declare function supportsFeature(feature: string): boolean;
/**
 * Platform-specific utility object
 */
export declare const platform: {
    readonly detect: typeof detectPlatform;
    readonly is: {
        readonly browser: typeof isBrowser;
        readonly native: typeof isNative;
        readonly tauri: typeof isTauri;
        readonly node: typeof isNode;
        readonly ssr: typeof isSSR;
    };
    readonly device: {
        readonly isMobile: typeof isMobile;
        readonly isTablet: typeof isTablet;
        readonly isDesktop: typeof isDesktop;
        readonly getType: typeof getDeviceType;
    };
    readonly browser: {
        readonly getInfo: typeof getBrowserInfo;
        readonly getOS: typeof getOperatingSystem;
    };
    readonly capabilities: typeof getPlatformCapabilities;
    readonly supports: typeof supportsFeature;
    readonly PLATFORMS: {
        readonly WEB: "web";
        readonly NATIVE: "native";
        readonly TAURI: "tauri";
        readonly UNKNOWN: "unknown";
    };
};
/**
 * Default export for convenience
 */
export default platform;
//# sourceMappingURL=platform.d.ts.map