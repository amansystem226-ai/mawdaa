import React, { useState } from 'react';
import { 
  Users, Search, Calendar, FileText, 
  ChevronLeft, Clock 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../../components/ui/UIElements';

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
    <div className="space-y-6 animate-in fade-in duration-300 text-right dir-rtl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white font-heading">سجلات وملفات المرضى</h1>
        <p className="text-xs text-slate-400 mt-1">تصفح السجلات الطبية للمرضى وتاريخ الزيارات الطبية والمواعيد السابقة لكل حالة</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Col 1 & 2: Patients List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#0F172A] p-4 border border-slate-800/80 rounded-2xl relative shadow-xl">
            <Search className="absolute right-7.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              placeholder="ابحث عن مريض بالاسم أو رقم الهاتف المحمول..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#080C14] border border-slate-700/80 rounded-xl pr-12 pl-4 py-3 text-xs font-medium outline-none focus:border-[#1EC8E8] transition-all text-white placeholder-slate-500"
            />
          </div>

          <div className="bg-[#0F172A] border border-slate-800/80 rounded-3xl p-0 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="bg-[#070D1D] border-b border-slate-800 text-slate-400 font-bold">
                    <th className="p-4 text-right">رقم الملف</th>
                    <th className="p-4 text-right">اسم المريض</th>
                    <th className="p-4 text-right">الهاتف</th>
                    <th className="p-4 text-right">تاريخ التسجيل</th>
                    <th className="p-4 text-center">الملف الطبي</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-200">
                  {filteredPatients.map((pat) => (
                    <tr 
                      key={pat.id} 
                      className={`hover:bg-slate-800/50 transition-all ${
                        selectedPatId === pat.id ? 'bg-[#1EC8E8]/10 border-r-4 border-[#1EC8E8]' : ''
                      }`}
                    >
                      <td className="p-4 font-sans font-semibold text-[#1EC8E8]">{pat.id}</td>
                      <td className="p-4 font-bold text-white text-sm">{pat.name}</td>
                      <td className="p-4 font-sans text-slate-300" dir="ltr">{pat.phone}</td>
                      <td className="p-4 font-sans text-slate-400">{pat.createdAt}</td>
                      <td className="p-4 text-center">
                        <button 
                          className="inline-flex items-center gap-1 text-xs font-bold text-[#1EC8E8] hover:text-cyan-300 bg-cyan-950/60 px-3 py-1.5 rounded-xl border border-cyan-500/30 transition-all cursor-pointer"
                          onClick={() => setSelectedPatId(pat.id)}
                        >
                          <span>عرض السجل</span>
                          <ChevronLeft size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Col 3: Selected Patient Profile details */}
        <div>
          {selectedPatient ? (
            <div className="bg-[#0F172A] border border-slate-800/80 rounded-3xl p-6 space-y-6 text-white shadow-2xl animate-in slide-in-from-left duration-300">
              <div className="border-b border-slate-800 pb-4 text-center sm:text-right">
                <span className="text-[10px] font-bold bg-[#1EC8E8]/10 text-[#1EC8E8] border border-[#1EC8E8]/30 px-3 py-1 rounded-full">{selectedPatient.id}</span>
                <h3 className="text-xl font-bold text-white mt-3 mb-1 font-heading">{selectedPatient.name}</h3>
                <span className="text-xs font-sans text-slate-400 font-semibold" dir="ltr">{selectedPatient.phone}</span>
              </div>

              {/* Personal Details */}
              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">تاريخ أول كشف:</span>
                  <span className="font-semibold text-white">{selectedPatient.createdAt}</span>
                </div>
              </div>

              {/* Medical notes */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-[#1EC8E8] flex items-center gap-1.5">
                  <FileText size={14} />
                  <span>الملاحظات والسجل الطبي:</span>
                </h4>
                <p className="text-xs text-slate-300 bg-[#080C14] border border-slate-800 p-3.5 rounded-2xl leading-relaxed">
                  {selectedPatient.notes || 'لا توجد ملاحظات أو أمراض مزمنة مسجلة في ملف المريض حالياً.'}
                </p>
              </div>

              {/* Appointment History */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-[#1EC8E8] flex items-center gap-1.5 border-b border-slate-800 pb-2">
                  <Calendar size={14} />
                  <span>تاريخ حجوزات المريض:</span>
                </h4>

                {patientAppointments.length === 0 ? (
                  <p className="text-[10px] text-slate-500 text-center py-4">لا توجد حجوزات سابقة مسجلة.</p>
                ) : (
                  <div className="space-y-3 max-h-52 overflow-y-auto pr-1">
                    {patientAppointments.map(appt => (
                      <div key={appt.id} className="bg-[#080C14] border border-slate-800 rounded-2xl p-3.5 text-xs">
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="font-sans font-bold text-[#1EC8E8]">{appt.id}</span>
                          <Badge status={appt.status} />
                        </div>
                        <div className="font-bold mb-1 text-white">{appt.service}</div>
                        <div className="text-[10px] text-slate-400 font-sans flex items-center gap-1">
                          <Clock size={10} className="text-[#1EC8E8]" />
                          <span>{appt.preferredDate} ({appt.preferredTime})</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-[#0F172A] border border-slate-800/80 rounded-3xl p-8 text-center text-slate-400 text-xs h-full flex flex-col items-center justify-center shadow-xl">
              <Users size={44} className="text-slate-700 mb-4" />
              <span>يرجى اختيار مريض من الجدول لعرض سجل الحجوزات الكامل وتفاصيل حالته الطبية.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
