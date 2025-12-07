// src/admin/components/StockField.jsx
import { useRecordContext } from 'react-admin';

export const StockField = ({ source }) => {
    const record = useRecordContext();
    if (!record) return null;

    const stock = record[source];

    // Determine color based on stock level
    let colorClass = 'stock-healthy';
    if (stock === 0) {
        colorClass = 'stock-out';
    } else if (stock <= 5) {
        colorClass = 'stock-low';
    }

    return (
        <span className={`stock-badge ${colorClass}`}>
            {stock}
        </span>
    );
};
