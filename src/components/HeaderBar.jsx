import React from "react";

export default function HeaderBar({ hideControls, setHideControls, fullscreen, toggleFullscreen }) {
  return (
    <div className="w-full px-3 lg:px-4 py-2 lg:py-3 flex items-center justify-between border-b bg-white">
      <div className="flex items-center gap-2 lg:gap-3">
        <div className="font-semibold text-base lg:text-lg">REM Restore Studio™</div>
        <div className="text-xs text-slate-500 hidden md:block">
          快捷键：B 开始/停止｜空格 暂停｜↑↓ 调频率｜H 隐藏面板｜F 全屏
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          className="px-3 py-2 rounded-xl border hover:bg-slate-50 text-sm min-h-[44px] touch-manipulation"
          onClick={() => setHideControls((v) => !v)}
          title="隐藏/显示控制面板 (H)"
        >
          <span className="hidden sm:inline">{hideControls ? "显示面板" : "隐藏面板"}</span>
          <span className="sm:hidden">{hideControls ? "面板" : "隐藏"}</span>
        </button>
        <button
          className="px-3 py-2 rounded-xl border hover:bg-slate-50 text-sm min-h-[44px] touch-manipulation hidden sm:block"
          onClick={toggleFullscreen}
          title="全屏 (F)"
        >
          {fullscreen ? "退出全屏" : "全屏"}
        </button>
      </div>
    </div>
  );
}
