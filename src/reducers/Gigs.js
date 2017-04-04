import c from '../constants/constants'

var ActionTypes = c.ActionTypes


const initialState = { //define initial state - an empty form
  values:[]
}
const updateOffer = (values, newOffer, newStatus)=>{
  return values.map(g=>{
    if (g.id !== newOffer.gigID) return g
    return {...g, status: newStatus, offer: newOffer}
  })
}

const gigs = (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.FETCH_GIGS_REQUESTED:
      return {
              isWaiting: true
             }
  case ActionTypes.FETCH_GIGS_SUCCEEDED:
      return {
        values: action.gigs,
        isWaiting: false
             }
 case ActionTypes.FETCH_GIGS_FAILED:
     return {
       err: action.err,
       isWaiting: false
            }
  case ActionTypes.GIG_CANCELLED:
     return {
            ...state,
            values: state.values.map(g=> g.id === action.id ? {...g, status: "Cancelled"} : g)
            }
  case ActionTypes.GIG_DECLINED:
    return {
            ...state,
            values: state.values.map(g=> g.id === action.id ? {...g, status: "Declined"} : g)
          }
  case ActionTypes.GIG_OFFER_UPDATED:
      return {
            ...state,
            values: updateOffer(state.values, action.offer, "Accepted")
            }
  default:
    return state
  }
}

export default gigs
