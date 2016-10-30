import React, { PropTypes } from 'react';
import Radium from 'radium';
import muiThemeable from 'material-ui/styles/muiThemeable';

const UserMenuItem = React.createClass({
  propTypes: {
      name: PropTypes.string,
      picture: PropTypes.string
   },

  render() {

    //Cut length if too long
    function getLabel(name){
        if (name.length > 20){
          return name.substring(0, 20) + "..."
        }else {
          return name
        }
    }

    const styles ={
      image:{
        backgroundImage: 'url('+this.props.picture+')',
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
        alignItems: 'center',
      }
    }


    return  (  <div style={styles.flex}>
      <div style={[styles.image, styles.inline]}/>
                <div style={[styles.inline]} >
                  {getLabel(this.props.name)}
                </div>
              </div>)
}
})


var StyledUserMenuItem = Radium(UserMenuItem);
export default muiThemeable()(StyledUserMenuItem);
