import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Microscope, Eye, Activity, MessageCircle, User, Phone, Stethoscope, FileText } from 'lucide-react';
import { sendWhatsApp } from '../../utils/whatsapp';
import { useForm } from 'react-hook-form';

const fadeUp: any = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] as any },
  }),
};

const examinations = [
  {
    icon: Microscope,
    title: 'تصوير القرنية (Pentacam)',
    desc: 'تصوير دقيق لشكل القرنية وقياس سماكتها وانحراف محاورها بتقنية Scheimpflug ثلاثية الأبعاد، ضروري قبل عمليات تصحيح النظر.',
    tag: 'تشخيص متقدم',
    image: './assets/pentacam.jpg',
  },
  {
    icon: Eye,
    title: 'قياس عدسة العين (IOL Master)',
    desc: 'قياس دقيق لأبعاد العين لحساب قوة العدسة المناسبة قبل عملية إزالة المياه البيضاء وزرع العدسة الصناعية.',
    tag: 'قبل الجراحة',
    image: './assets/iol-master.jpg',
  },
  {
    icon: Activity,
    title: 'موجات صوتية على العين',
    desc: 'استخدام الموجات فوق الصوتية لقياس طول محور العين وفحص الجسم الزجاجي والشبكية في الحالات التي لا يمكن فيها رؤية قاع العين.',
    tag: 'فحص شامل',
    image: './assets/ultrasound.jpg',
  },
  {
    icon: Microscope,
    title: 'تصوير قاع العين بالفلورسين',
    desc: 'حقن صبغة الفلورسين لتصوير الأوعية الدموية في الشبكية لتشخيص اعتلال الشبكية السكري، الانسداد الوريدي، والتنكس البقعي.',
    tag: 'شبكية العين',
    image: './assets/fluorescein.jpg',
  },
  {
    icon: Eye,
    title: 'تصوير قاع العين بالألوان',
    desc: 'تصوير مفصل لقاع العين وتوثيق أي تغيرات في الشبكية والعصب البصري بالأشعة الملونة عالية الدقة.',
    tag: 'توثيق طبي',
    image: './assets/fundus-color.jpg',
  },
  {
    icon: Activity,
    title: 'أشعة مقطعية للشبكية (OCT)',
    desc: 'تقنية التصوير المقطعي التوافقي لرصد طبقات الشبكية بدقة عالية جداً لتشخيص الغشاء، الثقب البقعي، وانفصال الطبقات.',
    tag: 'أشعة مقطعية',
    image: './assets/oct-retina.jpg',
  },
  {
    icon: Activity,
    title: 'أشعة مقطعية للعصب البصري (OCT)',
    desc: 'قياس سماكة ألياف العصب البصري لمتابعة مرضى الجلوكوما (المياه الزرقاء) ورصد أي تدهور في أعصاب الشبكية.',
    tag: 'عصب بصري',
    image: './assets/oct-nerve.jpg',
  },
];

type FormData = { name: string; phone: string; service: string; note: string };

const QuickBooking: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    sendWhatsApp({ name: data.name, phone: data.phone, service: data.service, notes: data.note });
    reset();
  };

  return (
    <div className="bg-white rounded-[24px] p-8 border border-border shadow-card text-right">
      <h3 className="font-bold text-navy text-2xl mb-2 font-heading">احجز موعد فحص</h3>
      <p className="text-sm text-muted mb-6 leading-[1.8]">سجّل بياناتك وسيتواصل معك الفريق الطبي فوراً لتأكيد الكشف</p>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm font-bold text-navy mb-2 flex items-center gap-2">
            <User size={16} className="text-primary" />
            <span>الاسم الكامل *</span>
          </label>
          <input
            {...register('name', { required: true })}
            placeholder="أدخل اسمك الثلاثي"
            className={`w-full bg-slate-50 text-navy placeholder-slate-400 border ${errors.name ? 'border-red-500' : 'border-slate-300'} h-[56px] px-5 rounded-[16px] text-base outline-none focus:border-primary focus:bg-white transition-all font-medium`}
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-navy mb-2 flex items-center gap-2">
            <Phone size={16} className="text-primary" />
            <span>رقم الهاتف *</span>
          </label>
          <input
            {...register('phone', { required: true })}
            placeholder="01000000000"
            dir="ltr"
            className={`w-full bg-slate-50 text-navy placeholder-slate-400 border ${errors.phone ? 'border-red-500' : 'border-slate-300'} h-[56px] px-5 rounded-[16px] text-base outline-none focus:border-primary focus:bg-white transition-all font-medium text-right`}
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-navy mb-2 flex items-center gap-2">
            <Stethoscope size={16} className="text-primary" />
            <span>نوع الفحص المطلوبة *</span>
          </label>
          <select
            {...register('service', { required: true })}
            className={`w-full bg-slate-50 text-navy border ${errors.service ? 'border-red-500' : 'border-slate-300'} h-[56px] px-5 rounded-[16px] text-base outline-none focus:border-primary focus:bg-white transition-all font-medium cursor-pointer`}
          >
            <option value="" className="text-slate-500">اختر نوع الفحص المطلوب</option>
            {examinations.map((e) => <option key={e.title} value={e.title}>{e.title}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-navy mb-2 flex items-center gap-2">
            <FileText size={16} className="text-primary" />
            <span>ملاحظات إضافية (اختياري)</span>
          </label>
          <textarea
            {...register('note')}
            placeholder="أية ملاحظات أو أعراض ترغب في توضيحها"
            rows={3}
            className="w-full bg-slate-50 text-navy placeholder-slate-400 border border-slate-300 rounded-[16px] p-4 text-base outline-none focus:border-primary focus:bg-white transition-all resize-none font-medium leading-[1.8]"
          />
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2.5 bg-[#0A7C86] hover:bg-[#075c64] text-white font-bold h-[56px] px-8 rounded-[16px] transition-all text-base shadow-md cursor-pointer font-heading"
        >
          <MessageCircle size={20} />
          <span>تأكيد الحجز عبر واتساب</span>
        </button>
      </form>
    </div>
  );
};

export const Examinations: React.FC = () => {
  return (
    <div>
      {/* Hero Header */}
      <section className="relative py-[80px] md:py-[100px] bg-[#0b2230] text-white overflow-hidden border-b border-white/10 text-right pt-[140px]">
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="space-y-6">
            <span className="inline-block bg-white/10 text-[#2dd4bf] text-xs font-bold px-4 py-2 rounded-full border border-white/15">الفحوصات والأشعة الطبية</span>
            <h1 className="text-4xl md:text-[48px] font-black text-white mb-6 font-heading">الفحوصات والأشعة التشخيصية</h1>
            <p className="text-lg text-white/80 max-w-2xl leading-[1.8] font-light">
              يضم مركز مودة جميع فحوصات وأشعات العيون اللازمة للتشخيص الدقيق لمختلف أمراض العيون باستخدام أحدث الأجهزة الطبية المعتمَدة.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-[80px] md:py-[100px] bg-bg text-right">
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="grid xl:grid-cols-3 gap-10">
            {/* Examinations Grid (32px Gap) */}
            <div className="xl:col-span-2">
              <div className="grid sm:grid-cols-2 gap-8">
                {examinations.map((exam, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={i % 2}
                    className="group bg-white rounded-[20px] overflow-hidden shadow-card hover:shadow-card-hover transition-cinematic hover:-translate-y-1.5 border border-border flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-60 sm:h-64 overflow-hidden bg-[#0b2230]">
                        <img src={exam.image} alt={exam.title} className="w-full h-full object-cover object-bottom group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent pointer-events-none" />
                        <span className="absolute top-4 right-4 bg-[#0A7C86] text-white text-xs font-bold px-3.5 py-1.5 rounded-full z-10">{exam.tag}</span>
                      </div>
                      
                      {/* 32px Card Padding */}
                      <div className="p-8">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-9 h-9 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                            <exam.icon size={18} className="text-primary" />
                          </div>
                          <h3 className="font-bold text-navy text-lg leading-snug font-heading">{exam.title}</h3>
                        </div>
                        <p className="text-sm text-muted leading-[1.8] font-normal">{exam.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Sidebar Booking */}
            <div className="xl:col-span-1">
              <div className="sticky top-24 space-y-8">
                <QuickBooking />
                <div className="bg-white rounded-[20px] p-8 border border-border shadow-card">
                  <h4 className="font-bold text-navy mb-6 text-lg font-heading border-r-2 border-primary pr-3">لماذا تختار فحوصاتنا؟</h4>
                  {[
                    'أحدث أجهزة الفحص والتشخيص المعتمدة',
                    'نتائج تقارير دقيقة ومفصلة',
                    'تقارير طبية رسمية معتمدة',
                    'أطباء متخصصون لتفسير النتائج',
                    'أسعار تنافسية ومناسبة للجميع'
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 py-3 border-b border-slate-100 last:border-0">
                      <CheckCircle2 size={16} className="text-primary shrink-0" />
                      <span className="text-sm text-navy/85 font-medium">{item}</span>
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
