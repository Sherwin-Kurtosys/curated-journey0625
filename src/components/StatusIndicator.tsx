
import React from 'react';

interface StatusIndicatorProps {
  completed: number;
  failed: number;
  pending: number;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  completed,
  failed,
  pending
}) => {
  return (
    <div className="flex items-center gap-4 text-sm text-muted-foreground">
      <div className="flex items-center gap-1">
        <div className="h-2 w-2 bg-green-500 rounded-full"></div>
        <span>{completed} completed</span>
      </div>
      <div className="flex items-center gap-1">
        <div className="h-2 w-2 bg-red-500 rounded-full"></div>
        <span>{failed} failed</span>
      </div>
      <div className="flex items-center gap-1">
        <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
        <span>{pending} pending</span>
      </div>
    </div>
  );
};
