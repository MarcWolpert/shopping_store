import { useParams } from 'react-router-dom';
import DefaultProfile from './DefaultProfile';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '../assets/shopping-cart.svg';

const Products = () => {
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
			<main></main>
			<footer>
				<p>Designed and built by Marc Wolpert</p>
			</footer>
		</div>
	);
};

export default Products;
