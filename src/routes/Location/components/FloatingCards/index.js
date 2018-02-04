import {DJs} from '../../../../constants/constants';
import shuffle from 'lodash.shuffle'
import DJCard from '../../../../components/common/DJCard';
import React, { Component } from 'react';
import './index.css';

class FloatingCards extends Component {
  render() {
    let { location } = this.props;
    location = !!location ? location : 'notfound';

    const renderDJS = 
      shuffle(DJs)
      .filter(dj => dj.location.toLowerCase().indexOf(location.toLowerCase()) !== -1);

    return (
      <div className="floating-cards-wrapper">
        <div className="floating-cards">
        {renderDJS.map((dj, idx) => {
          return(
            <div 
              dataDJName={dj.name} 
              key={`dj-card-${idx}`} 
              className="card-wrapper">
              <DJCard dj={dj} />
            </div>)
          })}
        </div>
      </div>

    );
  }
}

export default FloatingCards;