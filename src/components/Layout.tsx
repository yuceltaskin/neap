import React, { useState, useRef, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Users, Wallet, Package,
  FileText, PlusCircle, CheckSquare, Bell,
  Search, ChevronDown, Grid
} from 'lucide-react';

export default function Layout() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const currentRoute = location.pathname === '/' ? 'dashboard' : location.pathname.replace('/', '');

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const topNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { id: 'satis', label: 'Satış & CRM', icon: Users, path: '/satis' },
  ];

  const dropdownItems = [
    { id: 'finans', label: 'Finans', icon: Wallet, path: '/finans' },
    { id: 'ik', label: 'İnsan Kaynakları', icon: Users, path: '/ik' },
    { id: 'stok', label: 'Stok Yönetimi', icon: Package, path: '/stok' },
  ];
  

  const sidebarItems = [
    { id: 'raporlar', label: 'Raporlar', icon: FileText, path: '/raporlar' },
    { id: 'veri-girisi', label: 'Veri Girişi', icon: PlusCircle, path: '/veri-girisi' },
    { id: 'onay-bekleyenler', label: 'Onay Bekleyenler', icon: CheckSquare, path: '/onay-bekleyenler' },
  ];

  const isDropdownActive = dropdownItems.some(item => currentRoute === item.id);

  return (
    <div className="flex flex-col h-screen bg-slate-50 text-slate-800 font-sans overflow-hidden">
      {/* Üst Navigation Bar */}
      <nav id="nav-top-bar" className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-20">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">E</div>
            <span className="font-bold text-xl tracking-tight text-slate-900">NextERP</span>
          </div>
          
          <div id="nav-links" className="flex items-center space-x-1 h-full hidden lg:flex">
            {topNavItems.map(item => (
              <Link
                key={item.id}
                id={`nav-top-${item.id}`}
                to={item.path}
                className={`flex items-center px-4 py-2 rounded-md font-medium text-sm transition-colors ${
                  currentRoute === item.id
                  ? 'bg-blue-50 text-blue-700'
                  : 'hover:bg-slate-100 text-slate-600'
                }`}
              >
                <item.icon className="mr-2" size={16} />
                {item.label}
              </Link>
            ))}

            {/* Dropdown Menü (Diğer Modüller) */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex items-center px-4 py-2 rounded-md font-medium text-sm transition-colors outline-none focus:ring-2 focus:ring-slate-200 ${
                  isDropdownActive || isDropdownOpen
                  ? 'bg-blue-50 text-blue-700'
                  : 'hover:bg-slate-100 text-slate-600'
                }`}
              >
                <Grid className="mr-2" size={16} />
                Modüller
                <ChevronDown className={`ml-2 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} size={14} />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-1 z-30 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  {dropdownItems.map(item => (
                     <Link
                       key={item.id}
                       to={item.path}
                       onClick={() => setIsDropdownOpen(false)}
                       className={`flex items-center px-4 py-2.5 text-sm transition-colors ${
                         currentRoute === item.id
                         ? 'bg-blue-50 text-blue-700 font-medium'
                         : 'text-slate-600 hover:bg-slate-50'
                       }`}
                     >
                       <item.icon className={`mr-3 ${currentRoute === item.id ? 'text-blue-600' : 'text-slate-400'}`} size={16} />
                       {item.label}
                     </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sağ Üst Profil & Bildirimler */}
        <div className="flex items-center space-x-5">
           {/* Genel Arama */}
           <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                id="input-genel-arama"
                type="text" 
                placeholder="Ara..." 
                className="pl-9 pr-4 py-1.5 bg-slate-100 border-transparent rounded-full text-sm focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none w-48"
              />
            </div>
            
          <div id="notif-area" className="relative cursor-pointer hover:bg-slate-100 p-2 rounded-full">
            <Bell className="w-5 h-5 text-slate-500" />
            <span className="absolute top-2 right-2 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
          </div>
          
          <Link
            id="user-profile"
            to="/profil"
            className="flex items-center space-x-3 cursor-pointer border-l border-slate-200 pl-5 hover:bg-slate-50 -my-2 py-2 px-4 rounded-lg transition-colors"
          >
            <div className="text-right hidden sm:block">
              <p id="user-name" className="text-sm font-semibold text-slate-900 leading-none">Murat Yılmaz</p>
              <p id="user-role" className="text-xs text-slate-500 mt-1">Yönetici</p>
            </div>
            <div id="user-avatar" className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full border-2 border-blue-200 flex items-center justify-center text-white text-xs font-bold">MY</div>
          </Link>
        </div>
      </nav>

      {/* Main Container */}
      <div className="flex flex-1 min-h-0">
        {/* İkincil Sidebar Menüsü */}
        <aside id="sidebar-main" className="w-56 bg-white border-r border-slate-200 p-4 flex flex-col space-y-2 shrink-0 overflow-y-auto hidden md:flex">
          <p className="text-[10px] uppercase font-bold text-slate-400 px-3 py-2">Operasyonel</p>
          {sidebarItems.map(item => (
            <Link
              key={item.id}
              id={`nav-link-${item.id}`}
              to={item.path}
              className={`w-full flex items-center px-3 py-2 text-sm rounded-lg group ${
                currentRoute === item.id 
                ? 'bg-blue-50 text-blue-700 font-medium' 
                : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <item.icon className={`w-4 h-4 mr-3 shrink-0 ${currentRoute === item.id ? 'text-blue-600' : 'text-slate-400 group-hover:text-blue-600'}`} />
              {item.label}
              {item.id === 'onay-bekleyenler' && (
                <span className="ml-auto bg-amber-100 text-amber-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full">4</span>
              )}
            </Link>
          ))}
          
          <div className="pt-4">
            <p className="text-[10px] uppercase font-bold text-slate-400 px-3 py-2">Araçlar</p>
            <button id="sidebar-arsiv" className="w-full flex items-center px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg group">
               <FileText className="w-4 h-4 mr-3 text-slate-400 group-hover:text-blue-600 shrink-0" />
               Arşiv
            </button>
          </div>
        </aside>

        {/* Aktif Sayfanın Yüklendiği Alan */}
        <main id="main-content" className="flex-1 p-6 flex flex-col space-y-6 min-w-0 overflow-y-auto bg-slate-50">
           <Outlet />
        </main>
      </div>
    </div>
  );
}
