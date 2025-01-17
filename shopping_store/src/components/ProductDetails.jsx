import React from 'react';
import { useLocation } from 'react-router-dom';
import TopBanner from './TopBanner';
import { addToCart } from './Card';
import addToCartIcon from '../assets/add_to_cart.svg';

const ProductDetails = () => {
	const location = useLocation();
	const { id, price, name, description, image, category, count } =
		location.state || {};

	const handleAddToCart = () => {
		addToCart({ id, price, name, description, image, category });
		alert(`${name} added to cart!`);
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			handleAddToCart();
		}
	};

	return (
		<div className='product-details-page'>
			<header>
				<TopBanner />
			</header>

			<main className='product-details-content'>
				<div className='product-card'>
					<img className='product-image' src={image} alt={name} />
					<div className='product-info'>
						<p className='product-name' id={name}>
							{name}
						</p>
						<p className='product-description'>Description: {description}</p>
						<div className='bottom-item-bar'>
							<p className='price'>${price}</p>
							<button className='add-to-cart' onClick={handleAddToCart}>
								<img
									tabIndex={0}
									src={addToCartIcon}
									alt={`Add ${name} to cart`}
									onKeyDown={handleKeyDown}
								/>
							</button>
						</div>
					</div>
				</div>
			</main>

			<footer>
				<p>Designed and built by Marc Wolpert</p>
			</footer>
		</div>
	);
};

export default ProductDetails;
