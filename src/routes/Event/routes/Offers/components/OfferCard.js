import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Button from '../../../../../components/common/Button-v2'
import Rating from '../../../../../components/common/Rating'
import PayForm from '../../../../../components/common/PayForm'
import Popup from '../../../../../components/common/Popup'
import {currencyConverter} from '../../../../../utils/CurrencyConverter'
import Chat from '../../../../../components/common/Chat'
import EmptyPage from '../../../../../components/common/EmptyPage'

class OfferCard extends Component{
  static propTypes = {
    offer: PropTypes.object,
    paymentPossible: PropTypes.bool,
    disabled: PropTypes.bool
  }

  componentWillMount(){
    this.setState({
      showPopup: false,
      showChat: false
    })
  }

  hidePopup = () => {
    this.setState({
      showPopup: false
    })
  }
  hideChat = () => {
    this.setState({
      showChat: false
    })
  }

  render(){

    const image ={
      backgroundImage: 'url('+this.props.offer.dj.picture+')',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'auto 100%',
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      marginRight: "20px"
    }


    return(
      <div>
        <Popup showing={this.state.showPopup}
          onClickOutside={this.hidePopup}>
          <PayForm
            paymentPossible={this.props.paymentPossible}
            gigId={this.props.offer.gigID}
            fee={this.props.offer.serviceFeeAmount}
            amount={this.props.offer.amount}
            currency={this.props.currency}
            offerCurrency={this.props.offer.currency}
          />
        </Popup>
        <Popup 
          hideClose
          showing={this.state.showChat}
          onClickOutside={this.hideChat}>
          <Chat 
            receiver={{
              id:this.props.offer.dj.auth0Id,
              name:this.props.offer.dj.censoredName,
              image:this.props.offer.dj.picture
            }}
            sender={{
              id:this.props.profileId,
              name:this.props.profileName,
              image:this.props.profilePicture
            }}
            chatId={this.props.offer.gigID}
             placeholder={<EmptyPage
              message={
                <div> No Messages<br/>
                Send a message to the DJ.</div>
              }/>}
            />
        </Popup>
        <div className="card offer-card">

          <div
            style={{display:'flex' }}
          >
            <div style={image}/>
            <div className>
              <h4>{this.props.offer.dj.censoredName}</h4>
              <div className="dj-location">
                <svg
                  version="1.1" id="Capa_1" x="0px" y="0px" width="1em" height="1em" viewBox="0 0 466.583 466.582" style={{enableBackground: "new 0 0 466.583 466.582"}}>
                  <g>
                    <path d="M233.292,0c-85.1,0-154.334,69.234-154.334,154.333c0,34.275,21.887,90.155,66.908,170.834   c31.846,57.063,63.168,104.643,64.484,106.64l22.942,34.775l22.941-34.774c1.317-1.998,32.641-49.577,64.483-106.64   c45.023-80.68,66.908-136.559,66.908-170.834C387.625,69.234,318.391,0,233.292,0z M233.292,233.291c-44.182,0-80-35.817-80-80   s35.818-80,80-80c44.182,0,80,35.817,80,80S277.473,233.291,233.292,233.291z" />
                  </g>
                </svg>
                {" " + this.props.offer.dj.city}
              </div>
              {this.props.offer.dj.avgRating === 0?
              <p style={{fontSize: "12px", margin: "0"}}>No ratings yet</p>
              :
                <Rating
                  rating={this.props.offer.dj.avgRating}
                />
              }

            </div>
          </div>

          <div className="user-bio">
            {this.props.offer.dj.bio}
          </div>

          {this.props.offer.gigStatus === "Confirmed" ?
          <div className="user-card-info">
            
            <div className="user-card-fact">
              <p>Email</p>
              <a href={"mailto:"+this.props.offer.dj.email}>{this.props.offer.dj.email}</a>
            </div>
            <div className="user-card-fact">
              <p>Phone</p>
              <a href={"tel:"+this.props.offer.dj.phone}>{this.props.offer.dj.phone}</a>
            </div>

          </div>
          : null}
        
    
          <div className="cancelation-policy">
            Cancelation policy: Full refund if event is cancelled {this.props.offer.cancelationDays} or more days before it starts. Otherwise {this.props.offer.refundPercentage}% is refunded.
          </div>
          <div
              className="offer-price"
              style={{
                width: "100%",
                textAlign: "center"
              }}>{
                this.props.offer.gigStatus === "Confirmed"?
                currencyConverter.getConvertedFormatted(
                  this.props.paymentAmount,
                  this.props.paymentCurrency,
                  this.props.currency, true)
                :
                currencyConverter.getConvertedFormatted(
                this.props.offer.amount+this.props.offer.serviceFeeAmount,
                this.props.offer.currency,
                this.props.currency, true)}
                
                </div>
                {this.props.disabled ? null :
          <div style={{display: "flex", alignItems: "center", justifyContent: "center", marginTop: "15px"}}>
                <Button
                className="send-message-button"
                onClick={()=>this.setState({showChat:true})}
                name="show-chat-popup"
            >
            {this.props.notification ? 
              <div className="notification-bubble">
                  1
              </div>
              : null}
            Send message</Button>
            {this.props.offer.gigStatus === "Confirmed" ||
              this.props.eventFinished
              ? null :
              <Button
                glow
                disabled={this.props.disabled}
                active={true}
                onClick={()=>this.setState({showPopup:true})}
                name="show-payout-popup"
              >Confirm</Button>
            }
          </div>
          }
        </div>
      </div>

    )
  }
}

export default OfferCard
