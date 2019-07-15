import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { fetchTotalAmount } from '../../actions'

import Payment from '../Payment';


class CheckoutSummary extends Component {
    render() {
        return (
            <div className="ui container" style={{ marginTop: '100px' }}>
                Table

                {console.log(this.props.form)}

                <Payment payableAmount={this.props.cart.totalAmount} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return state
}

const getTotal = connect(mapStateToProps, { fetchTotalAmount })(CheckoutSummary)

export default reduxForm({
    form: 'checkoutForm',
    destroyOnUnmount: false
})(getTotal)


