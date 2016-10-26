export const user = (state) => {
  console.log('getter user');
  return {
    id: state.user.id,
    nickName: state.user.nickName,
    isTemp: state.user.isTemp,
    favoriteHouses: state.user.favoriteHouses,
    searches: state.user.searches,
    userRooms: state.user.userRooms,
    avatar: state.user.avatar,
  };
};

export const allHouses = state => state.houses.all;
export const filterResults = state => state.houses.filterResults;
export const lastFilter = state => state.houses.lastFilter;
export const userId = state => state.user.id;
export const nickName = state => state.user.nickName;
export const userRooms = state => state.user.userRooms;
