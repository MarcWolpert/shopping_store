import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import addToCart from '../assets/add_to_cart.svg';

const Card = ({ id, price, name, description, image, category }) => {
	const [count, setCount] = useState(0);
	useEffect(() => {
		const item = localStorage.getItem(id);
		if (item) {
			const parsedItem = JSON.parse(item);
			setCount(parsedItem.quantity || 0);
		}
	}, []);
	return (
		<div
			className='card'
			onClick={(e) => {
				console.log(e);
				e.stopPropagation();
			}}
		>
			<img className='itemImage' src={image} alt='' />
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
							}}
						/>
						{count > 0 && (
							<p className='cartCounter' style={{}}>
								{count}
							</p>
						)}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Card;
