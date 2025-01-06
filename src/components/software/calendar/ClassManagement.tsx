import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, BookOpen, Car, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ClassCard } from "./ClassCard";
import { NewClassModal } from "./NewClassModal";
import { useClasses } from "@/hooks/useClasses";
import type { Class } from "@/types/class";

type ClassType = 'theoretical' | 'practical' | 'exam';
type ClassStatus = 'scheduled' | 'completed' | 'cancelled';

export function ClassManagement() {
  const [selectedTab, setSelectedTab] = useState<ClassStatus>("scheduled");
  const [selectedTypes, setSelectedTypes] = useState<ClassType[]>([]);
  const [isNewClassModalOpen, setIsNewClassModalOpen] = useState(false);
  const { loadClasses, isLoading } = useClasses();
  const [classes, setClasses] = useState<Class[]>([]);

  const filterTypes: Array<{ value: ClassType; label: string; icon: any }> = [
    { value: 'theoretical', label: 'Theory', icon: BookOpen },
    { value: 'practical', label: 'Practical', icon: Car },
    { value: 'exam', label: 'Exam', icon: Award },
  ];

  const toggleFilter = (type: ClassType) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const filteredClasses = classes.filter(classItem => {
    const matchesStatus = classItem.status === selectedTab;
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(classItem.type);
    return matchesStatus && matchesType;
  });

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Class Management</h2>
        <Button onClick={() => setIsNewClassModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Class
        </Button>
      </div>

      <Tabs value={selectedTab} onValueChange={(value) => setSelectedTab(value as ClassStatus)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex gap-2 flex-wrap">
        {filterTypes.map(({ value, label, icon: Icon }) => (
          <Badge
            key={value}
            variant="outline"
            className={cn(
              "cursor-pointer hover:bg-accent",
              selectedTypes.includes(value) && "bg-accent"
            )}
            onClick={() => toggleFilter(value)}
          >
            <Icon className="mr-2 h-4 w-4" />
            {label}
          </Badge>
        ))}
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-2 pr-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <p>Loading classes...</p>
            </div>
          ) : filteredClasses.length === 0 ? (
            <div className="flex items-center justify-center h-32 text-muted-foreground">
              <p>No classes found</p>
            </div>
          ) : (
            filteredClasses.map((classItem) => (
              <ClassCard
                key={classItem.id}
                classData={classItem}
              />
            ))
          )}
        </div>
      </ScrollArea>

      <NewClassModal
        open={isNewClassModalOpen}
        onClose={() => setIsNewClassModalOpen(false)}
      />
    </div>
  );
}