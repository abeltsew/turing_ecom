import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchProducts, fetchDepartments, fetchCatagories, fetchProductsByID } from '../../actions'
import { Link } from 'react-router-dom'


import Aux from '../../hoc/Aux'


class Products extends Component {

    state = {
        productsToList: []
    }
    componentDidMount() {
        this.props.fetchProducts()
        this.props.fetchDepartments()
        this.props.fetchCatagories()
    }
    componentWillReceiveProps(nextProps) {

        this.setState({ productsToList: nextProps.products })
    }

    handleCategoryChoice = async (ID) => {
        await this.props.fetchProductsByID(ID)
        this.setState({ productsToList: this.props.productByCategory })
        console.log("-------------------------")
        console.log(this.props.productByCategory)
        console.log("-------------------------")
    }
    renderCatagory = () => {
        return this.props.catagories.map(cat => {
            return (
                <Aux key={cat.category_id}>
                    <Link to="#" onClick={() => this.handleCategoryChoice(cat.category_id)} className="item">{cat.name}</Link>
                </Aux>
            )
        })
    }
    renderDepartments = () => {
        return this.props.departments.map(dept => {
            return (
                <Aux key={dept.department_id}>
                    <Link to="#" className="item">{dept.name}</Link>
                </Aux>
            )
        })
    }
    renderProducts = () => {
        return this.state.productsToList.map(product => {
            return (
                <div key={product.product_id} className="ui card">
                    <div className="image">
                        <img src={`https://backendapi.turing.com/images/products/${product.thumbnail}`} alt={product.name} />
                    </div>
                    <div className="content">
                        <Link to="#" className="center aligned header">{product.name}</Link>

                        <div className="center aligned description">
                            <p className="ui pointing red basic label">${product.price}</p>
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
    // style={left = "886px" width = "238px" !important; height: 380px !important; margin: 30px;}>
    render() {
        return (
            <div className="ui grid">
                <div className="four wide column">
                    <div className="ui segment sticky fixed top" >

                        <div className="ui vertical pointing menu">
                            <h5 className="ui block header">Choose A Department</h5>
                            {this.renderDepartments()}
                        </div>
                        <div className="ui vertical pointing menu">
                            <h5 className="ui block header">Choose A Catagory</h5>
                            {this.renderCatagory()}
                        </div>
                    </div>
                </div>
                {console.log(this.state)}
                <div className="twelve wide stretched column">
                    <p>Welcome to our Shop, chooose from {this.state.productsToList.length} products</p>
                    <div className="ui segment">

                        <div className="ui four stackable cards">
                            {this.renderProducts()}
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state)
    return state
}
export default connect(mapStateToProps, { fetchProducts, fetchDepartments, fetchCatagories, fetchProductsByID })(Products);
