import React, { PropTypes } from 'react'
import Button from '../common/Button'
import TextField from '../common/Textfield'
import Formatter from '../../utils/Formatter'
import {Card} from 'material-ui/Card'
import TextWrapper from '../common/TextElement'
import {CollapsibleContainer, Collapsible} from '../common/Collapsible'
import Form from '../../containers/Form-v2'
import SubmitButton from '../common/SubmitButton'
import assign from 'lodash.assign'
import PayoutForm from './PayoutForm'
import Popup from '../common/Popup'

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
          backgroundSize: 'auto 150%',
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
        <Card
          z-index={1}
          className="gig"

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
              <div style={styles.image}/>
            </div>

            <CollapsibleContainer>






              <Collapsible
                name="EventInfo"
                label="Event Info"
              >


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
                  <TextField
                    defaultValue={"Around " + this.props.gig.guestCount + " people attending the event."}
                    name="guestCount"
                    disabled={true}
                    style={styles.medium.textarea}
                    inputStyle={styles.medium.input}
                    type="text"
                    underlineDisabledStyle={styles.plainBorder}
                    underlineStyle={styles.dottedBorderStyle}
                  />

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
                  <TextField
                    defaultValue={"The music should start at " + Formatter.date.ToTime(this.props.gig.startTime) + ", and end at " + Formatter.date.ToTime(this.props.gig.endTime) + "."}
                    name="time"
                    fullWidth={true}
                    disabled={true}
                    style={styles.medium.textarea}
                    inputStyle={styles.medium.input}
                    type="text"
                    underlineDisabledStyle={styles.plainBorder}
                    underlineStyle={styles.dottedBorderStyle}
                  />

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

                <TextWrapper
                  label="Name"
                >
                  <p>{this.props.gig.customer.censoredName}</p>

                </TextWrapper>

                <TextWrapper
                  label="Phone"
                >
                  <a href={"tel:"+this.props.gig.customer.phone}>{this.props.gig.customer.phone}</a>

                </TextWrapper>

                <TextWrapper
                  label="Email"
                >
                  <a href={"mailto:"+this.props.gig.customer.email}>{this.props.gig.customer.email}</a>

                </TextWrapper>
              </Collapsible>





              <Collapsible
                name="Offer"
                label="Offer"
              >
                <Popup showing={this.state.showPopup}
                  onClickOutside={this.hidePopup}>
                  <PayoutForm/>
                </Popup>

                <Form
                  name={"gig-offer-" + this.props.gig.id}
                >
                  {this.props.payoutInfoValid ?
                    <div className="row">
                      <div className="col-xs-4 col-xs-offset-4"
                        style={{marginBottom: '20px',marginTop: '20px'}}>


                        <TextField
                          name="amount"
                          hintStyle={styles.medium.hint}
                          style={styles.medium.textarea}
                          inputStyle={styles.medium.input}
                          disabled={this.props.gig.status === "Cancelled"  || this.props.gig.status === "Lost" || this.props.gig.status === "Confirmed" || this.props.gig.status === "Finished" }
                          type="number"
                          fullWidth={true}
                          defaultValue={this.props.gig.offer.amount}
                        />

                      </div>
                    </div>
                  :null}



                  <div className="row">

                    {!this.props.payoutInfoValid ?

                      <div className="col-xs-12">
                        <p>Please update your payout information before making an offer.</p>

                        <Button
                          rounded={true}
                          label="Update payout information"
                          onClick={()=>this.setState({showPopup:true})}
                          name="show-payout-popup"
                        />



                      </div>

                    : null }


                    <div className="col-xs-6">

                      <Form
                        name={"gig-cancel-" + this.props.gig.id}
                      >

                        { this.props.payoutInfoValid && this.props.gig.status === "Requested"
                          ?
                            <SubmitButton
                              rounded={true}
                              label="Decline gig"
                              name="cancel_gig"
                              onClick={(form, callback)=>this.props.declineGig(this.props.gig.id, callback)}
                            />
                        : null}


                        { this.props.payoutInfoValid &&  (this.props.gig.status  === "Accepted" ||
                          this.props.gig.status  === "Confirmed")
                          ?

                            <SubmitButton
                              rounded={true}
                              label="Cancel gig"
                              name="cancel_gig"
                              onClick={(form, callback)=>this.props.cancelGig(this.props.gig.id, callback)}
                            />

                        : null}

                      </Form>

                    </div>

                    {this.props.payoutInfoValid && this.props.gig.status === "Requested" ?
                      <div className="col-xs-6">
                        <SubmitButton
                          rounded={true}
                          label="Send offer"
                          name="send_offer"
                          onClick={this.updateOffer}
                        />
                      </div>
                    : null}

                    {this.props.payoutInfoValid && this.props.gig.status === "Accepted" ?
                      <div className="col-xs-6">
                        <SubmitButton
                          rounded={true}
                            label="Update price offer"
                            name="update_offer"
                            onClick={this.updateOffer}
                          />
                        </div>
                      :null}


                      {this.props.gig.status === "Confirmed" ?
                        <div className="col-xs-6">
                          Great! You have been chosen to play this gig.
                        </div>
                        :
                      null}

                      { this.props.gig.status === "Lost" ?
                        <div className="col-xs-12">
                          Sorry you have lost this gig to another DJ. <br/>
                          Next time try to set another price or be faster at responding. <br/>
                          Adding info to your profile also helps the customer being comfortable in choosing you.
                        </div>
                      :  null}

                      { this.props.gig.status === "Cancelled" ?
                        <div className="col-xs-12">
                          Unfortunately the event has been cancelled by the host.
                        </div>
                      :  null}

                    </div>
                </Form>


              </Collapsible>




            </CollapsibleContainer>
          </div>

        </Card>)

  }
})

export default (Gig)
