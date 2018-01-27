import React, {Component} from 'react'
import './index.css'
import frank from '../../../../assets/images/frank-hansen.png'
import martinE from '../../../../assets/images/martin-edvardsen.png'
import martin from '../../../../assets/images/martin.jpg'
import simon from '../../../../assets/images/simon.jpg'
import emma from '../../../../assets/images/emma.jpg'
import mussa from '../../../../assets/images/musa.jpg'
import jan from '../../../../assets/images/jan.png'
import peter from '../../../../assets/images/peter.png'
import shuffle from 'lodash.shuffle'
import DJCard from '../../../../components/common/DJCard';
export default class DJCards extends Component{

cards = []

componentWillMount(){
const djs = [
        {
        name:"Oscar",
        location: "Copenhagen, Denmark",
        genres: ["Disco", "Lounge", "House"],
        img: "https://cueup.azurewebsites.net/images/profilePicture/Oscar-Bandersen.png"
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
            img: martinE
        },
         {
            name:"Simon",
            location: "Copenhagen, Denmark",
            genres: ["90s", "00s", "RnB", "Top 40"],
            img: simon
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
            img: martin
        },
        
            {
            name:"Christopher",
            location: "Copenhagen, Denmark",
            genres: ["RnB", "Pop", "House", "Hip Hop"],
            img: "https://cueup.azurewebsites.net/images/profilePicture/chris.png"
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
            },
            {
                name:"Andrew",
                location: "London, UK",
                genres: ["R&B", "90's", "UKG", "House"],
                img: 'https://api.cueup.io/uploads/images/profilePicture/Andrew-Roberts.png'
            },
            {
                name:"Oliver",
                location: "Odense, Denmark",
                genres: ["House", "Remixes", "80's", "Top 40"],
                img: 'https://scontent.xx.fbcdn.net/v/t1.0-1/14516469_10208681424846926_1439984337302474007_n.jpg?oh=81844be9ade122733f9503c82add0cec&oe=5A7AC372'
            },
            {
                name:"Chris",
                location: "Singapore",
                genres: ["Lounge", "Hip Hop", "Top 40", "Remixes"],
                img: 'https://cueup.azurewebsites.net/images/profilePicture/Chris-Delaney.png'
            },
            {
                name:"Kenneth",
                location: "Copenhagen, Denmark",
                genres: ["Lounge", "Hip Hop", "R&B", "80's"],
                img: 'https://cueup.azurewebsites.net/images/profilePicture/Kenneth-Riis.png'
            },
            {
                name:"Lukas",
                location: "Copenhagen, Denmark",
                genres: ["House", "Remixes", "Lounge"],
                img: 'https://cueup.azurewebsites.net/images/profilePicture/Lukas-Grubb-Jensen.png'
            },
            {
                name:"Christian",
                location: "Copenhagen, Denmark",
                genres: ["Top 40", "80's", "Disco", "House"],
                img: 'https://cueup.azurewebsites.net/images/profilePicture/Christian-Lindquist-Hansen.png'
            },
            {
                name:"Calvert",
                location: "Copenhagen, Denmark",
                genres: ["Remixes", "House", "Techno", "Trap"],
                img: 'https://cueup.azurewebsites.net/images/profilePicture/mathias-koelle.png'
            },

            // {
            //     name:"Martin",
            //     location: "Sønderborg, Denmark",
            //     genres: ["Latin", "80's", "Top 40"],
            //     img: 'https://cueup.azurewebsites.net/images/profilePicture/martin-stauner-.png'
            // },

            {
                name:"Emil",
                location: "Copenhagen, Denmark",
                genres: ["Remixes", "Techno"],
                img: 'https://i1.sndcdn.com/avatars-000077812094-dqnrqd-large.jpg'
            },
            

            

    ]
   
    this.cards = shuffle(djs.map((dj, idx) => <DJCard key={`dj-card-${idx}`} dj={dj} />))
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