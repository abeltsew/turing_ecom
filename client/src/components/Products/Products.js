import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchProducts } from '../../actions'
import { Link } from 'react-router-dom'


class Products extends Component {
    componentDidMount() {
        this.props.fetchProducts()
    }
    renderContent = () => {
        return this.props.products.map(product => {
            return (
                <div key={product.product_id} className="ui card">
                    <div className="image">
                        <img src={`https://backendapi.turing.com/images/products/${product.image}`} alt={product.name} />
                    </div>
                    <div className="content">
                        <Link to="#" className="center aligned header">{product.name}</Link>

                        <div className="center aligned description">
                            ${product.price}
                        </div>
                    </div>
                    <div className="center aligned extra content center">
                        <Link to="#">
                            <i className="cart icon"></i>
                            Add to Cart
    </Link>
                    </div>
                </div>




            )
        })
    }

    render() {
        return (
            <div className="ui four stackable cards">
                {console.log(this.props.products)}
                {this.renderContent()}

            </div>
        )
    }
}

const mapStateToProps = state => {
    return state
}
export default connect(mapStateToProps, { fetchProducts })(Products);
