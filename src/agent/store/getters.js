export const user = (state) => {
  console.log('getter user');
  return {
    id: state.user.id,
    nickname: state.user.nickname,
    isTemp: state.user.isTemp,
    favoriteHouses: state.user.favoriteHouses,
    searches: state.user.searches,
    userRooms: state.user.userRooms,
    avatar: state.user.avatar,
    displayName: state.user.displayName,
  };
};
// house
export const allHouses = state => state.houses.all;
export const hoveredHouse = state => state.houses.hovered;
export const selectedHouses = state => state.houses.selectedHouses;
export const filterResults = state => state.houses.filterResults;
export const lastFilter = state => state.houses.lastFilter;
export const searchTerms = state => state.houses.searchTerms;

// user
export const userId = state => state.user.id;
export const nickname = state => state.user.nickname;
export const userRooms = state => state.user.userRooms;

// app
export const showSideBar = state => state.app.showSideBar;

// share
export const selectedCustomers = state => state.share.selectedCustomers;
