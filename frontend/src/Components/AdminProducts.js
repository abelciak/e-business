import React, {Component} from 'react';
import Header from "./Header";
import AdminBar from "./AdminBar";
import Footer from "./Footer";
import {NavLink} from "react-router-dom";

class AdminProducts extends Component{

    constructor() {
        super();
        this.state = {
            productsList: []
        };
    }

    componentDidMount() {
        var url = global.url+"/products/all";
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
                console.log("Result products: "+results);
                return results.json();
            }).then(results => {
            this.setState({productsList: results})
        })
    }

    productDelete(idProduct) {
        const url = global.url+"/products/delete/"+idProduct;
        fetch(url, {
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
            },
            method: 'DELETE',
        });
    }
    handleProductDelete (idProduct) {
        console.log("Get request to delete id "+idProduct);
        return event => {
            event.preventDefault();
            this.productDelete(idProduct);
            console.log("Delete id "+idProduct);
            let filteredArray = this.state.productsList.filter(item => idProduct !== item.productId)
            this.setState({productsList: filteredArray})
        }
    }

    render() {

        let products = this.state.productsList.map((product) => {
            return (
                <tbody>
                <tr key={product.productId}>
                    <td>{product.productId}</td>
                    <td>{product.productName}</td>
                    <td>{product.productDescription}</td>
                    <td>{product.productPrice} zł</td>
                    <td>
                        <React.Fragment>
                        <NavLink className="button-details button-action" to={"/admin/products/edit/"+product.productId}>Edytuj</NavLink>
                        <button className="button-details button-red" onClick={this.handleProductDelete(product.productId)}>Usuń</button>
                        </React.Fragment>
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
                        <div><NavLink className="button-details" to={"/admin/products/add"}>Dodaj produkt</NavLink></div>
                        <div id="side">
                            <div id="side-inner">
                                <table id='details'>
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Produkt</th>
                                        <th>Opis</th>
                                        <th>Cena</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    {products}
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

export default AdminProducts;