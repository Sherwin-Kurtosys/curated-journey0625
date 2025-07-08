
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface QuickActionsProps {
  suggestions: string[];
  onActionClick: (action: string) => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  suggestions,
  onActionClick
}) => {
  const navigate = useNavigate();

  const handleActionClick = (suggestion: string) => {
    if (suggestion.toLowerCase().includes('view report status')) {
      navigate('/report-status');
    } else if (suggestion.toLowerCase().includes('configure report workflows')) {
      navigate('/report-workflows');
    } else if (suggestion.toLowerCase().includes('view report template')) {
      navigate('/report-templates');
    } else {
      onActionClick(suggestion);
    }
  };

  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">Quick actions:</p>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => handleActionClick(suggestion)}
            className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-full transition-colors shadow-sm"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};
