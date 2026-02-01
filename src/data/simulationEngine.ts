import { AnomalyCard, Intervention, SAPOrderHeader } from '../types';
import { generateSAPOrders } from './sapDataGenerator';

export class SimulationEngine {
    private vehicles: string[] = [];
    private technicians: string[] = [];
    private orders: SAPOrderHeader[] = [];

    constructor() {
        this.initializeMasterData();
        this.generateHistory();
    }

    private initializeMasterData() {
        // Generate realistic vehicle fleet
        for (let i = 1; i <= 50; i++) this.vehicles.push(`RIO-${100 + i}`);
        for (let i = 1; i <= 30; i++) this.vehicles.push(`TANK-${300 + i}`);
        for (let i = 1; i <= 20; i++) this.vehicles.push(`ZEEV-${500 + i}`);
        for (let i = 1; i <= 15; i++) this.vehicles.push(`D9-${800 + i}`);

        // Generate technicians
        this.technicians = [
            'ישראל ישראלי', 'דוד כהן', 'רונית לוי', 'יוסי מזרחי',
            'דנה ספקטור', 'אבי ביטון', 'שרה אברהם', 'מוחמד עלי'
        ];
    }

    private generateHistory() {
        // Generate Orders (Base layer)
        // We pass the engine context to the generator if needed, 
        // but for now we'll just generate them and maybe post-process if we want deep linking
        this.orders = generateSAPOrders(100);
    }

    public getOrders(): SAPOrderHeader[] {
        return this.orders;
    }

    public generateAnomalies(count: number): AnomalyCard[] {
        const anomalies: AnomalyCard[] = [];

        for (let i = 0; i < count; i++) {
            const vehicle = this.getRandomVehicle();
            const isHighSeverity = Math.random() > 0.7;

            anomalies.push({
                id: `ANOM-${1000 + i}`,
                severity: isHighSeverity ? 'high' : 'medium',
                type: Math.random() > 0.5 ? 'StatusInference' : 'LogisticsGap',
                title: isHighSeverity ? `חריגה קריטית ב-${vehicle}` : `אי-התאמה ב-${vehicle}`,
                targetId: vehicle,
                timestamp: this.getRandomTime(),
                evidence: {
                    labelA: 'דיווח מנ״ע',
                    valueA: `${Math.floor(Math.random() * 10000)} ק״מ`,
                    labelB: 'מדיד בפועל',
                    valueB: `${Math.floor(Math.random() * 10000)} ק״מ`
                },
                description: `זוהה פער בין דיווחי הנהג לבין קריאת הטלמטריה האוטומטית ברכב ${vehicle}.`,
                suggestedAction: isHighSeverity ? 'השבתה מיידית' : 'זימון לבדיקה'
            });
        }
        return anomalies;
    }

    public generateInterventions(count: number): Intervention[] {
        const interventions: Intervention[] = [];

        for (let i = 0; i < count; i++) {
            const vehicle = this.getRandomVehicle();
            const tech = this.getRandomTechnician();

            interventions.push({
                id: `INT-${5000 + i}`,
                vehicleId: vehicle,
                timestamp: 'היום, ' + this.getRandomTime(),
                actionAttempted: Math.random() > 0.5 ? 'החלפת רכיב ללא אישור' : 'דיווח שעות חריג',
                systemResponse: 'נחסם ע״י המערכת',
                technicianName: tech
            });
        }
        return interventions;
    }

    // Helpers
    private getRandomVehicle(): string {
        return this.vehicles[Math.floor(Math.random() * this.vehicles.length)];
    }

    private getRandomTechnician(): string {
        return this.technicians[Math.floor(Math.random() * this.technicians.length)];
    }

    private getRandomTime(): string {
        const hour = String(Math.floor(Math.random() * 12) + 6).padStart(2, '0');
        const minute = String(Math.floor(Math.random() * 60)).padStart(2, '0');
        return `${hour}:${minute}`;
    }
}

// Singleton instance
export const simulationEngine = new SimulationEngine();
