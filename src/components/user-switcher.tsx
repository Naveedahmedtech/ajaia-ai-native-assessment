import { selectDemoUser } from "@/app/actions/demo-user";

type DemoUser = { id: string; name: string; email: string };

export function UserSwitcher({ currentUserId, users }: { currentUserId: string; users: DemoUser[] }) {
  return (
    <form action={selectDemoUser} className="flex items-center gap-2">
      <label className="sr-only" htmlFor="demo-user">Viewing as</label>
      <select className="theme-surface rounded-lg border px-3 py-2 text-sm" defaultValue={currentUserId} id="demo-user" name="userId">
        {users.map((user) => <option key={user.id} value={user.id}>{user.name}</option>)}
      </select>
      <button className="theme-surface rounded-lg border px-3 py-2 text-sm font-medium" type="submit">Switch</button>
    </form>
  );
}
