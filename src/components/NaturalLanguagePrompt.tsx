import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NaturalLanguagePromptProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NaturalLanguagePrompt: React.FC<NaturalLanguagePromptProps> = ({
  isOpen,
  onClose,
}) => {
  // This component is now unused since we moved to inline inputs
  // Keeping it for backward compatibility but it won't be rendered
  if (!isOpen) return null;

  return null;
};
