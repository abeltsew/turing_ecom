import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import CheckoutField from './CheckoutField'
import { Link } from 'react-router-dom'
import fields from './checkoutFormFields'

class CheckoutForm extends Component {
    renderFields = () => {

        return fields.map(field => (
            <div key={field.name}>
                <Field lable={field.lable} type="text" name={field.name} component={CheckoutField} />
            </div>
        )
        )
    }

    render() {
        return (
            <div className="ui container" style={{ marginTop: "60px" }}>
                <form className="ui form segment">
                    {this.renderFields()}
                    < Link to='/' className="ui button red">
                        Continue Shopping </Link>
                    < Link
                        to='/checkoutsummary'
                        className="ui button green"
                        onClick={this.handleOrder}
                    >
                        Proceed to payment </Link>
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

export default reduxForm({
    validate,
    form: 'checkoutForm',
    destroyOnUnmount: false
})(CheckoutForm)
