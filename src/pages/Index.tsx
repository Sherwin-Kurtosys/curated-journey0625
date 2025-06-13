
import { useNavigate } from "react-router-dom";
import { JourneyTile } from "@/components/JourneyTile";
import { FileText, FolderOpen, BarChart3, Users } from "lucide-react";

const journeys = [
  {
    id: "report-creator",
    icon: FileText,
    title: "Report Creator",
    description: "Design and update report templates"
  },
  {
    id: "data-manager", 
    icon: FolderOpen,
    title: "Data Manager",
    description: "Manage data sources and connections"
  },
  {
    id: "report-generator",
    icon: BarChart3,
    title: "Report Generator", 
    description: "Generate reports from templates"
  },
  {
    id: "report-validator",
    icon: Users,
    title: "Report Validator",
    description: "Review and validate report accuracy"
  }
];

const Index = () => {
  const navigate = useNavigate();

  const handleJourneySelect = (journeyId: string) => {
    navigate(`/role/${journeyId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Welcome!
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            What would you like to do today?
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {journeys.map((journey) => (
            <JourneyTile
              key={journey.id}
              icon={journey.icon}
              title={journey.title}
              description={journey.description}
              onClick={() => handleJourneySelect(journey.id)}
            />
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-sm text-muted-foreground">
            Select your role to access relevant tools and features
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
