import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Search, Upload, Grid, List, Filter, 
  FileText, File, FileImage, 
  MoreVertical, ArrowLeft,
  Users, Car, Briefcase, Scale
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DocumentUploadDialog } from "@/components/documents/DocumentUploadDialog";
import { DocumentCard } from "@/components/documents/DocumentCard";
import { DocumentList } from "@/components/documents/DocumentList";
import { cn } from "@/lib/utils";

export default function DocumentManagement() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Mock data - replace with real data from Supabase
  const documents = [
    {
      id: "1",
      name: "Licencia de conducir.pdf",
      type: "pdf",
      category: "student",
      status: "active",
      lastModified: new Date(),
      size: "2.5 MB",
      owner: "Juan Pérez"
    },
    {
      id: "2",
      name: "Manual de prácticas.docx",
      type: "doc",
      category: "staff",
      status: "archived",
      lastModified: new Date(),
      size: "1.8 MB",
      owner: "María García"
    },
    {
      id: "3",
      name: "Seguro vehículo.pdf",
      type: "pdf",
      category: "vehicle",
      status: "active",
      lastModified: new Date(),
      size: "3.2 MB",
      owner: "Admin"
    },
    {
      id: "4",
      name: "Contrato legal.pdf",
      type: "pdf",
      category: "legal",
      status: "active",
      lastModified: new Date(),
      size: "1.5 MB",
      owner: "Departamento Legal"
    },
  ];

  const categories = [
    { id: "student", label: "Documentos de Alumnos", icon: Users },
    { id: "vehicle", label: "Documentos de Vehículos", icon: Car },
    { id: "staff", label: "Documentos del Personal", icon: Briefcase },
    { id: "legal", label: "Documentos Legales", icon: Scale },
  ];

  const documentStats = {
    total: documents.length,
    active: documents.filter((d) => d.status === "active").length,
    archived: documents.filter((d) => d.status === "archived").length,
  };

  return (
    <div className="min-h-screen bg-gray-50/40">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/software")}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Documentos</h1>
              <p className="text-sm text-muted-foreground">
                Gestiona todos los documentos de la autoescuela
              </p>
            </div>
          </div>
          <Button onClick={() => setShowUploadDialog(true)}>
            <Upload className="h-4 w-4 mr-2" />
            Subir documento
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-muted-foreground">Total documentos</div>
            <div className="text-2xl font-bold">{documentStats.total}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-muted-foreground">Documentos activos</div>
            <div className="text-2xl font-bold">{documentStats.active}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-muted-foreground">Archivados</div>
            <div className="text-2xl font-bold">{documentStats.archived}</div>
          </div>
        </div>

        {/* Document Categories */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Todos
            </TabsTrigger>
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="flex items-center gap-2"
              >
                <category.icon className="h-4 w-4" />
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Document Manager */}
          <div className="space-y-4">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar documentos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      Filtrar
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    {categories.map((category) => (
                      <DropdownMenuItem
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        {category.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <div className="flex rounded-md border bg-background">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "rounded-none",
                      viewMode === "grid" && "bg-muted"
                    )}
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "rounded-none",
                      viewMode === "list" && "bg-muted"
                    )}
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Document Grid/List */}
            <TabsContent value="all" className="mt-0">
              <div className={cn("grid gap-4", 
                viewMode === "grid" 
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
                  : "grid-cols-1"
              )}>
                {documents
                  .filter(
                    (doc) =>
                      (!selectedCategory || doc.category === selectedCategory) &&
                      (!searchQuery ||
                        doc.name.toLowerCase().includes(searchQuery.toLowerCase()))
                  )
                  .map((document) =>
                    viewMode === "grid" ? (
                      <DocumentCard key={document.id} document={document} />
                    ) : (
                      <DocumentList key={document.id} document={document} />
                    )
                  )}
              </div>
            </TabsContent>

            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-0">
                <div className={cn("grid gap-4", 
                  viewMode === "grid" 
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
                    : "grid-cols-1"
                )}>
                  {documents
                    .filter(
                      (doc) =>
                        doc.category === category.id &&
                        (!searchQuery ||
                          doc.name.toLowerCase().includes(searchQuery.toLowerCase()))
                    )
                    .map((document) =>
                      viewMode === "grid" ? (
                        <DocumentCard key={document.id} document={document} />
                      ) : (
                        <DocumentList key={document.id} document={document} />
                      )
                    )}
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>

        {/* Upload Dialog */}
        <DocumentUploadDialog
          open={showUploadDialog}
          onClose={() => setShowUploadDialog(false)}
        />
      </div>
    </div>
  );
}