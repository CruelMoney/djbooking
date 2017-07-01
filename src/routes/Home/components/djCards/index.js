import React from 'react'
import './index.css'
import note from '../../../../assets/note.svg'
import frank from '../../../../assets/images/frank-hansen.png'
import martin from '../../../../assets/images/martin-edvardsen.png'
import mati from '../../../../assets/images/matti.jpg'
import emma from '../../../../assets/images/emma.jpg'
import mussa from '../../../../assets/images/musa.jpg'
import eightfive from '../../../../assets/images/18five.png'
import jan from '../../../../assets/images/jan.png'
import peter from '../../../../assets/images/peter.png'
import shuffle from 'lodash.shuffle'

export default class DJCards extends React.Component{

cards = []

componentWillMount(){
const djs = [
         {
        name:"Oscar",
        location: "Copenhagen, Denmark",
        genres: ["Disco", "Lounge", "House"],
        img: "https://i1.sndcdn.com/avatars-000295969486-nfvt6z-large.jpg"
    },
     {
        name:"Frank",
        location: "Aarhus, Denmark",
        genres: ["Top 40", "80s", "90s", "00s"],
        img: frank
        },
        {
            name:"Martin",
            location: "Copenhagen, Denmark",
            genres: ["Hip Hop", "Top 40", "Remixes"],
            img: martin
        },
         {
            name:"Mati",
            location: "Copenhagen, Denmark",
            genres: ["90s", "00s", "RnB", "Top 40"],
            img: mati
        },
        {
            name:"Emma",
            location: "Copenhagen, Denmark",
            genres: ["Disco", "80s", "90s", "RnB"],
            img: emma
        },
         {
            name:"Musa",
            location: "Copenhagen, Denmark",
            genres: ["Hip Hop", "Techno", "Top 40", "Latin"],
            img: mussa
        },
         {
            name:"Martin",
            location: "Copenhagen, Denmark",
            genres: ["Top 40", "Local", "Hip Hop", "90s"],
            img: "https://scontent.xx.fbcdn.net/v/t31.0-1/12696931_10156451755640720_7048425708604884718_o.jpg?oh=c484e6823c4c1a44435c455673fa15b8&oe=5970B1CA"
        },
        
            {
            name:"Christopher",
            location: "Copenhagen, Denmark",
            genres: ["RnB", "Pop", "House", "Hip Hop"],
            img: "https://cueup.azurewebsites.net/images/profilePicture/chris.png"
        },
        {
            name:"18 Five",
            location: "Copenhagen, Denmark",
            genres: ["RnB", "Hip Hop", "Trap"],
            img: eightfive
            },
        {
            name:"Andreas",
            location: "Copenhagen, Denmark",
            genres: ["Lounge", "UKG", "House"],
            img: jan
            },
        {
            name:"Peter",
            location: "Aarhus, Denmark",
            genres: ["Reggae", "Hip Hop", "Rock"],
            img: peter
            }

    ]
   
    this.cards = shuffle(djs.map(dj => <DJCard dj={dj} />))
}

  render() {
    
    return (
        <div className="dj-cards">
            <div>
                {this.cards.slice(0,3)}
            </div>
            <div>
                {this.cards.slice(3,6)}
            </div>
            <div>
                {this.cards.slice(6,9)}
            </div>
            <div>
                {this.cards.slice(9,11)}
            </div>
            
        </div>
    )
  }
}

class DJCard extends React.Component{


    render(){
        return(
            <div className="card dj-card">
                <div className="profile-picture">
                    <img src={this.props.dj.img} alt="profile-picture"/>
                </div>
                <div className="info">
                    <h4>{this.props.dj.name}</h4>
                    <table>
                        <tr>
                            <td>
                                <svg
                                version="1.1" id="Capa_1" x="0px" y="0px" width="22px" height="22px" viewBox="0 0 466.583 466.582" style={{enableBackground: "new 0 0 466.583 466.582"}}>
                                <g>
                                <path d="M233.292,0c-85.1,0-154.334,69.234-154.334,154.333c0,34.275,21.887,90.155,66.908,170.834   c31.846,57.063,63.168,104.643,64.484,106.64l22.942,34.775l22.941-34.774c1.317-1.998,32.641-49.577,64.483-106.64   c45.023-80.68,66.908-136.559,66.908-170.834C387.625,69.234,318.391,0,233.292,0z M233.292,233.291c-44.182,0-80-35.817-80-80   s35.818-80,80-80c44.182,0,80,35.817,80,80S277.473,233.291,233.292,233.291z" fill="#FFFFFF"/>
                                </g>
                                </svg>
                            </td>
                            <td>
                                <p>
                                    {this.props.dj.location}
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <svg width="53px" height="67px" viewBox="0 0 53 67" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                    <g id="HomePage" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                        <g id="Homepage" transform="translate(-785.000000, -1599.000000)" >
                                            <g id="Info-section" transform="translate(223.000000, 1560.000000)">
                                                <path d="M614.245667,70.6595378 L614.245667,75.6067201 L614.243844,75.6067201 L614.240777,87.3751929 C614.258454,87.6887923 614.260831,87.998658 614.245667,88.3019454 C613.782291,97.5694694 608.874036,98.8821306 603.819702,98.8821306 C598.765369,98.8821306 595.478931,96.1749125 595.478931,91.1205792 C595.478931,86.0662458 598.954252,84.6333123 604.398923,83.3590277 C606.702155,82.8199735 610.654501,82.3339666 610.654501,79.9012408 L610.654501,72.1075884 L610.654501,69.9763786 L610.654501,56.7919647 C610.654501,56.0946174 610.220881,55.5772422 609.612585,55.4573232 L581.522151,60.7078715 C581.133773,61.0731456 580.88258,61.5896731 580.88258,62.1209053 L580.88258,92.9357074 C580.88258,93.1933377 580.88258,92.1336462 580.88258,95.0592769 C580.88258,103.060262 575.395105,105.71693 570.340772,105.71693 C565.286438,105.71693 562,103.009711 562,97.9553782 C562,92.9010449 565.475322,91.4681113 570.919992,90.1938268 C572.989913,89.7093771 576.39177,89.2677721 577.059727,87.4174767 L577.059727,48.7987995 C577.059727,47.1995061 578.331679,45.6494247 579.900551,45.3366278 L611.404843,39.0553982 C612.973787,38.742587 614.245667,39.786287 614.245667,41.3840462 L614.245667,70.6595378 Z" id="Combined-Shape"></path>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </td>
                            <td>
                                 <p>
                                 {this.props.dj.genres.join(', ')}
                                </p>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        )
    }
}