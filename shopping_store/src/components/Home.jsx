// App.jsx
import Carousel from './Carousel';
import { Link } from 'react-router-dom';

const Home = () => {
	return (
		<>
			<Carousel></Carousel>
			<button onClick={() => localStorage.clear()}>Clear Local Storage</button>
		</>
	);
};

export default Home;
