import { ReportBuilder } from "../ReportBuilder";
import { GeneratedReports } from "../GeneratedReports";
import { AutomatedReports } from "../AutomatedReports";

export function CustomReports() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-4">
        <ReportBuilder />
        <AutomatedReports />
      </div>
      <GeneratedReports />
    </div>
  );
}