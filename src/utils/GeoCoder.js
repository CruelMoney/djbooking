/*eslint no-undef: 0*/
var geocoder = new google.maps.Geocoder()

export default {
   codeAddress: function(address, callback)  {
    geocoder.geocode( { 'address': address}, function(results, status) {
      console.log(address);
         if (status === google.maps.GeocoderStatus.OK) {
           var lat = (results[0].geometry.location.lat())
           var lng = (results[0].geometry.location.lng())
          return callback({error: null, position:{lat: lat, lng: lng }})
         } else {
           return callback({error: ("Geocode was not successful for the following reason: " + status), position:null})
         }
       })
  }
}
