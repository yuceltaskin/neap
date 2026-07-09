import React from 'react';
import { Plus, Filter, Download } from 'lucide-react';

export default function Sales() {
  return (
    <div id="page-satis-crm" className="flex flex-col space-y-6 h-full min-w-0">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Satış & CRM Yönetimi</h1>
          <p className="text-slate-500 text-sm mt-1">Müşteri hesapları ve satış kayıtları yönetimi.</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
           <button id="btn-satis-raporu-aktar" className="flex items-center px-4 py-2 border border-slate-200 bg-white rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 shadow-sm transition-colors focus:ring-2 focus:ring-slate-200 outline-none">
             <Download size={16} className="mr-2" /> Dışa Aktar
           </button>
           <button id="btn-yurtdisi-satis-ekle" className="flex items-center px-4 py-2 border border-transparent bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-sm transition-shadow shadow-sm active:transform active:scale-[0.98] outline-none">
             <Plus size={16} className="mr-2" /> Satış Kaydı Aç
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 flex-1 min-h-0">
        
        {/* Satış/Müşteri Kayıt Formu Alanı */}
        <div className="xl:col-span-1">
          <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col sticky top-0">
            <h2 className="font-bold text-slate-800 mb-4 pb-3 border-b border-slate-100">Hızlı Müşteri & Satış Formu</h2>
            
            <form id="form-yeni-satis-kaydi" className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="input-tc-no" className="block text-[10px] font-bold text-slate-500 uppercase mb-1">TC Kimlik / VKN *</label>
                <input 
                  id="input-tc-no" 
                  type="text" 
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-colors" 
                  placeholder="Örn: 12345678901"
                  required 
                />
              </div>
              
              <div>
                <label htmlFor="input-ad-soyad" className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Cari Unvan / Ad Soyad *</label>
                <input 
                  id="input-ad-soyad" 
                  type="text" 
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-colors" 
                  placeholder="Müşteri adını giriniz..."
                  required 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="select-kategori" className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Hizmet/Ürün Kategorisi</label>
                  <select id="select-kategori" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white outline-none transition-colors">
                    <option value="">Seçiniz...</option>
                    <option value="yazilim">Yazılım Lisanslama</option>
                    <option value="donanim">Donanım Satışı</option>
                    <option value="danismanlik">Danışmanlık Hizmetleri</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="input-tutar" className="block text-[10px] font-bold text-slate-500 uppercase mb-1">İşlem Tutarı (₺)</label>
                  <input 
                    id="input-tutar" 
                    type="number" 
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-colors" 
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="textarea-aciklama" className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Sipariş Notu</label>
                <textarea 
                  id="textarea-aciklama" 
                  rows={3}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-colors resize-none" 
                  placeholder="Eklemek istediğiniz teknik veya ticari notlar..."
                ></textarea>
              </div>

              <div className="pt-3 flex justify-end space-x-3">
                <button id="btn-formu-temizle" type="reset" className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors focus:ring-2 focus:ring-slate-200 outline-none">
                  Temizle
                </button>
                <button id="btn-kaydi-tamamla" type="submit" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-lg text-sm transition-shadow shadow-sm active:transform active:scale-[0.98] outline-none">
                  Kaydet ve Onayla
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* DataTable Alanı */}
        <div className="xl:col-span-2">
          <div className="bg-white rounded-xl border border-slate-200 flex flex-col h-full overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center bg-white">
              <h2 className="font-bold text-slate-800">Geçmiş Satış Kayıtları (DataTable)</h2>
              <button id="btn-tablo-filtrele" className="text-xs text-blue-600 font-semibold flex items-center hover:underline">
                <Filter size={14} className="mr-1" />
                Filtrele
              </button>
            </div>
            
            <div className="overflow-x-auto flex-1">
              <table id="table-satis-gecmisi" className="w-full text-left border-collapse">
                <thead className="sticky top-0 bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500 font-bold">
                  <tr>
                    <th scope="col" className="px-5 py-3 border-b border-slate-100">Müşteri Ünvanı</th>
                    <th scope="col" className="px-5 py-3 border-b border-slate-100">Satış Kalemi</th>
                    <th scope="col" className="px-5 py-3 border-b border-slate-100">İşlem Tarihi</th>
                    <th scope="col" className="px-5 py-3 border-b border-slate-100 text-right">Tutar</th>
                    <th scope="col" className="px-5 py-3 border-b border-slate-100 text-center">Aksiyon</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-600">
                  {[
                    { name: 'Omega Lojistik A.Ş.', product: 'Kurumsal Güvenlik Paketi', date: '01.05.2026', amount: '45.000,00' },
                    { name: 'TechSoft Ltd. Şti.', product: 'Altyapı Danışmanlığı', date: '28.04.2026', amount: '12.500,00' },
                    { name: 'Kuzey İnşaat A.Ş', product: 'Yıllık Bakım Anlaşması', date: '26.04.2026', amount: '8.750,00' },
                    { name: 'Ahmet Yılmaz', product: 'Bireysel Destek Hizmeti', date: '25.04.2026', amount: '1.200,00' },
                    { name: 'Global Ticaret', product: 'Sistem Entegrasyonu', date: '24.04.2026', amount: '34.000,00' },
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 border-b border-slate-50 transition-colors">
                      <td className="px-5 py-3 whitespace-nowrap font-medium text-slate-900">{row.name}</td>
                      <td className="px-5 py-3 whitespace-nowrap text-slate-600">{row.product}</td>
                      <td className="px-5 py-3 whitespace-nowrap text-slate-400">{row.date}</td>
                      <td className="px-5 py-3 whitespace-nowrap text-right font-semibold text-slate-900">₺{row.amount}</td>
                      <td className="px-5 py-3 whitespace-nowrap text-center">
                        <button id={`btn-detay-incele-${idx}`} className="text-blue-600 hover:text-blue-700 font-semibold text-xs transition-colors">İncele</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-5 py-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between bg-white text-xs text-slate-500">
               <span className="mb-4 sm:mb-0">Toplam 5 kayıt gösteriliyor.</span>
               <div className="flex space-x-1">
                 <button id="btn-sayfalama-onceki" className="px-3 py-1.5 rounded-md text-slate-400 cursor-not-allowed" disabled>Önceki</button>
                 <button id="btn-sayfalama-1" className="px-3 py-1.5 bg-blue-50 text-blue-700 font-bold rounded-md">1</button>
                 <button id="btn-sayfalama-sonraki" className="px-3 py-1.5 rounded-md text-slate-600 hover:bg-slate-50 transition-colors">Sonraki</button>
               </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
