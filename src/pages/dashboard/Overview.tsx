import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, Users, Clock, CheckCircle, ArrowUpRight, 
  TrendingUp, Plus 
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Cell, PieChart, Pie 
} from 'recharts';
import { useApp } from '../../context/AppContext';
import { Card, Button, Badge } from '../../components/ui/UIElements';

export const Overview: React.FC = () => {
  const { appointments, patients } = useApp();
  const navigate = useNavigate();

  // Get Today's Date String
  const todayStr = new Date().toISOString().split('T')[0];

  // Stats calculation
  const todayAppts = appointments.filter(a => a.preferredDate === todayStr);
  const totalPats = patients.length;
  const pendingBookings = appointments.filter(a => a.status === 'pending').length;
  const confirmedBookings = appointments.filter(a => a.status === 'confirmed').length;

  const stats = [
    { title: 'مواعيد اليوم الكلية', value: todayAppts.length, label: 'مواعيد مجدولة لتاريخ اليوم', icon: Calendar, color: 'text-brand-blue bg-brand-blue/5' },
    { title: 'المرضى المسجلين', value: totalPats, label: 'إجمالي ملفات المرضى بقاعدة البيانات', icon: Users, color: 'text-brand-teal bg-brand-teal/5' },
    { title: 'الحجوزات قيد المراجعة', value: pendingBookings, label: 'حجوزات جديدة تحتاج مراجعة', icon: Clock, color: 'text-yellow-600 bg-yellow-50' },
    { title: 'المواعيد المؤكدة', value: confirmedBookings, label: 'إجمالي المواعيد التي تم تأكيدها', icon: CheckCircle, color: 'text-green-600 bg-green-50' },
  ];

  // Chart 1: Monthly appointments data simulation
  const monthlyData = [
    { name: 'فبراير', appointments: 15, patients: 12 },
    { name: 'مارس', appointments: 28, patients: 20 },
    { name: 'أبريل', appointments: 35, patients: 24 },
    { name: 'مايو', appointments: 48, patients: 32 },
    { name: 'يونيو', appointments: 60, patients: 40 },
    { name: 'يوليو', appointments: appointments.length * 4, patients: patients.length * 3 }, // dynamic scaling
  ];

  // Chart 2: Service popularity simulation
  const servicePopularity = [
    { name: 'المياه البيضاء', value: appointments.filter(a => a.service.includes('المياه البيضاء')).length + 12 },
    { name: 'البنتاكام والأشعة', value: appointments.filter(a => a.department === 'examinations').length + 8 },
    { name: 'الليزك وتصحيح النظر', value: appointments.filter(a => a.service.includes('الليزك')).length + 5 },
    { name: 'عيادة كشف عيون', value: appointments.filter(a => a.service.includes('كشف عيون')).length + 15 },
  ];

  const COLORS = ['#003366', '#008080', '#e28743', '#76b5c5'];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Upper header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-brand-blue">لوحة الإحصائيات العامة</h1>
          <p className="text-xs text-brand-gray-dark mt-1">متابعة لحظية لحالة العيادة والمواعيد ومعدلات تسجيل المرضى</p>
        </div>
        <Button variant="secondary" size="md" className="flex items-center gap-2" onClick={() => navigate('/dashboard/appointments')}>
          <Plus size={16} />
          <span>إدارة المواعيد الجديدة</span>
        </Button>
      </div>

      {/* Grid Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card key={idx} className="p-6 flex justify-between items-start border border-brand-gray/30">
              <div>
                <span className="text-[11px] font-bold text-brand-gray-dark block mb-2">{stat.title}</span>
                <span className="text-3xl font-extrabold text-brand-blue font-sans">{stat.value}</span>
                <span className="text-[10px] text-brand-gray-dark/80 block mt-2.5">{stat.label}</span>
              </div>
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${stat.color}`}>
                <Icon size={20} />
              </div>
            </Card>
          );
        })}
      </div>

      {/* Charts Section Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Monthly appointments trend */}
        <Card className="lg:col-span-2 border border-brand-gray/30 p-6 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-bold text-brand-blue">معدلات المواعيد وزيادة المرضى الشهرية</h3>
            <span className="text-[10px] font-bold text-brand-teal flex items-center gap-1">
              <TrendingUp size={14} />
              نمو مطرد في يوليو
            </span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAppts" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#003366" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#003366" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPats" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#008080" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#008080" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e7eb" />
                <XAxis dataKey="name" stroke="#a0aec0" fontSize={11} tickLine={false} />
                <YAxis stroke="#a0aec0" fontSize={11} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="appointments" stroke="#003366" strokeWidth={2} fillOpacity={1} fill="url(#colorAppts)" name="المواعيد" />
                <Area type="monotone" dataKey="patients" stroke="#008080" strokeWidth={2} fillOpacity={1} fill="url(#colorPats)" name="المرضى الجدد" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Popularity Circle Chart */}
        <Card className="border border-brand-gray/30 p-6 flex flex-col justify-between">
          <h3 className="text-sm font-bold text-brand-blue mb-4">شعبية وتوزيع الخدمات الطبية</h3>
          <div className="h-56 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={servicePopularity}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {servicePopularity.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute flex flex-col items-center">
              <span className="text-[10px] font-bold text-brand-gray-dark">إجمالي العمليات</span>
              <span className="text-2xl font-extrabold text-brand-blue font-sans">
                {servicePopularity.reduce((a, b) => a + b.value, 0)}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4 text-[10px] text-brand-navy">
            {servicePopularity.map((entry, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: COLORS[idx] }} />
                <span className="truncate">{entry.name}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Today's Appointments Table Preview */}
      <Card className="border border-brand-gray/30 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-sm font-bold text-brand-blue">المواعيد المجدولة لتاريخ اليوم</h3>
          <Button variant="ghost" size="sm" className="text-brand-teal flex items-center gap-1" onClick={() => navigate('/dashboard/appointments')}>
            <span>عرض جميع المواعيد</span>
            <ArrowUpRight size={14} />
          </Button>
        </div>

        {todayAppts.length === 0 ? (
          <div className="text-center py-10 text-brand-gray-dark text-xs">
            لا توجد أي مواعيد مسجلة ليوم العمل الحالي.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="border-b border-brand-gray/40 text-brand-gray-dark font-bold">
                  <th className="pb-3 text-right">رقم الموعد</th>
                  <th className="pb-3 text-right">اسم المريض</th>
                  <th className="pb-3 text-right">رقم الهاتف</th>
                  <th className="pb-3 text-right">الخدمة الطبية</th>
                  <th className="pb-3 text-right">الفترة الزمنية</th>
                  <th className="pb-3 text-right">الحالة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-gray/25">
                {todayAppts.map((appt) => (
                  <tr key={appt.id} className="hover:bg-brand-gray-light/30">
                    <td className="py-4 font-sans font-semibold text-brand-blue">{appt.id}</td>
                    <td className="py-4 font-bold">{appt.patientName}</td>
                    <td className="py-4 font-sans">{appt.phone}</td>
                    <td className="py-4 text-brand-gray-dark">{appt.service}</td>
                    <td className="py-4 text-brand-gray-dark">{appt.preferredTime}</td>
                    <td className="py-4"><Badge status={appt.status} /></td>
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
