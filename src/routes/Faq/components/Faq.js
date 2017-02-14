import React from 'react';
import Footer from '../../../components/common/Footer'
import { Link } from 'react-router';
import ButtonLink from '../../../components/common/ButtonLink'


export default React.createClass({
  themeColor:"#25F4D2",

  componentWillMount() {
    window.addEventListener('scroll', this.handleScroll)
  },
  componentWillUnmount(){
    window.removeEventListener('scroll', this.handleScroll)
  },

  handleScroll(event){
   let scrollTop = event.srcElement.body.scrollTop
   if (scrollTop > 80) {
      this.nav.className =  "fixed terms-navigation"
   }else{
     this.nav.className = "terms-navigation"
   }
  },
  render() {
    return (
      <div className="faq-content">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div 
                className="terms-navigation"
                ref={(ref) => this.nav = ref}>
               
                  <ButtonLink color={this.themeColor} to="/faq/dj">
                    DJ
                  </ButtonLink>
                  <ButtonLink color={this.themeColor} to="/faq/organizer">
                   Organizer
                  </ButtonLink>
              </div>
            </div>

            <div className="col-md-10">
              <div className="card terms">
                {this.props.children}
              </div>
            </div>
          </div>
        </div>      <Footer
        color={this.themeColor}
        firstTo="/"
        secondTo="/signup"
        firstLabel="Arrange event"
        secondLabel="Become DJ"
        title="Ready to get started?"
        subTitle="Arrange an event, or become a DJ."
        />
      </div>

    )
  }
})
