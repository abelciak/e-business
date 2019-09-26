import Header from "./Header";
import React, {Component} from 'react';
import Footer from "./Footer";
import AdminBar from "./AdminBar";
import Popup from "./Popup";

class AdminProductsAdd extends Component{

    constructor() {
        super();
        this.state = {
            showPopup: false,
            productName: "",
            productDescription: "",
            productPrice: "",
        };
    }

    componentDidMount() {

    }

    addProduct() {
        const url = global.url+"/products/add";
        fetch(url, {
            method: 'POST',
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
            this.addProduct();

        }

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }
    handleChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        return (
            <React.Fragment>
                <div id="container">
                    <Header/>
                    <div id="content">
                        <AdminBar />
                        <div id="side">
                            <div id="side-inner">
                                <h2>
                                    Dodaj produkt
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
                                    <button className="button-details">Dodaj produkt</button>
                                    {this.state.showPopup ?
                                        <Popup
                                            text='Produkt został dodany'
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
        );
    }
}

export default AdminProductsAdd;