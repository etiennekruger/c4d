

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


$(document).ready(function() {	
    $(':checkbox').click(layerchange);
});


function popup(feature, layer) {
	var html ="<span class='popup'>";
	if (feature.properties != undefined) {
		if (feature.properties.value != undefined){
			html += feature.properties.value;
		}else {
			html += 'some text';
		}
		
	}
	html += "</span>";
	
	return html;
	
    
}

function style(feature) {
    if (typeof(feature.properties.value) != 'undefined') {
	var red = 255*feature.properties.value;
    } else {
	var red = 255;
    }
    var style = {color: '#'+red.toString(16)+'0000'};
    return style;
}

function layerchange() {
    var src = $(this).data('src');
    var layer = layers[src];
    if (typeof(layer) == 'undefined') {
	console.log('adding layer');
	console.log(src);
	$.getJSON(src, success=function(data) {
	    layer = L.geoJson(data, {
		style: function (feature) {
		    return style(feature);
		},
		onEachFeature: function (feature, layer) {
		    layer.bindPopup(popup(feature, layer));
		}
	    }).addTo(map);
	    layers[src] = layer;
	});
    } else {
	console.log('removing layer');
	map.removeLayer(layer);
	delete layers[src];
    }
}




initmap();
