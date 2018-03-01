/*!
 * accounting.js v0.4.2, copyright 2014 Open Exchange Rates, MIT license, http://openexchangerates.github.io/accounting.js
 */
(function(p,z){function q(a){return!!(""===a||a&&a.charCodeAt&&a.substr)}function m(a){return u?u(a):"[object Array]"===v.call(a)}function r(a){return"[object Object]"===v.call(a)}function s(a,b){var d,a=a||{},b=b||{};for(d in b)b.hasOwnProperty(d)&&null==a[d]&&(a[d]=b[d]);return a}function j(a,b,d){var c=[],e,h;if(!a)return c;if(w&&a.map===w)return a.map(b,d);for(e=0,h=a.length;e<h;e++)c[e]=b.call(d,a[e],e,a);return c}function n(a,b){a=Math.round(Math.abs(a));return isNaN(a)?b:a}function x(a){var b=c.settings.currency.format;"function"===typeof a&&(a=a());return q(a)&&a.match("%v")?{pos:a,neg:a.replace("-","").replace("%v","-%v"),zero:a}:!a||!a.pos||!a.pos.match("%v")?!q(b)?b:c.settings.currency.format={pos:b,neg:b.replace("%v","-%v"),zero:b}:a}var c={version:"0.4.1",settings:{currency:{symbol:"$",format:"%s%v",decimal:".",thousand:",",precision:2,grouping:3},number:{precision:0,grouping:3,thousand:",",decimal:"."}}},w=Array.prototype.map,u=Array.isArray,v=Object.prototype.toString,o=c.unformat=c.parse=function(a,b){if(m(a))return j(a,function(a){return o(a,b)});a=a||0;if("number"===typeof a)return a;var b=b||".",c=RegExp("[^0-9-"+b+"]",["g"]),c=parseFloat((""+a).replace(/\((.*)\)/,"-$1").replace(c,"").replace(b,"."));return!isNaN(c)?c:0},y=c.toFixed=function(a,b){var b=n(b,c.settings.number.precision),d=Math.pow(10,b);return(Math.round(c.unformat(a)*d)/d).toFixed(b)},t=c.formatNumber=c.format=function(a,b,d,i){if(m(a))return j(a,function(a){return t(a,b,d,i)});var a=o(a),e=s(r(b)?b:{precision:b,thousand:d,decimal:i},c.settings.number),h=n(e.precision),f=0>a?"-":"",g=parseInt(y(Math.abs(a||0),h),10)+"",l=3<g.length?g.length%3:0;return f+(l?g.substr(0,l)+e.thousand:"")+g.substr(l).replace(/(\d{3})(?=\d)/g,"$1"+e.thousand)+(h?e.decimal+y(Math.abs(a),h).split(".")[1]:"")},A=c.formatMoney=function(a,b,d,i,e,h){if(m(a))return j(a,function(a){return A(a,b,d,i,e,h)});var a=o(a),f=s(r(b)?b:{symbol:b,precision:d,thousand:i,decimal:e,format:h},c.settings.currency),g=x(f.format);return(0<a?g.pos:0>a?g.neg:g.zero).replace("%s",f.symbol).replace("%v",t(Math.abs(a),n(f.precision),f.thousand,f.decimal))};c.formatColumn=function(a,b,d,i,e,h){if(!a)return[];var f=s(r(b)?b:{symbol:b,precision:d,thousand:i,decimal:e,format:h},c.settings.currency),g=x(f.format),l=g.pos.indexOf("%s")<g.pos.indexOf("%v")?!0:!1,k=0,a=j(a,function(a){if(m(a))return c.formatColumn(a,f);a=o(a);a=(0<a?g.pos:0>a?g.neg:g.zero).replace("%s",f.symbol).replace("%v",t(Math.abs(a),n(f.precision),f.thousand,f.decimal));if(a.length>k)k=a.length;return a});return j(a,function(a){return q(a)&&a.length<k?l?a.replace(f.symbol,f.symbol+Array(k-a.length+1).join(" ")):Array(k-a.length+1).join(" ")+a:a})};if("undefined"!==typeof exports){if("undefined"!==typeof module&&module.exports)exports=module.exports=c;exports.accounting=c}else"function"===typeof define&&define.amd?define([],function(){return c}):(c.noConflict=function(a){return function(){p.accounting=a;c.noConflict=z;return c}}(p.accounting),p.accounting=c)})(this);

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
            if (!dateString) return null
            var from = dateString.split("/");
            return new Date(from[2], from[1] - 1, from[0]);
          },

          ToTime : function(date){
            const addZero = (n) => ("0"+n).slice(-2)
            return addZero(date.getHours()) + ":" + addZero(date.getMinutes())
          },
          ToLocalString : function(date){
            var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            return date.toLocaleDateString("da-DK", options)
          }
        },

    money:{

      ExtractFromString: function(value){
        if (!isNaN(value) || !value) {
          return value
        }
          value = value.replace(/[^\d]/gi, '')
          return value.slice(0,value.length-2)
        },

      //Example formatter.money.Format(2500, "Dkk")
      FormatNumberToString : function(number, currency){
        if (typeof window === 'undefined'){
          return '...';
        } 

        switch (currency){
          case "USD":
            return window.accounting.formatMoney(number, "$ ", 2, ",", ".");
          case "DKK":
            return window.accounting.formatMoney(number, "DKK", 2, ".", ",", "%v %s");
          case "EUR":
            return window.accounting.formatMoney(number, "€ ", 2, ".", ",");
          case "NOK":
            return window.accounting.formatMoney(number, "NOK", 2, ".", ",", "%v %s");
          case "SEK":
            return window.accounting.formatMoney(number, "SEK", 2, ".", ",", "%v %s");
          case "GBP":
            return window.accounting.formatMoney(number, "£ ", 2, ".", ",");
          default:
            return window.accounting.formatMoney(number, "? ", 2, ".", ",");
        }
  },
  ToStandard: function(number, currency){
    switch (currency) {
        case "DKK":
           number /= 100 //From øre to kroner
          break
        case "USD":
          number /= 100 //From cents to dollar
          break
        default:
          number /= 100
          break
      }
      return number
  },
  ToSmallest: function(number, currency){
    switch (currency) {
        case "DKK":
          number *= 100 //From øre to kroner
          break
        case "USD":
          number *= 100 //From cents to dollar
          break
        default:
          number *= 100
          break
      }
      return Math.round(number)
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
