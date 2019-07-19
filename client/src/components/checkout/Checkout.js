import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import CheckoutForm from './CheckoutForm';
import CheckoutSummary from './CheckoutSummary';

class Checkout extends Component {

    state = {
        page: 1,
        order_id: null,
        amount: null
    }
    // making sure component will not load with empty cart
    componentDidMount() {
        if (this.props.cart.cart.length === 0 && this.state.page !== 3) {
            this.props.history.push('/')
        }

    }
    // get page navigation from checkput form and and summary 
    onChangePage = (page, order_id, amount) => {
        this.setState({ page, order_id, amount })
    }

    renderForm = () => {
        if (this.state.page === 1) {
            return <CheckoutForm changePage={this.onChangePage} />
        } else if (this.state.page === 2) {
            return <CheckoutSummary changePage={this.onChangePage} />
        }
        else {
            return <div style={{ marginTop: "150PX" }}>
                {/* Thank you page after successfull payment */}
                <div className="ui stackable very relaxed center aligned grid container">
                    <div className="row">
                        <div className="twelve wide column">
                            <h1 className="ui header">Thank you for your Purchase </h1>
                            <p>we Look forward to serving you again in the Future.</p>
                            <Link
                                to='/'
                            >Continue shopping</Link>

                        </div>
                    </div>
                </div>


            </div>
        }

    }
    render() {
        return (
            <div>
                {this.renderForm()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return state
}

export default connect(mapStateToProps)(Checkout)



// render() {
//     return (
//         <div>
//             {this.state.page === 1 ?
//                 <CheckoutForm changePage={this.onChangePage} /> :
//                 <CheckoutSummary />
//             }

//         </div>
//     )
// }