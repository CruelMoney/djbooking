import React, {Component} from 'react'
import OfferCard from './OfferCard'
import {notificationService} from '../../../../../utils/NotificationService';
import {connect} from 'react-redux';
import moment from 'moment-timezone'
import EmptyPage from '../../../../../components/common/EmptyPage'
import { Helmet } from 'react-helmet';

class EventOffers extends Component{


  componentWillMount(){
    var daysUntil = moment(this.props.eventDate).diff(moment(), 'days')

    this.setState({
      paymentPossible: daysUntil <= 60,
      eventFinished:  daysUntil < 0,
      gigMessages: {}
    })
  }

  componentDidMount(){
    notificationService.getChatStatus()
    .then((res,err)=>{
      if (!!err){return}
      this.setState({
        gigMessages: res
      })
    });
  }

    render() {
        const ShowOffers = []
        const {offers, notifications} = this.props;

        offers.forEach((o,i)=>{
          const notification = notifications.find(n => String(n.room) === String(o.gigID))
          const hasMessages = !!this.state.gigMessages[o.gigID]
          const hasOffer = o.gigStatus === "Accepted"  || o.gigStatus === 'Confirmed'

          if(hasOffer || hasMessages){
            const offer = <div className="col-sm-6">
            <OfferCard
              key={o.gigID}
              onlyChat={!hasOffer && hasMessages}
              eventId={this.props.event.id}
              notification={notification}
              profileId={this.props.eventContactId}
              profileName={this.props.eventContactName}
              profilePicture={this.props.eventContactPicture}
              paymentPossible={this.state.paymentPossible}
              eventFinished={this.state.eventFinished}
              currency={this.props.currency}
              paymentAmount={this.props.paymentAmount}
              paymentCurrency={this.props.paymentCurrency}
              offer={o}/>
            </div>
 
              ShowOffers.push(offer)
           
          }
        })
        const title = this.props.event.name + " | Offers";

        return (
          <div>
            <Helmet>
                <title>{title}</title>
                <meta property="og:title"           content={title} />
                <meta name="twitter:title"      content={title} />
            </Helmet>
            {this.props.status === "Confirmed" ? 
              <div>
              <div className="row">
                    <div className="col-xs-12">
                      <p style={{textAlign:"center", marginBottom: "20px"}}>
                        The offer has been paid and confirmed.
                      </p>
                    </div>
                  </div>
                <div className="row event-information">
                    {ShowOffers}
                </div>
                </div>
            :
            ShowOffers.length ?
            <div>
             <div className="row">
                  <div className="col-xs-12">
                    <p style={{textAlign:"center"}}>
                      Keep in mind that quality often follows price.
                    </p>
                    <p style={{textAlign:"center", marginBottom: "20px"}}>
                      You can always contact the DJ to discuss the price. If a DJ updates the offer, the new price will be shown here.
                    </p>
                  </div>
                </div>
              <div className="row event-information">
               {ShowOffers}
              </div>
              </div>
              :
              <EmptyPage message={<div style={{marginBottom:"180px"}}>The DJs are currently creating offers for you.<br/>
              You will be notified whenever there's a new offer.</div>}/>
            }
          </div>

        )
    }

}


function mapStateToProps(state, ownProps) {
  return {
    event: state.events.values[0],
    eventContactId: state.events.values[0].auth0Id,
    eventContactName: state.events.values[0].contactName,
    eventContactPicture: state.login.profile.picture || "/static/media/default-profile-pic.228cd63f.png",
    notifications: state.notifications.data,
    status: state.events.values[0].status,
    paymentAmount: state.events.values[0].paymentAmount,
    paymentCurrency: state.events.values[0].paymentCurrency,
    eventName: state.events.values[0].name,
    offers:  state.events.values[0].offers,
    eventDate: state.events.values[0].startTime,
    currency: state.login.status.signedIn ? state.login.profile.settings.currency : state.session.currency
  }
}

export default connect(mapStateToProps )(EventOffers);
