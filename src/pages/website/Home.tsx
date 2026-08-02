import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronLeft, CheckCircle2, Award, Microscope,
  ShieldCheck, Users, Star, MessageCircle, ArrowLeft,
  Eye, Heart, Activity, Zap, User, Phone,
  FileText, Stethoscope
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { sendWhatsApp } from '../../utils/whatsapp';

// --- Synchronized Staggered Entrance Animations ---
const heroDescVariant: any = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 2.8, ease: [0.16, 1, 0.3, 1] }
  }
};

const heroButtonsVariant: any = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 3.3, ease: [0.16, 1, 0.3, 1] }
  }
};

const cardContainerVariant: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const cardChildVariant: any = {
  hidden: { opacity: 0, y: 35, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] }
  }
};

// --- Ultra-Smooth Bug-Free Typewriter Component ---
const TypewriterTitle: React.FC<{ text: string; speed?: number; delay?: number }> = ({
  text,
  speed = 75,
  delay = 300
}) => {
  const [charIndex, setCharIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let timer: any;
    const startTimer = setTimeout(() => {
      timer = setInterval(() => {
        setCharIndex((prev) => {
          if (prev >= text.length) {
            clearInterval(timer);
            setIsDone(true);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    }, delay);

    return () => {
      clearTimeout(startTimer);
      if (timer) clearInterval(timer);
    };
  }, [text, speed, delay]);

  const currentText = text.substring(0, charIndex);

  return (
    <span className="inline-flex items-center flex-wrap">
      <span>{currentText}</span>
      {!isDone && (
        <span className="inline-block w-[4px] h-[0.85em] bg-primary-light mr-2 align-middle animate-pulse rounded-full shadow-[0_0_10px_#18b6c4]" />
      )}
    </span>
  );
};

// --- Counter Component ---
const Counter: React.FC<{ target: number; suffix?: string; prefix?: string }> = ({ target, suffix = '', prefix = '' }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let current = 0;
        const step = target / 60;
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = prefix + Math.floor(current).toLocaleString('ar') + suffix;
          if (current >= target) clearInterval(timer);
        }, 25);
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, suffix, prefix]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
};

// --- Services Cards (32px Padding, 32px Gaps) ---
const services = [
  {
    icon: Microscope,
    title: 'الفحوصات والأشعة',
    desc: 'يضم المركز جميع فحوصات وأشعات العيون اللازمة للتشخيص الدقيق باستخدام أحدث الأجهزة الطبية.',
    items: ['تصوير القرنية Pentacam', 'أشعة مقطعية للشبكية OCT', 'تصوير قاع العين بالفلورسين', 'موجات صوتية على العين'],
    link: '/examinations',
    color: 'from-primary to-primary-dark',
    bg: 'bg-primary-50',
    image: './assets/diagnostics.jpg',
  },
  {
    icon: Zap,
    title: 'عمليات العيون',
    desc: 'جناح عمليات بأحدث الأجهزة وأنظمة التعقيم لإجراء مختلف عمليات العيون بأعلى معايير الجودة.',
    items: ['إزالة المياه البيضاء بالفيكو', 'زراعة العدسات', 'عمليات المياه الزرقاء', 'عمليات الشبكية'],
    link: '/surgeries',
    color: 'from-secondary to-secondary-dark',
    bg: 'bg-secondary/5',
    image: './assets/interior.jpg',
  },
  {
    icon: Eye,
    title: 'العيادات والكشوفات',
    desc: 'عيادات مجهزة بأحدث أجهزة الكشف لمتابعة جميع أمراض العيون وخدمات كشف النظارات والعدسات.',
    items: ['كشف النظارات الطبية', 'العدسات اللاصقة', 'متابعة مرضى السكر', 'متابعة الأطفال'],
    link: '/clinics',
    color: 'from-primary-light to-primary',
    bg: 'bg-accent',
    image: './assets/eye-clinics.jpg',
  },
];

// --- Why Us Features ---
const features = [
  { icon: Award, title: 'استشاريون متخصصون', desc: 'نخبة من استشاريي طب وجراحة العيون من القصر العيني والمنوفية.' },
  { icon: Microscope, title: 'أحدث الأجهزة الطبية', desc: 'أحدث أجهزة الفحص والتشخيص مثل Pentacam وOCT.' },
  { icon: ShieldCheck, title: 'تعقيم وفق أعلى المعايير', desc: 'بروتوكولات تعقيم صارمة وغرف عمليات معيارية.' },
  { icon: Heart, title: 'رعاية متكاملة', desc: 'متابعة دقيقة قبل وبعد العمليات مع خدمة طوارئ.' },
  { icon: Activity, title: 'نتائج دقيقة', desc: 'دقة تشخيصية عالية تضمن أفضل مسار علاجي.' },
  { icon: Users, title: 'أسعار مناسبة', desc: 'خدمات طبية عالية الجودة بأسعار تنافسية ومناسبة.' },
];

// --- Testimonials (32px Padding, 16px Stars Gap, 24px Text-Name Gap, 32px Grid Gap) ---
const testimonials = [
  { name: 'عبد الله طارق', text: 'الحمد لله قمت بإجراء عملية إزالة المياه البيضاء بالمركز والرعاية كانت ممتازة والأطباء قمة في الاحتراف.', rating: 5 },
  { name: 'نهى مصطفى', text: 'أفضل مركز لتصحيح الإبصار وفحوصات القرنية في المنوفية، الخدمة قمة في الدقة والسرعة.', rating: 5 },
  { name: 'المهندس ياسر محمد', text: 'رعاية ممتازة ومتابعة دقيقة لوالدي المريض بالسكري والشبكية. أشكر الطاقم الطبي بأكمله.', rating: 5 },
  { name: 'سمر إبراهيم', text: 'تجربة رائعة جداً، الأطباء محترفون والأجهزة حديثة والأسعار مناسبة جداً مقارنة بالعيادات الأخرى.', rating: 5 },
];

type FormData = { name: string; phone: string; service: string; note: string };

// --- CLEAN HUMAN MEDICAL BOOKING FORM (32px Padding, 56px Inputs & Buttons, 16px Radius) ---
const BookingForm: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    sendWhatsApp({
      name: data.name,
      phone: data.phone,
      service: data.service,
      notes: data.note,
    });
    reset();
  };

  return (
    <div className="bg-white rounded-[24px] overflow-hidden shadow-2xl border border-primary/20 text-right transition-all">
      {/* Integrated Dark Medical Header Bar */}
      <div className="bg-[#0b2230] p-8 sm:p-10 text-white border-b border-white/10">
        <div className="text-right">
          <h3 className="text-2xl sm:text-[30px] font-bold text-white font-heading mb-2">حجز كشف طبي</h3>
          <p className="text-white/75 text-base leading-[1.8] font-light">سجّل بياناتك وسيتواصل معك الفريق الطبي لتأكيد الموعد</p>
        </div>
      </div>

      {/* Form Fields Section (32px Padding) */}
      <form onSubmit={handleSubmit(onSubmit)} className="p-8 sm:p-10 bg-white space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-navy mb-2 flex items-center gap-2">
              <User size={18} className="text-primary" />
              <span>الاسم الكامل *</span>
            </label>
            <input
              {...register('name', { required: true })}
              placeholder="أدخل اسمك الثلاثي"
              className={`w-full bg-slate-50/80 text-navy placeholder-slate-400 border ${errors.name ? 'border-red-500' : 'border-slate-300'} h-[56px] px-5 rounded-[16px] text-base outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/15 transition-all font-medium`}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-navy mb-2 flex items-center gap-2">
              <Phone size={18} className="text-primary" />
              <span>رقم الهاتف *</span>
            </label>
            <input
              {...register('phone', { required: true })}
              placeholder="01000000000"
              dir="ltr"
              className={`w-full bg-slate-50/80 text-navy placeholder-slate-400 border ${errors.phone ? 'border-red-500' : 'border-slate-300'} h-[56px] px-5 rounded-[16px] text-base outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/15 transition-all font-medium text-right`}
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-bold text-navy mb-2 flex items-center gap-2">
              <Stethoscope size={18} className="text-primary" />
              <span>الخدمة المطلوبة *</span>
            </label>
            <select
              {...register('service', { required: true })}
              className={`w-full bg-slate-50/80 text-navy border ${errors.service ? 'border-red-500' : 'border-slate-300'} h-[56px] px-5 rounded-[16px] text-base outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/15 transition-all font-medium cursor-pointer`}
            >
              <option value="" className="text-slate-500">اختر نوع الخدمة الطبية المطلوبة</option>
              <option value="فحوصات وأشعة" className="text-navy">فحوصات وأشعة (Pentacam / OCT)</option>
              <option value="عملية المياه البيضاء" className="text-navy">عملية المياه البيضاء (الفيكو)</option>
              <option value="زراعة عدسات" className="text-navy">زراعة عدسات تصحيح الإبصار</option>
              <option value="عملية المياه الزرقاء" className="text-navy">عملية المياه الزرقاء (الجلوكوما)</option>
              <option value="عملية الحول" className="text-navy">عملية تصحيح الحول</option>
              <option value="كشف نظر" className="text-navy">كشف نظر ونظارات طبية</option>
              <option value="عدسات لاصقة" className="text-navy">فحوصات وتركيب عدسات لاصقة</option>
              <option value="استشارة عامة" className="text-navy">استشارة طبيب عيون</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-navy mb-2 flex items-center gap-2">
            <FileText size={18} className="text-primary" />
            <span>ملاحظات إضافية أو أعراض (اختياري)</span>
          </label>
          <textarea
            {...register('note')}
            placeholder="اكتب أية أعراض تشتكي منها أو تفاصيل إضافية ترغب في إبلاغ الطبيب بها"
            rows={3}
            className="w-full bg-slate-50/80 text-navy placeholder-slate-400 border border-slate-300 rounded-[16px] p-5 text-base outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/15 transition-all resize-none font-medium leading-[1.8]"
          />
        </div>

        {/* Action CTA Button - 56px Height, 32px Padding, 16px Radius */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center gap-3 bg-[#0A7C86] hover:bg-[#075c64] text-white font-bold text-base h-[56px] px-8 rounded-[16px] shadow-md active:scale-[0.99] transition-all cursor-pointer font-heading"
        >
          <MessageCircle size={20} />
          <span>تأكيد الكشف وحجز الموعد الآن عبر الواتساب</span>
        </button>
      </form>
    </div>
  );
};

// --- Home Page Component ---
export const Home: React.FC = () => {
  const navigate = useNavigate();

  const scrollToBooking = () => {
    const el = document.getElementById('booking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/contact');
    }
  };

  const scrollToServices = () => {
    const el = document.getElementById('services-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/services');
    }
  };

  return (
    <div className="flex flex-col">

      {/* --- HERO SECTION: 90vh Height, 32px Vertical Spacing, 72px H1 Scale --- */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-navy pb-24 sm:pb-32 pt-[140px] md:pt-[160px]">
        {/* Video Background */}
        <video
          autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover scale-105"
          poster="./assets/interior.jpg"
        >
          <source src="./assets/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Dark Overlay for Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b2230] via-[#0b2230]/80 to-[#0b2230]/45" />

        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-10 pb-12 w-full">
          <div className="max-w-3xl text-right space-y-8">

            {/* Main Title - 72px H1 Scale */}
            <h1 className="text-4xl sm:text-5xl lg:text-[72px] font-black text-white leading-tight font-heading mb-8">
              <div className="block">
                <TypewriterTitle text="مركز مودة لجراحات العيون" speed={75} delay={300} />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.4, duration: 0.6 }}
                className="block text-2xl sm:text-3xl md:text-[48px] text-primary-light font-bold mt-4 tracking-wide opacity-95"
              >
                بأشمون
              </motion.div>
            </h1>

            {/* Subtitle - 18px Paragraph, 1.8 Line Height */}
            <motion.p
              variants={heroDescVariant}
              initial="hidden"
              animate="visible"
              className="text-lg text-white/90 leading-[1.8] mb-8 max-w-2xl font-light"
            >
              أول مركز متخصص لطب وجراحة العيون بمدينة أشمون، يقدم خدمات التشخيص الدقيق، والفحوصات، والعمليات، والعيادات بأحدث الأجهزة الطبية وعلى يد نخبة من استشاريي طب وجراحة العيون بإشراف د. محمد عمار.
            </motion.p>

            {/* Action Buttons - 56px Height, 32px Horizontal Padding, 16px Radius, 20px Gap */}
            <motion.div
              variants={heroButtonsVariant}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row gap-[20px] pt-2"
            >
              <motion.button
                onClick={scrollToBooking}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center justify-center gap-3 bg-[#0A7C86] hover:bg-[#075c64] text-white font-bold text-base h-[56px] px-8 rounded-[16px] shadow-md transition-all duration-300 cursor-pointer font-heading"
              >
                <span>احجز موعدك الآن</span>
                <ChevronLeft size={20} className="group-hover:-translate-x-2 transition-transform duration-300" />
              </motion.button>

              <motion.button
                onClick={scrollToServices}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center justify-center gap-3 bg-white/15 hover:bg-white/25 backdrop-blur-md text-white font-bold text-base h-[56px] px-8 rounded-[16px] border border-white/30 shadow-sm transition-all duration-300 cursor-pointer font-heading"
              >
                <span>تعرف على خدماتنا</span>
                <ChevronLeft size={18} className="group-hover:-translate-x-2 transition-transform duration-300" />
              </motion.button>
            </motion.div>
          </div>

          {/* Stats Bar Cards - 3 Columns, 32px Gaps */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { n: 15, suf: '+', label: 'سنة خبرة' },
              { n: 10000, suf: '+', label: 'عملية ناجحة' },
              { n: 98, suf: '%', label: 'رضا المرضى' },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 3.8 + i * 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white/10 backdrop-blur-md rounded-[20px] p-6 border border-white/15 text-center hover:bg-white/15 transition-cinematic hover:-translate-y-1"
              >
                <p className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
                  <Counter target={s.n} suffix={s.suf} />
                </p>
                <p className="text-white/85 text-sm sm:text-base mt-2 font-medium">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Curved Wave Transition SVG to White Background */}
        <div className="absolute bottom-0 inset-x-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
          <svg
            className="relative block w-full h-12 sm:h-16 lg:h-20 text-white"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,40 L1200,120 L0,120 Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </section>

      {/* --- WHY US SECTION: 80px-100px Padding, 1200px Max-Width --- */}
      <section className="py-[80px] md:py-[100px] bg-white relative z-20">
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-primary font-bold text-xs tracking-widest mb-3 uppercase font-heading block">لماذا مركز مودة؟</span>
              <h2 className="text-3xl md:text-[48px] font-bold text-navy mb-6 leading-tight font-heading">
                رعاية طبية متكاملة بأحدث <span className="text-gradient">التقنيات الطبية</span>
              </h2>
              <p className="text-lg text-muted leading-[1.8] mb-10 font-light">
                يضم مركز مودة نخبة من استشاريي طب وجراحة العيون من المنوفية والقصر العيني، إلى جانب فريق تمريض ذي خبرة وكفاءة عالية، لنقدم رعاية طبية متكاملة باستخدام أحدث الأجهزة وبأسعار تنافسية.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {features.map((f, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex items-start gap-4 p-5 rounded-[20px] bg-accent hover:bg-primary-50/60 transition-cinematic border border-border/50 group"
                  >
                    <div className="w-11 h-11 rounded-2xl bg-gradient-brand flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-card">
                      <f.icon size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-navy text-base font-heading mb-1">{f.title}</h3>
                      <p className="text-xs text-muted leading-[1.7]">{f.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/15 to-secondary/15 rounded-[32px] blur-2xl" />
              <div className="relative rounded-[24px] overflow-hidden shadow-hero border border-border">
                <video
                  autoPlay loop muted playsInline
                  className="w-full h-[480px] object-cover"
                  poster="./assets/logo.jpg"
                >
                  <source src="./assets/logo-video.mp4" type="video/mp4" />
                </video>
                <div className="absolute bottom-6 right-6 bg-glass rounded-[18px] p-4 shadow-premium border border-border/60">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-brand flex items-center justify-center">
                      <CheckCircle2 size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="text-navy font-bold text-sm font-heading">معتمد ومرخص</p>
                      <p className="text-muted text-xs">وزارة الصحة المصرية</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- SERVICES SECTION: 80px-100px Section Padding, 32px Cards Padding & Gap --- */}
      <section id="services-section" className="py-[80px] md:py-[100px] bg-accent scroll-mt-20">
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block text-primary font-bold text-xs tracking-widest mb-3 uppercase font-heading">خدماتنا الطبية</span>
            <h2 className="text-3xl md:text-[48px] font-bold text-navy font-heading mb-4">
              خدمات طب وجراحة العيون <span className="text-gradient">المتكاملة</span>
            </h2>
          </motion.div>

          <motion.div
            variants={cardContainerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {services.map((s, i) => (
              <motion.div
                key={i}
                variants={cardChildVariant}
                className="group bg-white rounded-[20px] overflow-hidden shadow-card hover:shadow-card-hover transition-cinematic hover:-translate-y-2 border border-border flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-56 overflow-hidden">
                    <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out" loading="lazy" />
                    <div className={`absolute inset-0 bg-gradient-to-t ${s.color} opacity-60`} />
                    <div className="absolute top-5 right-5 w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
                      <s.icon size={24} className="text-white" />
                    </div>
                  </div>

                  {/* 32px Padding Inside Card */}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-navy mb-3 font-heading">{s.title}</h3>
                    <p className="text-base text-muted leading-[1.8] mb-6">{s.desc}</p>
                    <ul className="space-y-3 mb-6">
                      {s.items.map((item, j) => (
                        <li key={j} className="flex items-center gap-2.5 text-sm text-navy/85 font-medium">
                          <CheckCircle2 size={16} className="text-primary shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="px-8 pb-8 pt-0">
                  <Link
                    to={s.link}
                    className="group/btn inline-flex items-center gap-2.5 text-primary font-bold text-base hover:gap-4 transition-all duration-300 font-heading"
                  >
                    عرض جميع الخدمات
                    <ArrowLeft size={18} className="group-hover/btn:-translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- STANDALONE LEAD CAPTURE BOOKING SECTION --- */}
      <section id="booking" className="py-[80px] md:py-[100px] bg-gradient-to-b from-accent via-accent/80 to-white scroll-mt-20 relative overflow-hidden pb-32">
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10 relative z-10">
          <div className="max-w-4xl mx-auto">
            <BookingForm />
          </div>
        </div>

        {/* Bottom Curved Wave Transition to White Testimonials Section */}
        <div className="absolute bottom-0 inset-x-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
          <svg
            className="relative block w-full h-12 sm:h-16 lg:h-20 text-white"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,40 L1200,120 L0,120 Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </section>

      {/* --- TESTIMONIALS SECTION: 80px-100px Section Padding, 32px Cards Padding & 32px Gap --- */}
      <section className="py-[80px] md:py-[100px] bg-white">
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block text-primary font-bold text-xs tracking-widest mb-3 uppercase font-heading">آراء مرضانا</span>
            <h2 className="text-3xl md:text-[48px] font-bold text-navy font-heading mb-4">ماذا يقول <span className="text-gradient">مرضانا</span></h2>
          </motion.div>

          {/* Testimonial Cards Grid (32px Gap) */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-accent rounded-[20px] p-8 border border-border hover:shadow-card transition-cinematic hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  {/* 16px Space Between Stars and Text */}
                  <div className="flex gap-1.5 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} size={16} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>

                  <p className="text-base text-navy/85 leading-[1.8] italic">"{t.text}"</p>
                </div>

                {/* 24px Space Between Text and Client Name */}
                <div className="flex items-center gap-3.5 mt-6 pt-4 border-t border-border/50">
                  <div className="w-10 h-10 rounded-full bg-gradient-brand flex items-center justify-center text-white font-bold text-base shrink-0">
                    {t.name[0]}
                  </div>
                  <p className="font-bold text-navy text-base font-heading">{t.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT STRIP: 80px Padding, 1200px Container --- */}
      <section className="py-[70px] bg-navy text-white">
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-right">
              <h2 className="text-2xl sm:text-[30px] font-bold font-heading mb-2">هل لديك استفسار طارئ؟</h2>
              <p className="text-white/70 text-base leading-[1.8] font-light">فريقنا الطبي والتمريضي جاهز للإجابة على جميع أسئلتك فوراً</p>
            </div>
            <div className="flex flex-wrap gap-5">
              <a
                href="tel:01000141542"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold h-[56px] px-8 rounded-[16px] border border-white/20 transition-cinematic text-base"
                dir="ltr"
              >
                01000141542
              </a>
              <a
                href="https://wa.me/201000141542"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold h-[56px] px-8 rounded-[16px] transition-cinematic text-base shadow-md"
              >
                <MessageCircle size={20} />
                تواصل عبر واتساب
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
