
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
      case 'music': return (
        <div className="bg-indigo-500 p-1.5 rounded-lg text-white">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
        </div>
      );
      case 'alert': return (
        <div className="bg-red-500 p-1.5 rounded-lg text-white">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
        </div>
      );
      default: return (
        <div className="bg-blue-500 p-1.5 rounded-lg text-white">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"/></svg>
        </div>
      );
    }
  };

  return (
    <div className={`w-80 bg-white/80 os-blur rounded-2xl shadow-2xl border border-white/40 p-4 transition-all duration-300 transform ${isClosing ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'} animate-in slide-in-from-right-10`}>
      <div className="flex items-start space-x-3">
        {getIcon()}
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h4 className="text-[13px] font-bold text-gray-800 leading-tight">{notification.title}</h4>
            <button onClick={handleDismiss} className="text-gray-400 hover:text-gray-600">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
          <p className="text-[12px] text-gray-600 mt-1 leading-snug">{notification.message}</p>
        </div>
      </div>
    </div>
  );
};

const NotificationCenter: React.FC = () => {
  const [activeNotifications, setActiveNotifications] = useState<SystemNotification[]>([]);

  useEffect(() => {
    // Filtriamo le notifiche visibili dalla config
    const visible = SYSTEM_NOTIFICATIONS.filter(n => n.isVisible);
    setActiveNotifications(visible);
  }, []);

  const dismiss = (id: string) => {
    setActiveNotifications(prev => prev.filter(n => n.id !== id));
  };

  if (activeNotifications.length === 0) return null;

  return (
    <div className="fixed top-10 right-6 z-[10000] flex flex-col space-y-3 pointer-events-auto">
      {activeNotifications.map(n => (
        <NotificationToast key={n.id} notification={n} onDismiss={dismiss} />
      ))}
    </div>
  );
};

export default NotificationCenter;
