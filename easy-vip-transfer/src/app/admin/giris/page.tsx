'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
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
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-2xl bg-[#E5D3B3]/10 border border-[#E5D3B3]/20 flex items-center justify-center mx-auto mb-6">
            <Lock className="w-6 h-6 text-[#E5D3B3]" />
          </div>
          <h1 className="text-3xl font-serif text-white tracking-wide mb-1">Yönetim Paneli</h1>
          <p className="text-[10px] text-zinc-600 tracking-[0.25em] uppercase">Easy VIP Transfer · Operasyon</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-medium mb-2">E-posta</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ornek@easyvip.com"
              required
              autoFocus
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-zinc-700 focus:outline-none focus:border-[#E5D3B3]/40 transition-all"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-medium mb-2">Şifre</label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 pr-12 text-white placeholder:text-zinc-700 focus:outline-none focus:border-[#E5D3B3]/40 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-300 transition-colors"
              >
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="text-red-400 text-xs text-center bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={busy}
            className="w-full bg-[#E5D3B3] hover:bg-white text-black font-bold text-xs tracking-[0.2em] uppercase px-8 py-4 rounded-2xl transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
          >
            {busy ? (
              <><span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" /> Kontrol ediliyor...</>
            ) : (
              <><Lock className="w-3.5 h-3.5" /> Giriş Yap</>
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
