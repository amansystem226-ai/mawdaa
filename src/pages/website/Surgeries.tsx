import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, MessageCircle, User, Phone, FileText } from 'lucide-react';
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

const surgeries = [
  {
    title: 'إزالة المياه البيضاء بالموجات فوق الصوتية (الفاكو)',
    desc: 'عملية استئصال عدسة العين المعتمة واستبدالها بعدسة صناعية شفافة بتقنية الموجات فوق الصوتية.',
    duration: '20-30 دقيقة',
    recovery: '1-3 أسابيع',
    image: './assets/phaco-surgery.jpg',
  },
  {
    title: 'زراعة العدسات وعدسات تصحيح الإبصار',
    desc: 'زراعة عدسات داخل العين متعددة البؤر أو توريك لتصحيح قصر وطول النظر والاستغناء عن النظارات.',
    duration: '30-45 دقيقة',
    recovery: '2-4 أسابيع',
    image: './assets/lens-surgery.jpg',
  },
  {
    title: 'عمليات المياه الزرقاء (الجلوكوما)',
    desc: 'تخفيض ضغط العين جراحياً للحفاظ على العصب البصري ومنع تدهور البصر عند مرضى الجلوكوما.',
    duration: '45-90 دقيقة',
    recovery: '4-6 أسابيع',
    image: './assets/glaucoma-surgery.jpg',
  },
  {
    title: 'عمليات تصحيح الحول',
    desc: 'تصحيح انحراف العينين بتعديل طول وموضع عضلات العين لاستعادة المحاذاة والرؤية الثنائية.',
    duration: '45-60 دقيقة',
    recovery: '1-2 أسابيع',
    image: './assets/strabismus-surgery.jpg',
  },
  {
    title: 'عمليات الشبكية والجسم الزجاجي',
    desc: 'معالجة انفصال الشبكية ونزيف الجسم الزجاجي والأغشية بأحدث تقنيات الجراحة الدقيقة.',
    duration: '60-120 دقيقة',
    recovery: '2-6 أسابيع',
    image: './assets/retina-surgery.jpg',
  },
  {
    title: 'جراحات عيون الأطفال',
    desc: 'عمليات متخصصة لأمراض عيون الأطفال كالحول والمياه البيضاء الخلقية وانسداد القناة الدمعية.',
    duration: '30-60 دقيقة',
    recovery: '2-4 أسابيع',
    image: './assets/clinic-room.jpg',
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
      department: 'surgeries',
      service: 'قسم العمليات الجراحية',
      preferredDate: new Date().toISOString().split('T')[0],
      preferredTime: '10:00 AM - 12:00 PM',
      notes: data.note || ''
    });

    sendWhatsApp({ name: data.name, phone: data.phone, service: 'قسم العمليات الجراحية', notes: data.note });
    reset();
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-border shadow-card text-right">
      <h3 className="font-black text-navy text-xl mb-2 font-heading">حجز استشارة جراحية</h3>
      <p className="text-xs text-muted mb-5 leading-relaxed">سجّل بياناتك وسيتواصل معك الفريق الطبي لمناقشة الحالة وتأكيد العملية</p>

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
            <span>تفاصيل الحالة (اختياري)</span>
          </label>
          <textarea
            {...register('note')}
            placeholder="أية تفاصيل حول العملية أو تاريخ الحالة المرضية"
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

export const Surgeries: React.FC = () => {
  return (
    <div>
      {/* Hero Header */}
      <section className="relative py-16 bg-[#0b2230] text-white overflow-hidden border-b border-white/10 text-right">
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <span className="inline-block bg-white/10 text-[#2dd4bf] text-xs font-bold px-4 py-1.5 rounded-full mb-4 border border-white/15">جناح العمليات المتطور</span>
            <h1 className="text-3xl md:text-5xl font-black text-white mb-4 font-heading">عمليات وجراحات العيون</h1>
            <p className="text-base text-white/80 max-w-2xl leading-relaxed font-light">
              جناح عمليات مجهز بأحدث الأجهزة وأنظمة التعقيم المعيارية لإجراء مختلف جراحات العيون بأعلى نسب النجاح والجودة.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-bg text-right">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid xl:grid-cols-3 gap-10">
            {/* Surgeries Grid */}
            <div className="xl:col-span-2">
              <div className="grid sm:grid-cols-2 gap-6">
                {surgeries.map((item, i) => (
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
                      <div className="relative h-44 overflow-hidden bg-slate-100">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/20 to-transparent" />
                      </div>
                      <div className="p-6">
                        <h3 className="font-bold text-navy text-base leading-snug mb-2 font-heading">{item.title}</h3>
                        <p className="text-xs text-muted leading-relaxed mb-4 font-normal">{item.desc}</p>
                        <div className="flex flex-wrap gap-3 text-xs text-navy/75 pt-3 border-t border-slate-100">
                          <span className="flex items-center gap-1 font-medium"><Clock size={13} className="text-primary" /> مدة العملية: {item.duration}</span>
                        </div>
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
                  <h4 className="font-bold text-navy mb-4 text-base font-heading">معايير جناح العمليات</h4>
                  {[
                    'أجهزة فيكو وزراعة عدسات ألمانية وحسابات دقيقة',
                    'غرف عمليات ذات تعقيم كلي وفق المعايير الطبية',
                    'طاقم تمريض وتخدير متمرس على أعلى مستوى',
                    'متابعة مجانية دقيقة بعد العملية لضمان التعافي',
                    'استشاريون متخصصون من المنوفية والقصر العيني'
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
