import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Footer from '../../components/common/Footer'
import Button from '../../components/common/Button-v2'
import MoneyIcon from '../../components/graphics/Money';
import NoteIcon from '../../components/graphics/Note';
import Loadable from 'react-loadable';
import LoadingRequestForm from '../../components/common/RequestForm/LoadingRequestForm';
import Map from '../../components/common/Map';
import CitySvg from '../../components/graphics/City';
import { Redirect } from 'react-router';
import FloatingDJs from './components/FloatingCards';
import { Helmet } from 'react-helmet';
import copenhagen from '../../assets/images/cities/copenhagen.png';
import odense from '../../assets/images/cities/odense.png'
import aarhus from '../../assets/images/cities/aarhus.png'
import defaultImage from '../../assets/images/cities/default.png';
import content from './content.json';
import addTranslate from '../../components/higher-order/addTranslate';
import './index.css';

const AsyncRequestForm = Loadable({
  loader: () => import('../../components/common/RequestForm/RequestForm'),
  loading: LoadingRequestForm
});

const locations = {
  denmark: {
    name: 'Denmark',
    image: defaultImage,
    coordinates: {
      lat: 56.35211531,
      lng: 11.01690928
    },
    cities: {
      copenhagen : {
        name: 'Copenhagen',
        image: copenhagen,
        coordinates: {
          lat: 55.6760968,
          lng: 12.5683372
        }
      }, 
      odense: {
        name: 'Odense',
        image: odense,
        coordinates: {
          lat: 55.403756,
          lng: 10.40237
        }
      }, 
      aarhus: {
        name: 'Århus',
        image: aarhus,
        coordinates: {
          lat: 56.162939,
          lng: 10.203921
        }
      }, 
    },
  },
  danmark: {
    name: 'Danmark',
    image: defaultImage,
    coordinates: {
      lat: 56.35211531,
      lng: 11.01690928
    },
    cities: {
      koebenhavn : {
        name: 'København',
        image: copenhagen,
        coordinates: {
          lat: 55.6760968,
          lng: 12.5683372
        }
      }, 
      odense: {
        name: 'Odense',
        image: odense,
        coordinates: {
          lat: 55.403756,
          lng: 10.40237
        }
      }, 
      aarhus: {
        name: 'Århus',
        image: aarhus,
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
    const { match, translate } = this.props;
    const { isMobile } = this.state;
    const { city, country } = match.params;
    const location = !!city 
    ? (!!locations[country] ? locations[country].cities[city] : null)
    : locations[country];
    
    // Redirect
    if(!location){
      return <Redirect to={translate("routes./not-found")}/>
    }

    let title = location.name;
    const radius = !!city ? 25000 : (isMobile ? 200000 : 100000);
    const { coordinates } = location;


    const siteDescription = translate('location.description', {location:title});
    const siteTitle = translate('location.title', {location:title});
    return (
      <div className="locations-page">
        
        <Helmet>
          <title>{siteTitle + " | Cueup"}</title>
          <meta name="description"                content={siteDescription} />

          <meta property="og:title"               content={siteTitle + " | Cueup"} />
          <meta property="og:type"                content={'website'} />
          <meta property="og:description"         content={siteDescription} />
          <meta property="og:image"               content={location.image} />

          <meta name="twitter:title"              content={siteTitle + " | Cueup"} />
          <meta name="twitter:description"        content={siteDescription} />
          <meta name="twitter:image"              content={location.image} />

          <meta name="geo.position"               content={`${location.coordinates.lat}; ${location.coordinates.lng}`} />
          <meta name="geo.placename"              content={title} />
          <meta name="geo.region"                 content={title} />
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
                    {translate('location.title-2', {location:title})}
                    </h1>
                    <p key="paragraph">
                      {siteDescription}
                    </p>

                    <div style={{float:"left", marginTop:"20px"}}>
                      <Button
                        active
                        onClick={this.handleButtonClick}>
                        <div style={{width:"150px", color:this.themeColor}}>
                        {translate("get-offers")}
                        </div>
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
                    {siteDescription}
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
            { ...translate(['copenhagen', 'denmark']) }
            location={title}
          />

          
          <div className="info-boxes grey">
            <div className="container">
              <div className="row">
                      <div  className="col-sm-6 col-md-5 col-md-push-1">
                      <div className="card">
                      <NoteIcon  altGradient={false} />
                    <h2 style={{color:this.themeColor}}>{translate("location.sections.left.header")}</h2>
                    <p>
                    {translate("location.sections.left.content", {location: title})}
                    </p>
                  </div>
                </div>
                <div  className="col-sm-6 col-md-5 col-md-push-1"> 
                <div className="card">
                      <MoneyIcon  altGradient={false} />
                      <h2 style={{color:this.themeColor}}>{translate("location.sections.right.header")}</h2>
                      <p>
                      {translate("location.sections.right.content", {location: title})}
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
                title={translate("are-you-a-dj-in-:location", {location: title})}
                subTitle={translate("apply-to-become-dj-or-see-how-it-works")}
                />

            </div>

    )
  }
}

Location.childContextTypes = {
  color: PropTypes.string,
}



export default addTranslate(Location, content);
