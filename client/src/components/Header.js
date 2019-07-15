import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart, getCart, getUniqueCartID, fetchTotalAmount } from './../actions'
import Cart from './Cart';
import Aux from '../hoc/Aux';

import { logoutUser } from '../actions/authActions'

class Header extends Component {
    componentDidMount() {
        if (window.localStorage.getItem('client_id') === null) {
            window.localStorage.setItem('client_id', new Date().valueOf())
        }
        this.props.getCart(window.localStorage.getItem('client_id'))
        console.log(window.localStorage.getItem('client_id'))
        this.props.fetchTotalAmount(window.localStorage.getItem('client_id'))
    }

    onLogoutClick = (e) => {
        e.preventDefault();
        this.props.logoutUser();
    }


    render() {
        return (

            <div className="ui secondary menu inverted red fixed" >
                <Link to="/" className=" item">Home</Link>

                <div className="right menu">

                    <div >
                        <div className="ui simple dropdown item">
                            <Link to="/cart" className="ui item ">
                                <i className="cart icon"></i> {this.props.cart.cart.length} items - {this.props.cart.totalAmount ? this.props.cart.totalAmount : '0.00'}$
                            </Link>
                            <div className="menu">
                                <Cart />
                            </div>

                        </div>
                    </div>


                    {this.props.auth.isAuthenticated ?
                        <Link to="/logout" onClick={this.onLogoutClick} className="ui item">
                            Logout
                        </Link>
                        :
                        <Aux>
                            <Link to="/login" className="ui item">
                                Login
                                </Link>
                            <Link to="/register" className="ui item">
                                Register
                            </Link>
                        </Aux>
                    }
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return state
}

export default connect(mapStateToProps, { addToCart, getCart, getUniqueCartID, logoutUser, fetchTotalAmount })(Header)
