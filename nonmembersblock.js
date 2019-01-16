function addGeoStyleho(GeoStyleho) {
	if (ning.CurrentProfile === null) {
		var geostyleElementho = document.getElementById('geo_styles_js_ho');
		if (!geostyleElementho) {
			geostyleElementho = document.createElement('style');
			geostyleElementho.type = 'text/css';
			geostyleElementho.id = 'geo_styles_js_ho';
			document.getElementsByTagName('head')[0].appendChild(geostyleElementho);
		}
		geostyleElementho.appendChild(document.createTextNode(GeoStyleho));
	}
}
addGeoStyleho('BODY DIV#nonmembers{position:fixed!important;top:0px!important;bottom:0px!important;left:0px!important;right:0px!important;height:100%!important;width:100%!important;z-index:9999!important;display:block!important;}'); 
