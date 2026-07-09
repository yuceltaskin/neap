import React from 'react';
import { Construction } from 'lucide-react';

interface Props {
  title: string;
  id: string;
}

export default function DefaultPage({ title, id }: Props) {
  return (
    <div id={`page-taslak-${id}`} className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-500 h-full min-w-0">
      <div className="w-20 h-20 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center mb-6 border border-slate-200">
        <Construction size={40} strokeWidth={1.5} />
      </div>
      <h1 className="text-3xl font-bold text-slate-900 mb-3">{title}</h1>
      <p className="text-slate-500 max-w-lg mx-auto mb-10 leading-relaxed text-sm">
        Bu modül geçici olarak inşa aşamasındadır. Flow (NextAdop) testleri için aşağıdaki simüle edilmiş veri formunu kullanabilirsiniz.
      </p>
      
      {/* Test Formu */}
      <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 w-full max-w-xl text-left relative overflow-hidden">
        <div className="absolute top-0 right-0 p-3">
           <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-1 uppercase rounded-md tracking-wider">Test Modu</span>
        </div>
        <h2 className="font-bold text-slate-800 border-b border-slate-100 pb-3 mb-5">Örnek Veri İşlem Paneli</h2>
        
        <form id={`form-test-${id}`} className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor={`input-${id}-verikodu`} className="block text-[10px] font-bold text-slate-500 uppercase mb-1">İşlem / Referans Kodu</label>
            <input 
              id={`input-${id}-verikodu`} 
              type="text" 
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-colors" 
              placeholder={`Örn: ${id.toUpperCase()}-001`} 
            />
          </div>
          <div>
            <label htmlFor={`input-${id}-aciklama`} className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Açıklama veya Başlık</label>
            <input 
              id={`input-${id}-aciklama`} 
              type="text" 
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-colors" 
              placeholder="Yeni veriyi tanımlayın..." 
            />
          </div>
          <div className="pt-2">
            <button id={`btn-${id}-deneme-kaydet`} type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg text-sm transition-shadow shadow-sm active:transform active:scale-[0.98] outline-none">
              {title} Verisini Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
