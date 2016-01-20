main_module.controller('deleteController',function($scope,friendDataFactory,Flash,$location){
    console.log('deleteController loaded');
    
    // lisätty 19.1.2016. Navbar toteutettu direktiivillä
    $scope.navbarData = {
		
		urls:['/logout','#/delete','#/insert','#/location','http://www.kaleva.fi'],
		texts:['Logout','Delete','Insert','Your Location','News'],
        classes:['','active','','','']
	}
    
    $scope.deleteArray = [];
    
    friendDataFactory.getFriendData(dataCallback);
    
    function dataCallback(dataArray){
        
        $scope.friendData = dataArray;
    }
    
    //Called when user click one of the checkboxes from table
    //First argument is a event. There we can check if checkbox is selected
    //or not. Index is the index of cliked row in table. Id is the id of 
    //person we want to delete
    // => tämä tehdään kaikille checkboxissa valituille henkilöille
    $scope.addToDelete = function($event, $index, id){
        
        //tarkistaa oliko checkbox:ia klikattu => checked on checkboxin metodi
        //$event.target: The target property can be the element that registered
        //for the event or a descendant of it.
        if($event.target.checked){
           // lisää id tuhottavien listalle
            $scope.deleteArray.push(id);
        }else{
            //poista se listalta, jos checbox:in valinta olikin poistettu
            
            //etsi mistä kohtaa listaa id löytyy
            var temp_index = jQuery.inArray(id, $scope.deleteArray);
            //ja poista se
            // splice: Googlaa javascript array methods
            $scope.deleteArray.splice(temp_index,1); // indeksin osoittamasta kohdasta 1 kpl
        }
        
    }
    
    //kun painetaan "Delete Selected" nappia
    $scope.sendToDelete = function(){
        // ei mitään tuhottavaa
        if($scope.deleteArray.length === 0){
            //lähetetään flash-varoitus
            Flash.create('warning', 'Nothing to delete!', 'custom-class');
        }else{
            // luodaan json objekti tuhottavien listasta
            var temp = {
                forDelete:$scope.deleteArray
            }
            
            var waitPromise = friendDataFactory.deleteData(temp);
            waitPromise.then(success,error);
            
        }
        
    }
    
    function success(){
        
        // tyhjennä cache
        friendDataFactory.friendsArray = [];
        
        // menee list-kontekstiin MainModule.js:ssä.
        // list-sivu ei mene selaimen historiaan. Estää että taaksepäin mentäessä
        // ei mennä takaisin list-sivulle
        $location.path('/list').replace();
    }
    
    function error(response){
        
        Flash.create('warning', response.message, 'custom-class');
    }

});