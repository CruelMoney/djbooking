import React, { PropTypes } from 'react';
import {GoogleMapLoader, GoogleMap, Marker} from "react-google-maps";
import Radium from 'radium';
import muiThemeable from 'material-ui/styles/muiThemeable';


var Map = React.createClass({

//   propTypes: {
//
//   },
//
//   contextTypes: {
//
//   },
//
//   getDefaultProps() {
//     },
//
//
//   componentWillMount() {
//
//   },
//
//   componentWillUnmount() {
//   },
//
//   componentWillReceiveProps(nextProps) {
//
// },
//
//   getDefaultProps() {
//
//   },
//
//   getInitialState() {
//
//   },

  render() {
    var styles = {

      base: {

      },

    };


    return (
      <div >
        <GoogleMapLoader
          containerElement={
            <div
              {...this.props.containerElementProps}
              style={{
                height: "100%",
              }}
            />
          }
          googleMapElement={
            <GoogleMap
              defaultZoom={3}
              defaultCenter={{ lat: -25.363882, lng: 131.044922 }}
              onClick={this.props.onMapClick}
            >
              
            </GoogleMap>
          }
        />
      </div>




    );
  }
});

var StyledMap = Radium(Map);
export default muiThemeable()(StyledMap);
