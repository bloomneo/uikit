/**
 * Login recipe.
 *
 * Centered card with email + password form, inline validation, and a
 * submit button. No backend — wire your auth call where the comment is.
 */

import { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  FormField,
  Input,
  PasswordInput,
  ToastProvider,
  toast,
} from '@bloomneo/uikit';

export default function LoginRecipe() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const emailError =
    email && !email.includes('@') ? 'Enter a valid email address' : undefined;
  const passwordError =
    password && password.length < 8 ? 'Must be at least 8 characters' : undefined;

  const canSubmit =
    email && password && !emailError && !passwordError && !submitting;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      // → call your auth API here
      await new Promise((r) => setTimeout(r, 600));
      toast.success('Welcome back');
    } catch {
      toast.error('Login failed');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <ToastProvider />
      <div className="flex min-h-screen items-center justify-center bg-muted/30 p-6">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Sign in</CardTitle>
            <CardDescription>Welcome back to your workspace</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-4" onSubmit={onSubmit}>
              <FormField label="Email" required error={emailError}>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </FormField>
              <FormField label="Password" required error={passwordError}>
                <PasswordInput
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </FormField>
              <Button type="submit" disabled={!canSubmit}>
                {submitting ? 'Signing in…' : 'Sign in'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
