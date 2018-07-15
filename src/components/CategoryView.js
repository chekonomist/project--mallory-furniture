import React, { Component } from 'react';
import request from 'superagent';
import Products from './Products';
import Footer from './Footer';


class LoadingDotDotDot extends Component {
	constructor(){
		super();
		this.state = {
			dots: "."
		};
	}

	componentWillMount(){
		this.intervalId = setInterval( ()=> this.setState({
			dots: this.state.dots.length < 6 ? this.state.dots + "." : "."
		})  , 40)
	}

	componentWillUnmount(){
		clearInterval(this.intervalId)
	}

	render(){
		return <div style={{fontSize: 50, textAlign: "center", paddingTop: 40}}>{this.state.dots}</div>
	}

}


//Set the state as an empty array and a default value of all.
class CategoryView extends Component {
	constructor(){
		super();
		this.state = {
			data: [],
			filter: 'all'
		};
	}

//Load the API's data for an individual category (the one chosen at app.js)
//
	componentWillMount(){
		this._fetchApiDataSetState(this.props)
	}

	componentWillReceiveProps(newProps){
		console.log(newProps.match.url, this.props.match.url);
		if(newProps.match.url !== this.props.match.url){
			this._fetchApiDataSetState(newProps)
			this.setState({data: []})
		}
	}

	_fetchApiDataSetState(theProps){
		const category = theProps.match.params.category
		request
		.get(`https://mallory-furniture-admin.now.sh/api/v1/products?category=${category}`)
		.then(response => {
			const apiFurnitureData = response.body
			console.log(apiFurnitureData);
			this.setState({
				data: apiFurnitureData
			})
		});
	}


//Method to update the state.
	selectFilter = (filter) => {
		this.setState({
			filter
		})
	}

//Method to update the state.
	filterList = (filter) => {
		return this.state.data.filter(function(prod){
			if (filter === 'all') return true;
			return prod.onSale === filter;
		})
	}

//Method to turn the category string to a Proper Name string
	_capitalize(s) { return s[0].toUpperCase() + s.slice(1) };

	render(){
		const category = this.props.match.params.category
		const filter = this.state.filter;
		const categoryList = this.filterList(filter);

		let bodyTxt =	<Products data={categoryList} />

		if(this.state.data.length === 0){
			bodyTxt = <LoadingDotDotDot/>
		}

		return (
			<div className='products'>
				<h2 className='products__title'>{this._capitalize(category)}</h2>
				<h3 className='products__subtitle'>All {this._capitalize(category)} products</h3>
				<div className='products__filter'>
					<span>
						<button
						className={this.state.filter === 'all' ? 'products__filter__button selected' : 'products__filter__button'}
						onClick={()=>{this.selectFilter('all')}}>All items</button>
						<button
						className={this.state.filter === true ? 'products__filter__button selected' : 'products__filter__button'}
						onClick={()=>{this.selectFilter(true)}}>On Sale</button>
					</span>
					{bodyTxt}
					<h3 className='products__filter__status'><span>{categoryList.length}</span> items showing</h3>
				</div>
				<Footer />
			</div>
		)
	}
}

export default CategoryView;
