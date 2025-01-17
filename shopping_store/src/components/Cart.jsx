import { useState, useEffect } from 'react';
import TopBanner from './TopBanner';

export function setLoadLocalStorage({
	id,
	name,
	addToCart,
	price,
	description,
	category,
	count,
	image,
}) {
	const existing = localStorage.getItem(id);
	const parsedExisting = existing ? JSON.parse(existing) : null;

	// If the item already exists, increment its quantity; otherwise, start from 1.
	const newCount = parsedExisting ? parsedExisting.quantity + 1 : count + 1;

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

const Cart = () => {
	const [allQuantity, setAllQuantity] = useState({});
	useEffect(() => {
		Object.keys(localStorage).map((id) => {
			const json = localStorage.getItem(id);
			if (!json) return null;
			const parsedJson = JSON.parse(json);
			console.log(parsedJson.image);
			setAllQuantity({ ...allQuantity, id: parsedJson.quantity });
		});
	}, []);
	return (
		<>
			<header>
				<TopBanner />
			</header>
			<main>
				{Object.keys(localStorage).map((id) => {
					const json = localStorage.getItem(id);
					if (!json) return null; // Skip if item is null or undefined

					const parsedJson = JSON.parse(json);
					console.log(parsedJson.image);

					return (
						<div key={id} className='cartItem'>
							{/* Only render img if we actually have an image */}
							{parsedJson.image && (
								<img src={parsedJson.image} alt={parsedJson.name} />
							)}
							<div className='details'>
								<p>{parsedJson.name}</p>
								<p>Price: {parsedJson.price}</p>

								<p>
									Quantity:{' '}
									<button
										onClick={() => {
											const newQuantity = allQuantity.id - 1;
											const data = localStorage;
											setLoadLocalStorage({
												id,
												name,
												addToCart,
												price,
												description,
												category,
												count,
												image,
											});
											setAllQuantity({
												...allQuantity,
												id: newQuantity,
											});
											//now update the object in the background
											// setLoadLocalStorage({ id, parsedJ });
										}}
									>
										-
									</button>
									{' ' + String(allQuantity.id) + ' '}
									<button
										onClick={() => {
											const newQuantity = allQuantity.id + 1;
											setLoadLocalStorage({
												id,
												name,
												addToCart,
												price,
												description,
												category,
												count,
												image,
											});
											setAllQuantity({
												...allQuantity,
												id: newQuantity,
											});
										}}
									>
										+
									</button>
								</p>
							</div>
						</div>
					);
				})}
			</main>
			<footer></footer>
		</>
	);
};

export default Cart;
