const HouseMarkerClassGenerator = () => class HouseMarker extends google.maps.OverlayView {
  constructor(bounds, map, { house, houses, shouldDisplayInfoWindow }) {
    super();

    // Now initialize all properties.
    this.bounds = bounds;
    this.map = map;
    this.house = house;
    this.houses = houses;
    this.shouldDisplayInfoWindow = shouldDisplayInfoWindow;
    this.infoWindow = new google.maps.InfoWindow({
      content: '<span>yay</span>',
      position: new google.maps.LatLng(32.856385, -117.202936),
    });
    this.selected = false;

    // Define a property to hold the image's div. We'll
    // actually create this div upon receipt of the onAdd()
    // method so we'll leave it null for now.
    this.div = null;

    // Explicitly call setMap on this overlay
    this.setMap(map);
  }

  onAdd() {
    const div = document.createElement('div');
    div.style.border = 'none';
    div.style.borderWidth = '0px';
    div.style.position = 'absolute';
    div.style.textAlign = 'center';

    const img = document.createElement('img');
    img.src = './static/small_house.png';
    img.style.width = '20';
    img.style.height = '20';
    div.appendChild(img);

    this.div = div;

    const span = document.createElement('span');
    span.innerHTML =
      `${this.house.address.address1}${this.house.address.address2 ? ` ${this.house.address.address2}` : ''}${this.house.address.address3 ? ` ${this.house.address.address3}` : ''}`;
    span.style.marginLeft = '-1px';
    span.style.display = 'inline-block';
    span.style.position = 'fixed';
    span.style.height = '20px';
    span.style.border = '1px solid green';
    span.style.backgroundColor = 'white';
    span.style.padding = '1px';
    span.style.paddingRight = '3px';
    span.style.whiteSpace = 'nowrap';
    span.style.fontSize = '14px';
    span.style.fontWeight = '500';
    this.div.appendChild(span);

    // Add the element to the "overlayImage" pane.
    const panes = this.getPanes();
    panes.overlayImage.appendChild(this.div);
  }

  draw() {
    // We use the south-west and north-east
    // coordinates of the overlay to peg it to the correct position and size.
    // To do this, we need to retrieve the projection from the overlay.
    const overlayProjection = this.getProjection();

    // Retrieve the south-west and north-east coordinates of this overlay
    // in LatLngs and convert them to pixel coordinates.
    // We'll use these coordinates to resize the div.
    const sw = overlayProjection.fromLatLngToDivPixel(this.bounds.getSouthWest());
    const ne = overlayProjection.fromLatLngToDivPixel(this.bounds.getNorthEast());

    // Resize the image's div to fit the indicated dimensions.
    const div = this.div;
    div.style.left = `${sw.x - 10}px`;
    div.style.top = `${ne.y - 20}px`;
    div.style.width = 'auto';
    div.style.height = '20px';
  }

  onRemove() {
    this.div.parentNode.removeChild(this.div);
  }

  hide() {
    if (this.div) {
      // The visibility property must be a string enclosed in quotes.
      this.div.style.visibility = 'hidden';
    }
  }

  toggle() {
    if (this.div) {
      if (this.div.style.visibility === 'hidden') {
        this.show();
      } else {
        this.hide();
      }
    }
  }

  toggleDOM() {
    if (this.getMap()) {
      // Note: setMap(null) calls OverlayView.onRemove()
      this.setMap(null);
    } else {
      this.setMap(this.map);
    }
  }
};

export default HouseMarkerClassGenerator;
