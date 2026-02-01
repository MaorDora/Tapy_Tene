import React, { useState } from 'react';
import {
    ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    PieChart, Pie, Cell
} from 'recharts';
import { mockChartData, mockAnomalyCauses, mockNormCompliance } from '../mockData';
import { ArrowUpRight, CalendarDays, PieChart as PieChartIcon, Table as TableIcon, Filter } from 'lucide-react';

const Investigation: React.FC = () => {
    const [timeRange, setTimeRange] = useState('week');

    const totalAnomalies = mockAnomalyCauses.reduce((acc, curr) => acc + curr.value, 0);

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">

            {/* Header with Controls */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-slate-200 pb-6">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-2 font-sans">חקירה ועומק</h2>
                    <p className="text-slate-500">ניתוח שורש (Root Cause) ובקרת עמידה ביעדי שירות (SLA).</p>
                </div>

                <div className="flex gap-2">
                    <div className="flex bg-white border border-slate-200 rounded-lg p-1 shadow-sm">
                        <button
                            onClick={() => setTimeRange('week')}
                            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${timeRange === 'week' ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                        >
                            שבועי
                        </button>
                        <button
                            onClick={() => setTimeRange('month')}
                            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${timeRange === 'month' ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                        >
                            חודשי
                        </button>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 text-sm font-medium shadow-sm transition-colors">
                        <CalendarDays className="w-4 h-4" />
                        טווח תאריכים
                    </button>
                </div>
            </div>

            {/* Section 1: Anomaly Trends & Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Trend Chart */}
                <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-slate-800">מגמת כשירות מול חריגות</h3>
                        <span className="text-xs font-mono text-slate-400">נתונים בזמן אמת</span>
                    </div>
                    <div className="h-72 w-full" dir="ltr">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={mockChartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                                <XAxis dataKey="day" stroke="#64748b" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} dy={10} />
                                <YAxis stroke="#64748b" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} dx={-10} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', color: '#0f172a', borderRadius: '8px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                    itemStyle={{ color: '#334155', fontWeight: 500 }}
                                />
                                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                                <Line type="monotone" dataKey="readiness" name="כשירות (%)" stroke="#10b981" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6 }} />
                                <Line type="monotone" dataKey="anomalies" name="חריגות פתוחות" stroke="#f43f5e" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* AI Narrative Panel */}
                <div className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-blue-100/50 rounded-bl-full -mr-4 -mt-4" />
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2 relative z-10">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                        תובנות ChaTene
                    </h3>
                    <div className="flex-1 overflow-y-auto space-y-4 relative z-10">
                        <div className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-2 mb-2">
                                <ArrowUpRight className="w-4 h-4 text-rose-500" />
                                <span className="text-xs font-bold text-rose-500 uppercase">מוקד הבעיה</span>
                            </div>
                            <p className="text-sm text-slate-700 leading-relaxed">
                                הנתונים מצביעים כי <strong>45% מהחריגות</strong> נובעות מהמתנה לחלפים קריטיים (ח"ח), בעיקר בפלטפורמת הנמ"ר. זהו הגורם המשפיע ביותר על אי-עמידה בנורמה החודש.
                            </p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-2 mb-2">
                                <Filter className="w-4 h-4 text-amber-500" />
                                <span className="text-xs font-bold text-amber-500 uppercase">צוואר בקבוק</span>
                            </div>
                            <p className="text-sm text-slate-700 leading-relaxed">
                                זמן המתנה ממוצע לאישור דרג גבוה עלה ב-15% השבוע. מומלץ לבדוק את תהליך האישור מול החטיבה הטכנולוגית.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 2: Specific Charts requested by user */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Chart A: Anomaly Causes Pie Chart */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col min-h-[400px]">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                            <PieChartIcon className="w-5 h-5 text-blue-600" />
                            הסבה לחריגה - אחזקה כוללת
                        </h3>
                    </div>
                    <p className="text-sm text-slate-500 mb-6">פילוח סיבות עיקריות להיווצרות חריגות בטיפול</p>

                    <div className="flex-1 flex flex-row items-center justify-between gap-4">
                        <div className="relative h-64 flex-1">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={mockAnomalyCauses}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={80}
                                        outerRadius={100}
                                        paddingAngle={3}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {mockAnomalyCauses.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', direction: 'rtl', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        formatter={(value: number) => [`${value} אירועים`, '']}
                                    />
                                </PieChart>
                            </ResponsiveContainer>

                            {/* Center Text Overlay */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-4xl font-bold text-slate-900 font-mono tracking-tight leading-none mb-1">{totalAnomalies}</span>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">סה״כ אירועים</span>
                            </div>
                        </div>

                        {/* Custom Legend */}
                        <div className="flex flex-col gap-3 min-w-[140px] pr-4">
                            {mockAnomalyCauses.map((item, index) => (
                                <div key={index} className="flex items-center justify-end gap-2 text-right">
                                    <span className="text-sm text-slate-600 font-medium font-sans">{item.name}</span>
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Table B: Norm Compliance Table */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col min-h-[400px]">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                <TableIcon className="w-5 h-5 text-blue-600" />
                                עמידה בנורמות (SLA)
                            </h3>
                            <p className="text-sm text-slate-500">פירוט ביצועים לפי תחום מקצועי</p>
                        </div>
                        <button className="text-xs text-blue-600 bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded transition-colors font-medium">
                            ייצא לאקסל
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-right">
                            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                                <tr>
                                    <th className="py-3 px-4 font-medium">תחום</th>
                                    <th className="py-3 px-4 font-medium text-center">מס' הזמנות</th>
                                    <th className="py-3 px-4 font-medium text-center">עומדים בנורמה</th>
                                    <th className="py-3 px-4 font-medium text-left">אחוז עמידה</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {mockNormCompliance.map((row, idx) => (
                                    <tr key={idx} className="group hover:bg-slate-50 transition-colors">
                                        <td className="py-3 px-4 font-medium text-slate-800">{row.domain}</td>
                                        <td className="py-3 px-4 text-center text-slate-600 bg-slate-50/50 rounded m-1">{row.totalOrders}</td>
                                        <td className="py-3 px-4 text-center text-slate-600">{row.meetingNorm}</td>
                                        <td className="py-3 px-4">
                                            <div className="flex items-center justify-end gap-3">
                                                <span className={`font-bold font-mono ${row.percentage >= 80 ? 'text-emerald-600' :
                                                    row.percentage >= 60 ? 'text-amber-600' : 'text-rose-600'
                                                    }`}>
                                                    {row.percentage}%
                                                </span>
                                                <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full ${row.percentage >= 80 ? 'bg-emerald-500' :
                                                            row.percentage >= 60 ? 'bg-amber-500' : 'bg-rose-500'
                                                            }`}
                                                        style={{ width: `${row.percentage}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-auto pt-4 border-t border-slate-100 text-xs text-slate-400 text-center">
                        * נתונים מתעדכנים כל 60 דקות ממערכת ה-SAP
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Investigation;