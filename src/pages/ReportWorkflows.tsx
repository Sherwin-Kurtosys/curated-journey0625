
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, Settings, Calendar } from 'lucide-react';
import { SaveActionPopup } from '@/components/SaveActionPopup';
import { useUser } from '@/contexts/UserContext';

const workflows = [
  { id: 1, name: 'Weekly Sales Report', schedule: 'Every Monday 9:00 AM', status: 'active', nextRun: '2024-01-22' },
  { id: 2, name: 'Monthly Financial Summary', schedule: 'First of month 8:00 AM', status: 'active', nextRun: '2024-02-01' },
  { id: 3, name: 'Quarterly Analytics', schedule: 'Every quarter', status: 'paused', nextRun: '2024-04-01' },
  { id: 4, name: 'Daily Operations Report', schedule: 'Daily 6:00 AM', status: 'active', nextRun: '2024-01-16' },
];

const ReportWorkflows = () => {
  const [showPopup, setShowPopup] = useState(false);
  const { currentUser } = useUser();

  const handleSave = () => {
    setShowPopup(true);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold text-foreground mb-8">Report Workflow Editor</h1>
        
        <div className="bg-card rounded-lg shadow-sm p-6">
          <div className="space-y-4">
            {workflows.map((workflow) => (
              <div
                key={workflow.id}
                className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium text-foreground">{workflow.name}</h3>
                    <p className="text-sm text-muted-foreground">{workflow.schedule}</p>
                    <p className="text-xs text-muted-foreground">Next run: {workflow.nextRun}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Badge 
                    variant={workflow.status === 'active' ? 'default' : 'secondary'}
                    className="capitalize"
                  >
                    {workflow.status}
                  </Badge>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                  >
                    {workflow.status === 'active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    {workflow.status === 'active' ? 'Pause' : 'Resume'}
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                  >
                    <Settings className="h-4 w-4" />
                    Edit
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

export default ReportWorkflows;
