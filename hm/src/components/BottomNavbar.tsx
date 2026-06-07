import { Home, Users, MessageCircle, User, UserCircle } from 'lucide-react'

interface BottomNavbarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function BottomNavbar({ activeTab, onTabChange }: BottomNavbarProps) {
  const tabs = [
    { id: 'home', label: '主页', icon: Home },
    { id: 'forum', label: '论坛', icon: Users },
    { id: 'message', label: '消息', icon: MessageCircle },
    { id: 'contacts', label: '联系人', icon: User },
    { id: 'profile', label: '我的', icon: UserCircle },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-around py-2">
          {tabs.map(tab => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
                  isActive
                    ? 'text-primary-600'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <Icon className={`w-6 h-6 ${isActive ? 'scale-110' : ''} transition-transform`} />
                <span className={`text-xs font-medium ${isActive ? 'font-semibold' : ''}`}>
                  {tab.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
