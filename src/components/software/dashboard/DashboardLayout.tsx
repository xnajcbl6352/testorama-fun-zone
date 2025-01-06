import { useState } from "react";
import { KPIOverview } from "./KPIOverview";
import { ActivityCenter } from "./ActivityCenter";
import { PerformanceMetrics } from "./PerformanceMetrics";
import { QuickActions } from "./QuickActions";
import { AlertsNotifications } from "./AlertsNotifications";

export function DashboardLayout() {
  return (
    <div className="space-y-6 p-6">
      <KPIOverview />
      <div className="grid gap-6 md:grid-cols-2">
        <ActivityCenter />
        <PerformanceMetrics />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <QuickActions />
        <AlertsNotifications />
      </div>
    </div>
  );
}