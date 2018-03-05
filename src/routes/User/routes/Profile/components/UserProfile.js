import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Button from '../../../../../components/common/Button-v2'
import Genres from '../../../../../components/common/ToggleButtonHandler'
import connectToForm from '../../../../../components/higher-order/connectToForm'
import {default as SimpleMap} from "../../../../../components/common/Map"
import LoadingPlaceholder from '../../../../../components/common/LoadingPlaceholder'
import TextWrapper from '../../../../../components/common/TextElement'
import c from '../../../../../constants/constants'
import { localize } from 'react-localize-redux';

const Map = connectToForm(SimpleMap)

class UserProfile extends Component{
    static propTypes = {
        profile: PropTypes.object,
        save: PropTypes.func,
        deleteProfile: PropTypes.func,
    }

    static contextTypes = {
      loadingUser:         PropTypes.bool,
      reset:           PropTypes.func,
      registerActions: PropTypes.func,
      toggleEditMode:  PropTypes.func,
      editing:         PropTypes.bool,
      valid:           PropTypes.bool,
      disableEditMode: PropTypes.func
    }

    componentWillMount(){
      if ( this.context.registerActions) {
          this.context.registerActions(this.getActionButtons)
      }
    }

    getActionButtons = (props = this.props) => {
      const {translate} = this.props;


        return (


            <div className="context-actions" key="profile_actions">
                {this.props.publicProfileMode ? 
                  <Button
                    onClick={this.props.togglePublicProfile}
                    name="toggle_public"
                    >
                    {translate("Back to profile")}
                  </Button>
                :null}
            </div>

        )
    }

    render() {
      const { translate } = this.props;
        const isDJ = this.props.profile.isDJ
       
        return (
          <div>
        
            { this.context.loadingUser ?
              <div>
                <LoadingPlaceholder/>
                <LoadingPlaceholder/>
                <LoadingPlaceholder/>
                <LoadingPlaceholder/>
              </div>
              :
              <div>
                <div className="profile">
                  
                  {isDJ
                    ? <TextWrapper 
                    label={translate("Bio")} 
                    text="">
                       <p>
                       {this.props.profile.bio} 
                        </p>
                       

                    </TextWrapper>
                  : null}
                  {isDJ
                    ? <TextWrapper label={translate("Genres")} text="">
                      <Genres
                        name="genres"
                        validate={['required']}
                        potentialValues={c.GENRES}
                        columns={4}
                        value={this.props.profile.genres}
                        disabled={!this.context.editing}/>
                    </TextWrapper>
                    : null
                  }

                  {isDJ
                    ? <TextWrapper 
                    label={translate("Location")} 
                    text={translate("public-profile.location")}
                    >
                      <Map
                        radius={this.props.profile.playingRadius}
                        value={this.props.profile.playingLocation}
                        editable={this.context.editing}
                        themeColor={this.context.color}
                        radiusName="playingRadius"
                        locationName="playingLocation"/>
                    </TextWrapper>
                  : null}
                  
                  {isDJ
                    ? <TextWrapper 
                    label={translate("Cancelation policy")} 
                    text={translate("public-profile.refund", {
                      days: this.props.profile.settings.cancelationDays,
                      percentage:  this.props.profile.settings.refundPercentage
                    })}/>
                  : null}
            

                </div>
              </div>}
          </div>
        )

    }
}

export default localize(UserProfile, 'locale');