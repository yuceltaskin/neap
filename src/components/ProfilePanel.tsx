import React, { useState } from 'react';
import {
  User, Key, Shield, Smartphone, Lock, LogOut, X,
  Eye, EyeOff, Monitor, Clock, CheckCircle, AlertTriangle, Mail, Globe
} from 'lucide-react';

interface ProfilePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfilePanel({ isOpen, onClose }: ProfilePanelProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'password' | '2fa' | 'sessions'>('profile');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

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

  const tabs = [
    { id: 'profile' as const, label: 'Profil', icon: User },
    { id: 'password' as const, label: 'Şifre', icon: Key },
    { id: '2fa' as const, label: '2FA', icon: Shield },
    { id: 'sessions' as const, label: 'Oturumlar', icon: Monitor },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col overflow-hidden"
           style={{ animation: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}>

        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shrink-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Hesap Yönetimi</h2>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X size={18} />
            </button>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-lg border-2 border-white/30">
              MY
            </div>
            <div>
              <p className="font-semibold">Murat Yılmaz</p>
              <p className="text-sm text-blue-100">murat@nexterp.com · Yönetici</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-100 px-2 shrink-0 bg-slate-50/50">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-1.5 px-3 py-2.5 text-xs font-medium border-b-2 transition-all -mb-[1px] ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-700 bg-white'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-white/60'
              }`}
            >
              <tab.icon size={14} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">

          {/* Profil Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-5 animate-in fade-in duration-300">
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
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">Rol</label>
                <input
                  type="text"
                  defaultValue="Yönetici"
                  disabled
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed"
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

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div>
                  <p className="text-sm font-medium text-slate-800">E-posta Bildirimleri</p>
                  <p className="text-xs text-slate-500 mt-0.5">Önemli güncellemeler için bildirim al</p>
                </div>
                <button
                  onClick={() => setEmailNotifications(!emailNotifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors shrink-0 ${
                    emailNotifications ? 'bg-blue-600' : 'bg-slate-200'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${
                    emailNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2.5 rounded-lg text-sm transition-colors">
                Profili Kaydet
              </button>
            </div>
          )}

          {/* Şifre Tab */}
          {activeTab === 'password' && (
            <div className="animate-in fade-in duration-300">
              {saveSuccess && (
                <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center space-x-2 text-emerald-700 text-sm">
                  <CheckCircle size={16} />
                  <span>Şifreniz başarıyla güncellendi!</span>
                </div>
              )}
              <form className="space-y-4" onSubmit={handlePasswordSave}>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">
                    Mevcut Şifre
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-colors"
                      placeholder="Mevcut şifrenizi girin"
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
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">
                    Yeni Şifre
                  </label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-colors"
                      placeholder="Yeni şifrenizi belirleyin"
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
                        <span className="text-[11px] text-slate-500">Şifre Gücü</span>
                        <span className={`text-[11px] font-semibold ${
                          strength.label === 'Zayıf' ? 'text-red-600' :
                          strength.label === 'Orta' ? 'text-amber-600' :
                          'text-emerald-600'
                        }`}>{strength.label}</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${strength.color}`}
                          style={{ width: strength.width }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">
                    Yeni Şifre (Tekrar)
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`w-full pl-10 pr-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-100 outline-none transition-colors ${
                        confirmPassword && confirmPassword !== newPassword
                          ? 'border-red-300 focus:border-red-500'
                          : 'border-slate-200 focus:border-blue-500'
                      }`}
                      placeholder="Yeni şifrenizi tekrar girin"
                    />
                  </div>
                  {confirmPassword && confirmPassword !== newPassword && (
                    <p className="mt-1 text-xs text-red-500 flex items-center space-x-1">
                      <AlertTriangle size={12} />
                      <span>Şifreler eşleşmiyor</span>
                    </p>
                  )}
                </div>

                <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg">
                  <p className="text-xs text-amber-700">
                    <strong>Güvenlik ipucu:</strong> En az 8 karakter, büyük/küçük harf, rakam ve özel karakter kullanın.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={!currentPassword || !newPassword || newPassword !== confirmPassword}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-medium px-4 py-2.5 rounded-lg text-sm transition-colors"
                >
                  Şifreyi Güncelle
                </button>
              </form>
            </div>
          )}

          {/* 2FA Tab */}
          {activeTab === '2fa' && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${twoFactorEnabled ? 'bg-emerald-100' : 'bg-slate-200'}`}>
                      <Smartphone className={`w-5 h-5 ${twoFactorEnabled ? 'text-emerald-600' : 'text-slate-500'}`} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">İki Aşamalı Doğrulama</h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {twoFactorEnabled
                          ? 'Hesabınız ek güvenlik katmanıyla korunuyor.'
                          : 'Hesabınıza ekstra güvenlik katmanı ekleyin.'
                        }
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors shrink-0 ${
                      twoFactorEnabled ? 'bg-emerald-500' : 'bg-slate-200'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${
                      twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              </div>

              {twoFactorEnabled && (
                <>
                  <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="text-emerald-600 w-4 h-4" />
                      <p className="text-sm font-medium text-emerald-800">2FA Aktif</p>
                    </div>
                    <p className="text-xs text-emerald-700">
                      Her giriş denemesinde telefonunuza veya authenticator uygulamanıza bir doğrulama kodu gönderilecektir.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-[11px] font-bold text-slate-500 uppercase">Doğrulama Yöntemleri</h4>

                    <div className="p-3 border border-slate-200 rounded-lg flex items-center justify-between bg-white">
                      <div className="flex items-center space-x-3">
                        <Smartphone className="text-blue-500 w-4 h-4" />
                        <div>
                          <p className="text-sm font-medium text-slate-800">SMS Doğrulama</p>
                          <p className="text-xs text-slate-500">+90 *** *** 42 18</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold uppercase bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">Aktif</span>
                    </div>

                    <div className="p-3 border border-slate-200 rounded-lg flex items-center justify-between bg-white">
                      <div className="flex items-center space-x-3">
                        <Shield className="text-purple-500 w-4 h-4" />
                        <div>
                          <p className="text-sm font-medium text-slate-800">Authenticator Uygulaması</p>
                          <p className="text-xs text-slate-500">Google Authenticator / Authy</p>
                        </div>
                      </div>
                      <button className="text-xs font-medium text-blue-600 hover:text-blue-700">Kurulum</button>
                    </div>

                    <div className="p-3 border border-slate-200 rounded-lg flex items-center justify-between bg-white">
                      <div className="flex items-center space-x-3">
                        <Mail className="text-amber-500 w-4 h-4" />
                        <div>
                          <p className="text-sm font-medium text-slate-800">E-posta Doğrulama</p>
                          <p className="text-xs text-slate-500">murat@nexterp.com</p>
                        </div>
                      </div>
                      <button className="text-xs font-medium text-blue-600 hover:text-blue-700">Aktif Et</button>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[11px] font-bold text-slate-500 uppercase mb-2">Yedek Kodlar</h4>
                    <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg">
                      <p className="text-xs text-amber-700 mb-2">
                        Telefonunuza erişemezseniz bu kodları kullanabilirsiniz. Güvenli bir yerde saklayın.
                      </p>
                      <button className="text-xs font-medium text-amber-700 hover:text-amber-800 underline">
                        Yedek Kodları Görüntüle
                      </button>
                    </div>
                  </div>
                </>
              )}

              {!twoFactorEnabled && (
                <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="text-amber-500 w-4 h-4 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-amber-800 mb-1">Güvenlik Uyarısı</p>
                      <p className="text-xs text-amber-700">
                        İki aşamalı doğrulama kapalı. Hesabınızı yetkisiz erişimlere karşı korumak için 2FA'yı etkinleştirmenizi öneriyoruz.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Oturumlar Tab */}
          {activeTab === 'sessions' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <p className="text-xs text-slate-500">Hesabınıza giriş yapılmış cihaz ve konumları görüntüleyin.</p>

              <div className="space-y-3">
                {sessions.map((session, idx) => (
                  <div key={idx} className={`p-3.5 border rounded-xl ${session.active ? 'border-blue-200 bg-blue-50/50' : 'border-slate-200 bg-white'}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <Monitor className={`w-4 h-4 mt-0.5 ${session.active ? 'text-blue-600' : 'text-slate-400'}`} />
                        <div>
                          <p className="text-sm font-medium text-slate-800">{session.device}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{session.ip} · {session.location}</p>
                          <div className="flex items-center space-x-1 mt-1">
                            <Clock size={11} className="text-slate-400" />
                            <span className={`text-[11px] ${session.active ? 'text-blue-600 font-semibold' : 'text-slate-500'}`}>
                              {session.time}
                            </span>
                          </div>
                        </div>
                      </div>
                      {session.active ? (
                        <span className="text-[10px] font-bold uppercase bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Aktif</span>
                      ) : (
                        <button className="text-[11px] font-medium text-red-500 hover:text-red-700 transition-colors">
                          Sonlandır
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full text-sm font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 py-2.5 rounded-lg transition-colors border border-red-100">
                Diğer Tüm Oturumları Sonlandır
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/80 shrink-0">
          <button className="w-full flex items-center justify-center space-x-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 py-2 rounded-lg transition-colors">
            <LogOut size={16} />
            <span>Oturumu Kapat</span>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0.8; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </>
  );
}
