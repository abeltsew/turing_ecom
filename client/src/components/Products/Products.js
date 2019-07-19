import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProducts, fetchDepartments, fetchCatagories, fetchProductsByID } from '../../actions';
import { Link } from 'react-router-dom';

import Aux from '../../hoc/Aux';


class Products extends Component {

    state = {
        productsToList: [],
        currentCategory: '',
        catagoriesToList: [],
        search: "",
        index: 30,
        length: 10
    }
    // initialize products catalog with products and departments
    componentDidMount() {
        this.setState({ index: 0 })
        this.props.fetchProducts()
        this.props.fetchDepartments()
    }
    componentWillReceiveProps(nextProps) {

        this.setState({ productsToList: nextProps.products.products })
    }
    //update the products list as per the selected catagory
    handleCategoryChoice = async (ID, name) => {
        await this.props.fetchProductsByID(ID)
        this.setState({
            productsToList: this.props.products.productByCategory,
            currentCategory: name
        })
    }
    renderCatagory = () => {

        return this.state.catagoriesToList.map(cat => {
            return (
                <Aux key={cat.category_id}>
                    <Link to="#" onClick={() => {
                        this.setState({ index: 0 })
                        this.handleCategoryChoice(cat.category_id, cat.name)
                    }
                    }
                        className="item">
                        {cat.name}
                    </Link>
                </Aux>
            )
        })
    }
    // update catagories to list as per the selected Department
    handleDepartmentChoice = async (deptID) => {

        await this.props.fetchCatagories(deptID)
        this.setState({ catagoriesToList: this.props.products.catagories })
    }

    renderDepartments = () => {
        return this.props.products.departments.map(dept => {
            return (
                <Aux key={dept.department_id}>
                    <Link to="#" className="item" onClick={() => this.handleDepartmentChoice(dept.department_id)}>{dept.name}</Link>
                </Aux>
            )
        })
    }

    handleSearch = e => {
        this.setState({ index: 0 })
        this.setState({ search: e.target.value })
    }
    renderProducts = () => {

        return this.state.productsToList
            .filter(product => {
                return product.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
            })
            .slice(this.state.index, this.state.index + this.state.length)

            .map(product => {
                return (
                    <Link to={`/products/${product.product_id}`} key={product.product_id} className="ui card" >
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
                            <Link to={`/products/${product.product_id}`}><i className="cart icon"></i> Buy Now!</Link>
                        </div>
                    </Link >
                )
            })
    }

    renderPagination = (productLength) => {
        if (productLength <= 10) {

        } else {
            if (productLength % 10 === 0) {
                const numberOfIndex = productLength / 10
                let buttonsArray = [0]
                let i;
                for (i = 1; i < numberOfIndex; i++) {
                    buttonsArray.push(i * 10)
                }
                console.log(buttonsArray)
                return buttonsArray.map(buttonIndex => {
                    return <button className={`ui ${this.state.index === buttonIndex ? 'red' : ''} button`} key={buttonIndex} onClick={() => this.setState({ index: buttonIndex })}>{buttonIndex}</button>
                })
            } else {
                const numberOfIndex = (productLength - productLength % 10) / 10
                let buttonsArray = [0]
                let i;
                for (i = 1; i < numberOfIndex; i++) {
                    buttonsArray.push(i * 10)
                }
                buttonsArray.push(productLength - productLength % 10)
                console.log(buttonsArray)
                return buttonsArray.map(buttonIndex => {
                    return <button
                        className={`ui ${this.state.index === buttonIndex ? 'red' : ''} button`}
                        key={buttonIndex}
                        onClick={() => this.setState({ index: buttonIndex })}>
                        {(buttonIndex / 10 + 1)}
                    </button>
                })
            }
        }


    }

    render() {
        return (
            <div className="ui stackable grid" style={{ paddingTop: "55px" }}>
                <div className="three wide column">
                    {console.log(this.state)}
                    <div className="ui vertical pointing menu">
                        <h5 className="ui block header">Choose A Department</h5>
                        {this.renderDepartments()}
                    </div>
                    {this.state.catagoriesToList.length === 0 ?
                        ""
                        :
                        < div className="ui vertical pointing menu">
                            <h5 className="ui block header">Choose A Catagory</h5>
                            {this.renderCatagory()}
                        </div>

                    }
                </div>
                <div className="twelve wide stretched column">
                    <p>Welcome to our Shop, chooose from {this.state.productsToList.length} products</p>

                    <div className="ui stackable grid ">

                        <div className="four wide column"></div>
                        <div className="six wide column " style={{ float: 'right' }}>
                            page: {this.renderPagination(this.state.productsToList.length)}

                        </div>
                        <div className="four wide column " style={{ float: 'right' }}><div className="ui icon input" >
                            <input type="text" placeholder="Search..." onChange={this.handleSearch} />
                            <i className="search link icon"></i>
                        </div>

                        </div>
                    </div>

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

            </div >
        )
    }
}

const mapStateToProps = state => {
    console.log(state)
    return state
}
export default connect(mapStateToProps, { fetchProducts, fetchDepartments, fetchCatagories, fetchProductsByID })(Products);
