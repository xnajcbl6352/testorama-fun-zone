import { FileText, File, FileImage, MoreVertical, Download, Share2, Archive, User } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DocumentCardProps {
  document: {
    id: string;
    name: string;
    type: string;
    category: string;
    status: string;
    lastModified: Date;
    size: string;
    owner: string;
  };
}

export function DocumentCard({ document }: DocumentCardProps) {
  const getIcon = () => {
    switch (document.type) {
      case "pdf":
        return <File className="h-6 w-6 text-red-500" />;
      case "image":
        return <FileImage className="h-6 w-6 text-blue-500" />;
      default:
        return <FileText className="h-6 w-6 text-gray-500" />;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "student":
        return "Alumno";
      case "vehicle":
        return "Vehículo";
      case "staff":
        return "Personal";
      case "legal":
        return "Legal";
      default:
        return category;
    }
  };

  return (
    <div className="group relative bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          {getIcon()}
          <div>
            <h3 className="font-medium text-sm truncate max-w-[200px]">
              {document.name}
            </h3>
            <p className="text-xs text-muted-foreground">{document.size}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Download className="h-4 w-4 mr-2" />
              Descargar
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Share2 className="h-4 w-4 mr-2" />
              Compartir
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Archive className="h-4 w-4 mr-2" />
              Archivar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between">
          <Badge
            variant={document.status === "active" ? "secondary" : "outline"}
            className="text-xs"
          >
            {getCategoryLabel(document.category)}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {formatDate(document.lastModified.toISOString())}
          </span>
        </div>
        <div className="flex items-center text-xs text-muted-foreground">
          <User className="h-3 w-3 mr-1" />
          {document.owner}
        </div>
      </div>
    </div>
  );
}