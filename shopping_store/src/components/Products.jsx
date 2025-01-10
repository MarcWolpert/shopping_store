import { useParams } from 'react-router-dom';
import DefaultProfile from './DefaultProfile';
import { Link } from 'react-router-dom';

//Can be used for the product pages later
// const routes = {
// 	popeye: <Popeye />,
// 	spinach: <Spinach />,
// 	decrepit: <Decrepit />,
// 	bougie: <Bougie />,
// };

const Products = () => {
	return (
		<div>
			<h1>Hello from profile page!</h1>
			<p>So, how are you?</p>
			<hr />
			<Link to='/'>Return to Home</Link>
		</div>
	);
};

export default Products;
