/**
 * Auth Layout with standardized prop naming and scheme system - FIXED & READY
 * @module @bloomneo/uikit
 * @file src/components/layouts/auth.tsx
 */
import * as React from 'react';
import type { AuthLayoutProps } from '@/types';
/**
 * AuthLayout - Unified authentication layout with standardized props
 * @llm-usage
 * <AuthLayout scheme="card" tone="clean" title="Sign In" logo={<Logo />}>
 *   <LoginForm />
 * </AuthLayout>
 */
declare const AuthLayoutComponent: React.ForwardRefExoticComponent<AuthLayoutProps & React.RefAttributes<HTMLDivElement>>;
export { AuthLayoutComponent as AuthLayout };
//# sourceMappingURL=auth.d.ts.map