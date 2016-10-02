import React, { PropTypes } from 'react'
import Navlink  from '../common/Navlink'


export default React.createClass({

  propTypes: {
    actions: PropTypes.arrayOf(PropTypes.node),
    isDJ: PropTypes.bool,
    isCustomer: PropTypes.bool,
    profilePicture: PropTypes.string
   },

   contextTypes: {
       editMode: PropTypes.bool,
       toggleEditMode: PropTypes.func,
       profile: PropTypes.object
     },

   getDefaultProps(){
     return{
     actions: []}
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
                flexDirection: 'column'
              }}>

        {this.props.isDJ ?
            <li style={{marginBottom:'25px'}}>
              <Navlink userNavigation={true} to="/user/profile" label="Profile"/>
            </li>
        : null}

            {this.props.isDJ ?
              <li  style={{marginBottom:'25px'}}>
                <Navlink userNavigation={true} to="/user/gigs" label="Gigs"/>
              </li>
            : null}

            {this.props.isDJ ?
              <li  style={{marginBottom:'25px'}}>
              <Navlink userNavigation={true} to="/user/reviews" label="Reviews"/>
              </li>
              : null
            }

            {this.props.isCustomer ?
              <li  style={{marginBottom:'25px'}}>
              <Navlink userNavigation={true} to="/user/events" label="Events"/>
              </li>
              : null
            }

          <li  style={{marginBottom:'25px', borderBottom:'1px solid #eee'}}>
          <Navlink userNavigation={true} to="/user/preferences" label="Preferences"/>
          </li>

          </ul>
          </nav>
                {this.props.actions.map(function(action) {
                 return <div key={action.key}>{action}</div>
              })}

          </div>
    )
  }
})
