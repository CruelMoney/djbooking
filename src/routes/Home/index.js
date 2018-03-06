import React, { Component } from 'react';
import Home from './components/Home'; 
import content from './content.json';
import addTranslate from '../../components/higher-order/addTranslate';

class Index extends Component{
  render(){
    return(
      <Home 
       {...this.props}
      />
    )
  }
};


export default addTranslate(Index, content);
