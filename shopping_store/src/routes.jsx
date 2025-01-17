import App from './App';
import ErrorPage from './components/NotFound';
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
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
	{
		path: 'cart',
		element: <Cart />,
	},
];

export default routes;
