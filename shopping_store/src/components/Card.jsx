import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import addToCart from '../assets/add_to_cart.svg';

export function setLoadLocalStorage({
	id,
	name,
	addToCart,
	price,
	description,
	category,
	count,
	setCount,
}) {
	const item = localStorage.getItem(id);
	const parsedItem = item ? JSON.parse(item) : null;

	//newcount because error handling with count
	const newCount = parsedItem ? parsedItem.quantity + 1 : count + 1;
	setCount(newCount);
	localStorage.setItem(
		id,
		JSON.stringify({
			name,
			addToCart,
			price,
			description,
			category,
			quantity: newCount,
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
			setCount(parsedItem.quantity || 0);
		}
	}, []);

	return (
		<div className='card'>
			<Link to={`/products/${id}`} state={data}>
				<img
					className='itemImage'
					src={image}
					onClick={() => {
						console.log('clicked');
					}}
					alt=''
				/>
			</Link>
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
							tabIndex={0}
							src={addToCart}
							alt='Add to cart button'
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
								});
							}}
							onKeyDown={(e) => {
								e.preventDefault();
								if (e.key === 'enter') {
									setLoadLocalStorage(
										id,
										name,
										addToCart,
										price,
										description,
										category,
										count,
										setCount,
									);
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
