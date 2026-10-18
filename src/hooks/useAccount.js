import { useCallback, useEffect, useRef, useState } from 'react';

const base = import.meta.env.DEV ? '' : 'https://heal.mattlu.com';
export async function accountApi(path, body) {
  const response = await fetch(`${base}/garden/${path}`, {
    credentials: 'include',
    ...(body !== undefined ? { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) } : {})
  });
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(response.status === 401 ? '登录已失效，请重新登录' : data.error || '请求失败，请重试');
    error.status = response.status;
    throw error;
  }
  return data;
}

export function useAccount() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saveState, setSaveState] = useState('');
  const pending = useRef([]);
  const sending = useRef(false);
  const owner = useRef(null);
  const check = useCallback(async () => {
    setLoading(true); setError('');
    try { setUser(await accountApi('me')); }
    catch (err) { setUser(null); if (err.status !== 401) setError('暂时无法连接账号服务，请重试'); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { check(); }, [check]);
  const persist = () => {
    if (owner.current) {
      try { sessionStorage.setItem(`relax-pending:${owner.current}`, JSON.stringify(pending.current)); } catch { /* in-memory retry still works */ }
    }
  };
  const flush = useCallback(async () => {
    if (sending.current || !owner.current || !pending.current.length) return;
    sending.current = true; setSaveState('saving');
    const currentOwner = owner.current;
    try {
      while (owner.current === currentOwner && pending.current.length) {
        const record = pending.current[0];
        await accountApi('relax-records', record);
        if (owner.current !== currentOwner) return;
        pending.current.shift(); persist();
      }
      setSaveState('saved');
    } catch (err) {
      setSaveState(err.status === 401 ? 'expired' : 'error');
    } finally { sending.current = false; }
  }, []);
  useEffect(() => {
    owner.current = user?.u || null;
    pending.current = [];
    setSaveState('');
    if (!user) return;
    try { pending.current = JSON.parse(sessionStorage.getItem(`relax-pending:${user.u}`) || '[]'); } catch { pending.current = []; }
    flush();
  }, [user?.u, flush]);
  useEffect(() => {
    window.addEventListener('online', flush);
    return () => window.removeEventListener('online', flush);
  }, [flush]);
  const save = (record) => {
    if (!owner.current || record.durationMs < 1000) return;
    pending.current.push(record); persist(); flush();
  };
  const signIn = async (register, values) => {
    await accountApi(register ? 'relax-register' : 'login', values);
    setUser(await accountApi('me')); setError('');
  };
  const logout = async () => {
    await accountApi('logout', {}); setUser(null);
  };
  return { user, loading, error, check, signIn, logout, save, saveState, retrySave: flush };
}
