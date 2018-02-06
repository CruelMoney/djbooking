import {DJs} from '../../../../constants/constants';
import shuffle from 'lodash.shuffle'
import DJCard from '../../../../components/common/DJCard';
import React, { Component } from 'react';
import './index.css';

class FloatingCards extends Component {
  render() {
    let { location } = this.props;
    location = !!location ? location : 'notfound';

    let renderDJS = 
      shuffle(
        DJs.filter(dj => dj.location.toLowerCase().indexOf(location.toLowerCase()) !== -1)
      );
      
    renderDJS = renderDJS.length > 8 ? renderDJS.slice(0,8) : renderDJS;

    const count = renderDJS.length;
    const animationDuration = count*6;
    const animationDelay = animationDuration/count;

    return (
      <div className="floating-cards-wrapper">
        <div 
        className="floating-cards"
        data-count={count}
        style={{width:((count)*334 + 'px')}}>
        {renderDJS.map((dj, idx) => {
          return(
            <div 
              key={`dj-card-${idx}`}
              style={{
                animationDuration: (animationDuration+'s'),
                animationDelay: '-'+(idx+1)*animationDelay+'s'}}
              className="card-wrapper">
              <DJCard dj={dj} />
            </div>
            )
          })}
        </div>
      </div>

    );
  }
}

export default FloatingCards;