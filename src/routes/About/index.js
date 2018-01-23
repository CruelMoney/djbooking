import React, {Component} from 'react';
import About from './components/About'; 
import { Helmet } from 'react-helmet';

export default class Index extends Component{
  render(){
    return(
    <React.Fragment>
      <Helmet>
        <title>About | Cueup</title>
        <meta name="og:title"           content="About | Cueup" />
        <meta name="twitter:title"      content="About | Cueup" />
      </Helmet>
      <About />
    </React.Fragment>
  )}
}
