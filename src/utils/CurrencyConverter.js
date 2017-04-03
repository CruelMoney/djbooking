import {Environment } from '../constants/constants'
import Formatter from './Formatter'

export default class CurrencyConverter {

    constructor() {
        this.fx = window.fx
        this.error = false

        var domain = "https://openexchangerates.org/api/latest.json?app_id=" + Environment.OPENEXCHANGERATE_APP_ID
   
        fetch(domain)
            .then((response)=> {
                if (response.ok) {
                    var contentType = response.headers.get("content-type");
                    if (contentType && contentType.indexOf("application/json") !== -1) {
                        response.json().then((data)=> {
                            // Check money.js has finished loading:
                            if ( typeof this.fx !== "undefined" && this.fx.rates ) {
                                this.fx.rates = data.rates;
                                this.fx.base = data.base;
                            } else {
                                // If not, apply to fxSetup global:
                                var fxSetup = {
                                    rates : data.rates,
                                    base : data.base
                                }
                                this.error = false;
                            }
                        }).catch((error)=> {
                            this.error = true;
                            throw Error("JSON could not be parsed")
                        })
                    } else {
                        this.error = true;
                        throw Error("Response not JSON")
                    }
                } else {
                    this.error = true;
                    response.json().then(function(result) {
                        throw Error(result)
                    })
                }
            }).catch((error)=> {
                this.error = true;
                console.log(error)
                throw error
            });
    }

    //Safeconvert -> add 2 percent to conversion. Used when displaying offers from other currency
    convert(amount, from, to, safeConvert = false){
        this.fx.settings = { from: from, to: to};
        amount += (safeConvert ? amount*0.02 : 0)
        return this.fx.convert(amount)
    }

    
    getConvertedFormatted(amount, from, to = null, safeConvert = false){
        if (this.error) return "???"
        var conAmount = (to && to !== from) ? this.convert(amount, from, to, safeConvert) : amount
        return Formatter.money.FormatNumberToString(conAmount, to || from)
    }

}