import React, {Component} from 'react';
import HowItWorks from './components/HowItWorks'; 
import { Helmet } from 'react-helmet-async';

import content from './content.json';
import addTranslate from '../../components/higher-order/addTranslate';

class Index extends Component{
  render(){
    const {translate} = this.props;
    const title = translate("how-it-works") + " | Cueup"
    return(
      <div>
      <Helmet>
        <title>{title}</title>
        <meta property="og:title"       content={title} />
        <meta name="twitter:title"      content={title} />
      </Helmet>
      <HowItWorks translate={translate} />
    </div>
  )}
}

export default addTranslate(Index, content);