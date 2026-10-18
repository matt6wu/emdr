import React, { useEffect, useMemo, useState } from 'react';
import { accountApi } from '../../hooks/useAccount';

const dayFormat = new Intl.DateTimeFormat('en-CA', { timeZone: 'Australia/Sydney', year: 'numeric', month: '2-digit', day: '2-digit' });
const timeFormat = new Intl.DateTimeFormat('zh-CN', { timeZone: 'Australia/Sydney', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false });
const dayKey = ts => dayFormat.format(new Date(ts));
const sceneName = scene => ({ classic: '标准 EMDR', sleep: '睡前放松', free: '自由练习' }[scene] || scene);
const duration = ms => `${Math.floor(ms / 60000)} 分 ${Math.floor(ms / 1000) % 60} 秒`;
const monthKey = key => key.slice(0, 7);
const shiftDay = (key, offset) => { const date = new Date(`${key}T12:00:00Z`); date.setUTCDate(date.getUTCDate() + offset); return date.toISOString().slice(0, 10); };

export default function PracticeRecords({ onBack, onAccount, user, saveState, onRetry }) {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cursor, setCursor] = useState(null);
  const [days, setDays] = useState(7);
  const today = dayKey(Date.now());
  const [month, setMonth] = useState(monthKey(today));
  const [selected, setSelected] = useState(null);
  const load = async (next = null) => {
    setLoading(true); setError('');
    try {
      const result = await accountApi(`relax-records${next ? `?cursor=${encodeURIComponent(next)}` : ''}`);
      setRecords(previous => {
        const merged = new Map((next ? previous : []).map(r => [r.id, r]));
        result.records.forEach(r => merged.set(r.id, r));
        return [...merged.values()].sort((a, b) => b.startedAt - a.startedAt);
      });
      setCursor(result.cursor);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, [user.u, saveState]);
  const daily = useMemo(() => {
    const map = {};
    records.forEach(record => { const key = dayKey(record.startedAt); map[key] = (map[key] || 0) + record.durationMs; });
    return map;
  }, [records]);
  const trend = Array.from({ length: days }, (_, index) => {
    const key = shiftDay(today, index - days + 1); return { key, ms: daily[key] || 0 };
  });
  const peak = Math.max(60000, ...trend.map(item => item.ms));
  const [year, monthNumber] = month.split('-').map(Number);
  const firstWeekday = (new Date(Date.UTC(year, monthNumber - 1, 1)).getUTCDay() + 6) % 7;
  const monthDays = new Date(Date.UTC(year, monthNumber, 0)).getUTCDate();
  const moveMonth = delta => { const date = new Date(Date.UTC(year, monthNumber - 1 + delta, 1)); setMonth(date.toISOString().slice(0, 7)); setSelected(null); };
  const visible = records.filter(record => monthKey(dayKey(record.startedAt)) === month && (!selected || dayKey(record.startedAt) === selected));
  const total = records.reduce((sum, record) => sum + record.durationMs, 0);
  return <main className="min-h-screen bg-stone-50 text-stone-900 px-4 py-7 sm:px-8">
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-3"><button onClick={onBack} className="text-brand-700">← 返回练习</button><button onClick={onAccount} className="text-sm text-stone-600">{user.nick || user.u} · 账号设置</button></div>
      <h1 className="mt-8 text-3xl font-semibold tracking-tight">我的练习记录</h1>
      <p className="mt-2 text-stone-500 text-sm">每次练习，都给自己留一点空间。日期按悉尼时间显示。</p>
      {['error', 'expired', 'saving'].includes(saveState) && <div role="status" className="mt-5 p-4 rounded-xl bg-amber-50 text-amber-900 text-sm">{saveState === 'saving' ? '正在保存本次练习…' : saveState === 'expired' ? '本次记录尚未保存，请到账号设置退出后重新登录。' : '本次练习尚未保存。网络恢复后将自动重试。'}{saveState === 'error' && <button onClick={onRetry} className="ml-3 underline">立即重试</button>}</div>}
      <div className="grid grid-cols-3 gap-3 mt-7">
        {[[records.length, '练习次数'], [Number((total / 60000).toFixed(1)), '累计分钟'], [Object.keys(daily).length, '练习天数']].map(([value, label]) => <div key={label} className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-6"><div className="text-2xl sm:text-3xl font-semibold text-brand-800 tabular-nums">{value}</div><p className="text-xs sm:text-sm text-stone-500 mt-2">{label}</p></div>)}
      </div>
      {cursor && <p className="text-sm text-stone-500 mt-3">当前统计基于已加载记录；加载更多后自动更新。</p>}
      {error && <div role="alert" className="mt-5 text-red-700">{error}<button onClick={() => load(cursor)} className="ml-3 underline">重试</button></div>}
      <div className="grid lg:grid-cols-2 gap-5 mt-6">
        <section className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3"><h2 className="font-semibold">练习时长趋势</h2><div className="flex gap-2">{[7, 30].map(n => <button key={n} onClick={() => setDays(n)} aria-pressed={days === n} className={`text-xs px-3 py-2 rounded-full ${days === n ? 'bg-brand-700 text-white' : 'bg-stone-100 text-stone-600'}`}>{n} 天</button>)}</div></div>
          <p className="mt-2 text-xs text-stone-500">最近 {days} 天共 {duration(trend.reduce((sum, item) => sum + item.ms, 0))}</p>
          <div className="mt-6 h-44 flex items-end gap-1" role="group" aria-label={`最近 ${days} 天练习时长，点击柱形查看当天记录`}>
            {trend.map(item => <button key={item.key} title={`${item.key}：${duration(item.ms)}`} aria-label={`${item.key}，${duration(item.ms)}`} onClick={() => { setMonth(monthKey(item.key)); setSelected(item.key); }} className="flex-1 h-full flex flex-col justify-end group min-w-0">
              <div className={`rounded-t-md w-full transition-colors ${selected === item.key ? 'bg-brand-900' : item.ms ? 'bg-brand-500 group-hover:bg-brand-700' : 'bg-stone-100'}`} style={{ height: `${Math.max(item.ms ? 3 : 1, item.ms / peak * 100)}%` }} />
            </button>)}
          </div>
          <div className="flex justify-between text-xs text-stone-400 mt-3"><span>{trend[0].key.slice(5)}</span><span>今天</span></div>
          <p className="text-xs text-stone-500 mt-4">点击柱形查看当天明细；停留可查看时长。</p>
        </section>
        <section className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6">
          <div className="flex items-center justify-between"><button className="p-2" aria-label="上个月" onClick={() => moveMonth(-1)}>←</button><h2 className="font-semibold">{year} 年 {monthNumber} 月</h2><button className="p-2" aria-label="下个月" onClick={() => moveMonth(1)}>→</button></div>
          <div className="grid grid-cols-7 gap-1 mt-3 text-center">
            {'一二三四五六日'.split('').map(d => <div key={d} className="text-xs text-stone-400 pb-2">{d}</div>)}
            {Array.from({ length: firstWeekday }, (_, i) => <div key={`blank-${i}`} />)}
            {Array.from({ length: monthDays }, (_, i) => {
              const key = `${month}-${String(i + 1).padStart(2, '0')}`;
              return <button key={key} title={`${key}：${duration(daily[key] || 0)}`} aria-label={`${key}，${duration(daily[key] || 0)}`} aria-pressed={selected === key} onClick={() => setSelected(selected === key ? null : key)} className={`py-2 rounded-lg text-sm relative ${selected === key ? 'bg-brand-800 text-white' : daily[key] ? 'bg-brand-50 text-brand-900' : 'text-stone-500 hover:bg-stone-50'} ${key === today ? 'ring-1 ring-brand-400' : ''}`}>
                {i + 1}{daily[key] && <span className={`block mx-auto h-1 w-1 rounded-full mt-0.5 ${selected === key ? 'bg-white' : 'bg-brand-600'}`} />}
              </button>;
            })}
          </div>
        </section>
      </div>
      <section className="mt-6 bg-white rounded-2xl border border-stone-200 p-5 sm:p-6">
        <div className="flex justify-between items-center gap-3"><h2 className="font-semibold">{selected || month} 的练习</h2>{selected && <button className="text-brand-700 text-sm" onClick={() => setSelected(null)}>查看整月</button>}</div>
        {!loading && !visible.length && <p className="text-stone-500 text-sm py-10 text-center">这段时间还没有练习记录，按自己的节奏来就好。</p>}
        <ul className="divide-y divide-stone-100 mt-3">{visible.map(record => <li key={record.id} className="py-4 flex flex-wrap items-center justify-between gap-3">
          <div><p className="font-medium">{sceneName(record.scene)} <span className="text-xs font-normal text-stone-500 ml-2">{record.scene === 'free' ? '自由练习结束' : record.completed ? '已完成' : '提前结束'}</span></p><p className="text-xs text-stone-500 mt-1">{timeFormat.format(new Date(record.startedAt))}</p></div>
          <div className="text-right"><p className="text-brand-800 font-medium tabular-nums">{duration(record.durationMs)}</p><p className="text-xs text-stone-500 mt-1">{record.sets} 组 · {record.cycles} 轮</p></div>
        </li>)}</ul>
        {loading && <p role="status" className="text-center text-stone-500 py-6">正在加载记录…</p>}
        {cursor && <button className="text-brand-700 py-3" disabled={loading} onClick={() => load(cursor)}>加载更早的记录</button>}
      </section>
    </div>
  </main>;
}
