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
    time?: string; // Added to match usage in Routine.tsx
}

export interface ReportItem {
    id: string;
    title: string;
    date?: string; // Made optional
    dateCreated?: string; // Added to match usage in Reports.tsx
    status: string;
    type?: string; // Added to match usage in Reports.tsx
    size?: string; // Added to match usage in Reports.tsx
}

// SAP EKKO - Purchasing Document Header
export interface SAPOrderHeader {
    EBELN: string; // Purchasing Document Number (e.g., 4500000001)
    BUKRS: string; // Company Code (e.g., 1000)
    BSTYP: string; // Purchasing Document Category (e.g., F)
    BSART: string; // Purchasing Document Type (e.g., NB)
    LIFNR: string; // Vendor Account Number
    ERNAM: string; // Creator Name
    BEDAT: string; // Purchasing Document Date (YYYYMMDD)
    EKORG: string; // Purchasing Organization
    EKGRP: string; // Purchasing Group
    WAERS: string; // Currency Key
    NETWR: number; // Net Value of Order (aggregated)
    items?: SAPOrderItem[]; // Navigation property for easy access
    // Enhanced fields for "Reasoning"
    historyLogs?: Array<{
        date: string;
        time: string;
        action: string;
        user: string;
        systemNote?: string; // e.g., "Code 999 applied"
    }>;
    withdrawalHistory?: Array<{
        date: string;
        materialId: string;
        quantity: number;
        user: string;
    }>;
}

// SAP EKPO - Purchasing Document Item
export interface SAPOrderItem {
    EBELN: string; // Purchasing Document Number
    EBELP: string; // Item Number (e.g., 00010)
    MATNR: string; // Material Number
    TXZ01: string; // Short Text
    MENGE: number; // Purchase Order Quantity
    MEINS: string; // Order Unit (e.g., ST, KG)
    NETPR: number; // Net Price
    WERKS: string; // Plant
    LGORT: string; // Storage Location
    LOEKZ?: string; // Deletion Indicator
}
