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
import Sharing from '../../../../../components/common/Sharing' 
import {Environment} from '../../../../../constants/constants'

const Map = connectToForm(SimpleMap)

export default React.createClass({
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
      valid:           PropTypes.bool,
      disableEditMode: PropTypes.func
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
                    onSucces={()=>setTimeout(()=>{
                      this.context.disableEditMode()
                      }, 1700)}
                  > Save
                  </SubmitButton>
                : <Button
                  onClick={this.context.toggleEditMode}
                  name="edit_profile"
                  >Edit information
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

        var bookURL = Environment.API_DOMAIN + '/api/user/' + this.props.profile.user_metadata.permaLink + '/fbshare'

        var signupURL = Environment.CALLBACK_DOMAIN + "/signup?referredBy=" + this.props.profile.user_metadata.permaLink 

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
                  <TextWrapper label="Name" text="Your full name. We only share your first name.">
                    <TextField
                      value={this.props.profile.name}
                      name="name"
                      disabled={!this.context.editing}
                      type="text"
                      validate={['required', 'lastName']}
                    />
                  </TextWrapper>
                  <TextWrapper label="E-mail" text="Updating your email means you have to confirm it again.">
                    <TextField
                      value={this.props.profile.email}
                      name="email"
                      disabled={!this.context.editing}
                      type="email"
                      validate={['required', 'email']}
                    />
                  </TextWrapper>

                  <TextWrapper label="Phone" text={"We only share your number with " + (isDJ ? "organizers of events you have accepted." : "DJs qualified for your events.")}>
                    <TextField
                      validate={['required']}
                      name="phone"
                      value={this.props.profile.phone}
                      disabled={!this.context.editing}
                      type="tel"
                      hintText="Phone" />
                  </TextWrapper>

                  {isDJ
                    ? <TextWrapper label="Genres" text="The genres you would like to play.">
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
                    ? <TextWrapper label="Bio" text={this.props.profile.firstName + ", please tell us a bit about yourself. What kind of DJ are you? What is your level of experience? What kind of events do you usually play at?"}>
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
                    ? <TextWrapper label="Location" text={this.props.profile.firstName + ", this is the area where you will receive gigs. To edit the location or radius, click the edit information button, and drag in the points that appear on the circle."}>
                      <Map
                        radius={this.props.profile.playingRadius}
                        value={this.props.profile.playingLocation}
                        editable={this.context.editing}
                        themeColor={this.context.color}
                        radiusName="playingRadius"
                        locationName="playingLocation"/>
                    </TextWrapper>
                  : null}
                
                  {isDJ
                    ? <TextWrapper 
                        label="Refer organizers" 
                        text={"At Cueup you can get paid for referring people to the site. The link below is used to book you directly."
                             +" In case someone books you using your link, the DJ fee will be removed from the gig, and you will get the full payout."
                            }>
                         <Sharing
                          link={bookURL}
                         />
                    </TextWrapper>
                  : null}
                  
                    {isDJ
                    ? <TextWrapper 
                        label="Refer DJs" 
                        text={"At Cueup you can get paid for referring people to the site. The link below is used for referring DJs to the site."
                              +" In case a DJ signs up using your link, you will get a Cueup point whenever the referred DJ makes his or hers first offer."
                             + " Cueup points are used on gigs to remove the DJ fee. A maximum of 3 Cueup points can be held at a time."}>
                        <Sharing
                          link={signupURL}
                        />
                    </TextWrapper>
                  : null}
                </div>
              </div>}
          </div>
        )

    }
})