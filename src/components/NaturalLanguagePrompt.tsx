
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Send, MessageSquare } from 'lucide-react';
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
        className="absolute inset-0 bg-black/60 backdrop-blur-lg"
        onClick={onClose}
      />
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-2xl mx-4 p-8 bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-light text-gray-800">
              How can I help you?
            </h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tell me what you'd like to do..."
              className="text-lg h-14 rounded-2xl border-2 border-gray-200 focus:border-blue-400 px-6"
              autoFocus
            />
          </div>
          
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="rounded-full px-6"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!input.trim()}
              className="gap-2 rounded-full px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              <Send className="h-4 w-4" />
              Go
            </Button>
          </div>
        </form>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-3">Try asking:</p>
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
    </div>
  );
};
