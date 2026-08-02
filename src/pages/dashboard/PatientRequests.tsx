import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  MessageCircle, 
  CheckCircle2, 
  Clock, 
  Search, 
  Phone, 
  Calendar, 
  User, 
  Eye,
  FileText
} from 'lucide-react';

export const PatientRequests: React.FC = () => {
  const { appointments, toggleWhatsAppStatus } = useApp();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'not_contacted' | 'contacted'>('all');
  const [deptFilter, setDeptFilter] = useState<string>('all');
  const [selectedReq, setSelectedReq] = useState<any | null>(null);

  // Filter requests
  const filteredRequests = appointments.filter(req => {
    const matchesSearch = 
      req.patientName.toLowerCase().includes(search.toLowerCase()) ||
      req.phone.includes(search) ||
      req.service.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = 
      statusFilter === 'all' ||
      (statusFilter === 'not_contacted' && req.whatsappStatus !== 'contacted') ||
      (statusFilter === 'contacted' && req.whatsappStatus === 'contacted');

    const matchesDept = 
      deptFilter === 'all' || req.department === deptFilter;

    return matchesSearch && matchesStatus && matchesDept;
  });

  const totalCount = appointments.length;
  const contactedCount = appointments.filter(a => a.whatsappStatus === 'contacted').length;
  const pendingCount = totalCount - contactedCount;

  const handleOpenWhatsApp = (phone: string, name: string, service: string) => {
    const cleanPhone = phone.replace(/\D/g, '');
    const formattedPhone = cleanPhone.startsWith('20') ? cleanPhone : `20${cleanPhone.replace(/^0/, '')}`;
    const msg = encodeURIComponent(`أهلاً بك أ. ${name}، معكم مركز مودة لجراحات العيون (د. محمد عمار). بخصوص طلبكم المحجوز: ${service}. يسعدنا تأكيد الموعد واستكمال التفاصيل معك.`);
    window.open(`https://wa.me/${formattedPhone}?text=${msg}`, '_blank');
  };

  const getDeptBadge = (dept: string) => {
    switch (dept) {
      case 'examinations':
        return <span className="bg-cyan-50 text-cyan-700 border border-cyan-200 text-xs px-2.5 py-1 rounded-full font-bold">فحوصات وأشعة</span>;
      case 'surgeries':
        return <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs px-2.5 py-1 rounded-full font-bold">عمليات العيون</span>;
      case 'clinics':
        return <span className="bg-blue-50 text-blue-700 border border-blue-200 text-xs px-2.5 py-1 rounded-full font-bold">عيادة كشف</span>;
      default:
        return <span className="bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-full font-bold">طلب كشف</span>;
    }
  };

  return (
    <div className="space-y-8 text-right font-sans">

      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl md:text-3xl font-black text-navy font-heading">طلبات المرضى ومتابعة الواتساب</h1>
            <span className="bg-primary/10 text-primary font-bold text-xs px-3 py-1 rounded-full">
              {totalCount} طلبات حجز
            </span>
          </div>
          <p className="text-sm text-slate-500 font-medium">
            عرض وتتبع البيانات المدخلة بواسطة المرضى عبر الموقع ومتابعة التفاعل والتواصل على الواتساب
          </p>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-bold block mb-1">إجمالي طلبات المرضى</span>
            <span className="text-3xl font-black text-navy font-heading">{totalCount}</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <User size={22} />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-bold block mb-1">في انتظار الرد عبر الواتساب</span>
            <span className="text-3xl font-black text-rose-600 font-heading">{pendingCount}</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <Clock size={22} />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-bold block mb-1">تم التواصل والتأكيد</span>
            <span className="text-3xl font-black text-emerald-600 font-heading">{contactedCount}</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 size={22} />
          </div>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search size={18} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="بحث باسم المريض، الهواتف، أو الخدمة..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-10 pl-4 py-2.5 text-sm font-medium outline-none focus:border-primary focus:bg-white transition-all text-navy"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Filter Status */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${statusFilter === 'all' ? 'bg-white text-navy shadow-sm' : 'text-slate-600 hover:text-navy'}`}
            >
              الكل ({totalCount})
            </button>
            <button
              onClick={() => setStatusFilter('not_contacted')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${statusFilter === 'not_contacted' ? 'bg-rose-500 text-white shadow-sm' : 'text-slate-600 hover:text-rose-600'}`}
            >
              لم يتم الرد 🔴 ({pendingCount})
            </button>
            <button
              onClick={() => setStatusFilter('contacted')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${statusFilter === 'contacted' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:text-emerald-600'}`}
            >
              تم التواصل 🟢 ({contactedCount})
            </button>
          </div>

          {/* Department Filter */}
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-navy outline-none focus:border-primary cursor-pointer"
          >
            <option value="all">جميع الأقسام</option>
            <option value="examinations">الفحوصات والأشعة</option>
            <option value="surgeries">العمليات الجراحية</option>
            <option value="clinics">العيادات الكشفية</option>
          </select>
        </div>
      </div>

      {/* Patient Requests List Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 text-xs">
              <tr>
                <th className="py-4 px-6">بيانات المريض</th>
                <th className="py-4 px-6">الخدمة المطلوبة</th>
                <th className="py-4 px-6">تاريخ الحجز المفضل</th>
                <th className="py-4 px-6">ملاحظات / أعراض</th>
                <th className="py-4 px-6 text-center">حالة الرد عبر الواتساب</th>
                <th className="py-4 px-6 text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-navy">
              {filteredRequests.length > 0 ? (
                filteredRequests.map((req) => {
                  const isContacted = req.whatsappStatus === 'contacted';

                  return (
                    <tr key={req.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* Patient Name & Phone */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary font-bold flex items-center justify-center text-sm shrink-0">
                            {req.patientName.charAt(0)}
                          </div>
                          <div>
                            <span className="font-bold text-navy text-sm block leading-tight">{req.patientName}</span>
                            <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                              <Phone size={12} />
                              <span dir="ltr">{req.phone}</span>
                              {req.age && <span>• {req.age} سنة</span>}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Service & Dept */}
                      <td className="py-4 px-6">
                        <div className="space-y-1">
                          <span className="font-bold text-navy text-sm block">{req.service}</span>
                          {getDeptBadge(req.department)}
                        </div>
                      </td>

                      {/* Preferred Date & Time */}
                      <td className="py-4 px-6 text-xs text-slate-600">
                        <div className="flex items-center gap-1.5 font-bold text-navy mb-0.5">
                          <Calendar size={13} className="text-primary" />
                          <span>{req.preferredDate || req.createdAt}</span>
                        </div>
                        <span className="text-slate-400 text-[11px]">{req.preferredTime || 'الفترة الصباحية'}</span>
                      </td>

                      {/* Notes / Symptoms */}
                      <td className="py-4 px-6 text-xs text-slate-600 max-w-[220px]">
                        {req.notes ? (
                          <div className="bg-amber-50/70 border border-amber-200/60 p-2.5 rounded-xl text-amber-900 line-clamp-2 leading-relaxed">
                            {req.notes}
                          </div>
                        ) : (
                          <span className="text-slate-300 italic">لا توجد ملاحظات إضافية</span>
                        )}
                      </td>

                      {/* WhatsApp Contact Status */}
                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => toggleWhatsAppStatus(req.id)}
                          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95 ${
                            isContacted 
                              ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border border-emerald-300' 
                              : 'bg-rose-100 text-rose-800 hover:bg-rose-200 border border-rose-300 animate-pulse'
                          }`}
                          title="اضغط لتغيير حالة الرد"
                        >
                          {isContacted ? (
                            <>
                              <CheckCircle2 size={14} className="text-emerald-600" />
                              <span>تم التواصل عبر الواتساب</span>
                            </>
                          ) : (
                            <>
                              <Clock size={14} className="text-rose-600" />
                              <span>لم يتم الرد بعد (اضغط لتأكيد الرد)</span>
                            </>
                          )}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleOpenWhatsApp(req.phone, req.patientName, req.service)}
                            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
                          >
                            <MessageCircle size={14} />
                            <span>مراسلة الواتساب</span>
                          </button>

                          <button
                            onClick={() => setSelectedReq(req)}
                            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all cursor-pointer"
                            title="عرض التفاصيل الكاملة"
                          >
                            <Eye size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <FileText size={36} className="mx-auto mb-2 opacity-50" />
                    <p className="font-bold text-sm">لا توجد طلبات تطابق الفلتر المحدد</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Patient Request Detail Modal */}
      {selectedReq && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full text-right shadow-2xl border border-slate-100 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-primary-50 text-primary font-bold flex items-center justify-center text-base">
                  {selectedReq.patientName.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-navy text-lg">{selectedReq.patientName}</h3>
                  <span className="text-xs text-slate-400">{selectedReq.id}</span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedReq(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs font-medium text-navy">
              <div className="bg-slate-50 p-4 rounded-2xl space-y-2">
                <div className="flex justify-between border-b border-slate-200/60 pb-2">
                  <span className="text-slate-400">رقم الهاتف:</span>
                  <span className="font-bold" dir="ltr">{selectedReq.phone}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/60 pb-2">
                  <span className="text-slate-400">الخدمة المطلوبة:</span>
                  <span className="font-bold text-primary">{selectedReq.service}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/60 pb-2">
                  <span className="text-slate-400">التاريخ والوقت:</span>
                  <span className="font-bold">{selectedReq.preferredDate} ({selectedReq.preferredTime})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">حالة الرد:</span>
                  <span className={`font-bold ${selectedReq.whatsappStatus === 'contacted' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {selectedReq.whatsappStatus === 'contacted' ? 'تم التواصل عبر الواتساب 🟢' : 'لم يتم الرد بعد 🔴'}
                  </span>
                </div>
              </div>

              {selectedReq.notes && (
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-amber-900">
                  <span className="font-bold block mb-1 text-amber-800">ملاحظات وأعراض المريض:</span>
                  <p className="leading-relaxed">{selectedReq.notes}</p>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  toggleWhatsAppStatus(selectedReq.id);
                  setSelectedReq({
                    ...selectedReq,
                    whatsappStatus: selectedReq.whatsappStatus === 'contacted' ? 'not_contacted' : 'contacted'
                  });
                }}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-navy font-bold py-3 rounded-2xl text-xs transition-all cursor-pointer"
              >
                تغيير حالة الرد
              </button>
              <button
                onClick={() => {
                  handleOpenWhatsApp(selectedReq.phone, selectedReq.patientName, selectedReq.service);
                  setSelectedReq(null);
                }}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-2xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
              >
                <MessageCircle size={16} />
                <span>فتح محادثة الواتساب</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
