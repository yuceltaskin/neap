import React from 'react';
import { createBrowserRouter, createMemoryRouter, RouterProvider, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Sales from './pages/Sales';
import DefaultPage from './pages/DefaultPage';
import Settings from './pages/Settings';
import Profile from './pages/Profile';

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'satis', element: <Sales /> },
      { path: 'finans', element: <DefaultPage title="Finans Yönetimi Modülü" id="finans" /> },
      { path: 'ik', element: <DefaultPage title="İnsan Kaynakları Modülü" id="ik" /> },
      { path: 'stok', element: <DefaultPage title="Stok ve Depo Yönetimi" id="stok" /> },
      { path: 'ayarlar', element: <Settings /> },
      { path: 'profil', element: <Profile /> },
      { path: 'raporlar', element: <DefaultPage title="Gelişmiş Raporlama Sistemi" id="raporlar" /> },
      { path: 'veri-girisi', element: <DefaultPage title="Toplu Veri Giriş ve Aktarım İşlemleri" id="veri-girisi" /> },
      { path: 'onay-bekleyenler', element: <DefaultPage title="Onay Bekleyen İşlemler" id="onay-bekleyenler" /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
];

let isIframe = false;
try {
  isIframe = window.self !== window.top;
} catch (e) {
  isIframe = true;
}

const router = isIframe ? createMemoryRouter(routes) : createBrowserRouter(routes);

export default function App() {
  return <RouterProvider router={router} />;
}
