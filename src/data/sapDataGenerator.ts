import { SAPOrderHeader, SAPOrderItem } from '../types';

// Constants for realistic SAP data generation
const PLANT_CODES = ['1000', '1100', '1200', '2000'];
const STORAGE_LOCS = ['0001', '0002', '0088', '1000'];
const VENDORS = ['100000', '100001', '100050', '200100', '300500'];
const PURCH_ORGS = ['1000', '2000', '3000'];
const PURCH_GROUPS = ['001', '002', 'B01', 'M01'];
const MATERIALS = [
    { id: 'MAT-001392', desc: 'מסנן שמן הידראולי', unit: 'EA', price: 150.00 },
    { id: 'MAT-293841', desc: 'אטם ראש מנוע', unit: 'EA', price: 85.50 },
    { id: 'MAT-992834', desc: 'מיסב כדורי 50מ"מ', unit: 'EA', price: 42.20 },
    { id: 'MAT-110022', desc: 'שמן מנוע 15W40', unit: 'L', price: 25.00 },
    { id: 'MAT-445566', desc: 'בורג M12 פלדה', unit: 'KG', price: 12.00 },
    { id: 'MAT-778899', desc: 'רצועת תזמון', unit: 'EA', price: 120.00 },
    { id: 'MAT-332211', desc: 'פנס קדמי ימין', unit: 'EA', price: 450.00 },
    { id: 'MAT-554433', desc: 'דיסקית חיכוך', unit: 'EA', price: 35.00 },
];
const CREATORS = ['MOSHE_C', 'DANA_L', 'DAVID_K', 'SYSTEM_JOB'];

function generateRandomDate(start: Date, end: Date): string {
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
}

function padNumber(num: number, width: number): string {
    return String(num).padStart(width, '0');
}

// Helper to inject specific anomalies into the generated data
const injectAnomalies = (order: SAPOrderHeader, scenario: 'FOG_OF_DATA' | 'REVOLVING_DOOR' | 'CODE_999' | 'NORMAL') => {
    const today = new Date();
    const dateStr = generateRandomDate(new Date(today.getTime() - 86400000 * 30), today); // Recent

    switch (scenario) {
        case 'FOG_OF_DATA':
            // Status says "Waiting for Parts", but withdrawal happened
            order.historyLogs = [
                { date: dateStr, time: '09:00', action: 'Created', user: 'MOSHE_C' },
                { date: dateStr, time: '09:15', action: 'Status Change', user: 'SYSTEM', systemNote: 'Missing Parts' }
            ];
            // Real world contradiction: The part WAS withdrawn
            order.withdrawalHistory = [
                { date: dateStr, materialId: order.items?.[0]?.MATNR || 'MAT-UNKNOWN', quantity: 1, user: 'DAVID_K' }
            ];
            break;

        case 'REVOLVING_DOOR':
            // Closed and immediately reopened
            order.historyLogs = [
                { date: dateStr, time: '14:00', action: 'Created', user: 'DANA_L' },
                { date: dateStr, time: '16:00', action: 'Closed', user: 'DANA_L' },
                { date: dateStr, time: '16:05', action: 'Re-opened', user: 'DANA_L', systemNote: 'Resumed work' } // Suspiciously fast reopen
            ];
            break;

        case 'CODE_999':
            // Suspicious manual override
            order.historyLogs = [
                { date: dateStr, time: '10:00', action: 'Created', user: 'SYSTEM_JOB' },
                { date: dateStr, time: '12:00', action: 'Update', user: 'ADMIN', systemNote: 'Manual Override - Code 999' }
            ];
            break;

        default:
            // Normal behavior
            order.historyLogs = [
                { date: dateStr, time: '10:00', action: 'Created', user: 'SYSTEM_JOB' }
            ];
    }
    return order;
};

export const generateSAPOrders = (count: number): SAPOrderHeader[] => {
    const orders: SAPOrderHeader[] = [];
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 6); // Last 6 months
    const endDate = new Date();

    for (let i = 0; i < count; i++) {
        const orderId = 4500000000 + i;
        const ebeln = String(orderId);
        const bedat = generateRandomDate(startDate, endDate);
        const vendor = VENDORS[Math.floor(Math.random() * VENDORS.length)];

        const numItems = Math.floor(Math.random() * 5) + 1; // 1 to 5 items per order
        const items: SAPOrderItem[] = [];
        let totalNetValue = 0;

        for (let j = 0; j < numItems; j++) {
            const material = MATERIALS[Math.floor(Math.random() * MATERIALS.length)];
            const quantity = Math.floor(Math.random() * 50) + 1;
            const netValue = quantity * material.price;

            totalNetValue += netValue;

            items.push({
                EBELN: ebeln,
                EBELP: padNumber((j + 1) * 10, 5), // 00010, 00020, etc.
                MATNR: material.id,
                TXZ01: material.desc,
                MENGE: quantity,
                MEINS: material.unit,
                NETPR: material.price,
                WERKS: PLANT_CODES[Math.floor(Math.random() * PLANT_CODES.length)],
                LGORT: STORAGE_LOCS[Math.floor(Math.random() * STORAGE_LOCS.length)],
                LOEKZ: Math.random() > 0.95 ? 'L' : undefined // 5% chance of being deleted
            });
        }

        let order: SAPOrderHeader = {
            EBELN: ebeln,
            BUKRS: '1000',
            BSTYP: 'F',
            BSART: 'NB',
            LIFNR: vendor,
            ERNAM: CREATORS[Math.floor(Math.random() * CREATORS.length)],
            BEDAT: bedat,
            EKORG: PURCH_ORGS[Math.floor(Math.random() * PURCH_ORGS.length)],
            EKGRP: PURCH_GROUPS[Math.floor(Math.random() * PURCH_GROUPS.length)],
            WAERS: 'ILS',
            NETWR: Number(totalNetValue.toFixed(2)),
            items: items
        };

        // Inject anomalies into ~30% of orders
        const rand = Math.random();
        if (rand < 0.1) {
            order = injectAnomalies(order, 'FOG_OF_DATA');
        } else if (rand < 0.2) {
            order = injectAnomalies(order, 'REVOLVING_DOOR');
        } else if (rand < 0.3) {
            order = injectAnomalies(order, 'CODE_999');
        } else {
            order = injectAnomalies(order, 'NORMAL');
        }

        orders.push(order);
    }

    return orders;
};
