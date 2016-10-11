export const user = (state) => {
  console.log('getter user');
  return {
    id: state.user.id,
    isTemp: state.user.isTemp,
    favoriteHouses: state.user.favoriteHouses,
    searches: state.user.searches,
  };
};

export const allHouses = state => state.houses.all;
export const filterResults = state => state.houses.filterResults;
export const lastFilter = state => state.houses.lastFilter;
