import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import Payment from '../Payment';


class CheckoutSummary extends Component {
    render() {
        return (
            <div className="ui container" style={{ marginTop: '100px' }}>
                Table

                {console.log(this.props.form)}

                <Payment />
            </div>
        )
    }
}


export default reduxForm({
    form: 'checkoutForm',
    destroyOnUnmount: false
})(CheckoutSummary)


