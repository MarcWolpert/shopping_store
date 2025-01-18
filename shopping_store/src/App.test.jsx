import { render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

//Test: Home page in <App> has a Link with a heading in it with Lagrange as the text content
describe('Home component', () => {
	it('Home page has Lagrange heading', () => {
		render(
			<MemoryRouter>
				<App />
			</MemoryRouter>,
		);

		const heading = screen.getByRole('heading');
		expect(heading).toHaveTextContent('Lagrange');
	});
	it('Home page when clicked on the Home text leads you to the Home page', () => {
		render(
			<MemoryRouter>
				<App />
			</MemoryRouter>,
		);

		const link = screen.getByRole('link', { name: 'Home' });
		userEvent.click(link);
		//check for img tag to have alt text with 'fashionable' in it
		const images = screen.getAllByRole('img');
		//search for img tag with alt text containing 'fashionable'
		const img = images.find((img) => img.alt.match('Fashionable clothing'));
		expect(img).toHaveAttribute('alt', 'Fashionable clothing');
	});
	//Test: Products link goes to a page with more than one product
	//product has an image, which is a link to product details page,
	//a price, an add to cart button
	it('Products page has more than one product', () => {
		render(
			<MemoryRouter>
				<App />
			</MemoryRouter>,
		);
		const link = screen.getByRole('link', { name: 'Products' });
		userEvent.click(link);
		setTimeout(() => {
			const images = screen.getAllByRole('img');
			expect(images.length).toBeGreaterThan(12);
		}, 5000);
	});

	//Test: Clicking on the product cart button should display a red bubble that is incremented by 1
	it('Clicking on the product cart button should display a red bubble that is incremented by 1', () => {
		render(
			<MemoryRouter>
				<App />
			</MemoryRouter>,
		);
		const link = screen.getByRole('link', { name: 'Products' });
		userEvent.click(link);

		//wait 5 seconds for the images to load
		setTimeout(() => {
			const images = screen.getAllByRole('img');
			expect(images.length).toBeGreaterThan(12);
			//it isn't a button it's an img tag
			const regex = /alt={`Add [\s\S]* to cart/;
			const addToCartButtonImg = screen.getAllByRole('img', { name: regex })[0];
			userEvent.click(addToCartButtonImg);
			console.log('This is the button: ', addToCartButtonImg);

			//wait for the red bubble to appear
			setTimeout(() => {
				const redBubble = screen.getAllByRole('p', { name: '1' })[0];
				expect(redBubble).toHaveTextContent('1');
				//do it again to check if it increments
				userEvent.click(addToCartButtonImg);
				setTimeout(() => {
					const redBubble = screen.getAllByRole('p', { name: '2' })[0];
					expect(redBubble).toHaveTextContent('2');
				}, 2000);
			}, 2000);
		}, 5000);
	});

	//Test: Clicking on the product cart button should add to cart
	it('Clicking on the product cart button should have the same number of items in the cart as there are red bubble counts for that specific item', () => {
		render(
			<MemoryRouter>
				<App />
			</MemoryRouter>,
		);
		const link = screen.getByRole('link', { name: 'Products' });
		userEvent.click(link);

		//wait 5 seconds for the images to load
		setTimeout(() => {
			const images = screen.getAllByRole('img');
			expect(images.length).toBeGreaterThan(12);
			//it isn't a button it's an img tag
			const regex = /alt={`Add [\s\S]* to cart/;
			const addToCartButtonImg = screen.getAllByRole('img', { name: regex })[0];
			userEvent.click(addToCartButtonImg);
			console.log('This is the button: ', addToCartButtonImg);

			//wait for the red bubble to appear
			setTimeout(() => {
				const redBubble = screen.getAllByRole('p', { name: '1' })[0];
				expect(redBubble).toHaveTextContent('1');
				//do it again to check if it increments
				userEvent.click(addToCartButtonImg);
				setTimeout(() => {
					const redBubble = screen.getAllByRole('p', { name: '2' })[0];
					expect(redBubble).toHaveTextContent('2');
					//go to the cart page
					const cartLink = screen.getByRole('link', { name: 'cartLink' });
					userEvent.click(cartLink);
					//structure is cartItem -> (cartItemPicture + details ->(p + p + p))
					//the p tag that is 3rd is the quantity
					const cartItems = screen.getAllByRole('div', { name: 'cartItem' });
					const cartItemQuantity = cartItems[0].children[1].children[2];
					expect(cartItemQuantity).toHaveTextContent('2');
				}, 2000);
			}, 2000);
		}, 5000);
	});

	//Test: Decrementing the counter on the cart page for a specific item
	//should decrement the red bubble on the product on the products page

	//Test: Home Page picture should change once every 7 seconds
});
