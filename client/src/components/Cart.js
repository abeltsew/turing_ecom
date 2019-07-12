import React, { Component } from 'react'
import { connect } from 'react-redux'


class Cart extends Component {

    getTotals() {
        let totals = 0
        this.props.cart.map(item => totals = totals + item.subtotal

        )

        return totals
    }

    // <img src={`https://backendapi.turing.com/images/products/${item.thumbnail}`} alt={item.name} />

    renderBody = () => {
        return this.props.cart.map((item, i) => {
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
            <div className="ui container" style={{ marginTop: '50px' }}>
                <div className="ui grid">
                    <div className="eight wide column">

                        {
                            this.props.cart.length ?
                                <div>
                                    <table className="ui celled table">
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
                                                <th>{this.getTotals()}</th>
                                            </tr></tfoot>
                                    </table>
                                    <button className="ui red button" style={{ float: 'right' }}>Proceed To Checkout</button>
                                </div>
                                :
                                "Cart is empty"
                        }

                    </div>
                    <div className="eight wide column">


                    </div>
                </div>

            </div>
        )
    }
}
const mapStateToProps = state => {
    console.log(state)
    return state
}

export default connect(mapStateToProps)(Cart)
