import React, { useState } from 'react';
import { Shield, Key, Lock, Smartphone } from 'lucide-react';

export default function Settings() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  return (
    <div className="max-w-4xl mx-auto w-full animate-in fade-in duration-500">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Ayarlar</h1>
        <p className="text-slate-500 text-sm">Hesap güvenliği ve sistem tercihlerinizi yönetin.</p>
      </div>

      <div className="space-y-6">
        {/* Şifre Değiştirme Bölümü */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center space-x-3">
            <Key className="text-blue-600 w-5 h-5" />
            <h2 className="font-semibold text-slate-800">Şifre Değiştirme</h2>
          </div>
          <div className="p-6">
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                  Mevcut Şifre Doğrulama
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-colors"
                    placeholder="Mevcut şifrenizi girin"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                  Yeni Güçlü Şifre
                </label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-colors"
                    placeholder="Yeni güçlü şifrenizi belirleyin"
                  />
                </div>
                <p className="mt-1.5 text-xs text-slate-500">
                  Şifreniz en az 8 karakter uzunluğunda olmalı ve harf, rakam ve özel karakter içermelidir.
                </p>
              </div>

              <div className="pt-2">
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors w-full sm:w-auto">
                  Şifreyi Güncelle
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* 2FA Bölümü */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center space-x-3">
            <Smartphone className="text-blue-600 w-5 h-5" />
            <h2 className="font-semibold text-slate-800">İki Aşamalı Doğrulama (2FA)</h2>
          </div>
          <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-medium text-slate-900 mb-1">İki Aşamalı Doğrulama</h3>
              <p className="text-sm text-slate-500 max-w-md">
                Hesabınıza giriş yaparken şifrenize ek olarak telefonunuza gönderilecek bir kod ile ekstra güvenlik sağlayın.
              </p>
            </div>
            <button 
              onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                twoFactorEnabled ? 'bg-blue-600' : 'bg-slate-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          
          {twoFactorEnabled && (
            <div className="px-6 pb-6 pt-0">
              <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                 <p className="text-sm text-blue-800">
                   İki aşamalı doğrulama şu anda <strong>aktif</strong>. Yeni bir cihazdan giriş yaptığınızda doğrulama kodu istenecek.
                 </p>
                 <button className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                   Doğrulama Yöntemlerini Yönet
                 </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
