import Formatter from './Formatter'


const AdapterDTO  = {
    user:{
      fromDTO: function(DTO) {
        return {
          bio: DTO.bio,
          email: DTO.email,
          experienceCount: DTO.experienceCount,
          picture: DTO.picture,
          playingLocation : DTO.playingLocation,
          playingRadius : DTO.playingRadius,
          user_id   : DTO.user_id,
          genres:     DTO.genres,
          createdAt : DTO.createdAt,
          reviewed : DTO.reviewed,

        // user_metadata stuff here
            address:        DTO.user_metadata.address,
            name:           DTO.user_metadata.firstName + " " + DTO.user_metadata.lastName,
            firstName:      DTO.user_metadata.firstName,
            birthDay:       DTO.user_metadata.birthDay,
            city:           DTO.user_metadata.city,
            phone:          DTO.user_metadata.phone,

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
          }
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
    },
    location:{
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
    },
    event:{
      fromDTO:function(DTO){
        return{
            id: DTO.Id,
            genres: DTO.Genres,
            customerId: DTO.CustomerId,
            offers: DTO.Offers.map(o => this.offer.fromDTO(o)),
            description: DTO.Description,
            name: DTO.Name,
            chosenOfferId: DTO.ChosenOfferId,
            location: this.location.fromDTO(DTO.LocationDTO),
            status: DTO.Status,
            startTime: DTO.StartTime,
            endTime: DTO.EndTime,
            guestsCount: DTO.GuestsCount,
            currency: DTO.Currency,
            minPrice : DTO.MinPrice,
            maxPrice: DTO.MaxPrice,
            needSpeakers: DTO.NeedSpeakers,
          }
      },
      toDTO:function(event){
        return{
          Genres: event.genres,
          Description: event.description,
          Name: event.name,
          ChosenOfferId: event.chosenOfferId,
          Location: this.location.toDTO(event.locationDTO),
          StartTime: event.startTime,
          EndTime: event.endTime,
          GuestsCount: event.guestsCount,
          Currency: event.currency,
          MinPrice : event.minPrice,
          MaxPrice: event.maxPrice,
          NeedSpeakers: event.needSpeakers,
          }
      }
    },
    offer:{
      fromDTO:function(DTO){
        return{
           gigID: DTO.GigID,
           amount: DTO.Amount,
           currency: DTO.Currency,
           dj: this.user.fromDTO(DTO.DJ)
          }
      },
      toDTO:function(offer){
        return{
           GigID: offer.gigID,
           Amount: offer.amount,
           Currency: offer.currency,
           DJ: this.user.toDTO(offer.dj)
          }
      }
    }
}

export default AdapterDTO
