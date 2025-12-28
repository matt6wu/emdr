#!/bin/bash

# 环境音下载脚本 / Ambient Audio Download Script
# 使用免费的 CC0 音频资源 / Using free CC0 audio resources

AUDIO_DIR="public/audio"

echo "📥 开始下载环境音文件..."
echo "📥 Starting ambient audio download..."
echo ""

# 创建目录
mkdir -p "$AUDIO_DIR"

# 这里使用 freesound.org 的直接下载链接（需要替换为实际链接）
# 或者从其他 CC0 来源下载

echo "⚠️  由于版权限制，需要手动下载音频文件"
echo "⚠️  Due to licensing, manual download is required"
echo ""
echo "请访问以下网站下载音频："
echo "Please visit these websites to download audio:"
echo ""
echo "1. Pixabay Sound Effects: https://pixabay.com/sound-effects/"
echo "   搜索 / Search: rain, ocean, forest, fireplace, cafe, etc."
echo ""
echo "2. Freesound: https://freesound.org/"
echo "   Filter: CC0 license"
echo ""
echo "3. YouTube Audio Library: https://studio.youtube.com/channel/UC.../music"
echo ""
echo "下载后，重命名并放入 $AUDIO_DIR/ 目录"
echo "After download, rename and place in $AUDIO_DIR/ directory"
echo ""
echo "需要的文件 / Required files:"
echo "  - rain.mp3"
echo "  - ocean.mp3"
echo "  - forest.mp3"
echo "  - fireplace.mp3"
echo "  - cafe.mp3"
echo "  - whitenoise.mp3"
echo "  - night.mp3"
echo "  - wind.mp3"
echo "  - stream.mp3"
echo "  - thunder.mp3"
