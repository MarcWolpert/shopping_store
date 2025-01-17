import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import addToCart from '../assets/add_to_cart.svg';

// This function writes all necessary data (including image) to localStorage.
export function setLoadLocalStorage({
	id,
	name,
	addToCart,
	price,
	description,
	category,
	count,
	setCount,
	image,
}) {
	const existing = localStorage.getItem(id);
	const parsedExisting = existing ? JSON.parse(existing) : null;

	// If the item already exists, increment its quantity; otherwise, start from 1.
	const newCount = parsedExisting ? parsedExisting.quantity + 1 : count + 1;
	setCount(newCount); // Update the count state in Card

	localStorage.setItem(
		id,
		JSON.stringify({
			name,
			addToCart,
			price,
			description,
			category,
			quantity: newCount,
			image,
		}),
	);
}

const Card = ({ id, price, name, description, image, category }) => {
	const [count, setCount] = useState(0);
	const data = { id, price, name, description, image, category, count };

	useEffect(() => {
		const item = localStorage.getItem(id);
		if (item) {
			const parsedItem = JSON.parse(item);
			// If the item is already in storage, sync state with its quantity
			setCount(parsedItem.quantity || 0);
		}
	}, [id]);

	return (
		<div className='card'>
			<Link to={`/products/${id}`} state={data}>
				<img
					className='itemImage'
					src={image}
					alt={name}
					onClick={() => {
						console.log('clicked');
					}}
				/>
			</Link>

			{/* If the count is above 0, display it in the corner */}
			{count > 0 && <p className='cartCounter'>{count}</p>}

			<div className='itemContents'>
				<p className='itemName' id={name}>
					{name}
				</p>
				<div className='bottomItemBar'>
					<p className='price'>${price}</p>
					<button className='addToCart'>
						<img
							tabIndex={0}
							src={addToCart}
							alt={`Add ${name} to cart`}
							aria-describedby={`Add ${name} to cart`}
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
									image,
								});
							}}
							onKeyDown={(e) => {
								e.preventDefault();
								// Typically "Enter" is capitalized, but this may vary by environment
								if (e.key === 'enter' || e.key === 'Enter') {
									setLoadLocalStorage({
										id,
										name,
										addToCart,
										price,
										description,
										category,
										count,
										setCount,
										image,
									});
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
