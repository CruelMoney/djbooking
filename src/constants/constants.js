var keyMirror = require('keymirror')


module.exports = {
  ActionTypes: keyMirror({
    // Session
    SIGNUP_REQUESTED: null,
    SIGNUP_SUCCEEDED: null,
    SIGNUP_FAILED: null,


    LOGIN_REQUESTED: null,
    LOGIN_SUCCEEDED: null,
    LOGIN_FAILED: null,

    LOGOUT_SUCCEEDED: null,

    UPDATEPROFILE_REQUESTED: null,
    UPDATEPROFILE_SUCCEEDED: null,
    UPDATEPROFILE_FAILED: null,

    UPDATE_PROFILE_VALUE: null,
    UPDATE_PROFILE_META_VALUE: null,
    RESET_PROFILE: null,

    TOGGLE_EDIT_MODE: null,


    // Routes
    REDIRECT: null,

    FORM_UPDATE_VALUE: null,
    FORM_UPDATE_FILTERS:null,
    FORM_RESET:null,
    SET_SIGNUP:null

  }),
  GENRES: [
    {name: 'R&B'},
    {name: 'Latin'},
    {name: 'Hip Hop'},
    {name: 'Pop'},
    {name: 'Techno'},
    {name: 'Lounge'},
    {name: 'House'},
    {name: 'Mix'},
    {name: 'Extreme'}
  ]

}


const darkMapStyle = [
{
  "stylers": [
  { "visibility": "simplified" },

  ]
},{
  "featureType": "administrative",
  "elementType": "labels",
  "stylers": [
  { "visibility": "off" }
  ]
},{
  "featureType": "landscape",
  "stylers": [
  { "visibility": "simplified" },
  { "lightness": 90 },
  { "gamma": 0.31 }
  ]
},{
  "featureType": "poi",
  "stylers": [
  { "visibility": "off" }
  ]
},{
  "featureType": "road",
  "stylers": [
  { "visibility": "on" }
  ]
},{
  "featureType": "transit",
  "stylers": [
  { "visibility": "off" }
  ]
},{
  "featureType": "water",
  "stylers": [
  { "visibility": "on" },
  { "color": "#000000" }
  ]
},{
  "featureType": "road",
  "elementType": "labels",
  "stylers": [
  { "visibility": "off" }
  ]
},{
  "featureType": "road.highway",
  "stylers": [
  { "color": "#808080" }
  ]
},{
  "featureType": "landscape",
  "elementType": "labels",
  "stylers": [
  { "visibility": "off" }
  ]
},{
  "featureType": "administrative.country",
  "stylers": [
  { "visibility": "on" }
  ]
},{
  "featureType": "administrative.locality",
  "elementType": "labels.text.fill",
  "stylers": [
  { "visibility": "on" },
  { "color": "#090f0e" }
  ]
},{
}
]
