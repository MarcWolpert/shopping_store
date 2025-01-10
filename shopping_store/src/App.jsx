// App.jsx
import './App.css';
import Home from './components/Home';
import { Link } from 'react-router-dom';
import Products from './components/Products';

const App = () => {
	return (
		<>
			<header>
				<h1>Lagrange</h1>
				<nav>
					<ul>
						<li>
							<Link to='/'>Home</Link>
						</li>
						<li>
							<Link to='products'>Products</Link>
						</li>
					</ul>
				</nav>
				<div className='headerUnderline'></div>
			</header>
			<main></main>
			<footer></footer>
		</>
	);
};

export default App;
