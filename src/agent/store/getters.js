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
export const filterResults = state => state.houses.filterResults;
export const lastFilter = state => state.houses.lastFilter;
export const searchTerms = state => state.houses.searchTerms;

// user
export const userId = state => state.user.id;
export const nickname = state => state.user.nickname;
export const userRooms = state => state.user.userRooms;

// app
export const showSideBar = state => state.app.showSideBar;
export const snackbar = state => state.app.snackbar;

// share
export const selectedCustomers = state => state.share.selectedCustomers;
export const selectedHouses = state => state.share.selectedHouses;
export const byFilter = state => state.share.byFilter;
export const shareId = state => state.share.uid;
export const shareEmail = state => state.share.email;
export const query = state => state.share.query;

// map
export const showCluster = state => state.map.showCluster;
export const cluster = state => state.map.cluster;
export const outline = state => state.map.outline;
export const housesOnMap = state => state.map.housesOnMap;
