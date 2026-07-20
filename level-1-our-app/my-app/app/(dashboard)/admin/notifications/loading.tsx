import { NotificationsSkeleton } from "./_components/NotificationsSkeleton";

export default function NotificationsLoading() {
  return (
    <main>
      <div className="space-y-0.5 px-4 sm:px-6 md:block">
        <NotificationsSkeleton />
      </div>
    </main>
  );
}
