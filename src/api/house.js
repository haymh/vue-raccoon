export default (searchTerms) => {
  console.log(searchTerms);
  return new Promise((fulfill) => {
    setTimeout(() =>
      fulfill([
        {
          id: 1,
        },
        {
          id: 2,
        },
      ])
    , 500);
  });
};
