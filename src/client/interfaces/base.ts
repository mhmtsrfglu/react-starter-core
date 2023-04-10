import {Children, Style} from "../types/children";

interface Base {
	children?: Children;
	id: string | number;
	className?: string | "";
	style?: Style;
}

export default Base;
