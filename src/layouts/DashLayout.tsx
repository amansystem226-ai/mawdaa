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
    <div className="flex h-screen bg-brand-gray-light font-arabic">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-brand-navy/60 backdrop-blur-xs lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Component */}
      <aside className={`fixed inset-y-0 right-0 z-50 flex flex-col w-64 bg-[#0b2230] text-white border-l border-white/10 transition-transform duration-300 transform lg:translate-x-0 lg:static lg:inset-auto ${
        sidebarOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-20 px-6 border-b border-white/10 bg-[#071822]">
          <Link to="/" className="flex items-center gap-3 group">
            <img src="./assets/logo.jpg" alt="مركز مودة" className="w-10 h-10 rounded-full border border-white/30 object-cover shadow-sm group-hover:scale-105 transition-transform" />
            <div className="text-right">
              <h2 className="text-sm font-extrabold text-white leading-tight font-heading">مركز مودة للعيون</h2>
              <span className="text-[10px] font-medium text-[#2dd4bf] block mt-0.5">لوحة التحليل والإدارة</span>
            </div>
          </Link>
          <button className="lg:hidden text-white/80 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* Sidebar Nav links */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/dashboard'}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all duration-300 ${
                    isActive
                      ? 'bg-[#0A7C86] text-white shadow-md'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} />
                  <span>{item.label}</span>
                </div>
                {item.badgeCount && item.badgeCount > 0 ? (
                  <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full font-sans animate-pulse">
                    {item.badgeCount}
                  </span>
                ) : null}
              </NavLink>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/10 bg-[#071822]">
          <Button 
            variant="ghost" 
            fullWidth 
            onClick={handleLogout}
            className="text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 justify-start gap-3 rounded-2xl px-4 py-3 text-xs font-bold"
          >
            <LogOut size={18} />
            <span>تسجيل الخروج</span>
          </Button>
        </div>
      </aside>

      {/* Main View Container */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Topbar Header */}
        <header className="flex items-center justify-between h-20 px-6 bg-white border-b border-slate-200 shrink-0 shadow-xs">
          {/* Right: Hamburger + Title */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-navy p-2 hover:bg-slate-100 rounded-xl"
            >
              <Menu size={22} />
            </button>
            <div>
              <h2 className="text-lg font-extrabold text-navy hidden sm:block font-heading">لوحة التحكم والمتابعة الطبية</h2>
              <span className="text-xs text-slate-400 font-medium hidden sm:block">إشراف استشاري جراحة العيون</span>
            </div>
          </div>

          {/* Left: Quick Actions & Profile */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => navigate('/dashboard/requests')}
                className="p-2.5 text-slate-600 hover:text-navy hover:bg-slate-100 rounded-2xl transition-all relative cursor-pointer"
                title="متابعة طلبات الواتساب"
              >
                <Bell size={20} />
                {pendingWhatsappCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping" />
                )}
              </button>
            </div>

            {/* Profile Avatar */}
            <div className="flex items-center gap-3 border-r border-slate-200 pr-4">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-navy font-heading">د. محمد عمار</p>
                <p className="text-[10px] font-semibold text-[#0A7C86]">استشاري طب وجراحة العيون</p>
              </div>
              <img
                src="./assets/logo.jpg"
                alt="د. محمد عمار"
                className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-sm"
              />
            </div>
          </div>
        </header>

        {/* Dashboard Pages Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-50">
          {children}
        </main>
      </div>
    </div>
  );
};
