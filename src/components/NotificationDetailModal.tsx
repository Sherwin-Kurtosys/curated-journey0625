
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Reply, Trash2, X } from 'lucide-react';
import { Notification } from '@/types/notifications';

interface NotificationDetailModalProps {
  notification: Notification | null;
  isOpen: boolean;
  onClose: () => void;
  onReply: (notificationId: string) => void;
  onDelete: (notificationId: string) => void;
}

export const NotificationDetailModal: React.FC<NotificationDetailModalProps> = ({
  notification,
  isOpen,
  onClose,
  onReply,
  onDelete
}) => {
  if (!notification) return null;

  const handleReply = () => {
    onReply(notification.id);
    // In a real app, this would open a compose modal or navigate to a message thread
    console.log('Opening reply for notification:', notification.id);
  };

  const handleDelete = () => {
    onDelete(notification.id);
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-left">{notification.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-sm text-muted-foreground space-y-1">
            <p><strong>From:</strong> {notification.sender}</p>
            <p><strong>Received:</strong> {formatDateTime(notification.timestamp)}</p>
          </div>

          <div className="prose prose-sm max-w-none">
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {notification.content}
            </p>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex items-center gap-2"
          >
            <X size={16} />
            Close
          </Button>
          <Button
            variant="outline"
            onClick={handleReply}
            className="flex items-center gap-2"
          >
            <Reply size={16} />
            Reply
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            className="flex items-center gap-2"
          >
            <Trash2 size={16} />
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
