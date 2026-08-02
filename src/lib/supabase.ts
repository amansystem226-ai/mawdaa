import { createClient } from '@supabase/supabase-js';

// Supabase environment credentials (reads from .env or fallback)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface PatientRequestData {
  id: string;
  patientName: string;
  phone: string;
  age?: number;
  department: string;
  service: string;
  preferredDate?: string;
  preferredTime?: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  whatsappStatus: 'not_contacted' | 'contacted';
  createdAt: string;
  contactedAt?: string;
}

// SQL Schema for Supabase Setup:
/*
-- Copy & Run this SQL script in your Supabase SQL Editor:

CREATE TABLE IF NOT EXISTS public.patient_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  age INT,
  department TEXT NOT NULL,
  service TEXT NOT NULL,
  preferred_date TEXT,
  preferred_time TEXT,
  notes TEXT,
  status TEXT DEFAULT 'pending',
  whatsapp_status TEXT DEFAULT 'not_contacted',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  contacted_at TIMESTAMPTZ
);

-- Enable RLS & Allow public insert & read for demonstration
ALTER TABLE public.patient_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts" ON public.patient_requests 
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public reads" ON public.patient_requests 
  FOR SELECT USING (true);

CREATE POLICY "Allow public updates" ON public.patient_requests 
  FOR UPDATE USING (true);
*/

// Supabase API Helper Functions
export const fetchPatientRequestsFromSupabase = async (): Promise<PatientRequestData[]> => {
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from('patient_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetch error:', error.message);
      return [];
    }

    return (data || []).map((row: any) => ({
      id: row.id,
      patientName: row.patient_name,
      phone: row.phone,
      age: row.age,
      department: row.department,
      service: row.service,
      preferredDate: row.preferred_date,
      preferredTime: row.preferred_time,
      notes: row.notes,
      status: row.status || 'pending',
      whatsappStatus: row.whatsapp_status || 'not_contacted',
      createdAt: row.created_at,
      contactedAt: row.contacted_at
    }));
  } catch (err) {
    console.warn('Supabase connection error:', err);
    return [];
  }
};

export const savePatientRequestToSupabase = async (req: Omit<PatientRequestData, 'id' | 'createdAt' | 'whatsappStatus' | 'status'>) => {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('patient_requests')
      .insert([
        {
          patient_name: req.patientName,
          phone: req.phone,
          age: req.age || null,
          department: req.department,
          service: req.service,
          preferred_date: req.preferredDate || null,
          preferred_time: req.preferredTime || null,
          notes: req.notes || null,
          status: 'pending',
          whatsapp_status: 'not_contacted'
        }
      ])
      .select();

    if (error) {
      console.warn('Supabase insert error:', error.message);
      return null;
    }

    return data?.[0] || null;
  } catch (err) {
    console.warn('Supabase save error:', err);
    return null;
  }
};

export const updateWhatsAppStatusInSupabase = async (id: string, whatsappStatus: 'not_contacted' | 'contacted') => {
  if (!supabase) return false;
  try {
    const { error } = await supabase
      .from('patient_requests')
      .update({
        whatsapp_status: whatsappStatus,
        contacted_at: whatsappStatus === 'contacted' ? new Date().toISOString() : null
      })
      .eq('id', id);

    if (error) {
      console.warn('Supabase update error:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Supabase update error:', err);
    return false;
  }
};
