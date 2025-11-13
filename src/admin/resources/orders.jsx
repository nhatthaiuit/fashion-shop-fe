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
} from "react-admin";

const statusChoices = [
  { id: "pending",    name: "pending" },
  { id: "processing", name: "processing" },
  { id: "shipped",    name: "shipped" },
  { id: "completed",  name: "completed" },
  { id: "cancelled",  name: "cancelled" },
];

// LIST: /admin/orders
export const OrderList = (props) => (
  <List {...props} perPage={20} sort={{ field: "createdAt", order: "DESC" }}>
    <Datagrid rowClick="show">
      <TextField   source="id" />
      <NumberField source="total_amount" label="Total" />
      <TextField   source="customer_name" label="Name" />
      <TextField   source="phone" label="Phone" />
      <TextField   source="shipping_address" label="Address" />
      <TextField   source="status" />
      <DateField   source="createdAt" showTime label="Created at" />
    </Datagrid>
  </List>
);

// SHOW: /admin/orders/:id/show
export const OrderShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      {/* Thông tin cơ bản của đơn */}
      <TextField   source="id" />
      <TextField   source="status" />
      <NumberField source="total_amount" label="Total" />
      <TextField   source="customer_name" label="Name" />
      <TextField   source="phone" label="Phone" />
      <TextField   source="shipping_address" label="Address" />
      <DateField   source="createdAt" showTime label="Created at" />
      <DateField   source="updatedAt" showTime label="Updated at" />

      {/* Danh sách mặt hàng khách đặt */}
      <ArrayField source="items">
        <Datagrid bulkActionButtons={false}>
          {/* do BE đã populate, nên đọc được product_id.name */}
          <TextField   source="product_id.name" label="Product" />
          <NumberField source="unit_price" label="Price" />
          <NumberField source="quantity" />
        </Datagrid>
      </ArrayField>
    </SimpleShowLayout>
  </Show>
);

// EDIT: chỉ cho đổi status
export const OrderEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <SelectInput source="status" choices={statusChoices} />
    </SimpleForm>
  </Edit>
);
