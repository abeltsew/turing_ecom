import React from 'react'

export default ({ input, lable, meta: { error, touched } }) => {
    return (
        <div className="field">
            <label>{lable}</label>
            <input {...input} style={{ marginBottom: '5px' }} placeholder={lable} />
            <div style={{ marginBottom: '20px', color: 'red' }}>
                {touched && error}
            </div>
        </div>
    )
}
