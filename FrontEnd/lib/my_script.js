$(document).ready(function(){
	
	console.log('This is ready');
    // Get location information
	navigator.geolocation.getCurrentPosition(success, error);
	
    // Google: Google map api reference
    // developers.google.com/maps/documentation/javascript/reference
    
	function success(position){
    // LatLng on luokka => vaatii new
	  var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	  var mapProp = {
		center:latlng,
		zoom:15,
		mapTypeId:google.maps.MapTypeId.ROADMAP // kartan tyyppi
	  };
	  var map=new google.maps.Map(document.getElementById("my_map"),mapProp);

        // piirretään markkeri. Voi piirtää niin monta kuin haluaa
        // katso documentaatiosta Marker Class
      var marker = new google.maps.Marker({
          position: latlng, 
          map: map,  // mihin karttaan piirretään
          title:"You are here! (at least within a "+position.coords.accuracy+" meter radius)"
  })
		
	}
	
	function error(){
		
		console.log("Geolocation not supported by browser");
	}
	
});