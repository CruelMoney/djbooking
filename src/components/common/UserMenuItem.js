import React, { PropTypes } from 'react';
import { Link } from 'react-router'
import Radium from 'radium';
import muiThemeable from 'material-ui/styles/muiThemeable';
import Button from './Button'
import hexToRgb from '../../utils/ColorHelper'
import {browserHistory} from 'react-router';
var RadiumLink = Radium(Link);


const UserMenuItem = React.createClass({
  propTypes: {
     profile: PropTypes.object.isRequired,
   },

  render() {

    //Cut length if too long
    function getLabel(profile){
        var label = profile.name

        if (label.length > 20){
          return label.substring(0, 20) + "..."
        }else {
          return label
        }
    }

    const styles ={
      image:{
        backgroundImage: 'url('+this.props.profile.picture+')',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'auto 150%',
        width: '30px',
        height: '30px',
        marginRight: '4px',
        borderRadius: '50%',
      },
      inline:{
        display: 'inline-block'
      },
      flex:{
        display: 'flex',
        alignItems: 'center'
      }
    }


    return    <div style={styles.flex}>
                <div style={[styles.image, styles.inline]}/>
                <div style={[styles.inline]} >
                  {getLabel(this.props.profile)}
                </div>
              </div>
}
})


var StyledUserMenuItem = Radium(UserMenuItem);
export default muiThemeable()(StyledUserMenuItem);
