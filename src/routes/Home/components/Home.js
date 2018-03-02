import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Footer from '../../../components/common/Footer'
import MediaQuery from 'react-responsive';
//import scrollIntoView from 'smoothscroll-polyfill'
import Button from '../../../components/common/Button-v2'
import padlock from '../../../assets/padlock.svg'
import note from '../../../assets/note.svg'
import DJCards from './djCards'
import Loadable from 'react-loadable';
import LoadingRequestForm from '../../../components/common/RequestForm/LoadingRequestForm';
import RequestForm from '../../../components/common/RequestForm/RequestForm';



class Home extends Component{
  themeColor = "#25F4D2"
  secondColor = "#31DAFF"

  getChildContext() {
    return {
      color: this.themeColor
    }
  }

  componentDidMount(){
   // scrollIntoView.polyfill()
  }

requestForm = null

handleButtonClick = () => {
 window.scroll({
  top: this.requestForm.offsetTop-20,
  left: 0,
  behavior: 'smooth'
});
}

  render() {
    const { translate } = this.props;

    return (
      <div>
        <header>
          <div id="stripes" className="v1">
            <span></span>

          </div>
          <div className="container">

            <div className="row">
              <div className="col-md-5">
                  <h1 key="title">{ translate('home.title') }</h1>
                  <p key="paragraph">
                    { translate('home.introduction') }
                  </p>

                  <div style={{float:"left", marginTop:"20px"}}>
                    <Button
                      color="white"
                      className="white elevated"
                      onClick={this.handleButtonClick}>
                      <div style={{width:"150px", color:this.themeColor}}>
                      { translate('get-offers') }
                      </div>
                    </Button>
                  </div>
               
              </div>
              <MediaQuery query="(min-width: 992px)">
                <div className=" col-md-8">
                    <DJCards 
                     { ...translate(['copenhagen', 'denmark']) }
                    />
                </div>
              </MediaQuery>
            </div>

          </div>

        </header>


          <div className="container request-form-wrapper">
            <div ref={(f) => this.requestForm = f}></div>
            <RequestForm />
          </div>

          <div className="info-boxes grey">
            <div className="container">
              <div className="row">
                      <div  className="col-sm-6 col-md-5 col-md-push-1">
                        <div className="card">
                          <img suppressHydrationWarning={true} src={padlock} alt="icon"/>
                      <h2 style={{color:this.themeColor}}>
                      { translate('home.sections.left.title') }
                      </h2>
                      <p>
                      { translate('home.sections.left.content') }
                      </p>
                    </div>
                </div>
                <div  className="col-sm-6 col-md-5 col-md-push-1">
                  <div className="card">
                    <img suppressHydrationWarning={true} src={note} alt="icon"/>
                    <h2 style={{color:this.themeColor}}>
                    { translate('home.sections.right.title') }
                    </h2>
                    <p>
                    { translate('home.sections.right.content') }
                    </p>
                  </div>
                </div>
                </div>
              </div>
              </div>

              <Footer
                bgColor="#FFFFFF"
                color={this.secondColor}
                firstTo={translate("routes./signup")}
                secondTo={translate("routes./how-it-works")}
                firstLabel={translate("become-dj")}
                secondLabel={translate("how-it-works")}
                title={translate("home.footer.first")}
                subTitle={translate("home.footer.second")}
                />

            </div>

    )
  }
}

Home.childContextTypes = {
  color: PropTypes.string,
}

export default Home
