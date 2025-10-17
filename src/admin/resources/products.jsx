import {
List, Datagrid, TextField, NumberField, EditButton,
Edit, SimpleForm, TextInput, NumberInput, Create,
Toolbar, SaveButton, required
} from 'react-admin';


const ProductToolbar = (props) => (
<Toolbar {...props}>
<SaveButton alwaysEnable />
</Toolbar>
);


export const ProductList = (props) => (
<List {...props} perPage={20}>
<Datagrid rowClick="edit">
<TextField source="_id" label="ID" />
<TextField source="name" />
<NumberField source="price" />
<NumberField source="countInStock" label="Stock" />
</Datagrid>
</List>
);


export const ProductEdit = (props) => (
<Edit {...props}>
<SimpleForm toolbar={<ProductToolbar />}>
<TextInput source="name" validate={[required()]} />
<NumberInput source="price" validate={[required()]} />
<NumberInput source="countInStock" label="Stock" />
<TextInput source="image" fullWidth />
<TextInput source="description" multiline rows={4} fullWidth />
</SimpleForm>
</Edit>
);


export const ProductCreate = (props) => (
<Create {...props}>
<SimpleForm toolbar={<ProductToolbar />}>
<TextInput source="name" validate={[required()]} />
<NumberInput source="price" validate={[required()]} />
<NumberInput source="countInStock" label="Stock" />
<TextInput source="image" fullWidth />
<TextInput source="description" multiline rows={4} fullWidth />
</SimpleForm>
</Create>
);