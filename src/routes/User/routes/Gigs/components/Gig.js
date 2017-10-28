import React from 'react'
import Formatter from '../../../../../utils/Formatter'
import TextWrapper from '../../../../../components/common/TextElement'
import {CollapsibleContainer, Collapsible} from '../../../../../components/common/Collapsible'
import assign from 'lodash.assign'
import OfferForm from './OfferForm'
import PayoutForm from '../../../../../components/common/PayoutForm'
import Popup from '../../../../../components/common/Popup'
import InfoPopup from '../../../../../components/common/InfoPopup'
import Button from '../../../../../components/common/Button-v2'
import Chat from '../../../../../components/common/Chat'

import { connect } from 'react-redux'
import  * as actions from '../../../../../actions/GigActions'

var Gig = React.createClass({
  getInitialState(){
    return {
      showPopup: false,
      gigStatus: "" 
    }
  },
  
  componentWillMount(){
    this.setState({
      eventFinished: (this.props.gig.startTime.getTime() - Date.now()) <= 0
    });
    this.setGigStatus();
  },

  setGigStatus(){
  
    // Only autodeclines if the gig is not a direct booking,
    // and if the gig is still en request status,
    if(!this.props.gig.referred 
      && this.props.gig.status === "Requested" 
      && !!this.props.gig.createdAt
      && !!this.props.gig.startTime
      ){
      
      let createdAt = new Date(this.props.gig.createdAt);
      let eventStartAt = new Date(this.props.gig.startTime);
      let eventGigDifference = (eventStartAt.getTime() - createdAt.getTime())/1000;
    
      // and if gig is created more than 4 days before the event.
      if(eventGigDifference > (4*24*60*60)){
        // Calculate seconds until autodecline
        let today = new Date();
        let autoDeclineSeconds = createdAt.getTime() + (3*24*60*60*1000);
        let secondsToDecline = (autoDeclineSeconds - today.getTime())/1000;
        this.timeLeft = setInterval(()=>{
          secondsToDecline--;
          let totalSeconds = secondsToDecline;

          if(totalSeconds <= 0){
            this.setState({
              expiring: false,
              gigStatus: `Gig has expired 😑`
            })
          }else{
            let days =  Math.floor(totalSeconds / (24*60*60));
            totalSeconds %= (24*60*60);
            let hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = Math.floor(totalSeconds % 60);
            
            this.setState({
              expiring: true,
              gigStatus: `Make offer within ${!!days ? (days + (days > 1 ? ' days' : ' day')) : ''} ${!!hours ? (hours + (hours > 1 ? ' hours' : ' hour')) : ''} ${!!minutes ? (minutes + (minutes > 1 ? ' minutes' : ' minute')) : ''} ${!!seconds ? (seconds + (seconds > 1 ? ' seconds' : ' second')) : ''}`
            })
          }
        }, 1000)

        return;
        }
    }

    this.setState({
      gigStatus: this.props.gig.status === "Cancelled" ?
          "The gig has been cancelled ☹️"
          :this.props.gig.status === "Declined" ?
          "You have declined the gig 😮"
          :this.props.gig.status === "Lost" ?
          "You have lost the gig ☹️"
          :this.props.gig.status === "Confirmed" ?
          "The gig has been confirmed, get ready to play 😁"
          :this.props.gig.status === "Finished"  ?
          "The gig is finished ☺️"
          : this.state.eventFinished ?
          "The event is finished ☺️"
          :this.props.gig.status === "Accepted" ?
          "Waiting on confirmation from organizer 😊"
          :this.props.gig.status === "Requested" ?
          "Event happens soon, make your offer quickly 🤑"
        : ""
    });
  
  },

  showPopup(){
    this.setState({
      showPopup: true,
    })
  },

  componentWillUnmount(){
    if(this.timeLeft){
      clearInterval(this.timeLeft);
    }
  },

  render() {

    const styles ={

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
        },
        image:{
          backgroundImage: 'url('+this.props.gig.customer.picture+')',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'auto 100%',
          width: '68px',
          height: '68px',
          borderRadius: '50%',
        },
    }

    var genres = ""
    const length = this.props.gig.genres.length
    this.props.gig.genres.forEach(function(genre, i) {
      if (i+1 === length) {
        genres += genre
      }else{
        genres = genres + genre + ", "
      }
    })
      return (
      
        <div>
          <Popup 
            showing={this.state.showPopup}
            onClickOutside={()=>this.setState({showPopup:false})}>
            <PayoutForm/>
          </Popup>  

          <div
            className="card gig"

          >


            <div className="col-xs-12">
              <div className="event-top">
                <div>
                  <div className="event-name">
                    {this.props.gig.name}
                  </div>
                  <div className="event-location">
                    <svg
                      version="1.1" id="Capa_1" x="0px" y="0px" width="15px" height="15px" viewBox="0 0 466.583 466.582" style={{enableBackground: "new 0 0 466.583 466.582"}}>
                      <g>
                        <path d="M233.292,0c-85.1,0-154.334,69.234-154.334,154.333c0,34.275,21.887,90.155,66.908,170.834   c31.846,57.063,63.168,104.643,64.484,106.64l22.942,34.775l22.941-34.774c1.317-1.998,32.641-49.577,64.483-106.64   c45.023-80.68,66.908-136.559,66.908-170.834C387.625,69.234,318.391,0,233.292,0z M233.292,233.291c-44.182,0-80-35.817-80-80   s35.818-80,80-80c44.182,0,80,35.817,80,80S277.473,233.291,233.292,233.291z" />
                      </g>
                    </svg>
                    {" " + this.props.gig.location.name}
                  </div>
                </div>
                <div className="gig-status" >
                  {this.state.gigStatus} 
                  {this.state.expiring ? 
                  <InfoPopup
                  info={"The gig request will automatically be declined if you don't make an offer within this time. Remember, you can change the offer up until the organizer has paid."}
                  />
                  : null}
                </div>
              </div>

              <CollapsibleContainer>






                <Collapsible
                  name="EventInfo"
                  label="Event Info"
                >

                  <p style={{marginBottom:"30px"}}>
                    If the information below is not enough to give an offer, don't hesitate contacting the organizer!
                  </p>
                  <TextWrapper
                    label="Date"
                  >
                    <p>
                      {Formatter.date.ToLocalString(this.props.gig.startTime)}
                    </p>
                  </TextWrapper>

                  <TextWrapper
                    label="Description"
                  >
                    <p>
                      {this.props.gig.description}
                    </p>
                  </TextWrapper>
                  <TextWrapper
                    label="Guests"

                  >
                    <p>
                      {"Around " + this.props.gig.guestCount + " people attending the event."}
                    </p>


                  </TextWrapper>

                </Collapsible>




                <Collapsible
                  name="Requirements"
                  label="Event Requirements"
                >

                  <TextWrapper
                    label="Speakers"
                  >
                    <p>
                      {
                        this.props.gig.rider === "DJ"
                        ?
                        "The organizer does not need speakers or lights."
                        : null
                      }
                       {
                        this.props.gig.rider === "DJ_AND_LIGHT"
                        ?
                        "The organizer needs you to bring lights for the event."
                        : null
                      }
                      {
                        this.props.gig.rider === "DJ_AND_SPEAKERS"
                        ?
                        "The organizer needs you to bring speakers."
                        : null
                      }
                      {
                        this.props.gig.rider === "DJ_SPEAKERS_AND_LIGHT"
                        ?
                        "The organizer needs you to bring speakers and light."
                        : null
                      }
                    </p>
                  </TextWrapper>


                  <TextWrapper
                    label="Duration"

                  >
                    <p>
                      {"The music should start at " + Formatter.date.ToTime(this.props.gig.startTime) + ", and end at " + Formatter.date.ToTime(this.props.gig.endTime) + "."}
                    </p>
                  </TextWrapper>

                  <TextWrapper
                    label="Genres">
                    <p>{genres}</p>

                  </TextWrapper>

                </Collapsible>

                <Collapsible
                  name="ContactInfo"
                  label={`Contact Organizer (${this.props.gig.contactName})`}
                >

                   
                  <p>Feel free to contact {this.props.gig.contactName} to discuss the price, or figure out additional details.</p>
             
                      <Chat 
                        receiver={{
                          id:this.props.gig.customer.auth0Id,
                          name:this.props.gig.contactName,
                          image:this.props.gig.customer.picture
                        }}
                        sender={{
                          id:this.props.profileId,
                          name:this.props.profileName,
                          image:this.props.profilePicture
                        }}
                        chatId={this.props.gig.id}
                        />
                </Collapsible>




                {  ( this.props.gig.status === "Cancelled" ||
                    this.props.gig.status === "Declined" ||
                    this.props.gig.status === "Lost" ||
                    this.state.eventFinished ) ? <div/> :

                <Collapsible
                  name="Offer"
                  label="Make Offer"
                >

                 <OfferForm 
                     showPopup={this.showPopup}
                     profileCurrency={this.props.profileCurrency}
                     gig={this.props.gig}
                  />

                </Collapsible>
                 }


              </CollapsibleContainer>
            </div>
          </div>
        </div>)

  }
})


function mapStateToProps(state, ownProps){
  return {
    profileId: state.login.profile.auth0Id,
    profilePicture: state.login.profile.picture,    
    profileName: state.login.profile.censoredName,
    payoutInfoValid:  state.login.profile.stripeID ? true : false,  
    profileCurrency: state.login.profile.settings.currency
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    cancelGig:  (id, callback) => dispatch(actions.cancelGig(id,callback)),
    declineGig: (id, callback) => dispatch(actions.declineGig(id,callback)),
    updateGig:  (offer, callback)  => dispatch(actions.makeOffer(offer,callback)),
}}


const SmartGig = connect(mapStateToProps, mapDispatchToProps)(Gig)

export default props => (
    <SmartGig {...props}/>
)
