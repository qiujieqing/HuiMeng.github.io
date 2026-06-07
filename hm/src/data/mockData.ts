import type { Department, Post, Message, FriendRequest, User } from '@/store'

export const mockDepartments: Department[] = [
  {
    id: 'dept-1',
    name: '技术部',
    positions: [
      { id: 'pos-1', name: '前端开发工程师', departmentId: 'dept-1', selectedBy: 'user-1', createdAt: '2024-01-10' },
      { id: 'pos-2', name: '后端开发工程师', departmentId: 'dept-1', createdAt: '2024-01-10' },
      { id: 'pos-3', name: '测试工程师', departmentId: 'dept-1', createdAt: '2024-01-10' },
    ]
  },
  {
    id: 'dept-2',
    name: '设计部',
    positions: [
      { id: 'pos-4', name: 'UI设计师', departmentId: 'dept-2', createdAt: '2024-01-10' },
      { id: 'pos-5', name: '产品设计师', departmentId: 'dept-2', createdAt: '2024-01-10' },
    ]
  },
  {
    id: 'dept-3',
    name: '运营部',
    positions: [
      { id: 'pos-6', name: '内容运营', departmentId: 'dept-3', createdAt: '2024-01-10' },
      { id: 'pos-7', name: '活动策划', departmentId: 'dept-3', createdAt: '2024-01-10' },
      { id: 'pos-8', name: '社群运营', departmentId: 'dept-3', createdAt: '2024-01-10' },
    ]
  }
]

export const mockPosts: Post[] = [
  {
    id: 'post-1',
    userId: 'user-2',
    username: '设计师小王',
    avatar: 'https://ui-avatars.com/api/?name=设计师小王&background=#FF6B6B&color=fff',
    content: '今天分享一下最新的设计稿，大家觉得怎么样？',
    images: [
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400',
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400'
    ],
    likes: 24,
    comments: 8,
    liked: false,
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 'post-2',
    userId: 'user-3',
    username: '程序员小李',
    avatar: 'https://ui-avatars.com/api/?name=程序员小李&background=#4ECDC4&color=fff',
    content: '最近在学习React 18的新特性，Concurrent Mode真的很强大！分享一下学习心得...',
    images: [],
    likes: 15,
    comments: 5,
    liked: true,
    createdAt: '2024-01-14T15:20:00Z'
  },
  {
    id: 'post-3',
    userId: 'user-4',
    username: '运营小张',
    avatar: 'https://ui-avatars.com/api/?name=运营小张&background=#45B7D1&color=fff',
    content: '本周六有线下活动，欢迎大家报名参加！',
    images: [
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400'
    ],
    likes: 32,
    comments: 12,
    liked: false,
    createdAt: '2024-01-13T09:00:00Z'
  }
]

export const mockMessages: Message[] = [
  {
    id: 'msg-1',
    fromId: 'user-5',
    fromName: '管理员',
    fromAvatar: 'https://ui-avatars.com/api/?name=管理员&background=#96CEB4&color=fff',
    content: '各位同事请注意，下周将进行年度考核，请大家提前准备。',
    createdAt: '2024-01-15T09:00:00Z',
    type: 'group'
  },
  {
    id: 'msg-2',
    fromId: 'user-2',
    fromName: '设计师小王',
    fromAvatar: 'https://ui-avatars.com/api/?name=设计师小王&background=#FF6B6B&color=fff',
    content: '小李，上次那个需求的设计稿我已经发你邮箱了，有空看一下~',
    createdAt: '2024-01-14T14:30:00Z',
    type: 'private'
  },
  {
    id: 'msg-3',
    fromId: 'user-3',
    fromName: '程序员小李',
    fromAvatar: 'https://ui-avatars.com/api/?name=程序员小李&background=#4ECDC4&color=fff',
    content: '收到，我下午看一下',
    createdAt: '2024-01-14T14:35:00Z',
    type: 'private'
  }
]

export const mockFriends: User[] = [
  {
    id: 'user-2',
    username: '设计师小王',
    password: '',
    role: 'member',
    avatar: 'https://ui-avatars.com/api/?name=设计师小王&background=#FF6B6B&color=fff'
  },
  {
    id: 'user-3',
    username: '程序员小李',
    password: '',
    role: 'member',
    avatar: 'https://ui-avatars.com/api/?name=程序员小李&background=#4ECDC4&color=fff'
  }
]

export const mockFriendRequests: FriendRequest[] = [
  {
    id: 'req-1',
    fromId: 'user-6',
    fromName: '产品经理小陈',
    fromAvatar: 'https://ui-avatars.com/api/?name=产品经理小陈&background=#FFEAA7&color=000',
    createdAt: '2024-01-15T11:00:00Z'
  },
  {
    id: 'req-2',
    fromId: 'user-7',
    fromName: '运维工程师老周',
    fromAvatar: 'https://ui-avatars.com/api/?name=运维工程师老周&background=#DDA0DD&color=fff',
    createdAt: '2024-01-14T16:00:00Z'
  }
]
