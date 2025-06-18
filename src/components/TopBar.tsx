
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Menu, LogOut, Home } from 'lucide-react';
import { useNotifications } from '@/contexts/NotificationContext';
import { useUser } from '@/contexts/UserContext';
import { NotificationSidebar } from './NotificationSidebar';
import { MainNavigation } from './MainNavigation';
import { useNavigate } from 'react-router-dom';

export const TopBar: React.FC = () => {
  const { notifications } = useNotifications();
  const { currentUser, logout } = useUser();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const navigate = useNavigate();

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-40 bg-background border-b border-border">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsNavigationOpen(true)}
              className="hover:bg-muted"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              className="hover:bg-muted ml-2"
            >
              <Home className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground mr-2">
              {currentUser?.name}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsNotificationsOpen(true)}
              className="relative hover:bg-muted"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
                >
                  {unreadCount > 9 ? '9+' : unreadCount}
                </Badge>
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={logout}
              className="hover:bg-muted"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <NotificationSidebar
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />

      <MainNavigation
        isOpen={isNavigationOpen}
        onClose={() => setIsNavigationOpen(false)}
      />
    </>
  );
};
