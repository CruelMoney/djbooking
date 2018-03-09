import React, {Component} from 'react';
import Signup from './components/Signup'; 
import Helmet from 'react-helmet-async';
import content from './content.json';
import addTranslate from '../../components/higher-order/addTranslate';

class Index extends Component{
  render(){
    const {translate} = this.props;
    const title = translate("apply-to-become-dj") + " | Cueup"
    return(
      <div>
      <Helmet>
        <title>{title}</title>
        <meta property="og:title"           content={title} />
        <meta name="twitter:title"      content={title} />
      </Helmet>
    <Signup translate={translate} />
    </div>
  )}
}

export default addTranslate(Index, content);