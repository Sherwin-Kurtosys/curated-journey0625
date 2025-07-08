
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Send, FileText, BarChart3, CheckCircle } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { QuickActions } from './QuickActions';

interface PromptOverlayProps {
  onClose: () => void;
}

export const PromptOverlay: React.FC<PromptOverlayProps> = ({ onClose }) => {
  const { currentUser } = useUser();
  const navigate = useNavigate();
  const [input, setInput] = useState('');

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

  const handleSmartSuggestionClick = () => {
    console.log('Navigate to Document Product Centre');
    // In a real app, this would navigate to the Document Product Centre
  };

  const getPersonaConfig = () => {
    const userRoles = currentUser?.roles || [];
    
    if (userRoles.includes('report-generator')) {
      return {
        title: 'Report Manager',
        suggestions: [
          'View report status',
          'Configure report workflows',
          'View report template'
        ],
        smartPrompt: 'Based on your recent activity, would you like to kick off the next round of reporting workflows?',
        icon: BarChart3
      };
    } else if (userRoles.includes('report-creator')) {
      return {
        title: 'Report Creator',
        suggestions: [
          'Update existing report template',
          'Create new report template',
          'View report template'
        ],
        smartPrompt: 'Based on your recent activity, would you like to kick off the next round of reporting workflows?',
        icon: FileText
      };
    } else if (userRoles.includes('report-validator')) {
      return {
        title: 'Compliance Officer',
        suggestions: [
          'View report status',
          'Review pending reports',
          'Authorize reports'
        ],
        smartPrompt: 'Based on your recent activity, would you like to kick off the next round of reporting workflows?',
        icon: CheckCircle
      };
    } else {
      return {
        title: 'User',
        suggestions: [
          'View reports',
          'Check status',
          'Access documents'
        ],
        smartPrompt: 'Based on your recent activity, would you like to kick off the next round of reporting workflows?',
        icon: FileText
      };
    }
  };

  const config = getPersonaConfig();
  const IconComponent = config.icon;

  return (
    <div className="min-h-screen p-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <IconComponent className="h-8 w-8 text-foreground" />
            <div>
              <Badge variant="secondary" className="mb-2 bg-muted text-muted-foreground">
                {currentUser?.name}: {config.title}
              </Badge>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="bg-card p-8 rounded-lg shadow-sm mb-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-2 w-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-foreground">Smart Suggestion</span>
            </div>
            <p className="text-foreground text-lg mb-6">{config.smartPrompt}</p>

            <Button 
              onClick={handleSmartSuggestionClick}
              className="mb-6 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Yes, kick off workflows
            </Button>

            <form onSubmit={handleSubmit} className="mb-6">
              <div className="relative">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="What would you like to do today?"
                  className="h-14 pr-14 text-base bg-muted text-foreground placeholder:text-muted-foreground"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>

            <QuickActions 
              suggestions={config.suggestions}
              onActionClick={setInput}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
