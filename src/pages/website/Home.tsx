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
import { useApp } from '../../context/AppContext';
import { NumberTicker } from '../../components/magicui/NumberTicker';
import { ShinyText } from '../../components/magicui/ShinyText';
import { Marquee } from '../../components/magicui/Marquee';

// --- Smooth Calm Typewriter Component ---
const TypewriterTitle: React.FC = () => {
  const [line1, setLine1] = useState('');
  const text1 = 'مركز مودة لجراحات العيون';

  useEffect(() => {
    let i1 = 0;
    const timer1 = setInterval(() => {
      if (i1 < text1.length) {
        i1++;
        setLine1(text1.substring(0, i1));
      } else {
        clearInterval(timer1);
      }
    }, 60);

    return () => { clearInterval(timer1); };
  }, []);

  return (
    <div className="block text-white font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-[50px] leading-snug tracking-tight [text-shadow:_0_3px_12px_rgba(0,0,0,0.9)]">
      {line1}
    </div>
  );
};

// --- Synchronized Entrance Animations ---
const heroDescVariant: any = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 2.6, ease: 'easeOut' }
  }
};

const heroButtonsVariant: any = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 3.0, ease: 'easeOut' }
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
    items: ['إزالة المياه البيضاء بالفاكو', 'زراعة العدسات', 'عمليات المياه الزرقاء', 'عمليات الشبكية'],
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
    video: './assets/clinics_video.mp4',
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
  const { addAppointment } = useApp();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (data: FormData) => {
    const defaultService = 'طلب كشف عيون عام';
    addAppointment({
      patientName: data.name,
      phone: data.phone,
      age: 30,
      department: 'clinics',
      service: defaultService,
      preferredDate: new Date().toISOString().split('T')[0],
      preferredTime: '10:00 AM - 12:00 PM',
      notes: data.note || ''
    });

    // 2. Send WhatsApp
    sendWhatsApp({
      name: data.name,
      phone: data.phone,
      service: defaultService,
      notes: data.note,
    });

    setSubmitted(true);
    reset();
  };

  return (
    <div className="bg-white rounded-[24px] overflow-hidden shadow-2xl border border-primary/20 text-right transition-all">
      {/* Integrated Dark Medical Header Bar */}
      <div className="bg-[#0b2230] p-8 sm:p-10 text-white border-b border-white/10">
        <div className="text-right">
          <h3 className="text-2xl sm:text-[30px] font-bold text-white font-heading mb-2">حجز كشف طبي</h3>
          <p className="text-white/75 text-base leading-[1.8] font-light">سجل بياناتك وسيتواصل معك فريق التنسيق الطبي لتأكيد الموعد</p>
        </div>
      </div>

      {/* Success Notification Alert */}
      {submitted && (
        <div className="bg-emerald-50 border border-emerald-300 p-6 m-6 rounded-2xl flex items-center gap-4 text-emerald-800 animate-in fade-in">
          <CheckCircle2 size={28} className="text-emerald-600 shrink-0" />
          <div>
            <h4 className="font-bold text-base mb-1 font-heading">تم حفظ وتسجيل طلب الحجز في الداشبورد بنجاح!</h4>
            <p className="text-sm opacity-90 leading-relaxed">
              تم إرسال بياناتك إلى لوحة تحكم مركز مودة لجراحات العيون بمدينة أشمون - محافظة المنوفية، وجاري التواصل معك الآن عبر الواتساب لتأكيد الموعد.
            </p>
          </div>
        </div>
      )}

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
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const enableAudio = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      setIsMuted(false);
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  // Attempt autoplay with sound on mount & attach global click listener
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      setIsMuted(false);
      videoRef.current.play().then(() => {
        setIsMuted(false);
      }).catch(() => {
        // Fallback to muted if browser blocks unmuted autoplay
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play();
        }
      });
    }

    const handleGlobalInteraction = () => {
      enableAudio();
    };

    window.addEventListener('click', handleGlobalInteraction, { once: true });
    window.addEventListener('touchstart', handleGlobalInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleGlobalInteraction);
      window.removeEventListener('touchstart', handleGlobalInteraction);
    };
  }, []);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

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

      {/* --- HERO SECTION: 50/50 SPLIT LAYOUT --- */}
      <section 
        onClick={enableAudio}
        className="relative min-h-[90vh] flex flex-col justify-center items-center overflow-hidden bg-navy pt-[120px] sm:pt-[150px] pb-16 sm:pb-24"
      >
        {/* Ambient Live Video Background for Entire Hero Section */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-35 sm:opacity-45 blur-[1px] transition-opacity duration-500"
        >
          <source src="./assets/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Ambient Gradient Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b2230]/85 via-[#0b2230]/75 to-[#0b2230]/90 pointer-events-none" />

        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-5 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* RIGHT COLUMN (6 cols): Title, Intro, CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-6 text-right space-y-6 bg-[#0b2230]/90 backdrop-blur-md p-6 sm:p-8 rounded-[28px] border border-white/20 shadow-2xl"
            >
              <h1 className="font-heading">
                <TypewriterTitle />
              </h1>

              {/* Location Subtitle Glass Pill */}
              <div className="mt-[18px] mb-[24px]">
                <div className="w-fit whitespace-nowrap rounded-[999px] px-[22px] py-[10px] bg-[rgba(30,200,232,0.08)] border border-[rgba(30,200,232,0.18)] backdrop-blur-[10px] inline-flex items-center justify-center">
                  <ShinyText className="font-heading font-bold text-[16px] sm:text-[18px] lg:text-[22px] leading-[1.2]">
                    بمدينة أشمون • محافظة المنوفية
                  </ShinyText>
                </div>
              </div>

              <motion.p
                variants={heroDescVariant}
                initial="hidden"
                animate="visible"
                className="text-base sm:text-lg text-white/95 leading-[1.8] mb-6 font-medium"
              >
                أول مركز متخصص لطب وجراحة العيون بمدينة أشمون - محافظة المنوفية، يقدم خدمات التشخيص الدقيق، والفحوصات، والعمليات الجراحية، والعيادات التخصصية بأحدث الأجهزة الطبية.
              </motion.p>

              <motion.div
                variants={heroButtonsVariant}
                initial="hidden"
                animate="visible"
                className="flex flex-col sm:flex-row gap-4 pt-2"
              >
                <motion.button
                  onClick={scrollToBooking}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group inline-flex items-center justify-center gap-3 bg-[#0A7C86] hover:bg-[#075c64] text-white font-bold text-base h-[54px] px-8 rounded-[16px] shadow-md transition-all duration-300 cursor-pointer"
                >
                  <span>احجز موعدك الآن</span>
                  <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
                </motion.button>

                <motion.button
                  onClick={scrollToServices}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group inline-flex items-center justify-center gap-3 bg-white/15 hover:bg-white/25 backdrop-blur-md text-white font-bold text-base h-[54px] px-8 rounded-[16px] border border-white/30 shadow-sm transition-all duration-300 cursor-pointer"
                >
                  <span>تعرف على خدماتنا</span>
                  <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-300" />
                </motion.button>
              </motion.div>
            </motion.div>

            {/* LEFT COLUMN (6 cols): Dedicated Unobstructed Video Player Card */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="lg:col-span-6 relative w-full"
            >
              <div className="relative w-full max-w-[420px] lg:max-w-none mx-auto rounded-[28px] overflow-hidden border border-white/25 shadow-2xl bg-black/80 group">
                {/* 1080p Video Player */}
                <video
                  ref={videoRef}
                  autoPlay
                  muted={isMuted}
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full h-[450px] sm:h-[520px] lg:h-[560px] object-cover object-center rounded-[28px]"
                >
                  <source src="./assets/hero-video.mp4" type="video/mp4" />
                </video>

                {/* Floating Sound Toggle Badge */}
                <button
                  onClick={toggleMute}
                  className="absolute top-4 left-4 z-20 flex items-center gap-2.5 bg-black/60 hover:bg-black/80 text-white px-4 py-2 rounded-full border border-white/30 backdrop-blur-md transition-all duration-300 shadow-lg cursor-pointer"
                >
                  <span className="text-lg">{isMuted ? '🔇' : '🔊'}</span>
                  <span className="text-xs font-bold font-heading">{isMuted ? 'انقر لتشغيل الصوت' : 'الصوت يعمل'}</span>
                </button>

                {/* Video Info Label */}
                <div className="absolute bottom-4 inset-x-4 z-20 bg-[#0b2230]/85 backdrop-blur-md p-3.5 rounded-[18px] border border-white/20 flex items-center justify-between text-white">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-bold font-heading">جولة مباشرة في مركز مودة</span>
                  </div>
                  <span className="text-xs text-white/70 font-semibold">1080p HD</span>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Stats Bar Cards with Magic UI NumberTicker */}
          <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {[
              { n: 15, suf: '+', label: 'سنة خبرة وتخصص بأشمون' },
              { n: 10000, suf: '+', label: 'عملية وفحص ناجح' },
              { n: 98, suf: '%', label: 'نسبة رضا واستحسان المرضى' },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white/10 backdrop-blur-md rounded-[20px] p-6 border border-white/15 text-center hover:bg-white/15 transition-cinematic hover:-translate-y-1 shadow-lg"
              >
                <p className="text-3xl sm:text-4xl font-extrabold text-[#2dd4bf] font-heading flex items-center justify-center gap-1" dir="ltr">
                  <span>{s.suf}</span>
                  <NumberTicker value={s.n} delay={i * 0.2} />
                </p>
                <p className="text-white/95 text-sm sm:text-base mt-2 font-bold font-heading">{s.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Magic UI Technology Marquee */}
          <div className="mt-10 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 py-3 overflow-hidden text-white/90">
            <Marquee pauseOnHover>
              {[
                '✨ أحدث جهاز أوركام Pentacam لإنتظام القرنية',
                '🔬 أشعة مقطعية للشبكية والعصب البصري OCT',
                '👁️ جراحات الفاكو للمياه البيضاء بدون غرز',
                '💎 عدسات الفاكو الأمريكية وسويس كير المعتمدة',
                '🏥 عيادات كشف النظر والعدسات اللاصقة بأشمون',
                '⚡ تقنية الفيمتو ليزك وتصحيح عيوب الإبصار',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 px-5 py-2 rounded-xl bg-white/10 border border-white/15 whitespace-nowrap text-xs sm:text-sm font-bold font-heading text-[#2dd4bf]">
                  <span>{item}</span>
                </div>
              ))}
            </Marquee>
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

      {/* --- QUICK NAV SECTION --- */}
      <section className="py-10 bg-white border-b border-border relative z-20">
        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {[
              { icon: Stethoscope, label: 'العيادات', path: '/clinics' },
              { icon: Microscope, label: 'الفحوصات', path: '/examinations' },
              { icon: Activity, label: 'العمليات', path: '/surgeries' },
              { icon: Users, label: 'الفريق الطبي', path: '/doctors' },
              { icon: MessageCircle, label: 'تواصل معنا', id: 'booking' },
              { icon: Phone, label: 'اتصل بنا', tel: '01000141542' },
              { icon: FileText, label: 'احجز الآن', id: 'booking', highlight: true },
            ].map((item, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                onClick={() => {
                  if ((item as any).tel) { window.location.href = `tel:${(item as any).tel}`; }
                  else if ((item as any).id) { scrollToSection((item as any).id); }
                  else if (item.path) { navigate(item.path); }
                }}
                className={`flex flex-col items-center gap-2 p-3 sm:p-4 rounded-2xl border transition-all duration-200 cursor-pointer group ${
                  (item as any).highlight
                    ? 'bg-[#0A7C86] text-white border-[#0A7C86] hover:bg-[#075c64]'
                    : 'bg-accent text-navy border-border hover:border-primary hover:bg-primary-50'
                }`}
              >
                <item.icon size={22} className={(item as any).highlight ? 'text-white' : 'text-primary'} />
                <span className={`text-xs font-bold leading-tight text-center ${(item as any).highlight ? 'text-white' : 'text-navy'}`}>{item.label}</span>
              </motion.button>
            ))}
          </div>
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
                    {/* Main Headline */}
                    <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-black text-white font-heading leading-[1.25] tracking-tight drop-shadow-md">
                      رعايتكم بين أيدٍ أمينة .. <br />
                      <ShinyText>رؤية أوضح لحياة أفضل</ShinyText>
                    </h1>
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
                  className="w-full h-[240px] sm:h-[360px] md:h-[460px] object-cover rounded-[24px]"
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
                    {(s as any).video ? (
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        src={(s as any).video}
                      />
                    ) : (
                      <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out" loading="lazy" />
                    )}
                    <div className={`absolute inset-0 bg-gradient-to-t ${s.color} opacity-40`} />
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
