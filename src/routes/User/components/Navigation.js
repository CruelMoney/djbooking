import React, { useRef, useLayoutEffect } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";

const StyledNav = styled.nav`
	height: 48px;
	border-top: 2px solid #ebebeb40;
	display: flex;
	align-items: center;
	position: relative;
`;

const StyledLink = styled(({ indicateActive, ...rest }) => (
	<NavLink {...rest} />
))`
	font-size: 18px;
	color: #ffffff !important;
	letter-spacing: 1.2px;
	text-align: left;
	margin-right: 60px;
	text-transform: uppercase;
	font-family: "AvenirNext-Bold";
	opacity: ${({ indicateActive }) => {
		return indicateActive ? 1 : 0.6;
	}};
	&:hover {
		opacity: 1;
		color: #ffffff;
	}
`;

const ActiveIndicator = styled.span`
	height: 2px;
	background: #ffffff;
	position: absolute;
	top: -2px;
	left: 0;
	width: 1px;
	transform-origin: left;
	transition: transform 200ms cubic-bezier(0.075, 0.82, 0.165, 1);
`;

const Navigation = ({ routes, location }) => {
	const navRef = useRef();
	const activeRef = useRef();
	const indicator = useRef();

	const setActiveIndicatorFromElement = el => {
		if (el) {
			const { left: navLeft } = navRef.current.getBoundingClientRect();
			const { left, width } = el.getBoundingClientRect();

			indicator.current.style.transform = `translateX(${left -
				navLeft}px) scaleX(${width})`;
		}
	};

	const resetIndicator = () => {
		setActiveIndicatorFromElement(activeRef.current);
	};

	useLayoutEffect(resetIndicator, [routes]);

	return (
		<StyledNav ref={navRef} onMouseLeave={resetIndicator}>
			<ActiveIndicator ref={indicator} />
			{routes.map(({ route, label }) => {
				const active = location.pathname.includes(route);
				return (
					<StyledLink
						exact
						key={route}
						to={route}
						innerRef={r => {
							if (active) {
								activeRef.current = r;
							}
						}}
						onMouseEnter={({ target }) => setActiveIndicatorFromElement(target)}
						indicateActive={active}
					>
						{label}
					</StyledLink>
				);
			})}
		</StyledNav>
	);
};

export default withRouter(Navigation);
