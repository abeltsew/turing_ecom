import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import CheckoutField from './CheckoutField'
import { Link } from 'react-router-dom'
import fields from './checkoutFormFields'
import { addOrder } from '../../actions'
import { connect } from 'react-redux'


class CheckoutForm extends Component {

    renderFields = () => {

        return fields.map(field => (
            <div key={field.name}>
                <Field lable={field.lable} type="text" name={field.name} component={CheckoutField} />
            </div>
        )
        )
    }


    handleOrder = async () => {

        //chcek if the form is complete fore saving order
        if (Object.keys(this.props.form.checkoutForm).includes('syncErrors')) {
            alert('Please fill all the required fields')
        }
        else {
            // check if th user is logged in otherwise assign a customer id of 9999
            if (this.props.auth.isAuthenticated) {
                await this.props.addOrder(window.localStorage.getItem('client_id'), this.props.auth.user.id)
            } else {
                await this.props.addOrder(window.localStorage.getItem('client_id'), 9999)
            }



            setTimeout(() => {

                this.props.changePage(2)

            }, 2000)

        }


    }
    // handleOrder = async () => {
    //     if (this.props.cart.totalAmount === null) {
    //         this.props.history.push('/')
    //     } else {
    //         await this.props.addOrder(window.localStorage.getItem('client_id'), this.props.auth.user.id)
    //         this.props.history.push('/checkoutsummary')
    //     }

    // }

    render() {
        return (
            <div className="ui container" style={{ marginTop: "60px" }}>
                <form className="ui form segment">
                    {this.renderFields()}
                    < Link to='/' className="ui button red">
                        Continue Shopping </Link>
                    {/* {!Object.keys(this.props.form).includes('syncErrors') ? '' : */}
                    < Link
                        to='#'
                        className="ui button green"
                        onClick={this.handleOrder}
                    >
                        Proceed to payment
                    </Link>

                </form>

            </div>
        )
    }
}
const validate = (values) => {
    const errors = {}

    fields.forEach(({ name }) => {
        if (!values[name]) {
            errors[name] = `You Must Provide a ${[name]}`
        }
    })

    return errors
}

const mapStateToprops = state => {
    console.log(state)
    return state
}

const checkout = connect(mapStateToprops, { addOrder })(CheckoutForm)

export default reduxForm({
    validate,
    form: 'checkoutForm',
    destroyOnUnmount: false
})(checkout)
