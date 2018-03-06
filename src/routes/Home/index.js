import React from 'react';
import Home from './components/Home'; 
import { addTranslation, localize } from 'react-localize-redux';
import content from './content.json';
import {store} from '../../store';

store.dispatch(addTranslation(content));

const Index = (props) => {
    return(
      <Home 
       {...props}
      />
    )
};

export default localize(Index, 'locale')
