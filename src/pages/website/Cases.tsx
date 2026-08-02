import React, { useState } from 'react';
import { ArrowLeftRight, CheckCircle2 } from 'lucide-react';
import { Card, Button } from '../../components/ui/UIElements';

interface Case {
  id: string;
  title: string;
  category: 'strabismus' | 'lasik' | 'cataract';
  categoryLabel: string;
  desc: string;
  beforeImg: string;
  afterImg: string;
  doctor: string;
  duration: string;
}

const casesList: Case[] = [
  {
    id: 'case-1',
    title: 'تصحيح انحراف الحول الإنسي الحاد لدى طفل',
    category: 'strabismus',
    categoryLabel: 'جراحات الحول',
    desc: 'حالة طفل يعاني من انحراف داخلي حاد (حول إنسي) في العين اليسرى. تم إخضاع المريض لعملية تقصير وشد عضلات العين لتعديل محور الرؤية بنجاح باهر.',
    beforeImg: '/assets/care-card.jpg', // Using care card
    afterImg: '/assets/clinic-room.jpg', // Using clinic room
    doctor: 'د. أحمد صلاح المودة',
    duration: 'عملية جراحية (45 دقيقة) ومتابعة أسبوعين'
  },
  {
    id: 'case-2',
    title: 'علاج اعتلال المياه البيضاء وزراعة عدسة مطوية',
    category: 'cataract',
    categoryLabel: 'عمليات المياه البيضاء',
    desc: 'مريض يبلغ من العمر 65 عاماً يعاني من عتامة شبه كاملة في عدسة العين (مياه بيضاء كثيفة) أثرت على الرؤية. تم تفتيت المياه بالفيكو وزراعة عدسة أمريكية فاخرة.',
    beforeImg: '/assets/office.jpg',
    afterImg: '/assets/brochure.jpg',
    doctor: 'د. أحمد صلاح المودة',
    duration: 'إجراء طبي (20 دقيقة) واستعادة نظر فورية'
  }
];

export const Cases: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  // Handles slider drag movement
  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const container = e.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const x = clientX - container.left;
    const percentage = Math.max(0, Math.min(100, (x / container.width) * 100));
    setSliderPosition(percentage);
  };

  const filteredCases = activeCategory === 'all' 
    ? casesList 
    : casesList.filter(c => c.category === activeCategory);

  return (
    <div className="bg-brand-gray-light/30 py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-brand-teal font-extrabold text-sm tracking-wider">سجل النجاحات الطبية</span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-brand-blue mt-1">حالات واقعية وقبل وبعد التعافي</h2>
          <p className="text-sm text-brand-gray-dark mt-3 max-w-xl mx-auto leading-relaxed">
            نعرض هنا بعض الحالات الطبية والجراحية الناجحة التي تم شفاؤها بالكامل بفضل الله ثم خبرة الطاقم الطبي المتميز بالمركز.
          </p>
        </div>

        {/* Interactive Before/After Comparison Tool */}
        <div className="max-w-4xl mx-auto mb-16">
          <h3 className="text-xl font-bold text-brand-blue mb-4 text-center">أداة مقارنة الحالات التفاعلية (قبل وبعد الجراحة)</h3>
          
          <Card className="p-0 overflow-hidden border border-brand-gray/40 relative shadow-premium">
            <div 
              className="relative w-full h-[350px] md:h-[450px] cursor-ew-resize select-none"
              onMouseMove={handleSliderMove}
              onTouchMove={handleSliderMove}
            >
              {/* After Image (Base) */}
              <img 
                src="/assets/clinic-room.jpg" 
                alt="بعد العملية" 
                className="absolute inset-0 w-full h-full object-cover" 
              />
              <div className="absolute bottom-4 left-4 bg-brand-teal text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-soft z-20">
                بعد العملية وتمام التعافي
              </div>

              {/* Before Image (Overlay with clipping width) */}
              <div 
                className="absolute inset-y-0 right-0 overflow-hidden"
                style={{ width: `${100 - sliderPosition}%` }}
              >
                <img 
                  src="/assets/care-card.jpg" 
                  alt="قبل العملية" 
                  className="absolute top-0 right-0 w-full h-full object-cover max-w-none" 
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
              <div className="absolute bottom-4 right-4 bg-brand-blue text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-soft z-20">
                قبل إجراء الجراحة
              </div>

              {/* Drag Handle Bar */}
              <div 
                className="absolute inset-y-0 w-1 bg-white cursor-ew-resize z-30"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-brand-gray shadow-premium flex items-center justify-center text-brand-blue">
                  <ArrowLeftRight size={14} />
                </div>
              </div>
            </div>
            <div className="p-4 bg-brand-blue/5 text-center text-xs text-brand-navy border-t border-brand-gray/30">
              * حرك المؤشر يميناً ويساراً لمقارنة العين وحالة الحول قبل الجراحة وبعد استقامة المحور البصري بالكامل.
            </div>
          </Card>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          <Button 
            variant={activeCategory === 'all' ? 'primary' : 'outline'} 
            size="sm" 
            onClick={() => setActiveCategory('all')}
          >
            جميع الحالات المعالجة
          </Button>
          <Button 
            variant={activeCategory === 'strabismus' ? 'primary' : 'outline'} 
            size="sm" 
            onClick={() => setActiveCategory('strabismus')}
          >
            جراحات الحول
          </Button>
          <Button 
            variant={activeCategory === 'cataract' ? 'primary' : 'outline'} 
            size="sm" 
            onClick={() => setActiveCategory('cataract')}
          >
            عمليات المياه البيضاء
          </Button>
        </div>

        {/* Filtered Cases Cards */}
        <div className="space-y-10 max-w-5xl mx-auto">
          {filteredCases.map((cs) => (
            <Card key={cs.id} className="p-0 overflow-hidden border border-brand-gray/40 grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Image box */}
              <div className="h-64 md:h-auto min-h-[250px] relative">
                <img src={cs.beforeImg} alt={cs.title} className="w-full h-full object-cover" />
                <span className="absolute top-4 right-4 bg-brand-blue text-white text-xs font-bold px-3 py-1 rounded-full">
                  {cs.categoryLabel}
                </span>
              </div>

              {/* Text details */}
              <div className="p-8 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-brand-blue mb-3">{cs.title}</h3>
                  <p className="text-xs text-brand-gray-dark leading-relaxed mb-6">{cs.desc}</p>

                  <div className="space-y-2 mb-6">
                    <div className="flex gap-2 items-center text-xs text-brand-navy">
                      <CheckCircle2 size={16} className="text-brand-teal shrink-0" />
                      <span><strong>الطبيب المعالج:</strong> {cs.doctor}</span>
                    </div>
                    <div className="flex gap-2 items-center text-xs text-brand-navy">
                      <CheckCircle2 size={16} className="text-brand-teal shrink-0" />
                      <span><strong>مدة العلاج والتعافي:</strong> {cs.duration}</span>
                    </div>
                  </div>
                </div>

                <Button variant="outline" size="sm" className="w-fit" onClick={() => {
                  const el = document.getElementById('booking');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}>
                  استشِر الطبيب في حالة مماثلة
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
