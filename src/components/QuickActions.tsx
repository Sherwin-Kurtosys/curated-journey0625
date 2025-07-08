
import React from 'react';

interface QuickActionsProps {
  suggestions: string[];
  onActionClick: (action: string) => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  suggestions,
  onActionClick
}) => {
  const handleActionClick = (suggestion: string) => {
    onActionClick(suggestion);
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
