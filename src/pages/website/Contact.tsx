import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MapPin, Phone, Clock, MessageSquare, AlertCircle } from 'lucide-react';
import { Card } from '../../components/ui/UIElements';
import { BookingForm } from '../../components/BookingForm';

export const Contact: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#booking') {
      const el = document.getElementById('booking');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div className="bg-brand-gray-light/30 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-brand-teal font-extrabold text-sm tracking-wider">تواصل معنا</span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-brand-blue mt-1">نسعد بالرد على استفساراتكم وحجوزاتكم</h2>
          <p className="text-sm text-brand-gray-dark mt-3 max-w-xl mx-auto leading-relaxed">
            يمكنك الاتصال بفرع العيادة بأشمون مباشرة أو الحجز المسبق عبر الموقع وسنتواصل معك فوراً لتأكيد الحجز.
          </p>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start mb-16">
          {/* Contact Details Card */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border border-brand-gray/30 p-8">
              <h3 className="text-xl font-bold text-brand-blue mb-6 border-r-4 border-brand-teal pr-3">بيانات التواصل المباشر</h3>
              
              <ul className="space-y-6 text-sm text-brand-navy">
                <li className="flex gap-3.5 items-start">
                  <MapPin className="text-brand-teal mt-0.5 shrink-0" size={20} />
                  <div>
                    <strong className="block mb-1">عنوان العيادة:</strong>
                    <span className="text-brand-gray-dark text-xs leading-relaxed">مدينة أشمون - محافظة المنوفية - شارع سعد زغلول - عمارة المساعي المشكورة</span>
                  </div>
                </li>
                <li className="flex gap-3.5 items-start">
                  <Phone className="text-brand-teal mt-0.5 shrink-0" size={20} />
                  <div>
                    <strong className="block mb-1">أرقام الهواتف الأرضي والمحمول:</strong>
                    <span className="text-brand-gray-dark text-xs font-sans block">048-3445807</span>
                    <span className="text-brand-gray-dark text-xs font-sans block mt-1">01000141542</span>
                  </div>
                </li>
                <li className="flex gap-3.5 items-start">
                  <Clock className="text-brand-teal mt-0.5 shrink-0" size={20} />
                  <div>
                    <strong className="block mb-1">ساعات العمل والكشف:</strong>
                    <span className="text-brand-gray-dark text-xs leading-relaxed">السبت – الخميس من الساعة 9:00 صباحاً حتى 12:00 ظهراً. (الجمعة: مغلق)</span>
                  </div>
                </li>
                <li className="flex gap-3.5 items-start">
                  <MessageSquare className="text-brand-teal mt-0.5 shrink-0" size={20} />
                  <div>
                    <strong className="block mb-1">خدمة الواتساب:</strong>
                    <span className="text-brand-gray-dark text-xs leading-relaxed">متاحة لتأكيد وتنسيق المواعيد والعمليات الجراحية على مدار الساعة.</span>
                  </div>
                </li>
              </ul>
            </Card>

            <Card className="bg-brand-blue/5 border border-brand-blue/10 p-6 flex gap-3.5 items-start">
              <AlertCircle size={20} className="text-brand-blue shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-brand-blue mb-1">ملاحظة طبية هامة</h4>
                <p className="text-xs text-brand-gray-dark leading-relaxed">
                  الحالات الطارئة وجروح العين الطارئة تستقبل فوراً دون حجز مسبق خلال ساعات عمل العيادة للتنسيق والإسعاف السريع.
                </p>
              </div>
            </Card>
          </div>

          {/* Booking Widget Column */}
          <div id="booking" className="lg:col-span-2 scroll-mt-24">
            <BookingForm />
          </div>
        </div>

        {/* Map Location card with live video background */}
        <div className="w-full">
          <h3 className="text-2xl font-bold text-navy mb-4 border-r-4 border-primary pr-3 font-heading">موقع العيادة الجغرافي بأشمون</h3>
          <Card className="p-0 overflow-hidden border border-white/20 relative shadow-2xl h-[480px] rounded-[28px]">
            {/* Live Location Video Background */}
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            >
              <source src="./assets/location_video.mp4" type="video/mp4" />
            </video>

            {/* Ambient Dark Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b2230]/90 via-[#0b2230]/50 to-[#0b2230]/40 pointer-events-none" />

            {/* High-Contrast Glassmorphism Text Card */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 sm:p-10">
              <div className="bg-[#0b2230]/85 backdrop-blur-md p-6 sm:p-8 rounded-[24px] border border-white/20 shadow-2xl text-center max-w-lg w-full">
                <div className="w-14 h-14 bg-primary/20 border border-primary/40 rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#2dd4bf] shadow-lg">
                  <MapPin size={28} className="animate-bounce" />
                </div>
                <h4 className="text-2xl sm:text-3xl font-extrabold text-white font-heading mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  فرع أشمون - شارع سعد زغلول
                </h4>
                <p className="text-sm sm:text-base text-white/95 leading-[1.8] font-medium mb-6 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
                  موقع متميز بوسط مدينة أشمون، المنوفية. عمارة المساعي المشكورة الدور الأول فوق جني سويت.
                </p>
                <a 
                  href="https://maps.google.com/?q=أشمون+شارع+سعد+زغلول" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 bg-[#0A7C86] hover:bg-[#075c64] text-white font-bold h-[54px] px-8 rounded-[16px] transition-all text-sm sm:text-base shadow-xl font-heading active:scale-95 border border-white/20"
                >
                  <MapPin size={18} />
                  <span>فتح الموقع الجغرافي على خرائط Google</span>
                </a>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
