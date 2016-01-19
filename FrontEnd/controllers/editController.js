main_module.controller('editController',function($scope,Flash,friendDataFactory,$location){
    console.log('editController loaded');
    
    var selectedFriend = friendDataFactory.getSelectedFriend();

    // lisätty 19.1.2016. Navbar toteutettu direktiivillä
    $scope.navbarData = {
		
		urls:['/logout','#/delete','#/insert','#/location','http://www.kaleva.fi'],
		texts:['Logout','Delete','Insert','Your Location','News']
	}
    
    
    $scope.id = selectedFriend._id;
    // vie näytön (partial_editView.html) name/address/age-kenttiin tietokannassa olevan nimen
    $scope.name = selectedFriend.name;
    $scope.address = selectedFriend.address;
    $scope.age = selectedFriend.age;
    
    // kun painetaan save-nappia partial_editView-näytössä
    $scope.savePersonClicked = function(){
        // luodaan json objekti
        temp = {
            id:$scope.id,
            name:$scope.name,
            address:$scope.address,
            age:$scope.age
        };
        
        var waitPromise = friendDataFactory.updateData(temp);
        
        waitPromise.then(success,error);
    };
    
    function success(){
        
        // tyhjennä cache
        friendDataFactory.friendsArray = [];
        
        // menee list-kontekstiin MainModule.js:ssä.
        // list-sivu ei mene selaimen historiaan. Estää että taaksepäin mentäessä
        // ei mennä takaisin list-sivulle
        $location.path('/list').replace();
    };
    
    function error(response){
        
        Flash.crete('danger', response.message, 'custom-class');
    };
    
});