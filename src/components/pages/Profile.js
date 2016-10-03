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
    toggleEditMode: PropTypes.func,
    editMode: PropTypes.bool,
  },

  contextTypes: {
    registerActions: PropTypes.func,
    save: PropTypes.func.isRequired,
    reset: PropTypes.func,
    deleteProfile: PropTypes.func
  },

  getActionButtons(props = this.props){
    return (
    <div key="profile_actions">
      <div style={{marginBottom:"4px"}}>
        <ToggleButton
          active={props.editMode}
          rounded={true}
          labelToggled="Save"
          label="Edit profile"
          onClick={props.toggleEditMode}
          onClickToggled={this.context.save}
          name="edit_profile"
        />
      </div>
      { props.editMode ?
        <div style={{marginBottom:"4px"}}>
          <Button
            rounded={true}
            label="Cancel"
            active={true}
            onClick={this.context.reset}
            name="cancel_edit_profile"
          />
        </div>  : null }
      <div style={{marginBottom:"4px"}}>
        <ToggleButton

          rounded={true}
          label="Public profile"
          name="see_public_profile"
        />
      </div>
      <div style={{marginBottom:"4px"}}>
        <ToggleButton
          rounded={true}
          label="Request features"
          name="request_features"
        />
      </div>
      { props.editMode ?
        <div style={{marginBottom:"4px"}}>
          <Button
            rounded={true}
            label="Delete Profile"
            dangerous={true}
            onClick={this.context.deleteProfile}
            name="delete_profile"
          />
        </div>  : null }

    </div>

    )
  },

  render() {

    const styles ={
      image:{
        backgroundImage: 'url('+this.props.profile.picture+')',
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
          height: 'initial',
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

    const isDJ = this.props.profile.isDJ

    return(
      <div>
        {this.getActionButtons()}
        <div className="profile">

            <TextWrapper
              label="E-mail"
              text="We wont share your email until you agree to play a gig.">
              <TextField
                defaultValue={this.props.profile.email}
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

            {isDJ ?
              <TextWrapper
                label="Genres"
                text="Select your genres">
                <Genres
                  name="genres"
                  errorAbove={true}
                  potentialValues={c.GENRES}
                  columns={4}
                  preToggled={this.props.profile.genres}
                  disabled={!this.props.editMode} />
              </TextWrapper>
              :null
            }

            {isDJ ?
              <TextWrapper
                label="Bio"
                text={this.props.profile.firstName + ", tell us a little bit of your story."}
              >
                <TextBox
                  width="100%"
                  height="150px"
                  name="bio"
                  disabled={!this.props.editMode}
                  value={this.props.profile.bio}

                />

              </TextWrapper>
            : null }
            {isDJ ?
              <TextWrapper
                label="Experience"
                text="How much experience do you have?"
              >
                <ExperienceSlider
                  queupGigs={this.props.profile.gigsCount}
                  otherGigs={this.props.profile.experienceCount}
                  disabled={!this.props.editMode}
                  name="experienceCount"
                />
              </TextWrapper>
            : null }


            <TextWrapper
              label="Phone"
              text="We wont share your phone number until you agree to play a gig.">
              <TextField
                name="phone"
                defaultValue={this.props.profile.phone}
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

            {isDJ ?
              <TextWrapper

                label="Location"
                text={this.props.profile.firstName + ", tell us where youd like to play."}
              >
                <SimpleMap
                 radius={this.props.profile.playingRadius}
                 initialPosition={this.props.profile.playingLocation}
                 editable={this.props.editMode}
                 themeColor={this.props.muiTheme.palette.primary1Color}
                 radiusName="playingRadius"
                 locationName="playingLocation"
              />
            </TextWrapper>
            : null }



        </div>
      </div>)

  }
})

var styledProfile = Radium(Profile)
export default muiThemeable()(styledProfile)
