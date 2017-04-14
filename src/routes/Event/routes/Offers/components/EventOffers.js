import React, {PropTypes} from 'react'
import OfferCard from './OfferCard'
import {connect} from 'react-redux';
import EmptyPage from '../../../../../components/common/EmptyPage'

var EventOffers = React.createClass({


  componentWillMount(){
    document.title = this.props.eventName + " | Offers"

    var daysUntil = (this.props.eventDate.getTime() - Date.now())/(24*3600*1000)

    this.setState({
      paymentPossible: daysUntil <= 60,
      eventFinished:  daysUntil < 0
    })
  },

    render() {
        var left =[]
        var right = []

        this.props.offers.forEach((o,i)=>{
          if (i % 2 === 0) {
            left.push(<OfferCard
              paymentPossible={this.state.paymentPossible}
              eventFinished={this.state.eventFinished}
              currency={this.props.currency}
              paymentAmount={this.props.paymentAmount}
              paymentCurrency={this.props.paymentCurrency}
              offer={o}/>)
          }else{
            right.push(<OfferCard
              paymentPossible={this.state.paymentPossible}
              eventFinished={this.state.eventFinished}
              currency={this.props.currency}
              paymentAmount={this.props.paymentAmount}
              paymentCurrency={this.props.paymentCurrency}
              offer={o}/>)
          }
        })

        return (
          <div>
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
                    <div className="col-sm-6">
                      {left}
                    </div>
                    <div className="col-sm-6">
                      {right}
                    </div>
                </div>
                </div>
            :
            this.props.offers.length ?
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
                  <div className="col-sm-6 ">
                    {left}
                  </div>
                  <div className="col-sm-6 ">
                    {right}
                  </div>
              </div>
              </div>
              :
              <EmptyPage message={<div style={{marginBottom:"180px"}}>The DJs are currently creating offers for you.<br/>
              You will be notified whenever there's a new offer.</div>}/>
            }
          </div>

        )
    }

})

function mapDispatchToProps(dispatch, ownProps){
  return {}
}
function mapStateToProps(state, ownProps) {
  return {
    status: state.events.values[0].status,
    paymentAmount: state.events.values[0].paymentAmount,
    paymentCurrency: state.events.values[0].paymentCurrency,
    eventName: state.events.values[0].name,
    offers:  state.events.values[0].offers,
    eventDate: state.events.values[0].startTime,
    currency: state.login.status.signedIn ? state.login.profile.settings.currency : state.session.currency
  }
}

export default connect(mapStateToProps,mapDispatchToProps )(EventOffers);
