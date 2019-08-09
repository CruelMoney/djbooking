import React, { useEffect, useState } from "react";
import Modal from "react-modal";

function indexOf(arr, prop) {
	if (arr.indexOf) return arr.indexOf(prop);
	for (var i = 0, len = arr.length; i < len; i++) if (arr[i] === prop) return i;
	return -1;
}

const addClass = function(className, el) {
	if (!el) return;
	if (el.className === "") return (el.className = className);
	var classes = el.className.split(" ");
	if (indexOf(classes, className) > -1) return classes;
	classes.push(className);
	el.className = classes.join(" ");
	return classes;
};

const removeClass = function(className, el) {
	if (!el) return;
	if (el.className === "") return;
	var classes = el.className.split(" ");
	var idx = indexOf(classes, className);
	if (idx > -1) classes.splice(idx, 1);
	el.className = classes.join(" ");
	return classes;
};

const Popup = ({
	showing,
	onClickOutside,
	noPadding,
	width,
	hideClose,
	noBackground,
	children,
	lazy = true
}) => {
	const [showingChildren, setShowingChildren] = useState({ showing });

	useEffect(() => {
		if (!showing) {
			//  document.getElementById("root").style.webkitFilter = "blur(0px)"
			removeClass("popup-open", document.body);
			const to = setTimeout(() => {
				setShowingChildren(false);
			}, 500);
			return () => {
				removeClass("popup-open", document.body);
				clearTimeout(to);
			};
		} else {
			setShowingChildren(true);
			addClass("popup-open", document.body);
			return () => {
				removeClass("popup-open", document.body);
			};
		}
	}, [showing]);

	const style = {
		overlay: {
			position: "fixed",
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			backgroundColor: "none",
			zIndex: 1000,
			pointerEvents: "none"
		},
		content: {
			position: "absolute",
			overflow: "auto",
			WebkitOverflowScrolling: "touch",
			outline: "none",
			padding: noPadding ? 0 : "20px",
			border: "none",
			background: "none",
			pointerEvents: "none"
		}
	};

	return (
		<Modal style={style} isOpen={true} contentLabel="popup">
			<div
				className={"filter-background" + (showing ? " active" : "")}
				style={{
					position: "fixed",
					zIndex: "1000",
					left: "0",
					top: "0",
					width: "100%",
					height: "100% ",
					overflow: "auto",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					padding: noPadding ? 0 : "10px"
				}}
				onClick={_ => onClickOutside && onClickOutside()}
			>
				<div
					style={{
						padding: noPadding ? 0 : "20px",
						paddingTop: hideClose || noPadding ? "0px" : "5px",
						minWidth: "300px",
						width: width ? width : null,
						backgroundColor: noBackground ? "transparent" : "white",
						zIndex: "1001"
					}}
					className={
						"card popup" +
						(showing ? " active" : "") +
						(noPadding ? " no-padding" : "")
					}
					onClick={function(event) {
						event.stopPropagation();
					}}
				>
					{!hideClose ? (
						<div
							style={{
								position: noPadding ? "absolute" : "relative",
								textAlign: "right",
								right: noPadding ? "1em" : null,
								width: "100%"
							}}
						>
							<span
								style={{
									color: "#aaaaaa",
									fontSize: "28px",
									fontWeight: "bold",
									cursor: "pointer"
								}}
								onClick={_ => onClickOutside && onClickOutside()}
							>
								×
							</span>
						</div>
					) : null}
					{!lazy || showingChildren ? <div>{children}</div> : null}
				</div>
			</div>
		</Modal>
	);
};

export default Popup;
