
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

  // Show the new persona-based landing page by default
  return <PromptOverlay onClose={() => {}} />;
};

export default Index;
