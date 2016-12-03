import React, {PropTypes} from 'react'
import { Link } from 'react-router';

/*animation stuff*/
import QueueAnim from 'rc-queue-anim';
import ScrollAnim from 'rc-scroll-anim';
const ScrollOverPack = ScrollAnim.OverPack;

export default React.createClass({
  PropTypes:{
    color: PropTypes.string,
    firstTo: PropTypes.string,
    secondTo: PropTypes.string,
    firstLabel: PropTypes.string,
    secondLabel: PropTypes.string,
    title: PropTypes.string,
    subTitle:PropTypes.string
  },

  getDefaultProps(){
    return{
      color:"#31DAFF",
    }
  },

  render() {
    return <div id="preFooter">
          <div className="container">
            <div className="row">
            <ScrollOverPack id="footerScroll" style={{marginTop:"-250px", width:"100%"}} hideProps={{ 0: { reverse: true } }}>
            <QueueAnim key="1" style={{
              paddingTop: "250px",
              marginBottom: "-90px",
              display: "flex", alignItem:"center"}}>
            <div key="preFooterText" className="action-title col-md-7">
            <QueueAnim key="2">
              <span key="preFooterTitle" style={{color:this.props.color}}>{this.props.title}</span>
              {this.props.subTitle}
            </QueueAnim>
            </div>
            <div key="preFooterButtons" className="col-md-5 action-buttons">
              <Link style={{background:this.props.color, color:"#FFFFFF"}} className="button" to={this.props.firstTo}>{this.props.firstLabel}</Link>
              <Link style={{background:"#FFFFFF", color:this.props.color}} className="button" to={this.props.secondTo}>{this.props.secondLabel}</Link>
            </div>
            </QueueAnim>
            </ScrollOverPack>
            </div>
          </div>
        </div>
  }
})
