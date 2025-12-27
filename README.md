# EMDR BLS (React)

这是一个可本地运行的 EMDR/BLS 练习页面（前端单页），已将原单文件拆分为组件/逻辑/音频模块，便于后续扩展（例如加入后端 WebSocket/远程控制）。

**✨ 新增功能**：
- 📱 **移动端横屏优化** - 抽屉式控制面板，Stage 全屏显示
- 🔊 **移动端音频修复** - 支持 iOS/Android 浏览器音频播放
- 🔐 **激活码系统** - 通过 Cloudflare Worker 验证访问权限

## 快速开始

### 本地开发

```bash
npm install
npm run dev
```

默认访问地址：`http://localhost:5173`

### 生产启动（Node 后端托管）

```bash
npm run build
npm run start
```

默认访问地址：`http://localhost:3000`

## 功能概览

### 视觉刺激
- 移动点（或 emoji）
- 8 种运动方向（左右、上下、对角、∞字形）
- 可调频率（0.1~0.8 Hz）
- 自定义位置、大小、颜色
- 多种背景颜色
- emoji 模式（可用任意字符/emoji 作为移动点）

### 听觉刺激
- 左右交替双耳刺激（WebAudio 合成音色）
- 12 种音效可选
- 音量控制、静音功能
- **移动端音频支持**（自动恢复 AudioContext）

### 会话控制
- 开始/暂停/停止
- 计时、轮数统计
- 全屏模式
- 隐藏/显示控制面板
- **移动端抽屉式面板**（< 1024px 屏幕宽度）

### 随机化（高级）
- 可按"每 N 轮"随机调整参数
- 可选：频率、方向、颜色、声音、背景
- 用于增加工作记忆负荷

### 快捷键

- `B` 开始/停止
- `Space` 暂停/继续
- `↑/↓` 调整频率
- `H` 隐藏/显示面板
- `F` 全屏

## 移动端使用

### 推荐配置
- **横屏模式** - EMDR 左右移动效果更好
- **全屏模式** - 点击顶部"面板"按钮可打开设置
- **音频初始化** - 首次使用时点击"初始化音频"按钮

### 移动端特性
- 默认隐藏控制面板，Stage 占满全屏
- 抽屉式侧边控制面板（点击"面板"按钮打开）
- 触摸友好的按钮尺寸（最小 44px）
- 自动恢复 AudioContext（iOS/Android 兼容）

## 当前默认值 / 上限

- 默认频率：`0.25 Hz`
- 随机频率范围：`0.1 ~ 0.35 Hz`
- 频率上限：`0.8 Hz`
- 默认点大小：`145 px`
- 默认声音：`🏸 羽毛球（Shuttle）`
- 默认方向：`左右（LR）`

## 音效列表

WebAudio 合成音效（可在下拉中切换）：
- `响指/啪嗒 (Snap)`
- `柔和铃声 (Bell)`
- `贝斯 (Bass)`
- `鼓点 (Drum)`
- `心跳 (Heartbeat)`
- `呼呼声 (Whoosh)`
- `羽毛球 (Shuttle)` ⭐ 默认
- `木鱼 (Woodblock)`
- `水滴 (Droplet)`
- `风铃 (Chime)`
- `点击 (Click)`
- `雨声 (Rain)`

## 点颜色选项

内置颜色：`蓝`、`红`、`绿`、`青`、`紫`、`橙`、`粉`、`黄绿`、`自定义`

## 项目结构

```
.
├─ index.html
├─ package.json
├─ vite.config.js
├─ postcss.config.js
├─ tailwind.config.js
├─ .gitignore
├─ src
│  ├─ main.jsx
│  ├─ index.css
│  ├─ App.jsx
│  ├─ components
│  │  ├─ HeaderBar.jsx        # 顶部导航栏
│  │  ├─ ControlPanel.jsx     # 控制面板（桌面侧边栏/移动抽屉）
│  │  └─ Stage.jsx            # 舞台与移动点
│  ├─ hooks
│  │  └─ useAudioEngine.js    # 音频引擎（WebAudio）
│  ├─ logic
│  │  └─ position.js          # 移动点位置计算
│  ├─ constants
│  │  └─ presets.js           # 预设配置（颜色、方向、音效）
│  └─ utils
│     └─ math.js              # 数学工具函数
├─ worker
│  └─ index.js                # Cloudflare Worker（激活码验证）
└─ server
   └─ index.js                # Node.js 静态服务器
```

## 关键实现点

- **`useAudioEngine`**：WebAudio 初始化、音色合成、左右交替节拍、移动端音频恢复
- **`computePosition`**：移动点位置计算（含方向、频率、边距、8 字路径）
- **`ControlPanel`**：响应式控制面板（桌面侧边栏/移动抽屉）
- **`Stage`**：舞台渲染与移动点显示
- **移动端优化**：抽屉式面板、触摸友好按钮、自动隐藏控制

## 部署

### Cloudflare Pages（推荐）

**前端部署**：

1. 连接 GitHub 仓库到 Cloudflare Pages
2. 构建设置：
   - 构建命令：`npm run build`
   - 构建输出目录：`dist`
   - Node 版本：18 或更高
3. 自动部署到 `https://<your-project>.pages.dev`

**激活码功能（可选）**：

如需限制访问，可部署 Cloudflare Worker 验证激活码：

1. Cloudflare → Workers & Pages → Create Application → Worker
2. 复制 `worker/index.js` 内容并部署
3. Worker → Settings → Variables → 添加环境变量 `CODES`
   - 值：激活码列表（空格或逗号分隔，如 `code1 code2 code3`）
4. 记录 Worker 地址（如 `https://your-worker.workers.dev`）
5. Cloudflare Pages → Settings → Environment variables → 添加：
   - 变量名：`VITE_ACTIVATION_ENDPOINT`
   - 值：`https://your-worker.workers.dev/api/activate`
6. 重新部署 Pages

详细步骤见 README 末尾的"激活码部署"章节。

### 自建服务器部署

```bash
npm run build
HOST=0.0.0.0 PORT=3000 npm run start
```

然后在服务器防火墙/安全组里放行 `3000` 端口，用公网 IP 访问：
`http://<你的服务器公网IP>:3000`

**生产建议**：
- 用 Nginx/Caddy 反向代理 `3000` 端口
- 配置 HTTPS 证书
- 绑定域名

## 技术栈

- **前端框架**：React 18
- **构建工具**：Vite 5
- **样式**：Tailwind CSS 3
- **音频**：Web Audio API
- **部署**：Cloudflare Pages + Workers
- **后端**（可选）：Node.js + Express

## 移动端音频注意事项

移动端浏览器（iOS Safari、Android Chrome）对 Web Audio API 有严格限制：

1. **AudioContext 默认为暂停状态**
2. **必须在用户交互后激活**（点击按钮）
3. 本项目已自动处理：
   - 在 `ensureAudio()` 中调用 `audioContext.resume()`
   - 在 `playBeat()` 前检查并恢复 AudioContext
   - 显示"初始化音频"提示（如需要）

如果仍无声音，请：
- 确保设备音量已开启
- 检查浏览器是否允许音频播放
- 点击"初始化音频"按钮
- 尝试重新加载页面

## 后续扩展建议

### 远程控制功能

如果要支持"治疗师端控制 / 来访者端展示"，建议新增后端：

- `server/` 用 WebSocket 管理房间与权限
- `shared/` 存放前后端共享参数结构（如频率、方向、状态）
- 使用 Socket.IO 或原生 WebSocket
- 实现房间管理、权限控制、状态同步

### 触觉刺激

浏览器端可选方案：
- Web Bluetooth（连接蓝牙振动器）
- WebHID / WebUSB（连接 USB 设备）
- Vibration API（手机振动，但控制有限）

## 激活码部署详细步骤

### 1. 准备激活码

创建 `activation-codes.txt` 文件（本地保存，不提交到 git）：

```
code123
user456
demo789
```

### 2. 部署 Cloudflare Worker（手动）

1. Cloudflare → Workers & Pages → Create Application → Worker（命名如 `rem-restore-activation`）
2. 打开 Worker 编辑器，粘贴 `worker/index.js` 的内容并部署
3. Worker → Settings → Variables → 新增 `CODES`，粘贴 `activation-codes.txt` 的全部激活码（空格或逗号分隔）
4. 记录 Worker 地址，例如 `https://rem-restore-activation.<子域>.workers.dev`
5. Cloudflare Pages → Settings → Environment variables → 添加 `VITE_ACTIVATION_ENDPOINT` 为：
   `https://rem-restore-activation.<子域>.workers.dev/api/activate`
6. 重新部署 Pages

### 3. 本地测试激活码

可以先跳过 Worker，用临时地址占位，前端会显示"激活码无效"。正式接入后再替换：

```bash
# 可选：在本地创建 .env
VITE_ACTIVATION_ENDPOINT=http://localhost:8787/api/activate
```

若想本地跑 Worker，可用 Wrangler CLI（可选）。

## 免责声明 / Disclaimer

**免责声明（非医疗建议）**：本网站仅用于信息与教育目的，不构成医疗/健康建议；使用前请咨询专业人士，风险自担。

**Disclaimer (No Medical Advice)**: This site is for informational/educational use only and is not medical advice. Consult professionals and use at your own risk.

## License

MIT

---

**REM Restore Studio™** - 专业 EMDR 双侧刺激工具
