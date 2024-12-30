import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FileUp, X, File } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

interface DocumentUploadProps {
  onUploadComplete: (url: string) => void;
  currentUrl?: string | null;
}

export function DocumentUpload({ onUploadComplete, currentUrl }: DocumentUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "File size must be less than 5MB",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsUploading(true);
      const fileExt = file.name.split('.').pop();
      const filePath = `${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError, data } = await supabase.storage
        .from('records')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('records')
        .getPublicUrl(filePath);

      onUploadComplete(publicUrl);
      toast({
        title: "Success",
        description: "Document uploaded successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="space-y-4">
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-6",
          "flex flex-col items-center justify-center gap-2",
          "bg-muted/50 hover:bg-muted/80 transition-colors",
          "cursor-pointer"
        )}
      >
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          className="hidden"
          onChange={handleFileChange}
          id="document-upload"
          disabled={isUploading}
        />
        <label
          htmlFor="document-upload"
          className="flex flex-col items-center cursor-pointer"
        >
          <FileUp className="h-8 w-8 text-muted-foreground mb-2" />
          <span className="text-sm font-medium">
            {isUploading ? "Uploading..." : "Click to upload or drag and drop"}
          </span>
          <span className="text-xs text-muted-foreground">
            PDF, DOC up to 5MB
          </span>
        </label>
      </div>

      {isUploading && (
        <Progress value={progress} className="h-2" />
      )}

      {currentUrl && !isUploading && (
        <div className="flex items-center gap-2 p-2 bg-muted/50 rounded">
          <File className="h-4 w-4" />
          <a
            href={currentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline flex-1 truncate"
          >
            View Document
          </a>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => onUploadComplete("")}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}