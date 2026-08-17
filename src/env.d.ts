/// <reference types="vite/client" />

/**
 * Ambient types for the Vite build environment.
 *
 * This reference previously lived inside `components/layouts/layout-wrapper.tsx`,
 * so deleting that component silently removed `ImportMeta.env` typing from the
 * whole project. A type reference the build depends on belongs in a declaration
 * file, not hidden in a component that might be refactored away.
 */
export {};
