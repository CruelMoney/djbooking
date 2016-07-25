import  React, {PropTypes} from "react"
import { GoogleMapLoader, GoogleMap, Circle } from "react-google-maps"
import { default as update } from "react-addons-update"


/*
 * This is the modify version of:
 * https://developers.google.com/maps/documentation/javascript/examples/event-arguments
 *
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 *
 * We use React 0.14 stateless function components here.
 * https://facebook.github.io/react/blog/2015/09/10/react-v0.14-rc1.html#stateless-function-components
 */
var SimpleMap = React.createClass({

    circle: {},

      propTypes:{
        editable: PropTypes.bool,
        initialPosition: PropTypes.object,
        radius:         PropTypes.number
      },

      getInitialState(){
        return{
        markers: [{
          position: {lat: 56.00, lng: 10.00
          },
          radius: 220000,
          key: `Denmark`,
          defaultAnimation: 2,
        }],
        }
      },

      componentWillMount(){
        this.setState({
          markers: [{
            position: this.props.initialPosition,
            radius: this.props.radius,
            key: Date.now(),
            defaultAnimation: 2,
          }]
        })
      },

      componentWillReceiveProps(nextProps){
        this.setState({
          markers: [{
            position: nextProps.initialPosition,
            radius: nextProps.radius,
            key: Date.now(),
            defaultAnimation: 2,
          }]
        })
      },


        /*
         * This is called when you click on the map.
         * Go and try click now.
         */
        _handle_map_click(event) {
          setTimeout(() => {
            let { markers } = this.state
            markers =  [
                {
                  position: event.latLng,
                  defaultAnimation: 2,
                  key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys
                  radius: this.circle.getRadius()
                },
              ]

            this.setState({ markers })
          }, 300)

        },

        _handle_marker_rightclick(index, event) {
          /*
           * All you modify is data, and the view is driven by data.
           * This is so called data-driven-development. (And yes, it's now in
           * web front end and even with google maps API.)
           */
          let { markers } = this.state
          markers = update(markers, {
            $splice: [
              [index, 1],
            ],
          })
          this.setState({ markers })
        },

        handleRadiusChanged(circle) {
          console.log(circle.getRadius())
        },



    render(){

    return(
      <section style={{ height: `500px` }}>
        <GoogleMapLoader
          containerElement={
            <div
              {...this.props.containerElementProps}
              style={{
                height: `100%`,
              }}
            />
          }
          googleMapElement={
            <GoogleMap
              defaultZoom={6}
              defaultCenter={{ lat: 56.00, lng: 10.00 }}
              streetViewControl= {false}
              defaultOptions={{
                draggable: this.props.editable,
                scrollwheel: this.props.editable,
                panControl: this.props.editable,
                zoomControl: this.props.editable,
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
                  { "color": "#000000" }
                  ]
                },{
                  "featureType": "administrative.locality",
                  "elementType": "labels.text.fill",
                  "stylers": [
                  { "color": "#ffffff" },
                  { "visibility": "on" }
                  ]
                },{
                  "featureType": "administrative.locality",
                  "elementType": "labels.text.stroke",
                  "stylers": [
                  { "color": "#000000" },
                  { "visibility": "on" }
                  ]
                },{
                  "featureType": "road.arterial",
                  "elementType": "geometry",
                  "stylers": [
                  { "visibility": "simplified" }
                  ]
                }
                ]
              }}
            >
              {this.state.markers.map((marker, index) => (
                <Circle
                  ref = {(c) => this.circle = c}
                  defaultOptions = {{
                    fillColor: this.props.themeColor,
                    strokeWeight: 0,
                    suppressUndo: true
                  }}
                  editable= {this.props.editable}
                  center= {marker.position}
                  radius= {marker.radius}
                  onRadiusChanged={() => this.handleRadiusChanged(this.circle)}
                />

              ))}
            </GoogleMap>
          }
        />
      </section>
    )}

})

export default SimpleMap
