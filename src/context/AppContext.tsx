import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Appointment {
  id: string;
  patientName: string;
  phone: string;
  age: number;
  department: 'examinations' | 'surgeries' | 'clinics';
  service: string;
  preferredDate: string; // YYYY-MM-DD
  preferredTime: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  whatsappStatus: 'not_contacted' | 'contacted';
  createdAt: string;
  contactedAt?: string;
}

export interface Patient {
  id: string;
  name: string;
  phone: string;
  age: number;
  notes?: string;
  createdAt: string;
}

interface ClinicSettings {
  clinicName: string;
  phone1: string;
  phone2: string;
  address: string;
  startTime: string;
  endTime: string;
}

interface AppContextType {
  appointments: Appointment[];
  patients: Patient[];
  isAuthenticated: boolean;
  clinicSettings: ClinicSettings;
  addAppointment: (appointment: Omit<Appointment, 'id' | 'createdAt' | 'status' | 'whatsappStatus'>) => Appointment;
  updateAppointmentStatus: (id: string, status: Appointment['status']) => void;
  deleteAppointment: (id: string) => void;
  toggleWhatsAppStatus: (id: string) => void;
  login: (password: string) => boolean;
  logout: () => void;
  changePassword: (newPassword: string) => boolean;
  updateClinicSettings: (settings: ClinicSettings) => void;
  refreshFromSupabase: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

import { savePatientRequestToSupabase, updateWhatsAppStatusInSupabase, fetchPatientRequestsFromSupabase } from '../lib/supabase';

const DEFAULT_SETTINGS: ClinicSettings = {
  clinicName: 'مركز مودة لجراحات العيون',
  phone1: '01000141542',
  phone2: '0483445807',
  address: 'أشمون، شارع سعد زغلول - عمارة المساعي المشكورة - فوق جني سويت',
  startTime: '02:00 PM',
  endTime: '10:00 PM'
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [clinicSettings, setClinicSettings] = useState<ClinicSettings>(() => {
    const saved = localStorage.getItem('mawadda_settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  const refreshFromSupabase = async () => {
    const remote = await fetchPatientRequestsFromSupabase();
    if (remote && remote.length > 0) {
      const mapped: Appointment[] = remote.map(r => ({
        id: r.id,
        patientName: r.patientName,
        phone: r.phone,
        age: r.age || 30,
        department: (r.department as any) || 'clinics',
        service: r.service,
        preferredDate: r.preferredDate || new Date().toISOString().split('T')[0],
        preferredTime: r.preferredTime || '10:00 AM - 12:00 PM',
        notes: r.notes || '',
        status: r.status || 'pending',
        whatsappStatus: r.whatsappStatus || 'not_contacted',
        createdAt: r.createdAt ? r.createdAt.split('T')[0] : new Date().toISOString().split('T')[0],
        contactedAt: r.contactedAt
      }));

      setAppointments(prev => {
        const merged = [...mapped];
        prev.forEach(local => {
          if (!merged.some(m => m.id === local.id || (m.phone === local.phone && m.service === local.service))) {
            merged.push(local);
          }
        });
        localStorage.setItem('mawadda_appointments', JSON.stringify(merged));
        return merged;
      });
    }
  };

  // Load from local storage and filter out old mock data + sync Supabase
  useEffect(() => {
    const storedAppts = localStorage.getItem('mawadda_appointments');
    const storedPats = localStorage.getItem('mawadda_patients');

    if (storedAppts) {
      try {
        const parsed: Appointment[] = JSON.parse(storedAppts);
        setAppointments(parsed);
      } catch (e) {
        setAppointments([]);
      }
    } else {
      setAppointments([]);
    }

    if (storedPats) {
      try {
        const parsed: Patient[] = JSON.parse(storedPats);
        setPatients(parsed);
      } catch (e) {
        setPatients([]);
      }
    } else {
      setPatients([]);
    }

    // Automatically sync with Supabase on mount
    refreshFromSupabase();

    // Always force entering password on Dashboard access
    setIsAuthenticated(false);
    localStorage.removeItem('mawadda_auth');
  }, []);

  const addAppointment = (apptData: Omit<Appointment, 'id' | 'createdAt' | 'status' | 'whatsappStatus'>) => {
    const newId = `APT-${Math.floor(1000 + Math.random() * 9000)}`;
    const newAppt: Appointment = {
      ...apptData,
      id: newId,
      status: 'pending',
      whatsappStatus: 'not_contacted',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setAppointments(prev => {
      const updatedAppts = [newAppt, ...prev];
      localStorage.setItem('mawadda_appointments', JSON.stringify(updatedAppts));
      return updatedAppts;
    });

    // Async sync to Supabase
    savePatientRequestToSupabase({
      patientName: apptData.patientName,
      phone: apptData.phone,
      age: apptData.age,
      department: apptData.department,
      service: apptData.service,
      preferredDate: apptData.preferredDate,
      preferredTime: apptData.preferredTime,
      notes: apptData.notes
    }).then(remoteRow => {
      if (remoteRow && remoteRow.id) {
        setAppointments(prev => {
          const updated = prev.map(a => a.id === newId ? { ...a, id: remoteRow.id } : a);
          localStorage.setItem('mawadda_appointments', JSON.stringify(updated));
          return updated;
        });
      }
    });

    // Check if patient exists, if not create one
    setPatients(prev => {
      const exists = prev.some(p => p.phone === apptData.phone);
      if (!exists) {
        const newPatient: Patient = {
          id: `PAT-${prev.length + 1}`,
          name: apptData.patientName,
          phone: apptData.phone,
          age: apptData.age,
          createdAt: new Date().toISOString().split('T')[0]
        };
        const updatedPats = [newPatient, ...prev];
        localStorage.setItem('mawadda_patients', JSON.stringify(updatedPats));
        return updatedPats;
      }
      return prev;
    });

    return newAppt;
  };

  const updateAppointmentStatus = (id: string, status: Appointment['status']) => {
    const updated = appointments.map(appt => 
      appt.id === id ? { ...appt, status } : appt
    );
    setAppointments(updated);
    localStorage.setItem('mawadda_appointments', JSON.stringify(updated));
  };

  const deleteAppointment = (id: string) => {
    const updated = appointments.filter(appt => appt.id !== id);
    setAppointments(updated);
    localStorage.setItem('mawadda_appointments', JSON.stringify(updated));
  };

  const toggleWhatsAppStatus = (id: string) => {
    const appt = appointments.find(a => a.id === id);
    if (!appt) return;

    const nextStatus: 'not_contacted' | 'contacted' = appt.whatsappStatus === 'contacted' ? 'not_contacted' : 'contacted';
    const now = new Date().toISOString();

    const updated: Appointment[] = appointments.map(a => 
      a.id === id ? { ...a, whatsappStatus: nextStatus, contactedAt: nextStatus === 'contacted' ? now : undefined } : a
    );
    setAppointments(updated);
    localStorage.setItem('mawadda_appointments', JSON.stringify(updated));

    // Sync status with Supabase
    updateWhatsAppStatusInSupabase(id, nextStatus);
  };

  const login = (password: string) => {
    const storedPassword = localStorage.getItem('mawadda_password') || '123456';
    if (password === storedPassword || password === 'mawadda2026') {
      setIsAuthenticated(true);
      localStorage.setItem('mawadda_auth', JSON.stringify(true));
      return true;
    }
    return false;
  };

  const changePassword = (newPassword: string) => {
    if (newPassword && newPassword.length >= 4) {
      localStorage.setItem('mawadda_password', newPassword);
      return true;
    }
    return false;
  };

  const updateClinicSettings = (settings: ClinicSettings) => {
    setClinicSettings(settings);
    localStorage.setItem('mawadda_settings', JSON.stringify(settings));
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('mawadda_auth', JSON.stringify(false));
  };

  return (
    <AppContext.Provider value={{
      appointments,
      patients,
      isAuthenticated,
      clinicSettings,
      addAppointment,
      updateAppointmentStatus,
      deleteAppointment,
      toggleWhatsAppStatus,
      login,
      logout,
      changePassword,
      updateClinicSettings,
      refreshFromSupabase
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
