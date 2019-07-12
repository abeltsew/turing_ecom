import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchProduct, fetchProductsAttribute, addToCart, getCart } from '../../actions'
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

    componentDidMount() {
        this.props.fetchProduct(this.props.match.params.id)
        this.props.fetchProductsAttribute(this.props.match.params.id)
    }

    componentWillReceiveProps(nextProp) {
        this.setState({
            color: [],
            size: [],
            selectedColor: null,
            selectedSize: null

        })
        nextProp.productAttribute.map(attribute => {
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
                    <button onClick={() => this.setState({ selectedColor: color.toLowerCase() })} className={`mini ui ${color.toLowerCase()}  button`}></button>
                </Aux>
            )
        })
    }

    renderSize = () => {
        return this.state.size.map((size, i) => {
            return (
                <Aux key={i}>
                    <button onClick={() => this.setState({ selectedSize: size })} className="mini ui button">{size}</button>
                </Aux>
            )
        })
    }

    handleAdd = () => {
        this.setState(prevState => {
            return {
                quantity: prevState.quantity + 1
            }
        })
    }

    handleMinus = () => {
        this.setState(prevState => {
            return {
                quantity: prevState.quantity - 1
            }
        })
    }

    handleQuantity = (e) => {
        this.setState({ quantity: parseInt(e.target.value, 10) })
    }

    handleAddToChart = () => {
        const { product_id } = this.props.product
        const { quantity, selectedColor, selectedSize } = this.state
        const cart_id = window.localStorage.getItem('client_id')
        if (!selectedColor) {
            alert('Please select A color')
        } else if (!selectedSize) {
            alert('please select a Size')
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
        }
    }

    render() {
        return (
            <div style={{ paddingTop: "55px" }}>
                <div className="ui stackable grid">
                    <div className="six wide column">

                        {this.state.previewItem === 'image' ?
                            <img className="ui large rounded image"
                                src={`https://backendapi.turing.com/images/products/${this.props.product.image}`}
                                alt={this.props.product.name}
                                style={{ height: "350px" }}>
                            </img>

                            :
                            <img className="ui rounded image"
                                src={`https://backendapi.turing.com/images/products/${this.props.product.image_2}`}
                                alt={this.props.product.name}
                                style={{ height: "350px" }}>
                            </img>
                        }
                        <br></br>
                        <div className="ui small images">
                            <img onClick={() => this.setState({ previewItem: 'image' })} className="ui rounded image"
                                src={`https://backendapi.turing.com/images/products/${this.props.product.image}`}
                                alt={this.props.product.name}>

                            </img>

                            <img onClick={() => this.setState({ previewItem: 'image2' })} className="ui rounded image"
                                src={`https://backendapi.turing.com/images/products/${this.props.product.image_2}`}
                                alt={this.props.product.name}>
                            </img>

                        </div>
                        <p>
                            {this.props.product.description}
                        </p>

                    </div>
                    <div className="four wide column">
                        <h1>{this.props.product.name}</h1>
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
                        <h4>Size</h4>

                        {this.renderSize()}

                        {this.state.selectedSize ?
                            <Aux>
                                <h5>Selected Size: {this.state.selectedSize}</h5>
                                <button className="mini ui button">{this.state.selectedSize}</button>
                            </Aux>
                            :
                            <h5>Please Select A Size</h5>
                        }
                        <br></br>
                        Price: <i className="money icon"></i> {this.props.product.price}$
                        <br></br>
                        <br></br>
                        <br></br>
                        Quantity
                        <br></br>
                        <button onClick={this.handleAdd}><i className="add icon"></i></button>
                        <input className="ui input" style={{ width: "45px" }} type="number" value={this.state.quantity} onChange={this.handleQuantity} />
                        <button onClick={this.handleMinus}><i className="minus icon"></i></button>
                        <br></br>
                        <br></br>

                        <button onClick={this.handleAddToChart} className="ui red button"><i className="cart icon"></i> Add to Cart</button>

                    </div>
                    <div className="five wide column">
                        {this.props.cart.length ? 'Summery of Items in the cart' : ""}
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

export default connect(mapStateToProps, { fetchProduct, fetchProductsAttribute, addToCart, getCart })(Product)
