import React, { Component } from 'react';
import Products from './Products';
import Footer from './Footer';
import request from 'superagent'

//Set the state as an empty array and a filter with a default value of all.
// Want to show all products by default.
class MultipleListing extends Component {
	constructor(){
		super();
		this.state = {
			data: [],
			filter: 'all'
		};
	}

//Called the API.
	componentWillMount(){
		request
		.get('https://mallory-furniture-admin.now.sh/api/v1/products')
		.then(response => {
			this.setState({
				data: response.body
			})
		});
	}




//Method used to update the state. The state will control the filteredList and
// the active class for the buttons.
	_selectFilter = (filter) => {
		this.setState({
			filter
		})
	}

//Method to filter the products' list.
//It takes the current (empty) state and update it with the filtered list.
	_filterList = (filter) => {
		return this.state.data.filter(function(prod){
			if (filter === 'all') return true;
			return prod.onSale === filter;
		})
	}

//Created variable filter to store state value--and update it later.
//Created variable filteredList to call method _filteredList().
//Created variable listLength to store the number of products on the filtered list.
	render(){
		const filter = this.state.filter;
		const filteredList = this._filterList(filter);
		const listLength = filteredList.length;

		return (
			<div className='products'>
				<h2 className='products__title'>All Products</h2>
				<h3 className='products__subtitle'>All available listings</h3>
				<div className='products__filter'>
					<span>

						<button
						className={this.state.filter === 'all' ? 'products__filter__button selected' : 'products__filter__button'}
						onClick={()=>{this._selectFilter('all')}}>All items</button>

						<button
						className={this.state.filter === true ? 'products__filter__button selected' : 'products__filter__button'}
						onClick={()=>{this._selectFilter(true)}}>On Sale</button>

					</span>
					<h3 className='products__filter__status'><span>{listLength}</span> items showing</h3>
				</div>

				<Products data={filteredList} />

				<Footer />

			</div>
		);
	}
}

export default MultipleListing;
