import React from 'react';
import PreFooter from '../blocks/PreFooter'
import Particles from 'react-particles-js';
import PConfig from '../../assets/particlesjs-config.json';
import PConfig1 from '../../assets/particlesjs-config-1.json';
import PConfig2 from '../../assets/particlesjs-config-2.json';
import PConfig3 from '../../assets/particlesjs-config-3.json';
import PConfig4 from '../../assets/particlesjs-config-4.json';
import PConfig5 from '../../assets/particlesjs-config-5.json';

/*animation stuff*/
import ScrollAnim from 'rc-scroll-anim';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';

const ScrollOverPack = ScrollAnim.OverPack;


export default React.createClass({
  themeColor:"#31DAFF",

  componentDidMount(){

  },

  render() {
    return (
      <div>
        <header className=""

        >
        <div id="stripes">
          <span/>
          <span/>
          <span/>
          <span/>
        </div>
        <div className="container">
        <TweenOne className="tween-one" key="0" style={{opacity: 0}} animation={{ opacity: 1 }}>
          <div style={{position: "absolute"}}>
            <Particles params={PConfig} width="300px" height="300px"/>
          </div>
        </TweenOne>

          <div className="col-md-7 col-md-push-4" style={{top:"50px"}}>
            <QueueAnim key="1">
            <h1 key="title">How it works</h1>
            <p key="paragraph">Stripe is the best software platform for running an internet
            business. We handle billions of dollars every ythinking businesses around the world. thinking businesses around the world.thinking businesses around the world.ear for forward-
            thinking businesses around the world.
            </p>
          </QueueAnim>
          </div>

        </div>
      </header>
      <div style={{position:"relative"}} >
        <div className="particles-bg" />
        <div className="container">
          <div id="particles">
            <Particles params={PConfig1} width="270px" height="270px"/>
            <Particles params={PConfig2} width="310px" height="310px"/>
            <Particles params={PConfig3} width="350px" height="350px"/>
            <Particles params={PConfig4} width="390px" height="390px"/>
            <Particles params={PConfig5} width="430px" height="430px"/>
          </div>
          <div className="how-it-works" >
            <section>
          <div>
            <div>
            <div key="a" className="how-to-title">
              <div className="circle">1</div>
              <h2>Organizer creates event</h2>
            </div>
            <p key="b">Stripe builds the most powerful and flexible tools for internet commerce. Whether you’re creating a subscription service, an on-demand marketplace, an e-commerce store, or a crowdfunding platform, Stripe’s meticulously-designed APIs and unmatched functionality help you create the best possible product for your users. Hundreds of thousands of the world’s </p>
            </div>
          </div>
          </section>
            <section>
              <ScrollOverPack id="page1" className="page1" hideProps={{ 0: { reverse: true } }}>
              <QueueAnim key="2">
              <div key="a" className="how-to-title">
                <div className="circle">2</div>
                <h2>Qualified DJs return offer</h2>
              </div>
              <p key="b">Stripe builds the most powerful and flexible tools for internet commerce. Whether you’re creating a subscription service, an on-demand marketplace, an e-commerce store, or a crowdfunding platform, Stripe’s meticulously-designed APIs and unmatched functionality help you create the best possible product for your users. Hundreds of thousands of the world’s </p>
              </QueueAnim>
            </ScrollOverPack>
          </section>
            <section>
              <ScrollOverPack id="page1" className="page1" hideProps={{ 0: { reverse: true } }}>
              <QueueAnim key="3">
              <div key="a" className="how-to-title">
                <div className="circle">3</div>
                <h2>Organizer confirms an offer</h2>
              </div>
              <p key="b">Stripe builds the most powerful and flexible tools for internet commerce. Whether you’re creating a subscription service, an on-demand marketplace, an e-commerce store, or a crowdfunding platform, Stripe’s meticulously-designed APIs and unmatched functionality help you create the best possible product for your users. Hundreds of thousands of the world’s </p>
              </QueueAnim>
            </ScrollOverPack>
          </section>
            <section>
              <ScrollOverPack id="page1" className="page1" hideProps={{ 0: { reverse: true } }}>
              <QueueAnim key="4">
              <div key="a" className="how-to-title">
                <div className="circle">4</div>
                <h2>DJ plays at event</h2>
              </div>
              <p key="b">Stripe builds the most powerful and flexible tools for internet commerce. Whether you’re creating a subscription service, an on-demand marketplace, an e-commerce store, or a crowdfunding platform, Stripe’s meticulously-designed APIs and unmatched functionality help you create the best possible product for your users. Hundreds of thousands of the world’s </p>
              </QueueAnim>
            </ScrollOverPack>
          </section>
            <section>
              <ScrollOverPack id="page1" className="page1" hideProps={{ 0: { reverse: true } }}>
              <QueueAnim key="5">
              <div key="a" className="how-to-title">
                <div className="circle">5</div>
                <h2>Payout is released</h2>
              </div>
              <p key="b">Stripe builds the most powerful and flexible tools for internet commerce. Whether you’re creating a subscription service, an on-demand marketplace, an e-commerce store, or a crowdfunding platform, Stripe’s meticulously-designed APIs and unmatched functionality help you create the best possible product for your users. Hundreds of thousands of the world’s </p>
              </QueueAnim>
            </ScrollOverPack>
          </section>
          </div>
        </div>
      </div>
      <PreFooter
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
