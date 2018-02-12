import React, {Component, Fragment} from 'react';
import {
  Switch, 
  Route
} from 'react-router';
import { Helmet } from 'react-helmet';
import Footer from '../../components/common/Footer'
import Blog from './components/Blog';
import Post from './components/Post';
import './index.css';

export default class Index extends Component{
  themeColor = "#25F4D2"
  secondColor = "#31DAFF"
  
  render(){
    const title = "Blog | Cueup"
    return(
    <div className="blog">
      <Helmet>
        <title>{title}</title>
        <meta property="og:title"           content={title} />
        <meta name="twitter:title"      content={title} />
      </Helmet>
      <Switch>
        <Route 
        exact path={`/blog`} 
        component={Blog} 
        />
        <Route path={`/blog/:postTitle`} component={Post} />
      </Switch>
      <Footer
        color={this.themeColor}
        firstTo="/"
        secondTo="/signup"
        firstLabel="Arrange event"
        secondLabel="Become DJ"
        title="Ready to get started?"
        subTitle="Arrange an event, or apply to become a DJ."
        />
    </div>
  )}
}
