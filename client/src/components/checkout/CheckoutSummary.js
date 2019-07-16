import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { fetchTotalAmount, getCart } from '../../actions'

import Payment from '../Payment';




class CheckoutSummary extends Component {
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
            </tr>
        })
    }
    render() {
        return (
            <div className="ui container" style={{ marginTop: "100px" }}>
                <h1 className="ui header center aligned">Invoice summary </h1>
                <table className="ui red celled table">
                    <thead>
                        <tr><th>No.</th>
                            <th>Item</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>color</th>
                            <th>Size</th>
                            <th>Total</th>

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
                <div style={{ float: 'right' }}>
                    {/* Not working for unSigned in users */}
                    <Payment payableAmount={this.props.cart.totalAmount} customerID={this.props.auth.user.id} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return state
}

const getTotal = connect(mapStateToProps, { getCart, fetchTotalAmount })(CheckoutSummary)

export default reduxForm({
    form: 'checkoutForm',
    destroyOnUnmount: false
})(getTotal)


