import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  Users, Settings, LogOut, Menu, X, Bell, MessageCircle 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/UIElements';

export const DashLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { logout, appointments } = useApp();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pendingWhatsappCount = appointments.filter(a => a.whatsappStatus !== 'contacted').length;

  const menuItems = [
    { to: '/dashboard', label: 'طلبات المرضى والواتساب', icon: MessageCircle, badgeCount: pendingWhatsappCount },
    { to: '/dashboard/patients', label: 'سجلات المرضى', icon: Users },
    { to: '/dashboard/settings', label: 'إعدادات النظام', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/dashboard/login');
  };

  return (
    <div className="flex h-screen bg-[#080C14] text-slate-100 font-arabic overflow-hidden dir-rtl">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Component */}
      <aside className={`fixed inset-y-0 right-0 z-50 flex flex-col w-64 bg-[#0B132B]/95 backdrop-blur-xl border-l border-slate-800/80 text-white transition-transform duration-300 transform lg:translate-x-0 lg:static lg:inset-auto shadow-2xl ${
        sidebarOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-20 px-6 border-b border-slate-800/80 bg-[#070D1D]/90">
          <Link to="/" className="flex items-center gap-3 group">
            <img src="./assets/logo.jpg?v=2026" alt="مركز مودة" className="w-10 h-10 rounded-full border border-cyan-500/30 object-cover shadow-lg group-hover:scale-105 transition-transform" />
            <div className="text-right">
              <h2 className="text-sm font-extrabold text-white leading-tight font-heading">مركز مودة للعيون</h2>
              <span className="text-[10px] font-bold text-[#1EC8E8] block mt-0.5 tracking-wider">لوحة التحليل والإدارة</span>
            </div>
          </Link>
          <button className="lg:hidden text-slate-400 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* Sidebar Nav links */}
        <nav className="flex-1 px-4 py-6 space-y-2.5 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/dashboard'}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-3.5 rounded-2xl text-xs font-bold transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-l from-[#1EC8E8]/20 via-[#0A7C86] to-[#0A7C86] text-white shadow-lg shadow-cyan-950/50 border border-cyan-500/30'
                      : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} className="shrink-0" />
                  <span>{item.label}</span>
                </div>
                {item.badgeCount && item.badgeCount > 0 ? (
                  <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full font-sans animate-pulse shadow-sm">
                    {item.badgeCount}
                  </span>
                ) : null}
              </NavLink>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800/80 bg-[#070D1D]/90">
          <Button 
            variant="ghost" 
            fullWidth 
            onClick={handleLogout}
            className="text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 justify-start gap-3 rounded-2xl px-4 py-3 text-xs font-bold transition-all"
          >
            <LogOut size={18} />
            <span>تسجيل الخروج</span>
          </Button>
        </div>
      </aside>

      {/* Main View Container */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Topbar Header */}
        <header className="flex items-center justify-between h-20 px-6 sm:px-8 bg-[#0F172A]/90 backdrop-blur-md border-b border-slate-800/80 shrink-0 shadow-xl z-20">
          {/* Right: Hamburger + Title */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-slate-300 p-2 hover:bg-slate-800 rounded-xl transition-all"
            >
              <Menu size={22} />
            </button>
            <div>
              <h2 className="text-lg font-extrabold text-white hidden sm:block font-heading tracking-wide">لوحة التحكم والمتابعة الطبية</h2>
              <span className="text-xs text-slate-400 font-medium hidden sm:block">إشراف استشاري جراحة العيون بمدينة أشمون</span>
            </div>
          </div>

          {/* Left: Quick Actions & Profile */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => navigate('/dashboard')}
                className="p-2.5 text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-2xl transition-all relative cursor-pointer border border-slate-800"
                title="متابعة طلبات الواتساب"
              >
                <Bell size={20} />
                {pendingWhatsappCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping" />
                )}
              </button>
            </div>

            {/* Profile Avatar */}
            <div className="flex items-center gap-3 border-r border-slate-800 pr-4">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-white font-heading">إدارة مركز مودة</p>
                <p className="text-[10px] font-semibold text-[#1EC8E8]">أشمون - المنوفية</p>
              </div>
              <img
                src="./assets/logo.jpg?v=2026"
                alt="مركز مودة لجراحات العيون"
                className="w-10 h-10 rounded-full object-cover border border-cyan-500/40 shadow-md"
              />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10 bg-[#080C14]">
          <div className="max-w-7xl mx-auto space-y-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
