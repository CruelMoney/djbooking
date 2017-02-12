import React, { PropTypes } from 'react'
import Button from '../../../../../components/common/Button-v2'
import {CardHeader} from 'material-ui/Card'
import Rating from '../../../../../components/common/Rating'
import Formatter from '../../../../../utils/Formatter'
import LoadingPlaceholder from '../../../../../components/common/LoadingPlaceholder'
import EmptyPage from '../../../../../components/common/EmptyPage'
import {requestFeatures} from '../../../../../actions/Common'

/*eslint no-undef: 0*/

var Reviews = React.createClass({
  propTypes: {
    reviews: PropTypes.arrayOf(PropTypes.object),
    fetchReviews: PropTypes.func,
    loading: PropTypes.bool
  },

  contextTypes:{
    registerActions: PropTypes.func,
  },


  componentWillMount() {
      this.props.fetchReviews()
      this.context.registerActions(this.getActionButtons)

  },


  getActionButtons(props = this.props){
    return (
      <div
        className="context-actions"
        key="review_actions">



        <div style={{marginBottom:"4px"}}>
          <Button
            name="request_features"
            onClick={()=>{
            requestFeatures()
          }}
        >Request features</Button>
      </div>

    </div>

    )
  },

  render() {

      function renderReview(review, i){
        return (
          <div
            className="review"
            style={{borderBottom: "2px solid rgb(246, 249, 252)"}}
          >

            <CardHeader
              
              title={review.author }
              subtitle={Formatter.date.ToEU(review.date)}
              actAsExpander={true}
              showExpandableButton={true}
              avatar={review.authorPicture}
              children={
                <div className="review-rating hideMobile">
                  <div style={{margin:'0px'}}>
                    <Rating editable={false} rating={review.rating}/>
                  </div>
                </div>}
            />
            <div
              className="review-text"
              >
              <div className="row">
                <div className="col-sm-12">
                  <div className="review-rating showMobile">
                    <Rating editable={false} rating={review.rating}/>
                </div>
                </div>
              </div>
              <div  className="row">
                <div className="col-sm-7">
                  <p > {review.description} </p>

                </div>

                <div className="col-sm-5" >
                  <div className="review-card-info">
                    <div className="review-card-fact">
                      <p>Event</p>
                      {review.eventName}
                    </div>
                    <div className="review-card-fact">
                      <p>Location</p>
                      {review.eventLocation.name}
                    </div>
                    <div className="review-card-fact">
                      <p>Date</p>
                      {Formatter.date.ToEU(review.eventDate)}
                    </div>
                  </div>
                </div>

              </div>

            </div>


        </div>)
      }

      function renderLoadingItem(){
        return [
          <LoadingPlaceholder/>,
            <LoadingPlaceholder/>,
              <LoadingPlaceholder/>,
                <LoadingPlaceholder/>,
                  <LoadingPlaceholder/>]
      }



    return(
      <div>
        {this.props.loading ?
          renderLoadingItem()
          :
          this.props.reviews.length === 0 ?
            <EmptyPage message={<div>Ask your customers to leave a review <br/>
            It will help you get more gigs</div>}/>
          :
          this.props.reviews.map((review, i) => renderReview(review, i))
        }
      </div>)

  }
})

import { connect } from 'react-redux'
import * as actions from '../../../../../actions/ReviewActions'


function mapStateToProps(state, ownProps) {
  return {
    reviews:  state.reviews.values ? state.reviews.values : [],
    loading: state.reviews.isWaiting
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    fetchReviews: () => { dispatch(actions.fetchReviews()) },
}}
function mergeProps(stateProps, dispatchProps, ownProps) {
  return {...stateProps, ...dispatchProps}
}

const SmartReviews = connect(mapStateToProps, mapDispatchToProps, mergeProps,{ pure: false })(Reviews)

export default props => (
    <SmartReviews {...props}/>
)
