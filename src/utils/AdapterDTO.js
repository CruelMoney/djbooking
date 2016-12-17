import Formatter from './Formatter'
import assign from 'lodash.assign'
import profilePic from '../assets/default-profile-pic.png'

const filterEmailSettings = (settings, isDj, isCustomer) => {
  console.log(settings, isDj, isCustomer);
  if (!isDj) {
     delete settings["Event Cancelled"]
     delete settings["Event Info Updated"]
     delete settings["Event Opened For Offer"]
     delete settings["New Gig Request"]
     delete settings["Offer Accepted"]
  }
  if (!isCustomer) {
    delete settings["DJ Cancelled"]
    delete settings["Event Can Be Payed Now"]
    delete settings["New DJ Offer"]
    delete settings["Payment Recipe"]
  }
  return settings
}


const deletedUser={
  bio: "",
  email: "",
  picture: profilePic,
    censoredName:   "User deleted",
    phone:          ""

}

    var location ={
      fromDTO(DTO){
        return{
          lat:  DTO.lat,
          lng:  DTO.lng,
          name: DTO.name
        }
      },
      toDTO(location){
        return{
          lat:  location.lat,
          lng:  location.lng,
          name: location.name
        }
      }
    }
    var review ={
      fromDTO: function(DTO){
        return{
          eventLocation: location.fromDTO(DTO.eventLocation),
          eventDate: new Date(DTO.eventDate),
          eventName: DTO.eventName,
          author: DTO.reviewer ? DTO.reviewer.name : "Deleted user",
          authorPicture: DTO.reviewer ? DTO.reviewer.picture : profilePic,
          description: DTO.description,
          date: new Date(DTO.date),
          rating: DTO.rating,
          DJId: DTO.djId
        }
      },
      //The API will automatically assign the rest of the review properties
      toDTO(review){
        return{
        description: review.description,
        rating: review.rating,
        }
      }
    }

    var settings ={
      fromDTO:function(DTO, isDj, isCustomer){
        return {...DTO, emailSettings:filterEmailSettings(DTO.emailSettings, isDj, isCustomer)}
      },
      toDTO:function(settings){
        return settings;
      }
    }

    var user ={
      fromDTO: function(DTO) {
        return assign({}, DTO, {
          bio: DTO.bio,
          email: DTO.email,
          experienceCount: DTO.experienceCount,
          picture: DTO.picture.indexOf("default-profile-pic") !== -1 ? profilePic : DTO.picture,
          playingLocation : DTO.playingLocation,
          playingRadius : DTO.playingRadius,
          user_id   : DTO.user_id,
          genres:     DTO.genres,
          createdAt : DTO.createdAt,
          reviews : DTO.reviews ? DTO.reviews.map(r => review.fromDTO(r)) : [],
          settings: settings.fromDTO(DTO.settings, DTO.app_metadata.isDJ, DTO.app_metadata.isCustomer),

          // user_metadata stuff here
            address:        DTO.user_metadata.address,
            name:           DTO.user_metadata.firstName + " " + DTO.user_metadata.lastName,
            firstName:      DTO.user_metadata.firstName,
            lastName:       DTO.user_metadata.lastName,
            censoredName:   DTO.user_metadata.firstName + " " + DTO.user_metadata.lastName.slice(0,1) + ".",
            birthDay:       DTO.user_metadata.birthDay,
            city:           DTO.user_metadata.city,
            phone:          DTO.user_metadata.phone,
            currency:       DTO.user_metadata.currency || "DKK",
            last4:          DTO.user_metadata.last4,

          //App metadata stuff here

            auth0Id: DTO.app_metadata.auth0Id,
            avgRating : DTO.app_metadata.avgRating,
            earned    :  DTO.app_metadata.earned,
            email_verified :  DTO.app_metadata.email_verified,
            gigsCount : DTO.app_metadata.gigsCount,
            isCustomer :  DTO.app_metadata.isCustomer,
            isDJ :  DTO.app_metadata.isDJ,
            stripeID :  DTO.app_metadata.stripeID,
            tosAcceptanceIP:  DTO.app_metadata.tosAcceptanceIP,
            tosAcceptanceDate :  DTO.app_metadata.tosAcceptanceDate,

          //self calculated extra info here
          provider:         DTO.app_metadata.auth0Id.split("|")[0],
          user_metadata: null,
          app_metadata: null

              })
        },

      toDTO: function(profile) {
        return {
          bio: profile.bio,
          email: profile.email,
          experienceCount: profile.experienceCount,
          picture: profile.picture,
          playingLocation : profile.playingLocation,
          playingRadius : profile.playingRadius,
          user_id   : profile.user_id,
          genres:     profile.genres,
          settings: settings.toDTO(profile.settings),

          user_metadata:{
            address:        profile.address,
            firstName:      Formatter.name.GetFirstAndLast(profile.name).firstName,
            lastName:       Formatter.name.GetFirstAndLast(profile.name).lastName,
            birthDay:       typeof profile.birthday === "string"
                              ? Formatter.date.FromEUStringToUSDate(profile.birthday)
                              : profile.birthday,
            city:           profile.city,
            phone:          profile.phone
          },
          //nothing is set here because it cant be updated in the client
          app_metadata:{

          }
        }
      }
    }

    var offer={
      fromDTO:function(DTO){
        return{

           gigID: DTO.gigID,
           amount: Formatter.money.ToStandard(DTO.amount, DTO.currency),
           currency: DTO.currency,
           dj: user.fromDTO(DTO.dj),
           status: DTO.GigStatus
          }
      },
      toDTO:function(offer){
        return{
           GigID: offer.gigID,
           Amount: Formatter.money.ToSmallest(offer.amount,offer.currency),
           Currency: offer.currency
          }
      }
    }

    var cueupEvent ={

      fromDTO:function(DTO){

        return{
            ...DTO,
            id: DTO.id,
            genres: DTO.genres,
            customerId: DTO.customerId,
            offers: DTO.offers.map(o => offer.fromDTO(o)),
            description: DTO.description,
            name: DTO.name,
            chosenOfferId: DTO.chosenOfferId,
            location: location.fromDTO(DTO.location),
            status: DTO.status,
            startTime: new Date(DTO.startTime),
            endTime: new Date(DTO.endTime),
            guestsCount: DTO.guestsCount,
            currency: DTO.currency,
            minPrice : DTO.minPrice,
            maxPrice: DTO.maxPrice,
            needSpeakers: DTO.needSpeakers,
            date: Formatter.date.ToEU(DTO.startTime),
            review: DTO.review ? review.fromDTO(DTO.review) : null
          }
      },
      toDTO:function(event){
        console.log(event);
        return{
          ...event,
          Genres: event.genres,
          Description: event.description,
          Name: event.name,
          ChosenOfferId: event.chosenOfferId,
          Location: location.toDTO(event.location),
          StartTime: event.startTime,
          EndTime: event.endTime,
          GuestsCount: event.guestsCount,
          Currency: event.currency,
          MinPrice : event.minPrice,
          MaxPrice: event.maxPrice,
          NeedSpeakers: event.needSpeakers,
          }
      }
    }

    var cueupGig ={

      fromDTO:function(DTO){
        return assign({}, DTO, {
                startTime: new Date(DTO.startTime),
                endTime: new Date(DTO.endTime),
                customer: DTO.customer ? user.fromDTO(DTO.customer) : deletedUser
              })
      },
      toDTO:function(gig){
        return gig;
      }
    }




export default{
user,
settings,
location,
offer,
cueupEvent,
review,
cueupGig}
