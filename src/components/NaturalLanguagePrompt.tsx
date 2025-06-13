
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NaturalLanguagePromptProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NaturalLanguagePrompt: React.FC<NaturalLanguagePromptProps> = ({
  isOpen,
  onClose,
}) => {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

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
    
    onClose();
    setInput('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-2xl mx-4 p-8 bg-background rounded-lg shadow-xl border">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-foreground">
            What would you like to do?
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g., Update data, Generate report, Check reports, Create template..."
              className="text-lg h-12"
              autoFocus
            />
          </div>
          
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!input.trim()}
              className="gap-2"
            >
              <Send className="h-4 w-4" />
              Go
            </Button>
          </div>
        </form>
        
        <div className="mt-6 pt-6 border-t">
          <p className="text-sm text-muted-foreground mb-3">Examples:</p>
          <div className="flex flex-wrap gap-2">
            {[
              'Update data sources',
              'Generate monthly report',
              'Check report accuracy',
              'Create new template'
            ].map((example) => (
              <Button
                key={example}
                variant="ghost"
                size="sm"
                onClick={() => setInput(example)}
                className="text-xs h-8 hover:bg-muted"
              >
                {example}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
