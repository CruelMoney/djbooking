import React, {PropTypes} from 'react'
import Button from '../common/Button-v2'
import Rating from '../common/Rating'
import PayForm from './PayForm'
import Popup from '../common/Popup'
import Formatter from '../../utils/Formatter'

var OfferCard = React.createClass({
  propTypes:{
    offer: PropTypes.object,
    paymentPossible: PropTypes.bool
  },

  componentWillMount(){
    this.setState({
      showPopup: false
    })
  },

  hidePopup(){
    this.setState({
      showPopup: false
    })
  },

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
    <div className="card offer-card">
      <Popup showing={this.state.showPopup}
        onClickOutside={this.hidePopup}>
        <PayForm
          gigId={this.props.offer.gigID}
          amount={this.props.offer.amount}
          currency={this.props.offer.currency}
        />
      </Popup>
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
        Celiac whatever lomo tilde affogato. Disrupt twee microdosing, knausgaard viral jianbing shabby chic vinyl tilde kitsch. Semiotics distillery subway tile, retro selfies viral irony plaid readymade man braid meh. Man braid godard yr kale chips cray bicycle rights, umami disrupt. Venmo succulents gluten-free, chillwave tumblr you probably haven't heard of them umami slow-carb. Coloring book freegan umami health goth literally kickstarter iceland, semiotics church-key vexillologist small batch venmo butcher. Waistcoat man braid pinterest offal succulents.
      </div>
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
      <div style={{display: "flex", alignItems: "center"}}>
        <div className="offer-price" style={{width: "100%"}}>{Formatter.money.FormatNumberToString(
          this.props.offer.amount+(this.props.offer.amount/100)*10,
        this.props.offer.currency)}</div>
        {this.props.paymentPossible ?
          <Button
            glow
            active={true}
            onClick={()=>this.setState({showPopup:true})}
            name="show-payout-popup"
          >Confirm</Button>
        : null}
      </div>
      </div>
    )
  }
})

export default OfferCard
