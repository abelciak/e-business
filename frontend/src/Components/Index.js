import Header from "./Header";
import React, {Component} from 'react';
import Footer from "./Footer";
import {NavLink} from "react-router-dom";

class Index extends Component {
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

    render() {

        let products = this.state.productsList.map((product) => {
            return (
                <React.Fragment>
                    <div className="card">
                        <h2>{product.productName}</h2>
                        <p className="price">{product.productPrice} zł</p>
                        <p>{product.productDescription}</p>
                        <p>
                            <NavLink to={"/product/details/"+product.productId} ><button>Szczegóły</button></NavLink>
                        </p>
                    </div>
                </React.Fragment>
            )
        });

        return (
            <React.Fragment>
                <div id="container">
                    <Header/>
                    <div id="content">

                        <div id="side">
                            <div id="side-inner">
                                <h1>
                                    Produkty:
                                </h1><br />
                                <div id="wrapper">
                                {products}
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

export default Index;