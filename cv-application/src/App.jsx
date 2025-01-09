// App.jsx
import './App.css';
import Profile from './components/Profile';
import { Link } from 'react-router-dom';

//Note: <a> causes page relocation
const App = () => {
	return (
		<div>
			<h1>Hello from the main page of the app!</h1>
			<p>Here are some examples of links to other pages</p>
			<nav>
				<ul>
					<li>
						<Link to='profile'>Profile page</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default App;
