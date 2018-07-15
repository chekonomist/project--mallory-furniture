import React, { Component } from 'react';
import ProductCard from './ProductCard';


//This component is used to create the page with all products.
// The format for this component is located on ProductCard.
// Call the component ProductCard and update its content with data={product}
// For each product on the map iteration, a ProductCard will be rendered.

class Products extends Component {
	render(){
		const featuredList = this.props.data;
		return (
			<div className='products'>
				<div className='products__products'>
					{featuredList.map(function(product, i){
						return <ProductCard data={product} key={i} />
					})}
				</div>
			</div>
		);
	}
}

export default Products;
