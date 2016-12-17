import React, {PropTypes} from 'react'
import Button from '../common/Button-v2'
import SubmitButton from '../common/SubmitButton'
import Genres from '../common/ToggleButtonHandler'
import connectToForm from '../higher-order/connectToForm'
import {default as SimpleMap} from "../common/Map"
import TextField from '../common/Textfield'
import TextBox from '../common/TextBox'
import LoadingPlaceholder from '../common/LoadingPlaceholder'
import TextWrapper from '../common/TextElement'
import c from '../../constants/constants'
import ErrorMessage from '../common/ErrorMessage'

const Map = connectToForm(SimpleMap)

var Profile = React.createClass({
    propTypes: {
        profile: PropTypes.object,
        save: PropTypes.func,
        deleteProfile: PropTypes.func,
    },

    contextTypes:{
      loading:         PropTypes.bool,
      reset:           PropTypes.func,
      registerActions: PropTypes.func,
      toggleEditMode:  PropTypes.func,
      editing:         PropTypes.bool,
      valid:           PropTypes.bool
    },

    componentWillMount(){
      if ( this.context.registerActions) {
          this.context.registerActions(this.getActionButtons)
      }
    },

    submit(form, callback) {
      const profile = {
        ...this.props.profile,
        ...form.values
      }
      console.log(profile);

      this.props.save(profile, callback)
    },


    getActionButtons(props = this.props) {
        const editing = this.context.editing

        return (
            <div className="context-actions" key="profile_actions">
              {editing
                ?
                  <SubmitButton
                    active={this.context.valid}
                    onClick={this.submit}
                    name="save_edit_profile"
                  > Save
                  </SubmitButton>
                : <Button
                  onClick={this.context.toggleEditMode}
                  name="edit_profile"
                  >Edit profile
                </Button>
              }
              <ErrorMessage/>
            </div>

        )
    },

    render() {
        const isDJ = this.props.profile.isDJ
        return (
          <div>
            { this.context.loading ?
              <div>
                <LoadingPlaceholder/>
                <LoadingPlaceholder/>
                <LoadingPlaceholder/>
                <LoadingPlaceholder/>
              </div>
              :
              <div>
                <div className="profile">
                  <TextWrapper label="Name" text="What's your full name. We only share your first name.">
                    <TextField
                      value={this.props.profile.name}
                      name="name"
                      disabled={!this.context.editing}
                      type="text"
                      validate={['required', 'lastName']}
                    />
                  </TextWrapper>
                  <TextWrapper label="E-mail" text="We wont share your email until you agree to play a gig. Updating your mail means you have to confirm it again.">
                    <TextField
                      value={this.props.profile.email}
                      name="email"
                      disabled={!this.context.editing}
                      type="email"
                      validate={['required', 'email']}
                    />
                  </TextWrapper>

                  <TextWrapper label="Phone" text="We wont share your phone number until you agree to play a gig.">
                    <TextField
                      validate={['required']}
                      name="phone"
                      value={this.props.profile.phone}
                      disabled={!this.context.editing}
                      type="tel"
                      hintText="Phone" />
                  </TextWrapper>

                  {isDJ
                    ? <TextWrapper label="Genres" text="Select your genres">
                      <Genres
                        name="genres"
                        validate={['required']}
                        potentialValues={c.GENRES}
                        columns={4}
                        value={this.props.profile.genres}
                        disabled={!this.context.editing}/>
                    </TextWrapper>
                    : null
                  }

                  {isDJ
                    ? <TextWrapper label="Bio" text={this.props.profile.firstName + ", tell us a little bit of your story."}>
                      <TextBox
                        validate={['required']}
                        width="100%"
                        height="150px"
                        name="bio"
                        disabled={!this.context.editing}
                        value={this.props.profile.bio}/>

                    </TextWrapper>
                  : null}
                  {/* {isDJ
                    ? <TextWrapper label="Experience" text="How much experience do you have?">
                    <ExperienceSlider queupGigs={this.props.profile.gigsCount} otherGigs={this.props.profile.experienceCount} disabled={!this.context.editing} name="experienceCount"/>
                    </TextWrapper>
                  : null} */}



                  {isDJ
                    ? <TextWrapper label="Location" text={this.props.profile.firstName + ", tell us where youd like to play."}>
                      <Map
                        radius={this.props.profile.playingRadius}
                        value={this.props.profile.playingLocation}
                        editable={this.context.editing}
                        themeColor={this.context.color}
                        radiusName="playingRadius"
                        locationName="playingLocation"/>
                    </TextWrapper>
                  : null}

                </div>
              </div>}
          </div>
        )

    }
})

export default Profile
