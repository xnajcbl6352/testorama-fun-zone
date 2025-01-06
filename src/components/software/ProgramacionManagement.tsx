import { ClassScheduler } from "./calendar/ClassScheduler";

export function ProgramacionManagement() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Programación de Clases</h1>
      <ClassScheduler />
    </div>
  );
}