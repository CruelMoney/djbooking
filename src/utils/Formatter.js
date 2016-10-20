
const formatter = {
  date:{
          //returns a datetime object as a eu formatted string
          ToEU: function (inputFormat) {
            function pad(s) { return (s < 10) ? '0' + s : s }
            var d = new Date(inputFormat)
            return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
          },

          //returns a datetime object as a us formatted string
          ToUS: function (inputFormat) {
            function pad(s) { return (s < 10) ? '0' + s : s }
            var d = new Date(inputFormat)
            return [pad(d.getMonth()+1), pad(d.getDate()), d.getFullYear()].join('/')
          },

          //returns a date from a eu formatted date string. DD/MM/YYYY, 28/07/1993 etc.
          FromEUStringToUSDate : function (dateString){
            var from = dateString.split("/");
            return new Date(from[2], from[1] - 1, from[0]);
          },

          ToTime : function(date){
            const addZero = (n) => ("0"+n).slice(-2)
            return addZero(date.getHours()) + ":" + addZero(date.getMinutes())
          }
        },

    money:{
      //Example formatter.money.Format(2500, "Dkk")
      FormatNumberToString : function(number, currency){
        var n = number,
        c = 2,
        d = ",",
        t = ".",
        s = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(c), 10) + "",
        j = i.length > 3 ? i.length % 3 : 0;
       return currency + " " + s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
  }
    },

    name: {

      GetFirstAndLast : function(name){
      if (name.indexOf(' ') === -1)
         return {firstName: name, lastName: ""}
     else
          var firstName = name.substr(0, name.indexOf(' '))
          var lastName  = name.substr(name.indexOf(' ')+1, name.lastIndexOf(''))
         return {firstName: firstName, lastName: lastName}
    }
  },

    cueupEvent: {
      GetStatus: function(statusEnum){
        switch (statusEnum) {
          case "Initial":
            return "No relevant DJ could be found"

          case "Cancelled":
            return "The event is cancelled"

          case "Offering":
            return "Waiting on DJ's to make offers"

          case "Accepted":
            return "There's an offer"

          case "Confirmed":
            return "The event is confirmed and payed"

          case "Finished":
            return "The event is finished"

          default:
            return statusEnum
      }

    }
  }






}

export default formatter
