import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Navlink  from '../../../../components/common/Navlink'

export default class UserNavigation extends Component{

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

    return (
      <div>
        {/* {!this.props.isDJ ?
          <div style={styles.userImageWrap}>
          <div style={ styles.image}/>
          {this.context.editMode && <div style={styles.changeProfilePictureText}>
          <input name="fileupload" id="fileupload"  type="file" onChange={this.handleFile}/>
          <label htmlFor="fileupload"><span>Change image</span></label>
          </div> }
          </div>
          :null
        } */}



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
                <Navlink userNavigation={true} to={"/user/"+this.context.profile.user_metadata.permaLink+"/profile"} label="Information"/>
              </li>
       
              
            {this.props.isCustomer && this.props.isOwnProfile ?
              <li>
                <Navlink userNavigation={true} to={"/user/"+this.context.profile.user_metadata.permaLink+"/events"} label="Events"/>
              </li>
            : null}

            {this.props.isDJ && this.props.isOwnProfile  ?
              <li >
                <Navlink userNavigation={true} to={"/user/"+this.context.profile.user_metadata.permaLink+"/gigs"} label="Gigs"/>
              </li>
            : null}

           { !this.props.isOwnProfile && this.props.isDJ ? 
            <li>
              <Navlink userNavigation={true} to={"/user/"+this.context.profile.user_metadata.permaLink+"/book"} label="Book DJ"/>
            </li>
            :null}    
            
            {this.props.isDJ ?
              <li >
                <Navlink userNavigation={true} to={"/user/"+this.context.profile.user_metadata.permaLink+"/reviews"} label="Reviews"/>
              </li>
              : null
            }

           
            { this.props.isOwnProfile ? 
            <li>
              <Navlink userNavigation={true} to={"/user/"+this.context.profile.user_metadata.permaLink+"/preferences"} label="Preferences"/>
            </li>
            :null}


            
          </ul>
        </nav>
      </div>
    )
  }
}
