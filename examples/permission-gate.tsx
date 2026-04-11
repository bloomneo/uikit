import { Button, PermissionGate, PermissionProvider } from '@bloomneo/uikit';

// Bring your own auth source. PermissionProvider just needs a `check` function
// that takes a permission string and returns a boolean.
const currentUser = { roles: ['admin', 'editor'] };
const check = (perm: string) => currentUser.roles.includes(perm);

export default function PermissionGateExample() {
  return (
    <PermissionProvider check={check}>
      <div className="flex flex-col gap-3">
        {/* Single permission */}
        <PermissionGate when="admin">
          <Button variant="destructive">Delete user (admin only)</Button>
        </PermissionGate>

        {/* OR semantics across multiple roles */}
        <PermissionGate when={['admin', 'moderator']} fallback={<span className="text-sm text-muted-foreground">Restricted</span>}>
          <Button>Moderate comments</Button>
        </PermissionGate>

        {/* Custom predicate */}
        <PermissionGate when={() => currentUser.roles.length > 1}>
          <span className="text-sm">You have multiple roles.</span>
        </PermissionGate>
      </div>
    </PermissionProvider>
  );
}
