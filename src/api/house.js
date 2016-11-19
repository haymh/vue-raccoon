export const search = (searchTerms) => {
  console.log(searchTerms);
  return new Promise((fulfill) => {
    setTimeout(() =>
      fulfill([
        {
          address: {
            address1: '3819 Vinyard Ave.',
            address2: '#42',
            address3: '',
            state: 'CA',
            city: 'Pleasanton',
            county: 'idk',
            country: 'US',
            zip: 94566,
          },
          pics: ['http://photos.zillowstatic.com/p_f/ISi3yvrxmnj2l71000000000.jpg',
            'http://photos.zillowstatic.com/p_f/IS2jvvwrekug081000000000.jpg',
            'http://photos.zillowstatic.com/p_f/ISa52ebg17zh291000000000.jpg',
            'http://photos.zillowstatic.com/p_f/ISuctjelacmj081000000000.jpg',
            'http://photos.zillowstatic.com/p_f/ISuwk274vh3gw91000000000.jpg'],
          description: 'po fang zi dou TM mai',
          status: 'Active',
          likes: 2,
          views: 200,
          propertyType: 'Condo',
          hoa: 0,
          built: (new Date()).toString(),
          yearRenovated: new Date(),
          feature: [
            {
              type: 'Parking',
              name: 'Garage',
              value: 2,
            },
          ],
          location: {
            type: 'Point',
            coordinates: [32.8357239, -117.1939502],
          },
          city: 'University City',
          beds: 3,
          baths: 2,
          floors: 1,
          sizeInSF: 2000,
          sizeInSM: 200,
          lotSizeInSF: 8000,
          lotSizeInSM: 800,
          lotSizeInArce: 0.2,
          APN: '123',
          price: 800000,
          unitPriceInSF: 80,
          unitPriceInSM: 800,
          estimatePrice: 880000,
          title: '南北双通透 精装三居室 好位置 仅有契税',
          postDate: '2016-11-01',
          tags: ['Open House', 'Newly Constructed', 'School'],
          visits: 60,
        },
      ])
    , 500);
  });
};

export const findById = (id) => {
  console.log('looking up house id: ', id);
  return new Promise((fulfill) => {
    setTimeout(() =>
      fulfill(
        {
          address: {
            address1: '3819 Vinyard Ave.',
            address2: '#42',
            address3: '',
            state: 'CA',
            city: 'Pleasanton',
            county: 'idk',
            country: 'US',
            zip: 94566,
          },
          pics: ['http://photos.zillowstatic.com/p_f/ISi3yvrxmnj2l71000000000.jpg',
            'http://photos.zillowstatic.com/p_f/IS2jvvwrekug081000000000.jpg',
            'http://photos.zillowstatic.com/p_f/ISa52ebg17zh291000000000.jpg',
            'http://photos.zillowstatic.com/p_f/ISuctjelacmj081000000000.jpg',
            'http://photos.zillowstatic.com/p_f/ISuwk274vh3gw91000000000.jpg'],
          description: 'UC living at it\'s best! Comfort and style abound in this nicely updated, upper corner unit. Relaxing pine views welcome you to the many details of this wonderful home. Property features include: Arched doorways, 14\' vaulted ceilings, Venetian plaster, upgraded kitchen, recessed lighting, new closets with built in dressers, dual pane windows in master, new doors throughout, and even it\'s own laundry room. Storage includes: generous 1 car garage, 16\'x7\' storage unit, and 6\'x17\' finished attic storage.',
          status: 'Active',
          likes: 2,
          views: 200,
          propertyType: 'Condo',
          hoa: 0,
          built: '1960',
          yearRenovated: new Date(),
          feature: [
            {
              type: 'Parking',
              name: 'Garage',
              value: 2,
            },
          ],
          location: {
            type: 'Point',
            coordinates: [32.8357239, -117.1939502],
          },
          city: 'University City',
          beds: 3,
          baths: 2,
          floors: 1,
          sizeInSF: 2000,
          sizeInSM: 200,
          lotSizeInSF: 8000,
          lotSizeInSM: 800,
          lotSizeInArce: 0.2,
          APN: '123',
          price: 800000,
          unitPriceInSF: 80,
          unitPriceInSM: 800,
          estimatePrice: 880000,
          title: '南北双通透 精装三居室 好位置 仅有契税',
          postDate: '2016-11-01',
          tags: ['Open House', 'Newly Constructed', 'School'],
          visits: 60,
        },
      )
    , 500);
  });
};
