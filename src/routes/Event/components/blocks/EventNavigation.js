import React, { Component } from 'react'
import Navlink  from '../../../../components/common/Navlink'
import { getTranslate } from 'react-localize-redux';
import { connect } from 'react-redux'
import * as commonActions from '../../../../actions/Common'

class eventNavigation extends Component{

  componentWillMount(){
    this.registerNavigationItems()
  }

   componentWillUnmount(){
    this.removeNavigationItems()
  }

  registerNavigationItems = () => {
    const {translate, id, hash} = this.props;

    this.props.registerMenuItem(
      translate("Event information"), 
      translate("routes./event/:id/:hash/info",{
        id: id,
        hash: hash
      })
    );
    this.props.registerMenuItem(
      translate("DJ offers"), 
      translate("routes./event/:id/:hash/offers",{
        id: id,
        hash: hash
      })
    );
    if (this.props.isFinished && this.props.paid){
      this.props.registerMenuItem(
        translate("Review"), 
        translate("routes./event/:id/:hash/review",{
          id: id,
          hash: hash
        })
      );
    } else{
      this.props.registerMenuItem(
        translate("Contact information"), 
        translate("routes./event/:id/:hash/user",{
          id: id,
          hash: hash
        })
      );
    }
  }

  removeNavigationItems = () => {
    const {translate} = this.props;
    this.props.removeMenuItem(translate("Event information"));
    this.props.removeMenuItem(translate("DJ offers"));
    this.props.removeMenuItem(translate("Review"));
    this.props.removeMenuItem(translate("Contact information"));  
  }

  render() {
    const {translate, id, hash} = this.props;

    return (
      <div>

        <nav >
          <ul className="userNavigation"
            style={
              { listStyleType: 'none',
                padding: '0',
                marginBottom: '0px',
                display: 'flex',
                flexDirection: 'row',
                textTransform: 'uppercase',
                justifyContent: 'space-between'
              }}>


            <li>
              <Navlink 
              to={
                translate("routes./event/:id/:hash/info",{
                  id: id,
                  hash: hash
                })
              } 
              label={translate("Event information")}
              />
            </li>


            <li>
              <Navlink 
              to={translate("routes./event/:id/:hash/offers",{
                id: id,
                hash: hash
              })} 
              label={translate("DJ offers")}/>
            </li>

            <li >
              { this.props.isFinished && this.props.paid ? 
                <Navlink 
                to={
                  translate("routes./event/:id/:hash/review",{
                    id: id,
                    hash: hash
                  })
                } label={translate("Review")}/>
                :
                <Navlink 
                to={translate("routes./event/:id/:hash/user",{
                  id: id,
                  hash: hash
                })} 
                label={translate("Contact information")}/>}
            </li>


          </ul>
        </nav>
      </div>
    )
  }
}

const mapStateToProps = state => ({ translate: getTranslate(state.locale) });


function mapDispatchToProps(dispatch, ownProps) {
  return {
    registerMenuItem: (name, route) => dispatch(commonActions.registerMenuItem(name,route)),
    removeMenuItem: (name) => dispatch(commonActions.removeMenuItem(name))
}}

const SmartNavigation = connect(mapStateToProps, mapDispatchToProps, null, {pure:false})(eventNavigation)

export default SmartNavigation;
