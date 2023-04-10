import {RefObject, useEffect} from "react";

const useOutsideRef = (ref: RefObject<Element>, callback: () => void) => {
	useEffect(() => {
		function handleClickOutside(event: {target: any}) {
			if (ref.current && !ref.current.contains(event.target)) {
				callback();
			}
		}
		if (document) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			if (document) {
				document.removeEventListener("mousedown", handleClickOutside);
			}
		};
	}, [ref]);
};

export default useOutsideRef;
