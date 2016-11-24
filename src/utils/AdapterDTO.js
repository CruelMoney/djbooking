import Formatter from './Formatter'
import assign from 'lodash.assign'


    const location ={
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
    const review ={
      fromDTO: function(DTO){
        return{
          eventLocation: location.fromDTO(DTO.eventLocation),
          eventDate: DTO.eventDate,
          eventName: DTO.eventName,
          author: DTO.reviewer.name,
          authorPicture: DTO.reviewer.picture,
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


    const settings ={
      fromDTO:function(DTO){
        return DTO
      },
      toDTO:function(settings){
        return settings;
      }
    }

    const user ={
      fromDTO: function(DTO) {
        console.log(JSON.stringify(DTO.settings.emailSettings));
        return assign({}, DTO, {
          bio: DTO.bio,
          email: DTO.email,
          experienceCount: DTO.experienceCount,
          picture: DTO.picture,
          playingLocation : DTO.playingLocation,
          playingRadius : DTO.playingRadius,
          user_id   : DTO.user_id,
          genres:     DTO.genres,
          createdAt : DTO.createdAt,
          reviews : DTO.reviews ? DTO.reviews.map(r => review.fromDTO(r)) : [],
          settings: settings.fromDTO(DTO.settings),

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
          provider:         DTO.app_metadata.auth0Id.split("|")[0]
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

    const offer={
      fromDTO:function(DTO){
        return{
           gigID: DTO.gigID,
           amount: Formatter.money.ToStandard(DTO.amount, DTO.currency),
           currency: DTO.currency,
           dj: user.fromDTO(DTO.dj)
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

    const cueupEvent ={

      fromDTO:function(DTO){

        return{
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
        return{
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

    const cueupGig ={

      fromDTO:function(DTO){
        return assign({}, DTO, {
                startTime: new Date(DTO.startTime),
                endTime: new Date(DTO.endTime),
                customer: user.fromDTO(DTO.customer)
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
