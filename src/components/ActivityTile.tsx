
import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ActivityTileProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick: () => void;
}

export function ActivityTile({ icon: Icon, title, description, onClick }: ActivityTileProps) {
  return (
    <Card 
      className="p-6 h-36 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-md border border-border hover:border-primary/40 bg-card"
      onClick={onClick}
    >
      <div className="flex items-center space-x-4 h-full">
        <div className="p-3 rounded-lg bg-primary/10 flex-shrink-0">
          <Icon size={24} className="text-primary" />
        </div>
        <div className="flex-1 space-y-1">
          <h4 className="font-medium text-foreground">{title}</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
    </Card>
  );
}
