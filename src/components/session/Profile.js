import React, { PropTypes } from 'react';
import Radium from 'radium';
import ToggleButton from '../common/ToggleButton'
import Button from '../common/Button'
import Genres from '../common/ToggleButtonHandler'
import TextField from '../common/Textfield';
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
        <div style={{marginTop: '-15px'}} className="col-xs-6">
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
          <Genres
            name="genres"
            genres={c.GENRES}
            columns = {4}
            preToggled = {this.context.profile.genres}
            disabled={!this.context.editMode} />
        </div>
        <div style={{marginTop: '-15px'}} className="col-xs-6">
          <TextField
              value= ""
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
        </div>
      </div>




      </div>)

  }
})

var styledProfile = Radium(Profile);
export default muiThemeable()(styledProfile);
