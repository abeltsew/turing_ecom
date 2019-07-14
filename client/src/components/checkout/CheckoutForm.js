import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import CheckoutField from './CheckoutField'
import { Link } from 'react-router-dom'
import fields from './checkoutFormFields'

import Payment from '../Payment';


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
                <form >
                    {this.renderFields()}
                    < Link to='/' className="red btn-flat white-text">
                        Continue Shopping </Link>
                    <button>submit</button>
                </form>
                <Payment />
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
