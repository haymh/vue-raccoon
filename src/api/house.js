export default (searchTerms) => {
  console.log(searchTerms);
  return new Promise((fulfill) => {
    setTimeout(() =>
      fulfill([
        {
          id: 1,
          bath: 2,
          bed: 1,
          propertyType: 'Single_Family',
          price: 40000,
        },
        {
          id: 2,
          bath: 1,
          bed: 3,
          propertyType: 'Condo',
          price: 500000,
        },
        {
          id: 3,
          bath: 3,
          bed: 5,
          propertyType: 'Townhouse',
          price: 800000,
        },
        {
          id: 4,
          bath: 4,
          bed: 4,
          propertyType: 'Apartment',
          price: 100000,
        },
      ])
    , 500);
  });
};
