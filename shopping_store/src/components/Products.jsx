import { useParams } from 'react-router-dom';
import DefaultProfile from './DefaultProfile';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '../assets/shopping-cart.svg';
import { useState, useEffect } from 'react';
import Card from './Card';
import TopBanner from './TopBanner';

async function getJSON() {
	try {
		const response = await fetch('https://fakestoreapi.in/api/products?limit=50');
		const json = await response.json();
		return json;
	} catch (error) {
		console.log(`Fetch Error: ${error}`);
	}
	return null;
}
function mapOverJson({ itemNumber, json }) {
	if (json.products.length > 0) {
		return json.products?.map((item) => {
			itemNumber += 1;
			return (
				<Card
					className='card'
					key={itemNumber ?? -1}
					id={itemNumber ?? -1}
					price={json.products[itemNumber].price ?? ''}
					name={json.products[itemNumber].title ?? ''}
					description={json.products[itemNumber].description ?? ''}
					image={json.products[itemNumber].image ?? ''}
					category={json.products[itemNumber].category ?? ''}
				></Card>
			);
		});
	} else {
		return (
			<>
				<p>Loading...</p>
			</>
		);
	}
}

const Products = () => {
	const [json, setJSON] = useState({ products: [] });
	useEffect(() => {
		const fetchData = async () => {
			const items = await getJSON();
			setJSON(items);
		};
		fetchData();
	}, []);
	let itemNumber = -1;
	return (
		<div>
			<header>
				<TopBanner></TopBanner>
			</header>
			<main>
				<div className='productContainer'>{mapOverJson({ itemNumber, json })}</div>
			</main>
			<footer>
				<p>Designed and built by Marc Wolpert</p>
			</footer>
		</div>
	);
};

export default Products;
