import React, { useState } from 'react';
import { accountApi } from '../../hooks/useAccount';

export default function AccountSettings({ user, onBack, onLogout }) {
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const submit = async event => {
    event.preventDefault(); const form = event.currentTarget;
    const values = new FormData(form); setMessage('');
    if (values.get('pw') !== values.get('confirm')) { setMessage('两次输入的密码不一致'); return; }
    setBusy(true);
    try { await accountApi('passwd', { old: values.get('old'), pw: values.get('pw') }); form.reset(); setMessage('密码已修改，其他设备需要重新登录。'); }
    catch (err) { setMessage(err.message); }
    finally { setBusy(false); }
  };
  return <main className="min-h-screen bg-stone-50 p-5"><div className="max-w-lg mx-auto py-8">
    <button className="text-brand-700" onClick={onBack}>← 返回练习</button>
    <h1 className="text-2xl font-semibold mt-7">账号设置</h1><p className="text-stone-500 mt-2">{user.nick || user.u} · 两站共用账号</p>
    <form onSubmit={submit} className="bg-white border border-stone-200 rounded-2xl p-6 mt-6 space-y-4">
      <h2 className="font-semibold">修改密码</h2>
      <input className="account-input" type="text" autoComplete="username" value={user.u} readOnly aria-label="用户名" />
      <label className="block text-sm">当前密码<input className="account-input" name="old" type="password" required autoComplete="current-password" maxLength={50} /></label>
      <label className="block text-sm">新密码<input className="account-input" name="pw" type="password" required minLength={8} maxLength={50} autoComplete="new-password" /></label>
      <label className="block text-sm">确认新密码<input className="account-input" name="confirm" type="password" required minLength={8} maxLength={50} autoComplete="new-password" /></label>
      <p className="text-xs text-stone-500">新密码为 8–50 位。修改后，heal 和 relax 均使用新密码。</p>
      {message && <p role="status" className="text-sm">{message}</p>}
      <button className="account-primary" disabled={busy}>{busy ? '正在修改…' : '保存新密码'}</button>
    </form>
    <button className="mt-6 text-stone-600 underline" onClick={onLogout}>退出登录</button>
  </div></main>;
}
