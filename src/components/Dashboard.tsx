import React, { useState } from 'react';
import { Filter, ChevronDown, CheckSquare, RefreshCcw, ShieldCheck, AlertOctagon } from 'lucide-react';
import AnomalyCard from './AnomalyCard';
import { mockAnomalies, mockInterventions } from '../mockData';

const Dashboard: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      
      {/* Header & Status */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2 font-sans">מרכז פעולה</h2>
          <p className="text-slate-500 max-w-2xl">
            בוקר טוב, שרון. המערכת ביצעה הצלבת נתונים מול הרישום הפיזי. <br/>
            <span className="text-blue-600 font-bold">החזון:</span> פחות "בילוש", יותר ניהול.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
            <RefreshCcw className="w-3.5 h-3.5" />
            <span className="font-mono font-bold">סנכרון אחרון: 08:58</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Column: "The Detective" (Anomalies) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <AlertOctagon className="w-5 h-5 text-rose-500" />
                    סתירות נתונים (פעולה נדרשת)
                </h3>
                <div className="flex gap-2">
                     <button className="text-xs bg-white border border-slate-200 px-2 py-1 rounded text-slate-600">סנן לפי דחיפות</button>
                </div>
            </div>

            {/* Anomaly Feed */}
            <div className="space-y-4">
                {mockAnomalies.map((anomaly) => (
                    <AnomalyCard key={anomaly.id} data={anomaly} />
                ))}
            </div>
            
            {mockAnomalies.length === 0 && (
                <div className="py-20 text-center bg-white rounded-xl border border-dashed border-slate-200">
                    <CheckSquare className="w-12 h-12 text-emerald-500/50 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-slate-900">הכל נקי!</h3>
                    <p className="text-slate-500">תמונת המצב הממוחשבת תואמת את המציאות בשטח.</p>
                </div>
            )}
          </div>

          {/* Right Column: "The Chase" (Guardrails Log) */}
          <div className="space-y-6">
             <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                בקרת איכות (נחסמו)
             </h3>
             
             <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="p-3 bg-slate-50 border-b border-slate-100 text-xs text-slate-500">
                    אירועים שנמנעו ב-24 שעות האחרונות
                </div>
                <div className="divide-y divide-slate-100">
                    {mockInterventions.map((item) => (
                        <div key={item.id} className="p-4 hover:bg-slate-50 transition-colors">
                            <div className="flex justify-between items-start mb-1">
                                <span className="text-xs font-bold text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded">{item.vehicleId}</span>
                                <span className="text-[10px] text-slate-400 font-mono">{item.timestamp}</span>
                            </div>
                            <p className="text-sm text-slate-800 font-medium mb-1">
                                ניסיון: {item.actionAttempted}
                            </p>
                            <p className="text-xs text-rose-600 flex items-center gap-1">
                                <ShieldCheck className="w-3 h-3" />
                                {item.systemResponse}
                            </p>
                            <div className="mt-2 flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-slate-100 text-[10px] flex items-center justify-center font-bold text-slate-500">
                                    {item.technicianName.charAt(0)}
                                </div>
                                <span className="text-xs text-slate-500">{item.technicianName}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
                    <button className="text-xs text-blue-600 font-medium hover:underline">
                        צפה בכל היסטוריית החסימות
                    </button>
                </div>
             </div>

             {/* Quick Stats Context */}
             <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-xl p-6 text-white shadow-lg">
                <h4 className="text-sm font-bold text-indigo-200 mb-4">מדדי אמינות שבועיים</h4>
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-indigo-100">נסיונות "דלת מסתובבת"</span>
                        <span className="font-mono font-bold text-xl text-white">12</span>
                    </div>
                    <div className="w-full bg-indigo-900/50 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-rose-500 h-full w-[25%]"></div>
                    </div>
                    <p className="text-xs text-indigo-300 mt-2">
                        ירידה של 15% משבוע שעבר בזכות מערכת החסימה.
                    </p>
                </div>
             </div>
          </div>
      </div>
    </div>
  );
};

export default Dashboard;