import React, {PropTypes} from 'react'
import {Card} from 'material-ui/Card'
import Formatter from '../../utils/Formatter'
import Rating from '../common/Rating'
import Navlink  from '../common/Navlink'

export default React.createClass({

  propTypes: {
    picture: PropTypes.string,
    about:  PropTypes.string,
    rating: PropTypes.number,
    experience: PropTypes.number,
    earned: PropTypes.number,
    birthday: PropTypes.string,
    genres: PropTypes.arrayOf(PropTypes.string)
  },

  render() {
    //calculating the age
    var cur = new Date();
    var diff = cur- new Date(this.props.birthday);
    var age = Math.floor(diff/31536000000);

    var genres = []
    const genresCount = this.props.genres.length;

    this.props.genres.forEach(function(genre, i) {
      if (i+1 === genresCount){
        genres.push(genre)
      }else{
          genres.push(genre + ", ")
      }})

    return (

      <Card
      zDepth={4}
      className={this.props.className}>

            <div
            style={{
              width: '300px',
              height: '300px',
              position: 'relative'
            }}
            className="">
                <div className="user-card-picture-overlay">
                  <div
                  style={{
                      position: 'absolute',
                      top: '216px',
                      left: '20px'
                    }}
                  className="logo">
                    <Navlink white={true} to="/">Cueup</Navlink>
                  </div>
                </div>
                <div
                className="user-card-picture"
                style={{backgroundImage: "url("+this.props.picture+")"}}
                />
            </div>
            <div className="user-card-text">
              <div className="user-card-about">
              <p>About</p>
              {this.props.about}
              </div>
              <div className="user-card-info">
                  <div className="user-card-fact">
                  <p>Age</p>
                  {age}
                  </div>
                  <div className="user-card-fact">
                  <p>Rating</p>
                  <Rating rating={this.props.rating}/>
                  </div>
                  <div className="user-card-fact">
                  <p>Earned</p>
                  {Formatter.money.FormatNumberToString(this.props.earned, "Dkk")}
                  </div>
                  <div className="user-card-fact">
                  <p>Experience</p>
                  {this.props.experience + " Cueup gigs"}
                  </div>
              </div>
              <div className="user-card-genres">
              <p>Genres</p>
              {genres}
              </div>
            </div>
      </Card>
      )
  }
})
