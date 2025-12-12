// src/admin/components/CustomOrderExporter.js
import { downloadCSV } from 'react-admin';
import jsonExport from 'jsonexport/dist';

export const orderExporter = (orders) => {
    // Transform orders data for better CSV output
    const ordersForExport = orders.map(order => {
        // Format items as readable string: "Product1 x2, Product2 x1"
        const itemsStr = order.items && order.items.length > 0
            ? order.items.map(item => {
                // Try multiple ways to get product name
                const productName = item.product_name
                    || item.product_id?.name
                    || (typeof item.product_id === 'string' ? item.product_id.substring(0, 8) + '...' : 'Unknown');
                return `${productName} x${item.quantity}`;
            }).join(', ')
            : '';

        return {
            id: order.id ? order.id.substring(0, 8) : '',
            customer_name: order.customer_name || '',
            phone: order.phone || '',
            address: order.shipping_address || '',
            total: order.total_amount || 0,
            status: order.status || '',
            items: itemsStr,
            created_at: order.created_at ? new Date(order.created_at).toLocaleString('vi-VN') : '',
        };
    });

    jsonExport(ordersForExport, {
        headers: ['id', 'customer_name', 'phone', 'address', 'total', 'status', 'items', 'created_at']
    }, (err, csv) => {
        downloadCSV(csv, 'orders');
    });
};
