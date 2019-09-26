import Header from "./Header";
import React, {Component} from 'react';
import Footer from "./Footer";
import AdminBar from "./AdminBar";
import Popup from "./Popup";

class AdminProductsEdit extends Component{
    constructor(props, context) {
        super(props, context);
        console.log(props)
        this.state = {
            showPopup: false,
            idProduct: this.props.match.params.idProduct,
            productName: "",
            productDescription: "",
            productPrice: "",
        };
    }

    componentDidMount() {
        var url = global.url+"/products/"+this.state.idProduct;
        console.log ("Request to "+url);

        fetch(url, {
            mode: 'cors',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'http://localhost:3000',
            },
            method: 'GET',
        })
            .then(results => {
                console.log(results);
                return results.json();
            }).then(results => {
            this.setState({
                productName: results.productName,
                productDescription: results.productDescription,
                productPrice: results.productPrice,
            })
        })
    }

    updateProduct() {
        const url = global.url+"/products/edit/"+this.state.idProduct;
        fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productName: this.state.productName,
                productDescription: this.state.productDescription,
                productPrice: this.state.productPrice,
            })
        }).then(results => {
            console.log(results);
            return results.json();
        });
    }

    handleSubmit =
        event => {
            event.preventDefault();
            this.togglePopup();
            this.updateProduct();

        }

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }
    handleChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    render(){

        return(
            <React.Fragment>
                <div id="container">
                    <Header/>
                    <div id="content">
                        <AdminBar />
                        <div id="side">
                            <div id="side-inner">
                                <h2>
                                    Edycja produktu
                                </h2>
                                <form onSubmit={this.handleSubmit} className="add" method="none">
                                    <div>
                                        <label htmlFor="name">Nazwa produktu:</label>
                                        <input type="text" required id="productName" name="productName" value={this.state.productName} onChange={(e) => this.handleChange(e)} />
                                    </div>
                                    <div>
                                        <label htmlFor="mail">Cena:</label>
                                        <input type="number" required  id="productPrice" name="productPrice" value={this.state.productPrice} onChange={(e) => this.handleChange(e)} />
                                    </div>
                                    <div>
                                        <label htmlFor="msg">Opis produktu:</label>
                                        <textarea id="msg" required  name="productDescription" value={this.state.productDescription} onChange={(e) => this.handleChange(e)} ></textarea>
                                    </div><br />
                                    <button className="button-details">Edytuj produkt</button>
                                    {this.state.showPopup ?
                                        <Popup
                                            text='Produkt został zmieniony'
                                            url='/admin/products'
                                            closePopup={this.togglePopup.bind(this)}
                                        />
                                        : null
                                    }
                                </form>
                            </div>
                        </div>

                    </div>
                    <Footer/>
                </div>
            </React.Fragment>
        )
    }

}

export default AdminProductsEdit;