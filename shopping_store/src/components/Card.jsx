import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import addToCartIcon from '../assets/add_to_cart.svg';

/**
 * Helper to add or increment an item in localStorage by `id`.
 * If item doesn’t exist, create a new one with quantity=1.
 * If it does exist, increment quantity by 1.
 */
export function addToCart(itemData) {
	const { id } = itemData;
	const storedItem = localStorage.getItem(id);

	if (!storedItem) {
		// Brand new item
		const newItem = { ...itemData, quantity: 1 };
		localStorage.setItem(id, JSON.stringify(newItem));
	} else {
		const parsedItem = JSON.parse(storedItem);
		parsedItem.quantity = (parsedItem.quantity || 0) + 1;
		localStorage.setItem(id, JSON.stringify(parsedItem));
	}
}

const Card = ({ id, price, name, description, image, category }) => {
	// For the little "count bubble" displayed on the product card
	const [count, setCount] = useState(0);

	// Sync with localStorage on mount
	useEffect(() => {
		const storedItem = localStorage.getItem(id);
		if (storedItem) {
			const parsed = JSON.parse(storedItem);
			setCount(parsed.quantity || 0);
		}
	}, [id]);

	const handleAddToCart = () => {
		addToCart({ id, price, name, description, image, category });
		const updated = localStorage.getItem(id);
		if (updated) {
			const parsed = JSON.parse(updated);
			setCount(parsed.quantity || 0);
		}
	};

	return (
		<div className='card'>
			<Link
				to={`/products/${id}`}
				state={{ id, price, name, description, image, category, count }}
			>
				<img className='itemImage' src={image} alt={name} />
			</Link>

			{/* Display quantity bubble if > 0 */}
			{count > 0 && <p className='cartCounter'>{count}</p>}

			<div className='itemContents'>
				<p className='itemName' id={name}>
					{name}
				</p>
				<div className='bottomItemBar'>
					<p className='price'>${price}</p>
					<button tabIndex={-1} className='addToCart'>
						<img
							tabIndex={0}
							src={addToCartIcon}
							alt={`Add ${name} to cart`}
							onClick={handleAddToCart}
							onKeyDown={(e) => {
								if (e.key === 'Enter' || e.key === 'enter') {
									handleAddToCart();
								}
							}}
						/>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Card;
