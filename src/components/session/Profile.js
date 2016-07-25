import React, { PropTypes } from 'react'
import Radium from 'radium'
import ToggleButton from '../common/ToggleButton'
import Button from '../common/Button'
import Genres from '../common/ToggleButtonHandler'
import { default as SimpleMap } from "../common/Map"
import TextField from '../common/Textfield'
import TextBox from '../common/TextBox'
import ExperienceSlider from '../common/ExperienceSlider'

import TextWrapper from '../common/TextElement'
import muiThemeable from 'material-ui/styles/muiThemeable'
import c from '../../constants/constants'


var Profile = React.createClass({
  propTypes: {
    profile: PropTypes.object,
    editMode: PropTypes.bool,
    toggleEditMode: PropTypes.func,
    updateProfileValue: PropTypes.func,
  },


  contextTypes: {
    registerActions: PropTypes.func,
    updateActions: PropTypes.func,
    submit: PropTypes.func.isRequired,
    reset: PropTypes.func
  },


  componentWillMount() {
    this.removeActionsFromContext = this.context.registerActions(this.getActionButtons)
  },


  componentDidMount(){

  },

  componentWillUnmount() {
    this.removeActionsFromContext()
  },



  handleSliderChange(value){
    console.log(value)
  },


  getActionButtons(context = this.context, submitFunc, resetFunc){
    return (
    <div key="profile_actions">
      <div style={{marginBottom:"4px"}}>
        <ToggleButton
          active = {this.props.editMode}
          rounded= {true}
          labelToggled="Save"
          label="Edit profile"
          onClick= {this.props.toggleEditMode}
          onClickToggled={submitFunc || context.submit}
          name="edit_profile"
        />
      </div>
      { this.props.editMode ?
        <div style={{marginBottom:"4px"}}>
          <Button
            rounded= {true}
            label="Cancel"
            active={true}
            onClick= {resetFunc}
            name="cancel_edit_profile"
          />
        </div>  : null }
      <div style={{marginBottom:"4px"}}>
        <ToggleButton

          rounded= {true}
          label="Public profile"
          onClick= {this.props.toggleEditMode}
          name="see_public_profile"
        />
      </div>


      <div style={{marginBottom:"4px"}}>
        <ToggleButton

          rounded= {true}
          label="Request features"
          onClick= {this.props.toggleEditMode}
          name="request_features"
        />
      </div>

    </div>

    )
  },

  render() {

    const styles ={
      image:{
        backgroundImage: 'url('+this.props.profile.picture_large+')',
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
              value = {this.props.profile.email}
              name="email"
              disabled={!this.props.editMode}
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
              text="Select your genres">
              <Genres
                name="genres"
                errorAbove= {true}
                genres={c.GENRES}
                columns = {4}
                preToggled = {this.props.profile.genres}
                disabled={!this.props.editMode} />
            </TextWrapper>

          </div>
          <div style={{marginTop: "-15px"}} className="col-lg-6">
            <TextField
              name="phone"
              disabled={!this.props.editMode}
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
              text={this.props.profile.firstName + ", tell us a little bit of your story."}
            >
              <TextBox
                width="100%"
                height="150px"
                name="bio"
                disabled={!this.props.editMode}
                value = {this.props.profile.bio}

              />

            </TextWrapper>
            <TextWrapper

              label ="Location"
              text={this.props.profile.firstName + ", tell us where you'd like to play."}
            >
              <SimpleMap
                radius={this.props.profile.radius}
                initialPosition={this.props.profile.locationCoords}
                editable={this.props.editMode}
                markers={this.props.markers}
                themeColor={this.props.muiTheme.palette.primary1Color}
              />
            </TextWrapper>

            <TextWrapper
              label="Experience"
              text="How much experience do you have?"
            >
              <ExperienceSlider
                queupGigs={this.props.profile.queupGigs}
                otherGigs={this.props.profile.otherGigs}
                disabled={!this.props.editMode}
                handleChange={this.handleSliderChange}
              />
            </TextWrapper>
          </div>
        </div>
      </div>)

  }
})

var styledProfile = Radium(Profile)
export default muiThemeable()(styledProfile)
