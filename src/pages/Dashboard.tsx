import React from 'react';
import { TrendingUp, Users, Wallet, CreditCard, ChevronUp, ChevronDown } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { title: 'Aylık Ciro', value: '₺3.450.000', change: '+12.5%', isUp: true, icon: Wallet },
    { title: 'Aktif Müşteriler', value: '1,245', change: '+5.2%', isUp: true, icon: Users },
    { title: 'Açık Faturalar', value: '42', change: '-2.4%', isUp: false, icon: CreditCard },
    { title: 'Büyüme (YTD)', value: '%24.8', change: '+4.1%', isUp: true, icon: TrendingUp },
  ];

  return (
    <div id="page-dashboard" className="flex flex-col space-y-6 h-full min-w-0">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Sistem Özeti</h1>
          <p className="text-slate-500 text-sm mt-1">Genel metrikler ve organizasyonun güncel durumu.</p>
        </div>
        <button id="btn-rapor-indir" className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50 text-sm font-medium transition-colors focus:ring-2 focus:ring-slate-200 outline-none">
          Özet Rapor Al
        </button>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-4 rounded-xl border border-slate-200">
            <p className="text-xs text-slate-500 font-medium">{stat.title}</p>
            <h3 className="text-xl font-bold text-slate-900 mt-1">{stat.value}</h3>
            <div className={`flex items-center mt-2 text-xs font-medium ${stat.isUp ? 'text-emerald-600' : 'text-red-500'}`}>
              {stat.isUp ? <ChevronUp size={14} className="mr-1" /> : <ChevronDown size={14} className="mr-1" />}
              <span>{stat.change} (geçen aya göre)</span>
            </div>
          </div>
        ))}
      </div>

      {/* Tablolar ve Listeler */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        {/* Son Aktiviteler Tablosu (DataTable Simülasyonu) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 flex flex-col overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-bold text-slate-800">Son Aktiviteler (DataTable)</h2>
            <button id="btn-tumunu-gor" className="text-xs text-blue-600 font-semibold hover:underline">Tümünü İncele</button>
          </div>
          <div className="flex-1 overflow-auto">
            <table id="table-genel-akis" className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500 font-bold">
                <tr>
                  <th className="px-5 py-3 border-b border-slate-100">İşlem Kodu</th>
                  <th className="px-5 py-3 border-b border-slate-100">Tarih</th>
                  <th className="px-5 py-3 border-b border-slate-100">Açıklama</th>
                  <th className="px-5 py-3 border-b border-slate-100">Tutar</th>
                  <th className="px-5 py-3 border-b border-slate-100">Durum</th>
                </tr>
              </thead>
              <tbody className="text-sm text-slate-600">
                {[1, 2, 3, 4, 5].map((item) => (
                  <tr key={item} className="hover:bg-slate-50 border-b border-slate-50">
                    <td className="px-5 py-3 font-mono text-xs">#TRX-00{item}</td>
                    <td className="px-5 py-3 text-slate-400">Bugün 14:30</td>
                    <td className="px-5 py-3">Lisans Yenileme İşlemi</td>
                    <td className="px-5 py-3 font-semibold text-slate-900">₺{item * 1200},00</td>
                    <td className="px-5 py-3">
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-md text-[10px] font-bold">
                        Başarılı
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Görevler Modülü */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col">
          <h2 className="font-bold text-slate-800 mb-4">Bekleyen Aksiyonlar</h2>
          <ul className="space-y-4 flex-1">
            {[
              { id: 't1', text: 'Finansal kapanış onayı (Q1)', time: 'Yarın' },
              { id: 't2', text: 'Yeni personel yetki tanımlamaları', time: 'Bugün' },
              { id: 't3', text: 'Aylık ciro raporunun sunumu', time: 'Cuma' }
            ].map((task) => (
              <li key={task.id} className="flex items-start group">
                <input id={`checkbox-gorev-${task.id}`} type="checkbox" className="mt-1 flex-shrink-0 border-slate-300 rounded text-blue-600 focus:ring-blue-500 h-4 w-4 transition duration-150" />
                <div className="ml-3">
                  <label htmlFor={`checkbox-gorev-${task.id}`} className="text-sm font-medium text-slate-700 cursor-pointer group-hover:text-blue-600 transition-colors">{task.text}</label>
                  <p className="text-xs text-slate-400 mt-0.5">{task.time}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="pt-4">
            <button id="btn-hizli-gorev-ekle" className="w-full bg-slate-50 border border-dashed border-slate-200 hover:border-slate-300 text-slate-600 font-bold py-2.5 rounded-lg text-[11px] uppercase tracking-wider transition-colors">
              + Görev Ekle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
