
import { mockSAPOrders } from './src/mockData';

console.log('--- Verifying SAP Mock Data ---');
console.log(`Total Orders Generated: ${mockSAPOrders.length}`);

if (mockSAPOrders.length > 0) {
    const sampleOrder = mockSAPOrders[0];
    console.log('\nSample Order Header (EKKO):');
    console.log(`EBELN: ${sampleOrder.EBELN}`);
    console.log(`Vendor: ${sampleOrder.LIFNR}`);
    console.log(`Doc Date: ${sampleOrder.BEDAT}`);
    console.log(`Net Value: ${sampleOrder.NETWR}`);

    if (sampleOrder.items && sampleOrder.items.length > 0) {
        console.log('\nSample Order Items (EKPO):');
        sampleOrder.items.forEach(item => {
            console.log(`  Item ${item.EBELP}: ${item.MATNR} - ${item.TXZ01} (Qty: ${item.MENGE})`);
        });
    } else {
        console.error('ERROR: No items found in sample order!');
    }
} else {
    console.error('ERROR: No orders generated!');
}
