import { useState } from 'react';
import { Button, FormField, Input, PasswordInput } from '@voilajsx/uikit';

export default function FormFieldExample() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailError = email && !email.includes('@') ? 'Enter a valid email address' : undefined;

  return (
    <form className="flex max-w-sm flex-col gap-4">
      <FormField label="Email" required error={emailError} helper="We'll never share it">
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </FormField>

      <FormField label="Password" required>
        <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
      </FormField>

      <Button type="submit">Sign in</Button>
    </form>
  );
}
