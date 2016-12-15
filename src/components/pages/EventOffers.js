import React, {PropTypes} from 'react'
import OfferCard from '../blocks/OfferCard'
import {connect} from 'react-redux';

var EventOffers = React.createClass({
    propTypes: {
        offers: PropTypes.object,
    },


    render() {
        var left =[]
        var right = []

        this.props.offers.forEach((o,i)=>{
          if (i % 2 === 0) {
            left.push(<OfferCard offer={o}/>)
          }else{
            right.push(<OfferCard offer={o}/>)
          }
        })

        return (
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



        )
    }

})

function mapDispatchToProps(dispatch, ownProps){
  return {}
}
function mapStateToProps(state, ownProps) {
  console.log(this);
  return {
    offers:  state.events.values[0].offers,
  }
}

export default connect(mapStateToProps,mapDispatchToProps )(EventOffers);
