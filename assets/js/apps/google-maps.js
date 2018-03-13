/* global google */
window.gmap = (function() {
  const mapEl = document.querySelector('#map');
  const markers = [];

  let map;

  window.initMap = () => {
    map = new google.maps.Map(mapEl, {
      center: { lat: 0, lng: 0 },
      zoom: 4,
      gestureHandling: 'cooperative',
    });
    if (window.gmap) window.gmap.map = map;
  };

  function addMarker(position) {
    markers.push(new google.maps.Marker({ position, map }));
  }

  function clearMarkers() {
    hideMarkers();
    markers.length = 0;
  }

  function hideMarkers() {
    setMaps(null);
  }

  function setMaps(value) {
    markers.forEach(marker => marker.setMap(value));
  }

  function setZoom(zoom) {
    map.setZoom(zoom);
  }

  function showMarkers() {
    setMaps(map);
  }

  return {
    addMarker,
    clearMarkers,
    hideMarkers,
    setZoom,
    showMarkers,
  };
}());