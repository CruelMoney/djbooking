import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Footer from '../../components/common/Footer'
import Button from '../../components/common/Button-v2'
import padlock from '../../assets/padlock.svg'
import note from '../../assets/note.svg'
import DJCard from '../../components/common/DJCard';
import Loadable from 'react-loadable';
import LoadingRequestForm from '../../components/common/RequestForm/LoadingRequestForm';
import Map from '../../components/common/Map';
import CitySvg from '../../components/graphics/City';
import { Redirect } from 'react-router';
import FloatingDJs from './components/FloatingCards';
import { Helmet } from 'react-helmet';
import './index.css';

const AsyncRequestForm = Loadable({
  loader: () => import('../../components/common/RequestForm/RequestForm'),
  loading: LoadingRequestForm
});

const locationParagraph = "Cueup is the easiest way for you to get a great DJ for your event. Just fill out the form below, and soon you will receive non-binding offers from qualified DJs.";


const locations = {
  denmark: {
    name: 'Denmark',
    coordinates: {
      lat: 56.35211531,
      lng: 11.01690928
    },
    cities: {
      copenhagen : {
        name: 'Copenhagen',
        coordinates: {
          lat: 55.6760968,
          lng: 12.5683372
        }
      }, 
      odense: {
        name: 'Odense',
        coordinates: {
          lat: 55.403756,
          lng: 10.40237
        }
      }, 
      aarhus: {
        name: 'Århus',
        coordinates: {
          lat: 56.162939,
          lng: 10.203921
        }
      }, 
    },
  }
}

class Location extends Component{
  secondColor = "#25F4D2"
  themeColor = "#31DAFF"
  requestForm = null

  state={
    headerHeight: 600
  }

  getChildContext() {
    return {
      color: this.themeColor
    }
  }

  handleButtonClick = () => {
  window.scroll({
    top: this.requestForm.offsetTop-20,
    left: 0,
    behavior: 'smooth'
  });
  }

  componentDidMount(){
    const isMobile = window.innerWidth <= 768;
    this.setState({
      isMobile
    });
  }

  render() {
    const { match } = this.props;
    const { isMobile } = this.state;
    const { city, country } = match.params;
    const location = !!city 
    ? (!!locations[country] ? locations[country].cities[city] : null)
    : locations[country];
    
    // Redirect
    if(!location){
      return <Redirect to="/not-found"/>
    }

    let title = location.name;
    const radius = !!city ? 25000 : (isMobile ? 200000 : 100000);
    const { coordinates } = location;


    const siteDescription = locationParagraph.replace("{{location}}", title);
    const siteTitle = `Book DJ in ${title} | Cueup`;
    return (
      <div className="locations-page">
        
        <Helmet>
          <title>{siteTitle}</title>
          <meta name="og:title" content={siteTitle} />
          <meta name="og:type" content={'website'} />
          <meta name="description" content={siteDescription} />
          <meta name="og:description" content={siteDescription} />
          <meta name="og:image" content={""} />
        </Helmet>

        <div className="span-wrapper">
        
        <header>
          <Map
            key={title}
            noCircle={!city}
            hideRoads={true}
            radius={radius}
            defaultCenter={{
              lat: coordinates.lat + (isMobile ? 0 : 0.05),
              lng: coordinates.lng - (isMobile ? 0 : (!!city ? 0.5 : 2))
            }}
            height={isMobile ? 700 : 600}
            value={coordinates}
            editable={false}
            themeColor={this.themeColor}
            radiusName="playingRadius"
            locationName="playingLocation"
            />
        
          <article>
            
            <div className="container fix-top-mobile">
              <div className="row">
                <div className="col-md-5 col-sm-6">
                <div className="card">
                    <h1 key="title">
                    Book DJ in
                    <span>{title}</span>
                    </h1>
                    <p key="paragraph">
                      {locationParagraph}
                    </p>

                    <div style={{float:"left", marginTop:"20px"}}>
                      <Button
                        active
                        onClick={this.handleButtonClick}>
                        <div style={{width:"150px", color:this.themeColor}}>GET OFFERS</div>
                      </Button>
                    </div>
                    </div>
                </div>
              </div>
            </div>
            <div className="show-tablet-down">
            <div className="container">
              <div className="row">
                <div className="col-xs-12">
                  <p key="paragraph">
                    {locationParagraph}
                  </p>
                </div>
              </div>
            </div>
            </div>
          </article>
            

        </header>


          <div className="container">
            <div ref={(f) => this.requestForm = f}></div>
            <AsyncRequestForm 
            initialCity={title}
            />
          </div>

          <CitySvg 
            id="city-illustration"
          />
          </div>
          
          <FloatingDJs 
            location={title}
          />

          
          <div className="info-boxes grey">
            <div className="container">
              <div className="row">
                      <div  className="col-sm-6 col-md-5 col-md-push-1">
                        <div className="card">
                          <img src={padlock} alt="icon"/>
                      <h2 style={{color:this.themeColor}}>Secured booking system</h2>
                      <p>
At Cueup the process of booking ensures that both the organizer and the DJ are protected from fraud. In case of a cancelation from either side, the money is instantly refunded. Otherwise the money is disbursed when the DJ has played at the event. In case of a cancelation by the DJ, we will try to find a new DJ as quickly as possible.</p>
                  </div>
                </div>
                <div  className="col-sm-6 col-md-5 col-md-push-1">
                  <div className="card">
                    <img src={note} alt="icon"/>
                    <h2 style={{color:this.themeColor}}>The most qualified DJs</h2>
                    <p>
At Cueup we focus on finding the most qualified DJs for your event - so you don’t have to. Don’t waste time searching for DJs when you can have offers from great DJs send directly to you.  Each offer shows the DJ, their reviews and rating so you can confidently choose a DJ you can trust.                     </p>
                  </div>
                </div>
                </div>
              </div>
              </div>

              <Footer
                bgColor="#FFFFFF"
                color={this.secondColor}
                firstTo="/signup"
                secondTo="/howitworks"
                firstLabel="Become DJ"
                secondLabel="How it works"
                title={`Are you a DJ in ${title}?`}
                subTitle={`Apply to become DJ or see how it works.`}
                />

            </div>

    )
  }
}

Location.childContextTypes = {
  color: PropTypes.string,
}


export default Location
