import React, {Component} from 'react';
import Footer from '../../../components/common/Footer'
import ButtonLink from '../../../components/common/ButtonLink'
import Button from '../../../components/common/Button-v2'


export default class Faq extends Component{
  themeColor = "#25F4D2"

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }
  componentWillUnmount(){
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = (event) => {
   let scrollTop = event.srcElement.body.scrollTop
   if (scrollTop > 80) {
      this.nav.className =  "fixed terms-navigation"
   }else{
     this.nav.className = "terms-navigation"
   }
  }
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
                  <Button
                  color={this.themeColor} 
                  onClick={
                      /*eslint no-undef: 0*/
                    () =>  olark('api.box.expand')}
                    >Contact us
                </Button>
              </div>
            </div>

            <div className="col-md-10">
              <div className="card terms">
                {this.props.children}
              </div>
            </div>
          </div>
        </div>      
        <Footer
        color={this.themeColor}
        firstTo="/"
        secondTo="/signup"
        firstLabel="Arrange event"
        secondLabel="Become DJ"
        title="Ready to get started?"
        subTitle="Arrange an event, or apply to become a DJ."
        />
      </div>

    )
  }
}
