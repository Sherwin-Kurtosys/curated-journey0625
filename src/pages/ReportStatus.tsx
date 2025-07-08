
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Edit, CheckCircle, Clock, XCircle } from 'lucide-react';
import { SaveActionPopup } from '@/components/SaveActionPopup';
import { useUser } from '@/contexts/UserContext';

const reportWorkflows = [
  { id: 1, name: 'Monthly Revenue Report', status: 'completed', lastRun: '2024-01-15', action: 'View' },
  { id: 2, name: 'Quarterly Sales Analysis', status: 'completed', lastRun: '2024-01-14', action: 'View' },
  { id: 3, name: 'Customer Insights Report', status: 'failed', lastRun: '2024-01-13', action: 'Edit' },
  { id: 4, name: 'Financial Summary', status: 'pending', lastRun: '2024-01-12', action: 'Approve' },
  { id: 5, name: 'Operational Metrics', status: 'completed', lastRun: '2024-01-11', action: 'View' },
];

const ReportStatus = () => {
  const [showPopup, setShowPopup] = useState(false);
  const { currentUser } = useUser();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return null;
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'View':
        return <Eye className="h-4 w-4" />;
      case 'Edit':
        return <Edit className="h-4 w-4" />;
      case 'Approve':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Eye className="h-4 w-4" />;
    }
  };

  const handleSave = () => {
    setShowPopup(true);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold text-foreground mb-8">Report Status</h1>
        
        <div className="bg-card rounded-lg shadow-sm p-6">
          <div className="space-y-4">
            {reportWorkflows.map((workflow) => (
              <div
                key={workflow.id}
                className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
              >
                <div className="flex items-center gap-4">
                  {getStatusIcon(workflow.status)}
                  <div>
                    <h3 className="font-medium text-foreground">{workflow.name}</h3>
                    <p className="text-sm text-muted-foreground">Last run: {workflow.lastRun}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Badge 
                    variant={workflow.status === 'completed' ? 'default' : workflow.status === 'failed' ? 'destructive' : 'secondary'}
                    className="capitalize"
                  >
                    {workflow.status}
                  </Badge>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                  >
                    {getActionIcon(workflow.action)}
                    {workflow.action}
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-6">
            <Button 
              onClick={handleSave}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      <SaveActionPopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        userRole={currentUser?.roles[0] || ''}
      />
    </div>
  );
};

export default ReportStatus;
