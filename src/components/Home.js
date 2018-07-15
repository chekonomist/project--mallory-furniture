import React, { Component } from 'react';
import Banner from './Banner';
import BrowseCategories from './BrowseCategories';
import Products from './Products';
import Footer from './Footer';
import request from 'superagent';
import { Link } from 'react-router-dom'


//Access the state.
class Home extends Component {
	constructor(){
		super();
		this.state = {
			data: []
		};
	}

// Load the API.
	componentWillMount(){
		request
			.get('https://mallory-furniture-admin.now.sh/api/v1/products')
			.then(response => {
				this.setState({
					data: response.body
				})
			});
	}

//Filter the featured products from the API data.
	_filterFeatured = () => {
		return this.state.data.filter(function(product){
			return product.featured === true;
		})
	}

//Render only the featured products.
//Update the state with the featured products (using the _filterFeatured method)
//Call the Banner component.
//Call the component Product and select the var data to display.
//Send the client to /all-products
//Call the BrowseCategories component
//Call the Footer component

  render(){
		const data = this._filterFeatured();
		return (
			<div className='home'>
        <Banner />
				<h2 className='products__title'>Featured Products</h2>
				<h3 className='products__subtitle'>Check out some of our favorite listings</h3>
        <Products data={data} />
				<Link to='/all-products' className='products__all'>All Products</Link>
      	<BrowseCategories />
        <Footer />
			</div>
		)
	}
}

export default Home;
