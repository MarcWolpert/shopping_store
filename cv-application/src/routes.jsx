import App from './App';
import ErrorPage from './components/NotFound';
import Profile from './components/Profile';

const routes = [
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorPage />,
	},
	{
		path: 'profile/',
		element: <Profile />,
	},
	{
		path: 'profile/:name',
		element: <Profile />,
	},
];

export default routes;
