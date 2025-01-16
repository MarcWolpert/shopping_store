import App from './App';
import ErrorPage from './components/NotFound';
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';

const routes = [
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorPage />,
	},
	{
		path: 'products',
		element: <Products />,
	},
	{
		path: 'products/:item',
		element: <ProductDetails />,
	},
];

export default routes;
