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

interface AppContextType {
  appointments: Appointment[];
  patients: Patient[];
  isAuthenticated: boolean;
  addAppointment: (appointment: Omit<Appointment, 'id' | 'createdAt' | 'status' | 'whatsappStatus'>) => Appointment;
  updateAppointmentStatus: (id: string, status: Appointment['status']) => void;
  toggleWhatsAppStatus: (id: string) => void;
  login: (password: string) => boolean;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

import { savePatientRequestToSupabase, updateWhatsAppStatusInSupabase } from '../lib/supabase';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Load from local storage and filter out old mock data
  useEffect(() => {
    const storedAppts = localStorage.getItem('mawadda_appointments');
    const storedPats = localStorage.getItem('mawadda_patients');

    if (storedAppts) {
      try {
        const parsed: Appointment[] = JSON.parse(storedAppts);
        // Filter out mock IDs like APT-1001
        const cleanAppts = parsed.filter(a => !a.id.startsWith('APT-100'));
        setAppointments(cleanAppts);
        localStorage.setItem('mawadda_appointments', JSON.stringify(cleanAppts));
      } catch (e) {
        setAppointments([]);
      }
    } else {
      setAppointments([]);
    }

    if (storedPats) {
      try {
        const parsed: Patient[] = JSON.parse(storedPats);
        // Filter out mock IDs like PAT-
        const cleanPats = parsed.filter(p => !p.id.startsWith('PAT-'));
        setPatients(cleanPats);
        localStorage.setItem('mawadda_patients', JSON.stringify(cleanPats));
      } catch (e) {
        setPatients([]);
      }
    } else {
      setPatients([]);
    }

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

    const updatedAppts = [newAppt, ...appointments];
    setAppointments(updatedAppts);
    localStorage.setItem('mawadda_appointments', JSON.stringify(updatedAppts));

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
    });

    // Check if patient exists, if not create one
    const exists = patients.some(p => p.phone === apptData.phone);
    if (!exists) {
      const newPatient: Patient = {
        id: `PAT-${patients.length + 1}`,
        name: apptData.patientName,
        phone: apptData.phone,
        age: apptData.age,
        createdAt: new Date().toISOString().split('T')[0]
      };
      const updatedPats = [newPatient, ...patients];
      setPatients(updatedPats);
      localStorage.setItem('mawadda_patients', JSON.stringify(updatedPats));
    }

    return newAppt;
  };

  const updateAppointmentStatus = (id: string, status: Appointment['status']) => {
    const updated = appointments.map(appt => 
      appt.id === id ? { ...appt, status } : appt
    );
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
    if (password === '123456' || password === 'mawadda2026') {
      setIsAuthenticated(true);
      localStorage.setItem('mawadda_auth', JSON.stringify(true));
      return true;
    }
    return false;
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
      addAppointment,
      updateAppointmentStatus,
      toggleWhatsAppStatus,
      login,
      logout
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
