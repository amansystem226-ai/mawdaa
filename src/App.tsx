import React, { Suspense } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';

// Layouts
import { WebLayout } from './layouts/WebLayout';
import { DashLayout } from './layouts/DashLayout';

// Website Pages
import { Home } from './pages/website/Home';
import { Services } from './pages/website/Services';
import { Examinations } from './pages/website/Examinations';
import { Surgeries } from './pages/website/Surgeries';
import { Clinics } from './pages/website/Clinics';
import { Doctors } from './pages/website/Doctors';
import { Cases } from './pages/website/Cases';
import { Contact } from './pages/website/Contact';

// Dashboard Pages
import { Login } from './pages/dashboard/Login';
import { Patients } from './pages/dashboard/Patients';
import { PatientRequests } from './pages/dashboard/PatientRequests';
import { Settings } from './pages/dashboard/Settings';

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
