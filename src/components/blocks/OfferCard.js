import React, {PropTypes} from 'react'
import Button from '../common/Button'
import Rating from '../common/Rating'
import PayForm from './PayForm'
import Popup from '../common/Popup'
import Formatter from '../../utils/Formatter'

var OfferCard = React.createClass({
  propTypes:{
    offer: PropTypes.object
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
      backgroundSize: 'auto 150%',
      width: '54px',
      height: '54px',
      borderRadius: '50%',
    }


    return(
    <div className="offer-card">
      <Popup showing={this.state.showPopup}
        onClickOutside={this.hidePopup}>
        <PayForm
          amount={this.props.offer.amount}
          currency={this.props.offer.currency}
        />
      </Popup>
      <div
        style={{display:'flex', justifyContent:'space-between' }}
      >
        <div>
          <h4>{this.props.offer.dj.censoredName}</h4>
          <Rating
            rating={this.props.offer.dj.avgRating}
          />
        </div>
        <div style={image}/>
      </div>
      <div>
        <div className="user-card-info">
          <div className="user-card-fact">
            <p>Email</p>
            <a href={"mailto:"+this.props.offer.dj.email}>{this.props.offer.dj.email}</a>
          </div>
          <div className="user-card-fact">
            <p>Phone</p>
            <a href={"tel:"+this.props.offer.dj.phone}>{this.props.offer.dj.phone}</a>
          </div>
          <div className="user-card-fact">
            <p>Experience</p>
            {this.props.offer.dj.gigsCount + " Cueup events"}
          </div>
        </div>
      </div>
      <div style={{
        borderBottom: "2px solid #eee",
        marginBottom: "20px",
        paddingBottom: "20px"
      }}>
        <p style={{fontWeight: "500"}}>Bio</p>
        <div className="user-bio">
          Celiac whatever lomo tilde affogato. Disrupt twee microdosing, knausgaard viral jianbing shabby chic vinyl tilde kitsch. Semiotics distillery subway tile, retro selfies viral irony plaid readymade man braid meh. Man braid godard yr kale chips cray bicycle rights, umami disrupt. Venmo succulents gluten-free, chillwave tumblr you probably haven't heard of them umami slow-carb. Coloring book freegan umami health goth literally kickstarter iceland, semiotics church-key vexillologist small batch venmo butcher. Waistcoat man braid pinterest offal succulents.
        </div>
      </div>

      <div style={{display: "flex", alignItems: "center"}}>
        <div style={{width: "100%"}}>{Formatter.money.FormatNumberToString(
          this.props.offer.amount+(this.props.offer.amount/100)*10,
        this.props.offer.currency)}</div>
        <Button
          rounded={true}
        label="Choose DJ"
        onClick={()=>this.setState({showPopup:true})}
        name="show-payout-popup"
      />
</div>
      </div>
    )
  }
})

export default OfferCard
