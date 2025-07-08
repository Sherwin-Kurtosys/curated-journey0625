
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
      <p className="text-sm text-white/80">Quick actions:</p>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onActionClick(suggestion)}
            className="px-4 py-2 text-sm bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors border border-white/20"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};
