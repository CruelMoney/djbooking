import React from 'react';
import Footer from '../../../components/common/Footer'
import { Link } from 'react-router';

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
      this.nav.className =  "fixed"
   }else{
     this.nav.className = ""
   }
  },
  render() {
    return (
      <div className="faq-content">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div ref={(ref) => this.nav = ref}>
                <div
                  className="button-wrapper terms-navigation"
                  >
                  <Link className="button flat" activeClassName="active" to="/faq/dj">
                    DJ
                  </Link>
                  <Link className="button flat" activeClassName="active" to="/faq/organizer">
                   Organizer
                  </Link>
                </div>
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
