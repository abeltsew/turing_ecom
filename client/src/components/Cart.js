import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteCartItem, getCart, fetchTotalAmount } from '../actions'
import AUX from '../hoc/Aux'


class Cart extends Component {

    handleRemoveItem = (item_id) => {
        this.props.deleteCartItem(item_id)
        this.props.getCart(window.localStorage.getItem('client_id'))
        this.props.fetchTotalAmount(window.localStorage.getItem('client_id'))

    }

    // getTotals() {
    //     let totals = 0
    //     this.props.cart.cart.map(item => totals = totals + item.subtotal

    //     )

    //     return totals.toFixed(2)
    // }

    // <img src={`https://backendapi.turing.com/images/products/${item.thumbnail}`} alt={item.name} />

    renderBody = () => {
        return this.props.cart.cart.map((item, i) => {
            return <tr key={i}>
                <td data-label="Item">{i + 1}</td>
                <td data-label="Item">{item.name} <br></br></td>
                <td data-label="Price">{item.price}</td>
                <td data-label="Quantity">{item.quantity}</td>
                <td data-label="color">{item.attributes.split(' ')[0]}</td>
                <td data-label="Size">{item.attributes.split(' ')[1]}</td>
                <td data-label="Total">{item.subtotal}</td>
                <td data-label="remove"><button className="ui red button" onClick={() => this.handleRemoveItem(item.item_id)}><i className="remove icon"></i></button></td>
            </tr>
        })
    }


    render() {
        return (
            // <div className="ui container" style={{ marginTop: '50px' }}>
            //     <div className="ui grid">
            //         <div className="eight wide column">
            <AUX>
                {
                    this.props.cart.cart.length ?
                        <div>
                            <table className="ui red celled table">
                                <thead>
                                    <tr><th>No.</th>
                                        <th>Item</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>color</th>
                                        <th>Size</th>
                                        <th>Total</th>
                                        <th>Remove</th>

                                    </tr></thead>
                                <tbody>
                                    {this.renderBody()}
                                </tbody>
                                <tfoot>
                                    <tr><th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>

                                        <th>Grand Total</th>
                                        <th>{this.props.cart.totalAmount}</th>
                                        <th></th>
                                    </tr></tfoot>
                            </table>
                            <Link to="/checkout" className="ui red button" style={{ float: 'right' }}>Proceed To Checkout</Link>
                        </div>
                        :
                        "Cart is empty"
                }


            </AUX>
        )
    }
}
const mapStateToProps = state => {
    console.log(state)
    return state
}

export default connect(mapStateToProps, { deleteCartItem, getCart, fetchTotalAmount })(Cart)
