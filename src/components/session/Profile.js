import React, { PropTypes } from 'react';
import Radium from 'radium';
import ToggleButton from '../common/ToggleButton'
import Button from '../common/Button'
import Genres from '../common/ToggleButtonHandler'
import Map from '../common/Map'
import TextField from '../common/Textfield';
import TextBox from '../common/TextBox';

import TextWrapper from '../common/TextElement';
import muiThemeable from 'material-ui/styles/muiThemeable';
import c from '../../constants/constants';


var Profile = React.createClass({

  contextTypes: {
    profile: PropTypes.object,
    editMode: PropTypes.bool,
    toggleEditMode: PropTypes.func,
    registerActions: PropTypes.func,
    updateActions: PropTypes.func,
  },

  componentWillMount() {
    this.removeActionsFromContext = this.context.registerActions(this.getActionButtons);
  },

  componentWillUnmount() {
    this.removeActionsFromContext();
  },



  getActionButtons(context = this.context){
    console.log(context.editMode);
    return (
    <div key="profile_actions">

    <div style={{marginBottom:"4px"}}>
    <ToggleButton
        active = {context.editMode}
        rounded= {true}
        labelToggled="Save"
        label="Edit profile"
        onClick= {context.toggleEditMode}
        name="edit_profile"
    />
  </div>
  { context.editMode ?
    <div style={{marginBottom:"4px"}}>
          <Button
          rounded= {true}
          label="Cancel"
          active={true}
          onClick= {context.toggleEditMode}
          name="cancel_edit_profile"
      />
    </div>  : null }
  <div style={{marginBottom:"4px"}}>
  <ToggleButton

        rounded= {true}
        label="Public profile"
        onClick= {context.toggleEditMode}
        name="see_public_profile"
    />
    </div>


  <div style={{marginBottom:"4px"}}>
  <ToggleButton

        rounded= {true}
        label="Request features"
        onClick= {context.toggleEditMode}
        name="request_features"
    />
    </div>

    </div>

    )
  },

  render() {
    const styles ={
      image:{
        backgroundImage: 'url('+this.context.profile.picture_large+')',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: '100% auto',
        width: '200px',
        height: '200px',
        borderRadius: '50%',
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
          borderColor: 'rgba(0,0,0, 0.5)'
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
        }
    }
    return(
      <div>
        <div className="row">
          <div style={{marginTop: '-15px'}} className="col-lg-6">
            <TextField
              value = {this.context.profile.email}
              name="email"
              disabled={!this.context.editMode}
              floatingLabelFixed={true}
              floatingLabelText="E-mail"
              style = {styles.medium.textarea}
              inputStyle = {styles.medium.input}
              //hintStyle = {styles.hint}
              type = "text"
              fullWidth={false}
              hintText="E-mail"
              underlineDisabledStyle={styles.plainBorder}
              underlineStyle={styles.dottedBorderStyle}

              //onChange={this.onChange}
              //onBlur={this.onBlur}
            />
            <TextWrapper
              label="Genres"
              text="Select your genres"
            >
              <Genres
                name="genres"
                errorAbove= {true}

                genres={c.GENRES}
                columns = {4}
                preToggled = {this.context.profile.genres}
                disabled={!this.context.editMode} />
            </TextWrapper>

          </div>
          <div style={{marginTop: '-15px'}} className="col-lg-6">
            <TextField
              name="phone"
              disabled={!this.context.editMode}
              floatingLabelFixed={true}
              floatingLabelText="Phone"
              style = {styles.medium.textarea}
              inputStyle = {styles.medium.input}
              //hintStyle = {styles.hint}
              type = "text"
              fullWidth={false}
              hintText="Phone"
              underlineDisabledStyle={styles.plainBorder}
              underlineStyle={styles.dottedBorderStyle}

              //onChange={this.onChange}
              //onBlur={this.onBlur}
            />
            <TextWrapper
              label ="Bio"
              text={this.context.profile.firstName + ", tell us a little bit of your story."}
            >
              <TextBox
                width="100%"
                height="150px"
                name="bio"
                disabled={!this.context.editMode}
                value = {this.context.profile.bio}

                //onChange={this.onChange}
                //onBlur={this.onBlur}
              />

            </TextWrapper>
            <TextWrapper
              label ="Bio"
              text={this.context.profile.firstName + ", tell us a little bit of your story."}
            >
              

            </TextWrapper>
          </div>
      </div>




      </div>)

  }
})

var styledProfile = Radium(Profile);
export default muiThemeable()(styledProfile);
