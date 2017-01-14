import React, {PropTypes} from 'react'
import UserNavigation from './UserNavigation'
import UserCard from './UserCard'
import Notification from '../../../../components/common/Notification'
import UserPic from '../../../../assets/default-profile-pic.png'

var userHeader = React.createClass({

  propTypes: {
    profile: PropTypes.object,
    hideInfo: PropTypes.bool,
    notification: PropTypes.string,
    actions: PropTypes.arrayOf(PropTypes.node)
  },

   componentWillMount() {
     window.addEventListener('scroll', this.handleScroll)
     this.setState({
       loadString: "..."
     }, ()=>this.loadingStringPlaceholder())
   },

   getInitialState(){
     return{loadString:"..."}
   },

   componentWillUnmount(){
     window.removeEventListener('scroll', this.handleScroll)
     clearInterval(this.intervalID);
   },

  handleScroll(event){
   let scrollTop = event.srcElement.body.scrollTop
   if (scrollTop > 260) {
     if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 516)) {
       this.userHeader.className =  "user-header fixed bottom"
     }else{
        this.userHeader.className =  "user-header fixed"
      }
   } else if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 516)) {
     this.userHeader.className =  "user-header bottom"
   }else{
     this.userHeader.className = "user-header"
   }

  },

    loadingStringPlaceholder(){
      var self = this

      this.intervalID = window.setInterval( function(){
        if (self.props.loading)
        {
        var load = self.state.loadString
         if (load.length === 4) {
           self.setState({loadString: "."})
         }else{
           self.setState({loadString: load += "."})
         }
       }else{
          clearInterval(self.intervalID);
       }
       }, 300)

    },

  render() {


    return (
  <header ref={ref=>this.userHeader=ref}
    className="user-header">
    <div id="stripes" className="v2">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>

    <Notification message={this.props.notification}/>


    <div className="container">
      <div className="row">

        <div className="user-card-wrapper">
          <UserCard
            profile={this.props.profile}
            className="user-card"
            onlyPicture={this.props.hideInfo}
            picture={this.props.loading ? UserPic : this.props.profile.picture}
            about={this.props.loading ? this.state.loadString : this.props.profile.bio}
            rating={this.props.loading ? 0 : this.props.profile.avgRating}
            experience={this.props.loading ? 0 : this.props.profile.gigsCount}
            earned={this.props.loading ? 0 : this.props.profile.earned}
            birthday={this.props.loading ? null : this.props.profile.birthDay}
            genres={this.props.loading ? ["..." ]: this.props.profile.genres}
            loading={this.props.loading}
          />
          {this.props.actions}

        </div>



        <div className="col-xs-4"></div>

        <div className="user-header-content col-md-8">


          <div className="header-info">
            <div className="user-name">
              <h1>{this.props.loading ? this.state.loadString : "Welcome " + this.props.profile.firstName}</h1>
            </div>
            <div className="user-location">
              <h2>
                {this.props.loading ? null :
                  <svg
                    version="1.1" id="Capa_1" x="0px" y="0px" width="22px" height="22px" viewBox="0 0 466.583 466.582" style={{enableBackground: "new 0 0 466.583 466.582"}}>
                    <g>
                      <path d="M233.292,0c-85.1,0-154.334,69.234-154.334,154.333c0,34.275,21.887,90.155,66.908,170.834   c31.846,57.063,63.168,104.643,64.484,106.64l22.942,34.775l22.941-34.774c1.317-1.998,32.641-49.577,64.483-106.64   c45.023-80.68,66.908-136.559,66.908-170.834C387.625,69.234,318.391,0,233.292,0z M233.292,233.291c-44.182,0-80-35.817-80-80   s35.818-80,80-80c44.182,0,80,35.817,80,80S277.473,233.291,233.292,233.291z" fill="#FFFFFF"/>
                    </g>
                  </svg>}
                {this.props.loading ? this.state.loadString : " " + this.props.profile.city}
              </h2>
            </div>
          </div>


          <div className="header-divider"/>
          {this.props.loading ? null :
            <UserNavigation
              isDJ={this.props.profile.isDJ}
              isCustomer={this.props.profile.isCustomer}
            />}

        </div>
      </div>
    </div>

  </header>


      )



  }
})

export default userHeader
