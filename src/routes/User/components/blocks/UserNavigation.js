import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Navlink  from '../../../../components/common/Navlink'
import { getTranslate } from 'react-localize-redux';
import { connect } from 'react-redux';

class UserNavigation extends Component{

  static propTypes = {
    isDJ: PropTypes.bool,
    isCustomer: PropTypes.bool,
   }

   static contextTypes = {
       editMode: PropTypes.bool,
       toggleEditMode: PropTypes.func,
       profile: PropTypes.object
     }

  render() {
    const { translate } = this.props;
    const { profile } = this.context;
    return (
      <div>
        <nav >
          <ul className="userNavigation"
            style={
              { listStyleType: 'none',
                padding: '0',
                marginBottom: '0px',
                display: 'flex',
                flexDirection: 'row',
                textTransform: 'uppercase',
                justifyContent: 'space-between'
              }}>

          
              <li>
                <Navlink 
                userNavigation={true} 
                to={translate("routes./user/:username/profile", {username: profile.user_metadata.permaLink})}
                label="Information"/>
              </li>
       
              
            {this.props.isCustomer && this.props.isOwnProfile ?
              <li>
                <Navlink userNavigation={true} 
                to={translate("routes./user/:username/events", {username: profile.user_metadata.permaLink})} 
                label="Events"/>
              </li>
            : null}

            {this.props.isDJ && this.props.isOwnProfile  ?
              <li >
                <Navlink userNavigation={true} 
                to={translate("routes./user/:username/gigs", {username: profile.user_metadata.permaLink})}
                label="Gigs"/>
              </li>
            : null}

           { !this.props.isOwnProfile && this.props.isDJ ? 
            <li>
              <Navlink userNavigation={true} 
                to={translate("routes./user/:username/book", {username: profile.user_metadata.permaLink})}
                label="Book DJ"/>
            </li>
            :null}    
            
            {this.props.isDJ ?
              <li >
                <Navlink userNavigation={true} 
                to={translate("routes./user/:username/reviews", {username: profile.user_metadata.permaLink})} 
                label={translate("reviews")}/>
              </li>
              : null
            }

           
            { this.props.isOwnProfile ? 
            <li>
              <Navlink userNavigation={true} 
              to={translate("routes./user/:username/preferences", {username: profile.user_metadata.permaLink})} 
              label={translate("preferences")}/>
            </li>
            :null}


            
          </ul>
        </nav>
      </div>
    )
  }
}

const mapStateToProps = state => ({ translate: getTranslate(state.locale) });


export default connect(mapStateToProps, null, null, {
  pure: false
})(UserNavigation)