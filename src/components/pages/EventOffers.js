import React, {PropTypes} from 'react'
import OfferCard from '../blocks/OfferCard'
import {connect} from 'react-redux';
import EmptyPage from '../common/EmptyPage'

var EventOffers = React.createClass({


  componentWillMount(){
    var daysUntil = (this.props.eventDate.getTime() - Date.now())/(24*3600*1000)

    this.setState({
      paymentPossible: daysUntil <= -2
    })
  },

    render() {
        var left =[]
        var right = []

        this.props.offers.forEach((o,i)=>{
          if (i % 2 === 0) {
            left.push(<OfferCard
              paymentPossible={this.state.paymentPossible}
              offer={o}/>)
          }else{
            right.push(<OfferCard
              paymentPossible={this.state.paymentPossible}
              offer={o}/>)
          }
        })

        return (
          <div>
            {this.props.offers.length ?
              <div className="row event-information">
                <div className="row">
                  <div className="col-md-5 col-md-push-1">
                    {left}
                  </div>
                  <div className="col-md-5 col-md-push-1">
                    {right}
                  </div>
                </div>
              </div>
              :
              <EmptyPage message={<div style={{marginBottom:"180px"}}>The djs are currently creating offers for you.<br/>
              You will be notified whenever there's new offers.</div>}/>
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
    offers:  state.events.values[0].offers,
    eventDate: state.events.values[0].startTime
  }
}

export default connect(mapStateToProps,mapDispatchToProps )(EventOffers);
