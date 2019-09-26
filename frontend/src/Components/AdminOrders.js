import React, {Component} from 'react';
import Header from "./Header";
import AdminBar from "./AdminBar";
import Footer from "./Footer";
import Moment from 'moment'

class AdminOrders extends Component{

    componentDidMount() {
        var url = global.url+"/orders/all";
        console.log("Request to "+url)
        fetch(url, {
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
            },
            method: 'GET',
        })
            .then(results => {
                console.log("Result orders: "+results);
                return results.json();
            }).then(results => {
            this.setState({ordersList: results})
        })
    }

    constructor() {
        super();
        this.state = {
            product:0,
            ordersList: []
        };
    }

    orderDelete(idOrder) {
        const url = global.url+"/orders/delete/"+idOrder;
        fetch(url, {
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
            },
            method: 'DELETE',
        });
    }
    handleOrderDelete (idOrder) {
        console.log("Get request to delete id "+idOrder);
        return event => {
            event.preventDefault();
            this.orderDelete(idOrder);
            console.log("Delete id "+idOrder);
            let filteredArray = this.state.ordersList.filter(item => idOrder !== item.orderId)
            this.setState({ordersList: filteredArray})
        }
    }

    orderChange(idOrder, orderStatus, orderDate, productId, orderQuantity, shippedDate, userId){
        console.log("Order change "+idOrder, orderStatus, orderDate, productId, orderQuantity, shippedDate, userId);
        const url = global.url+"/orders/edit/"+idOrder;
        fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                orderDate: Moment(orderDate).format('YYYY-MM-DD HH:mm:ss'),
                orderStatus: orderStatus,
                productId: productId,
                orderQuantity: orderQuantity,
                shippedDate: Moment(shippedDate).format('YYYY-MM-DD HH:mm:ss'),
                userId: userId
            })
        }).then(results => {
            console.log(results);
            return results.json();
        });
    }

    handleOrderChange (idOrder, orderStatus, orderDate, productId, orderQuantity, shippedDate, userId) {
        console.log("Get request to change id "+idOrder);
        console.log("Arguments id "+idOrder);
        console.log("Arguments status "+orderStatus);
        console.log("Arguments date "+orderDate);
        return event => {
            event.preventDefault();
            this.orderChange(idOrder, orderStatus, orderDate, productId, orderQuantity, shippedDate, userId);
            console.log("Change state");
            this.setState(prevState => ({
                ordersList: prevState.ordersList.map(
                    obj => (obj.orderId === idOrder ? Object.assign(obj, {orderStatus: orderStatus, shippedDate: shippedDate}) : obj)
                )
            }));
        }
    }

    render() {
        let orders = this.state.ordersList.map((order) => {
            console.log("Current product ID "+order.productId);

            return (
                <tbody>
                <tr key={order.orderId}>
                    <td>{order.orderId}</td>
                    <td>{Moment(order.orderDate).format('DD.MM.YYYY HH:mm:ss')}</td>
                    <td>{order.orderStatus===2  ? (
                        <b>{Moment(order.shippedDate).format('DD.MM.YYYY HH:mm:ss')}</b>
                    ) :
                        <b className="order-canceled">Produkt niewysłany</b>
                    }</td>
                    <td>
                        {order.orderStatus === 0 ? (
                            <p>
                                <b className="order-unconfirmed">Niepotwierdzone</b> <br />
                                <button className="button-details button-action" onClick={this.handleOrderChange(order.orderId, 1, order.orderDate, order.productId, order.orderQuantity, order.shippedDate, order.userId)}>Potwierdź</button>
                                <button className="button-details button-red" onClick={this.handleOrderChange(order.orderId, 3, order.orderDate, order.productId, order.orderQuantity, order.shippedDate, order.userId)}>Anuluj</button>
                            </p>
                            ) : order.orderStatus === 1 ? (
                            <p>
                                <b className="order-confirmed">Kompletowane</b> <br />
                                <button className="button-details button-green" onClick={this.handleOrderChange(order.orderId, 2, order.orderDate, order.productId, order.orderQuantity, Moment(new Date()).format('YYYY-MM-DD HH:mm:ss'), order.userId)}>Wyślij zamówienie</button>
                                <button className="button-details button-red" onClick={this.handleOrderChange(order.orderId, 3, order.orderDate, order.productId, order.orderQuantity, order.shippedDate, order.userId)}>Anuluj</button>
                            </p>
                            )
                            : order.orderStatus === 2 ? (
                                <b className="order-sended">Wysłane</b>
                            ) : order.orderStatus === 3 ? (
                                   <p>
                                    <b className="order-canceled">Anulowane</b> <br />
                                       <button className="button-details button-red" onClick={this.handleOrderDelete(order.orderId)}>Usuń</button>
                                   </p>
                            )   : ""
                        }

                    </td>
                  </tr>
                </tbody>
            )
        });


        return (
            <React.Fragment>
                <div id="container">
                    <Header/>
                    <div id="content">
                        <AdminBar />
                        <div id="side">
                            <div id="side-inner">
                                <table id='details'>
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Data zakupu</th>
                                        <th>Data wysyłki</th>
                                        <th>Status</th>
                                    </tr>
                                    </thead>
                                    {orders}
                                </table>
                            </div>
                        </div>

                    </div>
                    <Footer/>
                </div>
            </React.Fragment>
        );
    };
}

export default AdminOrders;