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
        const data ={
            currency: window.geoplugin_currencyCode(),
            city: window.geoplugin_city(),
            country: window.geoplugin_countryName(),
            countryCode: window.geoplugin_countryCode()
        }
        dispatch({
            type: ActionTypes.SET_GEO_SESSION,
            values: data
          })
    })
  }
  
}

