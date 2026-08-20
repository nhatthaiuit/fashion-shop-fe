import { useNavigate } from 'react-router-dom';
import {
  List,
  Datagrid,
  TextField,
  NumberField,
  DateField,
  Show,
  SimpleShowLayout,
  ArrayField,
  Edit,
  SimpleForm,
  SelectInput,
  TextInput,
  FunctionField,
  Toolbar,
  SaveButton,
  TopToolbar,
  EditButton,
} from "react-admin";
import { Box, Grid, Card, CardContent, Typography, Chip, Divider , Button } from '@mui/material';
import { CustomOrderListActions } from '../components/CustomOrderListActions';
import { orderExporter } from '../components/CustomOrderExporter';
import '../styles/AdminStyles.css';

const statusChoices = [
  { id: "pending", name: "pending" },
  { id: "processing", name: "processing" },
  { id: "shipped", name: "shipped" },
  { id: "completed", name: "completed" },
  { id: "cancelled", name: "cancelled" },
];

const orderFilters = [
  <TextInput key="search" source="customer_name" label="Customer Name" alwaysOn />,
  <SelectInput key="status" source="status" label="Status" choices={statusChoices} />
];

const getStatusColor = (status) => {
    switch(status) {
        case 'pending': return 'warning';
        case 'processing': return 'info';
        case 'shipped': return 'secondary';
        case 'completed': return 'success';
        case 'cancelled': return 'error';
        default: return 'default';
    }
};

export const OrderList = (props) => (
  <List
    {...props}
    perPage={20}
    sort={{ field: "created_at", order: "DESC" }}
    actions={<CustomOrderListActions />}
    exporter={orderExporter}
    filters={orderFilters}
  >
    <Datagrid rowClick="show" bulkActionButtons={false}>
      <FunctionField
        label="ID"
        render={record => record.id ? record.id.substring(0, 8) + '...' : ''}
      />
      <FunctionField 
        label="Total" 
        render={record => new Intl.NumberFormat('vi-VN').format(record.total_amount) + ' VNĐ'}
      />
      <TextField source="customer_name" label="Name" />
      <TextField source="phone" label="Phone" />
      <TextField source="shipping_address" label="Address" />
      <FunctionField 
        label="Status" 
        render={record => <Chip label={record.status.toUpperCase()} color={getStatusColor(record.status)} size="small" sx={{ fontWeight: 'bold' }} />}
      />
      <DateField source="created_at" showTime label="Created at" />
    </Datagrid>
  </List>
);


const OrderShowActions = () => {
    const navigate = useNavigate();
    return (
        <TopToolbar sx={{ gap: 2, alignItems: 'center' }}>
            <Button variant="outlined" onClick={() => navigate('/admin/orders')} size="small" sx={{ height: 36, color: '#000', borderColor: '#ccc', px: 3, '&:hover': { backgroundColor: '#f9f9f9', borderColor: '#000' }, borderRadius: 1, fontWeight: 'bold' }}>
                Back
            </Button>
            <EditButton sx={{ height: 36, borderRadius: 1, px: 2 }} />
        </TopToolbar>
    );
};

export const OrderShow = (props) => (
  <Show {...props} component="div" actions={<OrderShowActions />}>

    <SimpleShowLayout sx={{ p: 0, m: 0, '& .RaSimpleShowLayout-row': { display: 'block', padding: 0, border: 'none' } }}>
      <Box sx={{ maxWidth: 1000, margin: '0 auto', p: 3, width: '100%' }}>
        <Grid container spacing={3}>
            
            <Grid size={{ xs: 12 }}>
                <Card sx={{ border: '1px solid #e0e0e0', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderRadius: 2 }}>
                    <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 3 }}>
                        <Box>
                            <Typography variant="overline" color="textSecondary">Order ID</Typography>
                            <FunctionField render={record => <Typography variant="h5" sx={{ fontFamily: 'monospace', fontWeight: 600 }}>{record.id}</Typography>} />
                        </Box>
                        <FunctionField render={record => <Chip label={record.status.toUpperCase()} color={getStatusColor(record.status)} sx={{ fontWeight: 'bold', px: 2, py: 2.5, fontSize: '1rem', borderRadius: 8 }} />} />
                    </CardContent>
                </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
                <Card sx={{ border: '1px solid #e0e0e0', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderRadius: 2, height: '100%' }}>
                    <CardContent sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>Customer Details</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Typography color="textSecondary">Name</Typography>
                            <TextField source="customer_name" sx={{ fontWeight: 500 }} />
                        </Box>
                        <Divider />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 2 }}>
                            <Typography color="textSecondary">Phone</Typography>
                            <TextField source="phone" sx={{ fontWeight: 500 }} />
                        </Box>
                        <Divider />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                            <Typography color="textSecondary">Address</Typography>
                            <TextField source="shipping_address" sx={{ fontWeight: 500, textAlign: 'right', maxWidth: '60%' }} />
                        </Box>
                    </CardContent>
                </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
                <Card sx={{ border: '1px solid #e0e0e0', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderRadius: 2, height: '100%' }}>
                    <CardContent sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>Order Summary</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Typography color="textSecondary">Total Amount</Typography>
                            <FunctionField render={record => <Typography sx={{ fontWeight: 700, fontSize: '1.2rem' }}>{new Intl.NumberFormat('vi-VN').format(record.total_amount)} VNĐ</Typography>} />
                        </Box>
                        <Divider />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 2 }}>
                            <Typography color="textSecondary">Order Date</Typography>
                            <DateField source="created_at" showTime sx={{ fontWeight: 500 }} />
                        </Box>
                        <Divider />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                            <Typography color="textSecondary">Last Updated</Typography>
                            <DateField source="updated_at" showTime sx={{ fontWeight: 500 }} />
                        </Box>
                    </CardContent>
                </Card>
            </Grid>

            <Grid size={{ xs: 12 }}>
                <Card sx={{ border: '1px solid #e0e0e0', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderRadius: 2 }}>
                    <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
                        <Box sx={{ p: 3, pb: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>Order Items</Typography>
                        </Box>
                        <ArrayField source="items">
                            <Datagrid bulkActionButtons={false} sx={{ '& .RaDatagrid-table': { borderBottom: 'none' }, '& tr:last-child td': { borderBottom: 'none' }, '& .RaDatagrid-root': { border: 'none', boxShadow: 'none' } }}>
                                <FunctionField
                                    label="Product"
                                    render={record => {
                                        if (!record.product_id) return "Product Deleted";
                                        if (record.product_id?.product_name) return record.product_id.product_name;
                                        if (typeof record.product_id === 'string') return `ID: ${record.product_id.substring(0, 8)}...`;
                                        if (record.product_id?._id) return `ID: ${record.product_id._id.substring(0, 8)}...`;
                                        return "Unknown Product";
                                    }}
                                />
                                <FunctionField label="Unit Price" render={record => new Intl.NumberFormat('vi-VN').format(record.unit_price) + ' VNĐ'} />
                                <NumberField source="quantity" label="Qty" />
                                <FunctionField label="Subtotal" render={record => <Typography fontWeight="600">{new Intl.NumberFormat('vi-VN').format(record.unit_price * record.quantity)} VNĐ</Typography>} />
                            </Datagrid>
                        </ArrayField>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
      </Box>
    </SimpleShowLayout>
  </Show>
);

const OrderEditToolbar = props => {
  const navigate = useNavigate();
  return (
  <Toolbar {...props} sx={{ backgroundColor: 'transparent', display: 'flex', justifyContent: 'flex-end', borderTop: 'none', px: 2, gap: 2 }}>
    <Button variant="outlined" onClick={() => navigate('/admin/orders')} size="large" sx={{ color: '#000', borderColor: '#ccc', px: 4, py: 1, '&:hover': { backgroundColor: '#f9f9f9', borderColor: '#000' }, borderRadius: '8px', fontWeight: 'bold' }}>
        Back
    </Button>
    <SaveButton alwaysEnable variant="contained" size="large" sx={{ backgroundColor: '#000', color: '#fff', px: 4, py: 1, '&:hover': { backgroundColor: '#333' }, borderRadius: '8px', fontWeight: 'bold' }} />
  </Toolbar>
  );
};

export const OrderEdit = (props) => (
  <Edit {...props} component="div" actions={false}>
    <SimpleForm toolbar={<OrderEditToolbar />} sx={{ width: "100%", maxWidth: 600, margin: "0 auto", mt: 3, "& .MuiStack-root": { width: "100%" }, "& .RaSimpleForm-toolbar": { p: 0, mt: 2 } }}>
        <Card sx={{ border: '1px solid #e0e0e0', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderRadius: 2, width: '100%' }}>
            <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>Update Order Status</Typography>
                <SelectInput source="status" choices={statusChoices} fullWidth variant="outlined" />
            </CardContent>
        </Card>
    </SimpleForm>
  </Edit>
);
