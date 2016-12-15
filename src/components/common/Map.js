import  React, {PropTypes} from "react"
import { GoogleMapLoader, GoogleMap, Circle } from "react-google-maps"
import connectToForm from '../higher-order/connectToForm'

/*
 * This is the modify version of:
 * https://developers.google.com/maps/documentation/javascript/examples/event-arguments
 *
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 *
 * We use React 0.14 stateless function components here.
 * https://facebook.github.io/react/blog/2015/09/10/react-v0.14-rc1.html#stateless-function-components
 */
class SimpleMap extends React.Component{
      circle = {}

      static propTypes:{
        editable:        PropTypes.bool,
        value:           PropTypes.object,
        radius:          PropTypes.number,
        radiusName:      PropTypes.string,
        locationName:    PropTypes.string
      }

      static contextTypes = {
        color: PropTypes.string,
        updateValue: PropTypes.func,
        registerReset: PropTypes.func,
      }


      state={
        marker: {
          position: {lat: 56.00, lng: 10.00
          },
          radius: 250000,
          key: `Denmark`,
          defaultAnimation: 2,
        }

      }

      componentWillMount(){
          this.setState({
          marker: {
            position: this.props.value,
            radius: this.props.radius,
            key: Date.now(),
            defaultAnimation: 2,
          }
        })
      }

      shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.editable !== this.props.editable) {
          return true
        }
        return false;
      }

      handleRadiusChange = (circle) => {
           this.context.updateValue(this.props.radiusName,
            circle.getRadius()
          )
      }

      handleLocationChange = (circle) => {
          this.context.updateValue(this.props.locationName,
          {lat: circle.getCenter().lat(),
           lng: circle.getCenter().lng()
          })
        }



    render(){
    return(
      <div style={{ height: this.props.height || `500px` }}>
        <GoogleMapLoader
          containerElement={
            <div
              style={{
                height: `100%`,
              }}
            />
          }
          googleMapElement={
            <GoogleMap
              defaultZoom={this.props.zoom || 8}
              defaultCenter={ this.state.marker.position }
              streetViewControl={false}
              defaultOptions={{
                scrollwheel: false,
                streetViewControl: false,
                mapTypeControl: false,
                styles: [
                {
                  "stylers": [
                  { "visibility": "off" }
                  ]
                },{
                  "featureType": "water",
                  "stylers": [
                  { "visibility": "simplified" },
                  { "color": "#ffffff" }
                  ]
                },{
                  "featureType": "landscape",
                  "stylers": [
                  { "visibility": "on" },
                  { "color": "#32325D" }
                  ]
                },{
                  "featureType": "administrative.locality",
                  "elementType": "labels",
                  "stylers": [
                  { "color": "#ffffff" },
                  { "visibility": "on" }
                  ]
                },{
                  "featureType": "administrative.locality",
                  "elementType": "labels.text.stroke",
                  "stylers": [
                  { "color": "#32325D" },
                  { "visibility": "on" }
                  ]
                },{
                  "featureType": "road.arterial",
                  "elementType": "geometry",
                  "stylers": [
                  { "visibility": "simplified" }
                  ]
                },{
                  "featureType": "administrative.province",
                  "stylers": [
                  { "visibility": "on" }
                  ]
                },{
                  "featureType": "administrative.province",
                  "elementType": "labels.text.fill",
                  "stylers": [
                  { "color": "#ffffff" },
                  { "visibility": "on" }
                  ]
                },{
                  "featureType": "administrative.province",
                  "elementType": "labels.text.stroke",
                  "stylers": [
                  { "color": "#32325D" },
                  { "visibility": "on" }
                  ]
                },{
                  "featureType": "administrative.country",
                  "stylers": [
                  { "visibility": "on" }
                  ]
                },{
                  "featureType": "administrative.country",
                  "elementType": "labels.text.fill",
                  "stylers": [
                  { "color": "#ffffff" },
                  { "visibility": "on" }
                  ]
                },{
                  "featureType": "administrative.country",
                  "elementType": "labels.text.stroke",
                  "stylers": [
                  { "color": "#32325D" },
                  { "visibility": "on" }
                  ]
                }
                ]
              }}
            >

              <Circle
                ref={(c) => this.circle = c}
                defaultOptions={{
                  fillColor: this.context.color,
                  strokeWeight: 0,
                  suppressUndo: true
                }}
                editable={this.props.editable}
                center={this.state.marker.position}
                radius={this.state.marker.radius}

                onCenterChanged={()=>this.handleLocationChange(this.circle)}
                onRadiusChanged={()=>this.handleRadiusChange(this.circle)}
              />

            </GoogleMap>
          }
        />
      </div>
    )}
}

export default connectToForm(SimpleMap)
