import React, { Component } from "react";
import PropTypes from "prop-types";
import { withGoogleMap, GoogleMap, Circle } from "react-google-maps";
import connectToForm from "../higher-order/connectToForm";

/*
 * This is the modify version of:
 * https://developers.google.com/maps/documentation/javascript/examples/event-arguments
 *
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 *
 * We use React 0.14 stateless function components here.
 * https://facebook.github.io/react/blog/2015/09/10/react-v0.14-rc1.html#stateless-function-components
 */
class SimpleMap extends Component {
	circle = null;

	marker = {
		position: { lat: 56.0, lng: 10.0 },
		radius: 250000,
		key: `Denmark`,
		defaultAnimation: 2
	};

	componentWillMount() {
		const short = !!this.props.value.lat;

		const position = short
			? {
					...this.props.value
			  }
			: {
					lat: this.props.value.latitude,
					lng: this.props.value.longitude
			  };

		this.marker = {
			position,
			radius: this.props.radius,
			key: Date.now(),
			defaultAnimation: 2
		};
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (nextProps.editable !== this.props.editable) {
			return true;
		}
		return false;
	}

	handleRadiusChange = circle => {
		this.context.updateValue(this.props.radiusName, circle.getRadius());
	};

	handleLocationChange = circle => {
		this.context.updateValue(this.props.locationName, {
			lat: circle.getCenter().lat(),
			lng: circle.getCenter().lng()
		});
	};

	getZoomLevel(radius) {
		if (radius === 0) return 10;
		var scale = radius / 500;
		var zoomLevel = 15 - Math.log(scale) / Math.log(2);
		return parseInt(zoomLevel, 10);
	}

	render() {
		return (
			<GoogleMap
				key={this.props.key}
				defaultZoom={this.getZoomLevel(this.props.radius)}
				defaultCenter={this.props.defaultCenter || this.marker.position}
				streetViewControl={false}
				defaultOptions={{
					scrollwheel: false,
					streetViewControl: false,
					mapTypeControl: false,
					styles: [
						{
							stylers: [{ visibility: "off" }]
						},
						{
							featureType: "water",
							stylers: [{ visibility: "simplified" }, { color: "#ffffff" }]
						},
						{
							featureType: "landscape",
							stylers: [{ visibility: "on" }, { color: "#32325D" }]
						},
						{
							featureType: "administrative.locality",
							elementType: "labels",
							stylers: [{ color: "#ffffff" }, { visibility: "on" }]
						},
						{
							featureType: "administrative.locality",
							elementType: "labels.text.stroke",
							stylers: [{ color: "#32325D" }, { visibility: "on" }]
						},
						{
							featureType: "road.arterial",
							elementType: "geometry",
							stylers: [
								{ visibility: this.props.hideRoads ? "off" : "simplified" }
							]
						},
						{
							featureType: "administrative.province",
							stylers: [{ visibility: "on" }]
						},
						{
							featureType: "administrative.province",
							elementType: "labels.text.fill",
							stylers: [{ color: "#ffffff" }, { visibility: "on" }]
						},
						{
							featureType: "administrative.province",
							elementType: "labels.text.stroke",
							stylers: [{ color: "#32325D" }, { visibility: "on" }]
						},
						{
							featureType: "administrative.country",
							stylers: [{ visibility: "on" }]
						},
						{
							featureType: "administrative.country",
							elementType: "labels.text.fill",
							stylers: [{ color: "#ffffff" }, { visibility: "on" }]
						},
						{
							featureType: "administrative.country",
							elementType: "labels.text.stroke",
							stylers: [{ color: "#32325D" }, { visibility: "on" }]
						}
					]
				}}
			>
				{!!this.props.noCircle ? null : (
					<Circle
						ref={c => (this.circle = c)}
						defaultOptions={{
							fillColor: this.context.color,
							strokeWeight: 0,
							suppressUndo: true
						}}
						editable={this.props.editable}
						center={
							this.circle ? this.circle.getCenter() : this.marker.position
						}
						radius={this.circle ? this.circle.getRadius() : this.marker.radius}
						onCenterChanged={() => this.handleLocationChange(this.circle)}
						onRadiusChanged={() => this.handleRadiusChange(this.circle)}
					/>
				)}
			</GoogleMap>
		);
	}
}

SimpleMap.contextTypes = {
	color: PropTypes.string,
	updateValue: PropTypes.func,
	registerReset: PropTypes.func
};

const SmartMap = connectToForm(withGoogleMap(SimpleMap));

const WrappedMap = props => {
	return (
		<SmartMap
			{...props}
			containerElement={<div style={{ height: props.height || `500px` }} />}
			mapElement={<div style={{ height: `100%` }} />}
			loadingElement={<div style={{ height: `100%` }} />}
		/>
	);
};

export default WrappedMap;
