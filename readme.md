# Vue 3 项目

这是一个基于 Vue 3 的前端项目骨架，使用 TypeScript 和 Vite 构建。

## 项目技术栈

- Vue 3 (Composition API)
- TypeScript
- Vue Router
- Pinia 状态管理
- ESLint 代码规范
- SCSS 支持

## 项目结构

```
/
├─ public/             # 静态资源目录
├─ src/                # 源代码目录
│  ├─ assets/          # 资源文件 (图片、样式等)
│  ├─ components/      # 组件
│  ├─ router/          # 路由配置
│  ├─ stores/          # Pinia 状态管理
│  ├─ views/           # 页面视图
│  ├─ App.vue          # 根组件
│  └─ main.ts          # 入口文件
├─ .eslintrc.cjs       # ESLint 配置
├─ .gitignore          # Git 忽略文件
├─ env.d.ts            # 环境变量类型声明
├─ index.html          # HTML 入口
├─ package.json        # 依赖管理
├─ tsconfig.json       # TypeScript 配置
├─ vite.config.ts      # Vite 配置
└─ README.md           # 项目说明
```

## 开发命令

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview

# 代码检查
npm run lint
```

## 自定义配置

查看 [Vite 配置参考](https://vitejs.dev/config/)。