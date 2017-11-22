import c from '../constants/constants'

var ActionTypes = c.ActionTypes

export function changeCurrency(currency) {
  return {
    type: ActionTypes.CHANGE_CURRENCY,
    value: currency
  }
}

export function setGeodata(data){
  return function(dispatch){
    window.loadScript("http://www.geoplugin.net/javascript.gp",()=>{
        const alphaChecker = /^[a-z\s]+$/i
        const city = window.geoplugin_city().match(alphaChecker) ? window.geoplugin_city() : ""
        const country = window.geoplugin_countryName().match(alphaChecker) ? window.geoplugin_countryName() : ""
        let currency = window.geoplugin_currencyCode();
        currency = c.Currencies.includes(currency) ? currency : 'DKK';
        const data ={
            currency: currency,
            city: city,
            country: country,
            countryCode: window.geoplugin_countryCode()
        }
        dispatch({
            type: ActionTypes.SET_GEO_SESSION,
            values: data
          })
    })
  }
  
}

