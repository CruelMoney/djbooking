import c from '../constants/constants'
var ActionTypes = c.ActionTypes

/*eslint no-undef: 0*/

export function requestFeatures() {
     olark('api.box.expand');
}

export function registerMenuItem(name, route) {
  return {
    type: ActionTypes.REGISTER_MENU_ITEM,
    name, route
  }
}

export function removeMenuItem(name) {
  return {
    type: ActionTypes.REMOVE_MENU_ITEM,
    name
  }
}