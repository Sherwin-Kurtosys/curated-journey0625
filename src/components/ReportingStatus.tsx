
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, CheckCircle, XCircle, Clock } from 'lucide-react';

interface ReportingStatusProps {
  totalWorkflows: number;
  completed: number;
  failed: number;
  pending: number;
  onStatusClick: (status: string) => void;
}

export const ReportingStatus: React.FC<ReportingStatusProps> = ({
  totalWorkflows,
  completed,
  failed,
  pending,
  onStatusClick
}) => {
  const statusItems = [
    {
      label: 'Total Workflows',
      value: totalWorkflows,
      icon: BarChart3,
      color: 'bg-blue-500',
      status: 'total'
    },
    {
      label: 'Completed',
      value: completed,
      icon: CheckCircle,
      color: 'bg-green-500',
      status: 'completed'
    },
    {
      label: 'Failed',
      value: failed,
      icon: XCircle,
      color: 'bg-red-500',
      status: 'failed'
    },
    {
      label: 'Pending Approval',
      value: pending,
      icon: Clock,
      color: 'bg-yellow-500',
      status: 'pending'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Reporting Status
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {totalWorkflows} reporting workflows initiated in the past 30 days
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statusItems.map((item) => (
            <div
              key={item.status}
              onClick={() => onStatusClick(item.status)}
              className="cursor-pointer p-4 rounded-lg border hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${item.color}`}>
                  <item.icon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{item.value}</div>
                  <div className="text-sm text-muted-foreground">{item.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
