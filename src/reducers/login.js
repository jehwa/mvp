import Redux from 'redux';

export const currentShopReducer = (state = null, action) => {
  switch(action.type) {
    case 'CURRENT_SHOP_ID':
      return action.shopId
    default:
      return state
  }
}

export const changeEmptyUserReducer = (state = null, action) => {
  switch(action.type) {
    case 'CHANGE_EMPTY_USER_NAME':
      return action.emptyMessage
    default:
      return state
  }
}

export const changeEmptyPasswordReducer = (state = null, action) => {
  switch(action.type) {
    case 'CHANGE_EMPTY_PASSWORD':
      return action.emptyMessage
    default:
      return state
  }
}


