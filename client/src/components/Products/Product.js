import React, { Component } from 'react'
import { connect } from 'react-redux'

import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';

import { fetchProduct, fetchProductsAttribute, addToCart, getCart, fetchTotalAmount } from '../../actions'
import Aux from '../../hoc/Aux'
import Cart from '../Cart';

class Product extends Component {

    state = {
        previewItem: 'image',
        color: [],
        size: [],
        selectedColor: null,
        selectedSize: null,
        quantity: 1
    }
    //initialize product with attribute
    componentDidMount() {
        this.props.fetchProduct(this.props.match.params.id)
        this.props.fetchProductsAttribute(this.props.match.params.id)
    }
    // get options for color and size for the product selected
    componentWillReceiveProps(nextProp) {
        this.setState({
            color: [],
            size: [],
            quantity: 1,
            selectedColor: null,
            selectedSize: null

        })
        //extract color and size to their own state value
        nextProp.products.productAttribute.map(attribute => {
            if (attribute.attribute_name === "Color") {
                this.setState(prevState => {
                    return {
                        color: [...prevState.color, attribute.attribute_value]
                    }
                })
            } else if (attribute.attribute_name === "Size") {
                this.setState(prevState => {
                    return {
                        size: [...prevState.size, attribute.attribute_value]
                    }
                })
            }
            return null
        }

        )
    }



    renderColor = () => {
        return this.state.color.map((color, i) => {
            return (
                <Aux key={i}>
                    <button
                        onClick={() => this.setState({ selectedColor: color.toLowerCase() })}
                        className={`mini ui ${color.toLowerCase()}  button`}>
                    </button>
                </Aux>
            )
        })
    }

    renderSize = () => {
        return this.state.size.map((size, i) => {
            return (
                <Aux key={i}>
                    <button
                        onClick={
                            () => {
                                this.setState({ selectedSize: size })
                            }
                        }
                        className={`mini ui button ${this.state.selectedSize === size ? this.state.selectedColor : ''}`} >
                        {size}
                    </button>
                </Aux>
            )
        })
    }
    // button to increment qty
    handleAdd = () => {
        this.setState(prevState => {
            return {
                quantity: prevState.quantity + 1
            }
        })
    }
    //button to decrement qty and disable for value less one
    handleMinus = () => {
        this.setState(prevState => {
            if (this.state.quantity !== 1) {
                return {
                    quantity: prevState.quantity - 1
                }
            }
        })
    }

    handleQuantity = (e) => {
        this.setState({ quantity: parseInt(e.target.value, 10) })
    }

    handleAddToChart = () => {
        const { product_id } = this.props.products.product
        const { quantity, selectedColor, selectedSize } = this.state
        const cart_id = window.localStorage.getItem('client_id')
        if (!selectedColor) {
            setTimeout(() => {
                toast(
                    {
                        type: 'warning',
                        title: 'Please select a Color',
                        description: <p>We need your color selection to take your order</p>
                    }
                );
            }, 1);
        } else if (!selectedSize) {
            setTimeout(() => {
                toast(
                    {
                        type: 'warning',
                        title: 'Please select a size',
                        description: <p>We need your Size selection to take your order</p>
                    }
                );
            }, 1);
        } else if (quantity <= 0) {
            alert('please set an appropriate amount')
        } else { //{ cart_id, product_id, attributes, quantity }
            this.props.addToCart({
                product_id,
                cart_id,
                quantity,
                attributes: `${selectedColor} ${selectedSize}`

            })
            this.props.getCart(cart_id)
            this.props.fetchTotalAmount(window.localStorage.getItem('client_id'))

            setTimeout(() => {
                toast({
                    type: 'success',
                    icon: 'cart',
                    title: 'Added To Cart',
                    description: `Item is added to cart click here to go to cart`,
                    animation: 'bounce',
                    time: 5000,
                    onClick: () => this.props.history.push('/cart')
                });
            }, 1);
        }
    }

    render() {
        return (
            <div className="ui container" style={{ paddingTop: "55px" }}>
                <div className="ui stackable grid">
                    <div className="six wide column">

                        {this.state.previewItem === 'image' ?
                            <img className="ui large rounded image"
                                src={`https://backendapi.turing.com/images/products/${this.props.products.product.image}`}
                                alt={this.props.products.product.name}
                                style={{ height: "350px" }}>
                            </img>

                            :
                            <img className="ui rounded image"
                                src={`https://backendapi.turing.com/images/products/${this.props.products.product.image_2}`}
                                alt={this.props.products.product.name}
                                style={{ height: "350px" }}>
                            </img>
                        }
                        <br></br>
                        <div className="ui small images">
                            <img onClick={() => this.setState({ previewItem: 'image' })} className="ui rounded image"
                                src={`https://backendapi.turing.com/images/products/${this.props.products.product.image}`}
                                alt={this.props.products.product.name}>

                            </img>

                            <img onClick={() => this.setState({ previewItem: 'image2' })} className="ui rounded image"
                                src={`https://backendapi.turing.com/images/products/${this.props.products.product.image_2}`}
                                alt={this.props.products.product.name}>
                            </img>

                        </div>
                        <p>
                            {this.props.products.product.description}
                        </p>

                    </div>
                    <div className="four wide column">
                        <h1>{this.props.products.product.name}</h1>
                        <h4>Color</h4>

                        {this.renderColor()}

                        {this.state.selectedColor ?
                            <Aux>
                                <h5>Selected Color: {this.state.selectedColor}</h5>
                                <button
                                    className={`mini ui ${this.state.selectedColor.toLowerCase()}  button`}>
                                </button>
                            </Aux>
                            :
                            <h5>Please Select A Color</h5>
                        }
                        <br></br>
                        {this.state.selectedSize ?
                            <Aux>
                                <h5>Selected Size: {this.state.selectedSize}</h5>

                            </Aux>
                            :
                            <h5>Please Select A Size</h5>
                        }

                        {this.renderSize()}


                        <br></br>
                        <br></br>
                        Price: <i className="money icon"></i> {this.props.products.product.price}$
                        <br></br>
                        <br></br>
                        <br></br>
                        Quantity
                        <br></br>

                        {this.state.quantity === 1 ? <button disabled={true} ><i className="minus icon"></i> </button> : <button onClick={this.handleMinus}><i className="minus icon"></i></button>}

                        <input className="ui input" style={{ width: "45px" }} type="number" value={this.state.quantity} onChange={this.handleQuantity} />

                        <button onClick={this.handleAdd}><i className="add icon"></i></button>
                        <br></br>
                        <br></br>

                        <button onClick={this.handleAddToChart} className="ui red button"><i className="cart icon"></i> Add to Cart</button>
                        <SemanticToastContainer position="top-center" />

                    </div>
                    <div className="five wide column">
                        {this.props.cart.cart.length ? 'Summery of Items in the cart' : ""}
                        <Cart />
                    </div>
                </div>

            </div>
        )
    }
}
const mapStateToProps = state => {
    return state
}

export default connect(mapStateToProps, { fetchProduct, fetchProductsAttribute, addToCart, getCart, fetchTotalAmount })(Product)
