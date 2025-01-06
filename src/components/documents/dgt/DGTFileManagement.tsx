import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DGTSubmission } from "./DGTSubmission";
import { DGTStatusTracking } from "./DGTStatusTracking";
import { DGTDocumentGeneration } from "./DGTDocumentGeneration";
import { DGTHistory } from "./DGTHistory";

export function DGTFileManagement() {
  return (
    <Tabs defaultValue="submission" className="space-y-4">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="submission">Presentación</TabsTrigger>
        <TabsTrigger value="status">Estado</TabsTrigger>
        <TabsTrigger value="generation">Documentos</TabsTrigger>
        <TabsTrigger value="history">Historial</TabsTrigger>
      </TabsList>

      <TabsContent value="submission">
        <DGTSubmission />
      </TabsContent>

      <TabsContent value="status">
        <DGTStatusTracking />
      </TabsContent>

      <TabsContent value="generation">
        <DGTDocumentGeneration />
      </TabsContent>

      <TabsContent value="history">
        <DGTHistory />
      </TabsContent>
    </Tabs>
  );
}