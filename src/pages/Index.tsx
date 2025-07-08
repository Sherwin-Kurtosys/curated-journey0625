
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { JourneyTile } from "@/components/JourneyTile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, FolderOpen, BarChart3, Users, MessageSquare, Grid3X3, Send } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { PromptOverlay } from "@/components/PromptOverlay";

const journeys = [
  {
    id: "data-manager", 
    icon: FolderOpen,
    title: "Data Manager",
    description: "Manage data sources and connections"
  },
  {
    id: "report-creator",
    icon: FileText,
    title: "Report Creator",
    description: "Design and update report templates"
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
  const [showPromptOverlay, setShowPromptOverlay] = useState(true);

  const handleJourneySelect = (journeyId: string) => {
    navigate(`/role/${journeyId}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('data') || lowerInput.includes('manage')) {
      navigate('/role/data-manager');
    } else if (lowerInput.includes('generate') || lowerInput.includes('create report')) {
      navigate('/role/report-generator');
    } else if (lowerInput.includes('check') || lowerInput.includes('validate') || lowerInput.includes('review')) {
      navigate('/role/report-validator');
    } else if (lowerInput.includes('design') || lowerInput.includes('template') || lowerInput.includes('create')) {
      navigate('/role/report-creator');
    } else {
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
      <div className="min-h-screen p-6" style={{ backgroundColor: '#0032b1' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              What would you like to do today?
            </h1>
          </div>

          <div className="max-w-4xl mx-auto mb-8">
            <div className="mb-6 text-center">
              <div className="flex flex-wrap gap-2 justify-center mb-6">
                {[
                  'Generate a monthly report',
                  'Update data sources',
                  'Check report accuracy',
                  'Create new template'
                ].map((example) => (
                  <div
                    key={example}
                    onClick={() => setInput(example)}
                    className="cursor-pointer text-xs h-8 bg-white/20 hover:bg-white/30 rounded-full px-4 py-2 text-white transition-colors"
                  >
                    {example}
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="relative mb-8">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="I would like to..."
                className="text-lg h-14 rounded-2xl border-2 border-white/30 bg-white/10 text-white placeholder:text-white/60 focus:border-white/50 px-6 w-full pr-14"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 bg-white/20 hover:bg-white/30 text-white border-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8 max-w-5xl mx-auto mb-8">
            {availableJourneys.map((journey) => (
              <div
                key={journey.id}
                onClick={() => handleJourneySelect(journey.id)}
                className="cursor-pointer transition-all duration-200 hover:scale-105 p-8 text-center"
              >
                <div className="flex flex-col items-center space-y-4">
                  <div className="p-4">
                    <journey.icon size={48} className="text-white" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white">{journey.title}</h3>
                    <p className="text-sm text-white/70 leading-relaxed">{journey.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center p-6" style={{ backgroundColor: '#0032b1' }}>
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-12">
            <div className="w-32 h-32 mx-auto mb-8 bg-white/20 rounded-full flex items-center justify-center shadow-2xl">
              <MessageSquare className="h-16 w-16 text-white" />
            </div>
            <p className="text-xl md:text-2xl text-white/80">
              What would you like to do today?
            </p>
          </div>

          <div className="space-y-6">
            <div className="mb-6 text-center">
              <div className="flex flex-wrap gap-2 justify-center mb-6">
                {[
                  'Generate a monthly report',
                  'Update data sources', 
                  'Check report accuracy',
                  'Create new template'
                ].map((example) => (
                  <div
                    key={example}
                    onClick={() => setInput(example)}
                    className="cursor-pointer text-xs h-8 bg-white/20 hover:bg-white/30 rounded-full px-4 py-2 text-white transition-colors"
                  >
                    {example}
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="w-full relative">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="I would like to..."
                className="text-lg h-16 rounded-full border-2 border-white/30 bg-white/10 text-white placeholder:text-white/60 focus:border-white/50 px-8 w-full shadow-lg pr-16"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-12 w-12 bg-white/20 hover:bg-white/30 text-white border-0"
              >
                <Send className="h-5 w-5" />
              </Button>
            </form>

            <div className="flex flex-col items-center gap-4 mt-12">
              <Button
                onClick={() => setShowPersonas(true)}
                variant="ghost"
                size="icon"
                className="w-12 h-12 rounded-full border-2 border-white/30 hover:bg-white/10 text-white"
              >
                <Grid3X3 className="h-5 w-5" />
              </Button>
              <p className="text-sm text-white/70">Show all Actions</p>
            </div>
          </div>
        </div>
      </div>

      {showPromptOverlay && (
        <PromptOverlay onClose={() => setShowPromptOverlay(false)} />
      )}
    </>
  );
};

export default Index;
