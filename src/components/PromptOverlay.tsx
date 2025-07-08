
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Send, X, FileText, BarChart3, CheckCircle, Users } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { StatusIndicator } from './StatusIndicator';
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

  const getPersonaConfig = () => {
    const userRoles = currentUser?.roles || [];
    
    if (userRoles.includes('report-creator')) {
      return {
        title: 'Report Creator',
        status: 'Active templates: 12 | Last edited: 2 hours ago',
        suggestions: [
          'Update an existing report template',
          'Create a new report template',
          'Add chart to revenue report',
          'Edit executive summary'
        ],
        smartPrompt: 'Would you like to continue editing the Q4 Revenue Template?',
        icon: FileText,
        statusData: { completed: 12, failed: 0, pending: 1 }
      };
    } else if (userRoles.includes('report-validator')) {
      return {
        title: 'Compliance Officer',
        status: '1 report pending approval | 2 overdue signoffs',
        suggestions: [
          'Review pending report',
          'Approve report',
          'Request changes',
          'View flagged sections'
        ],
        smartPrompt: 'You have 1 report pending your approval. Would you like to review it now?',
        icon: CheckCircle,
        statusData: { completed: 5, failed: 0, pending: 3 }
      };
    } else if (userRoles.includes('report-generator')) {
      return {
        title: 'Report Manager',
        status: '7 completed | 2 failed | 1 awaiting compliance',
        suggestions: [
          'Run report',
          'View failures',
          'Check pending approvals',
          'Schedule report run'
        ],
        smartPrompt: 'Looks like you usually kick off reports mid-week. Want to start the next run?',
        icon: BarChart3,
        statusData: { completed: 7, failed: 2, pending: 1 }
      };
    } else {
      return {
        title: 'Data Manager',
        status: 'All systems operational',
        suggestions: [
          'Update data sources',
          'Check connections',
          'Manage databases',
          'View metrics'
        ],
        smartPrompt: 'Would you like to check the data pipeline status?',
        icon: Users,
        statusData: { completed: 10, failed: 0, pending: 0 }
      };
    }
  };

  const config = getPersonaConfig();
  const IconComponent = config.icon;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl bg-white animate-scale-in">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <IconComponent className="h-6 w-6 text-blue-600" />
              <div>
                <Badge variant="outline" className="mb-1">
                  {currentUser?.name}: {config.title}
                </Badge>
                <p className="text-sm text-muted-foreground">{config.status}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="mb-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-blue-800">Smart Suggestion</span>
              </div>
              <p className="text-blue-700">{config.smartPrompt}</p>
            </div>

            <form onSubmit={handleSubmit} className="mb-4">
              <div className="relative">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="What would you like to do today?"
                  className="h-12 pr-12 text-base"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10"
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

          <div className="flex justify-between items-center pt-4 border-t">
            <button
              onClick={onClose}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Return to classic view
            </button>
            <StatusIndicator {...config.statusData} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
