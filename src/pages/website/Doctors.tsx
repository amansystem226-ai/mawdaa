import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, CheckCircle2, MessageCircle } from 'lucide-react';
import { sendWhatsApp } from '../../utils/whatsapp';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  bio: string;
  qualifications: string[];
  services: string[];
  image: string;
}

const doctorsList: Doctor[] = [
  {
    id: 'doc-1',
    name: 'د. محمد عمار',
    specialty: 'استشاري طب وجراحة العيون وتصحيح الإبصار',
    experience: 'أكثر من 15 عاماً من الخبرة في طب وجراحة العيون والعمليات الدقيقة.',
    bio: 'الدكتور محمد عمار طبيب واستشاري متخصص في جراحات العيون وتصحيح الإبصار، إزالة المياه البيضاء بأحدث تقنيات الموجات فوق الصوتية (الفيكو)، زراعة العدسات، ومتابعة أمراض القرنية والشبكية والجلوكوما.',
    qualifications: [
      'استشاري طب وجراحة العيون وجراحات الدقيقة.',
      'دبلوم وزمالة طب وجراحة العيون وتصحيح الإبصار.',
      'عضو الجمعية المصرية لجراحي عيون مصر والشرق الأوسط.',
      'متخصص في عمليات الفيكو وزراعة العدسات وتصحيح الإبصار.'
    ],
    services: [
      'عمليات إزالة المياه البيضاء بالموجات فوق الصوتية (الفيكو) وزرع العدسات.',
      'عمليات تصحيح الإبصار بالليزر والليزك.',
      'جراحات الفحوصات والقرنية المخروطية.',
      'علاج أمراض الشبكية والسكري ومتابعة المياه الزرقاء (الجلوكوما).'
    ],
    image: './assets/doctors-office.jpg'
  }
];

export const Doctors: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const doctor = doctorsList.find(d => d.id === id) || doctorsList[0];

  return (
    <div className="bg-bg min-h-screen py-12 md:py-20">
      <div className="max-w-5xl mx-auto px-4">
        
        {/* Doctor Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl p-8 border border-border shadow-card mb-8 flex flex-col md:flex-row gap-8 items-center text-right"
        >
          <div className="w-40 h-40 rounded-2xl overflow-hidden bg-primary-50 border border-primary-100 shrink-0 shadow-sm">
            <img 
              src="./assets/doctors-office.jpg" 
              alt={doctor.name} 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1">
            <span className="inline-block bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full mb-3">
              النخبة الطبية
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-navy mb-2">{doctor.name}</h1>
            <p className="text-primary font-bold text-base mb-4">{doctor.specialty}</p>
            <p className="text-sm text-muted leading-relaxed mb-6">{doctor.bio}</p>

            <button
              onClick={() => sendWhatsApp({ name: '', phone: '', service: `استشارة د. محمد عمار` })}
              className="inline-flex items-center gap-2 bg-gradient-brand text-white font-bold px-6 py-3 rounded-2xl shadow-card hover:shadow-card-hover transition-all text-sm cursor-pointer"
            >
              <MessageCircle size={16} />
              احجز كشف مع د. محمد عمار
            </button>
          </div>
        </motion.div>

        {/* Qualifications & Services Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Qualifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-3xl p-6 border border-border shadow-card"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                <GraduationCap size={20} className="text-primary" />
              </div>
              <h2 className="font-black text-navy text-lg">المؤهلات والخبرات</h2>
            </div>
            <ul className="space-y-3">
              {doctor.qualifications.map((q, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-navy/85">
                  <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-3xl p-6 border border-border shadow-card"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-secondary-50 flex items-center justify-center shrink-0">
                <Briefcase size={20} className="text-secondary" />
              </div>
              <h2 className="font-black text-navy text-lg">الخدمات التخصصية</h2>
            </div>
            <ul className="space-y-3">
              {doctor.services.map((s, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-navy/85">
                  <CheckCircle2 size={16} className="text-secondary shrink-0 mt-0.5" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

      </div>
    </div>
  );
};
