// src/admin/components/CustomListActions.jsx
import {
    TopToolbar,
    CreateButton,
    ExportButton,
    useListContext,
    useDeleteMany,
    useRefresh,
    useNotify,
    useUnselectAll
} from 'react-admin';

export const CustomListActions = () => {
    const { selectedIds, resource } = useListContext();
    const hasSelection = selectedIds && selectedIds.length > 0;
    const [deleteMany, { isLoading }] = useDeleteMany();
    const refresh = useRefresh();
    const notify = useNotify();
    const unselectAll = useUnselectAll(resource);

    const handleDelete = async () => {
        if (window.confirm(`Delete ${selectedIds.length} item(s)?`)) {
            try {
                await deleteMany(
                    resource,
                    { ids: selectedIds }
                );
                notify(`Successfully deleted ${selectedIds.length} item(s)`, { type: 'success' });
                unselectAll();
                refresh();
            } catch (error) {
                notify(`Error: ${error.message}`, { type: 'error' });
            }
        }
    };

    return (
        <TopToolbar>
            {/* Right side - all buttons */}
            <div style={{ marginLeft: 'auto', display: 'flex', gap: '12px', alignItems: 'center' }}>
                {hasSelection && (
                    <button
                        className="custom-delete-button"
                        onClick={handleDelete}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Deleting...' : `Delete (${selectedIds.length})`}
                    </button>
                )}
                <CreateButton />
                <ExportButton />
            </div>
        </TopToolbar>
    );
};
