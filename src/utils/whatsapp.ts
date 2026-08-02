export interface BookingData {
  name: string;
  phone: string;
  service: string;
  date?: string;
  notes?: string;
  // Legacy support
  patientName?: string;
  age?: number;
  preferredDate?: string;
}

export const sendWhatsApp = (data: BookingData) => {
  const name = data.name || data.patientName || '';
  const date = data.date || data.preferredDate || '';
  const message = `*طلب حجز جديد – مركز مودة لجراحات العيون*

👤 الاسم: ${name}
📞 الهاتف: ${data.phone}
🏥 الخدمة: ${data.service}
📅 التاريخ: ${date || 'غير محدد'}
📝 الملاحظات: ${data.notes || 'لا يوجد'}

شكراً جزيلاً.`;

  const url = `https://api.whatsapp.com/send?phone=201000141542&text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
};

// Legacy export for backward compatibility
export const getWhatsAppBookingLink = (data: BookingData) => {
  const name = data.name || data.patientName || '';
  const date = data.date || data.preferredDate || '';
  const message = `طلب حجز جديد في مركز مودة لجراحات العيون\n\nالاسم: ${name}\nرقم الهاتف: ${data.phone}\nالخدمة: ${data.service}\nالتاريخ: ${date}\nالملاحظات: ${data.notes || 'لا توجد ملاحظات إضافية'}\n\nشكراً جزيلاً.`;
  return `https://api.whatsapp.com/send?phone=201000141542&text=${encodeURIComponent(message)}`;
};
