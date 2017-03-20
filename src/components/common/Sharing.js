import React from 'react'
import Button from './Button-v2'
import QRCode from 'qrcode.react'
import Popup from './Popup'
import {DisconnectedToggleOptions as ToggleOptions} from './ToggleOptions'
import domtoimage from 'dom-to-image';
import Logo from './Logo'
import Textfield from './Textfield'
import {Environment} from '../../constants/constants'

class FBShare extends React.Component {
    render(){
        return (
        <div id="sharing">
            <Logo
                width="201px"
                height="91px"
            />
            <div className="info">
                <div
                    className="profile-image"
                    style={{backgroundImage: "url("+this.props.profile.picture+")"}}
                />
                <div className="profile-text">
                    <h1>{this.props.profile.firstName}</h1>
                    <p>
                        <svg width="26px" height="37px" viewBox="517 301 26 37" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <g id="location" stroke="none" stroke-width="1" fill="inherit" fill-rule="evenodd" transform="translate(517.000000, 301.000000)">
                                <g id="Capa_1">
                                    <path d="M12.5235484,0 C5.66064516,0 0.0772580645,5.48534904 0.0772580645,12.2276681 C0.0772580645,14.9432463 1.84233871,19.3705696 5.47306452,25.7626959 C8.04129032,30.2837473 10.5672581,34.053469 10.6733871,34.2116895 L12.5235484,36.9668822 L14.373629,34.2117687 C14.4798387,34.053469 17.0059677,30.2838266 19.573871,25.7627752 C23.2047581,19.3705696 24.9696774,14.9433255 24.9696774,12.2277473 C24.9697581,5.48534904 19.386371,0 12.5235484,0 Z M12.5235484,18.4834411 C8.96048387,18.4834411 6.07193548,15.6456916 6.07193548,12.1451113 C6.07193548,8.64453105 8.96048387,5.80678158 12.5235484,5.80678158 C16.0866129,5.80678158 18.9751613,8.64453105 18.9751613,12.1451113 C18.9751613,15.6456916 16.0865323,18.4834411 12.5235484,18.4834411 Z" id="Shape"></path>
                                </g>
                            </g>
                        </svg>
                        {this.props.profile.city}
                    </p>
                    <p>
                    <svg width="31px" height="40px" viewBox="0 0 31 40" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <path d="M30.780019,18.8760574 L30.780019,21.8256676 L30.778945,21.8256676 L30.7771381,28.8422694 C30.7875523,29.0292437 30.7889527,29.2139919 30.780019,29.394818 C30.5070256,34.9203034 27.6153756,35.7029386 24.6376646,35.7029386 C21.6599542,35.7029386 19.7237817,34.0888403 19.7237817,31.0753445 C19.7237817,28.0618486 21.7712328,27.2075046 24.978907,26.4477504 C26.3358334,26.1263553 28.664319,25.8365882 28.664319,24.3861478 L28.664319,19.7394145 L28.664319,18.468744 L28.664319,10.6079296 C28.664319,10.192157 28.4088561,9.88368742 28.0504845,9.81218928 L11.5012826,12.9426725 C11.2724735,13.1604563 11.1244856,13.4684204 11.1244856,13.7851518 L11.1244856,32.1575607 C11.1244856,32.3111651 11.1244856,31.6793556 11.1244856,33.4236758 C11.1244856,38.1940251 7.89159389,39.7779843 4.91388349,39.7779843 C1.93617251,39.7779843 0,38.1638856 0,35.15039 C0,32.1368942 2.04745165,31.2825502 5.25512524,30.522796 C6.47459876,30.2339572 8.47876924,29.9706634 8.87228951,28.8674798 L8.87228951,5.84224266 C8.87228951,4.88871155 9.62164748,3.96452164 10.5459329,3.7780258 L29.1063756,0.0330295502 C30.0307035,-0.15347482 30.780019,0.468800249 30.780019,1.42141663 L30.780019,18.8760574 Z" id="Combined-Shape" stroke="none" fill="inherit" fill-rule="evenodd"></path>
                    </svg>
                        {this.props.profile.genres.join(', ')}
                    </p>
                </div>
            </div>
            <p style={{marginBottom:"-40px"}}>I'm a DJ at Cueup. Book me here:</p>
             <Button
                      className="white">
                      <div style={{width:"333px"}}>BOOK</div>
            </Button>
        </div>)
    }
}


class EmbedCodes extends React.Component {
    state={value:"preview"}

    render(){
        return(
            <div>
                <ToggleOptions
                    glued={true}
                    onChange={(e)=>this.setState({value:e})}
                    value={this.state.value}
                    >
                    <Button
                        name="preview"
                    >Preview</Button>
                    <Button
                        name="code"
                    >HTML Code</Button>
                </ToggleOptions>
            </div>)
    }

}




class Sharing extends React.Component {

    state={popup:false}

    generatePreview = () =>{
        return new Promise((resolve,reject)=>{
            //Set popup showing link is being generated, and mount the sharing to create picture from
            this.setState({
                popup:true,
                popupContent:(
                    <div>
                        <Button isLoading />
                        <p>Generating link</p>
                        <div id="viz-containment">
                            <div id="viz-container">
                                <FBShare profile={this.props.profile}/>
                            </div>
                        </div>
                    </div>
                )
            },()=>{
            //After picture has mounted create an image from it
            var node = document.getElementById('sharing');
            domtoimage.toPng(node)
                .then((dataUrl)=> {
                    //Then send it to save in the backend
                    this.props.createFBShareLink(dataUrl, (err,result)=>{
                        if(err) reject("Could not create link")
                        this.setState({
                            popup:false,
                            popupContent:(
                            <div>
                                <p>Generated</p>
                            </div>
                            )
                        })               
                    resolve()
                    })
                })
                .catch(reject)
            })
        })
    }

    copyLink=()=>{
        this.generatePreview()
            .then(()=>{
                this.setState({
                    popup: true,
                    popupContent:(
                        <div>
                            <Textfield
                                value={this.props.link}
                            />
                            <p>Copy link</p>
                        </div>
                    )
                })
            .catch(function (error) {
                    this.setState({
                         popupContent:(
                        <div>
                            <p>Something went wrong.</p>
                        </div>)
                    })
            })
        })
    }

    fbShare=()=>{     
        this.generatePreview()
            .then(()=>{

                //initialize fb sdk
                window.fbAsyncInit = function() {
                    window.FB.init({
                    appId      : Environment.FACEBOOK_ID,
                    xfbml      : true,
                    version    : 'v2.8'
                    });
                    window.FB.AppEvents.logPageView();
                };

                (function(d, s, id){
                    var js, fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) {return;}
                    js = d.createElement(s); js.id = id;
                    js.src = "//connect.facebook.net/en_US/sdk.js";
                    fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));
                
                //Show dialog
                window.FB.ui({
                    method: 'share',
                    href: this.props.link,
                }, function(response){});
            })

            .catch(function (error) {
                    this.setState({
                         
                         popupContent:(
                        <div>
                            <p>Something went wrong.</p>
                        </div>)
                    })
            })
    }

    tweet=()=>{
        this.generatePreview()
            .then(()=>{
                var winHeight = window.innerHeight / 2
                var winWidth = window.innerWidth / 2
                var winTop = 0;
                var winLeft = 0;
                window.open('http://twitter.com/share?url=' +  this.props.link,
                            'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight
                );
            })
            .catch(function (error) {
                    this.setState({
                         
                         popupContent:(
                        <div>
                            <p>Something went wrong.</p>
                        </div>)
                    })
            });
    }

    generateQR=()=>{
         this.generatePreview()
            .then(()=>{
                this.setState({
                    popup: true,
                    popupContent: <QRCode value={this.props.link} />
                })
            })
            .catch(function (error) {
                    this.setState({
                         
                         popupContent:(
                        <div>
                            <p>Something went wrong.</p>
                        </div>)
                    })
            })
    }

    embedCode=()=>{
        this.setState({
            popup: true,
            popupContent: (<EmbedCodes/>
           )
        })
    }

    render() {
        return (
            <div>
                <Popup
                    showing={this.state.popup}
                    onClickOutside={()=>this.setState({popup:false})}
                >
                <div style={{textAlign:"center"}}>
                {this.state.popupContent}
                </div>
                </Popup>
            <div className="sharing-buttons">
                <Button
                    onClick={this.copyLink}
                >
                Copy link
                </Button>
                <Button
                    onClick={this.fbShare}
                >
                    Share on facebook
                </Button>
                <Button
                    onClick={this.tweet}
                >
                    Tweet on twitter
                </Button>
                <Button
                    onClick={this.embedCode}
                    >
                    Embed code
                </Button>
                <Button
                    onClick={this.generateQR}
                >
                    QR code
                </Button>
            </div>
            </div>
        )
    }
}

import { connect } from 'react-redux'
import * as actions from '../../actions/UserActions'

function mapStateToProps(state, ownProps) {
  return {
        profile: state.login.profile
    }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    createFBShareLink: (image, callback) => {
      dispatch(actions.createFBShareLink(image, callback))
    }
}
}


const SmartSharing = connect(mapStateToProps, mapDispatchToProps)(Sharing)

export default props => (
    <SmartSharing {...props}/>
)