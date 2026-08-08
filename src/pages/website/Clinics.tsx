import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Eye, UserCheck, MessageCircle, User, Phone, FileText } from 'lucide-react';
import { sendWhatsApp } from '../../utils/whatsapp';
import { useForm } from 'react-hook-form';
import { useApp } from '../../context/AppContext';

const fadeUp: any = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] as any },
  }),
};

const clinics = [
  {
    icon: Eye,
    title: 'عيادة كشف النظارات والقياسات الرقمية',
    desc: 'قياس النظر بالكمبيوتر وأحدث الأجهزة مع تحديد القياسات الدقيقة للنظارات والعدسات الطبية.',
    tag: 'كشف دوري',
    image: './assets/refraction-clinic.jpg',
  },
  {
    icon: UserCheck,
    title: 'عيادة متابعة الشبكية ومرضى السكري',
    desc: 'فحص دوري دقيق لشبكية العين لمرضى السكري ورصد أي اعتلال أو ترشيح مبكر لحماية البصر.',
    tag: 'متابعة سكري',
    image: './assets/diagnostics.jpg',
  },
  {
    icon: Eye,
    title: 'عيادة عيون الأطفال والحول',
    desc: 'تشخيص ومتابعة كسول العين، عيوب الإبصار عند الأطفال، والحول في المراحل المبكرة.',
    tag: 'عيون الأطفال',
    image: './assets/interior.jpg',
  },
  {
    icon: UserCheck,
    title: 'عيادة العدسات اللاصقة والقرنية',
    desc: 'فحوصات وتركيب العدسات اللاصقة الصلبة والصلبية لمرضى القرنية المخروطية وانحراف القرنية.',
    tag: 'عدسات خاصة',
    image: './assets/contact-lenses-clinic.jpg',
  },
];

type FormData = { name: string; phone: string; service: string; note: string };

const QuickBooking: React.FC = () => {
  const { addAppointment } = useApp();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    addAppointment({
      patientName: data.name,
      phone: data.phone,
      age: 30,
      department: 'clinics',
      service: 'قسم العيادات والكشوفات',
      preferredDate: new Date().toISOString().split('T')[0],
      preferredTime: '10:00 AM - 12:00 PM',
      notes: data.note || ''
    });

    sendWhatsApp({ name: data.name, phone: data.phone, service: 'قسم العيادات والكشوفات', notes: data.note });
    reset();
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-border shadow-card text-right">
      <h3 className="font-black text-navy text-xl mb-2 font-heading">حجز كشف عيادة</h3>
      <p className="text-xs text-muted mb-5 leading-relaxed">سجّل بياناتك وسيتواصل معك الفريق الطبي فوراً لتأكيد الموعد</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-navy mb-1.5 flex items-center gap-1.5">
            <User size={14} className="text-primary" />
            <span>الاسم الكامل *</span>
          </label>
          <input
            {...register('name', { required: true })}
            placeholder="أدخل اسمك الثلاثي"
            className={`w-full bg-slate-50 text-navy placeholder-slate-400 border ${errors.name ? 'border-red-500' : 'border-slate-300'} rounded-2xl px-4 py-3 text-sm outline-none focus:border-primary focus:bg-white transition-all font-medium`}
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-navy mb-1.5 flex items-center gap-1.5">
            <Phone size={14} className="text-primary" />
            <span>رقم الهاتف *</span>
          </label>
          <input
            {...register('phone', { required: true })}
            placeholder="01000000000"
            dir="ltr"
            className={`w-full bg-slate-50 text-navy placeholder-slate-400 border ${errors.phone ? 'border-red-500' : 'border-slate-300'} rounded-2xl px-4 py-3 text-sm outline-none focus:border-primary focus:bg-white transition-all font-medium text-right`}
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-navy mb-1.5 flex items-center gap-1.5">
            <FileText size={14} className="text-primary" />
            <span>ملاحظات أو أعراض (اختياري)</span>
          </label>
          <textarea
            {...register('note')}
            placeholder="أية أعراض تشتكي منها"
            rows={2}
            className="w-full bg-slate-50 text-navy placeholder-slate-400 border border-slate-300 rounded-2xl px-4 py-2.5 text-sm outline-none focus:border-primary focus:bg-white transition-all resize-none font-medium"
          />
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-[#0A7C86] hover:bg-[#075c64] text-white font-bold py-3.5 rounded-2xl transition-all text-sm shadow-md cursor-pointer font-heading"
        >
          <MessageCircle size={18} />
          <span>تأكيد الحجز عبر واتساب</span>
        </button>
      </form>
    </div>
  );
};

export const Clinics: React.FC = () => {
  return (
    <div>
      {/* Hero Header */}
      <section className="relative py-16 bg-[#0b2230] text-white overflow-hidden border-b border-white/10 text-right">
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <span className="inline-block bg-white/10 text-[#2dd4bf] text-xs font-bold px-4 py-1.5 rounded-full mb-4 border border-white/15">العيادات والكشوفات</span>
            <h1 className="text-3xl md:text-5xl font-black text-white mb-4 font-heading">عيادات العيون التخصصية</h1>
            <p className="text-base text-white/80 max-w-2xl leading-relaxed font-light">
              عيادات مجهزة بأحدث أجهزة الكشف لمتابعة كافة أمراض العيون، كشف النظارات، العدسات، ومتابعة مرضى السكري والأطفال.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-bg text-right">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid xl:grid-cols-3 gap-10">
            {/* Clinics Grid */}
            <div className="xl:col-span-2">
              <div className="grid sm:grid-cols-2 gap-6">
                {clinics.map((item, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={i % 2}
                    className="group bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border border-border flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-56 overflow-hidden bg-[#0b2230]">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover object-bottom group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent pointer-events-none" />
                        <span className="absolute top-3 right-3 bg-[#0A7C86] text-white text-xs font-bold px-3 py-1 rounded-full z-10">{item.tag}</span>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2.5 mb-3">
                          <div className="w-8 h-8 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                            <item.icon size={16} className="text-primary" />
                          </div>
                          <h3 className="font-bold text-navy text-base leading-tight font-heading">{item.title}</h3>
                        </div>
                        <p className="text-xs text-muted leading-relaxed font-normal">{item.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Sidebar Booking */}
            <div className="xl:col-span-1">
              <div className="sticky top-10 space-y-6">
                <QuickBooking />
                <div className="bg-white rounded-3xl p-6 border border-border shadow-card">
                  <h4 className="font-bold text-navy mb-4 text-base font-heading">خدمات العيادات المتميزة</h4>
                  {[
                    'كشف نظر رقمي دقيق بالنظارات والعدسات',
                    'متابعة دورية لمرضى السكري والشبكية',
                    'برامج متابعة خاصة لعيون الأطفال والحول',
                    'استشارات طبية متخصصة ومواعيد منتظمة',
                    'طاقم طبي واستشاري من القصر العيني'
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2.5 py-2.5 border-b border-slate-100 last:border-0">
                      <CheckCircle2 size={15} className="text-primary shrink-0" />
                      <span className="text-xs text-navy/85 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
