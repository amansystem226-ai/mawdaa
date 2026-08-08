import React, { Suspense, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';

// Layouts
import { WebLayout } from './layouts/WebLayout';
import { DashLayout } from './layouts/DashLayout';

// Website Pages (Lazy Loaded)
const Home = React.lazy(() => import('./pages/website/Home').then(m => ({ default: m.Home })));
const Services = React.lazy(() => import('./pages/website/Services').then(m => ({ default: m.Services })));
const Examinations = React.lazy(() => import('./pages/website/Examinations').then(m => ({ default: m.Examinations })));
const Surgeries = React.lazy(() => import('./pages/website/Surgeries').then(m => ({ default: m.Surgeries })));
const Clinics = React.lazy(() => import('./pages/website/Clinics').then(m => ({ default: m.Clinics })));
const Doctors = React.lazy(() => import('./pages/website/Doctors').then(m => ({ default: m.Doctors })));
const Cases = React.lazy(() => import('./pages/website/Cases').then(m => ({ default: m.Cases })));
const Contact = React.lazy(() => import('./pages/website/Contact').then(m => ({ default: m.Contact })));

// Dashboard Pages (Lazy Loaded)
const Login = React.lazy(() => import('./pages/dashboard/Login').then(m => ({ default: m.Login })));
const Patients = React.lazy(() => import('./pages/dashboard/Patients').then(m => ({ default: m.Patients })));
const PatientRequests = React.lazy(() => import('./pages/dashboard/PatientRequests').then(m => ({ default: m.PatientRequests })));
const Settings = React.lazy(() => import('./pages/dashboard/Settings').then(m => ({ default: m.Settings })));

// Scroll To Top on Route Change Component
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Loading Fallback Component
const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center bg-bg">
    <div className="flex flex-col items-center gap-3">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      <span className="text-sm font-bold text-primary animate-pulse">جاري تحميل الصفحة...</span>
    </div>
  </div>
);

// Protected Routes Guard
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useApp();

  if (!isAuthenticated) {
    return <Navigate to="/dashboard/login" replace />;
  }

  return <DashLayout>{children}</DashLayout>;
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <HashRouter>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Website Patient Routes */}
            <Route path="/" element={<WebLayout><Home /></WebLayout>} />
            <Route path="/services" element={<WebLayout><Services /></WebLayout>} />
            <Route path="/examinations" element={<WebLayout><Examinations /></WebLayout>} />
            <Route path="/surgeries" element={<WebLayout><Surgeries /></WebLayout>} />
            <Route path="/clinics" element={<WebLayout><Clinics /></WebLayout>} />
            <Route path="/doctors" element={<WebLayout><Doctors /></WebLayout>} />
            <Route path="/doctors/:id" element={<WebLayout><Doctors /></WebLayout>} />
            <Route path="/cases" element={<WebLayout><Cases /></WebLayout>} />
            <Route path="/contact" element={<WebLayout><Contact /></WebLayout>} />

            {/* Doctor Dashboard Routes */}
            <Route path="/dashboard/login" element={<Login />} />
            <Route path="/dashboard" element={<ProtectedRoute><PatientRequests /></ProtectedRoute>} />
            <Route path="/dashboard/requests" element={<ProtectedRoute><PatientRequests /></ProtectedRoute>} />
            <Route path="/dashboard/doctor" element={<ProtectedRoute><PatientRequests /></ProtectedRoute>} />
            <Route path="/dashboard/patients" element={<ProtectedRoute><Patients /></ProtectedRoute>} />
            <Route path="/dashboard/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </HashRouter>
    </AppProvider>
  );
};

export default App;
