// App.jsx
import './App.css';
import Products from './components/Products';
import { Link } from 'react-router-dom';

//Note: <a> causes page relocation
const App = () => {
	return (
		<div>
			<h1>SHOP! it</h1>
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
		</div>
	);
};

export default App;
