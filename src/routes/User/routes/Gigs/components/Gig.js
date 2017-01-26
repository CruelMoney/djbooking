import React, { PropTypes } from 'react'
import Button from '../../../../../components/common/Button-v2'
import TextField from '../../../../../components/common/Textfield'
import Formatter from '../../../../../utils/Formatter'
import TextWrapper from '../../../../../components/common/TextElement'
import {CollapsibleContainer, Collapsible} from '../../../../../components/common/Collapsible'
import Form from '../../../../../components/common/Form-v2'
import SubmitButton from '../../../../../components/common/SubmitButton'
import assign from 'lodash.assign'
import PayoutForm from '../../../../../components/common/PayoutForm'
import Popup from '../../../../../components/common/Popup'
import {moneyPipe} from '../../../../../utils/TextPipes'

var Gig = React.createClass({
  propTypes: {
    payoutInfoValid: PropTypes.bool,
    gig: PropTypes.object,
    declineGig: PropTypes.func,
    cancelGig: PropTypes.func,
    updateGig: PropTypes.func
  },

  updateOffer(form, callback){
    if (this.props.payoutInfoValid) {
      const offer = assign(this.props.gig.offer,
        {
          currency : "DKK",
          amount: form.values.amount,
        })
      this.props.updateGig(offer, callback)
    }
  },

  getInitialState(){
    return{
      showPopup: false
    }
  },

  hidePopup(){
    this.setState({
      showPopup: false
    })
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
          <Popup showing={this.state.showPopup}
            onClickOutside={this.hidePopup}>
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
                <div style={{right: "18px", color:"#8998AA", position: "absolute"}}>
                  {

                    this.props.gig.status === "Cancelled" ?
                    "The gig has been cancelled ☹️"
                    :this.props.gig.status === "Declined" ?
                    "You have declined the gig 😮"
                    :this.props.gig.status === "Lost" ?
                    "You have lost the gig ☹️"
                    :this.props.gig.status === "Confirmed" ?
                    "The gig has been confirmed, get ready to play 😁"
                    :this.props.gig.status === "Finished"  ?
                    "The gig is finished ☺️"
                    :(this.props.gig.startTime.getTime() - Date.now()) <= 0 ?
                    "The event is finished ☺️"
                    :this.props.gig.status === "Accepted" ?
                    "Waiting on confirmation from organizer 😊"
                    :this.props.gig.status === "Requested" ?
                    "Waiting on your offer 🤔"

                  :null}
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
                  label="Requirements"
                >

                  <TextWrapper
                    label="Speakers"
                  >
                    <p>
                      {
                        this.props.gig.needSpeakers === "YES"
                        ?
                        "The customer needs you to bring speakers."
                        : null
                      }
                      {
                        this.props.gig.needSpeakers === "UNCERTAIN"
                        ?
                        "The customer does not know if they need speakers yet."
                        : null
                      }
                      {
                        this.props.gig.needSpeakers === "NO"
                        ?
                        "There's already speakers at the event."
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
                  label="Contact"
                >

                  <p style={{marginBottom:"30px"}}>
                    Feel free to contact the organizer to discuss the price, or figure out additional details.
                  </p>

                  <TextWrapper
                    label="Name"
                  >
                    <p>{this.props.gig.contactName}</p>

                  </TextWrapper>

                  {this.props.gig.contactPhone ?
                    <TextWrapper
                      label="Phone"
                    >
                      <a href={"tel:"+this.props.gig.contactPhone}>{this.props.gig.contactPhone}</a>

                    </TextWrapper>
                  : null}


                  <TextWrapper
                    label="Email"
                  >
                    <a href={"mailto:"+this.props.gig.contactEmail}>{this.props.gig.contactEmail}</a>

                  </TextWrapper>
                </Collapsible>





                <Collapsible
                  name="Offer"
                  label="Offer"
                >

                  <Form
                    name={"gig-offer-" + this.props.gig.id}
                  >
                    {this.props.payoutInfoValid ?

                      <div>
                        <p>Enter your price to play this gig.
                        You can always update the offer until it has been paid.</p>

                        <TextField
                          name="amount"
                          hintStyle={styles.medium.hint}
                          style={styles.medium.textarea}
                          placeholder="DKK 0,00"
                          onUpdatePipeFunc={(oldVal,val)=>moneyPipe(oldVal,val,"DKK")}
                          inputStyle={styles.medium.input}
                          disabled={this.props.gig.status === "Cancelled"  || this.props.gig.status === "Lost" || this.props.gig.status === "Confirmed" || this.props.gig.status === "Finished" }
                          type="string"
                          fullWidth={true}
                          value={this.props.gig.offer.amount}
                        />
                      </div>

                    :null}



                    { this.props.gig.status === "Lost" ?
                      <p>
                        Sorry you have lost this gig to another DJ. <br/>
                        Next time try to set another price or be faster at responding. <br/>
                        Adding info to your profile also helps the organizer being comfortable in choosing you.
                      </p>
                    :  null}


                    {!this.props.payoutInfoValid ?

                      <div >
                        <p>Please update your payout information before making an offer.</p>

                        <Button
                          rounded={true}
                          onClick={()=>this.setState({showPopup:true})}
                          name="show-payout-popup"
                        >Update payout information</Button>



                      </div>

                    : null }

                    <div className="offer-buttons">

                      <Form
                        name={"gig-cancel-" + this.props.gig.id}
                      >

                        { this.props.payoutInfoValid && (this.props.gig.status === "Requested" || this.props.gig.status  === "Accepted")
                          ?
                            <SubmitButton
                              rounded={true}
                              dangerous
                              warning="Are you sure you want to decline the gig?"
                              name="cancel_gig"
                              onClick={(form, callback)=>this.props.declineGig(this.props.gig.id, callback)}
                            >Decline gig</SubmitButton>
                        : null}


                        { this.props.payoutInfoValid &&
                          this.props.gig.status  === "Confirmed"
                          ?

                            <SubmitButton
                              rounded={true}
                              dangerous
                              name="cancel_gig"
                              onClick={(form, callback)=>this.props.cancelGig(this.props.gig.id, callback)}
                            >Cancel gig</SubmitButton>

                        : null}

                      </Form>


                      {this.props.payoutInfoValid && this.props.gig.status === "Requested" ?
                        <SubmitButton
                          rounded={true}
                          name="send_offer"
                          onClick={this.updateOffer}
                        >Send offer</SubmitButton>
                      : null}

                      {this.props.payoutInfoValid && this.props.gig.status === "Accepted" ?
                        <SubmitButton
                          rounded={true}
                          name="update_offer"
                          onClick={this.updateOffer}
                        >Update price offer</SubmitButton>
                      :null}

                    </div>


                  </Form>


                </Collapsible>




              </CollapsibleContainer>
            </div>
          </div>
        </div>)

  }
})

import { connect } from 'react-redux'
import  * as actions from '../../../../../actions/GigActions'

function mapStateToProps(state, ownProps){
  return {payoutInfoValid:  state.user.profile.stripeID ? true : false,  }
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
