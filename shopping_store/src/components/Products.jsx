import { useParams } from 'react-router-dom';
import DefaultProfile from './DefaultProfile';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '../assets/shopping-cart.svg';
import { useState, useEffect } from 'react';
import Card from './Card';

async function getJSON() {
	try {
		const response = await fetch(
			'https://fakestoreapi.in/api/products?limit=50',
		);
		const json = await response.json();
		console.log(json);
		return json;
	} catch (error) {
		console.log(`Fetch Error: ${error}`);
	}
	return null;
}

const Products = () => {
	const [json, setJSON] = useState({ products: [] });
	useEffect(() => {
		const fetchData = async () => {
			const items = await getJSON();
			setJSON(items);
			console.log(`Type is: ${typeof json.products}`);
		};
		fetchData();
	}, []);
	let itemNumber = -1;
	return (
		<div>
			<header>
				<div className='lhsNav'>
					<h1>Lagrange</h1>
					<nav>
						<ul>
							<li>
								<Link to='/'>Home&nbsp;</Link>
							</li>
							<li id='productLink'>
								<Link to='products'>Products</Link>
							</li>
						</ul>
					</nav>
				</div>
				<img src={ShoppingCartIcon} alt='' />
			</header>
			<main>
				<div className='productContainer'>
					{json.products?.map((item) => {
						itemNumber += 1;
						return (
							<Card
								className='card'
								key={itemNumber ?? -1}
								id={itemNumber ?? -1}
								price={json.products[itemNumber].price ?? ''}
								name={json.products[itemNumber].title ?? ''}
								description={
									json.products[itemNumber].description ??
									''
								}
								image={json.products[itemNumber].image ?? ''}
								category={
									json.products[itemNumber].category ?? ''
								}
							></Card>
						);
					})}
				</div>
			</main>
			<footer>
				<p>Designed and built by Marc Wolpert</p>
			</footer>
		</div>
	);
};

export default Products;
