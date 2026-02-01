import React, { useState } from 'react';
import { 
  FileText, Download, Printer, Share2, Sparkles, Loader2, 
  Calendar, ChevronDown, FileBarChart, History, AlertTriangle
} from 'lucide-react';
import { mockReports, mockChartData } from '../mockData';
import { ResponsiveContainer, LineChart, Line, XAxis } from 'recharts';

const Reports: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportType, setReportType] = useState('Weekly');
  const [reports, setReports] = useState(mockReports);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate generation
    setTimeout(() => {
      setIsGenerating(false);
      const newReport = {
        id: `R-NEW-${Date.now()}`,
        title: `סיכום סטטוס ${reportType === 'Weekly' ? 'שבועי' : 'חודשי'} - חדש`,
        dateCreated: new Date().toISOString().split('T')[0],
        type: reportType as any,
        status: 'Ready',
        size: '1.8 MB'
      };
      setReports([newReport, ...reports]);
    }, 2000);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      
       {/* Header */}
       <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-slate-200 pb-6">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2 font-sans">דוחות וסטטוס ("מפעל המצגות")</h2>
            <p className="text-slate-500">הפקת תובנות להערכת מצב בלחיצת כפתור, כולל הסברים (Reasoning) לחריגות.</p>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium bg-slate-100 px-3 py-1.5 rounded-full">
              {reports.length} דוחות בארכיון
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Generator (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
                
                {/* Generator Card */}
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-6 text-white shadow-lg shadow-blue-200">
                    <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="w-5 h-5 text-yellow-300" />
                        <h3 className="text-lg font-bold">הכן סיכום שבועי</h3>
                    </div>
                    <p className="text-blue-100 text-sm mb-6 leading-relaxed">
                        המערכת תסרוק את כל נתוני השבוע, תזהה את סיבות השורש (Root Cause) לירידה בזמינות ותנסח את השקף למפקד.
                    </p>

                    <div className="space-y-4">
                        <button 
                            onClick={handleGenerate}
                            disabled={isGenerating}
                            className="w-full bg-white text-blue-700 font-bold py-3 rounded-lg shadow hover:bg-blue-50 transition-all flex items-center justify-center gap-2 mt-4"
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    מנתח סיבות שורש...
                                </>
                            ) : (
                                <>
                                    <FileText className="w-4 h-4" />
                                    צור דוח להערכת מצב
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Archive List */}
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                    <div className="p-4 border-b border-slate-100 flex items-center gap-2 bg-slate-50">
                        <History className="w-4 h-4 text-slate-500" />
                        <h3 className="font-bold text-slate-700 text-sm">היסטוריה</h3>
                    </div>
                    <div className="divide-y divide-slate-100 max-h-[400px] overflow-y-auto">
                        {reports.map((report) => (
                            <div key={report.id} className="p-4 hover:bg-slate-50 transition-colors group">
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className="text-sm font-bold text-slate-800 line-clamp-1">{report.title}</h4>
                                    <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded border border-slate-200">
                                        {report.type === 'Weekly' ? 'שבועי' : 'חודשי'}
                                    </span>
                                </div>
                                <div className="flex justify-between items-end">
                                    <div className="text-xs text-slate-400">
                                        <p>{new Date(report.dateCreated).toLocaleDateString('he-IL')}</p>
                                    </div>
                                    <button className="text-blue-600 hover:text-blue-800 p-1.5 rounded-md hover:bg-blue-50 transition-colors opacity-0 group-hover:opacity-100">
                                        <Download className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Column: Preview (8 cols) - Matching User Story 3 */}
            <div className="lg:col-span-8">
                <div className="bg-slate-200/50 p-6 rounded-xl border border-slate-200 h-full flex flex-col items-center justify-start overflow-y-auto min-h-[600px]">
                    
                    {/* Document Controls */}
                    <div className="w-full max-w-[21cm] flex justify-between items-center mb-4">
                        <span className="text-sm font-bold text-slate-500">תצוגה מקדימה (שקף למצגת)</span>
                        <div className="flex gap-2">
                             <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 shadow-sm transition-colors font-medium text-sm">
                                <Download className="w-4 h-4" />
                                הורד להצגה
                             </button>
                        </div>
                    </div>

                    {/* A4 Paper Simulation - The Specific Scenario */}
                    <div className="w-full max-w-[21cm] min-h-[29.7cm] bg-white shadow-2xl p-12 text-slate-900 relative">
                        
                        {/* Header */}
                        <div className="flex justify-between items-start border-b-2 border-slate-900 pb-6 mb-8">
                            <div>
                                <h1 className="text-3xl font-bold mb-2">סטטוס כשירות שבועי</h1>
                                <p className="text-slate-500 text-lg">הערכת מצב מפקד אוגדה</p>
                            </div>
                            <div className="text-left">
                                <p className="font-mono text-sm text-slate-500">תאריך: {new Date().toLocaleDateString('he-IL')}</p>
                                <div className="mt-2 text-xs font-bold bg-slate-900 text-white px-2 py-1 inline-block">בלמ״ס</div>
                            </div>
                        </div>

                        {/* Story 3 Implementation: The Reasoned Insight */}
                        <div className="mb-10">
                            <h2 className="text-xl font-bold border-r-4 border-rose-600 pr-3 mb-4 text-slate-800">
                                ניתוח חריגים (AI Generated Reasoning)
                            </h2>
                            <div className="text-base text-slate-800 leading-relaxed space-y-4 bg-rose-50 p-6 border border-rose-100 rounded-lg">
                                <div className="flex items-start gap-3">
                                    <AlertTriangle className="w-6 h-6 text-rose-600 shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-bold text-lg text-rose-800 mb-1">
                                            ירידה של 10% בזמינות נמ"ר (Namer APC)
                                        </h3>
                                        <p className="mb-2">
                                            בניגוד לשבוע שעבר, זוהתה ירידה חדה בכשירות צי הנגמ"שים.
                                        </p>
                                        <div className="bg-white p-3 rounded border border-rose-200 shadow-sm">
                                            <p className="font-bold text-slate-700 mb-1">ניתוח סיבת שורש (Root Cause):</p>
                                            <p className="text-slate-600">
                                                ב-80% מהכלים המושבתים (12 מתוך 15), סיבת ההמתנה היא 
                                                <span className="font-bold bg-yellow-100 px-1 mx-1">מחסור במדחסים למזגן</span>.
                                                <br/>
                                                בדיקת מלאי ארצי מראה חוסר בשרשרת האספקה, ולא בעיה בסדנא המקומית.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Visual Proof */}
                        <div className="mb-8">
                            <h2 className="text-lg font-bold border-r-4 border-blue-600 pr-3 mb-4 text-slate-800">מגמות זמינות לפי פלטפורמה</h2>
                             <div className="h-64 w-full border border-slate-100 rounded bg-white p-4" dir="ltr">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={mockChartData}>
                                        <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                        <Line type="monotone" dataKey="readiness" stroke="#0f172a" strokeWidth={3} dot={{r: 4}} name="כללי" />
                                        {/* Simulating the Namer drop specifically */}
                                        <Line type="monotone" dataKey="readiness" stroke="#e11d48" strokeWidth={3} strokeDasharray="5 5" dot={false} name="נמ״ר (ירידה)" />
                                    </LineChart>
                                </ResponsiveContainer>
                             </div>
                             <p className="text-xs text-center text-slate-400 mt-2">קו מקווקו אדום: נגמ"ש נמ"ר | קו רציף: ממוצע יחידתי</p>
                        </div>

                        {/* Recommendations */}
                        <div className="mb-8">
                             <h2 className="text-lg font-bold border-r-4 border-emerald-600 pr-3 mb-4 text-slate-800">המלצות להמשך (Action Items)</h2>
                             <ul className="list-disc list-inside space-y-2 text-sm text-slate-700 bg-slate-50 p-4 rounded">
                                <li>
                                    <span className="font-bold">רכש דחוף:</span> הוצאת דרישת רכש חירום (V.O.R) למדחסים ישירות מול הספק, עוקף מרלו"ג.
                                </li>
                                <li>
                                    <span className="font-bold">הסטת כוח אדם:</span> צמצום צוות נמ"ר והעברתו לתגבור מחלקת טנקים עד להגעת החלפים.
                                </li>
                             </ul>
                        </div>

                        {/* Footer */}
                        <div className="absolute bottom-12 left-12 right-12 border-t border-slate-200 pt-4 flex justify-between text-xs text-slate-400">
                             <span>נוצר אוטומטית ע״י ChaTene</span>
                             <span>לשימוש פנימי בלבד</span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Reports;