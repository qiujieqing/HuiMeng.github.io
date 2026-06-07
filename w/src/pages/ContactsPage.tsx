import { useState } from 'react'
import { useStore } from '@/store'
import { User, UserPlus, Check, X, Users } from 'lucide-react'

export function ContactsPage() {
  const { friends, friendRequests, acceptFriendRequest, rejectFriendRequest } = useStore()
  const [activeTab, setActiveTab] = useState<'friends' | 'requests'>('friends')

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-CN')
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800">联系人</h2>
      </div>

      <div className="flex bg-gray-100 rounded-lg p-1 mb-4">
        <button
          onClick={() => setActiveTab('friends')}
          className={`flex-1 py-2 rounded-md text-center font-medium transition-colors ${
            activeTab === 'friends'
              ? 'bg-white text-primary-600 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          好友列表
        </button>
        <button
          onClick={() => setActiveTab('requests')}
          className={`flex-1 py-2 rounded-md text-center font-medium transition-colors relative ${
            activeTab === 'requests'
              ? 'bg-white text-primary-600 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          好友申请
          {friendRequests.length > 0 && (
            <span className="absolute top-1 right-3 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {friendRequests.length}
            </span>
          )}
        </button>
      </div>

      {activeTab === 'friends' ? (
        <div className="space-y-3">
          {friends.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">暂无好友</p>
              <p className="text-sm text-gray-400 mt-2">添加好友开始社交吧</p>
            </div>
          ) : (
            friends.map(friend => (
              <div
                key={friend.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-4 hover:shadow-md transition-shadow"
              >
                <img
                  src={friend.avatar}
                  alt={friend.username}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{friend.username}</p>
                  <p className="text-xs text-gray-400">好友</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-4 py-2 bg-primary-500 text-white text-sm rounded-lg hover:bg-primary-600 transition-colors">
                    发消息
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {friendRequests.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <UserPlus className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">暂无好友申请</p>
            </div>
          ) : (
            friendRequests.map(request => (
              <div
                key={request.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={request.fromAvatar}
                    alt={request.fromName}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{request.fromName}</p>
                    <p className="text-xs text-gray-400">
                      {formatTime(request.createdAt)} 发送申请
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => acceptFriendRequest(request.id)}
                      className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
                      title="接受"
                    >
                      <Check className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => rejectFriendRequest(request.id)}
                      className="p-2 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300 transition-colors"
                      title="拒绝"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
