import React, { useState } from 'react';

export default function AccountGate({ account, onHome }) {
  const [register, setRegister] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const submit = async event => {
    event.preventDefault(); setBusy(true); setError('');
    const form = new FormData(event.currentTarget);
    if (register && form.get('pw') !== form.get('confirm')) {
      setError('两次输入的密码不一致'); setBusy(false); return;
    }
    try { await account.signIn(register, { u: form.get('u').trim(), pw: form.get('pw') }); }
    catch (err) { setError(err.message); }
    finally { setBusy(false); }
  };
  return <main className="min-h-screen bg-stone-50 flex items-center justify-center p-5">
    <div className="w-full max-w-md bg-white rounded-3xl border border-stone-200 p-7 shadow-sm">
      <p className="text-brand-700 text-sm font-medium mb-3">REM Restore Studio · 心理花园账号</p>
      <h1 className="text-2xl font-semibold">{register ? '创建你的账号' : '登录后开始练习'}</h1>
      <p className="text-stone-500 text-sm mt-3 leading-relaxed">与心理花园共用账号，练习记录随账号保存。已有花园账号可直接登录。</p>
      {account.loading ? <p role="status" className="mt-6">正在检查登录状态…</p> : account.error ?
        <div className="mt-6"><p role="alert">{account.error}</p><button className="account-primary mt-4" onClick={account.check}>重新连接</button></div> :
        <form onSubmit={submit} className="mt-6 space-y-4">
          <label className="block text-sm">用户名<input className="account-input" name="u" required maxLength={20} autoComplete="username" placeholder="输入花园用户名" /></label>
          <label className="block text-sm">密码<input className="account-input" name="pw" type="password" required minLength={register ? 8 : 1} maxLength={50} autoComplete={register ? 'new-password' : 'current-password'} placeholder={register ? '8–50 位密码' : '输入密码'} /></label>
          {register && <label className="block text-sm">确认密码<input className="account-input" name="confirm" type="password" required minLength={8} maxLength={50} autoComplete="new-password" /></label>}
          {error && <p role="alert" className="text-red-700 text-sm">{error}</p>}
          <button className="account-primary w-full" disabled={busy}>{busy ? '请稍候…' : register ? '注册并开始练习' : '登录'}</button>
          <button type="button" className="w-full text-brand-700 text-sm py-2" disabled={busy} onClick={() => { setRegister(!register); setError(''); }}>{register ? '已有账号？去登录' : '没有账号？创建账号'}</button>
          <p className="text-xs text-stone-500 text-center">忘记密码？请联系管理员重置密码。</p>
        </form>}
      <button onClick={onHome} className="mt-6 text-sm text-stone-500">返回网站首页</button>
    </div>
  </main>;
}
