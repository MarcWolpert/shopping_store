import App from './App';
import ErrorPage from './components/NotFound';
import Products from './components/Products';

const routes = [
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorPage />,
	},
	{
		path: 'products/',
		element: <Products />,
	},
	{
		path: 'profile/:item',
		element: <Products />,
	},
];

export default routes;
