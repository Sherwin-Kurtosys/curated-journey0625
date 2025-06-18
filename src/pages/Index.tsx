
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { JourneyTile } from "@/components/JourneyTile";
import { NaturalLanguagePrompt } from "@/components/NaturalLanguagePrompt";
import { Button } from "@/components/ui/button";
import { FileText, FolderOpen, BarChart3, Users, MessageSquare, Grid3X3 } from "lucide-react";
import { useUser } from "@/contexts/UserContext";

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
  const { currentUser } = useUser();
  const [showPersonas, setShowPersonas] = useState(false);
  const [isPromptOpen, setIsPromptOpen] = useState(false);

  const handleJourneySelect = (journeyId: string) => {
    navigate(`/role/${journeyId}`);
  };

  // Filter journeys based on user roles
  const availableJourneys = journeys.filter(journey => 
    currentUser?.roles.includes(journey.id)
  );

  if (showPersonas) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Welcome{currentUser ? `, ${currentUser.name}` : ''}!
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground">
                What would you like to do today?
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {availableJourneys.map((journey) => (
                <JourneyTile
                  key={journey.id}
                  icon={journey.icon}
                  title={journey.title}
                  description={journey.description}
                  onClick={() => handleJourneySelect(journey.id)}
                />
              ))}
            </div>

            <div className="text-center mt-12">
              <Button
                onClick={() => setIsPromptOpen(true)}
                variant="outline"
                size="lg"
                className="h-14 px-8 text-lg gap-3 hover:bg-muted/50 border-2 border-dashed border-muted-foreground/30 hover:border-primary/50"
              >
                <MessageSquare className="h-5 w-5" />
                I would like to...
              </Button>
            </div>

            <div className="text-center mt-8">
              <p className="text-sm text-muted-foreground">
                Select your role to access relevant tools and features
              </p>
            </div>
          </div>
        </div>

        <NaturalLanguagePrompt
          isOpen={isPromptOpen}
          onClose={() => setIsPromptOpen(false)}
        />
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col items-center justify-center p-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-12">
            <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
              <MessageSquare className="h-16 w-16 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-4">
              How can I help you?
            </h1>
            <p className="text-xl text-gray-600">
              Tell me what you'd like to do today
            </p>
          </div>

          <div className="space-y-6">
            <Button
              onClick={() => setIsPromptOpen(true)}
              size="lg"
              className="h-16 px-12 text-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Ask me anything...
            </Button>

            <Button
              onClick={() => setShowPersonas(true)}
              variant="outline"
              size="lg"
              className="h-12 px-8 gap-3 rounded-full border-2 hover:bg-muted/50"
            >
              <Grid3X3 className="h-5 w-5" />
              Show all personas
            </Button>
          </div>

          <div className="mt-16 text-sm text-gray-500">
            <p>Try saying: "Generate a report", "Update data", or "Check reports"</p>
          </div>
        </div>
      </div>

      <NaturalLanguagePrompt
        isOpen={isPromptOpen}
        onClose={() => setIsPromptOpen(false)}
      />
    </>
  );
};

export default Index;
