import React, { PropTypes } from 'react';

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
        display: 'inline-block'
      },
      flex:{
        display: 'flex',
        alignItems: 'center',
      }
    }


    return  (  <div style={styles.flex}>
      <div style={styles.image}/>
      <div style={{display:'inline-block'}} >
        {getLabel(this.props.name)}
      </div>
    </div>)
}
})
export default UserMenuItem
