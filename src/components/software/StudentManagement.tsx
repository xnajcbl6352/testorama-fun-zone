import { StudentDashboard } from "./students/StudentDashboard";

export function StudentManagement() {
  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm">
      <StudentDashboard />
    </div>
  );
}