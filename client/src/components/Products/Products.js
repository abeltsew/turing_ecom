import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchProducts, fetchDepartments, fetchCatagories, fetchProductsByID } from '../../actions'
import { Link } from 'react-router-dom'


import Aux from '../../hoc/Aux'


class Products extends Component {

    state = {
        productsToList: [],
        currentCategory: ''
    }
    componentDidMount() {
        this.props.fetchProducts()
        this.props.fetchDepartments()
        this.props.fetchCatagories()
    }
    componentWillReceiveProps(nextProps) {

        this.setState({ productsToList: nextProps.products })
    }

    handleCategoryChoice = async (ID, name) => {
        await this.props.fetchProductsByID(ID)
        this.setState({
            productsToList: this.props.productByCategory,
            currentCategory: name
        })
    }
    renderCatagory = () => {
        return this.props.catagories.map(cat => {
            return (
                <Aux key={cat.category_id}>
                    <Link to="#" onClick={() => this.handleCategoryChoice(cat.category_id, cat.name)} className="item">{cat.name}</Link>
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
                        <img src={`https://backendapi.turing.com/images/products/${product.thumbnail}`}
                            alt={product.name}></img>
                    </div >
                    <div className="content">
                        <Link to={`/products/${product.product_id}`} className="center aligned header">{product.name}</Link>

                        <div className="center aligned description">
                            <p className="ui pointing red basic label">${product.price}</p>
                        </div>
                    </div>
                    <div className="center aligned extra content center">
                        <Link to="#"><i className="cart icon"></i> Add to Cart</Link>
                    </div>
                </div >
            )
        })
    }
    // style={{ left: "0px", width: "238px", height: "380px", margin: "30px" }}
    render() {
        return (
            <div className="ui stackable grid" style={{ paddingTop: "55px" }}>
                <div className="three wide column">
                    {/* <div className="ui segment stacked raised piled sticky "  > */}

                    <div className="ui vertical pointing menu">
                        <h5 className="ui block header">Choose A Department</h5>
                        {this.renderDepartments()}
                    </div>
                    <div className="ui vertical pointing menu">
                        <h5 className="ui block header">Choose A Catagory</h5>
                        {this.renderCatagory()}
                        {/* </div> */}
                    </div>
                </div>
                <div className="twelve wide stretched column">
                    <p>Welcome to our Shop, chooose from {this.state.productsToList.length} products</p>

                    {/* breadcrumb for Categories */}
                    {this.state.currentCategory ?

                        <div className="ui breadcrumb">
                            <Link to="#" className="section">Store</Link>
                            <i className="right angle icon divider"></i>
                            <Link to="#" className="section">Category</Link>
                            <i className="right angle icon divider"></i>
                            <div className="active section">{this.state.currentCategory} </div>
                        </div>

                        : <div className="ui breadcrumb">
                            <Link to="#" className="section">Store</Link>
                        </div>}
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
    return state
}
export default connect(mapStateToProps, { fetchProducts, fetchDepartments, fetchCatagories, fetchProductsByID })(Products);
