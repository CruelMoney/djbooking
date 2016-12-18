import React, { PropTypes } from 'react'
import Button from '../common/Button-v2'
import {CardHeader} from 'material-ui/Card'
import Rating from '../common/Rating'
import Formatter from '../../utils/Formatter'
import LoadingPlaceholder from '../common/LoadingPlaceholder'
import EmptyPage from '../common/EmptyPage'


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
            olark('api.box.expand');
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
            style={{borderBottom: "2px solid rgb(246, 249, 252)"}}
          >

            <CardHeader
              style={{paddingLeft:'50px'}}
              title={review.author }
              subtitle={Formatter.date.ToEU(review.date)}
              actAsExpander={true}
              showExpandableButton={true}
              avatar={review.authorPicture}
              children={
                <div style={{width:'30%', textAlign:'right', paddingRight:'37px', float:'right'}}>
                  <div style={{margin:'0px'}}>
                    <Rating editable={false} rating={review.rating}/>
                  </div>
                </div>}
            />
            <div
              style={{
                width:'100%',
                padding: '50px',
                paddingTop: '0px',
                paddingBottom: '20px',

              }}
            >
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

export default Reviews
