import React, { Component } from 'react'
import CheckoutForm from './CheckoutForm';
import CheckoutSummary from './CheckoutSummary';

class Checkout extends Component {
    state = {
        page: 1,
        order_id: null,
        amount: null
    }

    onChangePage = (page, order_id, amount) => {
        this.setState({ page, order_id, amount })
    }
    render() {
        return (
            <div>
                {this.state.page === 1 ?
                    <CheckoutForm changePage={this.onChangePage} /> :
                    <CheckoutSummary />
                }

            </div>
        )
    }
}

export default Checkout
