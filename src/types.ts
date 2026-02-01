export type Severity = 'high' | 'medium' | 'low';
export type AnomalyType = 'StatusInference' | 'LogisticsGap';

export interface AnomalyCard {
    id: string;
    severity: Severity;
    type: AnomalyType;
    title: string;
    targetId: string;
    timestamp: string;
    evidence: {
        labelA: string;
        valueA: string;
        labelB: string;
        valueB: string;
    };
    description: string;
    suggestedAction: string;
}

export interface Intervention {
    id: string;
    vehicleId: string;
    timestamp: string;
    actionAttempted: string;
    systemResponse: string;
    technicianName: string;
}

export interface RoutineTask {
    id: string;
    title: string;
    status: 'pending' | 'completed' | 'in-progress';
    assignee: string;
    dueDate: string;
}

export interface ReportItem {
    id: string;
    title: string;
    date: string;
    status: string;
}
