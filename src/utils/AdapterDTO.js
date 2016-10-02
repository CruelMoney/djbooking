import Formatter from './Formatter'


export default class AdapterDTO  {

    //Converts a dto to a profile
    convertDTO(DTO) {
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

      // user_metadata stuff here:{
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
        provider:         DTO.app_metadata.auth0Id.split("|")[0],

      }
    }

    //Converts a profile to a dto, only using values that can be updated
    convertProfile(profile) {
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

}
