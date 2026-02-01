import React from 'react';
import { LayoutDashboard, FileSearch, CalendarClock, FileText, Settings, ShieldAlert } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  setView: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const menuItems = [
    { id: 'dashboard', label: 'מרכז פעולה', icon: LayoutDashboard },
    { id: 'investigation', label: 'חקירה ועומק', icon: FileSearch },
    { id: 'routine', label: 'ניהול שגרה', icon: CalendarClock },
    { id: 'reports', label: 'דוחות', icon: FileText },
  ];

  return (
    <aside className="w-64 bg-white border-l border-slate-200 flex flex-col h-screen sticky top-0 shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-slate-100 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
            <ShieldAlert className="text-white w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 font-sans">ChaTene</h1>
          <p className="text-xs text-slate-500 uppercase tracking-widest font-mono">LOGISTICS OS</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 group ${
                isActive 
                  ? 'bg-blue-50 text-blue-700 border border-blue-100' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
              <span className="font-medium">{item.label}</span>
              {isActive && (
                <div className="mr-auto w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
              )}
            </button>
          );
        })}
      </nav>

      {/* User Footer */}
      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center gap-3 px-2 py-2 rounded-md bg-slate-50 border border-slate-200">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-xs font-bold text-slate-700">
            שרון
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-700 truncate">רס״ן שרון</p>
            <p className="text-xs text-slate-500 truncate">מנהלת סדנה</p>
          </div>
          <Settings className="w-4 h-4 text-slate-400 hover:text-slate-600 cursor-pointer" />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;