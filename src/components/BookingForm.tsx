import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CheckCircle } from 'lucide-react';
import { Button, Input, Select, Textarea } from './ui/UIElements';
import { useApp } from '../context/AppContext';
import { getWhatsAppBookingLink } from '../utils/whatsapp';

const bookingSchema = z.object({
  patientName: z.string().min(3, { message: 'يجب أن يكون الاسم 3 أحرف على الأقل' }),
  phone: z.string().regex(/^01[0125][0-9]{8}$/, { message: 'رقم الهاتف المصري غير صحيح (يجب أن يبدأ بـ 01 ويحتوي على 11 رقم)' }),
  age: z.number({ invalid_type_error: 'يرجى إدخال عمر صحيح' }).min(1, 'يرجى إدخال عمر أكبر من 0').max(120, 'يرجى إدخال عمر منطقي'),
  department: z.enum(['examinations', 'surgeries', 'clinics'] as const, {
    errorMap: () => ({ message: 'يرجى اختيار القسم الطبي' }),
  }),
  service: z.string().min(1, { message: 'يرجى اختيار الخدمة المطلوبة' }),
  preferredDate: z.string().min(1, { message: 'يرجى تحديد تاريخ الحجز' }),
  preferredTime: z.string().min(1, { message: 'يرجى تحديد الفترة المفضلة' }),
  notes: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

const servicesMap = {
  examinations: [
    { value: 'تصوير القرنية وبنتاكام (Pentacam)', label: 'تصوير القرنية وبنتاكام (Pentacam)' },
    { value: 'أشعة مقطعية للشبكية والعصب (OCT)', label: 'أشعة مقطعية للشبكية والعصب (OCT)' },
    { value: 'تصوير قاع العين بالفلوريسين والألوان', label: 'تصوير قاع العين بالفلوريسين والألوان' },
    { value: 'موجات صوتية وفحص مجالات الإبصار', label: 'موجات صوتية وفحص مجالات الإبصار' },
  ],
  surgeries: [
    { value: 'عملية المياه البيضاء وزرع العدسات', label: 'عملية المياه البيضاء وزرع العدسات (Cataract)' },
    { value: 'عملية المياه الزرقاء (Glaucoma)', label: 'عملية المياه الزرقاء (Glaucoma)' },
    { value: 'جراحات الشبكية والجسم الزجاجي', label: 'جراحات الشبكية والجسم الزجاجي' },
    { value: 'عمليات القرنية وترقيع القرنية', label: 'عمليات القرنية وترقيع القرنية' },
    { value: 'عمليات تصحيح النظر بالليزر والليزك', label: 'عمليات تصحيح النظر بالليزر والليزك' },
  ],
  clinics: [
    { value: 'كشف عيون ونظارات طبية', label: 'كشف عيون ونظارات طبية' },
    { value: 'فحص القرنية والعدسات اللاصقة', label: 'فحص القرنية والعدسات اللاصقة' },
    { value: 'كشف متابعة ما بعد العمليات والجراحة', label: 'كشف متابعة ما بعد العمليات والجراحة' },
  ]
};

const departmentOptions = [
  { value: '', label: 'اختر القسم الطبي المخصص' },
  { value: 'examinations', label: 'الفحوصات والأشعة التشخيصية' },
  { value: 'surgeries', label: 'جراحات العيون والعمليات' },
  { value: 'clinics', label: 'العيادات العامة والمتابعة' }
];

const timeOptions = [
  { value: '10:00 AM - 12:00 PM', label: 'الفترة الصباحية الأولى (10:00 ص - 12:00 م)' },
  { value: '12:00 PM - 02:00 PM', label: 'الفترة الصباحية الثانية (12:00 م - 02:00 م)' },
  { value: '02:00 PM - 04:00 PM', label: 'الفترة المسائية الأولى (02:00 م - 04:00 م)' },
  { value: '04:00 PM - 06:00 PM', label: 'الفترة المسائية الثانية (04:00 م - 06:00 م)' }
];

export const BookingForm: React.FC = () => {
  const { addAppointment } = useApp();
  const [success, setSuccess] = useState(false);
  const [lastBooking, setLastBooking] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors }
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      department: undefined,
      service: '',
      preferredTime: '10:00 AM - 12:00 PM',
      notes: ''
    }
  });

  const selectedDepartment = watch('department');

  // Clear service option if department changes
  useEffect(() => {
    setValue('service', '');
  }, [selectedDepartment, setValue]);

  const onSubmit = (data: BookingFormValues) => {
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      const appt = addAppointment({
        patientName: data.patientName,
        phone: data.phone,
        age: data.age,
        department: data.department,
        service: data.service,
        preferredDate: data.preferredDate,
        preferredTime: data.preferredTime,
        notes: data.notes
      });
      setLastBooking(appt);
      setSuccess(true);
      setLoading(false);
      reset();
    }, 1200);
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
            <div><strong>الخدمة الطبية:</strong></div>
            <div>{lastBooking.service}</div>
            <div><strong>تاريخ الحجز:</strong></div>
            <div>{lastBooking.preferredDate}</div>
            <div><strong>الفترة المفضلة:</strong></div>
            <div>{lastBooking.preferredTime}</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
          <Button variant="secondary" size="lg" onClick={handleWhatsAppRedirect} className="w-full">
            تأكيد الحجز عبر واتساب الآن
          </Button>
          <Button variant="outline" size="lg" onClick={() => setSuccess(false)} className="w-full">
            حجز موعد جديد
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-premium border border-brand-gray/30 p-6 md:p-8 animate-in fade-in duration-300">
      <h3 className="text-2xl font-bold text-brand-blue mb-2 text-center">احجز موعد كشف أو عملية</h3>
      <p className="text-brand-gray-dark text-sm text-center mb-6">سجل تفاصيل الحجز لنقوم بالتنسيق وتأكيد الموعد معك فوراً</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        <div>
          <div className="relative">
            <Input
              label="اسم المريض بالكامل"
              placeholder="مثال: أحمد محمد علي"
              error={errors.patientName?.message}
              {...register('patientName')}
            />
          </div>

          <Input
            label="رقم الهاتف المحمول"
            placeholder="مثال: 01000141542"
            type="tel"
            error={errors.phone?.message}
            {...register('phone')}
          />

          <Input
            label="عمر المريض"
            placeholder="مثال: 42"
            type="number"
            error={errors.age?.message}
            {...register('age', { valueAsNumber: true })}
          />
        </div>

        <div>
          <Select
            label="القسم الطبي"
            options={departmentOptions}
            error={errors.department?.message}
            {...register('department')}
          />

          <Select
            label="الخدمة الطبية المحددة"
            options={[
              { value: '', label: 'اختر الخدمة الطبية المناسبة' },
              ...(selectedDepartment ? servicesMap[selectedDepartment] : [])
            ]}
            error={errors.service?.message}
            disabled={!selectedDepartment}
            {...register('service')}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="التاريخ المفضل"
              type="date"
              min={new Date().toISOString().split('T')[0]}
              error={errors.preferredDate?.message}
              {...register('preferredDate')}
            />
            <Select
              label="الفترة المفضلة"
              options={timeOptions}
              error={errors.preferredTime?.message}
              {...register('preferredTime')}
            />
          </div>
        </div>
      </div>

      <Textarea
        label="أي ملاحظات أو تاريخ طبي (اختياري)"
        placeholder="مثال: يعاني من حساسية لقطرات العين، ضغط، سكر..."
        rows={2}
        error={errors.notes?.message}
        {...register('notes')}
      />

      <Button
        variant="primary"
        size="lg"
        type="submit"
        fullWidth
        isLoading={loading}
        className="mt-4"
      >
        حفظ طلب الحجز وتوليد رسالة الواتساب
      </Button>
    </form>
  );
};
