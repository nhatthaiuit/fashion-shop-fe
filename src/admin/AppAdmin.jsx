import { Admin, Resource, defaultTheme } from "react-admin";
import { Navigate } from "react-router-dom";
import InventoryIcon from '@mui/icons-material/Inventory';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { AdminLayout } from "./components/AdminLayout";
import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import { ProductList, ProductEdit, ProductCreate } from "./resources/products";
import { OrderList, OrderShow, OrderEdit } from "./resources/orders";
import "./styles/AdminStyles.css";


const OrderIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z" />
  </svg>
);



const CustomLogin = () => <Navigate to="/login" replace />;

const myTheme = {
    ...defaultTheme,
    palette: {
        mode: 'light',
        primary: { main: '#000000' },
        secondary: { main: '#000000' },
    }
};

export default function AppAdmin() {
  return (
    <Admin
      theme={myTheme}
      basename="/admin"
      layout={AdminLayout}
      dataProvider={dataProvider}
      authProvider={authProvider}
      loginPage={CustomLogin}
    >
      <Resource
        name="products"
        list={ProductList}
        edit={ProductEdit}
        create={ProductCreate}
        icon={InventoryIcon}
      />
      <Resource
        name="orders"
        list={OrderList}
        show={OrderShow}
        edit={OrderEdit}
        icon={ReceiptIcon}
      />
    </Admin>
  );
}
