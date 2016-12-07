import React, {PropTypes} from 'react'
import Formatter from '../../utils/Formatter'
import Rating from '../common/Rating'
import Navlink  from '../common/Navlink'
import Logo from '../common/Logo'


export default React.createClass({

  propTypes: {
    picture: PropTypes.string,
    about:  PropTypes.string,
    rating: PropTypes.number,
    experience: PropTypes.number,
    earned: PropTypes.number,
    birthday: PropTypes.string,
    genres: PropTypes.arrayOf(PropTypes.string),
    onlyPicture: PropTypes.bool
  },

  render() {
    //calculating the age
    //var cur = new Date();
    //var diff = cur- new Date(this.props.birthday);
    //var age = Math.floor(diff/31536000000);

    var genres = []
    const genresCount = this.props.genres.length;

    this.props.genres.forEach(function(genre, i) {
      if (i+1 === genresCount){
        genres.push(genre)
      }else{
          genres.push(genre + ", ")
      }})

    return (

      <div

        className={"card " + this.props.className}>

        <div
          style={{
            width: '280px',
            height: '280px',
            position: 'relative'
          }}
          className="">
          <div className="user-card-picture-overlay">
            <div
              style={{
                position: "absolute",
                left: "-8px",
                top: "237px",
                height: "20px",
              }}
              className="logo">
              <Navlink to="/">
                <Logo />
              </Navlink>            </div>
          </div>
          <div
            className="user-card-picture"
            style={{backgroundImage: "linear-gradient(20deg, rgba(49, 255, 245,0.8) 0%, rgba(49, 255, 197,0.5) 16%, rgba(0, 209, 255,0.2) 66%, rgba(49, 218, 255, 0.0) 71%),  url("+this.props.picture+")"}}
          />
        </div>

        <div className={this.props.onlyPicture ? "user-card-text hide" : "user-card-text"}>
          <div className="user-card-info">
            <div className="user-card-fact">
              <p>Experience</p>
              {this.props.experience + " Cueup gigs"}
            </div>
            <div className="user-card-fact">
              <p>Earned</p>
              {Formatter.money.FormatNumberToString(this.props.earned, "Dkk")}
            </div>
            <div className="user-card-fact">
              <p>Rating</p>
              <Rating rating={this.props.rating}/>
            </div>
          </div>
        </div>

      </div>
      )
  }
})
