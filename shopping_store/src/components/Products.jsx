import { useParams } from 'react-router-dom';
import DefaultProfile from './DefaultProfile';
import Spinach from './Spinach';
import Popeye from './Popeye';
import Bougie from './Bougie';
import Decrepit from './Decrepit';

//Can be used for the product pages later
// const routes = {
// 	popeye: <Popeye />,
// 	spinach: <Spinach />,
// 	decrepit: <Decrepit />,
// 	bougie: <Bougie />,
// };

const Products = () => {
	const { name } = useParams();

	return (
		<div>
			<h1>Hello from profile page!</h1>
			<p>So, how are you?</p>
			<hr />
			<h2>The profile visited is here:</h2>
			{((name) => {
				if (name in routes) {
					return routes[name];
				} else {
					return <DefaultProfile />;
				}
			})(name)}
		</div>
	);
};

export default Products;
