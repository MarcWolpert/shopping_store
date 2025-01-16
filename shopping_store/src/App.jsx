// App.jsx
import './App.css';
import Home from './components/Home';
import { Link } from 'react-router-dom';
import Products from './components/Products';
import ShoppingCartIcon from './assets/shopping-cart.svg';

const App = () => {
	return (
		<>
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
				<Home></Home>
			</main>
			<footer>
				<p>Designed and built by Marc Wolpert</p>
			</footer>
		</>
	);
};

export default App;
