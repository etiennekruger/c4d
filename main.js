function initmap() {
    layers = {};
    map = new L.Map('map');
    var hull = new L.LatLng(-28.6, 23.2);
    var mapurl='http://tile.cloudmade.com/57139bdd766242dbbd46f1b4c1394420/999/256/{z}/{x}/{y}.png'
    var mapattrib='Map data: cloudmade';
    var osm = new L.TileLayer(mapurl,{minZoom:2,maxZoom:18,attribution:mapattrib});
   
    map.setView(hull,6);
    map.addLayer(osm);
}

function popup(feature, layer) {
    return feature.properties.WARDWINNER;
}

function layerchange() {
    var src = $(this).data('src');
    var layer = layers[src];
    console.log(layers);
    console.log(layer);
    if (typeof(layer) == 'undefined') {
	console.log('adding layer');
	console.log(src);
	$.getJSON(src, success=function(data) {
	    layer = L.geoJson(data, {
		style: function (feature) {
		    return {color: 'blue'};
		},
		onEachFeature: function (feature, layer) {
		    layer.bindPopup(popup(feature, layer));
		}
	    }).addTo(map);
	    layers[src] = layer;
	    console.log(layers);
	});
    } else {
	console.log('removing layer');
	map.removeLayer(layer);
	console.log(layers);
    }
}

initmap();