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

  // This component is now unused since we moved to inline inputs
  // Keeping it for backward compatibility but it won't be rendered
  if (!isOpen) return null;

  return null;
};
