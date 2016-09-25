import React, { PropTypes } from 'react'
import Radium from 'radium'
import ToggleButton from '../common/ToggleButton'
import Button from '../common/Button'
import {Card, CardHeader} from 'material-ui/Card'

import muiThemeable from 'material-ui/styles/muiThemeable'


var Reviews = React.createClass({
  propTypes: {
    reviews: PropTypes.arrayOf(PropTypes.object),
    fetchReviews: PropTypes.func,
  },

  contextTypes: {
    registerActions: PropTypes.func,
  },

  getInitialState(){
    return{
      revies: []
    }
  },


  componentWillMount() {
    if (this.props.reviews !== undefined) {
      this.setState({
        reviews: this.props.reviews
      })
    }

    this.removeActionsFromContext = this.context.registerActions(this.getActionButtons(this.props))
  },

  componentWillReceiveProps(nextprops){
    if (nextprops.reviews !== undefined) {
    this.setState({
      reviews: nextprops.reviews
    })
  }
    this.removeActionsFromContext()
    this.removeActionsFromContext = this.context.registerActions(this.getActionButtons(nextprops))
  },

  componentWillUnmount() {
    this.removeActionsFromContext()
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
          <Card key={i}
            style={{marginBottom: '20px',}}>
            <CardHeader
              style={{paddingLeft:'50px'}}
              title={review.author }
              subtitle={review.date}
              actAsExpander={true}
              showExpandableButton={true}
              children={
                <div style={{width:'30%', textAlign:'right', paddingRight:'37px', float:'right'}}>
                  <h2 style={{margin:'0px'}}>{review.rating}</h2>
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
                <div className="col-sm-8">
                  <p > {review.description} </p>

                </div>
                <div className="col-sm-4" >
                  <div style={{border:"1px solid #eee", padding: "4px"}}>
                    <p style={{textAlign:'right'}} >{review.event.name}</p>
                    <p style={{textAlign:'right'}} >{review.event.location}</p>
                    <p style={{textAlign:'right'}} >{review.event.date}</p>
                  </div>
                </div>

              </div>

            </div>


          </Card>)
      }



    return(
      <div>
        {this.state.reviews.map((review, i) => renderReview(review, i))}
      </div>)

  }
})

var styledReviews = Radium(Reviews)
export default muiThemeable()(styledReviews)
