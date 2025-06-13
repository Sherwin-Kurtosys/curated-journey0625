
export interface Notification {
  id: string;
  title: string;
  content: string;
  sender: string;
  timestamp: Date;
  isRead: boolean;
  isSelected?: boolean;
}

export interface NotificationActions {
  onReply: (notificationId: string) => void;
  onDelete: (notificationId: string) => void;
  onClose: () => void;
}
