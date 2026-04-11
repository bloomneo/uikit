/**
 * TabBar Section - Mobile bottom navigation tabs
 * @module @bloomneo/uikit
 * @file src/components/sections/tab-bar.tsx
 */
import * as React from 'react';
import type { NavigationItem, Size, Tone } from '@/types';
/**
 * TabBar variant styles
 */
export type TabBarVariant = 'default' | 'floating' | 'minimal';
/**
 * TabBar Component Props
 */
export interface TabBarProps {
    /** REQUIRED: Navigation tabs */
    tabs: NavigationItem[];
    /** OPTIONAL: Currently active tab ID */
    activeTab?: string;
    /** OPTIONAL: Default active tab ID */
    defaultActiveTab?: string;
    /** OPTIONAL: Tab click handler */
    onTabClick?: (tabId: string) => void;
    /** OPTIONAL: Visual styling tone (default: "clean") */
    tone?: Tone;
    /** OPTIONAL: Tab size (default: "md") */
    size?: Size;
    /** OPTIONAL: Tab bar variant (default: "default") */
    variant?: TabBarVariant;
    /** OPTIONAL: Show labels (default: true) */
    showLabels?: boolean;
    /** OPTIONAL: Additional CSS classes */
    className?: string;
}
/**
 * TabBar - Mobile bottom navigation tabs
 * Supports icons, badges, and multiple visual variants
 *
 * @llm-usage
 * <TabBar
 *   tabs={[
 *     { id: 'home', label: 'Home', icon: <HomeIcon />, badge: 3 },
 *     { id: 'profile', label: 'Profile', icon: <UserIcon /> }
 *   ]}
 *   activeTab="home"
 *   onTabClick={(id) => navigate(`/${id}`)}
 *   tone="clean"
 *   size="md"
 * />
 *
 * @example Default tab bar
 * <TabBar tabs={tabs} activeTab="home" onTabClick={handleTabClick} />
 *
 * @example Floating variant
 * <TabBar tabs={tabs} variant="floating" tone="brand" />
 *
 * @example Minimal (icons only)
 * <TabBar tabs={tabs} variant="minimal" showLabels={false} />
 */
export declare const TabBar: React.ForwardRefExoticComponent<TabBarProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=tab-bar.d.ts.map