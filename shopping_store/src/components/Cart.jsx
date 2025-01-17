import React, { useState, useEffect } from 'react';
import TopBanner from './TopBanner';

const Cart = () => {
	const [items, setItems] = useState([]);

	/**
	 * On mount, read all items from localStorage.
	 * For each key, parse and push to `items`.
	 */
	useEffect(() => {
		const keys = Object.keys(localStorage);
		const loadedItems = [];

		keys.forEach((key) => {
			const stored = localStorage.getItem(key);
			if (!stored) return;
			try {
				const parsed = JSON.parse(stored);
				if (parsed.name && parsed.price && parsed.quantity) {
					loadedItems.push({ id: key, ...parsed });
				}
			} catch (err) {
				console.error('Error parsing item from localStorage:', err);
			}
		});

		setItems(loadedItems);
	}, []);

	/**
	 * Update item’s quantity by `delta` (e.g., +1 or -1).
	 * If quantity goes <= 0, remove the item entirely.
	 */
	const updateQuantity = (id, delta) => {
		setItems((prev) =>
			prev
				.map((item) => {
					if (item.id === id) {
						const newQty = item.quantity + delta;
						if (newQty <= 0) {
							localStorage.removeItem(id); // remove if no quantity
							return null;
						}
						const updatedItem = { ...item, quantity: newQty };
						localStorage.setItem(id, JSON.stringify(updatedItem));
						return updatedItem;
					}
					return item;
				})
				// remove any items < 0
				.filter(Boolean),
		);
	};

	return (
		<>
			<header>
				<TopBanner />
			</header>
			<main className='cartMain'>
				{items.map((item) => (
					<div key={item.id} className='cartItem'>
						{/* Only render img if we actually have an image */}
						{item.image && (
							<img src={item.image} className='cartItemPicture' alt={item.name} />
						)}
						<div className='details'>
							<p>{item.name}</p>
							<p>Price: ${item.price}</p>
							<p>
								Quantity:
								<button onClick={() => updateQuantity(item.id, -1)}>-</button>
								{' ' + item.quantity + ' '}
								<button onClick={() => updateQuantity(item.id, 1)}>+</button>
							</p>
						</div>
					</div>
				))}
				{(() => {
					if (items.length < 1) {
						return (
							<p style={{ transform: 'translateY(30vh)' }}>Nothing in your cart.</p>
						);
					} else {
						return (
							<p>
								Total:$
								{items.reduce((accumulator, currentValue) => {
									return accumulator + currentValue.quantity * currentValue.price;
								}, 0)}
							</p>
						);
					}
				})()}
			</main>
			<footer></footer>
		</>
	);
};

export default Cart;
