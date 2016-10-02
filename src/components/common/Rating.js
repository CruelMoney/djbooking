import React, { PropTypes } from 'react'

const Star = React.createClass({
    propTypes:{
      color: PropTypes.string,
      emptyColor: PropTypes.string,
      fillPertentage: PropTypes.string
    },


  render: function() {
    var fillStyle ={fill:"url(#gradient-"+this.props.fillPertentage+")"}
    return (
      <svg version="1.1" id="Capa_1" x="0px" y="0px"
        style={{marginRight: '8px'}}
      	 width="40px" height="40px" viewBox="0 0 306 306" viewPort="0 0 40 40">
         <defs>
             <linearGradient id={"gradient-"+this.props.fillPertentage} x1="0" x2="100%" y1="0" y2="0">
              <stop
                offset={this.props.fillPertentage}
                stopColor={this.props.color}
                stopOpacity="1"/>
              <stop
                offset={this.props.fillPertentage}
                stopColor={this.props.emptyColor}
                stopOpacity="1"/>
             </linearGradient>
         </defs>
      <g>
      	<g id="star-rate">
      		<polygon
            style={fillStyle}
            className="ratingStar"
            points="153,230.775 247.35,299.625 211.65,187.425 306,121.125 191.25,121.125 153,6.375 114.75,121.125 0,121.125
      			94.35,187.425 58.65,299.625"/>
      	</g>
      </g>
      </svg>
    )
  }
})

export default React.createClass({
  propTypes:{
    rating: PropTypes.number
  },



render: function() {
  const fullStarsCount   = Math.floor(this.props.rating)
  var fullStars          = []
  const emptyStarsCount  = 5 - (fullStarsCount + 1)
  var emptyStars    = []
  const fillPertentage = ((this.props.rating % 1)*100).toString() + '%'
  
  for (var i = 0; i < fullStarsCount; i++) {
      fullStars.push(
        <Star
          color="#1edaf2"
          emptyColor="#eee"
          fillPertentage="100%"
        />
      )
    }

    var halfStar =  (<Star
                        color="#1edaf2"
                        emptyColor="#eee"
                        fillPertentage={fillPertentage}
                      /> )


  for (i = 0; i < emptyStarsCount; i++) {
      emptyStars.push(
        <Star
          color="#1edaf2"
          emptyColor="#eee"
          fillPertentage="0%"
        />
      )
    }

  return (
    <div>
      {fullStars}
      {halfStar}
      {emptyStars}
    </div>
  )
}
})
