
import React from 'react';
import { RefreshCcw, ShieldCheck, AlertOctagon, CheckSquare } from 'lucide-react';
import AnomalyCard from './AnomalyCard';
import { mockAnomalies, mockInterventions, mockInsights, mockActionRecommendations } from '../mockData';
import { Insight } from '../data/insightEngine'; // Added import
import { ActionRecommendation } from '../types';

const Dashboard: React.FC = () => {
    const [isRevolvingModalOpen, setIsRevolvingModalOpen] = React.useState<boolean>(false);

    // Filter insights: Separate "Revolving Door" from the rest
    const revolvingDoorInsights = mockInsights.filter((i: Insight) =>
        i.id.includes('REV') || i.title.includes('דלת מסתובבת')
    );

    const otherInsights = mockInsights.filter((i: Insight) =>
        !i.id.includes('REV') && !i.title.includes('דלת מסתובבת')
    );

    return (
        <div className="p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20 relative">

            {/* Header & Status */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-2 font-sans">מרכז פעולה</h2>
                    <p className="text-slate-500 max-w-2xl">
                        בוקר טוב, שרון. המערכת ביצעה הצלבת נתונים מול הרישום הפיזי. <br />
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

                    {/* Insight / Anomaly Feed */}
                    <div className="space-y-4">
                        {otherInsights.map((insight) => (
                            <AnomalyCard
                                key={insight.id}
                                data={{
                                    id: insight.id,
                                    severity: insight.type === 'ALERT' ? 'high' : 'medium',
                                    type: insight.type === 'ALERT' ? 'StatusInference' : 'LogisticsGap',
                                    title: insight.title,
                                    targetId: insight.relatedOrderId,
                                    timestamp: 'עכשיו',
                                    evidence: insight.evidence || { labelA: 'N/A', valueA: '-', labelB: 'N/A', valueB: '-' },
                                    description: insight.description,
                                    suggestedAction: insight.suggestedAction || 'לטיפולך'
                                }}
                            />
                        ))}

                        {otherInsights.length === 0 && mockAnomalies.map((anomaly) => (
                            <AnomalyCard key={anomaly.id} data={anomaly} />
                        ))}

                        {otherInsights.length === 0 && mockAnomalies.length === 0 && (
                            <div className="py-20 text-center bg-white rounded-xl border border-dashed border-slate-200">
                                <CheckSquare className="w-12 h-12 text-emerald-500/50 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-slate-900">הכל נקי!</h3>
                                <p className="text-slate-500">תמונת המצב הממוחשבת תואמת את המציאות בשטח.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: "The Action" (Recommendations) */}
                <div className="space-y-6">
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <CheckSquare className="w-5 h-5 text-blue-600" />
                        המלצות לפעולה (נדרש טיפול)
                    </h3>

                    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                        <div className="p-3 bg-slate-50 border-b border-slate-100 text-xs text-slate-500">
                            זוהו {mockActionRecommendations.length} פערים הדורשים התערבות מיידית
                        </div>
                        <div className="divide-y divide-slate-100">
                            {mockActionRecommendations.map((item: ActionRecommendation) => (
                                <div key={item.id} className="p-4 hover:bg-slate-50 transition-colors group">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2">
                                            {item.urgency === 'high' && <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />}
                                            <span className="text-sm font-bold text-slate-900">{item.title}</span>
                                        </div>
                                        {item.orderId && (
                                            <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-mono">
                                                {item.orderId}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                                        {item.description}
                                    </p>
                                    <button className="w-full py-1.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-2 group-hover:shadow-sm">
                                        {item.actionLabel}
                                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">&larr;</span>
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
                            <button className="text-xs text-blue-600 font-medium hover:underline">
                                צפה בכל ההמלצות
                            </button>
                        </div>
                    </div>

                    {/* Quick Stats Context - Revolving Door KPI */}
                    <div
                        onClick={() => setIsRevolvingModalOpen(true)}
                        className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-xl p-6 text-white shadow-lg cursor-pointer hover:shadow-xl transition-shadow relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <RefreshCcw className="w-24 h-24" />
                        </div>

                        <h4 className="text-sm font-bold text-indigo-200 mb-4 z-10 relative">מדדי אמינות שבועיים</h4>
                        <div className="space-y-4 z-10 relative">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-indigo-100">נסיונות "דלת מסתובבת"</span>
                                <span className="font-mono font-bold text-xl text-white">{revolvingDoorInsights.length}</span>
                            </div>
                            <div className="w-full bg-indigo-900/50 h-1.5 rounded-full overflow-hidden">
                                <div
                                    className="bg-rose-500 h-full transition-all duration-1000"
                                    style={{ width: `${Math.min((revolvingDoorInsights.length / 20) * 100, 100)}% ` }}
                                ></div>
                            </div>
                            <p className="text-xs text-indigo-300 mt-2">
                                {revolvingDoorInsights.length > 0 ? 'לחץ לפירוט המקרים' : 'אין חריגות השבוע'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Revolving Door Details Modal */}
            {isRevolvingModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm fade-in animate-in duration-200">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-start bg-slate-50/50">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                    <RefreshCcw className="w-5 h-5 text-indigo-600" />
                                    דלת מסתובבת - פירוט מקרים
                                </h3>
                                <p className="text-sm text-slate-500 mt-1">
                                    רשימת הזמנות שנסגרו ונפתחו מחדש בטווח זמן קצר (חשד ל-Gaming).
                                </p>
                            </div>
                            <button
                                onClick={() => setIsRevolvingModalOpen(false)}
                                className="text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <span className="text-2xl leading-none">&times;</span>
                            </button>
                        </div>

                        <div className="overflow-y-auto p-6 space-y-4">
                            {revolvingDoorInsights.length === 0 ? (
                                <div className="text-center py-12 text-slate-500">
                                    <CheckSquare className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                    <p>לא נמצאו מקרים פעילים.</p>
                                </div>
                            ) : (
                                revolvingDoorInsights.map((insight) => (
                                    <div key={insight.id} className="border border-slate-200 rounded-xl p-4 hover:border-indigo-200 transition-colors bg-white">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="font-mono text-sm font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded">
                                                {insight.relatedOrderId}
                                            </div>
                                            <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full border border-amber-100">
                                                {insight.confidence}% סבירות
                                            </span>
                                        </div>
                                        <h4 className="font-bold text-slate-800 text-sm mb-2">{insight.description}</h4>

                                        {insight.evidence && (
                                            <div className="grid grid-cols-2 gap-4 bg-slate-50 p-3 rounded-lg text-xs mt-3">
                                                <div>
                                                    <span className="block text-slate-400 mb-0.5">{insight.evidence.labelA}</span>
                                                    <span className="font-mono font-bold text-slate-700">{insight.evidence.valueA}</span>
                                                </div>
                                                <div>
                                                    <span className="block text-slate-400 mb-0.5">{insight.evidence.labelB}</span>
                                                    <span className="font-mono font-bold text-slate-700">{insight.evidence.valueB}</span>
                                                </div>
                                            </div>
                                        )}

                                        <div className="mt-3 pt-3 border-t border-slate-100 flex justify-end">
                                            <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:underline">
                                                צפה בהיסטוריה מלאה &rarr;
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
                            <button
                                onClick={() => setIsRevolvingModalOpen(false)}
                                className="px-4 py-2 bg-white border border-slate-300 text-slate-700 text-sm font-bold rounded-lg hover:bg-slate-50 transition-colors"
                            >
                                סגור
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;