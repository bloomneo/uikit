/**
 * Settings recipe.
 *
 * Tabs containing a profile form, a security form, and a notifications form.
 * Each section has its own save handler that fires a toast.
 */

import { useState } from 'react';
import {
  Button,
  FormField,
  Input,
  PageHeader,
  PasswordInput,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  ToastProvider,
  toast,
} from '@voilajsx/uikit';

function ProfileForm() {
  const [name, setName] = useState('Alice');
  const [email, setEmail] = useState('alice@example.com');
  return (
    <form
      className="flex max-w-md flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        toast.success('Profile saved');
      }}
    >
      <FormField label="Name" required>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </FormField>
      <FormField label="Email" required>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </FormField>
      <Button type="submit" className="self-start">Save profile</Button>
    </form>
  );
}

function SecurityForm() {
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  return (
    <form
      className="flex max-w-md flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        toast.success('Password updated');
      }}
    >
      <FormField label="Current password" required>
        <PasswordInput value={current} onChange={(e) => setCurrent(e.target.value)} />
      </FormField>
      <FormField label="New password" required helper="At least 12 characters">
        <PasswordInput value={next} onChange={(e) => setNext(e.target.value)} />
      </FormField>
      <Button type="submit" className="self-start">Update password</Button>
    </form>
  );
}

function NotificationsForm() {
  const [email, setEmail] = useState(true);
  const [push, setPush] = useState(false);
  return (
    <div className="flex max-w-md flex-col gap-4">
      <label className="flex items-center justify-between">
        <span className="text-sm">Email notifications</span>
        <Switch checked={email} onCheckedChange={setEmail} />
      </label>
      <label className="flex items-center justify-between">
        <span className="text-sm">Push notifications</span>
        <Switch checked={push} onCheckedChange={setPush} />
      </label>
      <Button onClick={() => toast.success('Preferences saved')} className="self-start">
        Save preferences
      </Button>
    </div>
  );
}

export default function SettingsRecipe() {
  return (
    <>
      <ToastProvider />
      <div className="flex flex-col gap-6 p-6">
        <PageHeader title="Settings" description="Manage your account preferences" />
        <Tabs defaultValue="profile">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          <TabsContent value="profile" className="pt-4">
            <ProfileForm />
          </TabsContent>
          <TabsContent value="security" className="pt-4">
            <SecurityForm />
          </TabsContent>
          <TabsContent value="notifications" className="pt-4">
            <NotificationsForm />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
