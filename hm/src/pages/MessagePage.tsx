import { useState } from 'react'
import { useStore } from '@/store'
import { Send, Users, User } from 'lucide-react'

export function MessagePage() {
  const { messages, friends, sendMessage, user } = useStore()
  const [selectedFriend, setSelectedFriend] = useState<string | null>(null)
  const [inputMessage, setInputMessage] = useState('')

  const groupMessages = messages.filter(m => m.type === 'group')
  const privateMessages = messages.filter(m => m.type === 'private')

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  }

  const handleSendMessage = () => {
    if (selectedFriend && inputMessage.trim()) {
      sendMessage(selectedFriend, inputMessage.trim())
      setInputMessage('')
    }
  }

  const friendMessages = selectedFriend && user
    ? privateMessages.filter(m => 
        (m.fromId === selectedFriend && m.toId === user.id) || 
        (m.fromId === user.id && m.toId === selectedFriend)
      )
    : []

  const selectedFriendData = friends.find(f => f.id === selectedFriend)

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800">消息</h2>
      </div>

      <div className="space-y-4">
        {groupMessages.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary-500" />
                <span className="font-semibold">系统通知</span>
              </div>
            </div>
            <div className="p-4">
              {groupMessages.map(message => (
                <div key={message.id} className="flex items-start gap-3 mb-3 last:mb-0">
                  <img
                    src={message.fromAvatar}
                    alt={message.fromName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-800">{message.fromName}</span>
                      <span className="text-xs text-gray-400">{formatTime(message.createdAt)}</span>
                    </div>
                    <p className="text-gray-600 bg-gray-100 px-3 py-2 rounded-lg rounded-tl-none">
                      {message.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {friends.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="px-4 py-3 border-b border-gray-100">
              <span className="font-semibold">好友消息</span>
            </div>
            
            {!selectedFriend ? (
              <div className="p-4">
                <div className="grid grid-cols-2 gap-3">
                  {friends.map(friend => (
                    <div
                      key={friend.id}
                      onClick={() => setSelectedFriend(friend.id)}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <img
                        src={friend.avatar}
                        alt={friend.username}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-800">{friend.username}</p>
                        <p className="text-xs text-gray-400">点击聊天</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-80 flex flex-col">
                <div
                  onClick={() => setSelectedFriend(null)}
                  className="px-4 py-3 bg-gray-50 flex items-center gap-3 cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <img
                    src={selectedFriendData?.avatar}
                    alt={selectedFriendData?.username}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="font-medium text-gray-800">{selectedFriendData?.username}</span>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {friendMessages.length === 0 ? (
                    <div className="text-center py-12 text-gray-400">
                      <User className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>暂无消息，开始聊天吧</p>
                    </div>
                  ) : (
                    friendMessages.map(message => (
                      <div
                        key={message.id}
                        className={`flex items-start gap-3 ${message.fromId === selectedFriend ? '' : 'flex-row-reverse'}`}
                      >
                        <img
                          src={message.fromAvatar}
                          alt={message.fromName}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className={`max-w-[70%] ${message.fromId === selectedFriend ? 'rounded-tr-none' : 'rounded-tl-none'}`}>
                          <p className={`px-3 py-2 rounded-lg text-sm ${
                            message.fromId === selectedFriend
                              ? 'bg-gray-100 text-gray-700'
                              : 'bg-primary-500 text-white'
                          }`}>
                            {message.content}
                          </p>
                          <p className={`text-xs mt-1 ${message.fromId === selectedFriend ? 'text-gray-400' : 'text-gray-400'}`}>
                            {formatTime(message.createdAt)}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="px-4 py-3 border-t border-gray-100">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="输入消息..."
                      className="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:ring-2 focus:ring-primary-500 outline-none"
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim()}
                      className="p-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {messages.length === 0 && friends.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <Send className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">暂无消息</p>
          </div>
        )}
      </div>
    </div>
  )
}
