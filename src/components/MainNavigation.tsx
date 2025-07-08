
import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  Home,
  Database,
  Palette,
  FileText,
  Settings,
  User,
  LogOut
} from 'lucide-react';

interface MainNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { id: 'home', label: 'Home', icon: Home, path: '/' },
  { id: 'data', label: 'Data', icon: Database, path: '/data' },
  { id: 'studio', label: 'Studio', icon: Palette, path: '/studio' },
  { id: 'documents', label: 'Documents', icon: FileText, path: '/documents' },
  { id: 'dxm', label: 'DXM', icon: Settings, path: '/dxm' },
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
            {menuItems.map((item) => (
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
