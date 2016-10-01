import formatter from './Formatter'


export default class AdapterDTO  {

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
        phone:            DTO.user_metadata.phone || "",
        provider:         DTO.user_id.split("|")[0],
        notifications:    DTO.user_metadata.notifications || [],
        availability:     DTO.user_metadata.availability || [],
        bank_number:      DTO.user_metadata.bank_number || "",
        account_number:   DTO.user_metadata.account_number || "",
        isCustomer:       DTO.app_metadata ? DTO.app_metadata.isCustomer || false : false,
        isDJ:             DTO.app_metadata ? DTO.app_metadata.isDJ || false : false,
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
          phone:          profile.phone,
          notifications:  profile.notifications,
          availability:   profile.availability,
          bank_number:    profile.bank_number,
          account_number: profile.account_number
        }
      }
    }
  //
  //   public class UserDTO
  //  {
  //      [Required]
  //      public string email { get; set; }
  //      public string picture { get; set; }
  //      public int user_id { get; set; }
  //      public Identity[] identities { get; set; }
  //      public DateTime created_at { get; set; }
  //      [Required]
  //      public User_Metadata user_metadata { get; set; }
  //      [Required]
  //      public App_Metadata app_metadata { get; set; }
  //      public ReviewDTO[] reviewed { get; set; }
  //      [Required]
  //      public LocationDTO playingLocation { get; set; }
  //      [Required]
  //      public int playingRadius { get; set; }
  //      [Required]
  //      public string[] genres { get; set; }
  //  }
   //
  //  //Info that cannot be changed manually by the user
  //      public class App_Metadata
  //  {
  //      public bool email_verified { get; set; }
  //      public string stripeID { get; set; }
  //      [Required]
  //      public string auth0Id { get; set; }
  //      public string[] roles { get; set; }
  //      [Required]
  //      public DateTime tosAcceptanceDate { get; set; }
  //      [Required]
  //      public string tosAcceptanceIP { get; set; }
  //      public double avgRating { get; set; }
  //  }
  //
  //  //Real life info about the user that can be changed manually by the user.
  //  //Should not have any impact on the business logic
  //  public class User_Metadata
  //  {
  //      public Geoip geoip { get; set; }
  //      [Required]
  //      public string city { get; set; }
  //      [Required]
  //      public string address { get; set; }
  //      [Required]
  //      public string zip { get; set; }
  //      [Required]
  //      public string firstName { get; set; }
  //      [Required]
  //      public string lastName { get; set; }
  //      public string phone { get; set; }
  //      public DateTime birthDay { get; set; }
  //  }
   //
   //
  //  public class Geoip
  //  {
  //      public string country_code { get; set; }
  //      public string country_code3 { get; set; }
  //      public string country_name { get; set; }
  //      public string city_name { get; set; }
  //      public float latitude { get; set; }
  //      public float longitude { get; set; }
  //      public string time_zone { get; set; }
  //      public string continent_code { get; set; }
  //  }
   //
   //
  //  public class Identity
  //  {
  //      public string user_id { get; set; }
  //      public string provider { get; set; }
  //      public string connection { get; set; }
  //      public bool isSocial { get; set; }
  //  }
   //
   //  public class LocationDTO
    // {
    //     [Required]
    //     public float Lat { get; set; }
    //     [Required]
    //     public float Lng { get; set; }
    //     public string Name { get; set; }
    //
    //
    // }


    getFirstName(name){
      if (name.indexOf(' ') === -1)
         return name
     else
         return name.substr(0, name.indexOf(' '))
    }

}
