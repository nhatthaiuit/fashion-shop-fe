import { Admin, Resource } from "react-admin";
import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import { ProductList, ProductEdit, ProductCreate } from "./resources/products";
import { OrderList,OrderShow, OrderEdit } from "./resources/orders";

export default function AppAdmin() {
  return (
    <Admin
      basename="/admin"      // ✅ quan trọng
      dataProvider={dataProvider}
      authProvider={authProvider}
    >
      <Resource name="products" list={ProductList} edit={ProductEdit} create={ProductCreate} />
      <Resource name="orders"   list={OrderList} show={OrderShow}  edit={OrderEdit} />
    </Admin>
  );
}
