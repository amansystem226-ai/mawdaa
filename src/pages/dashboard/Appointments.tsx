import React, { useState } from 'react';
import { 
  Check, X, MessageSquare, Calendar, Search, Clock 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { Appointment } from '../../context/AppContext';
import { Card, Badge, Input, Select } from '../../components/ui/UIElements';

export const Appointments: React.FC = () => {
  const { appointments, updateAppointmentStatus } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deptFilter, setDeptFilter] = useState('all');

  // Filter Handler
  const filteredAppointments = appointments.filter((appt) => {
    const matchesSearch = 
      appt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appt.phone.includes(searchTerm) ||
      appt.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || appt.status === statusFilter;
    const matchesDept = deptFilter === 'all' || appt.department === deptFilter;

    return matchesSearch && matchesStatus && matchesDept;
  });

  const handleWhatsAppContact = (appt: Appointment) => {
    const messageText = `مرحباً أ. ${appt.patientName}،
معك مركز مودة لجراحات العيون. نود تأكيد موعد حجزك لـ (${appt.service}) بتاريخ ${appt.preferredDate} خلال الفترة (${appt.preferredTime}).
يرجى تأكيد الحضور بالرد على هذه الرسالة. شكراً لك.`;
    
    const encoded = encodeURIComponent(messageText);
    const link = `https://api.whatsapp.com/send?phone=2${appt.phone}&text=${encoded}`;
    window.open(link, '_blank');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-brand-blue">جدول وإدارة مواعيد العيادة</h1>
        <p className="text-xs text-brand-gray-dark mt-1">تأكيد المواعيد، الإلغاء، والتواصل مع المرضى لتنسيق غرف الفحص والعمليات</p>
      </div>

      {/* Filters Toolbar */}
      <Card className="p-4 border border-brand-gray/30">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          {/* Search bar */}
          <div className="md:col-span-2 relative">
            <Input
              label="البحث عن مريض أو رقم حجز"
              placeholder="ابحث بالاسم، رقم الموعد، أو الهاتف..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3.5 top-9.5 text-brand-gray-dark/80" size={18} />
          </div>

          {/* Status filter */}
          <Select
            label="تصفية حسب الحالة"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { value: 'all', label: 'جميع الحالات' },
              { value: 'pending', label: 'قيد الانتظار' },
              { value: 'confirmed', label: 'مؤكدة' },
              { value: 'cancelled', label: 'ملغية' }
            ]}
          />

          {/* Department filter */}
          <Select
            label="تصفية حسب القسم الطبي"
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            options={[
              { value: 'all', label: 'جميع الأقسام' },
              { value: 'examinations', label: 'الفحوصات والأشعة' },
              { value: 'surgeries', label: 'العمليات والجراحة' },
              { value: 'clinics', label: 'العيادات والمتابعة' }
            ]}
          />
        </div>
      </Card>

      {/* Appointments List Card */}
      <Card className="border border-brand-gray/30 p-0 overflow-hidden">
        {filteredAppointments.length === 0 ? (
          <div className="text-center py-20 text-brand-gray-dark text-xs">
            لا توجد أي مواعيد مطابقة لمعايير البحث الحالية.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="bg-brand-blue-dark/5 border-b border-brand-gray/40 text-brand-navy font-bold">
                  <th className="p-4 text-right">رقم الحجز</th>
                  <th className="p-4 text-right">المريض</th>
                  <th className="p-4 text-right">التاريخ والفترة</th>
                  <th className="p-4 text-right">الخدمة المطلوبة</th>
                  <th className="p-4 text-right">الحالة</th>
                  <th className="p-4 text-center">الإجراءات والعمليات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-gray/25">
                {filteredAppointments.map((appt) => (
                  <tr key={appt.id} className="hover:bg-brand-gray-light/30 transition-all">
                    {/* ID */}
                    <td className="p-4 font-sans font-semibold text-brand-blue">{appt.id}</td>
                    
                    {/* Patient info */}
                    <td className="p-4">
                      <div className="font-bold text-brand-blue text-sm">{appt.patientName}</div>
                      <div className="text-[10px] text-brand-gray-dark mt-0.5 flex gap-2">
                        <span className="font-sans">{appt.phone}</span>
                        <span>•</span>
                        <span>العمر: {appt.age} سنة</span>
                      </div>
                    </td>

                    {/* Preferred Date & Time */}
                    <td className="p-4">
                      <div className="flex items-center gap-1.5 font-sans font-semibold text-brand-navy">
                        <Calendar size={14} className="text-brand-teal" />
                        <span>{appt.preferredDate}</span>
                      </div>
                      <div className="text-[10px] text-brand-gray-dark mt-1 flex items-center gap-1">
                        <Clock size={12} />
                        <span>{appt.preferredTime}</span>
                      </div>
                    </td>

                    {/* Service */}
                    <td className="p-4">
                      <div className="font-bold text-brand-navy">{appt.service}</div>
                      {appt.notes && (
                        <div className="text-[10px] text-brand-gray-dark/80 mt-1 max-w-xs truncate" title={appt.notes}>
                          * ملاحظات: {appt.notes}
                        </div>
                      )}
                    </td>

                    {/* Badge */}
                    <td className="p-4">
                      <Badge status={appt.status} />
                    </td>

                    {/* Actions */}
                    <td className="p-4">
                      <div className="flex gap-2 justify-center items-center">
                        {appt.status === 'pending' && (
                          <>
                            <button
                              onClick={() => updateAppointmentStatus(appt.id, 'confirmed')}
                              className="p-2 bg-green-50 text-green-600 border border-green-200 hover:bg-green-100 rounded-xl transition-all"
                              title="تأكيد الموعد"
                            >
                              <Check size={16} />
                            </button>
                            <button
                              onClick={() => updateAppointmentStatus(appt.id, 'cancelled')}
                              className="p-2 bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 rounded-xl transition-all"
                              title="إلغاء الموعد"
                            >
                              <X size={16} />
                            </button>
                          </>
                        )}
                        {appt.status === 'confirmed' && (
                          <button
                            onClick={() => updateAppointmentStatus(appt.id, 'cancelled')}
                            className="p-2 bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 rounded-xl transition-all text-xs font-semibold px-3 flex gap-1 items-center"
                            title="إلغاء التأكيد"
                          >
                            <X size={14} />
                            <span>إلغاء</span>
                          </button>
                        )}
                        <button
                          onClick={() => handleWhatsAppContact(appt)}
                          className="p-2 bg-brand-teal/5 text-brand-teal border border-brand-teal/20 hover:bg-brand-teal/10 rounded-xl transition-all text-xs font-semibold px-3 flex gap-1.5 items-center"
                          title="تواصل عبر الواتساب"
                        >
                          <MessageSquare size={14} />
                          <span>واتساب</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};
