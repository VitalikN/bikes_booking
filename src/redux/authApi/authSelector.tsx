const getIsRefreshing = (state: any) => state.auth.isRefreshing;

const getIsLoggedIn = (state: any) => state.auth.isLoggedIn;

const getName = (state: any) => state.auth.user.name;

const getEmail = (state: any) => state.auth.user.email;

const selectToken = (state: any) => state.auth.token;

const getid = (state: any) => state.auth.user.id;

const authSelector = {
  getIsLoggedIn,
  getIsRefreshing,
  getName,
  getEmail,
  selectToken,
  getid,
};

export default authSelector;
