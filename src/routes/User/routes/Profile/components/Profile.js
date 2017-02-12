import React, {PropTypes} from 'react'
import Button from '../../../../../components/common/Button-v2'
import SubmitButton from '../../../../../components/common/SubmitButton'
import Genres from '../../../../../components/common/ToggleButtonHandler'
import connectToForm from '../../../../../components/higher-order/connectToForm'
import {default as SimpleMap} from "../../../../../components/common/Map"
import TextField from '../../../../../components/common/Textfield'
import TextBox from '../../../../../components/common/TextBox'
import LoadingPlaceholder from '../../../../../components/common/LoadingPlaceholder'
import TextWrapper from '../../../../../components/common/TextElement'
import c from '../../../../../constants/constants'
import ErrorMessage from '../../../../../components/common/ErrorMessage'
import Popup from '../../../../../components/common/Popup'
import m from '../../../../../constants/Mocks'
import OfferCard from '../../../../Event/routes/Offers/components/OfferCard'

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

    getInitialState(){
      return{
        showPopup:false
      }
    },


    hidePopup(){
      this.setState({
        showPopup: false
      })
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
              {this.props.profile.isDJ ?
              <Button
                onClick={()=>this.setState({showPopup:true})}
                name="public_profile"
              >See offer example
              </Button>
              : null}
          
              <ErrorMessage/>
            </div>

        )
    },

    render() {
        const isDJ = this.props.profile.isDJ
        var OfferMock = m.MockOffer
            if (this.props.profile.settings) {
              OfferMock.refundPercentage = this.props.profile.settings.refundPercentage
              OfferMock.cancelationDays = this.props.profile.settings.cancelationDays
              OfferMock.dj = this.props.profile
            }

        return (
          <div>
            {OfferMock.dj ?
              <Popup
                showing={this.state.showPopup}
                onClickOutside={this.hidePopup}>
                <div className="offer-example">
                  <OfferCard 
                  disabled
                  offer={OfferMock}/>
                </div>
              </Popup>
              : null}

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

import { connect } from 'react-redux'
import * as actions from '../../../../../actions/UserActions'

//TODO move magic information about the filters out of container.
//Should be grabbed from the children that are set as filters
function mapStateToProps(state, ownProps) {
  return {
    profile:   state.user.profile,
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
      save: (profile,callback) => {dispatch(actions.save(profile, callback))},
      deleteProfile: (callback) => {dispatch(actions.deleteProfile(callback))},
}}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return Object.assign({}, ownProps, {
    profile: stateProps.profile,
    save: dispatchProps.save,
    deleteProfile: dispatchProps.deleteProfile,
  })}


const SmartProfile = connect(mapStateToProps, mapDispatchToProps, mergeProps, { pure: false })(Profile)

export default props => (
    <SmartProfile {...props}/>
)
