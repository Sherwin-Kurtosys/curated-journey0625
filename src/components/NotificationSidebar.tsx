
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Trash2, Mail, MailOpen } from 'lucide-react';
import { useNotifications } from '@/contexts/NotificationContext';
import { Notification } from '@/types/notifications';
import { NotificationDetailModal } from './NotificationDetailModal';

interface NotificationSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationSidebar: React.FC<NotificationSidebarProps> = ({ isOpen, onClose }) => {
  const {
    notifications,
    selectedNotifications,
    toggleNotificationSelection,
    toggleAllNotifications,
    markAsRead,
    markAsUnread,
    deleteNotifications,
    clearSelection
  } = useNotifications();

  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const hasSelection = selectedNotifications.length > 0;
  const allSelected = selectedNotifications.length === notifications.length;

  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification);
    setIsDetailModalOpen(true);
    if (!notification.isRead) {
      markAsRead([notification.id]);
    }
  };

  const handleBulkMarkAsRead = () => {
    markAsRead(selectedNotifications);
    clearSelection();
  };

  const handleBulkMarkAsUnread = () => {
    markAsUnread(selectedNotifications);
    clearSelection();
  };

  const handleBulkDelete = () => {
    deleteNotifications(selectedNotifications);
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date.toLocaleDateString();
  };

  const truncateText = (text: string, maxLength: number = 120) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="right" className="w-96 p-0">
          <SheetHeader className="p-4 pb-2">
            <SheetTitle className="text-left">
              Notifications {unreadCount > 0 && `(${unreadCount} unread)`}
            </SheetTitle>
          </SheetHeader>

          {/* Bulk Actions */}
          {notifications.length > 0 && (
            <div className="px-4 py-2 border-b">
              <div className="flex items-center gap-2 mb-2">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={toggleAllNotifications}
                />
                <span className="text-sm text-muted-foreground">
                  {allSelected ? 'Deselect all' : 'Select all'}
                </span>
              </div>

              {hasSelection && (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleBulkMarkAsRead}
                    className="flex items-center gap-1"
                  >
                    <MailOpen size={14} />
                    Mark Read
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleBulkMarkAsUnread}
                    className="flex items-center gap-1"
                  >
                    <Mail size={14} />
                    Mark Unread
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleBulkDelete}
                    className="flex items-center gap-1 text-destructive hover:text-destructive"
                  >
                    <Trash2 size={14} />
                    Delete
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                No notifications
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors ${
                    !notification.isRead ? 'bg-blue-50/50' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={selectedNotifications.includes(notification.id)}
                      onCheckedChange={() => toggleNotificationSelection(notification.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <div
                      className="flex-1 min-w-0"
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <h4 className={`text-sm font-medium truncate ${
                          !notification.isRead ? 'font-semibold' : ''
                        }`}>
                          {notification.title}
                        </h4>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 ml-2" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">
                        From: {notification.sender}
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                        {truncateText(notification.content)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatTime(notification.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Notification Detail Modal */}
      <NotificationDetailModal
        notification={selectedNotification}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedNotification(null);
        }}
        onReply={(id) => console.log('Reply to:', id)}
        onDelete={(id) => {
          deleteNotifications([id]);
          setIsDetailModalOpen(false);
          setSelectedNotification(null);
        }}
      />
    </>
  );
};
