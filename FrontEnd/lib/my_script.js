$(document).ready(function(){
	
    // 20.1.2016 luodaan käsittelijä getBtn-painikkeelle
    // kts: Geocoder class
    // => https:developers.google.com/maps/documentation/javascript/reference#Geocoder
    
    $('#getBtn').click(function(){
       
        var my_address = $('#osoite').val();
        //console.log(my_address);
        
        var geocoder = new google.maps.Geocoder();
        
        // kts. GeocoderRequest object specification
        var geoCodeRequest = {
            address:my_address
        }
        
        geocoder.geocode(geoCodeRequest,function(response,status){
            
            if(status === google.maps.GeocoderStatus.OK){
                
                //console.log(response);
                var data = response[0];
                var lat = data.geometry.location.lat();
                var lng = data.geometry.location.lng();
                var latlng = new google.maps.LatLng(lat,lng);
                
                var mapProp = {
		          center:latlng,
		          zoom:15,
		          mapTypeId:google.maps.MapTypeId.ROADMAP
	           };
                
	           var map = new google.maps.Map(my_map,mapProp);
                
            }else{
                
                alert(status);
            }
            
        });
        
    });
    
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