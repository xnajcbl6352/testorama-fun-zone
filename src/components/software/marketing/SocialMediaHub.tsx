import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Twitter, Youtube, BarChart2 } from "lucide-react";

export function SocialMediaHub() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Facebook className="h-8 w-8 text-blue-600" />
            <Button variant="outline" size="sm">Connect</Button>
          </div>
          <h3 className="font-semibold mb-1">Facebook</h3>
          <p className="text-sm text-gray-600">Not connected</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Instagram className="h-8 w-8 text-pink-600" />
            <Button variant="outline" size="sm">Connect</Button>
          </div>
          <h3 className="font-semibold mb-1">Instagram</h3>
          <p className="text-sm text-gray-600">Not connected</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Twitter className="h-8 w-8 text-blue-400" />
            <Button variant="outline" size="sm">Connect</Button>
          </div>
          <h3 className="font-semibold mb-1">Twitter</h3>
          <p className="text-sm text-gray-600">Not connected</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Youtube className="h-8 w-8 text-red-600" />
            <Button variant="outline" size="sm">Connect</Button>
          </div>
          <h3 className="font-semibold mb-1">YouTube</h3>
          <p className="text-sm text-gray-600">Not connected</p>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Social Performance</h3>
            <BarChart2 className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            Analytics coming soon
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Content Calendar</h3>
            <Button variant="outline" size="sm">Schedule Post</Button>
          </div>
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            Calendar coming soon
          </div>
        </Card>
      </div>
    </div>
  );
}