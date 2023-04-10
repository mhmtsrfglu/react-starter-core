import {useEffect, useState} from "react";

const useWindowSize = () => {
	const [windowSize, setWindowSize] = useState({
		width: 0,
		height: 0,
		screen: "desktop",
	});
	useEffect(() => {
		function handleResize() {
			if (window.innerWidth > 0 && window.innerWidth <= 480) {
				setWindowSize({
					width: window.innerWidth,
					height: window.innerHeight,
					screen: "mobile",
				});
			} else if (window.innerWidth > 480 && window.innerWidth <= 768) {
				setWindowSize({
					width: window.innerWidth,
					height: window.innerHeight,
					screen: "tablet",
				});
			} else if (window.innerWidth >= 769 && window.innerWidth <= 1024) {
				setWindowSize({
					width: window.innerWidth,
					height: window.innerHeight,
					screen: "small",
				});
			} else if (window.innerWidth >= 1025 && window.innerWidth <= 1200) {
				setWindowSize({
					width: window.innerWidth,
					height: window.innerHeight,
					screen: "desktop",
				});
			} else if (window.innerWidth >= 1201) {
				setWindowSize({
					width: window.innerWidth,
					height: window.innerHeight,
					screen: "extra-large",
				});
			}
		}
		window.addEventListener("resize", handleResize);
		handleResize();
		return () => window.removeEventListener("resize", handleResize);
	}, []);
	return windowSize;
};

export default useWindowSize;
