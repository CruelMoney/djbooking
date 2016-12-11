import React, { PropTypes } from 'react'
import Navlink  from '../common/Navlink'


export default React.createClass({

  propTypes: {
    auth0Id: PropTypes.string,
   },


  render() {
    console.log(this);

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
              <Navlink to={"/event/"+this.props.id} label="Event information"/>
            </li>

            <li>
              <Navlink to={"/event/"+this.props.id+"/offers"} label="Dj offers"/>
            </li>

            <li >
              <Navlink to={"/event/"+this.props.id+"/user"} label="Your information"/>
            </li>


          </ul>
        </nav>
      </div>
    )
  }
})
