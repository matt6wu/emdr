# 🎵 环境音下载指南 / Ambient Audio Download Guide

## 快速下载（推荐）/ Quick Download (Recommended)

### 选项 1: Mixkit (最简单) ⭐

**网址**: https://mixkit.co/free-sound-effects/

**优点**:
- ✅ 完全免费，无需注册
- ✅ 商业使用免费
- ✅ 高质量 MP3
- ✅ 一键下载

**下载步骤**:
1. 访问对应页面
2. 点击 "Download Free SFX" 按钮
3. 重命名文件并放入 `public/audio/`

#### 具体文件下载链接：

1. **rain.mp3** - 雨声
   - 访问: https://mixkit.co/free-sound-effects/rain/
   - 推荐: "Rain long loop" 或 "Light rain loop"

2. **ocean.mp3** - 海浪
   - 访问: https://mixkit.co/free-sound-effects/ocean/
   - 推荐: "Ocean waves loop"

3. **forest.mp3** - 森林
   - 访问: https://mixkit.co/free-sound-effects/nature/
   - 推荐: "Forest birds" 或 "Nature ambience"

4. **fireplace.mp3** - 壁炉
   - 访问: https://mixkit.co/free-sound-effects/fire/
   - 推荐: "Fireplace crackling"

5. **cafe.mp3** - 咖啡厅
   - 访问: https://mixkit.co/free-sound-effects/restaurant/
   - 或搜索: "coffee shop ambience"

6. **whitenoise.mp3** - 白噪音
   - 访问: https://mixkit.co/free-sound-effects/white-noise/
   - 推荐: "White noise loop"

7. **night.mp3** - 夜晚
   - 访问: https://mixkit.co/free-sound-effects/night/
   - 推荐: "Night crickets" 或 "Night ambience"

8. **wind.mp3** - 风声
   - 访问: https://mixkit.co/free-sound-effects/wind/
   - 推荐: "Wind blowing"

9. **stream.mp3** - 溪流
   - 访问: https://mixkit.co/free-sound-effects/water/
   - 推荐: "Stream water flowing"

10. **thunder.mp3** - 雷雨
    - 访问: https://mixkit.co/free-sound-effects/thunder/
    - 推荐: "Rain and thunder storm"

---

### 选项 2: Pixabay Sound Effects

**网址**: https://pixabay.com/sound-effects/

**优点**:
- ✅ CC0 公共领域
- ✅ 完全免费
- ✅ 商业使用免费
- ✅ 无需署名

**下载步骤**:
1. 访问: https://pixabay.com/sound-effects/
2. 搜索关键词（如 "rain", "ocean", "forest"）
3. 点击音频 → 点击 "Free Download" 按钮
4. 下载 MP3 格式
5. 重命名并放入 `public/audio/`

---

### 选项 3: Orange Free Sounds

**网址**: https://orangefreesounds.com/

**优点**:
- ✅ 100% 免费
- ✅ MP3 格式
- ✅ 直接下载

**推荐文件**:
- Rain: https://orangefreesounds.com/rain-sounds/
- Ocean: https://orangefreesounds.com/ocean-sounds/
- Forest: https://orangefreesounds.com/rainforest-sounds/

---

## 📝 下载后的步骤

1. **重命名文件**
   ```
   下载的文件 → 重命名为 → 放入位置
   例如:
   mixkit-rain-loop-1234.mp3 → rain.mp3 → public/audio/rain.mp3
   ```

2. **检查文件列表**
   确保 `public/audio/` 文件夹包含：
   ```
   ✓ rain.mp3
   ✓ ocean.mp3
   ✓ forest.mp3
   ✓ fireplace.mp3
   ✓ cafe.mp3
   ✓ whitenoise.mp3
   ✓ night.mp3
   ✓ wind.mp3
   ✓ stream.mp3
   ✓ thunder.mp3
   ```

3. **重启开发服务器**
   ```bash
   # 按 Ctrl+C 停止当前服务器
   # 然后重新运行:
   npm run dev
   ```

4. **测试环境音**
   - 进入工具页面
   - 找到 "🎵 环境音" 部分
   - 启用并选择音效
   - 调节音量

---

## 📏 文件规格建议

- **格式**: MP3
- **比特率**: 128-192 kbps（平衡质量和文件大小）
- **时长**: 1-3 分钟（应用会自动循环）
- **文件大小**: 建议每个 < 5MB
- **采样率**: 44.1kHz 或 48kHz

---

## ⚖️ 版权说明

所有推荐的资源都是：
- ✅ Royalty-Free（免版税）
- ✅ Free for Commercial Use（商业使用免费）
- ✅ No Attribution Required（无需署名）

---

## 🆘 遇到问题？

### 问题 1: 下载的文件无法播放
**解决**: 确保文件是 MP3 格式，如果是 WAV 或其他格式，请使用在线转换工具转为 MP3

### 问题 2: 文件太大
**解决**: 使用在线压缩工具降低比特率至 128kbps

### 问题 3: 找不到某个特定音效
**解决**: 可以搜索类似的替代音效，或留空该文件（应用会跳过）

---

## 📚 相关资源

- Mixkit: https://mixkit.co/free-sound-effects/
- Pixabay: https://pixabay.com/sound-effects/
- Orange Free Sounds: https://orangefreesounds.com/
- Freesound: https://freesound.org/
- Zapsplat: https://www.zapsplat.com/
