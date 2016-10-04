import React, {PropTypes} from 'react'
import Radium from 'radium'
import muiThemeable from 'material-ui/styles/muiThemeable'
import UserNavigation from './UserNavigation'
import BgPicture from '../../assets/blurry-night.png'
import UserCard from './UserCard'

var userHeader = React.createClass({

  propTypes: {
    profile: PropTypes.object
  },


   componentWillMount() {
     window.addEventListener('scroll', this.handleScroll)
   },

   componentWillUnmount(){
     window.removeEventListener('scroll', this.handleScroll)
   },

  handleScroll(event){
   let scrollTop = event.srcElement.body.scrollTop
   if (scrollTop > 290) {
     this.userHeader.className =  "user-header fixed"
   }else{
     this.userHeader.className = "user-header"
   }
  },

  render() {


    return (
      <div
        ref={ref=>this.userHeader=ref}
        className="user-header">

        <div className="user-card-wrapper">
          <div className="container">
            <div className="row">
              <UserCard
                className="user-card"
                picture={this.props.profile.picture}
                about={this.props.profile.bio}
                rating={this.props.profile.avgRating}
                experience={this.props.profile.gigsCount}
                earned={this.props.profile.earned}
                birthday={this.props.profile.birthDay}
                genres={this.props.profile.genres}
              />
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-xs-4"></div>

            <div className="user-header-content col-xs-8">
              <div className="header-info">
                <div className="user-name">
                  {this.props.profile.name}
                </div>
                <div className="user-location">
                  <svg
                    version="1.1" id="Capa_1" x="0px" y="0px" width="15px" height="15px" viewBox="0 0 466.583 466.582" style={{enableBackground: "new 0 0 466.583 466.582"}}>
                    <g>
                      <path d="M233.292,0c-85.1,0-154.334,69.234-154.334,154.333c0,34.275,21.887,90.155,66.908,170.834   c31.846,57.063,63.168,104.643,64.484,106.64l22.942,34.775l22.941-34.774c1.317-1.998,32.641-49.577,64.483-106.64   c45.023-80.68,66.908-136.559,66.908-170.834C387.625,69.234,318.391,0,233.292,0z M233.292,233.291c-44.182,0-80-35.817-80-80   s35.818-80,80-80c44.182,0,80,35.817,80,80S277.473,233.291,233.292,233.291z" fill="#FFFFFF"/>
                    </g>
                  </svg>
                  {" " + this.props.profile.city}
                </div>
              </div>

              <div className="header-divider"/>

              <UserNavigation
                isDJ={this.props.profile.isDJ}
                isCustomer={this.props.profile.isCustomer}
              />
            </div>
          </div>
        </div>
        <div className="user-header-img-wrapper">
          <div className="user-header-img-overlay"></div>
          <img alt="DJ copenhagen" src={BgPicture}/>
        </div>
      </div>
      )



  }
})

var styledUserHeader = Radium(userHeader)
export default muiThemeable()(styledUserHeader)
