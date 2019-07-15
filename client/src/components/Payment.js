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
                    token={token => this.props.handleToken(token)}
                    stripeKey='pk_test_eroJmnmmmEVOIfMWsxwqXbw400Vl9Mfeha'
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