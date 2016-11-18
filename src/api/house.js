export default (searchTerms) => {
  console.log(searchTerms);
  return new Promise((fulfill) => {
    setTimeout(() =>
      fulfill([
        {
          media: ['http://photos.zillowstatic.com/p_f/ISi3yvrxmnj2l71000000000.jpg',
            'http://photos.zillowstatic.com/p_f/IS2jvvwrekug081000000000.jpg',
            'http://photos.zillowstatic.com/p_f/ISa52ebg17zh291000000000.jpg',
            'http://photos.zillowstatic.com/p_f/ISuctjelacmj081000000000.jpg',
            'http://photos.zillowstatic.com/p_f/ISuwk274vh3gw91000000000.jpg'],
          price: 800000,
          bed: 3,
          bath: 2,
          sqft: 1244,
          title: '南北双通透 精装三居室 好位置 仅有契税',
          sqftPrice: 69,
          yearBuilt: 2004,
          postDate: '2016-11-01',
          lotSize: 0,
          hoa: 0,
          status: 'Active',
          tags: ['Open House', 'Newly Constructed', 'School'],
          views: 200,
          visits: 60,
          streetNumber: 3819,
          address1: 'Vinyard Ave.',
          address2: '#42',
          state: 'CA',
          city: 'Pleasanton',
          zip: 94566,
          like: true,
          propertyType: 'Condo',
        },
      ])
    , 500);
  });
};
