import React, { Component } from 'react';
import { Link } from 'react-router-dom';


//The component Product will call on this component for every product on the API.
// Each individual product card will link the client to another page.

class ProductCard extends Component {
	render(){
		const data = this.props.data;
		const id = '/product/'+data._id;
		return (
				<div className='product__card'>
					<Link className='product__link' to={id}>
						<img className='product__card__image' src={data.imageLink} />
						<h4 className='product__card__title'>{data.item}</h4>
						<p className='product__card__price'>${data.price}</p>
					</Link>
				</div>
		)
	}
}

export default ProductCard;
