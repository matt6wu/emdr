import React from "react";

export default function HeaderBar({ hideControls, setHideControls, fullscreen, toggleFullscreen }) {
  return (
    <div className="w-full px-4 py-3 flex items-center justify-between border-b bg-white">
      <div className="flex items-center gap-3">
        <div className="font-semibold text-lg">REM Restore Studio™</div>
        <div className="text-xs text-slate-500 hidden md:block">
          快捷键：B 开始/停止｜空格 暂停｜↑↓ 调频率｜H 隐藏面板｜F 全屏
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          className="px-3 py-2 rounded-xl border hover:bg-slate-50"
          onClick={() => setHideControls((v) => !v)}
          title="隐藏/显示控制面板 (H)"
        >
          {hideControls ? "显示面板" : "隐藏面板"}
        </button>
        <button
          className="px-3 py-2 rounded-xl border hover:bg-slate-50"
          onClick={toggleFullscreen}
          title="全屏 (F)"
        >
          {fullscreen ? "退出全屏" : "全屏"}
        </button>
      </div>
    </div>
  );
}
