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
                    <span className="text-brand-gray-dark text-xs leading-relaxed">أشمون، المنوفية - شارع سعد زغلول - عمارة المساعي المشكورة - فوق جني سويت</span>
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
                    <span className="text-brand-gray-dark text-xs leading-relaxed">يومياً من الساعة 2:00 مساءً حتى الساعة 10:00 مساءً (ما عدا يوم الجمعة عطلة رسمية بالكامل).</span>
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

        {/* Map Location placeholder with premium styling */}
        <div className="w-full">
          <h3 className="text-xl font-bold text-brand-blue mb-4 border-r-4 border-brand-teal pr-3">موقع العيادة الجغرافي بأشمون</h3>
          <Card className="p-0 overflow-hidden border border-brand-gray/40 relative shadow-premium h-96">
            <div className="absolute inset-0 bg-brand-gray-light flex flex-col items-center justify-center text-center p-6 bg-cover bg-center" style={{ backgroundImage: "url('/assets/office.jpg')" }}>
              <div className="absolute inset-0 bg-brand-blue-dark/80 backdrop-blur-xs" />
              <div className="relative z-10 text-white max-w-md">
                <MapPin className="mx-auto text-brand-teal w-12 h-12 mb-4 animate-bounce" />
                <h4 className="text-lg font-bold mb-2">فرع أشمون - شارع سعد زغلول</h4>
                <p className="text-xs text-brand-teal-light/80 leading-relaxed mb-6">
                  موقع متميز بوسط مدينة أشمون، المنوفية. عمارة المساعي المشكورة الدور الأول فوق جني سويت.
                </p>
                <a 
                  href="https://maps.google.com/?q=أشمون+شارع+سعد+زغلول" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center font-bold px-6 py-2.5 bg-brand-teal text-white rounded-xl hover:bg-brand-teal-dark transition-all text-xs"
                >
                  فتح الموقع الجغرافي على خرائط Google
                </a>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
