/**
 * <DetailPage> — pre-built detail/edit page layout with form sections, metadata, and actions.
 * @module @bloomneo/uikit
 * @file src/components/ui/detail-page.tsx
 *
 * @llm-rule WHEN: CRUD detail pages (user profile, product detail, settings page with multiple sections)
 * @llm-rule AVOID: Using for simple forms — use <Card> + <FormField> directly
 * @llm-rule NOTE: Compound components: DetailPage > DetailPageHeader + DetailPageContent + DetailPageSidebar + DetailPageActions
 * @llm-rule NOTE: FormSection provides labeled groups of form fields with consistent spacing
 * @see https://github.com/bloomneo/uikit/blob/main/llms.txt
 */
import React from 'react';
interface DetailAction {
    id: string;
    label: string;
    icon: React.ComponentType<{
        className?: string;
    }>;
    onClick: () => void;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary';
    disabled?: boolean;
    loading?: boolean;
    position?: 'primary' | 'secondary';
}
interface StatusConfig {
    active: boolean;
    activeLabel?: string;
    inactiveLabel?: string;
    activeText?: string;
    inactiveText?: string;
    customBadge?: React.ReactNode;
}
interface MetadataField {
    label: string;
    value: string | number | boolean;
    type?: 'text' | 'date' | 'datetime' | 'boolean' | 'number' | 'json' | 'badge';
    copyable?: boolean;
    icon?: React.ComponentType<{
        className?: string;
    }>;
    formatter?: (value: any) => string | React.ReactNode;
    badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline';
}
interface FormField {
    key: string;
    label: string;
    type: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select';
    value: any;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    options?: Array<{
        label: string;
        value: string;
        disabled?: boolean;
    }>;
    validation?: {
        minLength?: number;
        maxLength?: number;
        pattern?: string;
    };
    description?: string;
    rows?: number;
}
interface FormSection {
    title: string;
    icon?: React.ComponentType<{
        className?: string;
    }>;
    description?: string;
    fields: FormField[];
    collapsible?: boolean;
    defaultCollapsed?: boolean;
}
interface DeleteConfirmProps {
    open: boolean;
    entity: {
        name: string;
        type: string;
        icon?: React.ComponentType<{
            className?: string;
        }>;
    };
    confirmationValue: string;
    onConfirmationChange: (value: string) => void;
    onConfirm: () => void;
    onCancel: () => void;
    loading?: boolean;
}
interface DetailPageProps {
    title: string;
    subtitle?: string;
    icon?: React.ComponentType<{
        className?: string;
    }>;
    onBack: () => void;
    status?: StatusConfig;
    actions?: DetailAction[];
    formSections?: FormSection[];
    metadataFields?: MetadataField[];
    sidebarCards?: React.ReactNode[];
    isEditing?: boolean;
    onFormChange?: (key: string, value: any) => void;
    onSave?: () => void;
    onCancel?: () => void;
    saveText?: string;
    cancelText?: string;
    saving?: boolean;
    formValid?: boolean;
    loading?: boolean;
    error?: string;
    onClearError?: () => void;
    children?: React.ReactNode;
    className?: string;
}
/**
 * Generic Detail Page Layout - Pure shadcn/ui
 */
export declare function DetailPageLayout({ title, subtitle, icon: Icon, onBack, status, actions, formSections, metadataFields, sidebarCards, isEditing, onFormChange, onSave, onCancel, saveText, cancelText, saving, formValid, loading, error, onClearError, children, className }: DetailPageProps): import("react/jsx-runtime").JSX.Element;
/**
 * Delete confirmation dialog - Pure shadcn styling
 */
export declare function DeleteConfirmDialog({ open, entity, confirmationValue, onConfirmationChange, onConfirm, onCancel, loading }: DeleteConfirmProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=detail-page.d.ts.map