import React from 'react'
import Cart from './Cart';

const CartShow = () => {
    return (
        <div className="ui container" style={{ marginTop: '100px' }}>
            <div className="ui grid">
                <div className="eight wide column">
                    <Cart />
                </div>
            </div>
        </div>
    )
}
export default CartShow