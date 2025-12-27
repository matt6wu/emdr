import React from "react";

export default function Stage({
  stageRef,
  dotRef,
  bgColor,
  running,
  paused,
  freqHz,
  visualEnabled,
  dotSize,
  dotEmojiMode,
  dotEmoji,
  dotColor,
  hideControls,
  start,
  stop,
  togglePaused,
  mmss,
  randomizeEnabled,
  setRandomizeEnabled,
  isActivated
}) {
  return (
    <div className="flex-1 relative h-full overflow-hidden">
      <div ref={stageRef} className="absolute inset-0" style={{ background: bgColor }} />

      <div className="absolute right-4 bottom-4 flex flex-col gap-2 items-end pointer-events-none">
        <div className="pointer-events-auto rounded-2xl bg-white/80 backdrop-blur border px-3 py-2 text-sm text-slate-800 shadow">
          <div className="font-medium">状态</div>
          <div className="text-xs text-slate-600">
            {running ? (paused ? "已暂停" : "运行中") : "未开始"} · {freqHz.toFixed(2)} Hz
          </div>
        </div>
      </div>

      {visualEnabled && (
        <div
          ref={dotRef}
          className="absolute"
          style={{
            left: 0,
            top: 0,
            transform: "translate3d(0, 0, 0) translate(-50%, -50%)",
            willChange: "transform",
            width: dotSize,
            height: dotSize,
            borderRadius: dotEmojiMode ? 0 : 9999,
            background: dotEmojiMode ? "transparent" : dotColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: Math.max(14, Math.floor(dotSize * 0.6)),
            userSelect: "none",
            pointerEvents: "none",
            textShadow: dotEmojiMode ? "0 2px 10px rgba(0,0,0,0.15)" : "none"
          }}
        >
          {dotEmojiMode ? <span>{dotEmoji}</span> : null}
        </div>
      )}

      {hideControls && (
        <div className="absolute inset-x-0 top-4 flex justify-center px-2">
          <div className="pointer-events-auto rounded-2xl bg-white/90 backdrop-blur border shadow px-3 py-2 flex flex-wrap items-center justify-center gap-2">
            {!running ? (
              <button className="px-4 py-2 rounded-xl bg-emerald-600 text-white min-h-[44px] touch-manipulation" onClick={start}>
                开始
              </button>
            ) : (
              <>
                <button className="px-3 py-2 rounded-xl border bg-white min-h-[44px] touch-manipulation" onClick={togglePaused}>
                  {paused ? "继续" : "暂停"}
                </button>
                <button className="px-3 py-2 rounded-xl bg-slate-900 text-white min-h-[44px] touch-manipulation" onClick={stop}>
                  停止
                </button>
              </>
            )}
            <button
              className={`px-3 py-2 rounded-xl border bg-white min-h-[44px] touch-manipulation ${!isActivated ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={() => setRandomizeEnabled((v) => !v)}
              disabled={!isActivated}
            >
              {!isActivated ? "随机:锁" : randomizeEnabled ? "随机:开" : "随机:关"}
            </button>
            <div className="text-sm text-slate-700 tabular-nums px-2">{mmss}</div>
          </div>
        </div>
      )}
    </div>
  );
}
