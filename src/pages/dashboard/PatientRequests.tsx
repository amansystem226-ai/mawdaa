import React, { useState, useEffect } from 'react';
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
  FileText,
  RefreshCw,
  Trash2
} from 'lucide-react';

export const PatientRequests: React.FC = () => {
  const { appointments, toggleWhatsAppStatus, deleteAppointment, refreshFromSupabase } = useApp();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'not_contacted' | 'contacted'>('all');
  const [deptFilter, setDeptFilter] = useState<string>('all');
  const [selectedReq, setSelectedReq] = useState<any | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    refreshFromSupabase();
  }, []);

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    await refreshFromSupabase();
    setTimeout(() => setIsRefreshing(false), 500);
  };

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
    const msg = encodeURIComponent(`أهلاً بك أ. ${name}، معكم مركز مودة لجراحات العيون بمدينة أشمون - محافظة المنوفية. بخصوص طلبكم المحجوز: ${service}. يسعدنا تأكيد الموعد واستكمال التفاصيل معك.`);
    window.open(`https://wa.me/${formattedPhone}?text=${msg}`, '_blank');
  };

  const getDeptBadge = (dept: string) => {
    switch (dept) {
      case 'examinations':
        return <span className="bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 text-xs px-3 py-1 rounded-full font-bold">فحوصات وأشعة</span>;
      case 'surgeries':
        return <span className="bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 text-xs px-3 py-1 rounded-full font-bold">عمليات العيون</span>;
      case 'clinics':
        return <span className="bg-blue-950/80 text-blue-300 border border-blue-500/30 text-xs px-3 py-1 rounded-full font-bold">عيادة كشف</span>;
      default:
        return <span className="bg-slate-800 text-slate-300 text-xs px-3 py-1 rounded-full font-bold">طلب كشف</span>;
    }
  };

  return (
    <div className="space-y-8 text-right font-sans">

      {/* Header Banner */}
      <div className="bg-[#0F172A] rounded-3xl p-6 md:p-8 border border-slate-800/80 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl md:text-3xl font-black text-white font-heading">طلبات المرضى ومتابعة الواتساب</h1>
            <span className="bg-[#1EC8E8]/10 text-[#1EC8E8] border border-[#1EC8E8]/30 font-bold text-xs px-3.5 py-1 rounded-full">
              {totalCount} طلبات حجز
            </span>
          </div>
          <p className="text-sm text-slate-400 font-medium">
            عرض وتتبع البيانات المدخلة بواسطة المرضى عبر الموقع ومتابعة التفاعل والتواصل على الواتساب
          </p>
        </div>

        <button
          onClick={handleManualRefresh}
          disabled={isRefreshing}
          className="inline-flex items-center gap-2 bg-[#1EC8E8]/10 hover:bg-[#1EC8E8]/20 text-[#1EC8E8] font-bold text-xs md:text-sm px-5 py-3 rounded-2xl transition-all border border-[#1EC8E8]/30 cursor-pointer shrink-0 shadow-lg active:scale-95"
        >
          <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
          <span>تحديث الطلبات من السيرفر</span>
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-[#0F172A] rounded-2xl p-6 border border-slate-800/80 shadow-xl flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-bold block mb-1">إجمالي طلبات المرضى</span>
            <span className="text-3xl font-black text-white font-heading">{totalCount}</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-cyan-950/70 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
            <User size={22} />
          </div>
        </div>

        <div className="bg-[#0F172A] rounded-2xl p-6 border border-slate-800/80 shadow-xl flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-bold block mb-1">في انتظار الرد عبر الواتساب</span>
            <span className="text-3xl font-black text-rose-400 font-heading">{pendingCount}</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-rose-950/70 border border-rose-500/30 text-rose-400 flex items-center justify-center">
            <Clock size={22} />
          </div>
        </div>

        <div className="bg-[#0F172A] rounded-2xl p-6 border border-slate-800/80 shadow-xl flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-bold block mb-1">تم التواصل والتأكيد</span>
            <span className="text-3xl font-black text-emerald-400 font-heading">{contactedCount}</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
            <CheckCircle2 size={22} />
          </div>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-[#0F172A] rounded-2xl p-5 border border-slate-800/80 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search size={18} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="بحث باسم المريض، الهواتف، أو الخدمة..."
            className="w-full bg-[#080C14] border border-slate-700/80 rounded-xl pr-10 pl-4 py-2.5 text-sm font-medium outline-none focus:border-[#1EC8E8] transition-all text-white placeholder-slate-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Filter Status */}
          <div className="flex items-center gap-1 bg-[#080C14] p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${statusFilter === 'all' ? 'bg-[#0F172A] text-white shadow-md border border-slate-700' : 'text-slate-400 hover:text-white'}`}
            >
              الكل ({totalCount})
            </button>
            <button
              onClick={() => setStatusFilter('not_contacted')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${statusFilter === 'not_contacted' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-400 hover:text-rose-400'}`}
            >
              لم يتم الرد 🔴 ({pendingCount})
            </button>
            <button
              onClick={() => setStatusFilter('contacted')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${statusFilter === 'contacted' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-emerald-400'}`}
            >
              تم التواصل 🟢 ({contactedCount})
            </button>
          </div>

          {/* Department Filter */}
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="bg-[#080C14] border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-200 outline-none focus:border-[#1EC8E8] cursor-pointer"
          >
            <option value="all">جميع الأقسام</option>
            <option value="examinations">الفحوصات والأشعة</option>
            <option value="surgeries">العمليات الجراحية</option>
            <option value="clinics">العيادات الكشفية</option>
          </select>
        </div>
      </div>

      {/* Patient Requests List Table */}
      <div className="bg-[#0F172A] rounded-3xl border border-slate-800/80 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-[1050px] text-right text-sm border-collapse">
            <thead className="bg-[#070D1D] text-slate-400 font-bold border-b border-slate-800 text-xs">
              <tr>
                <th className="py-4.5 px-5 whitespace-nowrap min-w-[200px]">بيانات المريض</th>
                <th className="py-4.5 px-5 whitespace-nowrap min-w-[190px]">الخدمة المطلوبة</th>
                <th className="py-4.5 px-5 whitespace-nowrap min-w-[140px]">تاريخ الحجز المفضل</th>
                <th className="py-4.5 px-5 whitespace-nowrap min-w-[180px]">ملاحظات / أعراض</th>
                <th className="py-4.5 px-5 text-center whitespace-nowrap min-w-[190px]">حالة الرد عبر الواتساب</th>
                <th className="py-4.5 px-5 text-center whitespace-nowrap min-w-[160px]">إجراءات</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800/60 font-medium text-slate-200">
              {filteredRequests.length > 0 ? (
                filteredRequests.map((req) => {
                  const isContacted = req.whatsappStatus === 'contacted';

                  return (
                    <tr key={req.id} className="hover:bg-slate-800/40 transition-colors">
                      {/* Patient Name & Phone */}
                      <td className="py-4 px-5 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-cyan-950/80 border border-cyan-500/30 text-[#1EC8E8] font-bold flex items-center justify-center text-sm shrink-0">
                            {req.patientName.charAt(0)}
                          </div>
                          <div>
                            <span className="font-bold text-white text-sm block font-heading whitespace-nowrap">{req.patientName}</span>
                            <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                              <Phone size={12} className="text-[#1EC8E8] shrink-0" />
                              <span dir="ltr" className="font-sans whitespace-nowrap">{req.phone}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Service & Dept */}
                      <td className="py-4 px-5 whitespace-nowrap">
                        <div className="flex flex-col items-start gap-1.5">
                          <span className="font-bold text-slate-100 text-sm block whitespace-nowrap">{req.service}</span>
                          <div>{getDeptBadge(req.department)}</div>
                        </div>
                      </td>

                      {/* Preferred Date & Time */}
                      <td className="py-4 px-5 whitespace-nowrap text-xs text-slate-300">
                        <div className="flex items-center gap-1.5 font-bold text-white mb-1 whitespace-nowrap">
                          <Calendar size={13} className="text-[#1EC8E8] shrink-0" />
                          <span className="font-sans">{req.preferredDate || req.createdAt}</span>
                        </div>
                        <span className="text-slate-400 text-[11px] block whitespace-nowrap">{req.preferredTime || 'الفترة الصباحية'}</span>
                      </td>

                      {/* Notes / Symptoms */}
                      <td className="py-4 px-5 text-xs text-slate-300 max-w-[220px]">
                        {req.notes ? (
                          <div className="bg-amber-950/40 border border-amber-500/30 p-2.5 rounded-xl text-amber-200 text-xs leading-relaxed">
                            {req.notes}
                          </div>
                        ) : (
                          <span className="text-slate-600 italic">لا توجد ملاحظات</span>
                        )}
                      </td>

                      {/* WhatsApp Contact Status */}
                      <td className="py-4 px-5 text-center whitespace-nowrap">
                        <button
                          onClick={() => toggleWhatsAppStatus(req.id)}
                          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer shadow-md active:scale-95 whitespace-nowrap ${
                            isContacted 
                              ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-900/80' 
                              : 'bg-rose-950/80 text-rose-300 border border-rose-500/40 hover:bg-rose-900/80 animate-pulse'
                          }`}
                          title="اضغط لتغيير حالة الرد"
                        >
                          {isContacted ? (
                            <>
                              <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                              <span>تم التواصل عبر الواتساب</span>
                            </>
                          ) : (
                            <>
                              <Clock size={14} className="text-rose-400 shrink-0" />
                              <span>لم يتم الرد (اضغط لتأكيد الرد)</span>
                            </>
                          )}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-5 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-2 whitespace-nowrap">
                          <button
                            onClick={() => handleOpenWhatsApp(req.phone, req.patientName, req.service)}
                            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-lg active:scale-95 cursor-pointer border border-emerald-400/30 whitespace-nowrap"
                          >
                            <MessageCircle size={14} />
                            <span>مراسلة</span>
                          </button>

                          <button
                            onClick={() => setSelectedReq(req)}
                            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition-all cursor-pointer border border-slate-700"
                            title="عرض التفاصيل الكاملة"
                          >
                            <Eye size={16} />
                          </button>

                          <button
                            onClick={() => { if (window.confirm(`هل أنت متأكد من حذف طلب ${req.patientName}؟`)) deleteAppointment(req.id); }}
                            className="p-2 bg-rose-950/50 hover:bg-rose-900/70 text-rose-400 rounded-xl transition-all cursor-pointer border border-rose-800/50"
                            title="حذف الطلب نهائياً"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-16 text-center text-slate-500">
                    <FileText size={40} className="mx-auto mb-3 opacity-40" />
                    <p className="font-bold text-sm text-slate-400">لا توجد طلبات تطابق الفلتر المحدد</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Patient Request Detail Modal */}
      {selectedReq && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0F172A] rounded-3xl p-6 sm:p-8 max-w-lg w-full text-right shadow-2xl border border-slate-800 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-cyan-950 text-[#1EC8E8] font-bold flex items-center justify-center text-base border border-cyan-500/30">
                  {selectedReq.patientName.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">{selectedReq.patientName}</h3>
                  <span className="text-xs text-slate-400">{selectedReq.id}</span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedReq(null)}
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center font-bold border border-slate-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs font-medium text-slate-200">
              <div className="bg-[#080C14] p-4 rounded-2xl space-y-2 border border-slate-800">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">رقم الهاتف:</span>
                  <span className="font-bold text-white" dir="ltr">{selectedReq.phone}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">الخدمة المطلوبة:</span>
                  <span className="font-bold text-[#1EC8E8]">{selectedReq.service}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">التاريخ والوقت:</span>
                  <span className="font-bold text-white">{selectedReq.preferredDate} ({selectedReq.preferredTime})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">حالة الرد:</span>
                  <span className={`font-bold ${selectedReq.whatsappStatus === 'contacted' ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {selectedReq.whatsappStatus === 'contacted' ? 'تم التواصل عبر الواتساب 🟢' : 'لم يتم الرد بعد 🔴'}
                  </span>
                </div>
              </div>

              {selectedReq.notes && (
                <div className="bg-amber-950/40 border border-amber-500/30 p-4 rounded-2xl text-amber-200">
                  <span className="font-bold block mb-1 text-amber-400">ملاحظات وأعراض المريض:</span>
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
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3.5 rounded-2xl text-xs transition-all cursor-pointer border border-slate-700"
              >
                تغيير حالة الرد
              </button>
              <button
                onClick={() => {
                  handleOpenWhatsApp(selectedReq.phone, selectedReq.patientName, selectedReq.service);
                  setSelectedReq(null);
                }}
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-2xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg border border-emerald-400/30"
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
