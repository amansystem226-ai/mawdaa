import React, { useState } from 'react';
import { Settings as SettingsIcon, Save, ShieldAlert, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Settings: React.FC = () => {
  const { clinicSettings, updateClinicSettings, changePassword } = useApp();
  const [success, setSuccess] = useState(false);
  const [pwSuccess, setPwSuccess] = useState(false);
  const [pwError, setPwError] = useState('');

  const [clinicName, setClinicName] = useState(clinicSettings.clinicName);
  const [phone1, setPhone1] = useState(clinicSettings.phone1);
  const [phone2, setPhone2] = useState(clinicSettings.phone2);
  const [address, setAddress] = useState(clinicSettings.address);
  const [startTime, setStartTime] = useState(clinicSettings.startTime);
  const [endTime, setEndTime] = useState(clinicSettings.endTime);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateClinicSettings({
      clinicName,
      phone1,
      phone2,
      address,
      startTime,
      endTime
    });
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  const handleChangePassword = () => {
    setPwError('');
    setPwSuccess(false);
    
    if (!newPassword || newPassword.length < 4) {
      setPwError('كلمة المرور يجب أن تكون 4 أحرف أو أرقام على الأقل');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwError('كلمة المرور الجديدة غير متطابقة مع التأكيد');
      return;
    }
    
    const ok = changePassword(newPassword);
    if (ok) {
      setPwSuccess(true);
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPwSuccess(false), 3000);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl animate-in fade-in duration-300 text-right dir-rtl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white font-heading">إعدادات النظام والعيادة</h1>
        <p className="text-xs text-slate-400 mt-1">إدارة بيانات العيادة العامة، مواعيد الكشف، وبوابة أرقام التواصل والواتساب</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {success && (
          <div className="bg-emerald-950/80 text-emerald-300 text-xs border border-emerald-500/40 rounded-2xl p-4 flex gap-2.5 items-center animate-in slide-in-from-top duration-300 shadow-xl">
            <CheckCircle size={18} className="shrink-0 text-emerald-400" />
            <span>تم حفظ إعدادات العيادة بنجاح وسيتم تطبيقها فوراً.</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* Main Info */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-[#0F172A] border border-slate-800/80 rounded-3xl p-6 space-y-5 shadow-2xl">
              <h3 className="text-sm font-bold text-[#1EC8E8] flex items-center gap-2 mb-2 font-heading">
                <Info size={16} />
                <span>البيانات الأساسية للمركز</span>
              </h3>
              
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300">اسم المركز الطبي</label>
                <input
                  value={clinicName}
                  onChange={(e) => setClinicName(e.target.value)}
                  className="w-full bg-[#080C14] border border-slate-700/80 rounded-xl px-4 py-3 text-xs font-medium outline-none focus:border-[#1EC8E8] transition-all text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-300">رقم الواتساب / المحمول الرئيسي</label>
                  <input
                    value={phone1}
                    onChange={(e) => setPhone1(e.target.value)}
                    className="w-full bg-[#080C14] border border-slate-700/80 rounded-xl px-4 py-3 text-xs font-sans font-medium outline-none focus:border-[#1EC8E8] transition-all text-white"
                    dir="ltr"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-300">رقم الهاتف الأرضي</label>
                  <input
                    value={phone2}
                    onChange={(e) => setPhone2(e.target.value)}
                    className="w-full bg-[#080C14] border border-slate-700/80 rounded-xl px-4 py-3 text-xs font-sans font-medium outline-none focus:border-[#1EC8E8] transition-all text-white"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300">العنوان التفصيلي للفرع</label>
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-[#080C14] border border-slate-700/80 rounded-xl px-4 py-3 text-xs font-medium outline-none focus:border-[#1EC8E8] transition-all text-white"
                />
              </div>
            </div>

            <div className="bg-[#0F172A] border border-slate-800/80 rounded-3xl p-6 space-y-5 shadow-2xl">
              <h3 className="text-sm font-bold text-[#1EC8E8] flex items-center gap-2 mb-2 font-heading">
                <SettingsIcon size={16} />
                <span>مواعيد العمل والكشف اليومية</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-300">ساعة بدء العمل بالعيادة</label>
                  <select
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full bg-[#080C14] border border-slate-700/80 rounded-xl px-4 py-3 text-xs font-bold text-white outline-none focus:border-[#1EC8E8] cursor-pointer"
                  >
                    <option value="09:00 AM">09:00 صباحاً</option>
                    <option value="10:00 AM">10:00 صباحاً</option>
                    <option value="12:00 PM">12:00 ظهراً</option>
                    <option value="02:00 PM">02:00 مساءً</option>
                    <option value="04:00 PM">04:00 مساءً</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-300">ساعة الإغلاق</label>
                  <select
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full bg-[#080C14] border border-slate-700/80 rounded-xl px-4 py-3 text-xs font-bold text-white outline-none focus:border-[#1EC8E8] cursor-pointer"
                  >
                    <option value="06:00 PM">06:00 مساءً</option>
                    <option value="08:00 PM">08:00 مساءً</option>
                    <option value="10:00 PM">10:00 مساءً</option>
                    <option value="11:00 PM">11:00 مساءً</option>
                  </select>
                </div>
              </div>

              <div className="bg-amber-950/40 border border-amber-500/30 text-amber-200 text-[11px] p-3.5 rounded-2xl leading-relaxed">
                * تنعكس هذه المواعيد مباشرة في نموذج حجز المرضى على الموقع الخارجي وتحدد فترات الساعات المتاحة.
              </div>
            </div>
          </div>

          {/* Security details side column */}
          <div className="space-y-6">
            <div className="bg-[#0F172A] border border-slate-800/80 rounded-3xl p-6 space-y-4 shadow-2xl">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-2 mb-2 font-heading">
                <ShieldAlert size={16} />
                <span>تغيير كلمة المرور</span>
              </h3>

              {pwSuccess && (
                <div className="bg-emerald-950/80 text-emerald-300 text-xs border border-emerald-500/40 rounded-xl p-3 flex gap-2 items-center">
                  <CheckCircle size={14} />
                  <span>تم تغيير كلمة المرور بنجاح!</span>
                </div>
              )}

              {pwError && (
                <div className="bg-rose-950/80 text-rose-300 text-xs border border-rose-500/40 rounded-xl p-3 flex gap-2 items-center">
                  <AlertTriangle size={14} />
                  <span>{pwError}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300">كلمة المرور الجديدة</label>
                <input
                  type="password"
                  placeholder="أدخل كلمة مرور جديدة"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-[#080C14] border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs font-sans outline-none focus:border-rose-400 transition-all text-white placeholder-slate-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300">تأكيد كلمة المرور الجديدة</label>
                <input
                  type="password"
                  placeholder="أعد كتابة كلمة المرور الجديدة"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-[#080C14] border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs font-sans outline-none focus:border-rose-400 transition-all text-white placeholder-slate-500"
                />
              </div>

              <button
                type="button"
                onClick={handleChangePassword}
                className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold h-11 rounded-xl text-xs transition-all shadow-lg active:scale-95 cursor-pointer mt-2"
              >
                تغيير كلمة المرور
              </button>

              <p className="text-[10px] text-slate-500 leading-relaxed pt-2">
                * لأسباب أمنية وتدابير حماية سجلات المرضى، يجب تغيير كلمة المرور دورياً مرة كل 3 أشهر.
              </p>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex justify-end gap-3 border-t border-slate-800 pt-6">
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-[#0A7C86] hover:bg-[#075c64] text-white font-bold h-12 px-8 rounded-2xl transition-all text-sm shadow-xl active:scale-95 cursor-pointer font-heading"
          >
            <Save size={16} />
            <span>حفظ الإعدادات</span>
          </button>
        </div>
      </form>
    </div>
  );
};
