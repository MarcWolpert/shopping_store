import TopBanner from './TopBanner';
import { useState } from 'react';
import { setLoadLocalStorage } from './Card';
import addToCart from '../assets/add_to_cart.svg';

const ProductDetails = ({
	id,
	price,
	name,
	description,
	image,
	category,
	count,
	setCount,
}) => {
	return (
		<div>
			<header>
				<TopBanner></TopBanner>
			</header>
			<main>
				<img className='itemImage' src={image} alt='' />
				{count > 0 && (
					<p className='cartCounter' style={{}}>
						{count}
					</p>
				)}
				<div className='itemContents'>
					<p className='itemName' id={name}>
						{name}
					</p>
					<div className='bottomItemBar'>
						<p className='price'>${price}</p>
						<button className='addToCart'>
							<img
								src={addToCart}
								alt='Add to cart button'
								aria-describedby={name}
								onClick={() => {
									setLoadLocalStorage({
										id,
										name,
										addToCart,
										price,
										description,
										category,
										count,
										setCount,
									});
								}}
							/>
						</button>
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
