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
          rounded= {true}
          label="Load more reviews"
          active={true}
          onClick= {this.props.fetchReviews}
        />
      </div>



      <div style={{marginBottom:"4px"}}>
        <ToggleButton
          rounded= {true}
          label="Request features"
          name="request_features"
        />
      </div>

    </div>

    )
  },

  render() {

    const styles ={
      medium:{
        textarea: {
          height: '40px',
          textAlign: 'center',
        },

        paragraph: {
          fontSize: '30px',
          textAlign: 'center',
        },

        input:{
          fontSize: '30px',
          height: 'initial',
          textAlign: 'center',
          color: this.props.muiTheme.palette.textColor,
          fontWeight: '300',
        },

        hint:{
          fontSize: '30px',
          height: 'initial',
          fontWeight: '300',
          textAlign: 'center',
          width: '100%'
        },

      },
       dottedBorderStyle: {
          borderTop: 'none rgba(0, 0, 0, 1)',
          borderRight: 'none rgba(0, 0, 0, 1)',
          borderBottom: '2px dotted rgba(0, 0, 0, 1) ',
          borderLeft: 'none rgba(0, 0, 0, 1)',
          borderImage: 'initial',
          bottom: '8px',
          boxSizing: 'content-box',
          margin: '0px',
          position: 'absolute',
          width: '100%',
          borderColor: 'rgba(0,0,0, 0.5)'
        },
        plainBorder:{
          borderTop: 'none rgb(224, 224, 224)',
          borderRight: 'none rgb(224, 224, 224)',
          borderBottom: '1px solid rgb(224, 224, 224)',
          borderLeft: 'none rgb(224, 224, 224)',
          borderImage: 'initial',
          bottom: '8px',
          boxSizing: 'content-box',
          margin: '0px',
          position: 'absolute',
          width: '100%',
          display: 'none',
        }
    }



      function renderReview(review, i){
        return (
          <Card key={i}
            style={{marginBottom: '20px',}}>
            <CardHeader
              style={{paddingLeft:'50px'}}
              title= {review.author }
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
