import {DJs} from '../../../../constants/constants';
import shuffle from 'lodash.shuffle'
import DJCard from '../../../../components/common/DJCard';
import React, { Component } from 'react';
import './index.css';

class FloatingCards extends Component {
  state={
    djs : [],
    scrollAnimate : false
  }

  filterDjs = (location) => {
    location = !!location ? location : 'notfound';

    let renderDJS = 
    shuffle(
      DJs.filter(dj => dj.location.toLowerCase().indexOf(location.toLowerCase()) !== -1)
    );

    renderDJS = renderDJS.length > 2 ? renderDJS : [];
    
    this.setState({
      djs: renderDJS,
      scrollAnimate: false
    });
  }

  componentWillMount(){
    let { location } = this.props;
    this.filterDjs(location);
  }

  componentWillReceiveProps(nextProps){
    let { location } = this.props;

    if(location !== nextProps.location){
      this.filterDjs(nextProps.location);
    }
  }

  startScroll = (count) => {
    const animationTime = count * 5;
    this.setState({
      scrollAnimate: animationTime
    });
   }

  render() {
    const { djs, scrollAnimate } = this.state;
    const count = djs.length;
    const renderDJs = scrollAnimate ? [...djs, ...djs] : djs;

    return (
      <div className="floating-cards-wrapper">
        <div
        ref={r=>{
            if(!!r && !scrollAnimate && typeof window !== 'undefined'){

              const cardsWidth = parseInt((window.getComputedStyle(r).width), 10);

              if(cardsWidth >= window.innerWidth){
                this.startScroll(count, cardsWidth);
              }
            }
          }}
        style={{
          animationName: !!scrollAnimate ? 'marquee' : null,
          animationDuration: scrollAnimate + 's',
        }}
        className="floating-cards"
        data-count={count}
        >
        {
          renderDJs.map((dj, idx) => {
          return(
            <div 
              key={`dj-card-${idx}`}
              className="card-wrapper"
              >
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