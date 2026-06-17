import React, { useState } from 'react';
import { TRANSLATIONS } from '../data';
import { Language, UserRole, AdmissionApplication, AuditLog, DatabaseBackup, SystemNotification } from '../types';
import QRScannerSimulator from './QRScannerSimulator';
import { 
  Lock, Shield, Database, Users, Library, ShieldAlert, CheckCheck, 
  Trash, RotateCcw, Download, ArrowLeft, Key, UserCheck, Play, Save, CheckCircle2, AlertTriangle, AlertCircle
} from 'lucide-react';

interface DashboardProps {
  currentLang: Language;
  applications: AdmissionApplication[];
  onApproveApplication: (id: string) => void;
  onRejectApplication: (id: string) => void;
  auditLogs: AuditLog[];
  onAddAuditLog: (action: string, details: string) => void;
  backups: DatabaseBackup[];
  onCreateBackup: () => void;
  notifications: SystemNotification[];
  onPortalClose: () => void;
  onPublishNews?: (news: { title: string; category: string; summary: string; content: string }) => void;
  onPublishEvent?: (event: { title: string; date: string; time: string; location: string; category: string; description: string }) => void;
}

export default function Dashboard({
  currentLang,
  applications,
  onApproveApplication,
  onRejectApplication,
  auditLogs,
  onAddAuditLog,
  backups,
  onCreateBackup,
  notifications,
  onPortalClose,
  onPublishNews,
  onPublishEvent
}: DashboardProps) {
  const [activeRole, setActiveRole] = useState<UserRole>('public');
  const [selectedRegistrarTab, setSelectedRegistrarTab] = useState<'review' | 'scan'>('review');
  const [adminSubTab, setAdminSubTab] = useState<'audit' | 'publish'>('audit');

  // News publishing Form State
  const [newsTitle, setNewsTitle] = useState('');
  const [newsCategory, setNewsCategory] = useState('academic');
  const [newsSummary, setNewsSummary] = useState('');
  const [newsContent, setNewsContent] = useState('');

  // Event publishing Form State
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventCategory, setEventCategory] = useState('academic');
  const [eventDescription, setEventDescription] = useState('');

  // Simple mock password fields
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // New dynamic lookup states for Student and Applicant lockers
  const approvedApplicants = applications.filter(a => a.status === 'approved');
  const [selectedStudentId, setSelectedStudentId] = useState<string>(approvedApplicants[0]?.id || 'WA-2026-6281');
  const [selectedApplicantId, setSelectedApplicantId] = useState<string>(applications[0]?.id || 'WA-2026-1049');

  const t = (key: string) => TRANSLATIONS[currentLang][key] || key;

  const handleRoleLogin = (role: UserRole) => {
    setActiveRole(role);
    setLoginError('');
    onAddAuditLog(
      "User Authorization Login",
      `Session established for role "${role.toUpperCase()}"`
    );
  };

  const handleCustomLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!usernameInput || !passwordInput) {
      setLoginError('Please enter username and authorization password.');
      return;
    }

    const userVal = usernameInput.trim();
    const userValLower = userVal.toLowerCase();
    const passVal = passwordInput.trim();

    // Standard hardcoded credentials check
    if (userValLower === 'admin' && passVal === 'admin123') {
      handleRoleLogin('admin');
    } else if (userValLower === 'registrar' && passVal === 'registrar123') {
      handleRoleLogin('registrar');
    } else if (userValLower === 'student' && passVal === 'student123') {
      // Find first approved student or default to Kidus daniel
      const firstApproved = approvedApplicants[0]?.id || 'WA-2026-6281';
      setSelectedStudentId(firstApproved);
      handleRoleLogin('student');
    } else if (userValLower === 'applicant' && passVal === 'applicant123') {
      // Find first application or default to Selam Gifty
      const firstApp = applications[0]?.id || 'WA-2026-1049';
      setSelectedApplicantId(firstApp);
      handleRoleLogin('applicant');
    } else {
      // Allow student to log in directly via their customized Application ID (e.g. WA-2026-6281 / student123)
      const matchingApp = applications.find(app => app.id.toLowerCase() === userValLower);
      if (matchingApp) {
        if (passVal === 'student123' || passVal === 'applicant123') {
          if (matchingApp.status === 'approved' && passVal === 'student123') {
            setSelectedStudentId(matchingApp.id);
            handleRoleLogin('student');
            return;
          } else {
            setSelectedApplicantId(matchingApp.id);
            handleRoleLogin('applicant');
            return;
          }
        }
      }

      setLoginError('Invalid credentials. Access keys: admin/admin123, registrar/registrar123, student/student123, or use your submitted Application ID (e.g. WA-2026-6281) with "student123" or "applicant123".');
    }
  };

  const handleDownloadBackupFile = (backup: DatabaseBackup) => {
    // Generate a beautiful localized download blob representation
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify({
        backupId: backup.id,
        createdAt: backup.createdAt,
        systemEntity: "Wisdom Academy",
        studentRecords: applications,
        securityTraceLogs: auditLogs
      }, null, 2)
    )}`;
    
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", jsonString);
    downloadAnchor.setAttribute("download", backup.fileName);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    onAddAuditLog(
      "Backup Archive Exported",
      `Backup artifact exported: ${backup.fileName} (${backup.fileSize})`
    );
    alert(`Secure backup data compiled and exported as JSON artifact: ${backup.fileName}. Proceeding transaction.`);
  };

  const pendingCount = applications.filter(a => a.status === 'pending').length;
  const approvedCount = applications.filter(a => a.status === 'approved').length;

  // Find exact active student record
  const currentStudentData = applications.find(app => app.id === selectedStudentId) || (applications.length > 0 ? applications[0] : null);
  
  // Find exact active applicant record
  const currentApplicantData = applications.find(app => app.id === selectedApplicantId) || (applications.length > 0 ? applications[0] : null);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8" id="dashboard-system-portal">
      
      {/* 1. Header with direct go-back trigger */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div className="flex items-center space-x-3">
          <button 
            onClick={onPortalClose}
            className="rounded-lg p-2 hover:bg-slate-100 text-slate-500"
            aria-label="Exit systems portal"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="font-display font-bold text-xl text-slate-900 uppercase tracking-widest leading-none">Enterprise Wisdom Portal</h1>
            <p className="text-[10px] text-slate-400 mt-1">Governed role access, security parameters audit desk & registries</p>
          </div>
        </div>
        
        {activeRole !== 'public' && (
          <button
            onClick={() => {
              onAddAuditLog("User Authorization Logout", `Session ended for role "${activeRole.toUpperCase()}"`);
              setActiveRole('public');
            }}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
          >
            Clear Session & Terminate
          </button>
        )}
      </div>

      {/* 2. PUBLIC LOGIN FORM OR CHOOSE ROLES CHIPS */}
      {activeRole === 'public' ? (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          
          {/* Quick Login selector cards (Col-span 7) */}
          <div className="lg:col-span-7 space-y-4">
            <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-slate-500">Choose simulated access profile lane</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Registrar Login */}
              <div 
                onClick={() => handleRoleLogin('registrar')}
                className="cursor-pointer rounded-2xl border border-slate-100 bg-white p-5 shadow-sm hover:border-amber-400 hover:shadow transition-all space-y-2 group"
              >
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-orange-600 group-hover:bg-amber-500 group-hover:text-white transition">
                  <UserCheck className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-slate-800 text-xs sm:text-sm font-display">Registrar Review Desk</h3>
                <p className="text-[10px] text-slate-500 leading-normal font-sans">
                  Review submitted applications, manage approved status sittings, and scan student credentials using biometric mapping protocols.
                </p>
                <span className="text-[9px] font-mono font-bold text-amber-700 bg-amber-50 rounded px-1.5 py-0.5 inline-block uppercase">Auto Access</span>
              </div>

              {/* Administrator Login */}
              <div 
                onClick={() => handleRoleLogin('admin')}
                className="cursor-pointer rounded-2xl border border-slate-100 bg-white p-5 shadow-sm hover:border-amber-400 hover:shadow transition-all space-y-2 group"
              >
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-amber-500 group-hover:text-white transition">
                  <Shield className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-slate-800 text-xs sm:text-sm font-display">Systems Administrator</h3>
                <p className="text-[10px] text-slate-500 leading-normal font-sans">
                  Inspect secure electronic audit-logs trackers, query dispatched notification relays, and compile manual systems rollbacks.
                </p>
                <span className="text-[9px] font-mono font-bold text-amber-700 bg-amber-50 rounded px-1.5 py-0.5 inline-block uppercase">Auto Access</span>
              </div>

              {/* Student Portal Card */}
              <div 
                onClick={() => {
                  const firstApproved = approvedApplicants[0]?.id || 'WA-2026-6281';
                  setSelectedStudentId(firstApproved);
                  handleRoleLogin('student');
                }}
                className="cursor-pointer rounded-2xl border border-slate-100 bg-white p-5 shadow-sm hover:border-amber-400 hover:shadow transition-all space-y-2 group"
              >
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-amber-500 group-hover:text-white transition">
                  <CheckCheck className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-slate-800 text-xs sm:text-sm font-display">Student ID Locker</h3>
                <p className="text-[10px] text-slate-500 leading-normal font-sans">
                  Access official Wisdom Academy student ID badges, print pre-enrollment certificates, and explore course rosters.
                </p>
                <span className="text-[9px] font-mono font-bold text-emerald-700 bg-emerald-50 rounded px-1.5 py-0.5 inline-block uppercase">Auto Access</span>
              </div>

              {/* Applicant Status Card */}
              <div 
                onClick={() => {
                  const firstApp = applications[0]?.id || 'WA-2026-1049';
                  setSelectedApplicantId(firstApp);
                  handleRoleLogin('applicant');
                }}
                className="cursor-pointer rounded-2xl border border-slate-100 bg-white p-5 shadow-sm hover:border-amber-400 hover:shadow transition-all space-y-2 group"
              >
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition">
                  <Database className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-slate-800 text-xs sm:text-sm font-display">Admissions Applicant</h3>
                <p className="text-[10px] text-slate-500 leading-normal font-sans">
                  Check live status timeline indices, verify transcript reviews, or switch applicant profiles to monitor approvals.
                </p>
                <span className="text-[9px] font-mono font-bold text-amber-700 bg-amber-50 rounded px-1.5 py-0.5 inline-block uppercase">Auto Access</span>
              </div>

            </div>

            <div className="rounded-xl bg-slate-900 text-slate-100 p-4 flex items-start space-x-2.5 text-[10px] sm:text-xs">
              <ShieldAlert className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5 animate-pulse" />
              <div>
                <p className="font-bold text-white">Interactive Dual-Curriculum Sandbox</p>
                <p className="leading-relaxed mt-0.5 opacity-90 font-sans">
                  Submit customized student credentials in the public <strong>Admissions/Enroll</strong> tab, then immediately switch to these backoffice roles to process and render live badges.
                </p>
              </div>
            </div>
          </div>

          {/* Secure credentials login sidebar form (Col-span 5) */}
          <div className="lg:col-span-5 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm space-y-4">
            
            <div className="border-b border-slate-100 pb-2">
              <div className="flex items-center space-x-1.5 text-slate-800">
                <Lock className="h-4.5 w-4.5 text-amber-500" />
                <h3 className="font-display font-medium text-xs tracking-wider uppercase font-bold">Standard Credentials Access</h3>
              </div>
              <p className="text-[10px] text-slate-400">Governance portal. Enter verified security credentials.</p>
            </div>

            <form onSubmit={handleCustomLoginSubmit} className="space-y-4 text-xs font-sans">
              
              <div>
                <label className="text-slate-500 font-semibold uppercase block mb-1">Authorization Username / AppID</label>
                <input
                  type="text"
                  placeholder="e.g. admin, registrar, student, or WA-2026-6281"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50/50 p-2.5 outline-none focus:border-amber-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="text-slate-500 font-semibold uppercase block mb-1">Authorization Password</label>
                <input
                  type="password"
                  placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50/50 p-2.5 outline-none focus:border-amber-500 focus:bg-white"
                />
              </div>

              {loginError && (
                <p className="text-[10px] font-semibold text-rose-600 bg-rose-50 p-2 rounded border border-rose-100">
                  {loginError}
                </p>
              )}

              <button
                type="submit"
                className="w-full rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase tracking-wider py-2.5 shadow transition-colors"
              >
                Establish Safe Session Connection
              </button>

            </form>

            <div className="rounded bg-slate-50 p-2.5 text-[9px] text-slate-500 font-mono space-y-1.5 leading-snug">
              <p className="font-bold text-slate-700">Sandbox Access References:</p>
              <p>&bull; Administrator login: <span className="text-amber-800 font-bold">admin</span> / admin123</p>
              <p>&bull; Registrar login: <span className="text-amber-800 font-bold">registrar</span> / registrar123</p>
              <p>&bull; Student login: <span className="text-amber-800 font-bold">student</span> / student123</p>
              <p>&bull; Applicant login: <span className="text-amber-800 font-bold">applicant</span> / applicant123</p>
              <p>&bull; Real-time AppID link: Use index like <span className="text-indigo-600 font-bold">WA-2026-6281</span> / student123</p>
            </div>

          </div>

        </div>
      ) : (
        /* DISPATCHED INTERFACE PER INDIVIDUAL ACCESSED USER ROLE */
        <div className="space-y-6" id="dashboard-workspace-active">
          
          {/* A. WORKSPACE VIEW : SYSTEMS REGISTRAR */}
          {activeRole === 'registrar' && (
            <div className="space-y-6" id="registrar-desk-active">
              
              {/* Quick tab switcher for Registrars */}
              <div className="flex space-x-2 border-b border-slate-200 pb-3">
                <button
                  onClick={() => setSelectedRegistrarTab('review')}
                  className={`rounded-lg px-4 py-2 text-xs font-semibold uppercase tracking-wider transition ${
                    selectedRegistrarTab === 'review' 
                      ? 'bg-slate-900 text-white' 
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Applicants Folder ({applications.length})
                </button>
                <button
                  onClick={() => setSelectedRegistrarTab('scan')}
                  className={`rounded-lg px-4 py-2 text-xs font-semibold uppercase tracking-wider transition ${
                    selectedRegistrarTab === 'scan' 
                      ? 'bg-slate-900 text-white' 
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Verify IDs & QR Scan Check
                </button>
              </div>

              {selectedRegistrarTab === 'review' ? (
                /* Applicants verification review desk list */
                <div className="space-y-4" id="review-catalog">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-slate-100 rounded-xl p-4 text-xs text-slate-700 gap-2">
                    <div>
                      <p className="font-semibold">Pending Enrollment Verification Folder</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">Please review candidate transcript values, match details and select approval status.</p>
                    </div>
                    <div className="flex space-x-4 font-mono text-[10px] font-bold">
                      <span>PENDING AUDIT: <span className="text-amber-600">{pendingCount}</span></span>
                      <span>APPROVED REGISTRATIONS: <span className="text-emerald-600">{approvedCount}</span></span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2" id="applicants-review-cards">
                    {applications.map((app) => (
                      <div 
                        key={app.id}
                        className="rounded-xl border border-slate-200 bg-white p-4.5 shadow-xs space-y-3.5 hover:shadow transition"
                      >
                        {/* Member title */}
                        <div className="flex items-start justify-between border-b border-slate-100 pb-2.5">
                          <div className="space-y-0.5">
                            <h4 className="font-display font-bold text-slate-900 text-sm">{app.fullName}</h4>
                            <p className="text-[10px] text-slate-400 font-mono">AppID: {app.id}</p>
                          </div>
                          
                          <span className={`rounded-md px-2 py-0.5 text-[9px] font-mono font-bold uppercase ${
                            app.status === 'approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                            app.status === 'pending' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                            app.status === 'reviewing' ? 'bg-sky-50 text-sky-700 border border-sky-200' :
                            'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}>
                            {app.status}
                          </span>
                        </div>

                        {/* Transcript indices summary */}
                        <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500 font-sans border-b border-slate-100 pb-2.5">
                          <div>
                            <span className="text-[8px] text-slate-400 uppercase tracking-widest block">Grade Enrollment Program</span>
                            <span className="font-semibold text-slate-800">{app.gradeLevel}</span>
                          </div>
                          <div>
                            <span className="text-[8px] text-slate-400 uppercase tracking-widest block">Parent Phone (SMS dispatch)</span>
                            <span className="font-mono text-slate-800">{app.parentPhone}</span>
                          </div>
                          <div>
                            <span className="text-[8px] text-slate-400 uppercase tracking-widest block">Preceding Academy</span>
                            <span className="font-semibold text-slate-800">{app.previousSchool || 'N/A'}</span>
                          </div>
                          <div>
                            <span className="text-[8px] text-slate-400 uppercase tracking-widest block">Submission Date</span>
                            <span className="font-mono text-slate-800">{new Date(app.appliedAt).toLocaleDateString()}</span>
                          </div>
                        </div>

                        {/* Actions controls */}
                        {app.status === 'pending' || app.status === 'reviewing' ? (
                          <div className="flex items-center space-x-2 pt-1">
                            <button
                              onClick={() => {
                                onApproveApplication(app.id);
                                alert(`Successfully authorized ${app.fullName}'s enrollment status. Dispatched parents welcome notification alerts.`);
                              }}
                              className="flex-1 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-[11px] py-1.5 uppercase transition"
                            >
                              Approve Enrollment
                            </button>
                            <button
                              onClick={() => {
                                onRejectApplication(app.id);
                                alert(`Registration status for ${app.fullName} declined. Safe logs recorded.`);
                              }}
                              className="rounded-lg bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-700 font-bold text-[11px] px-3.5 py-1.5 uppercase transition"
                            >
                              Decline Entry
                            </button>
                          </div>
                        ) : (
                          <div className="bg-slate-50 rounded-lg p-2 text-center text-[10px] text-slate-400 font-mono italic">
                            * Application audit locked. Wisdom records registered as {app.status.toUpperCase()}.
                          </div>
                        )}

                      </div>
                    ))}
                    
                    {applications.length === 0 && (
                      <div className="col-span-2 text-center py-12 text-slate-400 bg-slate-50 border border-dashed rounded-xl">
                        <Users className="h-10 w-10 text-slate-300 mx-auto mb-2" />
                        <p className="text-xs font-semibold">No admissions folders submitted yet.</p>
                        <p className="text-[10px] text-slate-500 mt-1">Navigate to Admissions public website, fill standard forms, then watch applications populate instant registrar folders!</p>
                      </div>
                    )}
                  </div>

                </div>
              ) : (
                /* QR Scanner Simulator desk */
                <QRScannerSimulator applications={applications} />
              )}
            </div>
          )}

          {/* B. WORKSPACE VIEW : SYSTEMS ADMIN */}
          {activeRole === 'admin' && (
            <div className="space-y-6 animate-fadeIn" id="admin-desk-active">
              
              {/* Admin Navigation Options */}
              <div className="flex border-b border-slate-200">
                <button
                  type="button"
                  onClick={() => setAdminSubTab('audit')}
                  className={`border-b-2 px-6 py-2.5 font-display text-xs font-bold uppercase transition ${
                    adminSubTab === 'audit' 
                      ? 'border-indigo-600 text-indigo-600 font-extrabold' 
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                  style={{ cursor: 'pointer' }}
                >
                  Audit Logs & Security Backup
                </button>
                <button
                  type="button"
                  onClick={() => setAdminSubTab('publish')}
                  className={`border-b-2 px-6 py-2.5 font-display text-xs font-bold uppercase transition ${
                    adminSubTab === 'publish' 
                      ? 'border-indigo-600 text-indigo-600 font-extrabold' 
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                  style={{ cursor: 'pointer' }}
                >
                  Publish News & Campus Events
                </button>
              </div>

              {adminSubTab === 'audit' ? (
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
                  
                  {/* Left Column (Col-span 8): Real-time Audit logs tracker & Database Backups */}
                  <div className="lg:col-span-8 space-y-6">
                    
                    {/* 1. Real-time Audit Logs Panel */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <div className="flex items-center space-x-2">
                          <Library className="h-5 w-5 text-amber-500" />
                          <div>
                            <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-widest font-display">System Security Audit Logs</h3>
                            <p className="text-[10px] text-slate-400">Verifies continuous platform transactions, CSRF handshakes and login state locks</p>
                          </div>
                        </div>
                        <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[9px] font-medium text-emerald-800 font-mono">
                          ACTIVE MONITORING v3
                        </span>
                      </div>

                      {/* Grid table */}
                      <div className="overflow-x-auto max-h-[300px] overflow-y-auto" id="audit-table">
                        <table className="w-full text-left text-xs text-slate-600 border-collapse">
                          <thead>
                            <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider text-[9px] font-mono">
                              <th className="pb-2.5 pr-2">Date/Time</th>
                              <th className="pb-2.5 px-2">Operator Role</th>
                              <th className="pb-2.5 px-2">Platform Action</th>
                              <th className="pb-2.5 px-2">Activity Description</th>
                              <th className="pb-2.5 pl-2 text-right">Reference IP</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {auditLogs.map((log) => (
                               <tr key={log.id} className="hover:bg-slate-50 transition text-[10px]">
                                <td className="py-2.5 pr-2 font-mono text-slate-400 whitespace-nowrap">{log.timestamp}</td>
                                 <td className="py-2.5 px-2 font-bold uppercase text-indigo-700">{log.role}</td>
                                 <td className="py-2.5 px-2 font-semibold text-slate-800">{log.action}</td>
                                 <td className="py-2.5 px-2 text-slate-500 leading-snug">{log.details}</td>
                                 <td className="py-2.5 pl-2 text-right font-mono text-slate-400">{log.ipAddress}</td>
                               </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* 2. Database Backup Engine Panel */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-3 space-y-2 sm:space-y-0">
                        <div className="flex items-center space-x-2">
                          <Database className="h-5 w-5 text-indigo-600" />
                          <div>
                            <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-widest font-display">Cloud Storage & Rollback Backups</h3>
                            <p className="text-[10px] text-slate-400">Generate, download or archive complete directory databases backups</p>
                          </div>
                        </div>
                        
                        <button
                          type="button"
                          onClick={() => {
                            onCreateBackup();
                            alert("Secure database backup file compiled. Proceeding file registries write.");
                          }}
                          className="rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-1.5 px-3 uppercase transition"
                          style={{ cursor: 'pointer' }}
                        >
                          Construct New Backup Block
                        </button>
                      </div>

                      {/* List of active database backups */}
                      <div className="space-y-3">
                        {backups.map((bk) => (
                          <div 
                            key={bk.id}
                            className="rounded-xl border border-slate-100 bg-slate-50/50 p-3.5 flex items-center justify-between text-xs"
                          >
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <span className="font-mono font-bold text-slate-800">{bk.fileName}</span>
                                <span className="rounded bg-indigo-50 text-indigo-700 font-bold font-mono text-[9px] px-1 py-0.5 border border-indigo-100">
                                  v{bk.version}
                                </span>
                              </div>
                              <p className="text-[10px] text-slate-400 leading-none">
                                Compiled {new Date(bk.createdAt).toLocaleString()} &bull; {bk.recordCount} records mapped
                              </p>
                            </div>

                            <div className="flex items-center space-x-2">
                              <span className="font-mono text-[10px] text-slate-500 mr-2">{bk.fileSize}</span>
                              <button
                                type="button"
                                onClick={() => handleDownloadBackupFile(bk)}
                                className="inline-flex items-center space-x-1 hover:text-indigo-600 hover:underline text-slate-600 font-semibold"
                                title="Export backup"
                                style={{ cursor: 'pointer' }}
                              >
                                <Download className="h-4 w-4" />
                                <span>Export</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Right Column (Col-span 4): Dispatched Security & CSRF rules monitor */}
                  <div className="lg:col-span-4 space-y-6">
                    
                    {/* 1. System stats panel */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
                      <h4 className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Active Server Metrics</h4>
                      
                      <div className="space-y-3.5 text-xs text-slate-600">
                        <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                          <span>Server Handshakes Security:</span>
                          <span className="font-bold text-emerald-600">ACTIVE & SECURE</span>
                        </div>
                        <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                          <span>CSRF Sanctity Tokens:</span>
                          <span className="font-mono text-zinc-500 font-bold">SHA256_ACTIVE</span>
                        </div>
                        <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                          <span>XSS Filter Status:</span>
                          <span className="font-bold text-emerald-600">SANITIZING ACTIVE</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>SQL Injection Guard:</span>
                          <span className="font-bold text-emerald-600">REGEX ESCAPE LOCKED</span>
                        </div>
                      </div>
                    </div>

                    {/* 2. Notifications Dispatch monitor inside admin view */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
                      <div className="border-b border-slate-100 pb-2">
                        <h4 className="text-xs font-semibold text-slate-800 uppercase tracking-widest">Notification Dispatch Hub</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5">Monitoring alerts dispatched during admissions cycles</p>
                      </div>

                      <div className="space-y-2.5 max-h-[250px] overflow-y-auto">
                        {notifications.slice(-4).reverse().map((notif) => (
                          <div key={notif.id} className="rounded-lg bg-slate-50 p-2.5 text-[10px] border border-slate-100 space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-slate-800">{notif.recipient}</span>
                              <span className={`text-[8px] px-1 rounded uppercase tracking-wider font-bold ${
                                notif.type === 'sms' ? 'bg-orange-50 text-orange-600' : 'bg-emerald-50 text-emerald-600'
                              }`}>
                                {notif.type}
                              </span>
                            </div>
                            <p className="text-slate-500 line-clamp-2 leading-relaxed">"{notif.message}"</p>
                          </div>
                        ))}
                        {notifications.length === 0 && (
                          <p className="text-[10px] text-slate-400 italic text-center py-4">No alarms dispatched in this session.</p>
                        )}
                      </div>
                    </div>

                  </div>

                </div>
              ) : (
                /* Dynamic Interactive News & Events Publishers */
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  
                  {/* A. NEWS PUBLISHER BLOCK */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4 text-slate-800">
                    <div className="border-b border-slate-100 pb-3">
                      <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest font-display flex items-center gap-2">
                        <span className="flex h-2.5 w-2.5 rounded-full bg-amber-500"></span>
                        Wisdom Press Newsroom Release Publisher
                      </h3>
                      <p className="text-[10px] text-slate-400 mt-1">Publish an official academy press release. It will render immediately in the live news dashboard page.</p>
                    </div>

                    <div className="space-y-4 text-xs font-sans">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">News Title</label>
                        <input
                          type="text"
                          value={newsTitle}
                          onChange={(e) => setNewsTitle(e.target.value)}
                          placeholder="e.g., Academy Olympiads Sweep Regional Sports Trophies"
                          className="w-full rounded-lg border border-slate-200 p-2 outline-none focus:border-amber-500 bg-slate-50"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">News Category</label>
                          <select
                            value={newsCategory}
                            onChange={(e) => setNewsCategory(e.target.value)}
                            className="w-full rounded-lg border border-slate-200 p-2 outline-none focus:border-amber-500 bg-slate-50 text-xs"
                          >
                            <option value="academic">Academic Releases</option>
                            <option value="sports">Athletic Summaries</option>
                            <option value="achievement">Extracurricular Achievements</option>
                            <option value="admission">Admissions Updates</option>
                            <option value="event">Major Campus Events</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Publisher Authority</label>
                          <input
                            type="text"
                            disabled
                            value="Wisdom Academy Administration"
                            className="w-full rounded-lg border border-slate-200 p-2 outline-none bg-slate-100 text-slate-400 cursor-not-allowed"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">News Brief Summary</label>
                        <textarea
                          rows={2}
                          value={newsSummary}
                          onChange={(e) => setNewsSummary(e.target.value)}
                          placeholder="Provide a short 2-line visual preview summarize statement..."
                          className="w-full rounded-lg border border-slate-200 p-2 outline-none focus:border-amber-500 bg-slate-50 resize-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Whole Release Content Description</label>
                        <textarea
                          rows={4}
                          value={newsContent}
                          onChange={(e) => setNewsContent(e.target.value)}
                          placeholder="Enter complete research briefing, transcript announcements, or sports events timelines..."
                          className="w-full rounded-lg border border-slate-200 p-2 outline-none focus:border-amber-500 bg-slate-50"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          if (!newsTitle || !newsSummary || !newsContent) {
                            alert("Please fill in News Title, Summary and Full Content fields first.");
                            return;
                          }
                          if (onPublishNews) {
                            onPublishNews({
                              title: newsTitle,
                              category: newsCategory,
                              summary: newsSummary,
                              content: newsContent
                            });
                            alert(`Wisdom Press Release ("${newsTitle}") published successfully! View updates in the public "News & Events" website tab!`);
                            // Reset state fields
                            setNewsTitle('');
                            setNewsSummary('');
                            setNewsContent('');
                          }
                        }}
                        className="w-full rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-2 uppercase text-xs tracking-wider transition"
                        style={{ cursor: 'pointer' }}
                      >
                        Authorize & Dispatch Web Press Release
                      </button>
                    </div>
                  </div>

                  {/* B. EVENTS PUBLISHER BLOCK */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4 text-slate-800">
                    <div className="border-b border-slate-100 pb-3">
                      <h3 className="text-sm font-bold text-indigo-900 uppercase tracking-widest font-display flex items-center gap-2">
                        <span className="flex h-2.5 w-2.5 rounded-full bg-indigo-500"></span>
                        Wisdom Active Calendar Coordinator
                      </h3>
                      <p className="text-[10px] text-slate-400 mt-1">Schedule a campus conference, play-off, assembly or open day directly on the public upcoming timeline.</p>
                    </div>

                    <div className="space-y-4 text-xs font-sans">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Campus Event Name</label>
                        <input
                          type="text"
                          value={eventTitle}
                          onChange={(e) => setEventTitle(e.target.value)}
                          placeholder="e.g., Annual Science Fair & Robotics cleanroom Pitch"
                          className="w-full rounded-lg border border-slate-200 p-2 outline-none focus:border-indigo-500 bg-slate-50"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Event Scheduled Date</label>
                          <input
                            type="text"
                            value={eventDate}
                            onChange={(e) => setEventDate(e.target.value)}
                            placeholder="e.g., June 24, 2026"
                            className="w-full rounded-lg border border-slate-200 p-2 outline-none focus:border-indigo-500 bg-slate-50"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Schedules Time Duration</label>
                          <input
                            type="text"
                            value={eventTime}
                            onChange={(e) => setEventTime(e.target.value)}
                            placeholder="e.g., 09:00 AM - 12:30 PM"
                            className="w-full rounded-lg border border-slate-200 p-2 outline-none focus:border-indigo-500 bg-slate-50"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Event Domain Focus</label>
                          <select
                            value={eventCategory}
                            onChange={(e) => setEventCategory(e.target.value)}
                            className="w-full rounded-lg border border-slate-200 p-2 outline-none focus:border-indigo-500 bg-slate-50 text-xs"
                          >
                            <option value="academic">Academic & STEM fairs</option>
                            <option value="arts">Creative Arts & Drama Assemblies</option>
                            <option value="sports">Extracurricular Athletics championships</option>
                            <option value="community">Parents-Faculty Community relations</option>
                            <option value="general">School general convocations</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Physical Location Hub</label>
                          <input
                            type="text"
                            value={eventLocation}
                            onChange={(e) => setEventLocation(e.target.value)}
                            placeholder="e.g., Bole Main Campus Assembly Hall"
                            className="w-full rounded-lg border border-slate-200 p-2 outline-none focus:border-indigo-500 bg-slate-50"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Brief Description Summary Guidelines</label>
                        <textarea
                          rows={3}
                          value={eventDescription}
                          onChange={(e) => setEventDescription(e.target.value)}
                          placeholder="Specify rules of entry, physical cleanroom protocols, speaker bios or guidelines for child seats..."
                          className="w-full rounded-lg border border-slate-250 p-2 outline-none focus:border-indigo-500 bg-slate-50"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          if (!eventTitle || !eventDate || !eventTime || !eventLocation || !eventDescription) {
                            alert("Please fill in entire event coordination fields (Title, Date, Time, Location and Description).");
                            return;
                          }
                          if (onPublishEvent) {
                            onPublishEvent({
                              title: eventTitle,
                              date: eventDate,
                              time: eventTime,
                              location: eventLocation,
                              category: eventCategory,
                              description: eventDescription
                            });
                            alert(`Wisdom Campus Event ("${eventTitle}") scheduled and published! Sync details inside "News & Events" calendars!`);
                            // Reset state fields
                            setEventTitle('');
                            setEventDate('');
                            setEventTime('');
                            setEventLocation('');
                            setEventDescription('');
                          }
                        }}
                        className="w-full rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 uppercase text-xs tracking-wider transition"
                        style={{ cursor: 'pointer' }}
                      >
                        Publish Event agenda & Schedule alerts
                      </button>
                    </div>
                  </div>

                </div>
              )}

            </div>
          )}

          {/* C. WORKSPACE VIEW : STUDENT CREDENTIALS / BADGES LOCKS */}
          {activeRole === 'student' && (
            <div className="space-y-6" id="student-desk-active">
              
              <div className="rounded-2xl bg-white border border-slate-250/60 p-6 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-1.5 text-emerald-600 font-bold text-xs uppercase tracking-wider font-display">
                      <CheckCheck className="h-4.5 w-4.5" />
                      <span>Certified Scholar Workspace</span>
                    </div>
                    <h2 className="text-lg font-bold font-display text-slate-900">Pre-Enrollment Credentials Locker</h2>
                    <p className="text-[10px] text-slate-400 leading-normal">Retrieve official biometric entry QR badges and print school registrar certificates.</p>
                  </div>

                  {/* Student selector dropdown if multiple exist */}
                  <div className="mt-3 sm:mt-0">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Select Student profile</label>
                    <select
                      value={selectedStudentId}
                      onChange={(e) => {
                        setSelectedStudentId(e.target.value);
                        onAddAuditLog("Student Credentials Switched", `Switched locker display view to student ID: ${e.target.value}`);
                      }}
                      className="rounded bg-slate-50 border border-slate-200 text-xs font-semibold py-1 px-2.5 text-slate-700 outline-none"
                    >
                      {approvedApplicants.map(app => (
                        <option key={app.id} value={app.id}>{app.fullName} ({app.id})</option>
                      ))}
                      {approvedApplicants.length === 0 && (
                        <option value="WA-2026-6281">Kidus Daniel Aberra (WA-2026-6281)</option>
                      )}
                    </select>
                  </div>
                </div>

                {currentStudentData ? (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                    
                    {/* Badge Column (md:col-span-5) */}
                    <div className="md:col-span-5 flex justify-center">
                      <div className="w-full max-w-sm rounded-3xl bg-slate-900 text-white overflow-hidden shadow-2xl relative border-4 border-amber-500/30 p-6 space-y-6">
                        {/* Header logo */}
                        <div className="flex items-center justify-between border-b border-white/10 pb-4">
                          <div className="flex items-center space-x-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded bg-gradient-to-br from-amber-500 to-amber-700 text-white shadow-md">
                              <span className="font-display font-black text-sm">WA</span>
                            </div>
                            <div>
                              <h4 className="font-display font-extrabold text-xs tracking-wider uppercase text-amber-400 leading-none">Wisdom Academy</h4>
                              <p className="text-[8px] uppercase tracking-widest text-slate-400 font-mono mt-1">Bole Campus</p>
                            </div>
                          </div>
                          <span className="rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 text-[8px] font-mono leading-none tracking-widest uppercase">
                            Approved
                          </span>
                        </div>

                        {/* Student Photo Placeholder and custom elements */}
                        <div className="flex flex-col items-center py-2 space-y-3">
                          <div className="relative">
                            <div className="h-24 w-24 rounded-full bg-slate-800 border-2 border-amber-500/50 flex items-center justify-center overflow-hidden">
                              <Users className="h-12 w-12 text-slate-400" />
                            </div>
                            <span className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center text-white" title="Biometrically Verified">
                              <Shield className="h-3 w-3" />
                            </span>
                          </div>

                          <div className="text-center">
                            <h3 className="font-display font-extrabold text-md text-white tracking-wide">{currentStudentData.fullName}</h3>
                            <p className="text-[10px] font-semibold text-slate-300 mt-1">{currentStudentData.gradeLevel}</p>
                            <p className="text-[9px] text-slate-400 font-mono mt-0.5">{currentStudentData.email}</p>
                          </div>
                        </div>

                        {/* ID data mappings */}
                        <div className="bg-slate-950/70 rounded-xl p-3 grid grid-cols-2 gap-y-2.5 gap-x-1.5 text-[9px] font-mono leading-tight">
                          <div>
                            <span className="text-[8px] text-slate-500 block">STUDENT ID</span>
                            <span className="font-bold text-amber-400">{currentStudentData.id}</span>
                          </div>
                          <div>
                            <span className="text-[8px] text-slate-500 block">PARENT CONTACT</span>
                            <span className="font-bold text-slate-300">{currentStudentData.parentPhone}</span>
                          </div>
                          <div>
                            <span className="text-[8px] text-slate-500 block">ISSUED SESS</span>
                            <span className="font-bold text-slate-300">2026 - 2027</span>
                          </div>
                          <div>
                            <span className="text-[8px] text-slate-500 block">AUTHENTICATOR</span>
                            <span className="font-bold text-emerald-400">MD5_WA_OK</span>
                          </div>
                        </div>

                        {/* Barcode representation */}
                        <div className="pt-3 border-t border-white/10 flex flex-col items-center space-y-2">
                          <div className="text-[9px] text-slate-400 text-center uppercase tracking-wide leading-none font-mono">
                            Digital QR / Passage Pass
                          </div>

                          <div className="flex h-11 w-full max-w-[200px] items-center justify-between bg-white/95 rounded-lg border border-slate-100 p-2.5 select-none relative overflow-hidden">
                            {/* Simulated active 1D/2D bars */}
                            <div className="flex w-full items-center justify-center space-x-1.5 opacity-80">
                              <div className="font-mono text-[9px] text-slate-800 font-bold tracking-widest">
                                ||||| | || | ||| {currentStudentData.id} || | ||||
                              </div>
                            </div>
                            <div className="absolute inset-x-0 bottom-0.5 text-center text-[7px] text-slate-400 font-mono">
                              Biometric Registered Terminal Verified
                            </div>
                          </div>
                          
                          <button
                            onClick={() => {
                              onAddAuditLog("Badge Certificate Exported", `Printed Pre-Enrollment verification certificate for student "${currentStudentData.fullName}"`);
                              alert(`Wisdom Certificate package: Pre-Enrollment PDF for applicant ${currentStudentData.id} compiled successfully!`);
                            }}
                            className="text-[9px] text-amber-400 hover:underline font-bold uppercase tracking-wider block"
                          >
                            Print official Certificate Card PDF
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Metadata Column (md:col-span-7) */}
                    <div className="md:col-span-7 space-y-6">
                      
                      {/* Course Schedule card */}
                      <div className="rounded-xl border border-slate-100 p-4 bg-slate-50/50 space-y-3.5">
                        <div className="flex items-center space-x-2 text-indigo-900 border-b border-slate-100 pb-2">
                          <Library className="h-4.5 w-4.5 text-indigo-500" />
                          <h4 className="font-display font-bold text-xs uppercase tracking-wider">Dynamic Course & Innovation Roster</h4>
                        </div>

                        <div className="space-y-2.5 text-xs text-slate-600 font-sans">
                          <div className="flex justify-between items-center p-2 rounded-lg bg-white shadow-xs border-l-3 border-emerald-500">
                            <div>
                              <p className="font-bold text-slate-800">Advanced Biotech & Bio-Sciences</p>
                              <p className="text-[10px] text-slate-400 mt-0.5">Faculty Lead: Dr. Senait Bekele</p>
                            </div>
                            <span className="font-mono text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">MWF 09:00 AM</span>
                          </div>

                          <div className="flex justify-between items-center p-2 rounded-lg bg-white shadow-xs border-l-3 border-amber-500">
                            <div>
                              <p className="font-bold text-slate-800">Neural Network Architecture & AI Lab</p>
                              <p className="text-[10px] text-slate-400 mt-0.5">Faculty Lead: Ato Lulseged Mengesha, M.Sc.</p>
                            </div>
                            <span className="font-mono text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">TTh 11:00 AM</span>
                          </div>

                          <div className="flex justify-between items-center p-2 rounded-lg bg-white shadow-xs border-l-3 border-indigo-500">
                            <div>
                              <p className="font-bold text-slate-800">Diplomatic Ethics & Global Leadership Studies</p>
                              <p className="text-[10px] text-slate-400 mt-0.5">Faculty Lead: Dr. Abraham Tadesse, Ph.D.</p>
                            </div>
                            <span className="font-mono text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">TTh 02:00 PM</span>
                          </div>

                          <div className="flex justify-between items-center p-2 rounded-lg bg-white shadow-xs border-l-3 border-slate-400">
                            <div>
                              <p className="font-bold text-slate-800">Ethiopian Cultural Heritage and Afaan Oromo/Amharic Studies</p>
                              <p className="text-[10px] text-slate-400 mt-0.5">Faculty Lead: Woyzero Aster Assefa, M.A.</p>
                            </div>
                            <span className="font-mono text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">MW 04:00 PM</span>
                          </div>
                        </div>
                      </div>

                      {/* Fee Structure / Tuition Card */}
                      <div className="rounded-xl border border-slate-100 p-4 bg-slate-50/50 space-y-3">
                        <div className="flex items-center space-x-2 text-indigo-900 border-b border-slate-100 pb-2">
                          <Database className="h-4.5 w-4.5 text-orange-500" />
                          <h4 className="font-display font-bold text-xs uppercase tracking-wider">Tuition Fee Ledger Statements</h4>
                        </div>

                        <div className="space-y-2.5 text-xs text-slate-600 font-sans">
                          <div className="flex justify-between items-center pb-1 border-b border-slate-200/50">
                            <span>Cambridge dual-curriculum Annual Tuition:</span>
                            <span className="font-semibold text-slate-800">$7,450.00 USD</span>
                          </div>
                          <div className="flex justify-between items-center pb-1 border-b border-slate-200/50">
                            <span>One-Time Administration Registration Fee:</span>
                            <span className="font-semibold text-slate-800">$350.00 USD</span>
                          </div>
                          <div className="flex justify-between items-center pb-1 border-b border-slate-200/50">
                            <span>Technology and Research Labs Access Charge:</span>
                            <span className="font-semibold text-slate-800">$480.50 USD</span>
                          </div>
                          <div className="flex justify-between items-center pb-1.5 border-b border-slate-200/50 text-indigo-600">
                            <span>Scholarship Endowment/Grant Allowance discount:</span>
                            <span className="font-bold">- $1,800.00 USD</span>
                          </div>
                          <div className="flex justify-between items-center pt-1 font-bold text-slate-900 text-sm">
                            <span>Total Net Outstanding Balances:</span>
                            <span className="text-amber-700">$6,480.50 USD</span>
                          </div>
                        </div>
                      </div>

                    </div>

                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic text-center py-12">No approved student registries exist. Log in as Registrar to approve candidates first!</p>
                )}
              </div>

            </div>
          )}

          {/* D. WORKSPACE VIEW : APPLICANT STATUS FINDER & PROCESS TIMELINE */}
          {activeRole === 'applicant' && (
            <div className="space-y-6" id="applicant-desk-active">
              
              <div className="rounded-2xl bg-white border border-slate-250/60 p-6 shadow-sm space-y-6">
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-slate-150">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-1.5 text-amber-600 font-bold text-xs uppercase tracking-wider font-display">
                      <Lock className="h-4.5 w-4.5" />
                      <span>Applicant Registry Center</span>
                    </div>
                    <h2 className="text-lg font-bold font-display text-slate-900">Admissions Evaluation Tracker</h2>
                    <p className="text-[10px] text-slate-400 leading-normal">Enter your unique Application ID to request real-time status reviews and access decision cards.</p>
                  </div>

                  {/* Applicant selector dropdown for testing */}
                  <div className="mt-3 sm:mt-0">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Select applicant profile to query</label>
                    <select
                      value={selectedApplicantId}
                      onChange={(e) => {
                        setSelectedApplicantId(e.target.value);
                        onAddAuditLog("Applicant Status Queried", `Queried evaluate progress index for candidate: ${e.target.value}`);
                      }}
                      className="rounded bg-slate-50 border border-slate-200 text-xs font-semibold py-1 px-2.5 text-slate-700 outline-none"
                    >
                      {applications.map(app => (
                        <option key={app.id} value={app.id}>{app.fullName} ({app.id} - {app.status})</option>
                      ))}
                      {applications.length === 0 && (
                        <option value="WA-2026-6281">Kidus Daniel Aberra</option>
                      )}
                    </select>
                  </div>
                </div>

                {currentApplicantData ? (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                    
                    {/* Left Panel: Profile values summary (Col-span 5) */}
                    <div className="md:col-span-5 rounded-2xl border border-slate-100 p-5 bg-slate-50/60 space-y-4">
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Applicant Core Credentials Mapped</h4>
                      
                      <div className="space-y-3.5 text-xs text-slate-600 font-sans">
                        <div className="flex justify-between items-center pb-2 border-b border-white">
                          <span className="text-slate-400">FullName:</span>
                          <span className="font-bold text-slate-800">{currentApplicantData.fullName}</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b border-white">
                          <span className="text-slate-400">Application Reference:</span>
                          <span className="font-mono font-bold text-indigo-700">{currentApplicantData.id}</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b border-white">
                          <span className="text-slate-400">Registered Email:</span>
                          <span className="font-semibold text-slate-800">{currentApplicantData.email}</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b border-white">
                          <span className="text-slate-400">Grade Level:</span>
                          <span className="font-semibold text-slate-800">{currentApplicantData.gradeLevel}</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b border-white">
                          <span className="text-slate-400">Preceding School:</span>
                          <span className="font-semibold text-slate-800">{currentApplicantData.previousSchool || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400">Parent / Sponsor Name:</span>
                          <span className="font-semibold text-slate-800">{currentApplicantData.parentName}</span>
                        </div>
                      </div>

                      <div className="rounded-lg bg-amber-50 border border-amber-100/50 p-3 flex space-x-2 text-[10px] text-amber-900 leading-normal">
                        <ShieldAlert className="h-4.5 w-4.5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold">Automatic Synchronization Enabled</p>
                          <p className="opacity-90 font-sans mt-0.5">Dispatched confirmation alerts correspond instantly to evaluations processed by the Registrar Committee.</p>
                        </div>
                      </div>
                    </div>

                    {/* Right Panel: Interactive Status Timeline (Col-span 7) */}
                    <div className="md:col-span-7 rounded-2xl border border-slate-100 p-5 bg-white space-y-6">
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pb-2 border-b border-slate-100">Evaluations & Milestones Pipeline</h4>
                      
                      {/* Vertical Timeline Tracker */}
                      <div className="relative pl-6 space-y-6">
                        {/* Connecting Line */}
                        <div className="absolute left-[9px] top-2 bottom-2 w-0.5 bg-slate-200"></div>

                        {/* Step 1: Form reception */}
                        <div className="relative">
                          {/* Dot */}
                          <span className="absolute -left-[22px] top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 ring-4 ring-white">
                            <CheckCheck className="h-2.5 w-2.5 text-white" />
                          </span>
                          <div className="space-y-1">
                            <h5 className="text-xs font-bold text-slate-800">1. Online Application Form Registered</h5>
                            <p className="text-[10px] text-slate-500 font-sans leading-relaxed">
                              Candidate transcript profiles and personal entries securely synchronized and compiled into Wisdom registries on {new Date(currentApplicantData.appliedAt).toLocaleDateString()}.
                            </p>
                          </div>
                        </div>

                        {/* Step 2: Transcript Audit */}
                        <div className="relative">
                          {/* Dot */}
                          <span className="absolute -left-[22px] top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 ring-4 ring-white">
                            <CheckCheck className="h-2.5 w-2.5 text-white" />
                          </span>
                          <div className="space-y-1">
                            <h5 className="text-xs font-bold text-slate-800">2. Transcripts Verification & Background Logs</h5>
                            <p className="text-[10px] text-slate-500 font-sans leading-relaxed">
                              Previous educational curriculum credentials validated. Security stamp WA_CONTACT_OK verified against active enrollment rules.
                            </p>
                          </div>
                        </div>

                        {/* Step 3: Decisions State */}
                        <div className="relative">
                          {/* Dynamic Dot based on status */}
                          {currentApplicantData.status === 'approved' && (
                            <span className="absolute -left-[22px] top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 ring-4 ring-white">
                              <CheckCheck className="h-2.5 w-2.5 text-white" />
                            </span>
                          )}
                          {(currentApplicantData.status === 'pending' || currentApplicantData.status === 'reviewing') && (
                            <span className="absolute -left-[22px] top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 ring-4 ring-white">
                              <span className="h-1.5 w-1.5 rounded-full bg-white animate-ping"></span>
                            </span>
                          )}
                          {currentApplicantData.status === 'rejected' && (
                            <span className="absolute -left-[22px] top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 ring-4 ring-white">
                              <span className="h-1.5 w-1.5 rounded-full bg-white"></span>
                            </span>
                          )}

                          <div className="space-y-1.5">
                            <h5 className="text-xs font-bold text-slate-800 flex items-center space-x-1.5">
                              <span>3. Board Registrar Evaluations Decisions</span>
                              <span className={`text-[9px] font-mono rounded px-1.5 font-bold uppercase ${
                                currentApplicantData.status === 'approved' ? 'bg-emerald-50 text-emerald-800' :
                                currentApplicantData.status === 'rejected' ? 'bg-rose-50 text-rose-800' :
                                'bg-amber-50 text-amber-800 animate-pulse'
                              }`}>
                                {currentApplicantData.status}
                              </span>
                            </h5>

                            {currentApplicantData.status === 'approved' && (
                              <div className="space-y-2 text-[10px] text-slate-500 font-sans leading-relaxed">
                                <p className="text-emerald-700 font-bold">CONGRATULATIONS! Your pre-registration application is fully APPROVED by the Wisdom Academy Council.</p>
                                <p>We have cleared your biometric credentials and generated your official digital Student badge. Please access your student locker badge immediately.</p>
                                
                                <button
                                  onClick={() => {
                                    setSelectedStudentId(currentApplicantData.id);
                                    handleRoleLogin('student');
                                  }}
                                  className="inline-flex items-center space-x-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 uppercase tracking-wide transition mt-2 text-[9px]"
                                >
                                  <span>Go to Student ID Locker</span>
                                  <ArrowLeft className="h-3 w-3 rotate-180" />
                                </button>
                              </div>
                            )}

                            {(currentApplicantData.status === 'pending' || currentApplicantData.status === 'reviewing') && (
                              <p className="text-[10px] text-slate-500 font-sans leading-relaxed">
                                Your application reference indices exist under active evaluations. Registrars are currently scheduling the digital cognitive competency test. Notification check alerts will pop up on your mobile line once decisions sync.
                              </p>
                            )}

                            {currentApplicantData.status === 'rejected' && (
                              <p className="text-[10px] text-slate-500 font-sans leading-relaxed">
                                <span className="text-rose-700 font-semibold block">Application Declined.</span>
                                We regret to inform you that our tight 16-scholar cohort cap is fully met for this academic cycle. Your deep academic transcripts have been stored on our reserve logs should any rollback allocations align.
                              </p>
                            )}
                          </div>
                        </div>

                      </div>

                    </div>

                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic text-center py-12">No evaluation files found. Please submit an application form first.</p>
                )}

              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
}
