# 🚀 快速开始指南

## 📋 前置要求

- Node.js 18+
- npm 或 yarn
- MongoDB (本地或 MongoDB Atlas)

## 📦 安装依赖

```bash
# 安装所有依赖
npm install

# 前端依赖
cd frontend && npm install && cd ..

# 后端依赖  
cd backend && npm install && cd ..
```

## 🔧 环境配置

1. 复制环境变量文件：
```bash
cp .env.example .env
```

2. 编辑 `.env` 文件，配置以下内容：
```bash
# Backend
PORT=3001
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/org-management
JWT_SECRET=your-super-secret-key-change-in-production
JWT_EXPIRATION=7d

# Frontend
VITE_API_URL=http://localhost:3001
VITE_SOCKET_URL=http://localhost:3001
```

## 🗄️ MongoDB 设置

### 方式1：本地 MongoDB
```bash
# macOS (使用 Homebrew)
brew services start mongodb-community

# 或直接启动
mongod
```

### 方式2：Docker
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 方式3：MongoDB Atlas (云)
1. 访问 [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. 创建免费集群
3. 获取连接字符串，替换 `.env` 中的 `MONGODB_URI`

## 🚀 启动开发服务

### 方式1：并行运行前后端（推荐）
```bash
npm run dev
```

### 方式2：分别启动
```bash
# 终端1 - 启动后端
cd backend
npm run dev

# 终端2 - 启动前端
cd frontend
npm run dev
```

## 📍 访问地址

- **前端**: http://localhost:5173
- **后端**: http://localhost:3001
- **API 文档**: http://localhost:3001/api/docs

## 📝 测试账户

打开前端页面，使用 **注册** 功能创建新账户测试。

## 🏗️ 项目结构

```
org-management-platform/
├── frontend/                    # React 前端
│   ├── src/
│   │   ├── pages/              # 5个页面
│   │   ├── components/         # 导航组件
│   │   ├── store/              # 状态管理
│   │   └── App.tsx
│   ├── vite.config.ts
│   └── package.json
│
├── backend/                     # NestJS 后端
│   ├── src/
│   │   ├── auth/               # 认证
│   │   ├── user/               # 用户
│   │   ├── department/         # 部门
│   │   ├── position/           # 职위
│   │   ├── forum/              # 论坛
│   │   ├── message/            # 消息
│   │   ├── notification/       # 通知
│   │   └── main.ts
│   ├── tsconfig.json
│   └── package.json
│
└── .env.example
```

## 🔑 核心 API 端点

### 认证
- `POST /auth/register` - 注册
- `POST /auth/login` - 登录

### 部门和职位
- `GET /departments` - 获取所有部门
- `POST /positions/:id/select` - 选择职位

### 论坛
- `POST /forum/posts` - 创建帖子
- `GET /forum/posts` - 获取帖子列表
- `POST /forum/posts/:id/like` - 点赞

### 消息
- `POST /messages` - 发送消息
- `GET /messages/private/:userId` - 私聊记录
- `GET /messages/group` - 群消息

### 通知
- `GET /notifications` - 获取通知
- `POST /notifications/:id/read` - 标记已读

## 🎨 前端页面

| 页面 | 功能 |
|------|------|
| Auth | 登录/注册 |
| Home | 职位表、部门管理 |
| Forum | 发布帖子、评论、点赞 |
| Messages | 私聊、群消息 |
| Contacts | 好友列表、申请管理 |
| Profile | 个人资料、退出登录 |

## 📱 UI 框架

- **Ant Design** - 组件库
- **Tailwind CSS** - 样式（可选）
- **React Router** - 路由

## 🔐 认证流程

1. 用户在 Auth 页面注册/登录
2. 后端返回 JWT Token
3. 前端存储 Token 到 localStorage
4. 每个请求自动添加 Authorization 头
5. Token 过期时自动刷新或重定向到登录

## 🛠️ 开发建议

### 添加新功能步骤：

1. **后端**：
   - 在相应模块添加 `.schema.ts`（数据模型）
   - 在 `.service.ts` 中添加业务逻辑
   - 在 `.controller.ts` 中添加 API 路由

2. **前端**：
   - 在 `src/pages/` 或 `src/components/` 添加 React 组件
   - 在 `src/api/` 添加 API 调用函数
   - 使用 Zustand 管理状态（如需）

## 📚 有用的命令

```bash
# 前端
npm run dev        # 开发模式
npm run build      # 生产构建
npm run preview    # 预览构建结果

# 后端
npm run dev        # 监视模式
npm run build      # 构建
npm run start      # 启动生产版本
npm run lint       # 代码检查
npm run test       # 运行测试
```

## 🐛 常见问题

### 1. MongoDB 连接失败
- 确保 MongoDB 已启动
- 检查 `MONGODB_URI` 是否正确
- 查看后端日志

### 2. 前端无法连接后端
- 确保后端运行在 3001 端口
- 检查 `VITE_API_URL` 配置
- 查看浏览器控制台的错误

### 3. Token 过期怎么办
- 刷新页面自动重新登录
- 或点击"我的"页面的"退出登录"再重新登录

## 📖 学习资源

- [React 官方文档](https://react.dev)
- [NestJS 官方文档](https://docs.nestjs.com)
- [MongoDB 官方文档](https://docs.mongodb.com)
- [Ant Design](https://ant.design)

## 📞 获取帮助

如遇到问题，请：
1. 查看错误日志
2. 查看浏览器控制台
3. 提交 Issue 或 PR

---

**祝你开发顺利！** 🎉
