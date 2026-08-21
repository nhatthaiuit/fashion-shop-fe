import { useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
    List, Datagrid, TextField, NumberField, EditButton,
    Edit, SimpleForm, TextInput, NumberInput, Create,
    Toolbar, SaveButton, required, SelectInput,
    ArrayInput, SimpleFormIterator, ImageField, ImageInput, FunctionField,
    TextInput as FilterTextInput, SelectInput as FilterSelectInput
} from 'react-admin';
import { Box, Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { StockField } from '../components/StockField';
import { productExporter } from '../components/CustomExporter';
import { CustomListActions } from '../components/CustomListActions';
import '../styles/AdminStyles.css';

const productFilters = [
    <FilterSelectInput key="category" label="Category" source="category" choices={[
        { id: 'Top', name: 'Top' },
        { id: 'Bottom', name: 'Bottom' },
        { id: 'Accessories', name: 'Accessories' },
        { id: 'Sale', name: 'Sale' },
    ]} />
];

export const ProductList = (props) => (
    <List
        {...props}
        perPage={25}
        sort={{ field: "updated_at", order: "DESC" }}
        filters={productFilters}
        exporter={productExporter}
        actions={<CustomListActions />}
    >
        <Datagrid bulkActionButtons={<></>}>
            <FunctionField
                label="ID"
                render={record => (record.id || record._id) ? String(record.id || record._id).substring(0, 8) + '...' : ''}
            />
            <ImageField source="image" label="Image" />
            <TextField source="product_name" label="Product Name" />
            <TextField source="category" label="Category" />
            <FunctionField
                source="price"
                label="Price"
                render={record => record.price != null ? new Intl.NumberFormat('en-US').format(record.price) + ' VND' : '0 VND'}
            />
            <StockField source="count_in_stock" label="Stock" />
            <EditButton />
        </Datagrid>
    </List>
);

const validateSizes = (value) => {
    if (!value || !Array.isArray(value) || value.length === 0) {
        return "Please add at least one size or Freesize";
    }
    const hasFreesize = value.some(s => s?.label === 'Freesize' || s?.label === 'OneSize');
    if (hasFreesize && value.length > 1) {
        return "When Freesize is selected, no other sizes can be added. Please keep only 1 Freesize row.";
    }
    return undefined;
};

const FormContent = () => {
    const navigate = useNavigate();
    const sizes = useWatch({ name: 'sizes' }) || [];

    // Kiểm tra nếu đã chọn Freesize
    const hasFreesize = Array.isArray(sizes) && sizes.some(s => s?.label === 'Freesize' || s?.label === 'OneSize');
    
    // Khi có từ 2 dòng size trở lên: dropdown ở các dòng sẽ KHÔNG có Freesize (chỉ chọn các size thường XS, S, M...)
    // Khi chỉ có 1 dòng duy nhất (hoặc chưa có dòng nào): dropdown hiển thị đầy đủ cả Freesize và các size thường để Admin linh hoạt chọn
    const isMultipleRows = Array.isArray(sizes) && sizes.length > 1;

    const sizeChoices = isMultipleRows
        ? [
            { id: 'XS', name: 'XS' },
            { id: 'S', name: 'S' },
            { id: 'M', name: 'M' },
            { id: 'L', name: 'L' },
            { id: 'XL', name: 'XL' },
            { id: 'XXL', name: 'XXL' },
        ]
        : [
            { id: 'Freesize', name: 'Freesize' },
            { id: 'XS', name: 'XS' },
            { id: 'S', name: 'S' },
            { id: 'M', name: 'M' },
            { id: 'L', name: 'L' },
            { id: 'XL', name: 'XL' },
            { id: 'XXL', name: 'XXL' },
        ];

    return (
    <Box sx={{ width: '100%', p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3, gap: 2 }}>
            <Button variant="outlined" onClick={() => navigate('/admin/products')} size="large" sx={{ color: '#000', borderColor: '#ccc', px: 4, py: 1, '&:hover': { backgroundColor: '#f9f9f9', borderColor: '#000' }, borderRadius: '8px', fontWeight: 'bold' }}>
                Back
            </Button>
            <SaveButton alwaysEnable variant="contained" size="large" sx={{ backgroundColor: '#000', color: '#fff', px: 4, py: 1, '&:hover': { backgroundColor: '#333' }, borderRadius: '8px', fontWeight: 'bold' }} />
        </Box>

        <Grid container spacing={3}>
            {/* ROW 1 */}
            <Grid size={{ xs: 12, md: 7 }}>
                <Box sx={{ height: '100%', bgcolor: "#fff", border: '1px solid #e0e0e0', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderRadius: 2, p: 3 }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>Basic Information</Typography>
                    <TextInput source="product_name" label="Product Name" validate={[required()]} fullWidth variant="outlined" />
                    <TextInput source="description" multiline rows={5} fullWidth variant="outlined" />
                </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 5 }}>
                <Box sx={{ height: '100%', bgcolor: "#fff", border: '1px solid #e0e0e0', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderRadius: 2, p: 3 }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>Classification & Pricing</Typography>
                    <SelectInput source="category" choices={[
                        { id: 'Top', name: 'Top' },
                        { id: 'Bottom', name: 'Bottom' },
                        { id: 'Accessories', name: 'Accessories' },
                        { id: 'Sale', name: 'Sale' },
                    ]} validate={[required()]} fullWidth variant="outlined" />
                    <NumberInput source="price" label="Selling Price (VND)" helperText="The price customer pays" validate={[required()]} fullWidth variant="outlined" />
                    <NumberInput source="original_price" label="Original Price (VND)" helperText="Original price before discount (strikethrough)" fullWidth variant="outlined" />
                </Box>
            </Grid>

            {/* ROW 2 */}
            <Grid size={{ xs: 12, md: 7 }}>
                <Box sx={{ height: '100%', bgcolor: "#fff", border: '1px solid #e0e0e0', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderRadius: 2, p: 3 }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>Inventory & Sizes</Typography>
                    <Typography variant="body2" sx={{ color: '#666', mb: 1.5, fontSize: '13px' }}>
                        * Tip: For <strong>Freesize</strong> products (Accessories, standard clothing), choose <strong>Freesize</strong> with a single row.
                    </Typography>
                    <ArrayInput source="sizes" label="" validate={[required(), validateSizes]}>
                        <SimpleFormIterator 
                            inline 
                            disableAdd={hasFreesize}
                            sx={{ 
                                gap: 2, 
                                width: '100%', 
                                '& .RaSimpleFormIterator-form': { width: '100%', display: 'flex', gap: 2 },
                                ...(hasFreesize ? { '& .RaSimpleFormIterator-add': { display: 'none !important' } } : {})
                            }}
                        >
                            <SelectInput fullWidth sx={{ flex: 1 }} source="label" label="Size" choices={sizeChoices} validate={[required()]} variant="outlined" />
                            <NumberInput fullWidth sx={{ flex: 1 }} source="stock" label="Stock Qty" min={0} defaultValue={0} validate={[required()]} variant="outlined" />
                        </SimpleFormIterator>
                    </ArrayInput>
                </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 5 }}>
                <Box sx={{ height: '100%', bgcolor: "#fff", border: '1px solid #e0e0e0', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderRadius: 2, p: 3 }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>Product Image</Typography>
                    <Box sx={{ border: '1px dashed #ccc', borderRadius: 2, p: 2, textAlign: 'center', bgcolor: '#f9f9f9', height: 'calc(100% - 50px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ImageInput source="image" label="" accept="image/*">
                            <ImageField source="src" title="title" />
                        </ImageInput>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    </Box>
    );
};

export const ProductEdit = (props) => (
    <Edit {...props} component="div">
        <SimpleForm toolbar={false} sx={{ width: "100%", maxWidth: 1200, margin: "0 auto", mt: 3, "& .MuiStack-root": { width: "100%" }, "& .RaSimpleForm-toolbar": { p: 0, mt: 2 } }}>
            <FormContent />
        </SimpleForm>
    </Edit>
);

export const ProductCreate = (props) => (
    <Create {...props} component="div">
        <SimpleForm toolbar={false} sx={{ width: "100%", maxWidth: 1200, margin: "0 auto", mt: 3, "& .MuiStack-root": { width: "100%" }, "& .RaSimpleForm-toolbar": { p: 0, mt: 2 } }}>
            <FormContent />
        </SimpleForm>
    </Create>
);
