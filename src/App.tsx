import { useState, useTransition } from 'react';
import { Language, UserRole, AdmissionApplication, AuditLog, DatabaseBackup, SystemNotification, SchoolEvent, NewsItem } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import NotificationsSimulator from './components/NotificationsSimulator';
import HomeSection from './components/sections/HomeSection';
import AboutSection from './components/sections/AboutSection';
import AcademicsSection from './components/sections/AcademicsSection';
import AdmissionsSection from './components/sections/AdmissionsSection';
import StudentLifeSection from './components/sections/StudentLifeSection';
import FacultySection from './components/sections/FacultySection';
import NewsEventsSection from './components/sections/NewsEventsSection';
import GallerySection from './components/sections/GallerySection';
import ContactSection from './components/sections/ContactSection';
import Dashboard from './components/Dashboard';
import { NEWS, EVENTS } from './data';

import { Bell, Smartphone, ShieldAlert, Sparkles, X, Info } from 'lucide-react';

export default function App() {
  // Navigation & View States
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [portalOpen, setPortalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Floating notifications toggle
  const [notificationsPanelOpen, setNotificationsPanelOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Dynamic public data Pools for live News & Events scheduling publishers
  const [newsList, setNewsList] = useState<NewsItem[]>(NEWS);
  const [eventsList, setEventsList] = useState<SchoolEvent[]>(EVENTS);

  // 1. Core Admissions Memory Pool (Simulates database records)
  const [applications, setApplications] = useState<AdmissionApplication[]>([
    {
      id: "WA-2026-6281",
      fullName: "Kidus Daniel Aberra",
      email: "kidus.aberra@parent.com",
      phone: "+251 911 405812",
      gender: "male",
      dateOfBirth: "2011-04-12",
      gradeLevel: "Grade 11 (Cambridge Advanced Levels)",
      previousSchool: "Bole International Community",
      parentName: "Daniel Aberra",
      parentPhone: "+251911405812",
      status: "approved",
      appliedAt: "2026-06-01T10:30:00Z"
    },
    {
      id: "WA-2026-1049",
      fullName: "Selam Gifty Olana",
      email: "gifty.olana@example.com",
      phone: "+251 900 891823",
      gender: "female",
      dateOfBirth: "2012-08-22",
      gradeLevel: "Grade 9 (Cambridge IGCSE)",
      previousSchool: "Elite Preparatory School",
      parentName: "Olana Jirata",
      parentPhone: "+251900891823",
      status: "pending",
      appliedAt: "2026-06-15T15:45:00Z"
    }
  ]);

  // 2. Security System Audit Logs Tracker (Simulates internal activity logs)
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([
    {
      id: "l1",
      timestamp: "2026-06-17 08:00:15",
      user: "System Daemon",
      role: "Platform",
      action: "Platform Security Check",
      details: "CSRF check passed fully. XSS sanitizer filter validated and mounted.",
      ipAddress: "127.0.0.1"
    },
    {
      id: "l2",
      timestamp: "2026-06-17 08:15:30",
      user: "System Registrar",
      role: "Registrar",
      action: "Admissions State Sync",
      details: "Fetched 2 active applicant index profiles from database registries.",
      ipAddress: "192.168.1.14"
    }
  ]);

  // 3. Electronic Database Backup logs (Simulated rollbacks catalog)
  const [backups, setBackups] = useState<DatabaseBackup[]>([
    {
      id: "bk-1",
      version: "1.0.4",
      createdAt: "2026-06-10T12:00:00Z",
      fileName: "wisdom_prod_backup_10062026.json",
      fileSize: "84.2 KB",
      recordCount: 382,
      status: "active"
    }
  ]);

  // 4. Live Broadcast Relay (Simulates active parent text messages and email servers)
  const [notifications, setNotifications] = useState<SystemNotification[]>([
    {
      id: "n1",
      recipient: "+251911405812",
      type: "sms",
      subjectOrHeader: "Enrollment Confirmed",
      message: "WA_Secure Alert: Parent of Kidus Daniel Aberra, we are proud to inform you that your child's pre-enrollment at Wisdom Academy has been APPROVED. Secure digital pre-enrollment badge references AppId: WA-2026-6281.",
      sentAt: "08:15 AM",
      status: "delivered"
    }
  ]);

  // Helper State Mutators
  const addAuditLog = (action: string, details: string) => {
    const newLog: AuditLog = {
      id: `l-${Math.floor(Math.random() * 100000)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user: portalOpen ? "Registrar Agent" : "Guest Browser",
      role: portalOpen ? "Registrar" : "Public Guest",
      action,
      details,
      ipAddress: `192.168.1.${Math.floor(10 + Math.random() * 200)}`
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const triggerSimulatedNotification = (notif: Omit<SystemNotification, 'id' | 'sentAt'>) => {
    // Inject sent time
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newNotif: SystemNotification = {
      ...notif,
      id: `notif-${Math.floor(Math.random() * 100000)}`,
      sentAt: timeString
    };
    setNotifications(prev => [...prev, newNotif]);
  };

  // Admissions State Mutation handlers
  const handleAddNewApplication = (newCandidate: Omit<AdmissionApplication, 'id' | 'status' | 'appliedAt'>) => {
    const generatedId = `WA-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const freshApp: AdmissionApplication = {
      ...newCandidate,
      id: generatedId,
      status: 'pending',
      appliedAt: new Date().toISOString()
    };

    setApplications(prev => [...prev, freshApp]);

    // Triggers instant simulated SMS to Parent and Email to student!
    triggerSimulatedNotification({
      recipient: freshApp.parentPhone,
      type: 'sms',
      subjectOrHeader: 'Form registered',
      message: `WA_Secure Alert: Pre-enrollment records for applicant ${freshApp.fullName} registered successfully under AppId: ${generatedId}. Registrars folder synced.`,
      status: 'delivered'
    });

    triggerSimulatedNotification({
      recipient: freshApp.email,
      type: 'email',
      subjectOrHeader: `Application Received: ${generatedId}`,
      message: `Dear ${freshApp.parentName},

We have received your pre-admissions registry entries for candidate "${freshApp.fullName}" (Application ID: ${generatedId}).

A confirmation barcode is mapped to your applicant credentials. Please bring a copy of your downloaded pre-enrollment certificate card when visiting Bole Campus modules.

Sincerely,
Wisdom Registrar Team`,
      status: 'delivered'
    });

    // Auditor logs
    addAuditLog(
      "Online Admission Submission",
      `New candidate entry registered: "${freshApp.fullName}" applying for "${freshApp.gradeLevel}"`
    );
  };

  const handleApproveApplication = (id: string) => {
    setApplications(prev => 
      prev.map(app => {
        if (app.id === id) {
          // Send simulated SMS text alerts to parents
          triggerSimulatedNotification({
            recipient: app.parentPhone,
            type: 'sms',
            subjectOrHeader: 'Application Approved',
            message: `WA_Secure Alert: Parent of ${app.fullName}, we are proud to inform you that your child's pre-enrollment at Wisdom Academy has been APPROVED. Secure digital pre-enrollment badge references AppId: ${app.id}. Registration is locked.`,
            status: 'delivered'
          });

          // Send welcome emails
          triggerSimulatedNotification({
            recipient: app.email,
            type: 'email',
            subjectOrHeader: `Welcome to Wisdom Academy | ${app.id}`,
            message: `Dear ${app.fullName},

We are extremely delighted to welcome you to the Wisdom Academy cohort.

Your application reference ${app.id} has been fully approved by the Board of Registrars. Your pre-registration badges and barcodes are uploaded securely under our active databases.

Please bring a printed copy of your credentials badge during Orientation Week.

With congratulations,
Registrar Division`,
            status: 'delivered'
          });

          // Audit Log
          addAuditLog(
            "Admissions Status Modified",
            `Admissions registrar approved enrollment credentials for applicant: "${app.fullName}" (${id})`
          );

          return { ...app, status: 'approved' };
        }
        return app;
        })
    );
  };

  const handleRejectApplication = (id: string) => {
    setApplications(prev => 
      prev.map(app => {
        if (app.id === id) {
          addAuditLog(
            "Admissions Status Modified",
            `Registrar declined enrollment for applicant: "${app.fullName}" (${id})`
          );
          return { ...app, status: 'rejected' };
        }
        return app;
      })
    );
  };

  // Admin Backup State Mutation handler
  const handleCreateDatabaseBackup = () => {
    const count = backups.length + 1;
    const newBackup: DatabaseBackup = {
      id: `bk-${Math.floor(Math.random() * 100000)}`,
      version: `1.0.${count}`,
      createdAt: new Date().toISOString(),
      fileName: `wisdom_prod_backup_rev_${count}.json`,
      fileSize: `${(30 + Math.random() * 40).toFixed(1)} KB`,
      recordCount: applications.length + auditLogs.length,
      status: 'active'
    };

    setBackups(prev => [newBackup, ...prev]);
    addAuditLog(
      "Database Backup Block Created",
      `Compiled rollback file: "${newBackup.fileName}" indexing ${newBackup.recordCount} structures`
    );
  };

  const handlePublishNews = (newNews: { title: string; category: string; summary: string; content: string }) => {
    const freshNews: NewsItem = {
      id: `news-${Math.floor(1000 + Math.random() * 9000)}`,
      title: { en: newNews.title, am: newNews.title, om: newNews.title },
      category: newNews.category as any,
      summary: { en: newNews.summary, am: newNews.summary, om: newNews.summary },
      content: { en: newNews.content, am: newNews.content, om: newNews.content },
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      imageUrl: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=800",
      author: "Academy Admin"
    };

    setNewsList(prev => [freshNews, ...prev]);
    addAuditLog("Wisdom Press News Published", `Administrator published new public press release: "${newNews.title}"`);
    
    triggerSimulatedNotification({
      recipient: "All Subscribers",
      type: "email",
      subjectOrHeader: `Breaking News: ${newNews.title}`,
      message: `Dear Academy Community,\n\nWe have published a new official press release:\n"${newNews.title}"\n\nCategory: ${newNews.category}\nSummary: ${newNews.summary}\n\nRead the full release under our "News & Events" tab on the official portal.\n\nWarm regards,\nWisdom Academy Communications`,
      status: "delivered"
    });
  };

  const handlePublishEvent = (newEvent: { title: string; date: string; time: string; location: string; category: string; description: string }) => {
    const freshEvent: SchoolEvent = {
      id: `ev-${Math.floor(1000 + Math.random() * 9000)}`,
      title: { en: newEvent.title, am: newEvent.title, om: newEvent.title },
      date: newEvent.date,
      time: newEvent.time,
      location: { en: newEvent.location, am: newEvent.location, om: newEvent.location },
      category: newEvent.category as any,
      description: { en: newEvent.description, am: newEvent.description, om: newEvent.description }
    };

    setEventsList(prev => [freshEvent, ...prev]);
    addAuditLog("Calendar Event Published", `Administrator scheduled and published calendar event: "${newEvent.title}"`);
    
    triggerSimulatedNotification({
      recipient: "All Parents & Scholars",
      type: "sms",
      subjectOrHeader: "New Event Invitation",
      message: `WA_Secure: New campus event scheduled: "${newEvent.title}" on ${newEvent.date} at ${newEvent.time} (${newEvent.location}). RSVP via News & Events!`,
      status: "delivered"
    });
  };

  // Calendar Event triggers
  const handleEventSelect = (event: SchoolEvent) => {
    addAuditLog("Calendar Event Clicked", `Guest browsed event specs for: "${event.title.en}"`);
  };

  // Determine current active role display based on tab selection
  const handleQuickSearch = (query: string) => {
    setSearchQuery(query);
  };

  const toggleLanguage = (lang: Language) => {
    setCurrentLang(lang);
    addAuditLog("Language Switched", `Language code altered to "${lang.toUpperCase()}"`);
  };

  const toggleTab = (tab: string) => {
    startTransition(() => {
      setActiveTab(tab);
      setPortalOpen(false); // navigate out of portal back to main tabs
    });
    addAuditLog("Navigation Tab Clicked", `Navigated to public section path: "${tab}"`);
  };

  const openPortal = () => {
    setPortalOpen(true);
    addAuditLog("Portal Requested", "Initiated authorization portal route check");
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans text-slate-800" id="main-application-view">
      
      {/* Dynamic loading transition fallback overlay */}
      {isPending && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/20 backdrop-blur-xs">
          <div className="rounded-xl bg-white p-4 shadow-xl flex items-center space-x-3 text-xs font-semibold text-slate-700">
            <span className="h-4 w-4 rounded-full border-2 border-amber-500 border-t-transparent animate-spin"></span>
            <span>Switching sections...</span>
          </div>
        </div>
      )}

      {/* Global simulated network banner or info widget */}
      <div className="bg-slate-100 border-b border-slate-200 py-1.5 px-4 text-center text-[10px] sm:text-xs text-slate-600 font-sans flex items-center justify-center space-x-2">
        <Info className="h-3.5 w-3.5 text-indigo-600 flex-shrink-0 animate-bounce" />
        <span><strong>Enterprise Portal:</strong> Log in using the <strong>"System Portal"</strong> button to approve mock admissions, trigger parent SMS alerts, and check student QR badges.</span>
      </div>

      {/* Main header block */}
      <Header
        currentLang={currentLang}
        onLangChange={toggleLanguage}
        activeTab={activeTab}
        onTabChange={toggleTab}
        currentUserRole={portalOpen ? 'registrar' : 'public'}
        onPortalOpen={openPortal}
        onQuickSearch={handleQuickSearch}
      />

      {/* Dynamic Content Body Area */}
      <main className="flex-grow">
        {portalOpen ? (
          /* Systems review administration dashboard portal */
          <Dashboard
            currentLang={currentLang || 'en'}
            applications={applications}
            onApproveApplication={handleApproveApplication}
            onRejectApplication={handleRejectApplication}
            auditLogs={auditLogs}
            onAddAuditLog={addAuditLog}
            backups={backups}
            onCreateBackup={handleCreateDatabaseBackup}
            notifications={notifications}
            onPortalClose={() => setPortalOpen(false)}
            onPublishNews={handlePublishNews}
            onPublishEvent={handlePublishEvent}
          />
        ) : (
          /* Default Public Website navigation tracks */
          <div className="animate-fadeIn">
            {activeTab === 'home' && (
              <HomeSection 
                currentLang={currentLang} 
                onTabChange={toggleTab} 
                onEventSelect={handleEventSelect} 
                eventsList={eventsList}
              />
            )}
            {activeTab === 'about' && (
              <AboutSection currentLang={currentLang} />
            )}
            {activeTab === 'academics' && (
              <AcademicsSection currentLang={currentLang} />
            )}
            {activeTab === 'admissions' && (
              <AdmissionsSection
                currentLang={currentLang}
                onApply={handleAddNewApplication}
                applications={applications}
              />
            )}
            {activeTab === 'studentLife' && (
              <StudentLifeSection currentLang={currentLang} />
            )}
            {activeTab === 'faculty' && (
              <FacultySection currentLang={currentLang} />
            )}
            {activeTab === 'newsEvents' && (
              <NewsEventsSection
                currentLang={currentLang}
                onEventSelect={handleEventSelect}
                onTriggerSimulatedNotification={triggerSimulatedNotification}
                newsList={newsList}
                eventsList={eventsList}
              />
            )}
            {activeTab === 'gallery' && (
              <GallerySection currentLang={currentLang} />
            )}
            {activeTab === 'contact' && (
              <ContactSection 
                currentLang={currentLang} 
                onAddAuditLog={addAuditLog} 
              />
            )}
          </div>
        )}
      </main>

      {/* Site Footer */}
      <Footer currentLang={currentLang} onTabChange={toggleTab} />

      {/* FLOATING ACTION TRIGGER ALERT ICON (Notification Simulator Panel toggle) */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setNotificationsPanelOpen(!notificationsPanelOpen)}
          className="relative flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white shadow-xl hover:bg-slate-800 transition-all hover:scale-105"
          style={{ cursor: 'pointer' }}
          aria-label="Toggle Dispatch logs"
          id="global-notifications-balloon"
        >
          <Bell className="h-5.5 w-5.5 text-amber-400 animate-pulse" />
          {notifications.length > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-slate-900 font-mono border-2 border-slate-50">
              {notifications.length}
            </span>
          )}
        </button>
      </div>

      {/* Slide-in Simulator Notifications Tray overlay panel */}
      <NotificationsSimulator
        notifications={notifications}
        onClear={() => setNotifications(prev => [])}
        isOpen={notificationsPanelOpen}
        onClose={() => setNotificationsPanelOpen(false)}
      />

    </div>
  );
}
