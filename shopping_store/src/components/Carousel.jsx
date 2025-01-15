import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import f1 from '../assets/f1.jpg';
import f2 from '../assets/f2.jpg';
import f3 from '../assets/f3.jpg';
import f4 from '../assets/f4.jpg';
import f5 from '../assets/f5.jpg';

function loopArray(index, arr, direction, setPic) {
	console.log(index, direction);
	if (direction === -1) {
		if (index + direction <= 0) {
			setPic(arr[arr.length - 1]);
			return arr.length - 1;
		}
		setPic(arr[index - 1]);
		return index - 1;
	} else if (direction === 1) {
		if (index + direction >= arr.length) {
			setPic(arr[0]);
			return 0;
		}
		setPic(arr[index + 1]);
		return index + 1;
	}
}
const Carousel = () => {
	const pictures = [f1, f2, f3, f4, f5];
	const [currentPic, setCurrentPic] = useState(f1);
	return (
		<>
			<button
				id='lhsButton'
				onClick={() =>
					loopArray(
						pictures.indexOf(currentPic),
						pictures,
						-1,
						setCurrentPic,
					)
				}
			>
				&lt;
			</button>
			<img src={currentPic} alt='' />
			<button
				id='rhsButton'
				onClick={() =>
					loopArray(
						pictures.indexOf(currentPic),
						pictures,
						1,
						setCurrentPic,
					)
				}
			>
				&gt;
			</button>
		</>
	);
};

export default Carousel;
