import React, {Component} from 'react';
import Header from "./Header";
import Footer from "./Footer";
import {NavLink} from "react-router-dom";
import Moment from 'moment'

class OrdersMy extends Component{

    componentWillMount() {
        var url = global.url+"/orders/user/"+global.userId;
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


    render() {
        let orders = this.state.ordersList.map((order) => {
            return (
                <tbody>
                <tr key={order.orderId}>
                    <td>{order.orderId}</td>
                    <td>{Moment(order.orderDate).format('DD.MM.YYYY HH:mm:ss')}</td>
                    <td><NavLink className="no-decoration" to={"/product/details/"+order.productId}>Szczegóły</NavLink> ({order.orderQuantity} sztuk)</td>
                    <td>{order.orderStatus===2  ? (
                            <b>{Moment(order.shippedDate).format('DD.MM.YYYY HH:mm:ss')}</b>
                        ) :
                        <b className="order-canceled">Produkt niewysłany</b>
                    }</td>
                    <td>
                        {order.orderStatus === 0 ? (
                            <p>
                                <b className="order-unconfirmed">Oczekuje na potwierdzenie</b> <br />
                            </p>
                        ) : order.orderStatus === 1 ? (
                                <p>
                                    <b className="order-confirmed">Zamówienie w toku</b> <br />
                                </p>
                            )
                            : order.orderStatus === 2 ? (
                                <b className="order-sended">Zamówienie wysłane</b>
                            ) : order.orderStatus === 3 ? (
                                <p>
                                    <b className="order-canceled">Zamówienie anulowane</b> <br />
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
                         <div id="side">
                            <div id="side-inner">
                                <table id='details'>
                                    <thead>
                                    <tr>
                                        <th>Numer zamówienia</th>
                                        <th>Data zakupu</th>
                                        <th>Produkt</th>
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

export default OrdersMy;