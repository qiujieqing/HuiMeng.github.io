import { useState } from 'react'
import { useStore } from '@/store'
import { Heart, MessageCircle, Send, Image, X } from 'lucide-react'

export function ForumPage() {
  const { posts, addPost, likePost } = useStore()
  const [showPostModal, setShowPostModal] = useState(false)
  const [postContent, setPostContent] = useState('')
  const [postImages, setPostImages] = useState<string[]>([])

  const handleSubmitPost = () => {
    if (postContent.trim()) {
      addPost(postContent.trim(), postImages)
      setPostContent('')
      setPostImages([])
      setShowPostModal(false)
    }
  }

  const addImage = () => {
    const randomImages = [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400',
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400',
      'https://images.unsplash.com/photo-1517732306149-e8f829eb588a?w=400',
    ]
    if (postImages.length < 9) {
      setPostImages([...postImages, randomImages[Math.floor(Math.random() * randomImages.length)]])
    }
  }

  const removeImage = (index: number) => {
    setPostImages(postImages.filter((_, i) => i !== index))
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(hours / 24)
    
    if (hours < 1) return '刚刚'
    if (hours < 24) return `${hours}小时前`
    if (days < 7) return `${days}天前`
    return date.toLocaleDateString()
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800">社区论坛</h2>
        <p className="text-sm text-gray-500">分享生活，交流心得</p>
      </div>

      <div className="space-y-4">
        {posts.map(post => (
          <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-4 py-3 flex items-center gap-3">
              <img
                src={post.avatar}
                alt={post.username}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-gray-800">{post.username}</p>
                <p className="text-xs text-gray-400">{formatTime(post.createdAt)}</p>
              </div>
            </div>

            <div className="px-4 py-2">
              <p className="text-gray-700 leading-relaxed">{post.content}</p>
            </div>

            {post.images.length > 0 && (
              <div className={`px-4 pb-2 grid gap-1 ${post.images.length === 1 ? 'grid-cols-1' : post.images.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                {post.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`图片${index + 1}`}
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                ))}
              </div>
            )}

            <div className="px-4 py-3 border-t border-gray-100 flex items-center gap-6">
              <button
                onClick={() => likePost(post.id)}
                className={`flex items-center gap-2 transition-colors ${
                  post.liked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                }`}
              >
                <Heart className={`w-5 h-5 ${post.liked ? 'fill-current' : ''}`} />
                <span className="text-sm">{post.likes}</span>
              </button>
              <button className="flex items-center gap-2 text-gray-500 hover:text-primary-500 transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm">{post.comments}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">暂无帖子</p>
          <p className="text-sm text-gray-400 mt-2">点击下方按钮发布第一篇帖子</p>
        </div>
      )}

      <button
        onClick={() => setShowPostModal(true)}
        className="fixed right-4 bottom-20 w-14 h-14 bg-primary-500 text-white rounded-full shadow-lg hover:bg-primary-600 transition-all hover:scale-110 flex items-center justify-center"
      >
        <Send className="w-6 h-6" />
      </button>

      {showPostModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50">
          <div className="bg-white w-full rounded-t-2xl p-4 pb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">发布帖子</h3>
              <button
                onClick={() => { setShowPostModal(false); setPostContent(''); setPostImages([]) }}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="分享你的想法..."
              className="w-full h-32 border-none outline-none resize-none text-gray-700"
            />

            {postImages.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mb-4">
                {postImages.map((img, index) => (
                  <div key={index} className="relative aspect-square">
                    <img
                      src={img}
                      alt={`图片${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 w-6 h-6 bg-black/50 text-white rounded-full flex items-center justify-center"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center gap-4">
              <button
                onClick={addImage}
                disabled={postImages.length >= 9}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Image className="w-5 h-5" />
                添加图片
              </button>
              <button
                onClick={handleSubmitPost}
                disabled={!postContent.trim()}
                className="flex-1 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                发布
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
