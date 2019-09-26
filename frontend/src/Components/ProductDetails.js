import Header from "./Header";
import React, {Component} from 'react';
import Footer from "./Footer";
import Popup from "./Popup";
import {NavLink} from "react-router-dom";

class ProductDetails extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            product: 0,
            price:1,
            orderQuantity: 1,
            idProduct: this.props.match.params.idProduct
        };
    }
    componentDidMount() {
        var url = global.url+"/products/"+this.state.idProduct;
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
                console.log("Result product: "+results);
                return results.json();
            }).then(results => {
            this.setState({product: results})
            this.setState({price: results.productPrice})
        })
    }

    handleSubmit =
        event => {
            event.preventDefault();
            this.togglePopup();
            this.addOrder();
        }

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }
    handleChange(e){
        this.setState({price: Number(this.state.product.productPrice*this.state.orderQuantity+this.state.product.productPrice).toFixed(2)})
        this.setState({[e.target.name]: e.target.value})

    }

    addOrder() {
        var currentDate=new Date().toISOString().slice(0, 19).replace('T', ' ')
        var shippedDate=new Date(0).toJSON().slice(0, 19).replace('T', ' ');
        console.log( "Add Order Product = "+this.state.idProduct+ " with quantity "+this.state.orderQuantity+ " on date "+currentDate+" and set shipped "+shippedDate);
        const url = global.url + "/orders/add";
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                orderDate: currentDate,
                productId: this.state.idProduct,
                orderQuantity: this.state.orderQuantity,
                shippedDate: shippedDate,
                orderStatus: 0,
                userId: global.userId
            })
        }).then(results => {
            console.log(results);
            return results.json();
        });
    }

    render() {

        return (
            <React.Fragment>
                <div id="container">
                    <Header/>
                    <div id="content">

                        <div id="side">
                            <div id="side-inner">

                                <h1>
                                    Szczegóły produktu:
                                </h1>
                                <div id="wrapper">
                                <div className="card">
                                    <h2>{this.state.product.productName}</h2>
                                    <p className="price">{this.state.product.productPrice} zł</p>
                                    <p>{this.state.product.productDescription}</p>

                                        <form onSubmit={this.handleSubmit}  method="none">
                                            <div>
                                                <label htmlFor="mail">Ilość sztuk: </label>
                                                <input type="number" required  id="orderQuantity" min="1" max="10" name="orderQuantity" value={this.state.orderQuantity} onChange={(e) => this.handleChange(e)} />
                                            </div>
                                            <br />
                                            {global.userId===0 ?
                                                (
                                                    <React.Fragment>
                                                    <b className="order-unconfirmed">Zaloguj się aby zamówić</b><br />
                                                    </React.Fragment>
                                                )
                                            : (

                                            <button className="button-details">Zamów ({this.state.price} zł)</button>

                                                )}
                                            {this.state.showPopup ?
                                                <Popup
                                                    text='Produkt zamówiony'
                                                    url='/'
                                                    closePopup={this.togglePopup.bind(this)}
                                                />
                                                : null
                                            }


                                        </form>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className="clear"></div>
                    </div>
                    <Footer/>
                </div>
            </React.Fragment>
        );
    };

}

export default ProductDetails;