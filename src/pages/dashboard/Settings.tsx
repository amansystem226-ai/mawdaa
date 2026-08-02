import React, { useState } from 'react';
import { Settings as SettingsIcon, Save, ShieldAlert, CheckCircle, Info } from 'lucide-react';
import { Card, Button, Input, Select } from '../../components/ui/UIElements';

export const Settings: React.FC = () => {
  const [success, setSuccess] = useState(false);
  const [clinicName, setClinicName] = useState('مركز مودة لجراحات العيون');
  const [phone1, setPhone1] = useState('01000141542');
  const [phone2, setPhone2] = useState('0483445807');
  const [address, setAddress] = useState('أشمون، شارع سعد زغلول - عمارة المساعي المشكورة - فوق جني سويت');
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-brand-blue">إعدادات النظام والعيادة</h1>
        <p className="text-xs text-brand-gray-dark mt-1">إدارة بيانات العيادة العامة، مواعيد الكشف، وبوابة أرقام التواصل والواتساب</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {success && (
          <div className="bg-green-50 text-green-700 text-xs border border-green-200 rounded-xl p-4 flex gap-2.5 items-center animate-in slide-in-from-top duration-300">
            <CheckCircle size={18} className="shrink-0" />
            <span>تم حفظ التعديلات وإعدادات العيادة بنجاح في قاعدة البيانات المحلية.</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* Main Info */}
          <div className="md:col-span-2 space-y-6">
            <Card className="border border-brand-gray/30 p-6 space-y-4">
              <h3 className="text-sm font-bold text-brand-blue flex items-center gap-2 mb-2">
                <Info size={16} />
                <span>البيانات الأساسية للمركز</span>
              </h3>
              
              <Input
                label="اسم المركز الطبي"
                value={clinicName}
                onChange={(e) => setClinicName(e.target.value)}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="رقم الواتساب / المحمول الرئيسي"
                  value={phone1}
                  onChange={(e) => setPhone1(e.target.value)}
                  className="font-sans"
                />
                <Input
                  label="رقم الهاتف الأرضي"
                  value={phone2}
                  onChange={(e) => setPhone2(e.target.value)}
                  className="font-sans"
                />
              </div>

              <Input
                label="العنوان التفصيلي للفرع"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Card>

            <Card className="border border-brand-gray/30 p-6 space-y-4">
              <h3 className="text-sm font-bold text-brand-blue flex items-center gap-2 mb-2">
                <SettingsIcon size={16} />
                <span>مواعيد العمل والكشف اليومية</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="ساعة بدء العمل بالعيادة"
                  options={[
                    { value: '02:00 PM', label: '02:00 مساءً (الافتراضي)' },
                    { value: '12:00 PM', label: '12:00 ظهراً' },
                    { value: '04:00 PM', label: '04:00 مساءً' }
                  ]}
                />
                <Select
                  label="ساعة الإغلاق"
                  options={[
                    { value: '10:00 PM', label: '10:00 مساءً (الافتراضي)' },
                    { value: '08:00 PM', label: '08:00 مساءً' },
                    { value: '11:00 PM', label: '11:00 مساءً' }
                  ]}
                />
              </div>

              <div className="bg-yellow-50/50 border border-yellow-200 text-yellow-800 text-[10px] p-3 rounded-lg leading-relaxed">
                * تنعكس هذه المواعيد مباشرة في نموذج حجز المرضى على الموقع الخارجي وتحدد فترات الساعات المتاحة.
              </div>
            </Card>
          </div>

          {/* Security details side column */}
          <div className="space-y-6">
            <Card className="border border-brand-gray/30 p-6 space-y-4">
              <h3 className="text-sm font-bold text-red-600 flex items-center gap-2 mb-2">
                <ShieldAlert size={16} />
                <span>حماية بوابة الإدارة</span>
              </h3>

              <Input
                label="رمز المرور الحالي للوحة التحكم"
                value="123456"
                type="password"
                disabled
                className="font-sans"
              />

              <Input
                label="رمز مرور جديد للوحة التحكم"
                placeholder="أدخل رمز مرور جديد (رقام فقط)"
                type="password"
                className="font-sans"
              />

              <p className="text-[10px] text-brand-gray-dark leading-relaxed">
                * لأسباب أمنية وتدابير حماية سجلات المرضى، يجب تغيير كلمة المرور دورياً مرة كل 3 أشهر.
              </p>
            </Card>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex justify-end gap-3 border-t border-brand-gray/30 pt-6">
          <Button variant="primary" size="md" type="submit" className="flex items-center gap-2">
            <Save size={16} />
            <span>حفظ الإعدادات</span>
          </Button>
        </div>
      </form>
    </div>
  );
};
