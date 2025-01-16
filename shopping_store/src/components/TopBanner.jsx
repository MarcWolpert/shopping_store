import { Link } from 'react-router-dom';
import ShoppingCartIcon from '../assets/shopping-cart.svg';
const TopBanner = () => {
	return (
		<>
			<div className='lhsNav'>
				<h1 aria-label='Store Name: Lagrange'>Lagrange</h1>
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
			<button>
				<img src={ShoppingCartIcon} alt='Shopping Cart' onClick={() => {}} />)
			</button>
		</>
	);
};

export default TopBanner;
