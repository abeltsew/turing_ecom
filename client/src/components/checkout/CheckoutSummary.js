import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { fetchTotalAmount, getCart, fetchOrderByID } from '../../actions'

import Payment from '../Payment';



class CheckoutSummary extends Component {
    //fetch order detail and total
    componentDidMount() {
        this.props.fetchOrderByID(this.props.order.orderDetail.order_id)
    }
    // push user to thank you page
    componentDidUpdate() {
        if (this.props.order.orderPlaced !== null) {
            const cart_id = window.localStorage.getItem('client_id')
            this.props.getCart(cart_id)
            this.props.fetchTotalAmount(window.localStorage.getItem('client_id'))
            this.props.changePage(3)
        }
    }

    renderBody = () => {
        return this.props.order.orders.map((item, i) => {
            return <tr key={i}>
                <td data-label="Item">{i + 1}</td>
                <td data-label="Item">{item.product_name} <br></br></td>
                <td data-label="Price">{item.unit_cost}</td>
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
                            <th>{this.props.order.orderDetail.totalAmount}</th>
                            <th></th>
                        </tr></tfoot>
                </table>
                <div style={{ float: 'right' }}>
                    {/* pass total amount to charge and orderid */}
                    <Payment payableAmount={this.props.order.orderDetail.totalAmount} inOrderID={this.props.order.orderDetail.order_id} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return state
}

const getTotal = connect(mapStateToProps, { getCart, fetchTotalAmount, fetchOrderByID })(CheckoutSummary)

export default reduxForm({
    form: 'checkoutForm',
    destroyOnUnmount: false
})(getTotal)


