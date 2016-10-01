import React, {PropTypes} from 'react'
import Paper from 'material-ui/Paper'
import Button from '../common/Button'


var OfferCard = React.createClass({
  propTypes:{
    dj: PropTypes.object,
    price: PropTypes.number
  },



  render(){

    function renderRating(rating){
      const rounded = Math.round(rating)
      var stars = ""
      for (var i = 0; i < rounded; i++) {
          stars +=  "★ "
      }
      return stars
    }

    return(
      <Paper
        zDepth={2}
        style={{padding:"5px"}}
      >
        <div
          style={{display:'flex', justifyContent:'space-between', alignItems: 'baseline' }}
        >
          <h4>{this.props.dj.user_metadata.firstName}</h4>
          <p>{this.props.price + "KR."}</p>
        </div>
        <div
          style={{display:'flex', justifyContent:'space-between', alignItems: 'baseline' }}
        >
          <p>{renderRating(this.props.dj.app_metadata.vgRating)}</p>
          <p>Has played at {this.props.dj.app_metadata.gigsCount} events.</p>
        </div>
        <div>
          <p>
            {this.props.dj.user_metadata.phone}
          </p>
          <p>
            {this.props.dj.email}
          </p>
        </div>

        <Button
          label="Accept"
        />
      </Paper>
    )
  }
})

export default OfferCard
