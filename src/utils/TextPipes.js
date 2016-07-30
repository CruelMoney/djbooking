
//Will insert / in between values
export function datePipe(lastValue, value){
  if ((value.substring(value.length -1) === "/"
   && (lastValue.substring(lastValue.length -1) === "/"))) {
    return lastValue
  }
  switch (value.length) {
  case 2:
    //The case that we deleted something, return
    if (lastValue.length === 3) {
      return value.substring(0, value.length-1)
    }

    return (value + "/")

  case 5:
    //The case that we deleted something
    if (lastValue.length === 6) {
      return value.substring(0, value.length-1)
    }

    return (value + "/")


  default:
    //If trying to type anything else than numbers
    if (isNaN(value.substring(value.length -1)) && (value.substring(value.length -1) !== "/") ) {
      return lastValue
    }
    return value}

}
