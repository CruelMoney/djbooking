
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
        avatar:           DTO.picture,
        picture:          DTO.user_metadata.picture || DTO.picture_large || DTO.picture,
        user_id:          DTO.user_id,
        birthday:         DTO.user_metadata.birthday,
        genres:           DTO.user_metadata.genres,
        geoip:            DTO.user_metadata.geoip,
        location:         DTO.user_metadata.location,

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

        }
      }
    }

}
