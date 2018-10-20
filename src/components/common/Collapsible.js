import React, { Component } from "react";

export class Collapsible extends Component {
	render() {
		return (
			<div>
				<div
					className={
						!!this.props.collapsed
							? "collapsible collapsed"
							: "collapsible active"
					}
				>
					<div
						onClick={() => this.props.handleClick(this.props.number)}
						style={{
							cursor: "pointer"
						}}
					>
						<h4 style={{ margin: "16px 0" }}>
							{" "}
							{(this.props.numbered ? this.props.number + ". " : "") +
								this.props.label}{" "}
						</h4>
						<span>
							<svg
								className="collapsible-arrow"
								viewBox="0 0 24 24"
								style={{
									position: "absolute",
									right: "15px",
									top: "0px",
									display: "inline-block",
									color: "rgba(0, 0, 0, 0.870588)",
									fill: "currentcolor",
									height: "24px",
									width: "24px",
									webkitUserSelect: "none"
								}}
							>
								<path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
							</svg>
						</span>
					</div>
					<div
						className="collapsible-container"
						style={this.props.numbered ? { padding: "0 16px" } : {}}
					>
						{this.props.lazyLoad &&
						!this.props.initialized &&
						this.props.collapsed
							? null
							: this.props.children}
					</div>
				</div>
				<div className="divider" />
			</div>
		);
	}
}

export class CollapsibleContainer extends Component {
	static defaultProps = {
		numbered: true
	};

	state = {
		openTabs: [],
		initializedTabs: []
	};

	toggleChild = count => {
		const { openTabs, initializedTabs } = this.state;
		const isOpen = openTabs.includes(count);

		if (isOpen) {
			this.setState({
				openTabs: openTabs.filter(t => t !== count)
			});
		} else {
			this.setState({
				openTabs: [...openTabs, count],
				initializedTabs: [...initializedTabs, count]
			});
			if (this.props.changeHash) {
				window.location.hash = this.props.children[count - 1].props.label;
			}
		}
	};

	renderChildren = () => {
		var count = 0;
		return React.Children.map(this.props.children, child => {
			count++;
			return React.cloneElement(child, {
				number: count,
				collapsed: !this.state.openTabs.includes(count),
				initialized: this.state.initializedTabs.includes(count),
				handleClick: this.toggleChild,
				numbered: this.props.numbered
			});
		});
	};

	render() {
		return <div className="collapsible-container">{this.renderChildren()}</div>;
	}
}
