import React, {Component} from 'react';
import  Profile  from "./components/Profile";
import { Helmet } from 'react-helmet';

export default class Index extends Component{


  render(){
    console.log(this.props)
    const djName = this.props.match.params.permalink;
    const title = djName + " | Profile"

    return(
      <React.Fragment>
      <Helmet>
        <title>{title}</title>
        <meta name="og:title"           content={title} />
        <meta name="twitter:title"      content={title} />
      </Helmet>
    <Profile {...this.props} />
    </React.Fragment>

  )}
}