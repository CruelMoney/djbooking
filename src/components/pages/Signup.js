import React from 'react'
import SignUpForm from '../../containers/SignupForm'
import { Link } from 'react-router';
import vinyl from '../../assets/Vinyl.svg'
import krIcon from '../../assets/money.svg'
import Footer from '../blocks/Footer'
/*animation stuff*/
import ScrollAnim from 'rc-scroll-anim';
import QueueAnim from 'rc-queue-anim';

export default React.createClass({
  themeColor:"#B031FF",
  secondColor:"#31DAFF",


  render() {
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
        <div className="row">
        <QueueAnim type="top">
          <div key="cardA">
          <div  className="col-md-6">
            <div className="card glass">
              <img src={krIcon} alt="Money icon"/>
              <h2>Membership free of charge</h2>
              <p>
                Stripe builds the most powerful and flexible tools for internet commerce. Whether you’re creating a subscription service, an on-demand marketplace, an e-commerce store, or a crowdfunding platform, Stripe’s meticulously-designed APIs and unmatched functionality help you create the best possible product for your users. Hundreds of thousands of the world’s
              </p>
            </div>
          </div>
        </div>
        <div key="cardB">
        <div  className="col-md-6">
          <div className="card glass">
            <img src={vinyl} alt="vinyl icon"/>
            <h2>Get the gigs you want to play</h2>
            <p>
              Stripe builds the most powerful and flexible tools for internet commerce. Whether you’re creating a subscription service, an on-demand marketplace, an e-commerce store, or a crowdfunding platform, Stripe’s meticulously-designed APIs and unmatched functionality help you create the best possible product for your users. Hundreds of thousands of the world’s
            </p>
          </div>
        </div>
        </div>
      </QueueAnim>
        </div>
      </div>

    </header>
    <div className="container">
      <div className="card elevate signup">
        <SignUpForm/>
      </div>
    </div>
      <Footer
        color={this.themeColor}
        firstTo="/"
        secondTo="/signup"
        firstLabel="Arrange event"
        secondLabel="Become DJ"
        title="Wonder how it works?"
        subTitle="See how it works, or arrange an event."
        />
    </div>
  }
})
