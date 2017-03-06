import React, { PropTypes } from 'react'
import Navlink  from '../../../../components/common/Navlink'

export default React.createClass({

  propTypes: {
    isDJ: PropTypes.bool,
    isCustomer: PropTypes.bool,
   },

   contextTypes: {
       editMode: PropTypes.bool,
       toggleEditMode: PropTypes.func,
       profile: PropTypes.object
     },



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
                <Navlink userNavigation={true} to={"/user/"+this.context.profile.user_id+"/profile"} label="Information"/>
              </li>
       

            {this.props.isCustomer ?
              <li>
                <Navlink userNavigation={true} to={"/user/"+this.context.profile.user_id+"/events"} label="Events"/>
              </li>
            : null}

            {this.props.isDJ ?
              <li >
                <Navlink userNavigation={true} to={"/user/"+this.context.profile.user_id+"/gigs"} label="Gigs"/>
              </li>
            : null}

            {this.props.isDJ ?
              <li >
                <Navlink userNavigation={true} to={"/user/"+this.context.profile.user_id+"/reviews"} label="Reviews"/>
              </li>
              : null
            }

            <li>
              <Navlink userNavigation={true} to={"/user/"+this.context.profile.user_id+"/preferences"} label="Preferences"/>
            </li>

          </ul>
        </nav>
      </div>
    )
  }
})
