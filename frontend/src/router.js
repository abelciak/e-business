import React from 'react';
import { Route } from 'react-router-dom';
import Index from "./Components/Index";
import ProductDetails from "./Components/ProductDetails";
import AdminDashboard from "./Components/AdminDashboard";
import AdminProducts from "./Components/AdminProducts";
import AdminProductsAdd from "./Components/AdminProductsAdd";
import AdminProductsEdit from "./Components/AdminProductsEdit";
import AdminOrders from "./Components/AdminOrders";
import AdminUsers from "./Components/AdminUsers";
import OrdersMy from "./Components/OrdersMy";

export default (
    <React.Fragment>​
        <Route exact path="/" component={Index} myname={"Index page"}/>
        <Route path="/product/details/:idProduct" component={ProductDetails} name ={"Product details"} />
        <Route path="/admin/dashboard" component={AdminDashboard} name ={"Control panel"} />
        <Route path="/orders" component={OrdersMy} name ={"My orders"} />
        <Route exact path="/admin/products" component={AdminProducts} name ={"Products manage"} />
        <Route exact path="/admin/orders" component={AdminOrders} name ={"Orders manage"} />
        <Route exact path="/admin/users" component={AdminUsers} name ={"Users manage"} />
        <Route exact path="/admin/products/add" component={AdminProductsAdd} name ={"Product add"} />
        <Route exact path="/admin/products/edit/:idProduct" component={AdminProductsEdit} name ={"Product edit"} />
    </React.Fragment>
);