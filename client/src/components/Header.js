import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart, getCart, getUniqueCartID } from './../actions'
import Cart from './Cart';

class Header extends Component {
    componentDidMount() {
        if (window.localStorage.getItem('client_id') === null) {
            window.localStorage.setItem('client_id', new Date().valueOf())
        }
        this.props.getCart(window.localStorage.getItem('client_id'))
        console.log(this.props.cart_id)
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
                        <div class="ui simple dropdown item">
                            <Link to="/cart" className="ui item ">
                                <i className="cart icon"></i> {this.props.cart.length}
                            </Link>
                            <div class="menu">
                                <Cart />
                            </div>
                        </div>
                    </div>
                    <Link to="#" className="ui item">
                        Logout
                    </Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return state
}

export default connect(mapStateToProps, { addToCart, getCart, getUniqueCartID })(Header)
