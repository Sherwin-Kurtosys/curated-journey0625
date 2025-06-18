
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { JourneyTile } from "@/components/JourneyTile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  const [input, setInput] = useState('');

  const handleJourneySelect = (journeyId: string) => {
    navigate(`/role/${journeyId}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const lowerInput = input.toLowerCase();
    
    // Simple keyword matching to determine navigation
    if (lowerInput.includes('data') || lowerInput.includes('manage')) {
      navigate('/role/data-manager');
    } else if (lowerInput.includes('generate') || lowerInput.includes('create report')) {
      navigate('/role/report-generator');
    } else if (lowerInput.includes('check') || lowerInput.includes('validate') || lowerInput.includes('review')) {
      navigate('/role/report-validator');
    } else if (lowerInput.includes('design') || lowerInput.includes('template') || lowerInput.includes('create')) {
      navigate('/role/report-creator');
    } else {
      // Default to report creator for general requests
      navigate('/role/report-creator');
    }
    
    setInput('');
  };

  // Filter journeys based on user roles
  const availableJourneys = journeys.filter(journey => 
    currentUser?.roles.includes(journey.id)
  );

  if (showPersonas) {
    return (
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

          <div className="max-w-4xl mx-auto mb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="I would like to..."
                  className="text-lg h-14 rounded-2xl border-2 border-gray-200 focus:border-blue-400 px-6 w-full"
                />
              </div>
            </form>
            
            <div className="mt-6">
              <p className="text-sm text-muted-foreground mb-3">Try saying:</p>
              <div className="flex flex-wrap gap-2">
                {[
                  'Generate a monthly report',
                  'Update data sources',
                  'Check report accuracy',
                  'Create new template'
                ].map((example) => (
                  <Button
                    key={example}
                    variant="ghost"
                    size="sm"
                    onClick={() => setInput(example)}
                    className="text-xs h-8 hover:bg-gray-100 rounded-full px-4"
                  >
                    {example}
                  </Button>
                ))}
              </div>
            </div>
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

          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              Select your role to access relevant tools and features
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
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
          <form onSubmit={handleSubmit} className="w-full">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="I would like to..."
              className="text-lg h-16 rounded-full border-2 border-gray-200 focus:border-blue-400 px-8 w-full shadow-lg"
            />
          </form>

          <div className="mt-8">
            <p className="text-sm text-gray-500 mb-3">Try saying:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                'Generate a monthly report',
                'Update data sources', 
                'Check report accuracy',
                'Create new template'
              ].map((example) => (
                <Button
                  key={example}
                  variant="ghost"
                  size="sm"
                  onClick={() => setInput(example)}
                  className="text-xs h-8 hover:bg-gray-100 rounded-full px-4"
                >
                  {example}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 mt-12">
            <Button
              onClick={() => setShowPersonas(true)}
              variant="outline"
              size="icon"
              className="w-12 h-12 rounded-full border-2 hover:bg-muted/50"
            >
              <Grid3X3 className="h-5 w-5" />
            </Button>
            <p className="text-sm text-gray-500">Show all Actions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
