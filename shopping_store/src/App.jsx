// App.jsx
import './App.css';
import Home from './components/Home';
import { Link } from 'react-router-dom';
import Products from './components/Products';
import TopBanner from './components/TopBanner';

const App = () => {
	return (
		<>
			<header>
				<TopBanner></TopBanner>
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
