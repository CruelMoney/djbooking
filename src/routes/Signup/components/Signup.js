import React, {Component} from 'react'
import SignUpForm from './SignUpForm'
import vinyl from '../../../assets/Vinyl.svg'
import krIcon from '../../../assets/money.svg'
import Footer from '../../../components/common/Footer'
/*animation stuff*/
import QueueAnim from 'rc-queue-anim';
import { localize } from 'react-localize-redux';

class Signup extends Component{
  themeColor="#B031FF"
  secondColor="#31DAFF"

  state={
    reference: null
  }

  componentDidMount(){
    const query = new URLSearchParams(window.location.search)
      const reference = query.get('referredBy')
    console.log(reference) // "a-value"
     this.setState({
          reference: reference
      })
  }

  render() {
    const {translate} = this.props;

    return  <div >
      <header className=""

      >
      <div id="stripes">
        <span/>
        <span/>
        <span className="white"/>
        <span/>
      </div>
      <div className="container">
      <div className="row center-xs"> 
        <div className="col-xs-12">
            <h1 className="Header-title common-PageTitle">
              {translate('signup.title')}
               <span className="Header-subTitle common-PageSubtitle">
               {translate('signup.description')}
              
               </span>
              </h1>
             
        </div>
        </div>
        </div>
      <div className="container">
        <div className="info-boxes">

 
        <div className="row">
        <QueueAnim type="top">
          <div key="cardA">
          <div  className="col-sm-6 col-md-5 col-md-push-1">
            <div className="card">
              <img src={krIcon} alt="Money icon"/>
              <h2 style={{color:"rgb(176, 49, 255)"}}>
              {translate('signup.sections.left.header')}
              </h2>
              <p style={{color:"#32325D"}}>
              {translate('signup.sections.left.content')}
              </p>
            </div>
          </div>
        </div>
        <div key="cardB">
        <div  className="col-sm-6 col-md-5 col-md-push-1">
          <div className="card">
            <img src={vinyl} alt="vinyl icon"/>
            <h2 style={{color:"rgb(176, 49, 255)"}}>
            {translate('signup.sections.right.header')}
            </h2>
            <p style={{color:"#32325D"}}>
            
            {translate('signup.sections.right.content')}
              
            </p>
          </div>
        </div>
        </div>
      </QueueAnim>
        </div>
      </div>
   </div>

    </header>
    <div className="container"  style={{marginTop: "80px", marginBottom: "80px"}}>
      <div className="signup">
        <SignUpForm
          translate={translate}
          reference={this.state.reference}
        />
      </div>
    </div>
      <Footer
          noSkew
          color={this.themeColor}
          firstTo={translate("routes./how-it-works")}
          secondTo={translate("routes./")}
          firstLabel={translate("how-it-works")}
          secondLabel={translate("arrange-event")}
          title={translate("Wonder how it works?")}
          subTitle={translate("See how it works, or arrange an event.")}
        />
    </div>
  }
}

export default localize(Signup, 'locale')