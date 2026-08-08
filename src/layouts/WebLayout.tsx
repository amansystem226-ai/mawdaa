import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageCircle, Menu, X, Calendar, Stethoscope } from 'lucide-react';

export const WebLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { title: 'الرئيسية', path: '/' },
    { title: 'الفحوصات والأشعة', path: '/examinations' },
    { title: 'العمليات', path: '/surgeries' },
    { title: 'العيادات', path: '/clinics' },
    { title: 'تواصل معنا', path: '/contact' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-bg text-navy font-sans antialiased">

      {/* --- NAVBAR: Clean, Spacious, Ultra-Transparent & Uncluttered --- */}
      <header className="absolute top-0 inset-x-0 z-50 h-[88px] flex items-center bg-transparent border-b border-white/10">
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="flex items-center justify-between">

            {/* Brand Logo Only */}
            <Link to="/" className="group flex items-center">
              <img
                src="./assets/logo.jpg?v=2026"
                alt="مركز مودة لجراحات العيون"
                className="w-12 h-12 rounded-full object-cover border border-white/40 shadow-md group-hover:scale-105 transition-transform"
              />
            </Link>

            {/* Nav Menu Links - 40px Spacing, Concise Titles */}
            <nav className="hidden lg:flex items-center gap-10">
              {navLinks.map((link, idx) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={idx}
                    to={link.path}
                    className={`text-base font-semibold transition-colors duration-200 relative py-1 ${
                      isActive
                        ? 'text-[#2dd4bf] font-bold'
                        : 'text-white/90 hover:text-white'
                    }`}
                  >
                    {link.title}
                    {isActive && (
                      <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#2dd4bf] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right CTA Button & Doctor Dashboard Icon */}
            <div className="flex items-center gap-3">
              {/* Doctor Dashboard Portal Icon */}
              <Link
                to="/dashboard"
                className="flex items-center justify-center w-11 h-11 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all cursor-pointer shadow-sm group"
                title="لوحة تحكم الطبيب"
              >
                <Stethoscope size={20} className="group-hover:scale-110 transition-transform text-[#2dd4bf]" />
              </Link>

              {/* Book Appointment CTA Button */}
              <Link
                to="/contact#booking"
                className="hidden sm:inline-flex items-center justify-center gap-2 bg-[#0A7C86] hover:bg-[#075c64] text-white h-11 px-6 rounded-xl text-sm font-bold shadow-md transition-all duration-300 font-heading cursor-pointer active:scale-95"
              >
                <Calendar size={16} />
                <span>احجز موعدك</span>
              </Link>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-xl bg-black/25 hover:bg-black/40 text-white transition-all cursor-pointer border border-white/20"
                aria-label="القائمة"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-[90px] inset-x-0 bg-[#0b2230]/98 backdrop-blur-xl px-6 pt-6 pb-8 text-right border-b border-white/15 shadow-2xl">
            <nav className="flex flex-col space-y-4 mb-6">
              {navLinks.map((link, idx) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={idx}
                    to={link.path}
                    className={`text-base font-bold px-4 py-3 rounded-2xl transition-all ${
                      isActive
                        ? 'bg-white/15 text-[#2dd4bf]'
                        : 'text-white/90 hover:bg-white/10'
                    }`}
                  >
                    {link.title}
                  </Link>
                );
              })}
            </nav>
            <div className="pt-4 border-t border-white/10">
              <Link
                to="/contact#booking"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#0A7C86] hover:bg-[#075c64] text-white h-[56px] px-8 rounded-[16px] text-base font-bold shadow-md font-heading"
              >
                <Calendar size={20} />
                <span>احجز موعدك الآن</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* --- MOBILE PROMINENT LOCATION STRIP --- */}
      <div className="bg-[#054348] border-b border-teal-500/30 py-2.5 px-4 text-center text-xs font-bold text-white shadow-md flex items-center justify-center gap-2 z-40 mt-[88px]">
        <span className="w-2 h-2 rounded-full bg-[#2dd4bf] animate-ping shrink-0" />
        <span className="text-[#2dd4bf] font-extrabold">العنوان:</span>
        <span className="leading-tight text-white font-heading">
          مدينة أشمون - محافظة المنوفية - شارع سعد زغلول (عمارة المساعي المشكورة)
        </span>
      </div>

      {/* Main Content Area */}
      <main className="flex-1">{children}</main>

      {/* --- FOOTER: 70px Vertical Padding, 60px Column Gap --- */}
      <footer className="bg-[#0b2230] text-white py-[70px] border-t border-white/10 text-right">
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[60px] mb-14">
            
            {/* Brand Column */}
            <div className="space-y-4">
              <div>
                <h3 className="font-heading font-black text-xl text-white tracking-wide mb-1">مركز مودة لجراحات العيون</h3>
                <p className="text-sm text-[#2dd4bf] font-bold">مدينة أشمون - محافظة المنوفية</p>
              </div>
              <p className="text-sm text-white/75 leading-[1.8] font-light">
                أول مركز متخصص لطب وجراحة العيون بمدينة أشمون بمحافظة المنوفية، يقدم رعاية متكاملة بأحدث الأجهزة الطبية المعتمَدة.
              </p>
              <p className="text-xs text-white/60 font-semibold pt-1">
                رؤية أوضح .. حياة أفضل
              </p>
            </div>

            {/* Services Column */}
            <div>
              <h4 className="font-bold text-white mb-6 text-base font-heading border-r-2 border-[#0A7C86] pr-3">الخدمات الطبية</h4>
              <ul className="space-y-3.5 text-sm text-white/75">
                {[
                  { title: 'الفحوصات والأشعة (Pentacam & OCT)', path: '/examinations' },
                  { title: 'عمليات المياه البيضاء بالفاكو', path: '/surgeries' },
                  { title: 'تصحيح الإبصار وزراعة العدسات', path: '/surgeries' },
                  { title: 'عيادات كشف النظر والعدسات', path: '/clinics' },
                ].map((s, i) => (
                  <li key={i}>
                    <Link
                      to={s.path}
                      className="hover:text-white transition-colors block py-0.5"
                    >
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hours Column */}
            <div>
              <h4 className="font-bold text-white mb-6 text-base font-heading border-r-2 border-[#0A7C86] pr-3">مواعيد العمل بالعيادة</h4>
              <div className="space-y-3 text-xs text-white/75 leading-[1.8]">
                <p className="font-bold text-white text-sm mb-1">السبت – الخميس</p>
                <p>من الساعة 9:00 صباحاً حتى 12:00 ظهراً</p>
                <p className="text-white/50 pt-2 border-t border-white/10 mt-2">الجمعة: مغلق</p>
              </div>
            </div>

            {/* Contact Column */}
            <div>
              <h4 className="font-bold text-white mb-6 text-base font-heading border-r-2 border-[#0A7C86] pr-3">تواصل ومقر المركز</h4>
              <ul className="space-y-3.5 text-sm text-white/75 leading-[1.8]">
                <li>
                  <a href="tel:01000141542" className="hover:text-white transition-colors font-medium block" dir="ltr">
                    01000141542
                  </a>
                </li>
                <li>
                  <a href="tel:0483445807" className="hover:text-white transition-colors font-medium block" dir="ltr">
                    048-3445807
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/201000141542"
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 transition-colors font-medium block"
                  >
                    تواصل عبر واتساب العيادة
                  </a>
                </li>
                <li className="pt-2">
                  <div className="bg-[#054348]/70 border border-[#2dd4bf]/40 p-3 rounded-2xl text-xs text-white leading-relaxed font-bold font-heading shadow-md">
                    📍 مدينة أشمون - محافظة المنوفية - شارع سعد زغلول - عمارة المساعي المشكورة
                  </div>
                </li>
              </ul>
            </div>

          </div>

          {/* Footer Bottom Bar */}
          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-white/60">
            <p>© {new Date().getFullYear()} - مركز مودة لجراحات العيون بمدينة أشمون - محافظة المنوفية. جميع الحقوق محفوظة.</p>
            
            <div className="flex items-center gap-2.5 bg-white/5 hover:bg-white/10 px-5 py-2.5 rounded-full border border-white/10 transition-all">
              <span>Powered by <strong className="text-white font-semibold">Mazen Abdelgfar</strong></span>
              <a
                href="https://wa.me/201022234967"
                target="_blank"
                rel="noreferrer"
                title="تواصل مع Mazen Abdelgfar عبر الواتساب"
                className="inline-flex items-center justify-center w-5.5 h-5.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white transition-transform hover:scale-110"
              >
                <MessageCircle size={13} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
