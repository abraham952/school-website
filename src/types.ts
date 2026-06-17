/**
 * Veritas International Academy Types & Data Contracts
 */

export type Language = 'en' | 'am' | 'om';

export type UserRole = 'public' | 'applicant' | 'student' | 'registrar' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  studentId?: string;
}

export interface AdmissionApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  gradeLevel: string;
  previousSchool: string;
  parentName: string;
  parentPhone: string;
  status: 'pending' | 'reviewing' | 'approved' | 'rejected';
  appliedAt: string;
  qrCodeDataUrl?: string;
  studentIdCardGenerated?: boolean;
  notes?: string;
}

export interface NewsItem {
  id: string;
  title: Record<Language, string>;
  category: 'academic' | 'sports' | 'achievement' | 'admission' | 'event';
  summary: Record<Language, string>;
  content: Record<Language, string>;
  date: string;
  imageUrl: string;
  author: string;
}

export interface SchoolEvent {
  id: string;
  title: Record<Language, string>;
  date: string;
  time: string;
  location: Record<Language, string>;
  category: 'academic' | 'arts' | 'sports' | 'community' | 'general';
  description: Record<Language, string>;
}

export interface TeacherProfile {
  id: string;
  name: string;
  role: Record<Language, string>;
  qualification: Record<Language, string>;
  department: 'Sciences' | 'Mathematics' | 'Humanities' | 'Languages' | 'Arts & Physical Ed';
  imageUrl: string;
  bio: Record<Language, string>;
}

export interface ClubInfo {
  id: string;
  name: Record<Language, string>;
  category: 'arts' | 'sports' | 'tech' | 'community';
  description: Record<Language, string>;
  schedule: string;
  imageUrl: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  details: string;
  ipAddress: string;
}

export interface SystemNotification {
  id: string;
  recipient: string;
  type: 'sms' | 'email';
  subjectOrHeader: string;
  message: string;
  sentAt: string;
  status: 'sent' | 'delivered' | 'failed';
}

export interface DatabaseBackup {
  id: string;
  version: string;
  createdAt: string;
  fileName: string;
  fileSize: string;
  recordCount: number;
  status: 'active' | 'archived';
}
