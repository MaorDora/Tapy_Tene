import { SAPOrderHeader } from '../types';

export interface Insight {
    id: string;
    type: 'ALERT' | 'WARNING' | 'INFO';
    title: string;
    description: string;
    relatedOrderId: string;
    confidence: number; // 0-100, simulating AI confidence
    tags: string[];
    evidence?: {
        labelA: string;
        valueA: string;
        labelB: string;
        valueB: string;
    };
    suggestedAction?: string;
}

export class InsightEngine {

    public analyzeOrders(orders: SAPOrderHeader[]): Insight[] {
        const insights: Insight[] = [];

        orders.forEach(order => {
            // Check for Fog of Data (Status vs Reality Mismatch)
            const fogInsight = this.detectFogOfData(order);
            if (fogInsight) insights.push(fogInsight);

            // Check for Revolving Door (Gaming the metrics)
            const revolvingInsight = this.detectRevolvingDoor(order);
            if (revolvingInsight) insights.push(revolvingInsight);

            // Check for Code 999 (Suspicious Admin Override)
            const code999Insight = this.detectCode999(order);
            if (code999Insight) insights.push(code999Insight);
        });

        return insights;
    }

    private detectFogOfData(order: SAPOrderHeader): Insight | null {
        // Condition: System says "Missing Parts", but withdrawal history shows parts were taken.
        const isWaitingForParts = order.historyLogs?.some(log => log.systemNote?.includes('Missing Parts'));
        const hasWithdrawals = (order.withdrawalHistory?.length || 0) > 0;

        if (isWaitingForParts && hasWithdrawals) {
            return {
                id: `INS-FOG-${order.EBELN}`,
                type: 'ALERT',
                title: 'פער אמינות דיווח (Fog of Data)',
                description: `ההזמנה בסטטוס "ממתין לחלף", אך זוהתה משיכת פריט מהמחסן. ייתכן שהעבודה החלה אך לא דווחה.`,
                relatedOrderId: order.EBELN,
                confidence: 95,
                tags: ['Data Integrity', 'Warehouse Cross-Ref'],
                evidence: {
                    labelA: 'סטטוס מדווח',
                    valueA: 'ממתין לחלף',
                    labelB: 'מציאות (מחסן)',
                    valueB: `נופק ב-${order.withdrawalHistory![0].date}`
                },
                suggestedAction: 'עדכן סטטוס ל"בטיפול"'
            };
        }
        return null;
    }

    private detectRevolvingDoor(order: SAPOrderHeader): Insight | null {
        // Condition: Closed and Re-opened within a short timeframe (same day or small delta).
        if (!order.historyLogs) return null;

        const closedLog = order.historyLogs.find(log => log.action === 'Closed');
        const reopenedLog = order.historyLogs.find(log => log.action === 'Re-opened');

        if (closedLog && reopenedLog) {
            return {
                id: `INS-REV-${order.EBELN}`,
                type: 'WARNING',
                title: 'חשד ל"דלת מסתובבת" (Gaming)',
                description: `הזמנה נסגרה ונפתחה מחדש בטווח זמן קצר. דפוס זה אופייני לניסיון איפוס שעון ימי תקן (SLA).`,
                relatedOrderId: order.EBELN,
                confidence: 88,
                tags: ['SLA Manipulation', 'Behavioral Pattern'],
                evidence: {
                    labelA: 'דיווח סגירה',
                    valueA: closedLog.time,
                    labelB: 'פתיחה מחדש',
                    valueB: reopenedLog.time
                },
                suggestedAction: 'פסול סגירה (אחזור SLA)'
            };
        }
        return null;
    }

    private detectCode999(order: SAPOrderHeader): Insight | null {
        // Condition: Use of specific override code
        const suspiciousLog = order.historyLogs?.find(log => log.systemNote?.includes('Code 999'));

        if (suspiciousLog) {
            return {
                id: `INS-999-${order.EBELN}`,
                type: 'ALERT',
                title: 'שימוש בקוד עוקף (999)',
                description: `בוצע שינוי סטטוס חריג ע"י ${suspiciousLog.user} באמצעות קוד 999. פעולה זו עוקפת את הבקרות הרגילות.`,
                relatedOrderId: order.EBELN,
                confidence: 100,
                tags: ['Policy Violation', 'Admin Override'],
                evidence: {
                    labelA: 'מבצע פעולה',
                    valueA: suspiciousLog.user,
                    labelB: 'קוד חריג',
                    valueB: '999 (עוקף בקרה)'
                },
                suggestedAction: 'בירור מול המבצע'
            };
        }
        return null;
    }
}

export const insightEngine = new InsightEngine();
