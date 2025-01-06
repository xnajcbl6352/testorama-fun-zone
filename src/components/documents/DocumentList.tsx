import { FileText, FilePdf, FileImage, MoreVertical, Download, Share2, Archive } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DocumentListProps {
  document: {
    id: string;
    name: string;
    type: string;
    category: string;
    status: string;
    lastModified: Date;
    size: string;
  };
}

export function DocumentList({ document }: DocumentListProps) {
  const getIcon = () => {
    switch (document.type) {
      case "pdf":
        return <FilePdf className="h-5 w-5 text-red-500" />;
      case "image":
        return <FileImage className="h-5 w-5 text-blue-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="group flex items-center justify-between bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-4">
        {getIcon()}
        <div>
          <h3 className="font-medium">{document.name}</h3>
          <p className="text-sm text-muted-foreground">{document.size}</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <Badge
          variant={document.status === "active" ? "secondary" : "outline"}
        >
          {document.category}
        </Badge>
        <span className="text-sm text-muted-foreground min-w-[120px] text-right">
          {formatDate(document.lastModified.toISOString())}
        </span>
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
    </div>
  );
}