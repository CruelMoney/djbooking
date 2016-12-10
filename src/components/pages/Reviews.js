import React, { PropTypes } from 'react'
import ToggleButton from '../common/ToggleButton'
import Button from '../common/Button'
import {CardHeader} from 'material-ui/Card'
import Rating from '../common/Rating'
import Formatter from '../../utils/Formatter'


var Reviews = React.createClass({
  propTypes: {
    reviews: PropTypes.arrayOf(PropTypes.object),
    fetchReviews: PropTypes.func,
    loading: PropTypes.bool
  },


  componentWillMount() {
      this.props.fetchReviews()
  },


  getActionButtons(props = this.props){
    return (
    <div key="profile_actions">

      <div style={{marginBottom:"4px"}}>
        <Button
          rounded={true}
          label="Load more reviews"
          active={true}
          onClick={this.props.fetchReviews}
        />
      </div>



      <div style={{marginBottom:"4px"}}>
        <ToggleButton
          rounded={true}
          label="Request features"
          name="request_features"
        />
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
        let loadingitem = (
          <div className="timeline-wrapper">
            <div className="timeline-item">
              <div className="animated-background">
                <div className="background-masker header-top"></div>
                <div className="background-masker header-left"></div>
                <div className="background-masker header-right"></div>
                <div className="background-masker header-bottom"></div>
                <div className="background-masker subheader-left"></div>
                <div className="background-masker subheader-right"></div>
                <div className="background-masker subheader-bottom"></div>
                <div className="background-masker content-top"></div>
                <div className="background-masker content-first-end"></div>
                <div className="background-masker content-second-line"></div>
                <div className="background-masker content-second-end"></div>
                <div className="background-masker content-third-line"></div>
                <div className="background-masker content-third-end"></div>
              </div>
            </div>
          </div>
        )
        return [loadingitem, loadingitem, loadingitem, loadingitem, loadingitem]
      }



    return(
      <div>
        {this.props.loading ?
          renderLoadingItem()
          :
          this.props.reviews.map((review, i) => renderReview(review, i))
        }
      </div>)

  }
})

export default Reviews
