import React, { useState } from 'react';
import {
    CheckCircle2, Circle, Clock, User,
    TrendingUp, TrendingDown, AlertCircle
} from 'lucide-react';
import {
    ResponsiveContainer, Radar, RadarChart, PolarGrid,
    PolarAngleAxis, PolarRadiusAxis, Tooltip
} from 'recharts';
import { mockRoutineTasks, mockBenchmarks } from '../mockData';

const Routine: React.FC = () => {
    // Normalize data for Radar Chart (scale 0-100 relative to best class)
    const radarData = mockBenchmarks.map(item => ({
        subject: item.metric.split('(')[0],
        myself: item.unit === 'שעות' || item.unit === '%' && item.metric.includes('חוזרות')
            ? 100 - (item.myWorkshop / (item.avgWorkshop * 1.5) * 100) // Lower is better for time/errors
            : (item.myWorkshop / 100) * 100, // Higher is better for accuracy/utilization
        average: item.unit === 'שעות' || item.unit === '%' && item.metric.includes('חוזרות')
            ? 100 - (item.avgWorkshop / (item.avgWorkshop * 1.5) * 100)
            : (item.avgWorkshop / 100) * 100,
        fullMark: 100
    }));

    const [tasks, setTasks] = useState(mockRoutineTasks);

    const toggleTask = (id: string) => {
        setTasks(prev => prev.map(t =>
            t.id === id ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed' } : t
        ));
    };

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-slate-200 pb-6">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-2 font-sans">ניהול שגרה וביצועים</h2>
                    <p className="text-slate-500">מעקב יומי, תכנון משימות והשוואת ביצועים מול הנורמה החילית.</p>
                </div>
                <div className="flex items-center gap-2 bg-blue-50 text-blue-800 px-4 py-2 rounded-lg border border-blue-100">
                    <span className="font-bold text-lg">82/100</span>
                    <span className="text-sm">ציון סדנה חודשי</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Left Column: Daily Routine (4 cols) */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-slate-800">נוהל בוקר וסגירה</h3>
                            <span className="text-xs font-mono text-slate-400">{new Date().toLocaleDateString('he-IL')}</span>
                        </div>

                        <div className="space-y-3">
                            {tasks.map((task) => (
                                <div
                                    key={task.id}
                                    onClick={() => toggleTask(task.id)}
                                    className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${task.status === 'completed'
                                        ? 'bg-slate-50 border-slate-100 opacity-60'
                                        : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-sm'
                                        }`}
                                >
                                    <div className={`mt-0.5 ${task.status === 'completed' ? 'text-emerald-500' : 'text-slate-300'}`}>
                                        {task.status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className={`text-sm font-medium ${task.status === 'completed' ? 'text-slate-500 line-through' : 'text-slate-800'}`}>
                                            {task.title}
                                        </h4>
                                        <div className="flex items-center gap-3 mt-1.5">
                                            <span className="flex items-center gap-1 text-xs text-slate-400 font-mono">
                                                <Clock className="w-3 h-3" /> {task.time}
                                            </span>
                                            {task.assignee && (
                                                <span className="flex items-center gap-1 text-xs text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                                                    <User className="w-3 h-3" /> {task.assignee}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* AI Suggestion based on Routine */}
                    <div className="bg-gradient-to-r from-indigo-50 to-white border border-indigo-100 p-4 rounded-xl flex gap-3">
                        <AlertCircle className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                        <div>
                            <h4 className="text-sm font-bold text-indigo-900 mb-1">המלצה לשיבוץ מחר</h4>
                            <p className="text-sm text-indigo-700 leading-relaxed">
                                על בסיס עומס ההזמנות, מומלץ להקדים את מסדר הבוקר ל-07:45 ולהוסיף כוח עזר לחוליית האמרים.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Benchmarking & Norms (8 cols) */}
                <div className="lg:col-span-7 space-y-6">

                    {/* Comparison Overview Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {mockBenchmarks.map((bench, idx) => {
                            const isBetter = bench.unit === 'שעות' || bench.unit === '%' && bench.metric.includes('חוזרות')
                                ? bench.myWorkshop < bench.avgWorkshop
                                : bench.myWorkshop > bench.avgWorkshop;

                            const diff = Math.abs(((bench.myWorkshop - bench.avgWorkshop) / bench.avgWorkshop) * 100).toFixed(0);

                            return (
                                <div key={idx} className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs text-slate-500 font-medium">{bench.metric}</span>
                                        {isBetter ? (
                                            <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                                                <TrendingUp className="w-3 h-3 mr-1" /> {diff}% טוב מהנורמה
                                            </span>
                                        ) : (
                                            <span className="flex items-center text-xs font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">
                                                <TrendingDown className="w-3 h-3 mr-1" /> {diff}% חריגה מהנורמה
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-end gap-2">
                                        <span className="text-2xl font-bold text-slate-900 font-mono">{bench.myWorkshop}</span>
                                        <span className="text-sm text-slate-400 mb-1">{bench.unit}</span>
                                    </div>
                                    <div className="mt-3 text-xs text-slate-400 flex justify-between">
                                        <span>ממוצע חילי: {bench.avgWorkshop}</span>
                                        <span>הסדנה המובילה: {bench.bestClass}</span>
                                    </div>
                                    {/* Progress Bar */}
                                    <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${isBetter ? 'bg-emerald-500' : 'bg-rose-500'}`}
                                            style={{ width: `${Math.min((bench.myWorkshop / bench.bestClass) * 100, 100)}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Radar Chart Comparison */}
                    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
                            <div>
                                <h3 className="text-lg font-bold text-slate-800">פרופיל ביצועים השוואתי</h3>
                                <p className="text-sm text-slate-500">השוואה ויזואלית מול הממוצע החילי</p>
                            </div>
                            <div className="flex gap-4 text-xs font-medium">
                                <div className="flex items-center gap-1.5">
                                    <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                                    הסדנה שלי
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-3 h-3 rounded-full bg-slate-300"></span>
                                    ממוצע חילי
                                </div>
                            </div>
                        </div>

                        <div className="h-80 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                                    <PolarGrid stroke="#e2e8f0" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                    <Radar
                                        name="הסדנה שלי"
                                        dataKey="myself"
                                        stroke="#3b82f6"
                                        strokeWidth={3}
                                        fill="#3b82f6"
                                        fillOpacity={0.2}
                                    />
                                    <Radar
                                        name="ממוצע חילי"
                                        dataKey="average"
                                        stroke="#cbd5e1"
                                        strokeWidth={2}
                                        fill="#cbd5e1"
                                        fillOpacity={0.2}
                                    />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                                        formatter={(_, name) => [name === 'הסדנה שלי' ? 'ביצועים' : 'נורמה', name]}
                                    />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Routine;