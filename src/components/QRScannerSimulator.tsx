import { useState } from 'react';
import { AdmissionApplication } from '../types';
import { QrCode, Scan, ShieldCheck, CornerDownRight, Search, Sparkles, UserCheck } from 'lucide-react';

interface QRScannerSimulatorProps {
  applications: AdmissionApplication[];
}

export default function QRScannerSimulator({ applications }: QRScannerSimulatorProps) {
  const [selectedId, setSelectedId] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<AdmissionApplication | null>(null);
  const [scanError, setScanError] = useState('');

  const handleScan = () => {
    if (!selectedId) {
      setScanError('Please select a student credential hash from the library first.');
      return;
    }

    setScanError('');
    setIsScanning(true);
    setScanResult(null);

    // Simulate laser scanning for 1.8 seconds
    setTimeout(() => {
      const match = applications.find(app => app.id === selectedId);
      setIsScanning(false);
      if (match) {
        setScanResult(match);
      } else {
        setScanError('Identifier hash could not be retrieved from secure directory registries.');
      }
    }, 1800);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'pending': return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'rejected': return 'bg-rose-50 text-rose-800 border-rose-200';
      default: return 'bg-slate-50 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4" id="qr-authenticator-module">
      
      {/* Module Title */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center space-x-2">
          <QrCode className="h-5 w-5 text-amber-500" />
          <div>
            <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-widest font-display">Biometric & QR Verification Hub</h3>
            <p className="text-[10px] text-slate-500">Scan digital credentials to check student validation status</p>
          </div>
        </div>
        <span className="inline-flex items-center rounded-full bg-slate-900 px-2 py-0.5 text-[9px] font-medium text-amber-400 font-mono">
          SECURE PROTOCOL v2
        </span>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        
        {/* Left Side: Select & Laser Area */}
        <div className="space-y-3.5">
          <div>
            <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Select student credential to verify
            </label>
            <div className="relative">
              <select
                value={selectedId}
                onChange={(e) => {
                  setSelectedId(e.target.value);
                  setScanResult(null);
                  setScanError('');
                }}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-3 pr-8 text-xs font-medium outline-none transition-all hover:bg-slate-100"
              >
                <option value="">-- Choose active credential hash --</option>
                {applications.filter(app => app.status === 'approved').map(app => (
                  <option key={app.id} value={app.id}>
                    {app.fullName} ({app.id})
                  </option>
                ))}
              </select>
              <Search className="pointer-events-none absolute right-2.5 top-2.5 h-4 w-4 text-slate-400" />
            </div>
            {applications.filter(app => app.status === 'approved').length === 0 && (
              <p className="text-[10px] text-amber-600 font-medium mt-1 leading-relaxed">
                * Note: Approved candidates appear here automatically. Navigate to public Admission tab and enroll, then log in under the portal as Registrar to approve them!
              </p>
            )}
          </div>

          {/* Virtual Scanner Screen */}
          <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-xl bg-slate-950 border border-slate-800 text-white shadow-inner">
            
            {/* Background grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:14px_24px] opacity-25"></div>

            {isScanning ? (
              <>
                {/* Laser scan line */}
                <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent shadow-[0_0_12px_#f59e0b] animate-[bounce_1.8s_infinite]"></div>
                <Scan className="h-10 w-10 text-amber-400 animate-pulse" />
                <span className="text-[10px] tracking-widest text-amber-400 font-mono mt-3 uppercase animate-pulse">
                  Querying database registry...
                </span>
              </>
            ) : scanResult ? (
              <div className="text-center space-y-1.5 p-4 z-10">
                <ShieldCheck className="h-10 w-10 text-emerald-400 mx-auto animate-bounce" />
                <p className="text-xs font-bold text-emerald-400 font-mono tracking-wider">DECRYPTED SUCCESSFULLY</p>
                <p className="text-[11px] font-semibold text-slate-200">{scanResult.fullName}</p>
                <p className="text-[9px] text-slate-400 font-mono">{scanResult.id}</p>
              </div>
            ) : (
              <div className="text-center text-slate-400 p-4 z-10 space-y-1">
                <QrCode className="h-10 w-10 text-slate-500 mx-auto" />
                <p className="text-xs font-semibold text-slate-300">Scanner Standby</p>
                <p className="text-[9px] text-slate-500 max-w-xs px-2 leading-relaxed">
                  Press scan trigger below. Our algorithm decodes standard digital identifiers and validates matching record indices.
                </p>
              </div>
            )}
          </div>

          <button
            onClick={handleScan}
            disabled={isScanning}
            className={`w-full rounded-lg py-2.5 text-center text-xs font-semibold tracking-wider uppercase transition-all shadow-sm ${
              isScanning
                ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                : 'bg-amber-500 text-white hover:bg-amber-600 hover:shadow-md'
            }`}
          >
            {isScanning ? 'Reading laser patterns...' : 'Trigger Laser QR Scan'}
          </button>

          {scanError && (
            <p className="text-[10px] font-semibold text-rose-600 bg-rose-50 p-2 rounded border border-rose-100 italic">
              * {scanError}
            </p>
          )}
        </div>

        {/* Right Side: Scan details lookup */}
        <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 space-y-3 flex flex-col justify-between">
          <div className="space-y-2.5">
            <h4 className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Registry Transcript Details</h4>
            
            {scanResult ? (
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between border-b border-white pb-1.5">
                  <span className="text-slate-500">FullName:</span>
                  <span className="font-semibold text-slate-800">{scanResult.fullName}</span>
                </div>
                <div className="flex items-center justify-between border-b border-white pb-1.5">
                  <span className="text-slate-500">Unique ID:</span>
                  <span className="font-mono text-xs font-semibold text-amber-700">{scanResult.id}</span>
                </div>
                <div className="flex items-center justify-between border-b border-white pb-1.5">
                  <span className="text-slate-500">Grade Level:</span>
                  <span className="font-semibold text-slate-800">{scanResult.gradeLevel}</span>
                </div>
                <div className="flex items-center justify-between border-b border-white pb-1.5">
                  <span className="text-slate-500">Parent Name:</span>
                  <span className="font-semibold text-slate-800">{scanResult.parentName}</span>
                </div>
                <div className="flex items-center justify-between border-b border-white pb-1.5">
                  <span className="text-slate-500">Contact Num:</span>
                  <span className="font-mono text-slate-700">{scanResult.phone}</span>
                </div>
                <div className="flex items-center justify-between pb-1">
                  <span className="text-slate-500">Admitted At:</span>
                  <span className="font-mono text-slate-700">{new Date(scanResult.appliedAt).toLocaleDateString()}</span>
                </div>

                <div className={`mt-2 rounded-lg border p-2 flex items-start space-x-2 ${getStatusColor(scanResult.status)}`}>
                  <UserCheck className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="text-[11px] font-bold">Credential Authenticated</h5>
                    <p className="text-[9px] mt-0.5 leading-relaxed opacity-90">
                      Integrity check matching verified databases. Student registration is locked, and active security authorization values exist.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-40 flex-col items-center justify-center text-center text-slate-400">
                <CornerDownRight className="h-6 w-6 text-slate-300 animate-pulse mb-1" />
                <p className="text-[11px] font-medium text-slate-400">Scanner details list will be populate post-sweep.</p>
              </div>
            )}
          </div>

          <div className="rounded-lg bg-amber-50 p-2.5 text-[9px] text-amber-900 border border-amber-100 flex items-start space-x-2">
            <Sparkles className="h-3.5 w-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="leading-normal">
              Digital ID QR codes correspond strictly to the applicant data pool. Submit applications in the Admissions tab to generate more mock badges!
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
