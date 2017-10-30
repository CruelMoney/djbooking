import React, {Component} from 'react'
import PropTypes from 'prop-types'
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
import {FB, Tweet, QR, Embed, Link}  from '../../../../../components/common/Sharing' 
import {Environment} from '../../../../../constants/constants'

const Map = connectToForm(SimpleMap)

export default class OwnProfile extends Component{
    static propTypes = {
        profile: PropTypes.object,
        save: PropTypes.func,
        deleteProfile: PropTypes.func,
    }

    static contextTypes = {
      loadingUser:     PropTypes.bool,
      reset:           PropTypes.func,
      registerActions: PropTypes.func,
      toggleEditMode:  PropTypes.func,
      editing:         PropTypes.bool,
      valid:           PropTypes.bool,
      disableEditMode: PropTypes.func,
      updateAction:    PropTypes.func
    }

    componentWillMount(){
      if ( this.context.registerActions) {
          this.context.registerActions(this.getActionButtons)
      }

      this.bookURL = Environment.API_DOMAIN + '/api/user/' + this.props.profile.user_metadata.permaLink + '/bookme'

      this.signupURL = Environment.API_DOMAIN + "/api/user/join?referredBy=" + this.props.profile.user_metadata.permaLink
    }

    state = {
        showHelp: false
      }

    submit = (form, callback) => {
      const profile = {
        ...this.props.profile,
        ...form.values
      }

      this.props.save(profile, callback)
    }

 
    getActionButtons = (props = this.props) => {
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
                : 
                
                <div className={this.state.showHelp ? "pulse" : ""}
                >
                  <Button
                    onClick={this.context.toggleEditMode}
                    name="edit_profile"
                    >
                    Edit information
                  </Button>
                 </div>
              }
             

               <FB
                  link={this.bookURL}
                  generatePreview
                >
                Share profile on facebook
                </FB>
                 <Button
                    onClick={this.props.togglePublicProfile}
                    name="toggle_public"
                    >
                    See public profile
                  </Button>
          
              <ErrorMessage/>
            </div>

        )
    }

    showHelp = () => {
      this.setState({
        showHelp:true
      }, this.context.updateAction)

      setTimeout(()=> {
        this.setState({
            showHelp:false
         },this.context.updateAction)
      }, 1500);
    }


    render() {
        const isDJ = this.props.profile.isDJ

        return (
          <div>
            

            { this.context.loadingUser ?
              <div>
                <LoadingPlaceholder/>
                <LoadingPlaceholder/>
                <LoadingPlaceholder/>
                <LoadingPlaceholder/>
              </div>
              :
              <div>
                <div className="profile">
                  <TextWrapper 
                  onDisabledClick={this.showHelp}
                  label="Name" text="Your full name. We only share your first name.">
                    <TextField
                      value={this.props.profile.name}
                      name="name"
                      disabled={!this.context.editing}
                      type="text"
                      validate={['required', 'lastName']}
                    />
                  </TextWrapper>
                  <TextWrapper 
                  onDisabledClick={this.showHelp}
                  label="E-mail" text="Updating your email means you have to confirm it again.">
                    <TextField
                      value={this.props.profile.email}
                      name="email"
                      disabled={!this.context.editing}
                      type="email"
                      validate={['required', 'email']}
                    />
                  </TextWrapper>

                  <TextWrapper 
                  onDisabledClick={this.showHelp}
                  label="Phone" text={"We only share your number with " + (isDJ ? "organizers of events you have accepted." : "DJs qualified for your events.")}>
                    <TextField
                      validate={['required']}
                      name="phone"
                      value={this.props.profile.phone}
                      disabled={!this.context.editing}
                      type="tel"
                      hintText="Phone" />
                  </TextWrapper>

                  {isDJ
                    ? <TextWrapper 
                    onDisabledClick={this.showHelp}
                    label="Genres" text="The genres you would like to play.">
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
                    ? <TextWrapper 
                    onDisabledClick={this.showHelp}
                    label="Bio" text={this.props.profile.firstName + ", please tell us a bit about yourself. What kind of DJ are you? What is your level of experience? What kind of events do you usually play at?"}>
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
                    ? <TextWrapper 
                    onDisabledClick={this.showHelp}
                    label="Location" 
                    text={this.props.profile.firstName + ", this is the area where you will receive gigs. To edit the location or radius, click the edit information button, and drag in the points that appear on the circle."}>
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
                         <div className="sharing-buttons">
                           <Tweet
                           generatePreview
                          link={this.bookURL}
                          >
                          Twitter
                          </Tweet>
                          <FB
                          generatePreview
                          link={this.bookURL}
                          >
                          Facebook
                          </FB>
                          <QR
                          generatePreview
                          link={this.bookURL}
                          >
                          QR CODE
                          </QR>
                         <Link
                         generatePreview
                         link={this.bookURL}
                          >
                          Copy link
                          </Link>
                          <Embed
                          embedURL={Environment.API_DOMAIN + "/api/user/" + this.props.profile.user_id + "/embedcard"}
                          >
                          Embed code
                          </Embed>
            
                         </div>
                    </TextWrapper>
                  : null}
                  
                    {isDJ
                    ? <TextWrapper 
                        label="Refer DJs" 
                        text={"At Cueup you can get paid for referring people to the site. The link below is used for referring DJs to the site."
                              +" In case a DJ signs up using your link, you will get a Cueup point whenever the referred DJ makes his or hers first offer."
                             + " Cueup points are used when making an offer to remove the DJ fee."}>
                        <div className="sharing-buttons">
                          <Tweet
                          link={this.signupURL}
                          >
                          Twitter
                          </Tweet>
                          <FB
                          link={this.signupURL}
                          >
                          Facebook
                          </FB>
                          <QR
                          link={this.signupURL}
                          >
                          QR CODE
                          </QR>
                         <Link
                         link={this.signupURL}
                          >
                          Copy link
                          </Link>
                         </div>
                    </TextWrapper>
                  : null}
                </div>
              </div>}
          </div>
        )

    }
}