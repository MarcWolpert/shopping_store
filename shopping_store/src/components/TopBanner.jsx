import { Link } from 'react-router-dom';
import ShoppingCartIcon from '../assets/shopping-cart.svg';
const TopBanner = () => {
	return (
		<>
			<div className='lhsNav'>
				<Link to='/'>
					<h1 aria-label='Store Name: Lagrange'>Lagrange</h1>
				</Link>
				<nav>
					<ul>
						<li>
							<Link to='/'>Home&nbsp;</Link>
						</li>
						<li id='productLink'>
							<Link to='/products'>Products</Link>
						</li>
					</ul>
				</nav>
			</div>
			<Link className='cartLink' to='/cart'>
				<img src={ShoppingCartIcon} alt='Shopping Cart' />)
			</Link>
		</>
	);
};

export default TopBanner;
