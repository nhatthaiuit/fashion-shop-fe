import {
    List, Datagrid, TextField, NumberField, EditButton,
    Edit, SimpleForm, TextInput, NumberInput, Create,
    Toolbar, SaveButton, required, SelectInput,
    ArrayInput, SimpleFormIterator, ImageField, FunctionField,
    TextInput as FilterTextInput, SelectInput as FilterSelectInput
} from 'react-admin';
import { StockField } from '../components/StockField';
import { productExporter } from '../components/CustomExporter';
import { CustomListActions } from '../components/CustomListActions';
import '../styles/AdminStyles.css';

const ProductToolbar = (props) => (
    <Toolbar {...props}>
        <SaveButton alwaysEnable />
    </Toolbar>
);

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
        filters={productFilters}
        exporter={productExporter}
        actions={<CustomListActions />}
    >
        <Datagrid bulkActionButtons={<></>}>
            <FunctionField
                label="ID"
                render={record => record._id ? record._id.substring(0, 8) + '...' : ''}
            />
            <ImageField source="image" label="Image" />
            <TextField source="product_name" label="Product Name" />
            <NumberField source="price" />
            <StockField source="count_in_stock" label="Stock" />
            <EditButton />
        </Datagrid>
    </List>
);



export const ProductEdit = (props) => (
    <Edit {...props}>
        <SimpleForm toolbar={<ProductToolbar />}>
            <TextInput source="product_name" label="Product Name" validate={[required()]} />
            <NumberInput source="price" validate={[required()]} />
            <SelectInput source="category" choices={[
                { id: 'Top', name: 'Top' },
                { id: 'Bottom', name: 'Bottom' },
                { id: 'Accessories', name: 'Accessories' },
                { id: 'Sale', name: 'Sale' },
            ]} validate={[required()]} />

            <ArrayInput source="sizes" label="Sizes" validate={[required()]}>
                <SimpleFormIterator inline>
                    <SelectInput source="label" choices={[
                        { id: 'XS', name: 'XS' },
                        { id: 'S', name: 'S' },
                        { id: 'M', name: 'M' },
                        { id: 'L', name: 'L' },
                        { id: 'XL', name: 'XL' },
                        { id: 'XXL', name: 'XXL' },
                    ]} validate={[required()]} />
                    <NumberInput source="stock" label="Stock" min={0} defaultValue={0} validate={[required()]} />
                </SimpleFormIterator>
            </ArrayInput>

            <TextInput source="image" fullWidth validate={[required()]} />
            <TextInput source="description" multiline rows={4} fullWidth />
        </SimpleForm>
    </Edit>
);


export const ProductCreate = (props) => (
    <Create {...props}>
        <SimpleForm toolbar={<ProductToolbar />}>
            <TextInput source="product_name" label="Product Name" validate={[required()]} />
            <NumberInput source="price" validate={[required()]} />
            <SelectInput source="category" choices={[
                { id: 'Top', name: 'Top' },
                { id: 'Bottom', name: 'Bottom' },
                { id: 'Accessories', name: 'Accessories' },
                { id: 'Sale', name: 'Sale' },
            ]} validate={[required()]} />

            <ArrayInput source="sizes" label="Sizes" validate={[required()]}>
                <SimpleFormIterator inline>
                    <SelectInput source="label" choices={[
                        { id: 'XS', name: 'XS' },
                        { id: 'S', name: 'S' },
                        { id: 'M', name: 'M' },
                        { id: 'L', name: 'L' },
                        { id: 'XL', name: 'XL' },
                        { id: 'XXL', name: 'XXL' },
                    ]} validate={[required()]} />
                    <NumberInput source="stock" label="Stock" min={0} defaultValue={0} validate={[required()]} />
                </SimpleFormIterator>
            </ArrayInput>

            <TextInput source="image" fullWidth validate={[required()]} />
            <TextInput source="description" multiline rows={4} fullWidth />
        </SimpleForm>
    </Create>
);