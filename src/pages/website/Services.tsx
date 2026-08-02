import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Microscope, Zap, Eye } from 'lucide-react';

const fadeUp: any = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] as any },
  }),
};

const services = [
  {
    icon: Microscope,
    title: 'Ø§Ù„ÙØ­ÙˆØµØ§Øª ÙˆØ§Ù„Ø£Ø´Ø¹Ø©',
    subtitle: 'ØªØ´Ø®ÙŠØµ Ù…ØªÙ‚Ø¯Ù…',
    desc: 'ÙŠØ¶Ù… Ø§Ù„Ù…Ø±ÙƒØ² Ø¬Ù…ÙŠØ¹ ÙØ­ÙˆØµØ§Øª ÙˆØ£Ø´Ø¹Ø§Øª Ø§Ù„Ø¹ÙŠÙˆÙ† Ø§Ù„Ù„Ø§Ø²Ù…Ø© Ù„Ù„ØªØ´Ø®ÙŠØµ Ø§Ù„Ø¯Ù‚ÙŠÙ‚ Ø¨Ø§Ø³ØªØ®Ø¯Ø§Ù… Ø£Ø­Ø¯Ø« Ø§Ù„Ø£Ø¬Ù‡Ø²Ø© Ø§Ù„Ø·Ø¨ÙŠØ©.',
    items: ['ØªØµÙˆÙŠØ± Ø§Ù„Ù‚Ø±Ù†ÙŠØ© Pentacam', 'Ø£Ø´Ø¹Ø© Ù…Ù‚Ø·Ø¹ÙŠØ© OCT', 'ØªØµÙˆÙŠØ± Ù‚Ø§Ø¹ Ø§Ù„Ø¹ÙŠÙ†', 'Ù…ÙˆØ¬Ø§Øª ØµÙˆØªÙŠØ©'],
    link: '/examinations',
    image: '/assets/diagnostics.jpg',
    color: 'from-secondary to-secondary-dark',
    badge: 'bg-secondary',
  },
  {
    icon: Zap,
    title: 'Ø¹Ù…Ù„ÙŠØ§Øª Ø§Ù„Ø¹ÙŠÙˆÙ†',
    subtitle: 'Ø¬Ø±Ø§Ø­Ø© Ø¹Ø§Ù„ÙŠØ© Ø§Ù„Ø¯Ù‚Ø©',
    desc: 'Ø¬Ù†Ø§Ø­ Ø¹Ù…Ù„ÙŠØ§Øª Ù…Ø¬Ù‡Ø² Ø¨Ø£Ø­Ø¯Ø« Ø§Ù„Ø£Ø¬Ù‡Ø²Ø© ÙˆØ£Ù†Ø¸Ù…Ø© Ø§Ù„ØªØ¹Ù‚ÙŠÙ… Ù„Ø¥Ø¬Ø±Ø§Ø¡ Ù…Ø®ØªÙ„Ù Ø¹Ù…Ù„ÙŠØ§Øª Ø§Ù„Ø¹ÙŠÙˆÙ† Ø¨Ø£Ø¹Ù„Ù‰ Ù…Ø¹Ø§ÙŠÙŠØ± Ø§Ù„Ø¬ÙˆØ¯Ø©.',
    items: ['Ø¥Ø²Ø§Ù„Ø© Ø§Ù„Ù…ÙŠØ§Ù‡ Ø§Ù„Ø¨ÙŠØ¶Ø§Ø¡', 'Ø²Ø±Ø§Ø¹Ø© Ø§Ù„Ø¹Ø¯Ø³Ø§Øª', 'Ø¹Ù…Ù„ÙŠØ§Øª Ø§Ù„Ø´Ø¨ÙƒÙŠØ©', 'Ø¹Ù…Ù„ÙŠØ§Øª Ø§Ù„Ø­ÙˆÙ„'],
    link: '/surgeries',
    image: '/assets/interior.jpg',
    color: 'from-primary to-primary-dark',
    badge: 'bg-primary',
  },
  {
    icon: Eye,
    title: 'Ø§Ù„Ø¹ÙŠØ§Ø¯Ø§Øª ÙˆØ§Ù„ÙƒØ´ÙˆÙØ§Øª',
    subtitle: 'Ø±Ø¹Ø§ÙŠØ© Ù…ØªÙƒØ§Ù…Ù„Ø©',
    desc: 'Ø¹ÙŠØ§Ø¯Ø§Øª Ù…Ø¬Ù‡Ø²Ø© Ø¨Ø£Ø­Ø¯Ø« Ø£Ø¬Ù‡Ø²Ø© Ø§Ù„ÙƒØ´Ù Ù„Ù…ØªØ§Ø¨Ø¹Ø© Ø£Ù…Ø±Ø§Ø¶ Ø§Ù„Ø¹ÙŠÙˆÙ† ÙˆØ®Ø¯Ù…Ø§Øª Ø§Ù„Ù†Ø¸Ø§Ø±Ø§Øª ÙˆØ§Ù„Ø¹Ø¯Ø³Ø§Øª Ø§Ù„Ù„Ø§ØµÙ‚Ø©.',
    items: ['ÙƒØ´Ù Ø§Ù„Ù†Ø¸Ø±', 'Ø§Ù„Ø¹Ø¯Ø³Ø§Øª Ø§Ù„Ù„Ø§ØµÙ‚Ø©', 'Ù…ØªØ§Ø¨Ø¹Ø© Ø§Ù„Ø³ÙƒØ±', 'Ù…ØªØ§Ø¨Ø¹Ø© Ø§Ù„Ø£Ø·ÙØ§Ù„'],
    link: '/clinics',
    image: '/assets/eye-clinics.jpg',
    color: 'from-primary-light to-primary',
    badge: 'bg-primary-light',
  },
];

export const Services: React.FC = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative py-20 bg-navy overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="/assets/interior.jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-navy/70" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <span className="inline-block bg-primary/80 text-white text-xs font-bold px-4 py-2 rounded-full mb-6 border border-primary/40">Ø®Ø¯Ù…Ø§ØªÙ†Ø§ Ø§Ù„Ø·Ø¨ÙŠØ©</span>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-5">
              Ø®Ø¯Ù…Ø§Øª Ø·Ø¨ ÙˆØ¬Ø±Ø§Ø­Ø© Ø§Ù„Ø¹ÙŠÙˆÙ† Ø§Ù„Ù…ØªÙƒØ§Ù…Ù„Ø©
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              Ù…Ù† Ø§Ù„ØªØ´Ø®ÙŠØµ Ø§Ù„Ø¯Ù‚ÙŠÙ‚ Ø¥Ù„Ù‰ Ø§Ù„Ø¬Ø±Ø§Ø­Ø© Ø§Ù„Ù…ØªØ®ØµØµØ©ØŒ Ù†Ù‚Ø¯Ù… Ù„Ùƒ Ø±Ø¹Ø§ÙŠØ© Ø·Ø¨ÙŠØ© Ø´Ø§Ù…Ù„Ø© Ù„Ø¹ÙŠÙ†ÙŠÙƒ ÙÙŠ Ù…ÙƒØ§Ù† ÙˆØ§Ø­Ø¯.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-bg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col gap-16">
            {services.map((s, i) => (
              <motion.div
                key={i}
                variants={i % 2 === 0 ? { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } } } : { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } } }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className={`grid md:grid-cols-2 gap-10 items-center ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Image */}
                <div className={`${i % 2 !== 0 ? 'md:order-2' : ''} relative`}>
                  <div className={`absolute -inset-3 bg-gradient-to-r ${s.color} rounded-4xl blur-xl opacity-20`} />
                  <div className="relative rounded-4xl overflow-hidden shadow-hero">
                    <img src={s.image} alt={s.title} className="w-full h-80 md:h-96 object-cover" loading="lazy" />
                    <div className={`absolute inset-0 bg-gradient-to-t ${s.color} opacity-40`} />
                    <div className="absolute top-5 right-5">
                      <div className={`w-12 h-12 rounded-2xl ${s.badge} flex items-center justify-center shadow-glow`}>
                        <s.icon size={24} className="text-white" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={i % 2 !== 0 ? 'md:order-1' : ''}>
                  <span className={`inline-block ${s.badge} text-white text-xs font-bold px-3 py-1.5 rounded-full mb-4`}>{s.subtitle}</span>
                  <h2 className="text-3xl md:text-4xl font-black text-navy mb-4">{s.title}</h2>
                  <p className="text-lg text-muted leading-relaxed mb-6">{s.desc}</p>

                  <ul className="grid grid-cols-2 gap-3 mb-8">
                    {s.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-navy/80 bg-accent rounded-xl p-3 border border-border">
                        <div className={`w-5 h-5 rounded-lg ${s.badge} flex items-center justify-center shrink-0`}>
                          <span className="text-white text-xs">âœ“</span>
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={s.link}
                    className="group inline-flex items-center gap-2 bg-gradient-brand text-white font-bold px-7 py-3.5 rounded-2xl shadow-card hover:shadow-glow active:scale-[0.97] transition-all"
                  >
                    Ø¹Ø±Ø¶ Ø¬Ù…ÙŠØ¹ Ø§Ù„Ø®Ø¯Ù…Ø§Øª
                    <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
