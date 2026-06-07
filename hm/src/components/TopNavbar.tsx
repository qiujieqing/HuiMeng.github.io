import { Bell, User } from 'lucide-react'
import { useState } from 'react'
import { useStore } from '@/store'

export function TopNavbar() {
  const { user, notifications, markNotificationRead } = useStore()
  const [showNotifications, setShowNotifications] = useState(false)
  
  const unreadCount = notifications.filter(n => !n.read).length
  
  const handleNotificationClick = (notificationId: string) => {
    markNotificationRead(notificationId)
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like': return '👍'
      case 'comment': return '💬'
      case 'friendRequest': return '👋'
      case 'system': return '📢'
      default: return '🔔'
    }
  }

  return (
    <div className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-primary-600">社区平台</h1>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Bell className="w-6 h-6 text-gray-600" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-100 py-2">
                <div className="px-4 py-2 border-b border-gray-100">
                  <h3 className="font-semibold">通知</h3>
                </div>
                {notifications.length === 0 ? (
                  <div className="px-4 py-8 text-center text-gray-400">
                    暂无通知
                  </div>
                ) : (
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map(notification => (
                      <div
                        key={notification.id}
                        onClick={() => handleNotificationClick(notification.id)}
                        className={`px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-start gap-3 ${notification.read ? '' : 'bg-gray-50'}`}
                      >
                        <span className="text-xl">{getNotificationIcon(notification.type)}</span>
                        <div className="flex-1">
                          <p className="text-sm text-gray-700">{notification.message}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(notification.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <img
              src={user?.avatar || 'https://ui-avatars.com/api/?name=User&background=random'}
              alt="头像"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm font-medium text-gray-700">{user?.username}</span>
            <User className="w-5 h-5 text-gray-500" />
          </div>
        </div>
      </div>
    </div>
  )
}
