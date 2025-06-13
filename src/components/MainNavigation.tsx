
import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  FileText, 
  FolderOpen, 
  BarChart3, 
  Users, 
  Settings, 
  User,
  LogOut
} from 'lucide-react';

interface MainNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigationItems = [
  { id: 'home', label: 'Home', icon: Home, path: '/' },
  { id: 'report-creator', label: 'Report Creator', icon: FileText, path: '/role/report-creator' },
  { id: 'data-manager', label: 'Data Manager', icon: FolderOpen, path: '/role/data-manager' },
  { id: 'report-generator', label: 'Report Generator', icon: BarChart3, path: '/role/report-generator' },
  { id: 'report-validator', label: 'Report Validator', icon: Users, path: '/role/report-validator' },
];

const userMenuItems = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'logout', label: 'Logout', icon: LogOut },
];

export const MainNavigation: React.FC<MainNavigationProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  const handleUserAction = (action: string) => {
    console.log(`User action: ${action}`);
    // In a real app, these would trigger actual functionality
    if (action === 'logout') {
      // Handle logout
    } else if (action === 'profile') {
      // Navigate to profile
    } else if (action === 'settings') {
      // Navigate to settings
    }
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="top" className="w-full h-auto">
        <SheetHeader className="text-left">
          <SheetTitle>Navigation</SheetTitle>
        </SheetHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {/* Main Navigation */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Main Areas</h3>
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                className="w-full justify-start h-auto p-3"
                onClick={() => handleNavigation(item.path)}
              >
                <item.icon className="mr-3 h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">{item.label}</div>
                </div>
              </Button>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Quick Actions</h3>
            <Button
              variant="ghost"
              className="w-full justify-start h-auto p-3"
              onClick={() => console.log('Create new report')}
            >
              <FileText className="mr-3 h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">Create New Report</div>
                <div className="text-xs text-muted-foreground">Start from template</div>
              </div>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start h-auto p-3"
              onClick={() => console.log('View recent reports')}
            >
              <BarChart3 className="mr-3 h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">Recent Reports</div>
                <div className="text-xs text-muted-foreground">View latest work</div>
              </div>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start h-auto p-3"
              onClick={() => console.log('Manage data sources')}
            >
              <FolderOpen className="mr-3 h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">Data Sources</div>
                <div className="text-xs text-muted-foreground">Manage connections</div>
              </div>
            </Button>
          </div>

          {/* User Menu */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Account</h3>
            {userMenuItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                className="w-full justify-start h-auto p-3"
                onClick={() => handleUserAction(item.id)}
              >
                <item.icon className="mr-3 h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">{item.label}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
