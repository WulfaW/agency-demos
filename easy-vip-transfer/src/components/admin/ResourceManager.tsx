'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Plus, Trash2, RotateCcw, Search, Camera, Car } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

type Row = {
  id: string;
  name: string;
  phone?: string | null;
  plate?: string | null;
  is_active: boolean;
  photo_url?: string | null;
  logo_url?: string | null;
};

export default function ResourceManager({
  table, title, singularLabel, secondLabel, secondField,
}: {
  table: 'drivers' | 'vehicles';
  title: string;
  singularLabel: string;
  secondLabel: string;
  secondField: 'phone' | 'plate';
}) {
  const [rows, setRows] = useState<Row[]>([]);
  const [name, setName] = useState('');
  const [second, setSecond] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [pasifleriGoster, setPasifleriGoster] = useState(false);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadTargetRef = useRef<string | null>(null);
  const supabase = createClient();

  const imgField = table === 'drivers' ? 'photo_url' : 'logo_url';

  const MOCK_DRIVERS: Row[] = [
    { id: 'mock-1', name: 'Mehmet Yılmaz', phone: '+90 532 111 22 33', plate: null, is_active: true },
    { id: 'mock-2', name: 'Ahmet Kaya', phone: '+90 533 444 55 66', plate: null, is_active: true },
  ];
  const MOCK_VEHICLES: Row[] = [
    { id: 'mock-a', name: 'Mercedes Maybach S680', plate: '48 ABC 123', phone: null, is_active: true },
    { id: 'mock-b', name: 'Mercedes Vito VIP', plate: '48 DEF 456', phone: null, is_active: true },
  ];

  const load = async () => {
    const { data, error } = await supabase.from(table).select('*').order('name');
    if (error || !data || data.length === 0) {
      setRows(table === 'drivers' ? MOCK_DRIVERS : MOCK_VEHICLES);
      return;
    }
    setRows(data ?? []);
  };

  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!name.trim()) { setError('Ad zorunlu.'); return; }
    setBusy(true); setError('');
    const { error } = await supabase.from(table).insert({ name: name.trim(), [secondField]: second.trim() || null });
    setBusy(false);
    if (error) { setError(error.message); return; }
    setName(''); setSecond(''); load();
  };

  const toggleActive = async (row: Row) => {
    const { error } = await supabase.from(table).update({ is_active: !row.is_active }).eq('id', row.id);
    if (error) { setError(error.message); return; }
    load();
  };

  // ─── Fotoğraf yükle ───────────────────────────────────────────
  const triggerUpload = (rowId: string) => {
    uploadTargetRef.current = rowId;
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const rowId = uploadTargetRef.current;
    if (!file || !rowId) return;

    // mock ID'leri için atla
    if (rowId.startsWith('mock-')) {
      setError('Bu demo verisine fotoğraf eklenemez. Gerçek kayıt ekleyip deneyin.');
      e.target.value = '';
      return;
    }

    // Dosya boyutu kontrolü (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Dosya en fazla 5 MB olabilir.');
      e.target.value = '';
      return;
    }

    setUploadingId(rowId);
    setError('');

    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const path = `${table}/${rowId}.${ext}?t=${Date.now()}`;

    // Supabase Storage'a yükle
    const { error: uploadErr } = await supabase.storage
      .from('avatars')
      .upload(path, file, { upsert: true, contentType: file.type });

    if (uploadErr) {
      setError(`Yükleme başarısız: ${uploadErr.message}`);
      setUploadingId(null);
      e.target.value = '';
      return;
    }

    const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(path);
    const publicUrl = urlData.publicUrl;

    // DB'ye kaydet
    const { error: dbErr } = await supabase
      .from(table)
      .update({ [imgField]: publicUrl })
      .eq('id', rowId);

    if (dbErr) {
      setError(`Kayıt güncellenemedi: ${dbErr.message}`);
    } else {
      load();
    }

    setUploadingId(null);
    e.target.value = '';
  };

  const removePhoto = async (row: Row) => {
    await supabase.from(table).update({ [imgField]: null }).eq('id', row.id);
    load();
  };
  // ──────────────────────────────────────────────────────────────

  const pasifSayisi = rows.filter((r) => !r.is_active).length;
  const gorunen = pasifleriGoster ? rows : rows.filter((r) => r.is_active);

  const inp = 'flex-1 bg-white/[0.03] border border-white/10 rounded-2xl px-4 py-3 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-[#E5D3B3]/40 focus:bg-white/[0.05] transition-all duration-200';

  const getImg = (r: Row) => (table === 'drivers' ? r.photo_url : r.logo_url);

  return (
    <div className="space-y-8">
      {/* Gizli file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif text-white tracking-wide">{title}</h1>
          <p className="text-[11px] text-zinc-500 uppercase tracking-[0.2em] mt-1">{rows.filter(r => r.is_active).length} Aktif Kayıt</p>
        </div>
        {pasifSayisi > 0 && (
          <label className="flex items-center gap-2 text-xs text-zinc-400 cursor-pointer select-none bg-white/[0.03] border border-white/[0.06] rounded-full px-4 py-2 hover:bg-white/[0.06] transition-colors">
            <input
              type="checkbox"
              checked={pasifleriGoster}
              onChange={(e) => setPasifleriGoster(e.target.checked)}
              className="w-3.5 h-3.5 accent-[#E5D3B3]"
            />
            Pasif göster ({pasifSayisi})
          </label>
        )}
      </div>

      {error && (
        <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-2xl px-5 py-4">{error}</p>
      )}

      {/* Add Form */}
      <div className="rounded-3xl bg-white/[0.02] border border-white/[0.06] p-6">
        <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-medium mb-4">Yeni {singularLabel} Ekle</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <input value={name} onChange={(e) => setName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && add()} placeholder="Ad Soyad" className={inp} />
          <input value={second} onChange={(e) => setSecond(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && add()} placeholder={secondLabel} className={inp} />
          <button onClick={add} disabled={busy}
            className="flex items-center gap-2 bg-[#E5D3B3] hover:bg-white text-black px-6 py-3 rounded-2xl font-bold text-xs tracking-[0.15em] uppercase transition-all disabled:opacity-50 flex-shrink-0">
            <Plus className="w-4 h-4" /> Ekle
          </button>
        </div>
      </div>

      {/* List */}
      <div className="space-y-2">
        {gorunen.map((r, i) => {
          const img = getImg(r);
          const isUploading = uploadingId === r.id;
          return (
            <div
              key={r.id}
              className="group flex justify-between items-center px-5 py-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-200"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="flex items-center gap-4">
                {/* Avatar / Logo — tıklanınca fotoğraf yükle */}
                <button
                  onClick={() => triggerUpload(r.id)}
                  title={img ? 'Fotoğrafı değiştir' : 'Fotoğraf ekle'}
                  disabled={isUploading}
                  className="relative w-11 h-11 rounded-xl shrink-0 overflow-hidden group/avatar"
                >
                  {img ? (
                    <>
                      <img src={img} alt={r.name} className="w-full h-full object-cover" />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center">
                        <Camera className="w-4 h-4 text-white" />
                      </div>
                    </>
                  ) : (
                    <div className={`w-full h-full flex items-center justify-center text-sm font-bold transition-all
                      ${r.is_active ? 'bg-[#E5D3B3]/15 text-[#E5D3B3]' : 'bg-white/5 text-zinc-600'}`}>
                      {isUploading ? (
                        <span className="w-4 h-4 border-2 border-[#E5D3B3]/30 border-t-[#E5D3B3] rounded-full animate-spin" />
                      ) : (
                        <>
                          <span className="group-hover/avatar:hidden">
                            {table === 'drivers' ? r.name.charAt(0).toUpperCase() : <Car className="w-4 h-4" />}
                          </span>
                          <Camera className="w-4 h-4 hidden group-hover/avatar:block text-white/70" />
                        </>
                      )}
                    </div>
                  )}
                </button>

                <div>
                  <p className={`text-sm font-medium ${r.is_active ? 'text-white' : 'text-zinc-600 line-through'}`}>{r.name}</p>
                  <p className="text-zinc-500 text-xs">{r[secondField] ?? '—'}</p>
                </div>
              </div>

              {/* Actions — hover'da görünür */}
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
                {img && (
                  <button
                    onClick={() => removePhoto(r)}
                    className="px-3 py-1.5 rounded-xl text-xs border border-transparent hover:border-white/10 bg-white/5 text-zinc-500 hover:text-red-400 transition-all"
                    title="Fotoğrafı kaldır"
                  >
                    Fotoğrafı Kaldır
                  </button>
                )}
                <button onClick={() => toggleActive(r)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs transition-all duration-200 border border-transparent hover:border-white/10 bg-white/5 text-zinc-400 hover:text-white">
                  {r.is_active ? <><Trash2 className="w-3 h-3" /> Pasife Al</> : <><RotateCcw className="w-3 h-3" /> Aktif Et</>}
                </button>
              </div>
            </div>
          );
        })}
        {gorunen.length === 0 && (
          <div className="text-center py-16 text-zinc-600">
            <Search className="w-8 h-8 mx-auto mb-3 opacity-30" />
            <p className="text-sm">{rows.length === 0 ? 'Henüz kayıt yok.' : 'Aktif kayıt yok.'}</p>
          </div>
        )}
      </div>
    </div>
  );
}
