import { SystemNotification } from '../types';
import { Mail, MessageSquare, Bell, X, ShieldAlert, Smartphone, CheckCheck, Clock } from 'lucide-react';

interface NotificationsSimulatorProps {
  notifications: SystemNotification[];
  onClear: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationsSimulator({
  notifications,
  onClear,
  isOpen,
  onClose
}: NotificationsSimulatorProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-y-0 right-0 z-[100] w-full max-w-md border-l border-slate-200 bg-slate-50 shadow-2xl transition-all duration-300"
      id="notifications-relay-container"
    >
      <div className="flex h-full flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between bg-slate-900 p-4 text-white">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Bell className="h-5 w-5 text-amber-400" />
              {notifications.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-2 w-2 rounded-full bg-emerald-500"></span>
              )}
            </div>
            <div>
              <h2 className="text-sm font-semibold tracking-wider font-display uppercase">System Notification Relay</h2>
              <p className="text-[10px] text-slate-400">Wisdom Academy SMS & Email Dispatch Simulator</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
            aria-label="Close panel"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Informational Warning */}
        <div className="bg-amber-50 p-3 flex items-start space-x-2.5 border-b border-amber-100">
          <ShieldAlert className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-[10px] text-amber-800 leading-relaxed">
            <strong>Simulation Sandbox:</strong> Wisdom Academy runs a simulated gateway protocol. Dispatched parent updates, registration text messages, and email approval records with verification QR hashes will appear listed here instantly.
          </p>
        </div>

        {/* Main List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {notifications.length === 0 ? (
            <div className="flex h-64 flex-col items-center justify-center text-center text-slate-400">
              <Smartphone className="h-10 w-10 text-slate-300 mb-2 animate-bounce" />
              <p className="text-xs font-semibold">No notifications dispatched yet</p>
              <p className="text-[10px] text-slate-500 max-w-xs mt-1">
                Fill the admission form or approve applications to view active parent SMS grids and student confirmation emails!
              </p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div 
                key={notif.id} 
                className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm space-y-2.5 transition-all hover:shadow-md"
              >
                {/* Meta details */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div className="flex items-center space-x-2">
                    {notif.type === 'sms' ? (
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                        <MessageSquare className="h-3.5 w-3.5" />
                      </span>
                    ) : (
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                        <Mail className="h-3.5 w-3.5" />
                      </span>
                    )}
                    <div>
                      <span className="text-[10px] font-mono font-semibold text-slate-400 uppercase">
                        {notif.type === 'sms' ? 'SMS BROADCAST' : 'EMAIL CONFIRMATION'}
                      </span>
                      <p className="text-[11px] font-semibold text-slate-700">{notif.recipient}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-[9px] font-mono text-slate-400">{notif.sentAt}</span>
                    {notif.status === 'delivered' ? (
                      <CheckCheck className="h-3.5 w-3.5 text-emerald-500" />
                    ) : (
                      <Clock className="h-3.5 w-3.5 text-amber-500 animate-pulse" />
                    )}
                  </div>
                </div>

                {/* Content block */}
                <div className="space-y-1">
                  {notif.type === 'email' && (
                    <div className="text-[10px] font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded inline-block mb-1">
                      Subject: {notif.subjectOrHeader}
                    </div>
                  )}
                  
                  {notif.type === 'sms' ? (
                    /* Render standard SMS design */
                    <div className="rounded-lg bg-slate-100 p-2 text-xs text-slate-800 relative shadow-inner overflow-hidden max-w-sm">
                      <div className="text-[8px] uppercase tracking-wider text-slate-400 font-bold mb-1">Wisdom_Secure:</div>
                      <p className="leading-normal font-sans italic">"{notif.message}"</p>
                      <div className="absolute right-2 bottom-1 text-[8px] text-slate-400 font-mono">Delivered SMS v4</div>
                    </div>
                  ) : (
                    /* Render Email Design */
                    <div className="rounded-lg border border-slate-100 bg-neutral-50 p-2.5 text-xs text-slate-800">
                      <p className="whitespace-pre-line text-[11px] leading-relaxed font-sans">{notif.message}</p>
                      
                      {/* Interactive visual ID attachment mock */}
                      {notif.message.includes('ID Card') && (
                        <div className="mt-2 rounded border-2 border-dashed border-emerald-500 bg-emerald-50/50 p-1.5 text-center">
                          <span className="text-[9px] font-mono text-emerald-800 font-semibold block">Attached document: digital_student_badge.qr.pdf</span>
                          <span className="text-[8px] text-emerald-600 block">Verified security check has matched.</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer controls */}
        {notifications.length > 0 && (
          <div className="border-t border-slate-200 bg-white p-3.5">
            <button 
              onClick={onClear}
              className="w-full rounded-lg border border-red-200 bg-red-50 py-2 text-center text-xs font-semibold text-red-600 transition-colors hover:bg-red-100"
            >
              Clear Simulation Dispatch Logs ({notifications.length})
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
