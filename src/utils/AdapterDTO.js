import formatter from './Formatter'


export default class AdapterDTO  {
    constructor() {

    }

    //Converts a dto to a profile
    convertDTO(DTO) {
      return {
        clientID:         DTO.clientID,
        memberSince:      DTO.created_at,
        email:            DTO.email,
        email_verified:   DTO.email_verified,
        gender:           DTO.gender,
        locale:           DTO.locale,
        name:             DTO.user_metadata.name || DTO.name,
        firstName:        this.getFirstName(DTO.name),
        avatar:           DTO.picture,
        picture:          DTO.user_metadata.picture || DTO.picture_large || DTO.picture,
        user_id:          DTO.user_id,
        birthday:         DTO.user_metadata.birthday || DTO.birthday ? formatter.date.ToEU(DTO.birthday) : "",
        genres:           DTO.user_metadata.genres,
        geoip:            DTO.user_metadata.geoip,
        location:         DTO.user_metadata.location,
        locationCoords:   DTO.user_metadata.locationCoords,
        bio:              DTO.user_metadata.bio || "",
        radius:           DTO.user_metadata.radius || 25000, //25 km
        queupGigs:        DTO.user_metadata.queupGigs || 0,
        otherGigs:        DTO.user_metadata.otherGigs || 0,
        phone:            DTO.user_metadata.phone || ""
      }
    }

    //Converts a profile to a dto, only using values that can be updated
    convertProfile(profile) {
      return {
        user_metadata:{
          name:           profile.name,
          picture:        profile.picture,
          birthday:       profile.birthday,
          genres:         profile.genres,
          location:       profile.location,
          locationCoords: profile.locationCoords,
          radius:         profile.radius,
          phone:          profile.phone
        }
      }
    }

    getFirstName(name){
      if (name.indexOf(' ') === -1)
         return name
     else
         return name.substr(0, name.indexOf(' '))
    }

}
