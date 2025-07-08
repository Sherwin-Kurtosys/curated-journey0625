
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Send, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SaveActionPopupProps {
  isOpen: boolean;
  onClose: () => void;
  userRole: string;
}

export const SaveActionPopup: React.FC<SaveActionPopupProps> = ({
  isOpen,
  onClose,
  userRole
}) => {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const getSuggestion = () => {
    if (userRole.includes('report-generator')) {
      return 'Based on your changes, would you like to schedule the next report run?';
    } else if (userRole.includes('report-creator')) {
      return 'Template updated successfully. Would you like to preview the changes?';
    } else if (userRole.includes('report-validator')) {
      return 'Reports approved. Would you like to notify the requestors?';
    }
    return 'Changes saved successfully. What would you like to do next?';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    console.log('Processing prompt:', input);
    setInput('');
    onClose();
  };

  const handleReturnHome = () => {
    navigate('/');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-card border-0 shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-foreground">Next Action</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-2 w-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-foreground">Smart Suggestion</span>
          </div>
          
          <p className="text-foreground">{getSuggestion()}</p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="What would you like to do next?"
                className="h-12 pr-14 bg-muted text-foreground placeholder:text-muted-foreground"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 bg-secondary hover:bg-secondary/80 text-secondary-foreground"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
          
          <div className="flex justify-between">
            <Button 
              variant="outline"
              onClick={handleReturnHome}
              className="flex items-center gap-2 bg-muted hover:bg-muted/80 text-muted-foreground"
            >
              <Home className="h-4 w-4" />
              Return to Home
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
