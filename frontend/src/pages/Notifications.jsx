import React, { useState, useEffect } from 'react';
import { AiOutlineBell, AiOutlineClose } from 'react-icons/ai';
import { notificationsService } from '../services/api';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadNotifications();
  }, [filter]);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const [notifResponse, unreadResponse] = await Promise.all([
        notificationsService.getNotifications({ limit: 50 }),
        notificationsService.getUnreadCount(),
      ]);
      setNotifications(notifResponse.data.notifications);
      setUnreadCount(unreadResponse.data.unreadCount);
    } catch (error) {
      console.error('Erro ao carregar notificações:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      await notificationsService.markAsRead(notificationId);
      setNotifications(notifications.map(n => 
        n.id === notificationId ? { ...n, read: true } : n
      ));
      setUnreadCount(Math.max(0, unreadCount - 1));
    } catch (error) {
      console.error('Erro ao marcar como lido:', error);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'like':
        return '❤️';
      case 'retweet':
        return '🔄';
      case 'reply':
        return '💬';
      case 'follow':
        return '👥';
      default:
        return '📢';
    }
  };

  const getNotificationMessage = (type, actor) => {
    switch (type) {
      case 'like':
        return `${actor} curtiu seu tweet`;
      case 'retweet':
        return `${actor} retweetou seu tweet`;
      case 'reply':
        return `${actor} respondeu seu tweet`;
      case 'follow':
        return `${actor} começou a te seguir`;
      default:
        return `${actor} interagiu com você`;
    }
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'all') return true;
    return n.type === filter;
  });

  return (
    <div className="max-w-2xl mx-auto border-r border-l border-gray-300">
      {/* Header */}
      <div className="p-4 border-b border-gray-300 sticky top-0 bg-white bg-opacity-80 backdrop-blur-sm z-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Notificações</h2>
          <button className="hover:bg-gray-100 p-2 rounded-full transition">
            <AiOutlineClose size={20} />
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[
            { id: 'all', label: 'Tudo' },
            { id: 'mentions', label: 'Menções' },
            { id: 'like', label: 'Likes' },
            { id: 'retweet', label: 'Retweets' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-4 py-2 rounded-full font-bold whitespace-nowrap transition ${
                filter === f.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Unread Count */}
      {unreadCount > 0 && (
        <div className="p-4 bg-blue-50 border-b border-blue-200">
          <p className="text-sm font-semibold text-blue-900">
            Você tem {unreadCount} notificação{unreadCount !== 1 ? 's' : ''} não lida{unreadCount !== 1 ? 's' : ''}
          </p>
        </div>
      )}

      {/* Notifications List */}
      {loading ? (
        <div className="p-8 text-center text-gray-500">Carregando notificações...</div>
      ) : filteredNotifications.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          <AiOutlineBell size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-lg font-semibold">Sem notificações ainda</p>
          <p className="text-sm">Quando alguém interagir com você, aparecerá aqui</p>
        </div>
      ) : (
        <div>
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => !notification.read && handleMarkAsRead(notification.id)}
              className={`p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition ${
                !notification.read ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex gap-3">
                <span className="text-2xl">{getNotificationIcon(notification.type)}</span>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-bold hover:underline">{notification.full_name}</p>
                    {!notification.read && (
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    )}
                  </div>

                  <p className="text-gray-900">
                    {getNotificationMessage(notification.type, `@${notification.username}`)}
                  </p>

                  {notification.content && (
                    <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                      "{notification.content}"
                    </p>
                  )}

                  <p className="text-gray-500 text-sm mt-2">
                    {new Date(notification.created_at).toLocaleString('pt-BR')}
                  </p>
                </div>

                <img
                  src={notification.profile_picture || 'https://via.placeholder.com/48'}
                  alt={notification.username}
                  className="w-10 h-10 rounded-full flex-shrink-0 object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
