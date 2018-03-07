import React, {Component} from 'react';
import  Preferences  from "./components/Preferences";
import Helmet from 'react-helmet-async'
import { localize } from 'react-localize-redux'; 

class Index extends Component{
  render(){
    const {translate} = this.props;
    const djName = this.props.profile.firstName;
    const title = djName + " | " + translate("preferences")

    return(
      <div>
      <Helmet>
        <title>{title}</title>
        <meta property="og:title"           content={title} />
        <meta name="twitter:title"      content={title} />
      </Helmet>
    <Preferences {...this.props} />
    </div>
  )}
}

export default localize(Index, 'locale');
