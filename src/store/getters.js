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
  };
};

export const allHouses = state => state.houses.all;
export const selectedHouse = state => state.houses.selected;
export const currentHouse = state => state.houses.current;
export const filterResults = state => state.houses.filterResults;
export const lastFilter = state => state.houses.lastFilter;
export const userId = state => state.user.id;
export const nickname = state => state.user.nickname;
export const userRooms = state => state.user.userRooms;
