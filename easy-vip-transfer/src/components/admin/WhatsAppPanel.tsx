'use client';

import React, { useState } from 'react';
import { MessageCircle, Send, CheckCheck, User, Car, Clock, MapPin, Phone } from 'lucide-react';

type Assignment = {
  id: string;
  customer: string;
  phone: string;
  route: string;
  driver: string;
  plate: string;
  time: string;
  lastMessage?: string;
};

const MOCK_ASSIGNMENTS: Assignment[] = [
  { id: '1', customer: 'John Doe', phone: '905551234567', route: 'BJV Havalimanı ➔ Mandarin', driver: 'Ahmet Yılmaz', plate: '48 VIP 01', time: '14:30' },
  { id: '2', customer: 'Elena Smith', phone: '447700900077', route: 'Yalıkavak Marina ➔ Havalimanı', driver: 'Mehmet Demir', plate: '34 XYZ 99', time: '16:00', lastMessage: 'Şoför yola çıktı' },
];

export default function WhatsAppPanel() {
  const [selectedTask, setSelectedTask] = useState<Assignment | null>(MOCK_ASSIGNMENTS[0]);
  const [logs, setLogs] = useState<{task: string, msg: string, time: string}[]>([
    { task: '2', msg: 'Şoför yola çıktı bildirimi gönderildi.', time: '12:45' }
  ]);

  const sendWhatsApp = (templateId: string, task: Assignment) => {
    let msg = '';
    let logMsg = '';
    
    if (templateId === 'onay') {
      msg = `Merhaba Sayın ${task.customer}, VIP Transfer rezervasyonunuz onaylanmıştır.%0A%0A📅 Saat: ${task.time}%0A📍 Rota: ${task.route}%0A%0Aİyi yolculuklar dileriz. - Easy VIP Bodrum`;
      logMsg = 'Rezervasyon Onayı gönderildi.';
    } else if (templateId === 'sofor') {
      msg = `Transfer saatiniz yaklaşıyor.%0A%0A🚘 Aracınız: ${task.plate}%0A👤 Şoförünüz: ${task.driver}%0A%0AŞoförümüz sizi tam saatinde karşılama noktasında bekliyor olacaktır.`;
      logMsg = 'Şoför bilgileri iletildi.';
    } else if (templateId === 'konum') {
      msg = `Şoförünüz şu an belirtilen konuma ulaşmıştır ve sizi beklemektedir.`;
      logMsg = 'Geliş bildirimi gönderildi.';
    }

    // Gerçek API entegre edilene kadar Web WhatsApp'a yönlendir
    window.open(`https://wa.me/${task.phone}?text=${msg}`, '_blank');
    
    // Log ekle
    setLogs(prev => [{ task: task.id, msg: logMsg, time: new Date().toLocaleTimeString('tr-TR', {hour: '2-digit', minute:'2-digit'}) }, ...prev]);
  };

  return (
    <div className="flex h-[calc(100vh-12rem)] gap-6">
      
      {/* Left: Active Tasks */}
      <div className="w-1/3 flex flex-col gap-4">
        <h2 className="text-xl font-serif text-white mb-2 flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-green-400" /> Aktif Transferler
        </h2>
        <div className="flex-1 overflow-y-auto space-y-3 pr-2">
          {MOCK_ASSIGNMENTS.map(task => (
            <button
              key={task.id}
              onClick={() => setSelectedTask(task)}
              className={`w-full text-left p-4 rounded-2xl border transition-all ${selectedTask?.id === task.id ? 'bg-green-500/10 border-green-500/30' : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04]'}`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium text-white">{task.customer}</span>
                <span className="text-xs text-zinc-500">{task.time}</span>
              </div>
              <p className="text-xs text-zinc-400 flex items-center gap-1"><MapPin className="w-3 h-3" /> {task.route}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Right: WhatsApp Desk */}
      <div className="flex-1 bg-white/[0.02] border border-white/5 rounded-3xl p-6 flex flex-col">
        {selectedTask ? (
          <>
            <div className="border-b border-white/10 pb-6 mb-6">
              <h3 className="text-2xl font-serif text-white mb-4">{selectedTask.customer} - Operasyon Masası</h3>
              <div className="flex gap-6 text-sm text-zinc-400">
                <span className="flex items-center gap-2"><Phone className="w-4 h-4 text-[#E5D3B3]" /> +{selectedTask.phone}</span>
                <span className="flex items-center gap-2"><Car className="w-4 h-4 text-[#E5D3B3]" /> {selectedTask.driver} ({selectedTask.plate})</span>
              </div>
            </div>

            <h4 className="text-sm font-sans tracking-widest text-zinc-500 uppercase mb-4">Otomatik Şablonlar</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <button onClick={() => sendWhatsApp('onay', selectedTask)} className="p-4 rounded-xl bg-white/[0.03] hover:bg-green-500/10 border border-white/5 hover:border-green-500/30 transition-all text-left group">
                <div className="text-white font-medium mb-1 group-hover:text-green-400 transition-colors">1. Onay Mesajı</div>
                <div className="text-xs text-zinc-500">Saat ve rota teyidi.</div>
              </button>
              <button onClick={() => sendWhatsApp('sofor', selectedTask)} className="p-4 rounded-xl bg-white/[0.03] hover:bg-green-500/10 border border-white/5 hover:border-green-500/30 transition-all text-left group">
                <div className="text-white font-medium mb-1 group-hover:text-green-400 transition-colors">2. Şoför Bilgisi</div>
                <div className="text-xs text-zinc-500">Plaka ve şoför adı.</div>
              </button>
              <button onClick={() => sendWhatsApp('konum', selectedTask)} className="p-4 rounded-xl bg-white/[0.03] hover:bg-green-500/10 border border-white/5 hover:border-green-500/30 transition-all text-left group">
                <div className="text-white font-medium mb-1 group-hover:text-green-400 transition-colors">3. Araç Kapıda</div>
                <div className="text-xs text-zinc-500">Hazır bekliyor bildirimi.</div>
              </button>
            </div>

            <h4 className="text-sm font-sans tracking-widest text-zinc-500 uppercase mb-4 mt-auto border-t border-white/10 pt-6">Bildirim Geçmişi</h4>
            <div className="space-y-3">
              {logs.filter(l => l.task === selectedTask.id).length === 0 && (
                <div className="text-xs text-zinc-600">Henüz bildirim gönderilmedi.</div>
              )}
              {logs.filter(l => l.task === selectedTask.id).map((log, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <span className="text-zinc-500 w-12">{log.time}</span>
                  <CheckCheck className="w-4 h-4 text-green-500" />
                  <span className="text-zinc-300">{log.msg}</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-zinc-500">Sol menüden bir görev seçin.</div>
        )}
      </div>

    </div>
  );
}
