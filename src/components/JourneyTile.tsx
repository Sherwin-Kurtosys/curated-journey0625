
import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface JourneyTileProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick: () => void;
}

export function JourneyTile({ icon: Icon, title, description, onClick }: JourneyTileProps) {
  return (
    <Card 
      className="p-8 h-48 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg border-2 border-border hover:border-primary/50 bg-gradient-to-br from-background to-muted/30"
      onClick={onClick}
    >
      <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
        <div className="p-4 rounded-full bg-primary/10">
          <Icon size={32} className="text-primary" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
    </Card>
  );
}
