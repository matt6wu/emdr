# EMDR BLS (React)

这是一个可本地运行的 EMDR/BLS 练习页面（前端单页），已将原单文件拆分为组件/逻辑/音频模块，便于后续扩展（例如加入后端 WebSocket/远程控制）。

## 快速开始

```bash
npm install
npm run dev
```

默认访问地址：`http://localhost:5173`

## 生产启动（Node 后端托管）

```bash
npm run build
npm run start
```

默认访问地址：`http://localhost:3000`

## 功能概览

- 视觉刺激：移动点（或 emoji）、方向、频率(Hz)、位置、大小、颜色、背景
- 听觉刺激：左右交替双耳刺激（WebAudio 合成音色）、音量、静音
- 会话控制：开始/暂停/停止、计时、轮数统计、全屏、隐藏控制面板
- 随机化：可按“每 N 轮”随机速度/方向/颜色/声音/背景

快捷键：
- `B` 开始/停止
- `Space` 暂停/继续
- `↑/↓` 调整频率
- `H` 隐藏/显示面板
- `F` 全屏

## 项目结构

```
.
├─ index.html
├─ package.json
├─ vite.config.js
├─ postcss.config.js
├─ tailwind.config.js
├─ src
│  ├─ main.jsx
│  ├─ index.css
│  ├─ App.jsx
│  ├─ components
│  │  ├─ HeaderBar.jsx
│  │  ├─ ControlPanel.jsx
│  │  └─ Stage.jsx
│  ├─ hooks
│  │  └─ useAudioEngine.js
│  ├─ logic
│  │  └─ position.js
│  ├─ constants
│  │  └─ presets.js
│  └─ utils
│     └─ math.js
├─ emdr.jsx (原始单文件，保留用于对照)
└─ server
   └─ index.js
```

## 关键实现点

- `useAudioEngine`：WebAudio 初始化、音色合成、左右交替节拍
- `computePosition`：移动点位置计算（含方向、频率、边距、8 字路径）
- `ControlPanel`：大部分 UI/配置项的集合
- `Stage`：舞台渲染与移动点显示

## 后续扩展建议

如果要支持“治疗师端控制 / 来访者端展示”，建议新增后端：
- `server/` 用 WebSocket 管理房间与权限
- `shared/` 存放前后端共享参数结构（如频率、方向、状态）

需要我补一个后端骨架（Node/Nest/Go/Python）的话告诉我即可。

## 对外访问（全网）

前端 build 后用 Node 托管静态文件即可对外访问。最小步骤如下：

```bash
npm run build
HOST=0.0.0.0 PORT=3000 npm run start
```

然后在服务器防火墙/安全组里放行 `3000` 端口，用公网 IP 访问：
`http://<你的服务器公网IP>:3000`

建议的生产做法：
- 用 Nginx/Caddy 反向代理 `3000` 端口
- 配置 HTTPS 证书
- 绑定域名
