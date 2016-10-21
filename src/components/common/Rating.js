import React, { PropTypes } from 'react'

const Star = React.createClass({
    propTypes:{
      index: PropTypes.number,
      color: PropTypes.string,
      emptyColor: PropTypes.string,
      fillPercentage: PropTypes.string,
      onClick: PropTypes.func,
      onHover: PropTypes.func,
      active: PropTypes.bool,
      editable: PropTypes.bool
    },


handleMouseOver(){
  if (this.props.editable){
  this.props.onHover(this.props.index)
}
},

handleOnClick(){
  if (this.props.editable){
  this.props.onClick(this.props.index)
}
},


  render: function() {
    var fillStyle ={fill:"url(#gradient-"+this.props.fillPercentage+")"}
    return (
      <svg version="1.1" id="Capa_1" x="0px" y="0px"
        style={{marginLeft: '8px'}}
        className={this.props.editable && this.props.active ? "ratingStar active" : "ratingStar"}
      	 width="20px" height="20px" viewBox="0 0 306 306" viewPort="0 0 40 40"
         onMouseOver={this.handleMouseOver}
         onMouseOut={this.handleMouseOut}
         onClick={this.handleOnClick}>
         <defs>
             <linearGradient id={"gradient-"+this.props.fillPercentage} x1="0" x2="100%" y1="0" y2="0">
              <stop
                offset={this.props.fillPercentage}
                stopColor={this.props.color}
                stopOpacity="1"/>
              <stop
                offset={this.props.fillPercentage}
                stopColor={this.props.emptyColor}
                stopOpacity="1"/>
             </linearGradient>
         </defs>
      <g>
      	<g id="star-rate">
      		<polygon
            style={this.props.editable ? {} : fillStyle}
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
    rating: PropTypes.number,
    editable: PropTypes.bool,
    name: PropTypes.string
  },

  contextTypes: {
    registerValidation: PropTypes.func.isRequired,
    updateValue: PropTypes.func,
    isFormValid: PropTypes.func,
    registerReset: PropTypes.func
  },

  getInitialState() {
    return {
      errors: []
    }
  },

componentWillMount(){
    this.setState({
      origRating: this.props.rating || 0,
      rating: this.props.rating || 0
    })

    if (this.props.editable) {

      this.removeValidationFromContext = this.context.registerValidation(show =>
        this.isValid(show))

    if (this.context.updateValue) {
      this.context.updateValue(this.props.name, this.props.rating)
    }

    if (this.context.registerReset) {
      this.removeReset = this.context.registerReset(()=>    this.setState({
            origRating: this.props.rating || 0,
            rating: this.props.rating || 0
          }))
    }

    }
},



componentWillUnmount() {
  if (this.removeValidationFromContext) {
    this.removeValidationFromContext()
  }
  if (this.removeReset) {
    this.removeReset()
  }
},

isValid(showErrors) {
  var errors = []

  if (this.state.rating === 0) {
      errors = ["Please give a rating"]
  }

  if (showErrors) {
    this.setState({
      errors
    })
  }

  return !errors.length
},

updateRating(i){
  this.setState({
    origRating: i+1,
  })

  this.context.updateValue(this.props.name, i+1)
},

updatePotentialRating(i){
  this.setState({
    potRating: i+1,
  })
},

handleMouseOver(){
  if (this.props.editable) {
    this.setState({
      rating: this.state.potRating
    })
  }
},

handleMouseOut(){
  if (this.props.editable) {
    this.setState({
      rating: this.state.origRating
    })
  }
},

render: function() {
  const fullStarsCount   = Math.floor(this.state.rating)
  const fillPercentage = ((this.state.rating % 1)*100).toString() + '%'
  var stars = []

  for (var i = 0; i < 5; i++) {
    if (i < fullStarsCount) {
      stars.push(
        <Star
          index={i}
          onClick={this.updateRating}
          onHover={this.updatePotentialRating}
          editable={this.props.editable}
          active={true}
          color="#1edaf2"
          emptyColor="#cecece"
          fillPercentage="100%"
        />
      )
    }else if (i === fullStarsCount) {
      stars.push(
        <Star
          index={i}
          onClick={this.updateRating}
          onHover={this.updatePotentialRating}
          editable={this.props.editable}
          active={false}
          color="#1edaf2"
          emptyColor="#cecece"
          fillPercentage={fillPercentage}
        />
      )
    }else {
      stars.push(
        <Star
          index={i}
          onClick={this.updateRating}
          onHover={this.updatePotentialRating}
          editable={this.props.editable}
          active={false}
          color="#1edaf2"
          emptyColor="#cecece"
          fillPercentage="0%"
        />
      )
    }
  }

  return (
    <div
    onMouseOver={this.handleMouseOver}
    onMouseOut={this.handleMouseOut}
    >
      {stars}
      {this.state.errors.length ? (
        <div className="form-error">
          {this.state.errors.map((error, i) => <div key={i}>{error}</div>)}
        </div>
      ) : null}
    </div>
  )
}
})
