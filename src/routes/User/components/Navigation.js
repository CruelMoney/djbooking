import React, { useState, useRef, useLayoutEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ScrollToTop from "../../../components/common/ScrollToTop";
const StyledNav = styled.nav`
	height: 48px;
	border-top: 2px solid #ebebeb40;
	display: flex;
	align-items: center;
	position: relative;
`;

const StyledLink = styled.div`
	font-size: 18px;
	color: #ffffff;
	letter-spacing: 1.2px;
	text-align: left;
	margin-right: 60px;
	text-transform: uppercase;
	font-family: "AvenirNext-Bold";
	opacity: ${({ active }) => (active ? 1 : 0.6)};
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
	transform: ${({ state }) =>
		` translateX(${state.left}px) scaleX(${state.width})`};
	transition: transform 200ms cubic-bezier(0.075, 0.82, 0.165, 1);
`;

const Navigation = ({ routes }) => {
	const [activeIndicatorState, setActiveIndicator] = useState({
		left: 0,
		width: 0
	});
	const navRef = useRef();
	const activeRef = useRef();

	const setActiveIndicatorFromElement = el => {
		const { left: navLeft } = navRef.current.getBoundingClientRect();
		const { left, width } = el.getBoundingClientRect();
		setActiveIndicator({
			left: left - navLeft,
			width
		});
	};

	const resetIndicator = () => {
		setActiveIndicatorFromElement(activeRef.current);
	};

	useLayoutEffect(resetIndicator, [routes]);

	return (
		<StyledNav ref={navRef} onMouseLeave={resetIndicator}>
			<ActiveIndicator state={activeIndicatorState} />
			{routes.map(({ route, label, active }) => (
				<Link exact key={route} to={route}>
					<StyledLink
						ref={r => {
							if (active) {
								activeRef.current = r;
							}
						}}
						onMouseEnter={({ target }) => setActiveIndicatorFromElement(target)}
						active={active}
					>
						{label}
					</StyledLink>
				</Link>
			))}
		</StyledNav>
	);
};

export default Navigation;
