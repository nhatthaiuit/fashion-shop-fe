import { List, Datagrid, TextField, NumberField, DateField, SelectInput, Edit, SimpleForm } from 'react-admin';


export const OrderList = (props) => (
<List {...props} perPage={20}>
<Datagrid rowClick="edit">
<TextField source="_id" label="ID" />
<TextField source="user.email" label="Customer" />
<NumberField source="total" />
<TextField source="status" />
<DateField source="createdAt" />
</Datagrid>
</List>
);


export const OrderEdit = (props) => (
<Edit {...props}>
<SimpleForm>
<TextField source="_id" />
<SelectInput source="status" choices={[
{ id: 'pending', name: 'pending' },
{ id: 'processing', name: 'processing' },
{ id: 'shipped', name: 'shipped' },
{ id: 'completed', name: 'completed' },
{ id: 'cancelled', name: 'cancelled' },
]} />
</SimpleForm>
</Edit>
);