
import React from 'react';

interface QuickActionsProps {
  suggestions: string[];
  onActionClick: (action: string) => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  suggestions,
  onActionClick
}) => {
  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">Quick actions:</p>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onActionClick(suggestion)}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};
