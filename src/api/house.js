export default (searchTerms) => {
  console.log(searchTerms);
  return new Promise((fulfill) => {
    setTimeout(() =>
      fulfill([
        {
          id: 1,
          price: 40000,
        },
        {
          id: 2,
          price: 500000,
        },
        {
          id: 3,
          price: 800000,
        },
        {
          id: 4,
          price: 100000,
        },
      ])
    , 500);
  });
};
