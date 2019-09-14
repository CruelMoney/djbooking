import React, { Component } from "react";
import PropTypes from "prop-types";
import { withGoogleMap, GoogleMap, Circle } from "react-google-maps";
import connectToForm from "../higher-order/connectToForm";
import useScript from "@charlietango/use-script";

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

  constructor(props) {
    super(props);
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
      radius: props.radius,
      key: Date.now(),
      defaultAnimation: 2
    };

    this.state = {
      radius: props.radius
    };
  }

  handleRadiusChange = circle => {
    const radius = Math.min(circle.getRadius(), 1000000);
    this.setState({ radius });
    if (this.context.updateValue) {
      this.context.updateValue(this.props.radiusName, radius);
    }
    if (this.props.onRadiusChange) {
      this.props.onRadiusChange(radius);
    }
  };

  handleLocationChange = circle => {
    const data = {
      lat: circle.getCenter().lat(),
      lng: circle.getCenter().lng()
    };

    if (this.context.updateValue) {
      this.context.updateValue(this.props.locationName, data);
    }
    if (this.props.onCoordinatesChange) {
      this.props.onCoordinatesChange(data);
    }
  };

  getZoomLevel(radius) {
    if (radius === 0) return 10;
    var scale = radius / 500;
    var zoomLevel = 15 - Math.log(scale) / Math.log(2);
    return parseInt(zoomLevel, 10);
  }

  render() {
    const { mapOptions } = this.props;
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
          ],
          ...mapOptions
        }}
      >
        {!!this.props.noCircle ? null : (
          <Circle
            key={Date.now()}
            ref={c => (this.circle = c)}
            defaultOptions={{
              fillColor: this.props.color || this.context.color,
              strokeWeight: 0,
              suppressUndo: true
            }}
            editable={this.props.editable}
            center={
              this.circle ? this.circle.getCenter() : this.marker.position
            }
            radius={this.state.radius}
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

const Wrapper = props => {
  return (
    <div style={{ height: props.height || `500px` }}>{props.children}</div>
  );
};

const MapLoader = props => {
  const [loaded] = useScript(
    "https://maps.googleapis.com/maps/api/js?key=AIzaSyAQNiY4yM2E0h4SfSTw3khcr9KYS0BgVgQ&libraries=geometry,places,visualization,geocode"
  );

  if (!loaded) {
    return (
      <Wrapper>
        <div style={{ height: `100%` }} />{" "}
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <SmartMap
        {...props}
        mapElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: props.height || `500px` }} />}
      />
    </Wrapper>
  );
};

export default MapLoader;
