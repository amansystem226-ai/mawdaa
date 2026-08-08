import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CheckCircle, MessageCircle } from 'lucide-react';
import { Button, Input, Textarea } from './ui/UIElements';
import { useApp } from '../context/AppContext';
import { getWhatsAppBookingLink } from '../utils/whatsapp';

const bookingSchema = z.object({
  patientName: z.string().min(3, { message: 'يجب أن يكون الاسم 3 أحرف على الأقل' }),
  phone: z.string().min(8, { message: 'يرجى إدخال رقم هاتف صحيح' }),
  notes: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export const BookingForm: React.FC = () => {
  const { addAppointment } = useApp();
  const [success, setSuccess] = useState(false);
  const [lastBooking, setLastBooking] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      notes: ''
    }
  });

  const onSubmit = (data: BookingFormValues) => {
    setLoading(true);
    const todayStr = new Date().toISOString().split('T')[0];

    setTimeout(() => {
      const appt = addAppointment({
        patientName: data.patientName,
        phone: data.phone,
        age: 30,
        department: 'clinics',
        service: 'كشف عيون عام',
        preferredDate: todayStr,
        preferredTime: 'الفترة الصباحية',
        notes: data.notes
      });
      setLastBooking(appt);
      setSuccess(true);
      setLoading(false);
      reset();
    }, 800);
  };

  const handleWhatsAppRedirect = () => {
    if (lastBooking) {
      const link = getWhatsAppBookingLink({
        name: lastBooking.patientName,
        patientName: lastBooking.patientName,
        phone: lastBooking.phone,
        age: lastBooking.age,
        service: lastBooking.service,
        preferredDate: lastBooking.preferredDate,
        date: lastBooking.preferredDate,
        notes: lastBooking.notes
      });
      window.open(link, '_blank');
    }
  };

  if (success && lastBooking) {
    return (
      <div className="bg-white rounded-2xl shadow-premium border border-brand-teal/20 p-8 text-center animate-in fade-in slide-in-from-bottom duration-300">
        <div className="mx-auto w-16 h-16 bg-brand-teal-light rounded-full flex items-center justify-center mb-6 text-brand-teal">
          <CheckCircle size={36} />
        </div>
        <h3 className="text-2xl font-bold text-brand-blue mb-3">تم تسجيل طلب الحجز بنجاح!</h3>
        <p className="text-brand-gray-dark mb-6 leading-relaxed max-w-md mx-auto">
          تم إرسال موعدك إلى نظام العيادة قيد التأكيد برقم الحجز: <span className="font-bold text-brand-blue">{lastBooking.id}</span>.
          يرجى الآن إتمام عملية التأكيد بإرسال الحجز للسكرتارية الطبية عبر الواتساب.
        </p>

        <div className="bg-brand-blue/5 rounded-xl p-4 text-right mb-6 max-w-md mx-auto border border-brand-blue/10">
          <div className="grid grid-cols-2 gap-y-2.5 text-sm text-brand-navy">
            <div><strong>اسم المريض:</strong></div>
            <div>{lastBooking.patientName}</div>
            <div><strong>رقم الهاتف:</strong></div>
            <div>{lastBooking.phone}</div>
          </div>
        </div>

        <Button
          variant="primary"
          size="lg"
          onClick={handleWhatsAppRedirect}
          className="shadow-soft w-full max-w-md mx-auto"
        >
          متابعة وتأكيد الحجز عبر الواتساب
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-right">
      <h3 className="text-xl font-bold text-brand-blue text-center mb-1">طلب حجز كشف طبي</h3>
      <p className="text-brand-gray-dark text-sm text-center mb-6">سجل تفاصيل الحجز لنقوم بالتنسيق وتأكيد الموعد معك فوراً</p>

      <div className="space-y-4">
        <Input
          label="اسم المريض بالكامل"
          placeholder="مثال: أحمد محمد علي"
          error={errors.patientName?.message}
          {...register('patientName')}
        />

        <Input
          label="رقم الهاتف المحمول"
          placeholder="مثال: 01000141542"
          type="tel"
          error={errors.phone?.message}
          {...register('phone')}
        />

        <Textarea
          label="أي ملاحظات أو أعراض (اختياري)"
          placeholder="مثال: يعاني من ضغط، سكر، أو أية أعراض بالعين..."
          rows={3}
          error={errors.notes?.message}
          {...register('notes')}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 bg-[#0A7C86] hover:bg-[#075c64] text-white font-bold h-[56px] px-8 rounded-[16px] transition-all text-base shadow-lg cursor-pointer font-heading active:scale-[0.99] mt-6"
      >
        <MessageCircle size={20} />
        <span>تأكيد وتسجيل طلب الحجز المباشر</span>
      </button>
    </form>
  );
};
