import React, {PropTypes} from 'react'
import AuthService from '../../utils/AuthService'
import Radium from 'radium'
import muiThemeable from 'material-ui/styles/muiThemeable'
import TextField from '../common/Textfield'

var userHeader = React.createClass({

  propTypes: {
    profile:PropTypes.object,
    editMode: PropTypes.bool,
    updateProfileValue: PropTypes.func
  },


  handleFile(e) {
    const reader = new FileReader()
    const file = e.target.files[0]

    reader.onload = (upload) => {
      this.props.updateProfileValue('picture', upload.target.result)
    }

    reader.readAsDataURL(file)
  },

  render() {


    const styles ={
      image:{
        backgroundImage: 'url('+this.props.profile.picture+')',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'auto 150%',
        width: '200px',
        height: '200px',
        WebkitTransition: '0.1s ease-in-out',
        MozTransition: '0.1s ease-in-out',
        transition: '0.1s ease-in-out',
        zIndex: '0',

      },
      inline:{
        display: 'inline-block'
      },
      flex:{
        display: 'flex',
        alignItems: 'center'
      },
      large:{
        textarea: {
          height: '80px',
        },

        paragraph: {
          fontSize: '14px',
        },

        input:{
          fontSize: '24px',
          color: this.props.muiTheme.palette.textColor,
          fontWeight: '300',
        },

        hint:{
          bottom: '20px',
          fontSize: '30px',
          fontWeight: '300',
        }
      },
      medium:{
        textarea: {
          height: '80px',
        },

        paragraph: {
          fontSize: '14px',
        },

        input:{
          fontSize: '14px',
          color: this.props.muiTheme.palette.textColor,
          fontWeight: '300',
        },

        hint:{
          bottom: '20px',
          fontSize: '30px',
          fontWeight: '300',
        },

      },
       dottedBorderStyle: {
          borderTop: 'none rgba(0, 0, 0, 1)',
          borderRight: 'none rgba(0, 0, 0, 1)',
          borderBottom: '2px dotted rgba(0, 0, 0, 1) ',
          borderLeft: 'none rgba(0, 0, 0, 1)',
          borderImage: 'initial',
          bottom: '8px',
          boxSizing: 'content-box',
          margin: '0px',
          position: 'absolute',
          width: '100%',
          borderColor: 'rgba(0,0,0, 0.5)',
          WebkitTransition: '0.1s ease-in-out',
          MozTransition: '0.1s ease-in-out',
          transition: '0.1s ease-in-out',

        },
        plainBorder:{
          borderTop: 'none rgb(224, 224, 224)',
          borderRight: 'none rgb(224, 224, 224)',
          borderBottom: '1px solid rgb(224, 224, 224)',
          borderLeft: 'none rgb(224, 224, 224)',
          borderImage: 'initial',
          bottom: '8px',
          boxSizing: 'content-box',
          margin: '0px',
          position: 'absolute',
          width: '100%',
          display: 'none',
          WebkitTransition: '0.1s ease-in-out',
          MozTransition: '0.1s ease-in-out',
          transition: '0.1s ease-in-out',
        },
        userImageWrap:{
          display: 'flex',
          alignItems: 'center',
          borderRadius:'200px',
          overflow: 'hidden',
          width: '200px',
          height: '200px',
          position: 'relative',
          zIndex: '1',
        },
        blur:{
          filter:'blur(5px)',
        },
        changeProfilePictureText:{
          position: 'absolute',
          left: '0',
          right: '0',
          textAlign: 'center',
          color: 'white'
        }
    }


    return  <div style={{paddingTop:'15px',
      paddingBottom:'15px',
    borderBottom: '1px solid #eee'}} className="row">
      <div style={{display: 'flex',
        alignItems: 'center',
      }} className="container">
        <div className="col-xs-3">
          <div style={styles.userImageWrap}>
            <div style={[
              this.props.editMode && styles.blur,
              styles.image,
            styles.inline]}/>
            {this.props.editMode && <div style={styles.changeProfilePictureText}>
              <input name="fileupload" id="fileupload"  type="file" onChange={this.handleFile}/>
              <label htmlFor="fileupload"><span>Change image</span></label>
            </div> }
          </div>
        </div>
        <div className="col-xs-9">
          <div className="row">
            <div style={{marginTop: '-15px'}} className="col-xs-6">

              <TextField
                value = {this.props.profile.name}
                name="name"
                disabled={!this.props.editMode}
                floatingLabelFixed={true}
                floatingLabelText="Name"
                style = {styles.large.textarea}
                inputStyle = {styles.large.input}
                //hintStyle = {styles.hint}
                type = "text"
                fullWidth={false}
                hintText="Name"
                underlineDisabledStyle={styles.plainBorder}
                underlineStyle={styles.dottedBorderStyle}
                //onChange={this.onChange}
                //onBlur={this.onBlur}
              />
              <TextField
                value= {this.props.profile.location}
                name="location"
                disabled={!this.props.editMode}
                floatingLabelFixed={true}
                floatingLabelText="Location"
                style = {styles.medium.textarea}
                inputStyle = {styles.medium.input}
                //hintStyle = {styles.hint}
                type = "text"
                fullWidth={false}
                hintText="Location"
                underlineDisabledStyle={styles.plainBorder}
                underlineStyle={styles.dottedBorderStyle}

                //onChange={this.onChange}
                //onBlur={this.onBlur}
              />
              <TextField
                value= {this.props.profile.birthday}
                name="birthday"
                disabled={!this.props.editMode}
                floatingLabelFixed={true}
                floatingLabelText="Birthday"
                style = {styles.medium.textarea}
                inputStyle = {styles.medium.input}
                //hintStyle = {styles.hint}
                type = "text"
                fullWidth={false}
                hintText="Birthday"
                underlineDisabledStyle={styles.plainBorder}
                underlineStyle={styles.dottedBorderStyle}

                //onChange={this.onChange}
                //onBlur={this.onBlur}
              />
            </div>
            <div style={{marginTop: '-15px'}}  className="col-xs-6">
              <TextField
                value= "3500.00 DKK"
                name="Earned"
                  disabled={true}
                  floatingLabelFixed={true}
                  floatingLabelText="Total payout"
                  style = {styles.large.textarea}
                  inputStyle = {styles.large.input}
                  //hintStyle = {styles.hint}
                  type = "text"
                  fullWidth={false}
                  underlineShow={false}

                  //onChange={this.onChange}
                  //onBlur={this.onBlur}
                  />
              <TextField
                  value= "★ ★ ★ ★ ★"
                  name="Rating"
                  disabled={true}
                  floatingLabelFixed={true}
                  floatingLabelText="Rating"
                  style = {styles.large.textarea}
                  inputStyle = {styles.large.input}
                  //hintStyle = {styles.hint}
                  type = "text"
                  fullWidth={false}
                  underlineShow={false}

                  //onChange={this.onChange}
                  //onBlur={this.onBlur}
                  />

                  <TextField
                    value= "No upcoming gigs"
                    name="Upcoming"
                    disabled={true}
                    floatingLabelFixed={true}
                    floatingLabelText="Requested gigs"
                    style = {styles.medium.textarea}
                    inputStyle = {styles.medium.input}
                    //hintStyle = {styles.hint}
                    type = "text"
                    fullWidth={false}
                    underlineShow={false}

                    //onChange={this.onChange}
                    //onBlur={this.onBlur}
                    />
              </div>
            </div>
            </div>

          </div>
          </div>

  }
})

var styledUserHeader = Radium(userHeader)
export default muiThemeable()(styledUserHeader)
