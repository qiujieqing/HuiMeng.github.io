import { useState } from 'react'
import { useStore } from '@/store'
import { Plus, Check, Lock, Users, UserPlus } from 'lucide-react'

export function HomePage() {
  const { user, departments, addDepartment, addPosition, selectPosition } = useStore()
  const [showAddDept, setShowAddDept] = useState(false)
  const [newDeptName, setNewDeptName] = useState('')
  const [showAddPosition, setShowAddPosition] = useState<string | null>(null)
  const [newPositionName, setNewPositionName] = useState('')

  const isAdmin = user?.role === 'admin'

  const handleAddDept = () => {
    if (newDeptName.trim()) {
      addDepartment(newDeptName.trim())
      setNewDeptName('')
      setShowAddDept(false)
    }
  }

  const handleAddPosition = () => {
    if (showAddPosition && newPositionName.trim()) {
      addPosition(showAddPosition, newPositionName.trim())
      setNewPositionName('')
      setShowAddPosition(null)
    }
  }

  const handleSelectPosition = (positionId: string, selectedBy: string | undefined) => {
    if (!selectedBy) {
      selectPosition(positionId)
    }
  }

  return (
    <div className="p-4">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">部门职位表</h2>
        <p className="text-sm text-gray-500">选择您感兴趣的职位，每个职位仅限一人</p>
      </div>

      {isAdmin && (
        <div className="mb-4">
          {!showAddDept ? (
            <button
              onClick={() => setShowAddDept(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              <Plus className="w-5 h-5" />
              添加部门
            </button>
          ) : (
            <div className="flex gap-2">
              <input
                type="text"
                value={newDeptName}
                onChange={(e) => setNewDeptName(e.target.value)}
                placeholder="部门名称"
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                onKeyPress={(e) => e.key === 'Enter' && handleAddDept()}
              />
              <button
                onClick={handleAddDept}
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
              >
                确认
              </button>
              <button
                onClick={() => { setShowAddDept(false); setNewDeptName('') }}
                className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300"
              >
                取消
              </button>
            </div>
          )}
        </div>
      )}

      {departments.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">暂无部门</p>
          {isAdmin && <p className="text-sm text-gray-400 mt-2">点击上方按钮添加部门</p>}
        </div>
      ) : (
        <div className="space-y-4">
          {departments.map(department => (
            <div key={department.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary-500" />
                  {department.name}
                </h3>
                {isAdmin && (
                  <button
                    onClick={() => setShowAddPosition(showAddPosition === department.id ? null : department.id)}
                    className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700"
                  >
                    <Plus className="w-4 h-4" />
                    添加职位
                  </button>
                )}
              </div>
              
              {showAddPosition === department.id && (
                <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newPositionName}
                      onChange={(e) => setNewPositionName(e.target.value)}
                      placeholder="职位名称"
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                      onKeyPress={(e) => e.key === 'Enter' && handleAddPosition()}
                    />
                    <button
                      onClick={handleAddPosition}
                      className="px-3 py-2 bg-primary-500 text-white text-sm rounded-lg hover:bg-primary-600"
                    >
                      确认
                    </button>
                  </div>
                </div>
              )}

              <div className="p-4">
                {department.positions.length === 0 ? (
                  <div className="text-center py-6 text-gray-400 text-sm">
                    暂无职位
                    {isAdmin && <p className="mt-1">点击上方按钮添加职位</p>}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    {department.positions.map(position => (
                      <div
                        key={position.id}
                        onClick={() => handleSelectPosition(position.id, position.selectedBy)}
                        className={`relative p-3 rounded-lg border-2 transition-all cursor-pointer ${
                          position.selectedBy
                            ? position.selectedBy === user?.id
                              ? 'border-green-500 bg-green-50'
                              : 'border-gray-200 bg-gray-100 cursor-not-allowed'
                            : 'border-gray-200 hover:border-primary-500 hover:bg-primary-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`font-medium ${
                            position.selectedBy
                              ? position.selectedBy === user?.id ? 'text-green-700' : 'text-gray-500'
                              : 'text-gray-700'
                          }`}>
                            {position.name}
                          </span>
                          {position.selectedBy ? (
                            position.selectedBy === user?.id ? (
                              <Check className="w-5 h-5 text-green-500" />
                            ) : (
                              <Lock className="w-4 h-4 text-gray-400" />
                            )
                          ) : (
                            <UserPlus className="w-4 h-4 text-gray-400" />
                          )}
                        </div>
                        {position.selectedBy && position.selectedBy !== user?.id && (
                          <p className="text-xs text-gray-400 mt-1">已被选择</p>
                        )}
                        {position.selectedBy === user?.id && (
                          <p className="text-xs text-green-600 mt-1">已选择</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
