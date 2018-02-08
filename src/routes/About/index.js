import React, {Component} from 'react';
import About from './components/About'; 
import { Helmet } from 'react-helmet';

export default class Index extends Component{
  render(){
    return(
    <div>
      <Helmet>
        <title>About | Cueup</title>
        <meta property="og:title"           content="About | Cueup" />
        <meta name="twitter:title"      content="About | Cueup" />
      </Helmet>
      <About />
    </div>
  )}
}
