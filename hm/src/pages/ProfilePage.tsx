import { useStore } from '@/store'
import { User, Settings, LogOut, Crown, Award, Calendar, Briefcase } from 'lucide-react'

export function ProfilePage() {
  const { user, logout, posts, friends, departments } = useStore()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN')
  }

  const userPosition = user
    ? departments.flatMap(dept => 
        dept.positions.filter(pos => pos.selectedBy === user.id)
      ).pop()
    : null

  const userDepartment = userPosition
    ? departments.find(dept => dept.id === userPosition?.departmentId)
    : null

  return (
    <div className="p-4">
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-6 text-white mb-4">
        <div className="flex items-center gap-4">
          <img
            src={user?.avatar || 'https://ui-avatars.com/api/?name=User&background=random'}
            alt={user?.username}
            className="w-20 h-20 rounded-full border-4 border-white/30 object-cover"
          />
          <div>
            <h2 className="text-xl font-bold">{user?.username}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                user?.role === 'admin'
                  ? 'bg-yellow-400 text-yellow-900'
                  : 'bg-white/20 text-white'
              }`}>
                {user?.role === 'admin' ? '管理员' : '普通成员'}
              </span>
              <Calendar className="w-4 h-4 opacity-70" />
              <span className="text-sm opacity-70">
                {formatDate(new Date().toISOString())} 加入
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
          <p className="text-2xl font-bold text-primary-600">{posts.length}</p>
          <p className="text-xs text-gray-500">帖子</p>
        </div>
        <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
          <p className="text-2xl font-bold text-primary-600">{friends.length}</p>
          <p className="text-xs text-gray-500">好友</p>
        </div>
        <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
          <p className="text-2xl font-bold text-primary-600">0</p>
          <p className="text-xs text-gray-500">收藏</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100">
          <span className="font-semibold">我的职位</span>
        </div>
        <div className="p-4">
          {userPosition && userDepartment ? (
            <div className="flex items-center gap-3">
              <Briefcase className="w-8 h-8 text-primary-500" />
              <div>
                <p className="font-medium text-gray-800">{userPosition.name}</p>
                <p className="text-xs text-gray-400">{userDepartment.name}</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-primary-500" />
              <div>
                <p className="text-gray-600">暂无职位</p>
                <p className="text-xs text-gray-400">前往主页选择职位</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {user?.role === 'admin' && (
        <div className="bg-yellow-50 rounded-xl p-4 mt-4 border border-yellow-200">
          <div className="flex items-center gap-3">
            <Crown className="w-8 h-8 text-yellow-600" />
            <div>
              <p className="font-semibold text-yellow-800">管理员权限</p>
              <p className="text-sm text-yellow-700">您可以创建部门和职位</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-4">
        <button className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors">
          <Settings className="w-5 h-5 text-gray-500" />
          <span className="text-gray-700">设置</span>
        </button>
        <button className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors border-t border-gray-100">
          <User className="w-5 h-5 text-gray-500" />
          <span className="text-gray-700">编辑资料</span>
        </button>
        <button
          onClick={logout}
          className="w-full px-4 py-3 flex items-center gap-3 hover:bg-red-50 transition-colors border-t border-gray-100"
        >
          <LogOut className="w-5 h-5 text-red-500" />
          <span className="text-red-500">退出登录</span>
        </button>
      </div>
    </div>
  )
}
