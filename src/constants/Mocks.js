var keyMirror = require('keymirror')


module.exports = {

  REVIEWS: [
{
  author:"Harry Potter",
  date:"Sunday, 31th July",
  rating:"★ ★ ★ ★",
  description: "Etiam facilisis libero sapien, in elementum velit vestibulum a. In id vestibulum turpis. Pellentesque convallis est enim, quis bibendum dui maximus quis. Nulla vel augue velit. Proin id arcu turpis. Curabitur elementum sagittis nulla, efficitur tincidunt eros finibus at. Maecenas fermentum rutrum massa eget vehicula. Vestibulum tempus neque quis dolor convallis, vel consequat diam sollicitudin. Sed ut tincidunt urna, vel laoreet ipsum.",
  event:{
    name: "B-day bash",
    location: "Copenhagen",
    date: "Saturday, 30th July"
  }
},
{
  author:"Harry Potter",
  date:"Sunday, 31th July",
  rating:"★ ★ ★ ★",
  description: "Etiam facilisis libero sapien, in elementum velit vestibulum a. In id vestibulum turpis. Pellentesque convallis est enim, quis bibendum dui maximus quis. Nulla vel augue velit. Proin id arcu turpis. Curabitur elementum sagittis nulla, efficitur tincidunt eros finibus at. Maecenas fermentum rutrum massa eget vehicula. Vestibulum tempus neque quis dolor convallis, vel consequat diam sollicitudin. Sed ut tincidunt urna, vel laoreet ipsum.",
  event:{
    name: "B-day bash",
    location: "Copenhagen",
    date: "Saturday, 30th July"
  }
}],

        GIGS:[
        {name: 'Awesome birtday',
          location: 'Copenhagen',
          date: 'Saturday, 30th July',
          startTime: '21:00',
          endTime:   '03:00',
          offers: [],
          contact: {
            name:'Christopher',
            phone: '24658061',
          email: 'chrdengso@gmail.com'},
          guests: 100,
          description: 'Etiam facilisis libero sapien, in elementum velit vestibulum a. In id vestibulum turpis. Pellentesque convallis est enim, quis bibendum dui maximus quis. Nulla vel augue velit. Proin id arcu turpis. Curabitur elementum sagittis nulla, efficitur tincidunt eros finibus at. Maecenas fermentum rutrum massa eget vehicula. Vestibulum tempus neque quis dolor convallis, vel consequat diam sollicitudin. Sed ut tincidunt urna, vel laoreet ipsum.',
    genres:['Hip Hop', 'R&B', 'House'],
    speakers: 'Yes',
    status: 'REQUESTED'},

    {name: 'Crazy housewarming',
     location: 'Copenhagen',
     date: 'Saturday, 30th July',
     startTime: '21:00',
     endTime:   '03:00',
     offers: [],
     price: 1000,
     contact: {
       name:'Christopher',
       phone: '24658061',
       email: 'chrdengso@gmail.com'},
     guests: 100,
     description: 'Etiam facilisis libero sapien, in elementum velit vestibulum a. In id vestibulum turpis.',
     genres:['Hip Hop', 'R&B'],
     speakers: 'No',
     status: 'ACCEPTED'},

     {name: "50'års",
      location: 'Copenhagen',
      date: 'Saturday, 30th July',
      startTime: '21:00',
      endTime:   '03:00',
      offers: [],
      price: 3000,
      contact: {
        name:'Christopher',
        phone: '24658061',
        email: 'chrdengso@gmail.com'},
      guests: 100,
      description: 'Etiam facilisis libero sapien, in elementum velit vestibulum a. In id vestibulum turpis.',
      genres:['Hip Hop', 'R&B'],
      speakers: 'No',
      status: 'CONFIRMED'},

     {name: 'Epic outdoor clubbing event',
      location: 'Copenhagen',
      date: 'Saturday, 30th July',
      startTime: '00:00',
      endTime:   '08:00',
      offers: [],
      price: 10000,
      contact: {
        name:'Christopher',
        phone: '24658061',
        email: 'chrdengso@gmail.com'},
      guests: 1000,
      description: 'Etiam facilisis libero sapien, in elementum velit vestibulum a. In id vestibulum turpis. Pellentesque convallis est enim, quis bibendum dui maximus quis. Nulla vel augue velit. Proin id arcu turpis. Curabitur elementum sagittis nulla, efficitur tincidunt eros finibus at. Maecenas fermentum rutrum massa eget vehicula. Vestibulum tempus neque quis dolor convallis, vel consequat diam sollicitudin. Sed ut tincidunt urna, vel laoreet ipsum.',
      genres:['Techno', 'House'],
      speakers: 'Yes',
      status: 'FINISHED'},
 ]


}
