import { MaintenanceNotice } from "@/components/MaintenanceNotice";

export default async function NotificationsPage() {
  return (
    <div>
      <MaintenanceNotice
      title="We're Sorry . . ."
      description="This section of the settings are temporarily unavailable while we upgrade this section."
    />
    </div>
  )
}