
import React, { createContext, useContext, useState } from 'react';
import { Notification } from '@/types/notifications';

interface NotificationContextType {
  notifications: Notification[];
  selectedNotifications: string[];
  toggleNotificationSelection: (id: string) => void;
  toggleAllNotifications: () => void;
  markAsRead: (ids: string[]) => void;
  markAsUnread: (ids: string[]) => void;
  deleteNotifications: (ids: string[]) => void;
  clearSelection: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Report Template Updated',
      content: 'The quarterly report template has been updated with new financial metrics. Please review the changes and update your existing reports accordingly. The changes include new KPI calculations and updated formatting guidelines.',
      sender: 'John Smith',
      timestamp: new Date('2024-06-13T10:30:00'),
      isRead: false
    },
    {
      id: '2',
      title: 'Data Source Connection Issue',
      content: 'There was a temporary connection issue with the sales database. The issue has been resolved and all data is now syncing properly. No action is required from your end.',
      sender: 'System Admin',
      timestamp: new Date('2024-06-13T09:15:00'),
      isRead: true
    },
    {
      id: '3',
      title: 'New Report Validation Rules',
      content: 'New validation rules have been implemented for financial reports. Please ensure your reports comply with the updated guidelines before submission.',
      sender: 'Sarah Johnson',
      timestamp: new Date('2024-06-12T16:45:00'),
      isRead: false
    }
  ]);
  
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([]);

  const toggleNotificationSelection = (id: string) => {
    setSelectedNotifications(prev => 
      prev.includes(id) 
        ? prev.filter(notifId => notifId !== id)
        : [...prev, id]
    );
  };

  const toggleAllNotifications = () => {
    setSelectedNotifications(prev => 
      prev.length === notifications.length 
        ? [] 
        : notifications.map(n => n.id)
    );
  };

  const markAsRead = (ids: string[]) => {
    setNotifications(prev => 
      prev.map(notification => 
        ids.includes(notification.id) 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAsUnread = (ids: string[]) => {
    setNotifications(prev => 
      prev.map(notification => 
        ids.includes(notification.id) 
          ? { ...notification, isRead: false }
          : notification
      )
    );
  };

  const deleteNotifications = (ids: string[]) => {
    setNotifications(prev => prev.filter(notification => !ids.includes(notification.id)));
    setSelectedNotifications(prev => prev.filter(id => !ids.includes(id)));
  };

  const clearSelection = () => {
    setSelectedNotifications([]);
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      selectedNotifications,
      toggleNotificationSelection,
      toggleAllNotifications,
      markAsRead,
      markAsUnread,
      deleteNotifications,
      clearSelection
    }}>
      {children}
    </NotificationContext.Provider>
  );
};
