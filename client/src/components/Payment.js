import React, { Component } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { connect } from 'react-redux'
import * as actions from '../actions'

class Payment extends Component {
    render() {
        return (
            <div>
                < StripeCheckout
                    amount={this.props.payableAmount * 100}
                    token={token => this.props.handleToken({
                        token,
                        amount: this.props.payableAmount * 100,
                        inOrderID: this.props.inOrderID
                    })}
                    stripeKey='pk_test_NcwpaplBCuTL6I0THD44heRe'
                    name="Tshirt-Shop"
                    description="payment for Items"
                >
                    <button className="ui button green">MAKE PAYMENT</button>
                </ StripeCheckout>
            </div>
        )
    }
}

export default connect(null, actions)(Payment)