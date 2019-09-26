import React, {Component} from 'react';
import Header from "./Header";
import Footer from "./Footer";
import AdminBar from "./AdminBar";

class AdminDashboard extends Component{
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
                                    Witaj w panelu administracyjnym
                                </h2>
                            </div>
                        </div>

                    </div>
                    <Footer/>
                </div>
            </React.Fragment>
        );
    };
}

export default AdminDashboard;