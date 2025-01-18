import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import routes from './routes';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

//Test: Home page in <App> has a Link with a heading in it with Lagrange as the text content
describe('Home component', () => {
	beforeEach(() => {
		localStorage.clear();
	});
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

		// Check for img tag to have alt text with 'Fashionable clothing'
		const images = screen.getAllByRole('img');
		const img = images.find((image) => image.alt.match('Fashionable clothing'));
		expect(img).toHaveAttribute('alt', 'Fashionable clothing');
	});

	//Test: Products link goes to a page with more than one product
	//product has an image, which is a link to product details page,
	//a price, an add to cart button

	it('Products page has >10 products', async () => {
		// Use a MemoryRouter for testing:
		const testRouter = createMemoryRouter(routes, {
			initialEntries: ['/'], // start on the home page
		});

		render(<RouterProvider router={testRouter} />);

		// Click the "Products" link
		const productLink = screen.getByRole('link', { name: /Products/i });
		await userEvent.click(productLink);

		// Wait for products to appear
		await waitFor(
			() => {
				const images = screen.getAllByRole('img');
				expect(images.length).toBeGreaterThan(10);
			},
			{ timeout: 8000 },
		);
	});

	//Test: Clicking on the product cart button should display a red bubble that is incremented by 1
	it(
		'Clicking on the product cart button should display a red bubble that is incremented by 1',
		async () => {
			// Use a MemoryRouter for testing:
			const testRouter = createMemoryRouter(routes, {
				initialEntries: ['/'], // start on the home page
			});

			render(<RouterProvider router={testRouter} />);

			const link = screen.getByRole('link', { name: 'Products' });
			await userEvent.click(link);
			await new Promise((resolve) => setTimeout(resolve, 1000));

			let images = screen.getAllByRole('img');
			expect(images.length).toBeGreaterThan(12);

			// "Add ... to cart" alt text
			const addToCartButtonImg = screen.getByRole('button', {
				name: /Add Sony WH-1000XM3/i,
			});

			await userEvent.click(addToCartButtonImg);
			//set 1.5 second timeout
			await new Promise((resolve) => setTimeout(resolve, 1500));

			// First check: bubble = 1
			let redBubble = screen.getByText('1');
			expect(redBubble).toHaveTextContent('1');

			// Click again
			await userEvent.click(addToCartButtonImg);

			// Second check: bubble = 2
			redBubble = screen.getByText('2');
			expect(redBubble).toHaveTextContent('2');
			localStorage.clear();
		},
		{ timeout: 15000 },
	);

	//Test: Clicking on the product cart button should add to cart
	it(
		'Clicking on the product cart button should have the same number of items in the cart as there are red bubble counts for that specific item',
		async () => {
			// Use a MemoryRouter for testing:
			const testRouter = createMemoryRouter(routes, {
				initialEntries: ['/'], // start on the home page
			});

			render(<RouterProvider router={testRouter} />);

			const link = screen.getByRole('link', { name: 'Products' });
			await userEvent.click(link);
			await new Promise((resolve) => setTimeout(resolve, 1000));

			let images = screen.getAllByRole('img');
			expect(images.length).toBeGreaterThan(12);

			// "Add ... to cart" alt text
			const addToCartButtonImg = screen.getByRole('button', {
				name: /Add Sony WH-1000XM3/i,
			});

			await userEvent.click(addToCartButtonImg);
			//set 1.5 second timeout
			await new Promise((resolve) => setTimeout(resolve, 1500));
			//get item name
			const itemName = screen.getByText(/Sony WH-1000XM3/i).textContent;

			// First check: bubble = 1
			let redBubble = screen.getByText('1');
			expect(redBubble).toHaveTextContent('1');

			// Click again
			await userEvent.click(addToCartButtonImg);

			// Second check: bubble = 2
			redBubble = screen.getByText('2');
			expect(redBubble).toHaveTextContent('2');

			// Go to the cart page
			const cartLink = screen.getByRole('link', { name: /Shopping Cart/i });
			await userEvent.click(cartLink);

			const cartItemQuantity = screen.getByText(/[\s\S]*2[\s\S]*/i);
			expect(cartItemQuantity).toHaveTextContent('2');
		},
		{ timeout: 15000 },
	);

	// //Test: Decrementing the counter on the cart page for a specific item
	// //should decrement the red bubble on the product on the products page
	it(
		'Decrementing the counter on the cart page for a specific item should decrement the red bubble on the product on the products page',
		async () => {
			// Use a MemoryRouter for testing:
			const testRouter = createMemoryRouter(routes, {
				initialEntries: ['/'], // start on the home page
			});

			render(<RouterProvider router={testRouter} />);

			const link = screen.getByRole('link', { name: 'Products' });
			await userEvent.click(link);
			await new Promise((resolve) => setTimeout(resolve, 1000));

			let images = screen.getAllByRole('img');
			expect(images.length).toBeGreaterThan(12);

			// "Add ... to cart" alt text
			const addToCartButtonImg = screen.getByRole('button', {
				name: /Add Sony WH-1000XM3/i,
			});

			await userEvent.click(addToCartButtonImg);
			//set 1.5 second timeout
			await new Promise((resolve) => setTimeout(resolve, 1500));
			//get item name
			const itemName = screen.getByText(/Sony WH-1000XM3/i).textContent;

			// First check: bubble = 1
			let redBubble = screen.getByText('1');
			expect(redBubble).toHaveTextContent('1');

			// Click again
			await userEvent.click(addToCartButtonImg);

			// Second check: bubble = 2
			redBubble = screen.getByText('2');
			expect(redBubble).toHaveTextContent('2');

			// Go to the cart page
			const cartLink = screen.getByRole('link', { name: /Shopping Cart/i });
			await userEvent.click(cartLink);

			const cartItemQuantity = screen.getByText(/[\s\S]*2[\s\S]*/i);
			expect(cartItemQuantity).toHaveTextContent('2');

			// Decrement the quantity
			const decrementButton = screen.getByRole('button', { name: '-' });
			await userEvent.click(decrementButton);
			expect(cartItemQuantity).toHaveTextContent('1');

			// Go back to the products page
			const productsLink = screen.getByRole('link', { name: 'Products' });
			await userEvent.click(productsLink);

			// Wait 2 seconds
			await new Promise((resolve) => setTimeout(resolve, 2000));

			// Now the red bubble should be 1
			//select the red bubble that is the child of the product with
			// the name of the item
			redBubble = screen.getByText('1');
			expect(redBubble).toHaveTextContent('1');
		},
		{ timeout: 15000 },
	);

	//Test: Home Page picture should change once every 7 seconds
	it(
		'Home Page picture should change once every 7 seconds',
		async () => {
			// Use a MemoryRouter for testing:
			const testRouter = createMemoryRouter(routes, {
				initialEntries: ['/'], // start on the home page
			});

			render(<RouterProvider router={testRouter} />);

			const images = screen.getAllByRole('img');
			const homeImage = images.find((img) => img.alt.match('Fashionable clothing'));
			const homeImageSrc = homeImage.src;

			// Wait 7 seconds
			await new Promise((resolve) => setTimeout(resolve, 7000));

			const newImages = screen.getAllByRole('img');
			const newHomeImage = newImages.find((img) =>
				img.alt.match('Fashionable clothing'),
			);
			const newHomeImageSrc = newHomeImage.src;
			expect(homeImageSrc).not.toBe(newHomeImageSrc);
		},
		{ timeout: 15000 },
	);
});
