export const changeEmptyUserName = (emptyMessage) => ({
  type: 'CHANGE_EMPTY_USER_NAME',
  emptyMessage
});

export const changeEmptyPassword = (emptyMessage) => ({
  type: 'CHANGE_EMPTY_PASSWORD',
  emptyMessage
});

export const currentShopId = (shopId) => ({
  type: 'CURRENT_SHOP_ID',
  shopId
})

export const searchShopId = (username) => {
  return (dispatch) => {
    fetch(`http://localhost:3003/shop/login/${username}`)
      .then(res => res.json())
      .then(json => dispatch(currentShopId(json.id)))
      .catch(err => console.log(err, 'cannot set get request'));
  }
}

