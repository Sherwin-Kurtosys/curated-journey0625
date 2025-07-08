
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Edit, Copy, FileText } from 'lucide-react';
import { SaveActionPopup } from '@/components/SaveActionPopup';
import { useUser } from '@/contexts/UserContext';

const templates = [
  { id: 1, name: 'Executive Summary Template', category: 'Financial', lastModified: '2024-01-15', status: 'published' },
  { id: 2, name: 'Sales Performance Template', category: 'Sales', lastModified: '2024-01-14', status: 'draft' },
  { id: 3, name: 'Customer Analytics Template', category: 'Analytics', lastModified: '2024-01-13', status: 'published' },
  { id: 4, name: 'Operational Metrics Template', category: 'Operations', lastModified: '2024-01-12', status: 'published' },
];

const ReportTemplates = () => {
  const [showPopup, setShowPopup] = useState(false);
  const { currentUser } = useUser();

  const handleSave = () => {
    setShowPopup(true);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold text-foreground mb-8">Report Template Viewer</h1>
        
        <div className="bg-card rounded-lg shadow-sm p-6">
          <div className="space-y-4">
            {templates.map((template) => (
              <div
                key={template.id}
                className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium text-foreground">{template.name}</h3>
                    <p className="text-sm text-muted-foreground">Category: {template.category}</p>
                    <p className="text-xs text-muted-foreground">Last modified: {template.lastModified}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Badge 
                    variant={template.status === 'published' ? 'default' : 'secondary'}
                    className="capitalize"
                  >
                    {template.status}
                  </Badge>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                  >
                    <Eye className="h-4 w-4" />
                    View
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                  >
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                  >
                    <Copy className="h-4 w-4" />
                    Copy
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

export default ReportTemplates;
