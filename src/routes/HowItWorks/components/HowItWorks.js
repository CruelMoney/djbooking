import React, {Component} from 'react';
import Footer from '../../../components/common/Footer'
import Particles from 'react-particles-js';
import PConfig from '../../../assets/particlesjs-config.json';
import PConfig1 from '../../../assets/particlesjs-config-1.json';
import PConfig2 from '../../../assets/particlesjs-config-2.json';
import PConfig3 from '../../../assets/particlesjs-config-3.json';
import PConfig4 from '../../../assets/particlesjs-config-4.json';
import PConfig5 from '../../../assets/particlesjs-config-5.json';
import padlock from '../../../assets/padlock.svg'
import note from '../../../assets/note.svg'



export default class Index extends Component{
  themeColor = "#31DAFF"

  render() {
    const { translate } = this.props;

    return (
      <div>
        <header className="">
          <div id="stripes">
            <span key="a"/>
            <span key="b"/>
            <span key="c"/>
            <span key="d"/>
          </div>
          <div className="container">
            <div className="row">
            <div className="col-sm-5 col-md-4 col-md-push-6 col-sm-push-5">
                <h1 key="title">{translate('how-it-works.title')}</h1>
                <p key="paragraph">
                {translate('how-it-works.introduction')}
                </p>
            </div>
              <div className="col-md-4 col-md-pull-3 col-sm-4 col-sm-pull-4 particles">
                <Particles params={PConfig} width="100%" height="300px"/>
              </div>
            </div>
             

           

          </div>
        </header>
        <div  className="how-it-works-wrapper" style={{position:"relative"}} >
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
                      <h2>
                        {translate('how-it-works.process.1.h')}
                      </h2>
                    </div>
                    <p key="b">
                    {translate('how-it-works.process.1.p')}
                    </p>
                  </div>
                </div>
              </section>
              <section>
                    <div key="a" className="how-to-title">
                      <div className="circle">2</div>
                      <h2>{translate('how-it-works.process.2.h')}</h2>
                    </div>
                    <p key="b">
                    {translate('how-it-works.process.2.p')}
                    </p>
              </section>
              <section>
                    <div key="a" className="how-to-title">
                      <div className="circle">3</div>
                      <h2>{translate('how-it-works.process.3.h')}</h2>
                    </div>
                    <p key="b">{translate('how-it-works.process.3.p')}</p>
              </section>
              <section>
                    <div key="a" className="how-to-title">
                      <div className="circle">4</div>
                      <h2>{translate('how-it-works.process.4.h')}</h2>
                    </div>
                    <p key="b">{translate('how-it-works.process.4.p')}</p> 
             </section>
              <section>

                    <div key="a" className="how-to-title">
                      <div className="circle">5</div>
                      <h2>{translate('how-it-works.process.5.h')}</h2>
                    </div>
                    <p key="b">
                        {translate('how-it-works.process.5.p')}
                      </p>

              </section>
          </div>
        </div>
      </div>
      <div className="info-boxes">
            <div className="container">
            <div className="row">
                      <div  className="col-sm-6 col-md-5 col-md-push-1">
                        <div className="card">
                          <img suppressHydrationWarning={true} src={padlock} alt="icon"/>
                      <h2 style={{color:this.themeColor}}>
                      { translate('how-it-works.sections.left.title') }
                      </h2>
                      <p>
                      { translate('how-it-works.sections.left.content') }
                      </p>
                    </div>
                </div>
                <div  className="col-sm-6 col-md-5 col-md-push-1">
                  <div className="card">
                    <img suppressHydrationWarning={true} src={note} alt="icon"/>
                    <h2 style={{color:this.themeColor}}>
                    { translate('how-it-works.sections.right.title') }
                    </h2>
                    <p>
                    { translate('how-it-works.sections.right.content') }
                    </p>
                  </div>
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
