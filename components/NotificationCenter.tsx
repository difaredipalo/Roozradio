
import React, { useState, useEffect } from 'react';
import { SYSTEM_NOTIFICATIONS, SystemNotification } from '../notificationsConfig';

const NotificationToast: React.FC<{ notification: SystemNotification; onDismiss: (id: string) => void }> = ({ notification, onDismiss }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleDismiss = () => {
    setIsClosing(true);
    setTimeout(() => onDismiss(notification.id), 300);
  };

  const getIcon = () => {
    switch (notification.type) {
      case 'music': return '🎵';
      case 'alert': return '⚠️';
      default: return 'ℹ️';
    }
  };

  return (
    <div className={`w-72 bg-[#c0c0c0] win-outset p-0.5 transition-all duration-300 transform ${isClosing ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'} animate-in slide-in-from-right-10`}>
      <div className="win-titlebar flex justify-between items-center px-1 py-0.5">
        <div className="flex items-center gap-1">
          <span className="text-[10px]">{getIcon()}</span>
          <span className="text-[10px] font-bold truncate">{notification.title}</span>
        </div>
        <button onClick={handleDismiss} className="win-button w-3 h-3 p-0 text-[8px] flex items-center justify-center">✕</button>
      </div>
      <div className="p-3 flex gap-3 items-start">
        <div className="text-2xl shrink-0">{getIcon()}</div>
        <p className="text-[11px] text-black leading-tight flex-1">{notification.message}</p>
      </div>
      <div className="p-1 flex justify-end">
        <button onClick={handleDismiss} className="win-button px-4 py-0.5 text-[10px]">OK</button>
      </div>
    </div>
  );
};

const NotificationCenter: React.FC = () => {
  const [activeNotifications, setActiveNotifications] = useState<SystemNotification[]>([]);

  useEffect(() => {
    const visible = SYSTEM_NOTIFICATIONS.filter(n => n.isVisible);
    setActiveNotifications(visible);
  }, []);

  const dismiss = (id: string) => {
    setActiveNotifications(prev => prev.filter(n => n.id !== id));
  };

  if (activeNotifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-[10000] flex flex-col space-y-2 pointer-events-auto">
      {activeNotifications.map(n => (
        <NotificationToast key={n.id} notification={n} onDismiss={dismiss} />
      ))}
    </div>
  );
};

export default NotificationCenter;
