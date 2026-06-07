import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// 简单的哈希函数（生产环境应使用bcrypt等专业库）
const simpleHash = (str: string): string => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // 转换为32位整数
  }
  return hash.toString(16)
}

export interface User {
  id: string
  username: string
  password: string
  role: 'admin' | 'member'
  avatar: string
}

export interface Position {
  id: string
  name: string
  departmentId: string
  selectedBy?: string
  createdAt: string
}

export interface Department {
  id: string
  name: string
  positions: Position[]
}

export interface Notification {
  id: string
  type: 'comment' | 'like' | 'friendRequest' | 'system'
  message: string
  read: boolean
  createdAt: string
}

export interface Post {
  id: string
  userId: string
  username: string
  avatar: string
  content: string
  images: string[]
  likes: number
  comments: number
  liked: boolean
  createdAt: string
}

export interface Message {
  id: string
  fromId: string
  fromName: string
  fromAvatar: string
  toId?: string
  content: string
  createdAt: string
  type: 'private' | 'group'
}

export interface FriendRequest {
  id: string
  fromId: string
  fromName: string
  fromAvatar: string
  toId: string
  createdAt: string
}

interface Store {
  user: User | null
  isLoggedIn: boolean
  departments: Department[]
  notifications: Notification[]
  posts: Post[]
  messages: Message[]
  friends: User[]
  friendRequests: FriendRequest[]
  
  login: (username: string, password: string) => { success: boolean; message: string }
  register: (username: string, password: string) => { success: boolean; message: string }
  logout: () => void
  addDepartment: (name: string) => void
  addPosition: (departmentId: string, name: string) => void
  selectPosition: (positionId: string) => void
  markNotificationRead: (notificationId: string) => void
  addPost: (content: string, images: string[]) => void
  likePost: (postId: string) => void
  sendMessage: (toId: string, content: string) => void
  sendFriendRequest: (userId: string) => void
  acceptFriendRequest: (requestId: string) => void
  rejectFriendRequest: (requestId: string) => void
  initializeMockData: () => void
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,
      departments: [],
      notifications: [],
      posts: [],
      messages: [],
      friends: [],
      friendRequests: [],

      login: (username, password) => {
        const savedUsers = localStorage.getItem('users')
        if (!savedUsers) {
          return { success: false, message: '用户不存在，请先注册' }
        }
        const users: User[] = JSON.parse(savedUsers)
        const user = users.find(u => u.username === username)
        if (!user) {
          return { success: false, message: '用户名不存在' }
        }
        if (user.password !== simpleHash(password)) {
          return { success: false, message: '密码错误' }
        }
        set({ user, isLoggedIn: true })
        return { success: true, message: '登录成功' }
      },

      register: (username, password) => {
        if (!username || !password) {
          return { success: false, message: '用户名和密码不能为空' }
        }
        const savedUsers = localStorage.getItem('users')
        const users: User[] = savedUsers ? JSON.parse(savedUsers) : []
        if (users.find(u => u.username === username)) {
          return { success: false, message: '用户名已存在' }
        }
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD']
        const newUser: User = {
          id: `user-${Date.now()}`,
          username,
          password: simpleHash(password),
          role: users.length === 0 ? 'admin' : 'member',
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=${colors[Math.floor(Math.random() * colors.length)]}&color=fff`
        }
        users.push(newUser)
        localStorage.setItem('users', JSON.stringify(users))
        return { success: true, message: '注册成功，请登录' }
      },

      logout: () => {
        set({ user: null, isLoggedIn: false })
      },

      addDepartment: (name) => {
        const newDepartment: Department = {
          id: `dept-${Date.now()}`,
          name,
          positions: []
        }
        set(state => ({ departments: [...state.departments, newDepartment] }))
      },

      addPosition: (departmentId, name) => {
        set(state => ({
          departments: state.departments.map(dept => {
            if (dept.id === departmentId) {
              const newPosition: Position = {
                id: `pos-${Date.now()}`,
                name,
                departmentId,
                createdAt: new Date().toISOString()
              }
              return { ...dept, positions: [...dept.positions, newPosition] }
            }
            return dept
          })
        }))
      },

      selectPosition: (positionId) => {
        const { user } = get()
        if (!user) return
        
        set(state => ({
          departments: state.departments.map(dept => ({
            ...dept,
            positions: dept.positions.map(pos => {
              if (pos.id === positionId && !pos.selectedBy) {
                return { ...pos, selectedBy: user.id }
              }
              return pos
            })
          }))
        }))
      },

      markNotificationRead: (notificationId) => {
        set(state => ({
          notifications: state.notifications.map(n => 
            n.id === notificationId ? { ...n, read: true } : n
          )
        }))
      },

      addPost: (content, images) => {
        const { user } = get()
        if (!user) return
        
        const newPost: Post = {
          id: `post-${Date.now()}`,
          userId: user.id,
          username: user.username,
          avatar: user.avatar,
          content,
          images,
          likes: 0,
          comments: 0,
          liked: false,
          createdAt: new Date().toISOString()
        }
        set(state => ({ posts: [newPost, ...state.posts] }))
      },

      likePost: (postId) => {
        set(state => ({
          posts: state.posts.map(post => {
            if (post.id === postId) {
              return {
                ...post,
                liked: !post.liked,
                likes: post.liked ? post.likes - 1 : post.likes + 1
              }
            }
            return post
          })
        }))
      },

      sendMessage: (toId, content) => {
        const { user, friends } = get()
        if (!user) return
        
        const recipient = friends.find(f => f.id === toId)
        if (!recipient) return
        
        const newMessage: Message = {
          id: `msg-${Date.now()}`,
          fromId: user.id,
          fromName: user.username,
          fromAvatar: user.avatar,
          toId,
          content,
          createdAt: new Date().toISOString(),
          type: 'private'
        }
        set(state => ({ messages: [...state.messages, newMessage] }))
      },

      sendFriendRequest: (userId) => {
        const { user, friends, friendRequests } = get()
        if (!user) return
        
        if (friends.find(f => f.id === userId)) {
          return
        }
        
        if (friendRequests.find(r => r.fromId === user.id && r.toId === userId)) {
          return
        }
        
        const newRequest: FriendRequest = {
          id: `req-${Date.now()}`,
          fromId: user.id,
          fromName: user.username,
          fromAvatar: user.avatar,
          toId: userId,
          createdAt: new Date().toISOString()
        }
        set(state => ({ friendRequests: [...state.friendRequests, newRequest] }))
      },

      acceptFriendRequest: (requestId) => {
        const { friendRequests } = get()
        const request = friendRequests.find(r => r.id === requestId)
        if (!request) return
        
        const newFriend: User = {
          id: request.fromId,
          username: request.fromName,
          password: '',
          role: 'member',
          avatar: request.fromAvatar
        }
        
        set(state => ({
          friends: [...state.friends, newFriend],
          friendRequests: state.friendRequests.filter(r => r.id !== requestId)
        }))
      },

      rejectFriendRequest: (requestId) => {
        set(state => ({
          friendRequests: state.friendRequests.filter(r => r.id !== requestId)
        }))
      },

      initializeMockData: () => {
        const mockDepartments = [
          { id: 'dept-1', name: '技术部', positions: [
            { id: 'pos-1', name: '前端开发工程师', departmentId: 'dept-1', selectedBy: 'user-1', createdAt: '2024-01-10' },
            { id: 'pos-2', name: '后端开发工程师', departmentId: 'dept-1', createdAt: '2024-01-10' },
            { id: 'pos-3', name: '测试工程师', departmentId: 'dept-1', createdAt: '2024-01-10' },
          ]},
          { id: 'dept-2', name: '设计部', positions: [
            { id: 'pos-4', name: 'UI设计师', departmentId: 'dept-2', createdAt: '2024-01-10' },
            { id: 'pos-5', name: '产品设计师', departmentId: 'dept-2', createdAt: '2024-01-10' },
          ]},
          { id: 'dept-3', name: '运营部', positions: [
            { id: 'pos-6', name: '内容运营', departmentId: 'dept-3', createdAt: '2024-01-10' },
            { id: 'pos-7', name: '活动策划', departmentId: 'dept-3', createdAt: '2024-01-10' },
            { id: 'pos-8', name: '社群运营', departmentId: 'dept-3', createdAt: '2024-01-10' },
          ]}
        ]

        const mockPosts = [
          { id: 'post-1', userId: 'user-2', username: '设计师小王', avatar: 'https://ui-avatars.com/api/?name=设计师小王&background=#FF6B6B&color=fff', content: '今天分享一下最新的设计稿，大家觉得怎么样？', images: ['https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400', 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400'], likes: 24, comments: 8, liked: false, createdAt: '2024-01-15T10:30:00Z' },
          { id: 'post-2', userId: 'user-3', username: '程序员小李', avatar: 'https://ui-avatars.com/api/?name=程序员小李&background=#4ECDC4&color=fff', content: '最近在学习React 18的新特性，Concurrent Mode真的很强大！分享一下学习心得...', images: [], likes: 15, comments: 5, liked: true, createdAt: '2024-01-14T15:20:00Z' },
          { id: 'post-3', userId: 'user-4', username: '运营小张', avatar: 'https://ui-avatars.com/api/?name=运营小张&background=#45B7D1&color=fff', content: '本周六有线下活动，欢迎大家报名参加！', images: ['https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400'], likes: 32, comments: 12, liked: false, createdAt: '2024-01-13T09:00:00Z' }
        ]

        const mockMessages = [
          { id: 'msg-1', fromId: 'user-5', fromName: '管理员', fromAvatar: 'https://ui-avatars.com/api/?name=管理员&background=#96CEB4&color=fff', content: '各位同事请注意，下周将进行年度考核，请大家提前准备。', createdAt: '2024-01-15T09:00:00Z', type: 'group' as const },
          { id: 'msg-2', fromId: 'user-2', fromName: '设计师小王', fromAvatar: 'https://ui-avatars.com/api/?name=设计师小王&background=#FF6B6B&color=fff', toId: 'user-3', content: '小李，上次那个需求的设计稿我已经发你邮箱了，有空看一下~', createdAt: '2024-01-14T14:30:00Z', type: 'private' as const },
          { id: 'msg-3', fromId: 'user-3', fromName: '程序员小李', fromAvatar: 'https://ui-avatars.com/api/?name=程序员小李&background=#4ECDC4&color=fff', toId: 'user-2', content: '收到，我下午看一下', createdAt: '2024-01-14T14:35:00Z', type: 'private' as const }
        ]

        const mockFriends = [
          { id: 'user-2', username: '设计师小王', password: '', role: 'member' as const, avatar: 'https://ui-avatars.com/api/?name=设计师小王&background=#FF6B6B&color=fff' },
          { id: 'user-3', username: '程序员小李', password: '', role: 'member' as const, avatar: 'https://ui-avatars.com/api/?name=程序员小李&background=#4ECDC4&color=fff' }
        ]

        const mockFriendRequests = [
          { id: 'req-1', fromId: 'user-6', fromName: '产品经理小陈', fromAvatar: 'https://ui-avatars.com/api/?name=产品经理小陈&background=#FFEAA7&color=000', toId: 'user-1', createdAt: '2024-01-15T11:00:00Z' },
          { id: 'req-2', fromId: 'user-7', fromName: '运维工程师老周', fromAvatar: 'https://ui-avatars.com/api/?name=运维工程师老周&background=#DDA0DD&color=fff', toId: 'user-1', createdAt: '2024-01-14T16:00:00Z' }
        ]

        set(state => ({
          ...state,
          departments: mockDepartments,
          posts: mockPosts,
          messages: mockMessages,
          friends: mockFriends,
          friendRequests: mockFriendRequests
        }))
      }
    }),
    {
      name: 'community-store',
    }
  )
)
