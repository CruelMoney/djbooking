
export default class CountryCurrency {

    getCurrency=(country)=>{
        return new Promise(function(resolve, reject){
            var currency = ""
            var countryTwoLetter = ""

            var domain = "https://restcountries.eu/rest/v2/name/" + country
            
            fetch(domain)
                .then((response)=> {
                    if (response.ok) {
                        var contentType = response.headers.get("content-type");
                        if (contentType && contentType.indexOf("application/json") !== -1) {
                            response.json().then((data)=> {
                                currency = data[0].currencies[0].code;
                                countryTwoLetter = data[0].alpha2Code;
                                resolve({currency, countryTwoLetter})
                            }).catch((error)=> {
                                reject("JSON could not be parsed")
                            })
                        } else {
                            reject("Response not JSON")
                        }
                    } else {
                        response.json().then(function(result) {
                            reject(result)
                        })
                    }
                }).catch((error)=> {
                    reject(error)
                });
        })
    }    

}