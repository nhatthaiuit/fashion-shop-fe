// src/admin/components/CustomExporter.js
import { downloadCSV } from 'react-admin';
import jsonExport from 'jsonexport/dist';

export const productExporter = (products) => {
    // Transform products data for better CSV output
    const productsForExport = products.map(product => {
        // Format sizes as readable string: "S:10, M:15, L:20"
        const sizesStr = product.sizes && product.sizes.length > 0
            ? product.sizes.map(s => `${s.label}:${s.stock}`).join(', ')
            : '';

        return {
            id: product._id ? product._id.substring(0, 8) : '',
            name: product.name,
            price: product.price,
            category: product.category,
            stock: product.count_in_stock,
            sizes: sizesStr,
            description: product.description || '',
        };
    });

    jsonExport(productsForExport, {
        headers: ['id', 'name', 'price', 'category', 'stock', 'sizes', 'description']
    }, (err, csv) => {
        downloadCSV(csv, 'products');
    });
};
