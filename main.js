var hull = new L.LatLng(-28.6, 23.2);
var map = new L.Map('map');
function initmap() {
   
    var mapurl="http://tile.cloudmade.com/57139bdd766242dbbd46f1b4c1394420/999/256/{z}/{x}/{y}.png"
    var mapattrib='Map data: cloudmade';
    var osm = new L.TileLayer(mapurl,{minZoom:2,maxZoom:18,attribution:mapattrib});
    
    map.setView(hull,6);
    map.addLayer(osm);
    
    
	loadMap(map, 'test.json');
    
}
initmap();

function loadMap(data, map){
	L.geoJson(data, {
			style: function (feature) {
			return {color: "blue"};
			},
			onEachFeature: function (feature, layer) {
			layer.bindPopup(feature.properties.WARDWINNER);
			}
		}).addTo(map);
}


$(document).ready(function() {	
	console.log('load');
	$(':checkbox').click(function() {
		var src = $(this).attr('data-src');
		
	});
});
