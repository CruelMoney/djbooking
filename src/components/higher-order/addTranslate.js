import React, { Component } from 'react';
import { addTranslation, getTranslate } from 'react-localize-redux';
import { connect } from 'react-redux';

const addTranslate = (Wrappee, content) => {
  class Index extends Component{
    componentWillMount(){
      this.props.initLocale();
    }
  
    render(){
      return(
        <Wrappee 
         {...this.props}
        />
      )
    }
  };

  const mapStateToProps = state => {
    return{
      translate: getTranslate(state.locale)
    }
  }

  const mapDispatchToProps = dispatch => {
    return{
      initLocale: () => dispatch(addTranslation(content))
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(Index)


}


export default addTranslate;