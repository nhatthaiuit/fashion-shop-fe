// src/admin/components/CustomOrderListActions.jsx
import {
    TopToolbar,
    ExportButton
} from 'react-admin';

export const CustomOrderListActions = () => {
    return (
        <TopToolbar>
            {/* Right side - only Export button, no delete for orders */}
            <div style={{ marginLeft: 'auto', display: 'flex', gap: '12px', alignItems: 'center' }}>
                <ExportButton />
            </div>
        </TopToolbar>
    );
};
