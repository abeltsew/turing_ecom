import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart, getCart, getUniqueCartID } from './../actions'
import Cart from './Cart';
import Aux from '../hoc/Aux';

import { logoutUser } from '../actions/authActions'

class Header extends Component {
    componentDidMount() {
        if (window.localStorage.getItem('client_id') === null) {
            window.localStorage.setItem('client_id', new Date().valueOf())
        }
        this.props.getCart(window.localStorage.getItem('client_id'))
        console.log(this.props.products.cart_id)
    }

    onLogoutClick = (e) => {
        e.preventDefault();
        this.props.logoutUser();
    }


    render() {
        return (

            <div className="ui secondary menu inverted red fixed" >
                <Link to="/" className=" item">Home</Link>
                <Link to="#" className="item">
                    Messages
  </Link>

                <Link to="#" className="item">
                    Friends
                 </Link>

                <div className="right menu">
                    <div className="item">
                        <div className="ui icon input">
                            <input type="text" placeholder="Search..." />
                            <i className="search link icon"></i>
                        </div>
                    </div>
                    <div >
                        <div className="ui simple dropdown item">
                            <Link to="/cart" className="ui item ">
                                <i className="cart icon"></i> {this.props.cart.cart.length}
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

export default connect(mapStateToProps, { addToCart, getCart, getUniqueCartID, logoutUser })(Header)
