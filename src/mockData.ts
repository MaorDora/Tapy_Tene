import { AnomalyCard, Intervention, RoutineTask, ReportItem } from './types';

export const mockAnomalies: AnomalyCard[] = [
    {
        id: '1',
        severity: 'high',
        type: 'StatusInference',
        title: 'חריגת קילומטראז׳',
        targetId: 'TANK-302',
        timestamp: '08:30',
        evidence: {
            labelA: 'דיווח מנ״ע',
            valueA: '12,500 ק״מ',
            labelB: 'מדיד בפועל',
            valueB: '12,950 ק״מ'
        },
        description: 'רכב עבר טיפול ללא דיווח תואם במערכת.',
        suggestedAction: 'עדכן טיפול'
    },
    {
        id: '2',
        severity: 'medium',
        type: 'LogisticsGap',
        title: 'חוסר במלאי חלפים',
        targetId: 'WH-01',
        timestamp: '09:15',
        evidence: {
            labelA: 'רשום במערכת',
            valueA: '5 יח׳',
            labelB: 'ספירה',
            valueB: '3 יח׳'
        },
        description: 'פער בספירת מלאי פילטרים.',
        suggestedAction: 'בצע הזמנה'
    }
];

export const mockInterventions: Intervention[] = [
    {
        id: '1',
        vehicleId: 'JEEP-99',
        timestamp: 'Yesterday',
        actionAttempted: 'ניפוק כפול',
        systemResponse: 'נחסם',
        technicianName: 'ישראל ישראלי'
    }
];

// Recharts data
export const mockChartData = [
    { name: 'א', value: 400, uv: 2400, pv: 2400, amt: 2400 },
    { name: 'ב', value: 300, uv: 1398, pv: 2210, amt: 2210 },
    { name: 'ג', value: 200, uv: 9800, pv: 2290, amt: 2290 },
    { name: 'ד', value: 278, uv: 3908, pv: 2000, amt: 2000 },
    { name: 'ה', value: 189, uv: 4800, pv: 2181, amt: 2181 },
    { name: 'ו', value: 239, uv: 3800, pv: 2500, amt: 2500 },
    { name: 'ש', value: 349, uv: 4300, pv: 2100, amt: 2100 },
];

export const mockBenchmarks = [
    { metric: 'זמינות מבצעית', unit: '%', myWorkshop: 92, avgWorkshop: 85, bestClass: 98 },
    { metric: 'משך טיפול ממוצע', unit: 'שעות', myWorkshop: 4.5, avgWorkshop: 6.2, bestClass: 3.8 },
    { metric: 'תקלות חוזרות', unit: '%', myWorkshop: 2.1, avgWorkshop: 5.5, bestClass: 0.5 },
    { metric: 'שביעות רצון (משוב)', unit: 'ציון', myWorkshop: 4.8, avgWorkshop: 4.2, bestClass: 4.9 }
];

export const mockRoutineTasks: RoutineTask[] = [
    { id: '1', title: 'בדיקת בוקר', status: 'completed', assignee: 'דני', dueDate: '08:00' },
    { id: '2', title: 'טיפול שבועי', status: 'in-progress', assignee: 'יוסי', dueDate: '12:00' }
];

export const mockReports: ReportItem[] = [
    { id: '1', title: 'דו״ח חודשי', date: '01/05/2026', status: 'מוכן' },
    { id: '2', title: 'חריגות מלאי', date: '02/05/2026', status: 'בבדיקה' }
];

export const mockAnomalyCauses = [
    { name: 'טעות אנוש', value: 400 },
    { name: 'תקלה טכנית', value: 300 },
    { name: 'דיווח חסר', value: 300 },
    { name: 'אחר', value: 200 }
];

export const mockNormCompliance = [
    { subject: 'תקן א', A: 120, B: 110, fullMark: 150 },
    { subject: 'תקן ב', A: 98, B: 130, fullMark: 150 },
    { subject: 'תקן ג', A: 86, B: 130, fullMark: 150 },
    { subject: 'תקן ד', A: 99, B: 100, fullMark: 150 },
    { subject: 'תקן ה', A: 85, B: 90, fullMark: 150 },
    { subject: 'תקן ו', A: 65, B: 85, fullMark: 150 },
];
