import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router'
import Navlink  from './common/Navlink'

class BreadCrumbs extends Component {
  render() {
    const { match, location, history } = this.props
    const crumbs = location.pathname.split('/');
    const renderCrumbs = crumbs.slice(2, crumbs.length)

    return (
        <ol 
        className="breadcrumbs"
        itemScope itemType="http://schema.org/BreadcrumbList">
          {
            renderCrumbs.map((crumb, idx) => {
              return( 
                  
                  
                  <li 
                      key={`breadcrumb-${idx+1}`}
                      itemProp="itemListElement" itemScope
                      itemType="http://schema.org/ListItem">
                      <span>>></span>
                      <Navlink
                        itemScope itemType="http://schema.org/Thing"
                        itemProp="item" 
                        to={`${crumbs.slice(0, idx+3).join('/')}`}
                      >
                        <span itemProp="name">{crumb}</span>
                      </Navlink>
                    <meta itemProp="position" content={idx+1} />
                  </li>
              )
            })
          }
        </ol>
    );
  }
}

export default withRouter(BreadCrumbs);