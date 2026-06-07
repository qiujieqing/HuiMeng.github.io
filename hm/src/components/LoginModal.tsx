import { useState } from 'react'
import { useStore } from '@/store'
import { Eye, EyeOff } from 'lucide-react'

export function LoginModal() {
  const { login, register } = useStore()
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (isLogin) {
      const result = login(username, password)
      if (!result.success) {
        setError(result.message)
      }
    } else {
      const result = register(username, password)
      if (!result.success) {
        setError(result.message)
      } else {
        setTimeout(() => {
          setIsLogin(true)
          setError('')
          setUsername('')
          setPassword('')
        }, 2000)
      }
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-8 text-center">
          <h2 className="text-2xl font-bold text-white">欢迎加入社区</h2>
          <p className="text-primary-100 mt-2">创建账号或登录开始您的旅程</p>
        </div>
        
        <div className="px-6 py-6">
          <div className="flex mb-6">
            <button
              onClick={() => { setIsLogin(true); setError('') }}
              className={`flex-1 py-3 text-center font-medium rounded-lg transition-all ${
                isLogin
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              登录
            </button>
            <button
              onClick={() => { setIsLogin(false); setError('') }}
              className={`flex-1 py-3 text-center font-medium rounded-lg transition-all ${
                !isLogin
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              注册
            </button>
          </div>
          
          {error && (
            <div className={`mb-4 p-3 rounded-lg text-sm ${
              error.includes('成功') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
            }`}>
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">用户名</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="请输入用户名"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">密码</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="请输入密码"
                  className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full py-3 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 transition-colors"
            >
              {isLogin ? '登录' : '注册'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
