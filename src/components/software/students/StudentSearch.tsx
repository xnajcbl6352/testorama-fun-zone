import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface StudentSearchProps {
  onSearch: (term: string) => void;
}

export function StudentSearch({ onSearch }: StudentSearchProps) {
  return (
    <div className="relative mb-6">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        placeholder="Search students..."
        className="pl-10"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}