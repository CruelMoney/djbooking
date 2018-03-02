import React, {Component} from 'react';
import {
  Switch, 
  Route
} from 'react-router';
import { Helmet } from 'react-helmet';
import Footer from '../../components/common/Footer'
import Blog from './components/Blog';
import Post from './components/Post';
import { localize,addTranslation } from 'react-localize-redux';
import content from './content.json';
import {store} from '../../store';
import './index.css';

store.dispatch(addTranslation(content));

class Index extends Component{
  themeColor = "#25F4D2"
  secondColor = "#31DAFF"
  
  render(){
    const {match, translate} = this.props
    const title = "Blog | Cueup";
    return(
    <div className="blog">
      <Helmet>
        <title>{title}</title>
        <meta property="og:title"           content={title} />
        <meta name="twitter:title"      content={title} />
        <meta property="og:site_name" content="Cueup Blog" />
      </Helmet>
      <Switch>
        <Route 
        exact path={match.path} 
        component={Blog} 
        />
        <Route path={`${match.path}/:postTitle`} component={Post} />
      </Switch>
      <Footer
          color={this.themeColor}
          firstTo={translate("routes./")}
          secondTo={translate("routes./signup")}
          firstLabel={translate("arrange-event")}
          secondLabel={translate("become-dj")}
          title={translate("ready-to-get-started")}
          subTitle={translate("arrange-event-or-become-dj")}
        />
    </div>
  )}
}

export default localize(Index, "locale");