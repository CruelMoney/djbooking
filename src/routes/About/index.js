import React, {Component} from 'react';
import About from './components/About'; 
import { Helmet } from 'react-helmet';
import { localize } from 'react-localize-redux'; 

class Index extends Component{
  render(){
    const { translate } = this.props;
    const title = translate('about') + ' | Cueup';

    return(
    <div>
      <Helmet>
        <title>{title}</title>
        <meta property="og:title"     content={title} />
        <meta name="twitter:title"    content={title} />
      </Helmet>
      <About />
    </div>
  )}
}

export default localize(Index, 'locale');