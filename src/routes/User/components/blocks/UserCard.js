import React, {PropTypes} from 'react'
import Formatter from '../../../../utils/Formatter'
import Rating from '../../../../components/common/Rating'
import Navlink  from '../../../../components/common/Navlink'
import Logo from '../../../../components/common/Logo'
import Button from '../../../../components/common/Button-v2'
import * as actions from '../../../../actions/UserActions'
import { connect } from 'react-redux'


var UserCard = React.createClass({

  propTypes: {
    profile: PropTypes.object,
    picture: PropTypes.string,
    about:  PropTypes.string,
    rating: PropTypes.number,
    experience: PropTypes.number,
    earned: PropTypes.number,
    birthday: PropTypes.string,
    genres: PropTypes.arrayOf(PropTypes.string),
    onlyPicture: PropTypes.bool,
    changePicture: PropTypes.func,
  },

getInitialState(){
  return{loading: false, err: null}
},
/*eslint no-undef: 0*/

    handleFile(e) {
      const reader = new FileReader()
      const file = e.target.files[0]

      var self = this

      reader.onload = (upload) => {
        this.setState({
          loading: true
        })

        if ((file.size/1024) > 5000 ) {
           this.setState({loading: false, err: "Image cannot be larger than 5 Mb"})
           return
         }

        var loadingImage = loadImage(
          file,
          function (img) {
            if(img.type === "error") {
                self.setState({
                       loading: false,
                       err: "Something went wrong"
                     })
              } else {
                    var imageData = img.toDataURL();
                    const profile = {...self.props.profile, picture: imageData}

                    self.props.updatePicture(profile, (err)=>{
                      if (err) {
                        self.setState({
                          loading: false,
                          err: "Something went wrong"
                        })
                      }else{
                        self.setState({
                          loading: false,
                          err: null
                        })
                      }
                    })
              }
          },
          {
            maxWidth: 500,
            maxHeight: 500,
           cover: true,
           orientation: true,
           crop: true
       }
      );

      loadingImage.onerror = ()=>{
        self.setState({
               loading: false,
               err: "Something went wrong"
             })
      }
        //
        // var imageData = upload.target.result;
        // var img = new Image();
        // img.src = imageData;
        //
        //
        //   if ((file.size/1024) > 5000 ) {
        //     this.setState({loading: false, err: "Image cannot be larger than 5 Mb"})
        //     return
        //   }
        // img.onload = function () {
        //
        //     if (img.width > maxWidth || img.height > maxHeigt) {
        //         var width = maxWidth;
        //         var height = maxHeigt;
        //
        //         if (img.width > maxWidth) {
        //             width = maxWidth;
        //             var ration = maxWidth / img.width;
        //             height = Math.round(img.height * ration);
        //         }
        //
        //         if (height > maxHeigt) {
        //             height = maxHeigt;
        //             var ration2 = maxHeigt / img.height;
        //             width = Math.round(img.width * ration2);
        //         }
        //
        //         var canvas = self.refs.canvas
        //         canvas.width = width;
        //         canvas.height = height;
        //         var context = canvas.getContext('2d');
        //         context.drawImage(img, 0, 0, width, height);
        //         imageData = canvas.toDataURL();
        //
        //         }
        //
        //     }
        //     img.onerror = function () {
        //       self.setState({
        //         loading: false,
        //         err: "Something went wrong"
        //       })
        //     }
        //
        //     const profile = {...self.props.profile, picture: imageData}
        //
        //     self.props.updatePicture(profile, (err)=>{
        //       if (err) {
        //         self.setState({
        //           loading: false,
        //           err: "Something went wrong"
        //         })
        //       }else{
        //         self.setState({
        //           loading: false,
        //           err: null
        //         })
        //       }
        //     })
        }

      reader.readAsDataURL(file)
    },

  render() {
    //calculating the age
    //var cur = new Date();
    //var diff = cur- new Date(this.props.birthday);
    //var age = Math.floor(diff/31536000000);

    var genres = []
    const genresCount = this.props.genres.length;

    this.props.genres.forEach(function(genre, i) {
      if (i+1 === genresCount){
        genres.push(genre)
      }else{
          genres.push(genre + ", ")
      }})

    return (

      <div

        className={"card " + this.props.className}>

        <div
          style={{
            width: '280px',
            height: '280px',
            position: 'relative'
          }}
          className={this.state.loading || this.state.err ? "user-card-picture-wrapper loading" : "user-card-picture-wrapper"}
          htmlFor="fileupload">
          <div className="user-card-picture-overlay">
            <div

              style={{
                position: "absolute",
                left: "-8px",
                top: "237px",
                height: "20px",
              }}
              className="logo">
              <Navlink to="/">
                <Logo />
              </Navlink>            </div>
          </div>
          <div id="profile-picture-upload">
            <canvas ref="canvas" style={{display:"none"}} />
            <input name="fileupload" id="fileupload"  type="file" accept="image/*" onChange={this.handleFile}/>
            {
              this.state.loading
              ?
                <Button isLoading/>
              :
              this.state.err ?
                <label htmlFor="fileupload"><span>{this.state.err}</span></label>
              :
              <label htmlFor="fileupload"><span>Change image</span></label>
            }
          </div>

          <div
            className="user-card-picture"
            style={{backgroundImage: "linear-gradient(20deg, rgba(49, 255, 245,0.8) 0%, rgba(49, 255, 197,0.5) 16%, rgba(0, 209, 255,0.2) 66%, rgba(49, 218, 255, 0.0) 71%),  url("+this.props.picture+")"}}
          />
          <div
            className="user-card-picture-blurred"
            style={{backgroundImage: "linear-gradient(20deg, rgba(49, 255, 245,0.8) 0%, rgba(49, 255, 197,0.5) 16%, rgba(0, 209, 255,0.2) 66%, rgba(49, 218, 255, 0.0) 71%),  url("+this.props.picture+")"}}
          />
        </div>

        <div className={this.props.onlyPicture ? "user-card-text hide" : "user-card-text"}>
          <div className="user-card-info">
            <div className="user-card-fact">
              <p>Experience</p>
              {this.props.experience + " Cueup gigs"}
            </div>
            <div className="user-card-fact">
              <p>Earned</p>
              {Formatter.money.FormatNumberToString(this.props.earned, "Dkk")}
            </div>
            <div className="user-card-fact">
              <p>Rating</p>
              <Rating rating={this.props.rating}/>
            </div>
          </div>
        </div>

      </div>
      )
  }
})


function mapDispatchToProps(dispatch, ownprops) {
  return {
    updatePicture: (profile, callback) => {dispatch(actions.save(profile, callback))},
  }
}

const SmartUserCard = connect(state=>state, mapDispatchToProps)(UserCard)


export default props => (
    <SmartUserCard {...props}/>
)