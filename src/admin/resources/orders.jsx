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
  FunctionField,
  Toolbar,
  SaveButton,
} from "react-admin";
import { CustomOrderListActions } from '../components/CustomOrderListActions';
import { orderExporter } from '../components/CustomOrderExporter';
import '../styles/admin-custom.css';

const statusChoices = [
  { id: "pending", name: "pending" },
  { id: "processing", name: "processing" },
  { id: "shipped", name: "shipped" },
  { id: "completed", name: "completed" },
  { id: "cancelled", name: "cancelled" },
];

// LIST: /admin/orders
export const OrderList = (props) => (
  <List
    {...props}
    perPage={20}
    sort={{ field: "createdAt", order: "DESC" }}
    actions={<CustomOrderListActions />}
    exporter={orderExporter}
  >
    <Datagrid rowClick="show" bulkActionButtons={false}>
      <FunctionField
        label="ID"
        render={record => record.id ? record.id.substring(0, 8) + '...' : ''}
      />
      <NumberField source="total_amount" label="Total" />
      <TextField source="customer_name" label="Name" />
      <TextField source="phone" label="Phone" />
      <TextField source="shipping_address" label="Address" />
      <TextField source="status" />
      <DateField source="createdAt" showTime label="Created at" />
    </Datagrid>
  </List>
);

// SHOW: /admin/orders/:id/show
export const OrderShow = (props) => (
  <Show {...props} component="div">
    <SimpleShowLayout className="order-detail-v2">
      {/* Order ID Card */}
      <div className="order-card-v2">
        <h3 className="card-title-v2">Order ID</h3>
        <div className="id-status-row">
          <FunctionField
            render={record => (
              <span className="order-id-text">{record.id}</span>
            )}
          />
          <FunctionField
            render={record => {
              const statusColors = {
                pending: '#ff9800',
                processing: '#2196f3',
                shipped: '#9c27b0',
                completed: '#4caf50',
                cancelled: '#f44336'
              };
              return (
                <span
                  className="status-badge-v2"
                  style={{ background: statusColors[record.status] || '#666' }}
                >
                  {record.status}
                </span>
              );
            }}
          />
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="order-grid">
        {/* Left Column - Customer Info */}
        <div className="order-card-v2">
          <h3 className="card-title-v2">Customer</h3>
          <div className="info-row">
            <span className="info-label">Name</span>
            <TextField source="customer_name" className="info-value" />
          </div>
          <div className="info-row">
            <span className="info-label">Phone</span>
            <TextField source="phone" className="info-value" />
          </div>
          <div className="info-row">
            <span className="info-label">Address</span>
            <TextField source="shipping_address" className="info-value" />
          </div>
        </div>

        {/* Right Column - Order Info */}
        <div className="order-card-v2">
          <h3 className="card-title-v2">Order Details</h3>
          <div className="info-row">
            <span className="info-label">Total Amount</span>
            <FunctionField
              render={record => (
                <span className="total-value">
                  {new Intl.NumberFormat('vi-VN').format(record.total_amount)} VNĐ
                </span>
              )}
            />
          </div>
          <div className="info-row">
            <span className="info-label">Order Date</span>
            <DateField source="createdAt" showTime className="info-value" />
          </div>
          <div className="info-row">
            <span className="info-label">Last Updated</span>
            <DateField source="updatedAt" showTime className="info-value" />
          </div>
        </div>
      </div>

      {/* Items Card */}
      <div className="order-card-v2">
        <h3 className="card-title-v2">Items</h3>
        <ArrayField source="items">
          <Datagrid bulkActionButtons={false} className="items-table-clean">
            <FunctionField
              label="Product"
              render={record => {
                if (!record.product_id) {
                  return <span className="product-deleted">Product Deleted</span>;
                }
                if (record.product_id?.name) {
                  return record.product_id.name;
                }
                if (typeof record.product_id === 'string' && record.product_id) {
                  return `ID: ${record.product_id.substring(0, 8)}...`;
                }
                if (record.product_id?._id) {
                  return `ID: ${record.product_id._id.substring(0, 8)}...`;
                }
                return <span className="product-deleted">Unknown Product</span>;
              }}
            />
            <FunctionField
              label="Unit Price"
              render={record => (
                <span>{new Intl.NumberFormat('vi-VN').format(record.unit_price)} VNĐ</span>
              )}
            />
            <NumberField source="quantity" label="Qty" />
            <FunctionField
              label="Subtotal"
              render={record => (
                <span className="subtotal-value">
                  {new Intl.NumberFormat('vi-VN').format(record.unit_price * record.quantity)} VNĐ
                </span>
              )}
            />
          </Datagrid>
        </ArrayField>
      </div>
    </SimpleShowLayout>
  </Show>
);

// EDIT: chỉ cho đổi status
const OrderEditToolbar = props => (
  <Toolbar {...props}>
    <SaveButton />
  </Toolbar>
);

export const OrderEdit = (props) => (
  <Edit {...props}>
    <SimpleForm toolbar={<OrderEditToolbar />}>
      <SelectInput source="status" choices={statusChoices} />
    </SimpleForm>
  </Edit>
);
