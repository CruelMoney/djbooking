import { useEffect } from "react";
import { withRouter } from "react-router";

const ScrollToTop = ({ location: { pathname }, top = 0, animate }) => {
	useEffect(() => {
		if (window.scrollY > top) {
			window.scroll({
				top,
				left: 0,
				behavior: animate ? "smooth" : "auto"
			});
		}
	}, [animate, pathname, top]);

	return null;
};

export default withRouter(ScrollToTop);
