import React, { useState } from 'react';
import { 
  Users, Search, Calendar, FileText, 
  ChevronLeft, Clock 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Card, Button, Input, Badge } from '../../components/ui/UIElements';

export const Patients: React.FC = () => {
  const { patients, appointments } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatId, setSelectedPatId] = useState<string | null>(null);

  // Filter patients by search term
  const filteredPatients = patients.filter((pat) => 
    pat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pat.phone.includes(searchTerm)
  );

  // Selected Patient Details
  const selectedPatient = patients.find(p => p.id === selectedPatId);
  const patientAppointments = selectedPatient 
    ? appointments.filter(a => a.phone === selectedPatient.phone)
    : [];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-brand-blue">سجلات وملفات المرضى</h1>
        <p className="text-xs text-brand-gray-dark mt-1">تصفح السجلات الطبية للمرضى وتاريخ الزيارات الطبية والمواعيد السابقة لكل حالة</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Col 1 & 2: Patients List */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-4 border border-brand-gray/30 relative">
            <Input
              placeholder="ابحث عن مريض بالاسم أو رقم الهاتف المحمول..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-7.5 top-7.5 text-brand-gray-dark/80" size={18} />
          </Card>

          <Card className="border border-brand-gray/30 p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="bg-brand-blue-dark/5 border-b border-brand-gray/40 text-brand-navy font-bold">
                    <th className="p-4 text-right">رقم الملف</th>
                    <th className="p-4 text-right">اسم المريض</th>
                    <th className="p-4 text-right">الهاتف</th>
                    <th className="p-4 text-right">العمر</th>
                    <th className="p-4 text-right">تاريخ التسجيل</th>
                    <th className="p-4 text-center">الملف الطبي</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-gray/25">
                  {filteredPatients.map((pat) => (
                    <tr 
                      key={pat.id} 
                      className={`hover:bg-brand-gray-light/30 transition-all ${
                        selectedPatId === pat.id ? 'bg-brand-teal/5' : ''
                      }`}
                    >
                      <td className="p-4 font-sans font-semibold text-brand-blue">{pat.id}</td>
                      <td className="p-4 font-bold">{pat.name}</td>
                      <td className="p-4 font-sans">{pat.phone}</td>
                      <td className="p-4 font-sans font-semibold">{pat.age} سنة</td>
                      <td className="p-4 font-sans text-brand-gray-dark">{pat.createdAt}</td>
                      <td className="p-4 text-center">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs font-bold gap-1 text-brand-teal hover:text-brand-teal-dark"
                          onClick={() => setSelectedPatId(pat.id)}
                        >
                          <span>عرض السجل</span>
                          <ChevronLeft size={14} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Col 3: Selected Patient Profile details */}
        <div>
          {selectedPatient ? (
            <Card className="border border-brand-gray/30 p-6 space-y-6 bg-white animate-in slide-in-from-left duration-300">
              <div className="border-b border-brand-gray/40 pb-4 text-center sm:text-right">
                <span className="text-[10px] font-bold bg-brand-blue/5 text-brand-blue px-3 py-1 rounded-full">{selectedPatient.id}</span>
                <h3 className="text-lg font-bold text-brand-blue mt-3 mb-1">{selectedPatient.name}</h3>
                <span className="text-xs font-sans text-brand-gray-dark font-semibold">{selectedPatient.phone}</span>
              </div>

              {/* Personal Details */}
              <div className="space-y-3 text-xs text-brand-navy">
                <div className="flex justify-between border-b border-brand-gray/25 pb-2">
                  <span>العمر:</span>
                  <span className="font-bold">{selectedPatient.age} سنة</span>
                </div>
                <div className="flex justify-between border-b border-brand-gray/25 pb-2">
                  <span>تاريخ أول كشف:</span>
                  <span className="font-semibold">{selectedPatient.createdAt}</span>
                </div>
              </div>

              {/* Medical notes */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-brand-blue flex items-center gap-1.5">
                  <FileText size={14} />
                  <span>الملاحظات والسجل الطبي:</span>
                </h4>
                <p className="text-xs text-brand-gray-dark bg-brand-gray-light/60 p-3 rounded-lg leading-relaxed">
                  {selectedPatient.notes || 'لا توجد ملاحظات أو أمراض مزمنة مسجلة في ملف المريض حالياً.'}
                </p>
              </div>

              {/* Appointment History */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-brand-blue flex items-center gap-1.5 border-b border-brand-gray/30 pb-2">
                  <Calendar size={14} />
                  <span>تاريخ حجوزات المريض:</span>
                </h4>

                {patientAppointments.length === 0 ? (
                  <p className="text-[10px] text-brand-gray-dark text-center py-4">لا توجد حجوزات سابقة مسجلة.</p>
                ) : (
                  <div className="space-y-3 max-h-52 overflow-y-auto pr-1">
                    {patientAppointments.map(appt => (
                      <div key={appt.id} className="bg-brand-gray-light/40 border border-brand-gray/30 rounded-xl p-3 text-xs">
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="font-sans font-bold text-brand-blue">{appt.id}</span>
                          <Badge status={appt.status} />
                        </div>
                        <div className="font-bold mb-1 text-brand-navy">{appt.service}</div>
                        <div className="text-[10px] text-brand-gray-dark font-sans flex items-center gap-1">
                          <Clock size={10} />
                          <span>{appt.preferredDate} ({appt.preferredTime})</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          ) : (
            <Card className="border border-brand-gray/30 p-8 text-center text-brand-gray-dark text-xs h-full flex flex-col items-center justify-center">
              <Users size={40} className="text-brand-blue/30 mb-4" />
              <span>يرجى اختيار مريض من الجدول لعرض سجل الحجوزات الكامل وتفاصيل حالته الطبية.</span>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
