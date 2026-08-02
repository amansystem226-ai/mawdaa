import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { KeyRound, ShieldAlert } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button, Card, Input } from '../../components/ui/UIElements';

export const Login: React.FC = () => {
  const { login, isAuthenticated } = useApp();
  const navigate = useNavigate();
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const success = login(passcode);
      setLoading(false);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('رمز المرور المدخل غير صحيح. يرجى التأكد من إدخال الرمز الصحيح.');
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-navy p-4 relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay" style={{ backgroundImage: "url('/assets/office.jpg')" }} />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-teal/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl" />

      <div className="w-full max-w-md relative z-10">
        <Card className="border-0 shadow-premium p-8 bg-white/95 backdrop-blur-md">
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <img src="./assets/logo.jpg" alt="شعار مودة" className="w-16 h-16 rounded-full border-2 border-brand-teal mx-auto mb-4 object-cover" />
            <h2 className="text-2xl font-extrabold text-brand-blue font-heading">بوابة الطبيب والموظفين</h2>
            <p className="text-xs text-brand-gray-dark mt-1">سجل الدخول لإدارة حجوزات وسجلات مرصى مودة</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 text-red-700 text-xs border border-red-200 rounded-xl p-3.5 flex gap-2 items-start animate-in shake duration-300">
                <ShieldAlert size={18} className="shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div className="relative">
              <Input
                label="رمز المرور الآمن للوحة التحكم"
                placeholder="أدخل رمز المرور المكون من 6 أرقام"
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                error={error ? 'يرجى مراجعة الرمز' : undefined}
                className="font-sans text-center tracking-widest text-lg"
              />
              <KeyRound className="absolute left-3.5 top-9.5 text-brand-gray-dark" size={18} />
            </div>

            <Button
              variant="primary"
              size="lg"
              type="submit"
              fullWidth
              isLoading={loading}
              className="mt-4 shadow-soft"
            >
              تسجيل الدخول الآمن
            </Button>
          </form>

          {/* Help Info Footer */}
          <div className="mt-8 text-center border-t border-brand-gray/30 pt-6 text-[11px] text-brand-gray-dark font-medium leading-relaxed">
            🔒 مستوى حماية مشفر بالكامل للحفاظ على سرية بيانات المرضى والحجوزات.<br/>
            بوابة آمنة مخصصة لاستشاري طب وجراحة العيون والموظفين المصرح لهم فقط.
          </div>
        </Card>
      </div>
    </div>
  );
};
