/* global google */
window.gmap = (function() {
  const mapEl = document.querySelector('#map');
  const markers = [];

  let map;
  let marker = null;

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
    if (marker) marker.setMap(null);
  }

  function setMaps(value) {
    markers.forEach(marker => marker.setMap(value));
  }

  function setMarker(position) {
    clearMarkers();
    if (marker) {
      marker.setPosition(position);
      marker.setMap(map);
    } else {
      marker = new google.maps.Marker({ position, map });
    }
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
    setMarker,
    setZoom,
    showMarkers,
  };
}());