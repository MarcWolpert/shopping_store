import { useState, useEffect } from 'react';
import f1 from '../assets/f1.jpg';
import f2 from '../assets/f2.jpg';
import f3 from '../assets/f3.jpg';
import f4 from '../assets/f4.jpg';
import f5 from '../assets/f5.jpg';

function loopArray(index, rbound, direction, setPic) {
	switch (direction) {
		case -1:
			index + direction <= 0 ? setPic(rbound - 1) : setPic(index - 1);
			break;
		case 1:
			index + direction >= rbound ? setPic(0) : setPic(index + 1);
			break;
		default:
			break;
	}
}
const Carousel = () => {
	const pictures = [f1, f2, f3, f4, f5];
	const pictureLength = pictures.length;
	const [currentPic, setCurrentPic] = useState(0);
	useEffect(() => {
		const timer = setTimeout(() => {
			loopArray(currentPic, pictureLength, 1, setCurrentPic);
		}, 5000);
		return () => {
			clearTimeout(timer);
		};
	}, [currentPic]);

	return (
		<>
			<div className='carouselContainer'>
				<button
					id='lhsButton'
					onClick={() => loopArray(currentPic, pictureLength, -1, setCurrentPic)}
				>
					&lt;
				</button>
				<img src={pictures[currentPic]} alt='Fashionable clothing' />
				<button
					id='rhsButton'
					onClick={() => loopArray(currentPic, pictureLength, 1, setCurrentPic)}
				>
					&gt;
				</button>
			</div>
		</>
	);
};

export default Carousel;
