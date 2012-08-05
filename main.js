var hull = new L.LatLng(-28.6, 23.2);
function initmap() {
    map = new L.Map('map');
    var mapurl="http://{S}tile.cloudmade.com/1a1b06b230af4efdbb989ea99e9841af/999/256/{Z}/{X}/{Y}.png"
    //var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var mapattrib='Map data: cloudmade';
    var osm = new L.TileLayer(osmUrl,{minZoom:2,maxZoom:18,attribution:mapattrib});
    
    map.setView(hull,6);
    map.addLayer(osm);
    
    $.getJSON('test.json', success=function(data) {
	L.geoJson(data, {
	    style: function (feature) {
		return {color: "blue"};
	    },
	    onEachFeature: function (feature, layer) {
		layer.bindPopup(feature.properties.WARDWINNER);
	    }
	}).addTo(map);
    });
}
initmap();