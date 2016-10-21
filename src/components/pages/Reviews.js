import React, { PropTypes } from 'react'
import Radium from 'radium'
import ToggleButton from '../common/ToggleButton'
import Button from '../common/Button'
import {Card, CardHeader} from 'material-ui/Card'
import Rating from '../common/Rating'

import muiThemeable from 'material-ui/styles/muiThemeable'


var Reviews = React.createClass({
  propTypes: {
    reviews: PropTypes.arrayOf(PropTypes.object),
    fetchReviews: PropTypes.func,
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
          style={{borderBottom: "2px solid #e6e6e6"}}
          >

            <CardHeader
              style={{paddingLeft:'50px'}}
              title={review.author }
              subtitle={review.date}
              actAsExpander={true}
              showExpandableButton={true}
              avatar={review.picture}
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
              expandable={true}
            >
              <div style={{ marginTop: '20px'}} className="row">
                <div className="col-sm-7">
                  <p > {review.description} </p>

                </div>

                <div className="col-sm-5" >
                  <div className="review-card-info">
                      <div className="review-card-fact">
                      <p>Event</p>
                      {review.event.name}
                      </div>
                      <div className="review-card-fact">
                      <p>Location</p>
                      {review.event.location}
                      </div>
                      <div className="review-card-fact">
                      <p>Date</p>
                      {review.event.date}
                      </div>
                  </div>
                </div>

              </div>

            </div>


        </div>)
      }



    return(
      <div>
        {this.props.reviews.map((review, i) => renderReview(review, i))}
      </div>)

  }
})

var styledReviews = Radium(Reviews)
export default muiThemeable()(styledReviews)
