'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError('E-posta veya şifre hatalı.');
      setBusy(false);
      return;
    }

    router.push('/admin');
    router.refresh();
  };

  return (
    <main className="min-h-screen bg-[#030303] flex items-center justify-center p-4 text-zinc-100">
      <div className="w-full max-w-md backdrop-blur-3xl bg-white/[0.02] border border-white/[0.05] rounded-[2.5rem] p-10">
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#E5D3B3]/20 to-transparent border border-[#E5D3B3]/20 flex items-center justify-center mx-auto mb-6">
            <Lock className="w-6 h-6 text-[#E5D3B3]" />
          </div>
          <h1 className="text-3xl font-serif text-white tracking-wide mb-2">Yönetim Paneli</h1>
          <p className="text-[10px] text-zinc-500 tracking-[0.25em] uppercase">Yetkisiz Erişim Yasaktır</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-posta"
            required
            autoFocus
            className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#E5D3B3]/50"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Şifre"
            required
            className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#E5D3B3]/50"
          />

          {error && <p className="text-red-400 text-xs text-center">{error}</p>}

          <button
            type="submit"
            disabled={busy}
            className="w-full bg-[#E5D3B3] hover:bg-white text-black font-bold text-xs tracking-[0.2em] uppercase px-8 py-4 rounded-2xl transition-all disabled:opacity-50"
          >
            {busy ? 'Kontrol ediliyor...' : 'Giriş Yap'}
          </button>
        </form>
      </div>
    </main>
  );
}
