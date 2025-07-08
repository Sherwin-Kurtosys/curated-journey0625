
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Send, FileText, BarChart3, CheckCircle } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { QuickActions } from './QuickActions';
import { ReportingStatus } from './ReportingStatus';

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

  const handleStatusClick = (status: string) => {
    console.log(`Navigate to ${status} reports`);
    // In a real app, this would navigate to a filtered list view
  };

  const getPersonaConfig = () => {
    const userRoles = currentUser?.roles || [];
    
    if (userRoles.includes('report-generator')) {
      return {
        title: 'Report Manager',
        status: '10 workflows initiated | 7 completed | 2 failed | 1 pending',
        suggestions: [
          'Kick off next report run',
          'View failed reports',
          'Check pending workflows',
          'Schedule report run'
        ],
        smartPrompt: 'Based on your previous timing, would you like to kick off the next round of reporting workflows?',
        icon: BarChart3,
        statusData: { totalWorkflows: 10, completed: 7, failed: 2, pending: 1 }
      };
    } else if (userRoles.includes('report-creator')) {
      return {
        title: 'Report Creator',
        status: 'Template management and creation',
        suggestions: [
          'Update existing report template',
          'Create new report template',
          'Edit template design',
          'Review template library'
        ],
        smartPrompt: 'Would you like to update an existing report template or create a new one?',
        icon: FileText,
        statusData: { totalWorkflows: 12, completed: 12, failed: 0, pending: 0 }
      };
    } else if (userRoles.includes('report-validator')) {
      return {
        title: 'Compliance Officer',
        status: '1 report awaiting your authorization',
        suggestions: [
          'Review pending reports',
          'Authorize reports',
          'Request changes',
          'View compliance status'
        ],
        smartPrompt: 'You have reports awaiting your signoff. Would you like to authorize them now?',
        icon: CheckCircle,
        statusData: { totalWorkflows: 8, completed: 6, failed: 1, pending: 1 }
      };
    } else {
      return {
        title: 'User',
        status: 'Welcome to the system',
        suggestions: [
          'View reports',
          'Check status',
          'Access documents',
          'Manage data'
        ],
        smartPrompt: 'What would you like to do today?',
        icon: FileText,
        statusData: { totalWorkflows: 0, completed: 0, failed: 0, pending: 0 }
      };
    }
  };

  const config = getPersonaConfig();
  const IconComponent = config.icon;

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: '#0032b1' }}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <IconComponent className="h-8 w-8 text-white" />
            <div>
              <Badge variant="outline" className="mb-2 bg-white/10 text-white border-white/20">
                {currentUser?.name}: {config.title}
              </Badge>
              <p className="text-white/80">{config.status}</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-2 w-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-white">Smart Suggestion</span>
            </div>
            <p className="text-white text-lg mb-6">{config.smartPrompt}</p>

            <form onSubmit={handleSubmit} className="mb-6">
              <div className="relative">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="What would you like to do today?"
                  className="h-14 pr-14 text-base bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 bg-white/20 hover:bg-white/30 text-white"
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

        <div className="bg-white rounded-lg">
          <ReportingStatus
            totalWorkflows={config.statusData.totalWorkflows}
            completed={config.statusData.completed}
            failed={config.statusData.failed}
            pending={config.statusData.pending}
            onStatusClick={handleStatusClick}
          />
        </div>
      </div>
    </div>
  );
};
