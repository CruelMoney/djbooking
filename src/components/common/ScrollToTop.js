import { useEffect } from "react";
import { withRouter } from "react-router";

const ScrollToTop = ({ location: { pathname } }) => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
};

export default withRouter(ScrollToTop);
