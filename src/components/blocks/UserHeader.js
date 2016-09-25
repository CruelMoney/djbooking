import React, {PropTypes} from 'react'
import Radium from 'radium'
import muiThemeable from 'material-ui/styles/muiThemeable'
import TextField from '../common/Textfield'
import TextWrapper from '../common/TextElement'
import {datePipe} from '../../utils/TextPipes'

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
          height: '40px',
        },

        paragraph: {
          fontSize: '14px',
        },

        input:{
          height: 'initial',
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
          height: '40px',
        },

        paragraph: {
          fontSize: '14px',
        },

        input:{
          fontSize: '14px',
          height: 'initial',
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


    return (

 this.props.profile.isDJ ?

  <div style={{paddingTop:'15px',  paddingBottom:'15px',  borderBottom: '1px solid #eee'}}
    className="row">
    <div style={{display: 'flex', alignItems: 'center',}} className="container">
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
          <div className="col-xs-6">
            <TextWrapper
              label="Name"
            >
              <TextField
                value={this.props.profile.name}
                name="name"
                disabled={!this.props.editMode}
                style={styles.large.textarea}
                inputStyle={styles.large.input}
                type="text"
                fullWidth={false}
                hintText="Name"
                underlineDisabledStyle={styles.plainBorder}
                underlineStyle={styles.dottedBorderStyle}

              />

            </TextWrapper>

            <TextWrapper
              label="Location"
            >
              <TextField
                value={this.props.profile.location}
                name="location"
                validate={['required']}
                disabled={!this.props.editMode}
                style={styles.medium.textarea}
                inputStyle={styles.medium.input}
                type="text"
                fullWidth={false}
                hintText="Location"
                underlineDisabledStyle={styles.plainBorder}
                underlineStyle={styles.dottedBorderStyle}
              />
            </TextWrapper>

            <TextWrapper
              label="Birthday"
            >
              <TextField
                value={this.props.profile.birthday}
                onUpdatePipeFunc={datePipe}
                name="birthday"
                validate={['required', 'date']}
                disabled={!this.props.editMode}
                style={styles.medium.textarea}
                inputStyle={styles.medium.input}
                type="text"
                fullWidth={false}
                hintText="Birthday"
                underlineDisabledStyle={styles.plainBorder}
                underlineStyle={styles.dottedBorderStyle}
              />
            </TextWrapper>

          </div>
          <div  className="col-xs-6">
            <TextWrapper
              label="Earned"
            >
              <TextField
                value="3500.00 DKK"
                name="Earned"
                disabled={true}
                style={styles.large.textarea}
                inputStyle={styles.large.input}
                //hintStyle = {styles.hint}
                type="text"
                fullWidth={false}
                underlineShow={false}
                underlineDisabledStyle={styles.plainBorder}
                underlineStyle={styles.dottedBorderStyle}
              />
            </TextWrapper>

            <TextWrapper
              label="Rating"
            >
              <TextField
                value="★ ★ ★ ★ ★"
                name="Rating"
                disabled={true}
                style={styles.large.textarea}
                inputStyle={styles.large.input}
                type="text"
                fullWidth={false}
                underlineShow={false}
                underlineDisabledStyle={styles.plainBorder}
                underlineStyle={styles.dottedBorderStyle}
              />
            </TextWrapper>

            <TextWrapper
              label="Upcoming"
            >
              <TextField
                value="No upcoming gigs"
                name="Upcoming"
                disabled={true}
                style={styles.medium.textarea}
                inputStyle={styles.medium.input}
                type="text"
                fullWidth={false}
                underlineShow={false}
                underlineDisabledStyle={styles.plainBorder}
                underlineStyle={styles.dottedBorderStyle}
                  />
                  </TextWrapper>
              </div>
             </div>
            </div>
           </div>
          </div>
:
//In the case that the user is not a dj
<div style={{paddingTop:'15px',  paddingBottom:'15px',  borderBottom: '1px solid #eee'}}
  className="row">
  <div style={{display: 'flex', alignItems: 'center',}} className="container">
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
        <div className="col-xs-6">
          <TextWrapper
            label="Name"
          >
            <TextField
              value={this.props.profile.name}
              name="name"
              disabled={!this.props.editMode}
              style={styles.large.textarea}
              inputStyle={styles.large.input}
              type="text"
              fullWidth={false}
              hintText="Name"
              underlineDisabledStyle={styles.plainBorder}
              underlineStyle={styles.dottedBorderStyle}

            />

          </TextWrapper>

          <TextWrapper
            label="E-mail"
            >
            <TextField
              value={this.props.profile.email}
              name="email"
              disabled={!this.props.editMode}
              style={styles.medium.textarea}
              inputStyle={styles.medium.input}
              //hintStyle = {styles.hint}
              type="email"
              validate={['required', 'email']}
              fullWidth={false}
              hintText="E-mail"
              underlineDisabledStyle={styles.plainBorder}
              underlineStyle={styles.dottedBorderStyle}
            />
          </TextWrapper>
          <TextWrapper
            label="Phone">
            <TextField
              name="phone"
              value={this.props.profile.phone}
              style={styles.medium.textarea}
              inputStyle={styles.medium.input}
              disabled={!this.props.editMode}
              type="tel"
              fullWidth={false}
              hintText="Phone"
              underlineDisabledStyle={styles.plainBorder}
              underlineStyle={styles.dottedBorderStyle}


            />
          </TextWrapper>

        </div>

           </div>
          </div>
         </div>
        </div>




      )



  }
})

var styledUserHeader = Radium(userHeader)
export default muiThemeable()(styledUserHeader)
