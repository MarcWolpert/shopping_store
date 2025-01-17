import React from 'react';
import TopBanner from './TopBanner';
import { setLoadLocalStorage } from './Card';
import addToCart from '../assets/add_to_cart.svg';
import { useLocation } from 'react-router-dom';

const ProductDetails = () => {
	const location = useLocation();
	const { id, price, name, description, image, category, count } = location.state;

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
							<button
								className='add-to-cart'
								onClick={() => {
									// setLoadLocalStorage({
									//   id,
									//   name,
									//   addToCart,
									//   price,
									//   description,
									//   category,
									//   count,
									//   setCount,
									// });
								}}
							>
								<img
									tabIndex={0}
									src={addToCart}
									alt={`Add ${name} to cart`}
									onKeyDown={(e) => {
										if (e.key === 'Enter') {
											setLoadLocalStorage(
												id,
												name,
												addToCart,
												price,
												description,
												category,
												count,
												// setCount
											);
										}
									}}
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
