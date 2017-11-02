import React, {Component} from 'react';
import {notificationService} from '../../utils/NotificationService'
import {connect} from 'react-redux'

class UserMenuItem extends Component{

  componentWillMount(){
    notificationService.init(this.props.userId);
  }

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
        backgroundSize: 'auto 100%',
        width: '30px',
        height: '30px',
        marginRight: '4px',
        borderRadius: '50%',
        display: 'inline-block',
        position: 'relative'
      },
      flex:{
        display: 'flex',
        alignItems: 'center',
      }
    }


    return  (  
    <div className="menu-user" style={styles.flex}>
      <div style={styles.image}>
        {
          this.props.notifications > 0 ?
          <div className={"notification-bubble"}>
            {this.props.notifications}
          </div>
          : null
        }
       
      </div>
      <div style={{display:'inline-block'}} >
        {getLabel(this.props.name)}
      </div>
    </div>)
}
}

const mapStateToProps = (state,ownProps) => {
  return{
    userId: state.login.profile.auth0Id,
    notifications: state.notifications.data.length
  }
}

export default connect(mapStateToProps)(UserMenuItem)
