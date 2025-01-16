// App.jsx
import Carousel from './Carousel';

const Home = () => {
	return (
		<>
			<Carousel></Carousel>
			<button onClick={() => localStorage.clear()}>Clear Local Storage</button>
		</>
	);
};

export default Home;
