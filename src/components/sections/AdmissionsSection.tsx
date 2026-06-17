import React, { useState } from 'react';
import { TRANSLATIONS, FAQS_ADMISSION } from '../../data';
import { Language, AdmissionApplication } from '../../types';
import { ClipboardList, ShieldAlert, CheckCircle, Smartphone, Mail, Sparkles, Building, Printer, Download, CreditCard, ChevronDown } from 'lucide-react';

interface AdmissionsSectionProps {
  currentLang: Language;
  onApply: (candidate: Omit<AdmissionApplication, 'id' | 'status' | 'appliedAt'>) => void;
  applications: AdmissionApplication[];
}

export default function AdmissionsSection({ currentLang, onApply, applications }: AdmissionsSectionProps) {
  const t = (key: string) => TRANSLATIONS[currentLang][key] || key;

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('male');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gradeLevel, setGradeLevel] = useState('Grade 9 (Cambridge IGCSE)');
  const [previousSchool, setPreviousSchool] = useState('');
  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [wantsScholarship, setWantsScholarship] = useState(false);
  const [submissionSuccessId, setSubmissionSuccessId] = useState<string | null>(null);

  // FAQ toggles
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !parentName || !parentPhone) {
      alert('Please fill all required enrollment fields.');
      return;
    }

    // Call state callback in parent App.tsx
    // The parent App will return a newly generated unique ID.
    // Let's create a temporary client side ID generation mechanism, but the parent App will do the heavy storage.
    const tempId = `WA-${2026}-${Math.floor(1000 + Math.random() * 9000)}`;
    
    onApply({
      fullName,
      email,
      phone,
      gender,
      dateOfBirth,
      gradeLevel,
      previousSchool,
      parentName,
      parentPhone,
      notes: wantsScholarship ? "Interested in merit-based scholarship cohort" : ""
    });

    setSubmissionSuccessId(tempId);
  };

  const downloadCredentialDocument = () => {
    if (!activeSuccessfulCandidate) return;
    
    const docHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Wisdom Academy Enrollment Receipt - ${activeSuccessfulCandidate.id}</title>
  <style>
    body {
      background: #f1f5f9;
      font-family: 'Helvetica Neue', Arial, sans-serif;
      padding: 40px 20px;
      color: #1e293b;
    }
    .wrapper {
      max-width: 680px;
      margin: 0 auto;
      background: #ffffff;
      border: 8px solid #d97706; /* Golden Amber border */
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.08);
      padding: 40px;
      box-sizing: border-box;
      position: relative;
    }
    .watermark {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-30deg);
      font-size: 80px;
      font-weight: 900;
      color: rgba(217, 119, 6, 0.04);
      white-space: nowrap;
      pointer-events: none;
      user-select: none;
      z-index: 1;
    }
    .header {
      text-align: center;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    .logo {
      display: inline-block;
      width: 60px;
      height: 60px;
      background: #d97706;
      color: white;
      text-align: center;
      line-height: 60px;
      font-size: 26px;
      font-weight: bold;
      border-radius: 10px;
      margin-bottom: 12px;
    }
    .academy-title {
      font-size: 24px;
      letter-spacing: 2px;
      font-weight: 800;
      text-transform: uppercase;
      margin: 0;
      color: #0f172a;
    }
    .academy-subtitle {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 3px;
      color: #64748b;
      margin: 4px 0 0 0;
      font-weight: bold;
    }
    .badge-label {
      background: #0f172a;
      color: #fbbf24;
      display: inline-block;
      padding: 6px 16px;
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      border-radius: 20px;
      letter-spacing: 2px;
      margin-top: 15px;
    }
    .letter-body {
      font-size: 14px;
      line-height: 1.6;
      color: #334155;
      margin-bottom: 30px;
    }
    .bold-title {
      color: #0f172a;
      font-weight: 700;
    }
    .details-table {
      width: 100%;
      border-collapse: collapse;
      margin: 25px 0;
      z-index: 10;
      position: relative;
    }
    .details-table th, .details-table td {
      border: 1px solid #e2e8f0;
      padding: 12px 16px;
      text-align: left;
    }
    .details-table th {
      background: #f8fafc;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #475569;
      width: 35%;
    }
    .details-table td {
      font-size: 13px;
      color: #0f172a;
      font-weight: 600;
    }
    .footer {
      border-top: 2px solid #e2e8f0;
      padding-top: 20px;
      margin-top: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .authority {
      font-size: 12px;
      color: #475569;
    }
    .authority-sign {
      font-family: 'Georgia', serif;
      font-style: italic;
      font-size: 18px;
      color: #1e3a8a;
      margin-bottom: 4px;
    }
    .instructions {
      background: #fef3c7;
      border-left: 4px solid #d97706;
      padding: 15px;
      border-radius: 4px;
      font-size: 12px;
      color: #78350f;
      line-height: 1.5;
    }
    .print-btn {
      display: block;
      width: 100%;
      text-align: center;
      background: #d97706;
      color: white;
      padding: 12px;
      font-weight: bold;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      margin-top: 20px;
      text-transform: uppercase;
      font-size: 12px;
      letter-spacing: 1px;
    }
    @media print {
      body {
        background: transparent;
        padding: 0;
      }
      .wrapper {
        border: none;
        box-shadow: none;
        padding: 0;
      }
      .print-btn {
        display: none;
      }
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="watermark">WISDOM ACADEMY</div>
    
    <div class="header">
      <div class="logo">WA</div>
      <h1 class="academy-title">Wisdom Academy</h1>
      <p class="academy-subtitle">Accredited Cambridge International Fellowship & National High school</p>
      <div class="badge-label">Pre-Enrollment Certificate</div>
    </div>
    
    <div class="letter-body">
      <p>Dear <span class="bold-title">${activeSuccessfulCandidate.parentName}</span>,</p>
      <p>Congratulations! We are delighted to confirm receipt of your official pre-admissions registry package for <span class="bold-title">${activeSuccessfulCandidate.fullName}</span> to enroll in <span class="bold-title">${activeSuccessfulCandidate.gradeLevel}</span> at Wisdom Academy. </p>
      
      <p>This document certifies that your candidate is successfully registered inside our active pre-admissions catalog ledger. Your secure unique application hashes and verified details are detailed below:</p>
      
      <table class="details-table">
        <tr>
          <th>Application Link Code</th>
          <td style="font-family: monospace; font-size: 14px; color: #b45309;">${activeSuccessfulCandidate.id}</td>
        </tr>
        <tr>
          <th>Candidate Scholar Name</th>
          <td>${activeSuccessfulCandidate.fullName}</td>
        </tr>
        <tr>
          <th>Program & Grade Level</th>
          <td>${activeSuccessfulCandidate.gradeLevel}</td>
        </tr>
        <tr>
          <th>Guardian Contact Phone</th>
          <td>${activeSuccessfulCandidate.parentPhone}</td>
        </tr>
        <tr>
          <th>Email Address</th>
          <td style="font-family: monospace;">${activeSuccessfulCandidate.email}</td>
        </tr>
        <tr>
          <th>Former Academic Institution</th>
          <td>${activeSuccessfulCandidate.previousSchool || 'Private Study/Home School'}</td>
        </tr>
        <tr>
          <th>Filing Date & Timestamp</th>
          <td style="font-family: monospace;">${new Date().toLocaleString()}</td>
        </tr>
        <tr>
          <th>System Registration Status</th>
          <td style="color: #047857; font-weight: bold;">[PENDING BOARD FINAL REVIEW]</td>
        </tr>
      </table>
      
      <div class="instructions">
        <strong>Important Next Campus Steps:</strong><br>
        1. Please print a copy of this pre-enrollment document certificates receipt and hold it securely.<br>
        2. Deliver active physical copies of your candidate's preceding 2-years official transcript grades to the Admissions Office at Bole Main Campus.<br>
        3. Expect further notifications via parent SMS alert coordinates (${activeSuccessfulCandidate.parentPhone}) scheduling standard logical and STEM aptitude testing cycles.
      </div>
    </div>
    
    <div class="footer">
      <div class="authority">
        <p style="margin: 0 0 2px 0;">Issued by:</p>
        <div class="authority-sign">Dr. Abraham G.Y.</div>
        <p style="font-weight: bold; font-size: 11px; margin: 0; text-transform: uppercase; color: #1e293b;">Director of Admissions & Registrars</p>
        <p style="font-size: 10px; color: #64748b; margin: 2px 0 0 0;">Wisdom Academy Board of Governance, Addis Ababa, Ethiopia</p>
      </div>
      
      <!-- Mini QR Code simulation badge -->
      <div style="text-align: center;">
        <div style="border: 1px solid #cbd5e1; padding: 4px; border-radius: 4px; background: white; width: 70px; height: 70px; margin: 0 auto 5px;">
          <svg viewBox="0 0 100 100" style="width: 100%; height: 100%;">
            <rect width="100" height="100" fill="white" />
            <rect x="5" y="5" width="25" height="25" fill="#0f172a" />
            <rect x="10" y="10" width="15" height="15" fill="white" />
            <rect x="13" y="13" width="9" height="9" fill="#0f172a" />
            <rect x="70" y="5" width="25" height="25" fill="#0f172a" />
            <rect x="75" y="10" width="15" height="15" fill="white" />
            <rect x="78" y="13" width="9" height="9" fill="#0f172a" />
            <rect x="5" y="70" width="25" height="25" fill="#0f172a" />
            <rect x="10" y="75" width="15" height="15" fill="white" />
            <rect x="13" y="78" width="9" height="9" fill="#0f172a" />
            <rect x="35" y="5" width="5" height="10" fill="#0f172a" />
            <rect x="45" y="15" width="10" height="5" fill="#0f172a" />
            <rect x="40" y="25" width="5" height="10" fill="#0f172a" />
            <rect x="55" y="5" width="10" height="10" fill="#0f172a" />
            <rect x="35" y="45" width="15" height="5" fill="#0f172a" />
            <rect x="50" y="40" width="5" height="15" fill="#0f172a" />
            <rect x="70" y="40" width="15" height="5" fill="#0f172a" />
            <rect x="80" y="50" width="10" height="5" fill="#0f172a" />
            <rect x="35" y="70" width="10" height="10" fill="#0f172a" />
            <rect x="55" y="80" width="5" height="15" fill="#0f172a" />
            <rect x="70" y="75" width="15" height="15" fill="#0f172a" />
            <rect x="85" y="85" width="10" height="10" fill="#0f172a" />
          </svg>
        </div>
        <span style="font-family: monospace; font-size: 8px; color: #64748b; text-transform: uppercase;">VERIFIED MATCH HASH</span>
      </div>
    </div>
    
  </div>
</body>
</html>`;

    // Process beautiful file download trigger
    const blob = new Blob([docHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Wisdom_Academy_Pre_Enrollment_Letter_${activeSuccessfulCandidate.id}.html`;
    document.body.appendChild(link);
    link.click();
    
    // Cleanup reference
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const activeSuccessfulCandidate = applications[applications.length - 1];

  const handleResetForm = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setDateOfBirth('');
    setPreviousSchool('');
    setParentName('');
    setParentPhone('');
    setWantsScholarship(false);
    setSubmissionSuccessId(null);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16 pb-16" id="admissions-root">
      
      {/* 1. Header Hero Panel */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          {t('admitTitle')}
        </h1>
        <p className="text-sm text-slate-500 leading-relaxed font-sans">
          {t('admitSub')}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-start">
        
        {/* Left Side (Col-span 7): Application Engine OR Success Badge */}
        <div className="lg:col-span-7 space-y-6">
          
          {submissionSuccessId && activeSuccessfulCandidate ? (
            /* DYNAMIC DIGITAL IDENTIFICATION BADGE LAYOUT ON SUCCESSFUL ENTRY */
            <div className="rounded-2xl border border-amber-200 bg-white p-6 shadow-xl space-y-6 animate-fadeIn" id="applicant-badge-print-area">
              
              {/* Success Notice Header */}
              <div className="flex items-center space-x-3 text-emerald-600 bg-emerald-50 border border-emerald-100 p-4 rounded-xl">
                <CheckCircle className="h-6 w-6 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-emerald-900">Application Registered and Synced</h3>
                  <p className="text-[11px] text-emerald-700 leading-relaxed">
                    Parent notified via SMS simulation. Confirming email with security verification packet has been dispatched.
                  </p>
                </div>
              </div>

              {/* CARD CONTAINER (Gold Premium Badge Design) */}
              <div className="relative rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6 text-white shadow-2xl overflow-hidden max-w-md mx-auto border-2 border-amber-400">
                
                {/* Decorative golden geometric shapes */}
                <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-amber-500/10 blur-3xl"></div>
                <div className="absolute left-0 bottom-0 h-24 w-24 rounded-full bg-indigo-500/10 blur-2xl"></div>

                {/* Badge Header info */}
                <div className="flex justify-between items-start border-b border-white/10 pb-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded bg-amber-500 text-white">
                      <span className="font-display font-extrabold text-sm">WA</span>
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-xs tracking-wider uppercase text-amber-400 leading-tight">Wisdom Academy</h4>
                      <p className="text-[8px] uppercase tracking-widest text-slate-400">Pre-Enrollment Badge</p>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono rounded bg-emerald-500/20 px-2 py-0.5 text-emerald-400 font-bold border border-emerald-500/30">
                    PENDING REVIEW
                  </span>
                </div>

                {/* Badge Main Contents */}
                <div className="mt-5 grid grid-cols-12 gap-4 items-center">
                  
                  {/* Photo spacer (Veritas Coat of Arms vector placeholder) */}
                  <div className="col-span-4 flex flex-col items-center justify-center">
                    <div className="flex h-20 w-20 items-center justify-center bg-slate-800 rounded-lg border border-slate-700 p-2 text-slate-500">
                      <Building className="h-10 w-10 text-amber-500/60" />
                    </div>
                    <span className="text-[8px] tracking-wide text-slate-500 text-center font-mono block pt-1.5 uppercase">ID: {activeSuccessfulCandidate.id}</span>
                  </div>

                  {/* Core fields */}
                  <div className="col-span-8 space-y-2 text-xs">
                    <div>
                      <span className="text-[8px] uppercase text-slate-400 block tracking-wider">Candidate FullName</span>
                      <span className="font-bold text-white text-sm block leading-snug">{activeSuccessfulCandidate.fullName}</span>
                    </div>
                    <div>
                      <span className="text-[8px] uppercase text-slate-400 block tracking-wider">Submitting Grade</span>
                      <span className="font-semibold text-amber-400 block">{activeSuccessfulCandidate.gradeLevel}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pb-1.5">
                      <div>
                        <span className="text-[8px] uppercase text-slate-400 block">Parent Phone</span>
                        <span className="font-mono text-[10px] block">{activeSuccessfulCandidate.parentPhone}</span>
                      </div>
                      <div>
                        <span className="text-[8px] uppercase text-slate-400 block">Registry Code</span>
                        <span className="font-mono text-[10px] text-zinc-400 block">#2026-ENR</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Badge Footer and dynamic responsive SVG QR Code simulator */}
                <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-[9px] text-slate-400">
                  <div className="space-y-0.5 leading-snug">
                    <p className="font-bold text-slate-300">SECURITY HASH: MD5_WA_VERIFY</p>
                    <p className="text-[8px]">Scan with biometric scanner to check database matching.</p>
                  </div>

                  {/* Clean Native SVG QR Code Simulator representation */}
                  <div className="h-12 w-12 bg-white rounded p-0.5 border border-slate-200">
                    <svg viewBox="0 0 100 100" className="h-full w-full">
                      {/* Generates a valid pixelated modular QR-like design natively! */}
                      <rect width="100" height="100" fill="white" />
                      {/* Top Left corner marker */}
                      <rect x="5" y="5" width="25" height="25" fill="#0f172a" />
                      <rect x="10" y="10" width="15" height="15" fill="white" />
                      <rect x="13" y="13" width="9" height="9" fill="#0f172a" />
                      {/* Top Right corner marker */}
                      <rect x="70" y="5" width="25" height="25" fill="#0f172a" />
                      <rect x="75" y="10" width="15" height="15" fill="white" />
                      <rect x="78" y="13" width="9" height="9" fill="#0f172a" />
                      {/* Bottom Left corner marker */}
                      <rect x="5" y="70" width="25" height="25" fill="#0f172a" />
                      <rect x="10" y="75" width="15" height="15" fill="white" />
                      <rect x="13" y="78" width="9" height="9" fill="#0f172a" />
                      {/* Random procedural QR pixel grids simulating payload data */}
                      <rect x="35" y="5" width="5" height="10" fill="#0f172a" />
                      <rect x="45" y="15" width="10" height="5" fill="#0f172a" />
                      <rect x="40" y="25" width="5" height="10" fill="#0f172a" />
                      <rect x="55" y="5" width="10" height="10" fill="#0f172a" />
                      <rect x="35" y="45" width="15" height="5" fill="#0f172a" />
                      <rect x="50" y="40" width="5" height="15" fill="#0f172a" />
                      <rect x="70" y="40" width="15" height="5" fill="#0f172a" />
                      <rect x="80" y="50" width="10" height="5" fill="#0f172a" />
                      <rect x="35" y="70" width="10" height="10" fill="#0f172a" />
                      <rect x="55" y="80" width="5" height="15" fill="#0f172a" />
                      <rect x="70" y="75" width="15" height="15" fill="#0f172a" />
                      <rect x="85" y="85" width="10" height="10" fill="#0f172a" />
                    </svg>
                  </div>

                </div>

              </div>

              {/* Action buttons with success feedback states */}
              <div className="flex items-center justify-center space-x-3 pt-3">
                <button
                  onClick={downloadCredentialDocument}
                  className="inline-flex items-center space-x-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                  style={{ cursor: 'pointer' }}
                >
                  <Download className="h-4 w-4" />
                  <span>Download PDF Receipt</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center space-x-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  <Printer className="h-4 w-4" />
                  <span>Print Credentials Badge</span>
                </button>
                <button
                  onClick={handleResetForm}
                  className="rounded-lg bg-amber-500 hover:bg-amber-600 px-4 py-2 text-xs font-semibold text-white transition shadow"
                >
                  Apply Another Scholar
                </button>
              </div>

            </div>
          ) : (
            /* ACTIVE ONLINE ADMISSIONS FORM */
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm space-y-6">
              
              <div className="border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2 text-amber-800">
                  <ClipboardList className="h-5 w-5" />
                  <h2 className="font-display text-lg font-bold">Online Admission Application</h2>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Provide exact legal transcript mappings. Dispatched credentials will compile immediately in the Registrar review folder.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
                
                {/* 1. Grade Category Select */}
                <div>
                  <label className="text-slate-500 font-semibold uppercase block mb-1">Grade enrollment programs *</label>
                  <select
                    value={gradeLevel}
                    onChange={(e) => setGradeLevel(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50/50 p-2.5 outline-none focus:border-amber-500 focus:bg-white"
                  >
                    <option>Grade 9 (Cambridge IGCSE)</option>
                    <option>Grade 10 (Cambridge IGCSE Standard)</option>
                    <option>Grade 11 (Cambridge Advanced Levels)</option>
                    <option>Grade 12 (Cambridge Elite A-Levels)</option>
                    <option>Grade 1-8 (Middle Academy Programs)</option>
                  </select>
                </div>

                {/* 2. Applicant Info Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-500 font-semibold uppercase block mb-1">Applicant Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Elias Aberra Kebede"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 bg-slate-50/50 p-2.5 outline-none focus:border-amber-500 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-500 font-semibold uppercase block mb-1">Date of Birth *</label>
                    <input
                      type="date"
                      required
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 bg-slate-50/50 p-2.5 outline-none focus:border-amber-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-500 font-semibold uppercase block mb-1">Candidate Gender *</label>
                    <div className="flex space-x-4 items-center pt-2">
                      <label className="flex items-center space-x-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="gender"
                          checked={gender === 'male'}
                          onChange={() => setGender('male')}
                          className="text-amber-500 focus:ring-amber-500"
                        />
                        <span>Male</span>
                      </label>
                      <label className="flex items-center space-x-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="gender"
                          checked={gender === 'female'}
                          onChange={() => setGender('female')}
                          className="text-amber-500 focus:ring-amber-500"
                        />
                        <span>Female</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="text-slate-500 font-semibold uppercase block mb-1">Preceding Academic Facility *</label>
                    <input
                      type="text"
                      placeholder="e.g. Hillcrest School"
                      value={previousSchool}
                      onChange={(e) => setPreviousSchool(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 bg-slate-50/50 p-2.5 outline-none focus:border-amber-500 focus:bg-white"
                    />
                  </div>
                </div>

                {/* 3. Guardian and Contact Info Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-500 font-semibold uppercase block mb-1">Guardian / Parent Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aberra Kebede"
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 bg-slate-50/50 p-2.5 outline-none focus:border-amber-500 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-500 font-semibold uppercase block mb-1">Guardian Active Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="parent@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 bg-slate-50/50 p-2.5 outline-none focus:border-amber-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-500 font-semibold uppercase block mb-1">Guardian Contact Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+251 900 123456"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 bg-slate-50/50 p-2.5 outline-none focus:border-amber-500 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-500 font-semibold uppercase block mb-1">SMS Simulation Target Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+251 900 123456"
                      value={parentPhone}
                      onChange={(e) => setParentPhone(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 bg-slate-50/50 p-2.5 outline-none focus:border-amber-500 focus:bg-white"
                    />
                  </div>
                </div>

                {/* 4. Scholarship Checkbox */}
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-150 flex items-start space-x-2.5 mt-2">
                  <input
                    type="checkbox"
                    id="scholarshipCheckbox"
                    checked={wantsScholarship}
                    onChange={(e) => setWantsScholarship(e.target.checked)}
                    className="rounded text-amber-500 focus:ring-amber-500 mt-0.5"
                  />
                  <div className="space-y-0.5">
                    <label htmlFor="scholarshipCheckbox" className="font-semibold text-slate-800 cursor-pointer block">
                      Register Interest for Merit Scholarship Endowment Award
                    </label>
                    <p className="text-[10px] text-slate-500">
                      If selected, additional aptitude grids, leadership essay checks, and regional trials records are queued for registrar verification.
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 rounded-lg bg-amber-500 hover:bg-amber-600 font-bold uppercase tracking-wider text-white py-3 shadow transition-colors"
                >
                  Submit Active Pre-Admissions Index
                </button>

              </form>

            </div>
          )}

        </div>

        {/* Right Side (Col-span 5): Fee Structures & Prerequisites FAQs */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Step process panel */}
          <div className="rounded-2xl bg-slate-900 text-white p-5 shadow-sm space-y-4">
            <h3 className="font-display font-medium text-amber-400 uppercase tracking-widest text-xs">{t('instructions')}</h3>
            <ul className="space-y-3.5 text-xs text-slate-300">
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-emerald-400 mr-2 flex-shrink-0 mt-0.5" />
                <span><strong>Step 1:</strong> Complete online form details with valid guardian contact mappings.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-emerald-400 mr-2 flex-shrink-0 mt-0.5" />
                <span><strong>Step 2:</strong> Download the pre-enrollment badge. Code represents active matching verification indices.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-emerald-400 mr-2 flex-shrink-0 mt-0.5" />
                <span><strong>Step 3:</strong> Schedule computer-based logic and mathematics competency exams.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-emerald-400 mr-2 flex-shrink-0 mt-0.5" />
                <span><strong>Step 4:</strong> Digital ID authentication of official status by the registrar board.</span>
              </li>
            </ul>
          </div>

          {/* Fee Matrix Tables */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm space-y-4">
            <div className="border-b border-slate-100 pb-2">
              <div className="flex items-center space-x-1.5 text-slate-800">
                <CreditCard className="h-4.5 w-4.5 text-amber-500" />
                <h3 className="font-display font-bold text-sm tracking-wide uppercase">{t('feeStructure')}</h3>
              </div>
              <p className="text-[10px] text-slate-400">Wisdom Academy governs an inclusive price schedule. Charges are fixed before session.</p>
            </div>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between border-b border-slate-50 pb-1.5">
                <span className="text-slate-500">{t('tuitionFee')}</span>
                <span className="font-bold text-slate-800 font-mono">145,000 ETB</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-50 pb-1.5">
                <span className="text-slate-500">{t('regFee')}</span>
                <span className="font-bold text-slate-800 font-mono">15,000 ETB</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-50 pb-1.5">
                <span className="text-slate-500">{t('labFee')}</span>
                <span className="font-bold text-slate-800 font-mono">10,000 ETB</span>
              </div>
              <div className="flex items-center justify-between pb-1">
                <span className="text-slate-500">{t('activityFee')}</span>
                <span className="font-bold text-slate-800 font-mono">8,000 ETB</span>
              </div>
            </div>
          </div>

          {/* Scholarship block */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm space-y-3">
            <div className="flex items-center space-x-2 text-indigo-700">
              <Sparkles className="h-4.5 w-4.5 text-amber-500" />
              <h3 className="font-display font-bold text-xs uppercase tracking-widest text-slate-900">{t('scholarshipInfo')}</h3>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              {t('scholarshipSub')}
            </p>
          </div>

          {/* Admissions FAQ Lists */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-slate-400">Common Prerequisites FAQ</h4>
            <div className="space-y-2">
              {FAQS_ADMISSION.map((faq, idx) => (
                <div key={idx} className="rounded-lg border border-slate-100 bg-white shadow-xs overflow-hidden text-xs">
                  <button
                    onClick={() => setOpenFaqIdx(openFaqIdx === idx ? null : idx)}
                    className="w-full p-3 text-left font-semibold text-slate-700 flex items-center justify-between group hover:text-amber-700"
                  >
                    <span>{faq.q[currentLang] || faq.q.en}</span>
                    <ChevronDown className={`h-4.5 w-4.5 text-slate-400 transition-transform ${openFaqIdx === idx ? 'rotate-180 text-amber-500' : ''}`} />
                  </button>
                  {openFaqIdx === idx && (
                    <div className="p-3 bg-slate-50/50 text-slate-500 leading-relaxed border-t border-slate-100 text-[11px]">
                      {faq.a[currentLang] || faq.a.en}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
