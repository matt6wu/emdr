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
- 激活码：未激活时随机化锁定，激活后解锁

快捷键：
- `B` 开始/停止
- `Space` 暂停/继续
- `↑/↓` 调整频率
- `H` 隐藏/显示面板
- `F` 全屏

## 当前默认值 / 上限

- 默认频率：`0.25 Hz`
- 随机频率范围：`0.1 ~ 0.35 Hz`
- 频率上限：`0.8 Hz`
- 默认点大小：`99 px`
- 默认声音：`🏸 羽毛球`

## 音效列表

WebAudio 合成音效（可在下拉中切换）：  
`响指/啪嗒`、`柔和铃声`、`贝斯`、`鼓点`、`心跳`、`呼呼声`、`羽毛球`、`木鱼`、`水滴`、`风铃`、`点击`、`雨声`

## 点颜色扩展

新增更多颜色：`青`、`紫`、`橙`、`粉`、`黄绿`（含自定义）

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

## 激活码（Cloudflare Worker）

激活码验证在 `worker/` 目录，接口为 `POST /api/activate`，请求体：

```json
{ "code": "AB123" }
```

返回：

```json
{ "ok": true }
```

前端通过 `VITE_ACTIVATION_ENDPOINT` 指定验证地址（默认 `/api/activate`）。

为避免泄露，建议把激活码放在 Cloudflare Worker 的环境变量 `CODES`（逗号或空格分隔），无需提交到仓库。`worker/codes.js` 默认为空，可选作本地调试使用。

部署步骤（简版）：
1) 打开本地 `activation-codes.txt`，复制 100 个码
2) 在 Cloudflare Worker 里设置环境变量 `CODES`（逗号或空格分隔粘贴）
3) 在 Cloudflare Pages 里设置 `VITE_ACTIVATION_ENDPOINT` 为 Worker 的 `/api/activate` 地址
4) 重新部署 Pages

## Worker 详细配置（手动）

1) Cloudflare → Workers & Pages → Create Application → Worker（命名如 `rem-restore-activation`）
2) 打开 Worker 编辑器，粘贴 `worker/index.js` 的内容并部署
3) Worker → Settings → Variables → 新增 `CODES`，粘贴 `activation-codes.txt` 的全部激活码（空格或逗号分隔）
4) 记录 Worker 地址，例如 `https://rem-restore-activation.<子域>.workers.dev`
5) Cloudflare Pages → Settings → Environment variables → 添加 `VITE_ACTIVATION_ENDPOINT` 为：
   `https://rem-restore-activation.<子域>.workers.dev/api/activate`
6) 重新部署 Pages

## 本地先看效果

可以先跳过 Worker，用临时地址占位，前端会显示“激活码无效”。正式接入后再替换：

```bash
# 可选：在本地创建 .env
VITE_ACTIVATION_ENDPOINT=http://localhost:8787/api/activate
```

若想本地跑 Worker，可用 Wrangler CLI（可选）。

---

## 🚀 Roadmap: Landing Page (v2.2)

### 概览
计划添加一个专业的营销落地页（Landing Page），采用 Freemium 商业模式。

### 用户流程
```
首次访问 → Landing Page（营销页）
   ↓ 点击"免费试用"
   → EMDR 工具（localStorage 记录已访问）
   ↓ 点击"← 返回首页"
   → Landing Page
   ↓ 下次直接访问
   → EMDR 工具（跳过 Landing）
```

### 功能设计

#### 1. Hero Section（首屏）
- 渐变背景（蓝-紫-青绿）
- 主标题：**"Professional EMDR Therapy Tool for Self-Healing"** / **"专业级 EMDR 自愈疗愈工具"**
- 副标题：科学认证的双侧刺激疗法
- CTA 按钮：**"免费试用"** → 进入工具
- 移动点动画预览
- 语言切换器（🇬🇧 EN / 🇨🇳 中文）

#### 2. Education Section（教育科普）
三栏布局：
- **什么是 EMDR？** - 眼动脱敏与再加工疗法定义
- **如何工作？** - 双侧刺激原理
- **谁能受益？** - PTSD、焦虑、创伤、压力等

#### 3. Features Section（功能特色）
6 个功能卡片（3 免费 + 3 高级）：
- ✅ 视觉刺激（免费）
- ✅ 双侧音频（免费）
- ✅ 多语言支持（免费）
- 🔒 高级自定义（高级）
- 🔒 随机化引擎（高级）
- 🔒 全部方向和音色（高级）

#### 4. Pricing Section（定价方案）
两栏对比表格：

**免费版（$0 / ¥0）**
- 基础 EMDR 疗法（横向移动）
- 2 种音频预设
- 3 种点颜色、2 种背景
- 会话计时器
- 移动和桌面支持

**高级版（$9.99 / ¥68 一次性付费）**
- 所有免费功能
- 5 种移动方向（↔↕↗↘∞）
- 12 种音频预设
- 9 种颜色 + 自定义
- Emoji 模式
- 高级控制
- 随机化引擎
- **终身访问**

**价值对比**：$9.99 对比单次治疗 $200+

#### 5. Testimonials Section（用户见证）
3 个用户评价卡片（中英文混合）：
- Sarah L.（美国）- 英文评价
- 李明（中国）- 中文评价
- James T.（英国）- 英文评价

#### 6. CTA Section（最终转化）
- 标题：**"准备好开始您的疗愈之旅了吗？"**
- CTA 按钮：**"启动 EMDR 工具"**

#### 7. Footer（页脚）
- 关于我们、联系我们
- 隐私政策、服务条款
- 语言切换器
- 免责声明

### 技术实现

#### 架构设计
```javascript
// State-based view switching
const [currentView, setCurrentView] = useState(() => {
  return localStorage.getItem('emdr_has_visited') ? 'tool' : 'landing';
});
```

#### 组件结构
```
src/components/
├── LandingPage.jsx          # 容器组件
└── landing/
    ├── Navbar.jsx           # 导航栏（sticky）
    ├── HeroSection.jsx      # 首屏
    ├── EducationSection.jsx # 科普教育
    ├── FeaturesSection.jsx  # 功能展示
    ├── PricingSection.jsx   # 定价对比
    ├── TestimonialsSection.jsx # 用户见证
    ├── CTASection.jsx       # 最终转化
    └── Footer.jsx           # 页脚
```

#### 设计系统
- **颜色方案**：
  - 主色：`#3b82f6`（蓝）、`#10b981`（绿）
  - 渐变：`bg-gradient-to-br from-blue-500 via-purple-500 to-teal-400`
  - CTA：`bg-gradient-to-r from-emerald-600 to-teal-600`

- **排版**：
  - Hero H1: `text-5xl lg:text-7xl font-bold`
  - 区块标题: `text-3xl lg:text-5xl`
  - 正文: `text-base lg:text-lg`

- **布局**：
  - 容器: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
  - 区块间距: `py-16 lg:py-24`
  - 卡片: `rounded-2xl border shadow-sm hover:shadow-md`

#### 国际化支持
所有内容完整支持中英文双语：
- `src/i18n/en.json` - 英文翻译
- `src/i18n/zh.json` - 中文翻译
- 语言切换无缝切换，Landing Page 和工具内保持一致

### 商业策略

**Freemium 模式**：
- **免费**：横向 EMDR、基础功能（足够完成疗愈）
- **高级 $9.99**：全部方向、音色、颜色、随机化
- **价值主张**：一次性付费 $9.99，终身访问，对比单次治疗 $200+
- **目标用户**：普通个人用户（自我疗愈，定价亲民）

**内容重点**：
- ✅ EMDR 疗法科普教育
- ✅ 产品功能和优势展示
- ✅ 价格和套餐说明
- ✅ 用户案例和社会证明

### 实施计划

#### Phase 1: Core Setup ✅
- [x] 更新 `App.jsx`：添加 `currentView` 状态管理
- [x] 更新 `HeaderBar.jsx`：添加"返回首页"按钮
- [x] 创建 `LandingPage.jsx` 容器组件

#### Phase 2: i18n ✅
- [x] 添加英文翻译到 `en.json`
- [x] 添加中文翻译到 `zh.json`

#### Phase 3: Build Components ✅
- [x] Navbar.jsx - 导航栏（sticky，语言切换，CTA 按钮）
- [x] HeroSection.jsx - 首屏英雄区（渐变背景，动画预览）
- [x] EducationSection.jsx - 科普教育（3 栏卡片，渐变效果）
- [x] FeaturesSection.jsx - 功能展示（6 功能卡片，免费/高级标记）
- [x] PricingSection.jsx - 定价对比（2 栏对比，信任徽章）
- [x] TestimonialsSection.jsx - 用户见证（3 用户评价，5 星评分）
- [x] CTASection.jsx - 最终转化（渐变背景，动画效果）
- [x] Footer.jsx - 页脚（链接，免责声明，语言切换）

#### Phase 4: Polish ⏳
- [x] 响应式设计（mobile-first）- 已在组件中实现
- [x] Hover 效果和过渡动画 - 已在组件中实现
- [ ] 滚动动画（fade-in）- 可选优化
- [ ] 测试所有 CTA 按钮
- [ ] 测试语言切换
- [ ] 最终测试和优化

**预计时间**：6-8 小时

### 关键文件

1. `src/App.jsx` - 视图状态管理
2. `src/components/HeaderBar.jsx` - 返回按钮
3. `src/i18n/en.json` - Landing 翻译
4. `src/i18n/zh.json` - Landing 翻译
5. `src/components/LandingPage.jsx` - Landing 容器
6. `src/components/landing/*.jsx` - 8 个子组件
