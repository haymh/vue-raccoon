const PriceOverlayClassGenerator = () => class PriceOverlay extends google.maps.OverlayView {
  constructor(bounds, map, markerRef, { house, houses }) {
    super();

    // Now initialize all properties.
    this.bounds = bounds;
    this.map = map;
    this.marker = markerRef;
    this.house = house;
    this.houses = houses;

    // Define a property to hold the image's div. We'll
    // actually create this div upon receipt of the onAdd()
    // method so we'll leave it null for now.
    this.div = null;

    // Explicitly call setMap on this overlay
    this.setMap(map);
  }

  onAdd() {
    const div = this.div = document.createElement('div');
    div.style.borderColor = 'black';
    div.style.borderWidth = '1px';
    div.style.borderStyle = 'solid';
    div.style.position = 'absolute';
    div.style.backgroundColor = '#ccc';
    div.style.padding = '2px';

    const house = this.house;
    const span = document.createElement('span');
    span.innerHTML = `$${house.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} ${house.beds} bd / ${house.baths} ba`;
    span.style.fontWeight = 'bold';
    span.style.whiteSpace = 'nowrap';
    div.appendChild(span);

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
    div.style.left = `${sw.x + 20}px`;
    div.style.top = `${ne.y - 20}px`;
    div.style.width = 'auto';
    div.style.height = 'auto';
  }

  onRemove() {
    this.div.parentNode.removeChild(this.div);
  }

  remove() {
    this.setMap(null);
  }
};

export default PriceOverlayClassGenerator;
