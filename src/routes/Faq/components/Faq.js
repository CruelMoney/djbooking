import React, {Component} from 'react';
import Footer from '../../../components/common/Footer'
import ButtonLink from '../../../components/common/ButtonLink'
import Button from '../../../components/common/Button-v2'
import { localize } from 'react-localize-redux';

class Faq extends Component{
  themeColor = "#25F4D2"

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }
  componentWillUnmount(){
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = (event) => {
   let scrollTop = window.pageYOffset;;
   if (scrollTop > 80) {
      this.nav.className =  "fixed terms-navigation"
   }else{
     this.nav.className = "terms-navigation"
   }
  }
  render() {
    const { translate } = this.props;

    return (
      <div className="faq-content">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div 
                className="terms-navigation"
                ref={(ref) => this.nav = ref}>
               
                  <ButtonLink color={this.themeColor} to={translate("routes./faq/dj")}>
                    DJ
                  </ButtonLink>
                  <ButtonLink color={this.themeColor} to={translate("routes./faq/organizer")}>
                   {translate("Organizer")}
                  </ButtonLink>
                  <Button
                  color={this.themeColor} 
                  onClick={
                      /*eslint no-undef: 0*/
                    () =>  olark('api.box.expand')}
                    >{translate("Contact us")}
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
          firstTo={translate("routes./")}
          secondTo={translate("routes./signup")}
          firstLabel={translate("arrange-event")}
          secondLabel={translate("become-dj")}
          title={translate("ready-to-get-started")}
          subTitle={translate("arrange-event-or-become-dj")}
        />
      </div>

    )
  }
}

export default localize(Faq, 'locale');