import React, { useState } from 'react';
import {
  User, Key, Shield, Smartphone, Lock, LogOut,
  Eye, EyeOff, Monitor, Clock, CheckCircle, AlertTriangle,
  Mail, Globe, Camera
} from 'lucide-react';

export default function Profile() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const getPasswordStrength = (pass: string) => {
    if (!pass) return { label: '', color: '', width: '0%' };
    let score = 0;
    if (pass.length >= 8) score++;
    if (pass.length >= 12) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (score <= 1) return { label: 'Zayıf', color: 'bg-red-500', width: '20%' };
    if (score <= 2) return { label: 'Orta', color: 'bg-amber-500', width: '40%' };
    if (score <= 3) return { label: 'İyi', color: 'bg-yellow-500', width: '60%' };
    if (score <= 4) return { label: 'Güçlü', color: 'bg-emerald-500', width: '80%' };
    return { label: 'Çok Güçlü', color: 'bg-emerald-600', width: '100%' };
  };

  const strength = getPasswordStrength(newPassword);

  const handlePasswordSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || newPassword !== confirmPassword) return;
    setSaveSuccess(true);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const sessions = [
    { device: 'Chrome — Windows 11', ip: '85.102.xx.xx', location: 'İstanbul, TR', time: 'Şu an aktif', active: true },
    { device: 'Safari — iPhone 15', ip: '85.102.xx.xx', location: 'İstanbul, TR', time: '2 saat önce', active: false },
    { device: 'Firefox — macOS', ip: '176.42.xx.xx', location: 'Ankara, TR', time: '3 gün önce', active: false },
  ];

  return (
    <div className="max-w-4xl mx-auto w-full animate-in fade-in duration-500">
      {/* Başlık */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Hesap Ayarları</h1>
        <p className="text-slate-500 text-sm mt-1">Profil bilgilerinizi, güvenlik ayarlarınızı ve oturum geçmişinizi yönetin.</p>
      </div>

      <div className="space-y-6">

        {/* ─── Profil Bilgileri ─── */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center space-x-3">
            <User className="text-blue-600 w-5 h-5" />
            <h2 className="font-semibold text-slate-800">Profil Bilgileri</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center space-x-5 mb-6">
              <div className="relative group">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold border-4 border-blue-100">
                  MY
                </div>
                <button className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="text-white w-5 h-5" />
                </button>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Murat Yılmaz</p>
                <p className="text-sm text-slate-500">murat@nexterp.com</p>
                <span className="inline-block mt-1 text-[10px] font-bold uppercase bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Yönetici</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">Ad Soyad</label>
                <input
                  type="text"
                  defaultValue="Murat Yılmaz"
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">E-posta</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="email"
                    defaultValue="murat@nexterp.com"
                    className="w-full pl-10 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">Telefon</label>
                <input
                  type="tel"
                  defaultValue="+90 532 *** 42 18"
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">Dil</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <select className="w-full pl-10 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-colors bg-white appearance-none">
                    <option>Türkçe</option>
                    <option>English</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-5">
              <div className="flex-1 flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div>
                  <p className="text-sm font-medium text-slate-800">E-posta Bildirimleri</p>
                  <p className="text-xs text-slate-500">Önemli güncellemeler için bildirim al</p>
                </div>
                <button
                  onClick={() => setEmailNotifications(!emailNotifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors shrink-0 ${emailNotifications ? 'bg-blue-600' : 'bg-slate-200'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${emailNotifications ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
              <div className="flex-1 flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div>
                  <p className="text-sm font-medium text-slate-800">Giriş Uyarıları</p>
                  <p className="text-xs text-slate-500">Yeni cihazdan giriş bildirimi</p>
                </div>
                <button
                  onClick={() => setLoginAlerts(!loginAlerts)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors shrink-0 ${loginAlerts ? 'bg-blue-600' : 'bg-slate-200'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${loginAlerts ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>

            <div className="pt-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg text-sm transition-colors">
                Profili Kaydet
              </button>
            </div>
          </div>
        </div>

        {/* ─── Şifre Değiştirme ─── */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center space-x-3">
            <Key className="text-blue-600 w-5 h-5" />
            <h2 className="font-semibold text-slate-800">Şifre Değiştirme</h2>
          </div>
          <div className="p-6">
            {saveSuccess && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center space-x-2 text-emerald-700 text-sm">
                <CheckCircle size={16} />
                <span>Şifreniz başarıyla güncellendi!</span>
              </div>
            )}
            <form className="space-y-4" onSubmit={handlePasswordSave}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">Mevcut Şifre</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-colors"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">Yeni Şifre</label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-colors"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {newPassword && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] text-slate-500">Güç</span>
                        <span className={`text-[11px] font-semibold ${
                          strength.label === 'Zayıf' ? 'text-red-600' :
                          strength.label === 'Orta' ? 'text-amber-600' : 'text-emerald-600'
                        }`}>{strength.label}</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full transition-all duration-500 ${strength.color}`} style={{ width: strength.width }} />
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">Tekrar</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`w-full pl-10 pr-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-100 outline-none transition-colors ${
                        confirmPassword && confirmPassword !== newPassword
                          ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-blue-500'
                      }`}
                      placeholder="••••••••"
                    />
                  </div>
                  {confirmPassword && confirmPassword !== newPassword && (
                    <p className="mt-1 text-xs text-red-500 flex items-center space-x-1">
                      <AlertTriangle size={12} />
                      <span>Eşleşmiyor</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg">
                <p className="text-xs text-amber-700">
                  <strong>İpucu:</strong> En az 8 karakter, büyük/küçük harf, rakam ve özel karakter kullanın.
                </p>
              </div>

              <button
                type="submit"
                disabled={!currentPassword || !newPassword || newPassword !== confirmPassword}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-medium px-5 py-2 rounded-lg text-sm transition-colors"
              >
                Şifreyi Güncelle
              </button>
            </form>
          </div>
        </div>

        {/* ─── İki Aşamalı Doğrulama (2FA) ─── */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="text-blue-600 w-5 h-5" />
              <h2 className="font-semibold text-slate-800">İki Aşamalı Doğrulama (2FA)</h2>
            </div>
            <button
              onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors shrink-0 ${twoFactorEnabled ? 'bg-emerald-500' : 'bg-slate-200'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
          <div className="p-6">
            {!twoFactorEnabled ? (
              <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="text-amber-500 w-5 h-5 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-amber-800 mb-1">Güvenlik Uyarısı</p>
                    <p className="text-sm text-amber-700">
                      İki aşamalı doğrulama kapalı. Hesabınızı yetkisiz erişimlere karşı korumak için 2FA'yı etkinleştirmenizi öneriyoruz. Hesabınıza giriş yaparken şifrenize ek olarak telefonunuza gönderilecek bir kod ile ekstra güvenlik sağlayın.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-lg flex items-center space-x-2 text-emerald-700 text-sm">
                  <CheckCircle size={16} />
                  <span>İki aşamalı doğrulama <strong>aktif</strong>. Her giriş denemesinde doğrulama kodu istenecek.</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 border border-slate-200 rounded-xl bg-white hover:border-blue-200 hover:bg-blue-50/30 transition-colors">
                    <div className="flex items-center space-x-3 mb-2">
                      <Smartphone className="text-blue-500 w-4 h-4" />
                      <p className="text-sm font-medium text-slate-800">SMS</p>
                    </div>
                    <p className="text-xs text-slate-500 mb-2">+90 *** *** 42 18</p>
                    <span className="text-[10px] font-bold uppercase bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">Aktif</span>
                  </div>

                  <div className="p-3.5 border border-slate-200 rounded-xl bg-white hover:border-purple-200 hover:bg-purple-50/30 transition-colors">
                    <div className="flex items-center space-x-3 mb-2">
                      <Shield className="text-purple-500 w-4 h-4" />
                      <p className="text-sm font-medium text-slate-800">Authenticator</p>
                    </div>
                    <p className="text-xs text-slate-500 mb-2">Google / Authy</p>
                    <button className="text-[10px] font-bold uppercase bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full hover:bg-blue-200 transition-colors">Kurulum</button>
                  </div>

                  <div className="p-3.5 border border-slate-200 rounded-xl bg-white hover:border-amber-200 hover:bg-amber-50/30 transition-colors">
                    <div className="flex items-center space-x-3 mb-2">
                      <Mail className="text-amber-500 w-4 h-4" />
                      <p className="text-sm font-medium text-slate-800">E-posta</p>
                    </div>
                    <p className="text-xs text-slate-500 mb-2">murat@nexterp.com</p>
                    <button className="text-[10px] font-bold uppercase bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full hover:bg-blue-200 transition-colors">Aktif Et</button>
                  </div>
                </div>

                <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg">
                  <p className="text-xs text-amber-700">
                    <strong>Yedek Kodlar:</strong> Telefonunuza erişemezseniz bu kodları kullanabilirsiniz.
                    <button className="ml-1 font-medium underline hover:text-amber-800">Görüntüle</button>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ─── Aktif Oturumlar ─── */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Monitor className="text-blue-600 w-5 h-5" />
              <h2 className="font-semibold text-slate-800">Aktif Oturumlar</h2>
            </div>
            <button className="text-xs font-medium text-red-500 hover:text-red-700 transition-colors bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg border border-red-100">
              Tümünü Sonlandır
            </button>
          </div>
          <div className="divide-y divide-slate-100">
            {sessions.map((session, idx) => (
              <div key={idx} className={`px-6 py-4 flex items-center justify-between ${session.active ? 'bg-blue-50/30' : 'hover:bg-slate-50'} transition-colors`}>
                <div className="flex items-center space-x-4">
                  <Monitor className={`w-5 h-5 shrink-0 ${session.active ? 'text-blue-600' : 'text-slate-400'}`} />
                  <div>
                    <p className="text-sm font-medium text-slate-800">{session.device}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{session.ip} · {session.location}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1 text-right">
                    <Clock size={12} className="text-slate-400" />
                    <span className={`text-xs ${session.active ? 'text-blue-600 font-semibold' : 'text-slate-500'}`}>{session.time}</span>
                  </div>
                  {session.active ? (
                    <span className="text-[10px] font-bold uppercase bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Aktif</span>
                  ) : (
                    <button className="text-xs font-medium text-red-500 hover:text-red-700 transition-colors">Sonlandır</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Çıkış ─── */}
        <div className="pb-4">
          <button className="w-full flex items-center justify-center space-x-2 text-sm font-medium text-red-600 hover:text-white bg-red-50 hover:bg-red-600 py-3 rounded-xl transition-all border border-red-100 hover:border-red-600">
            <LogOut size={16} />
            <span>Oturumu Kapat</span>
          </button>
        </div>

      </div>
    </div>
  );
}
