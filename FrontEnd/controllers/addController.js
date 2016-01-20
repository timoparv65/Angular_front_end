main_module.controller('addController',function($scope,Flash,friendDataFactory){
    
    // lisätty 19.1.2016. Navbar toteutettu direktiivillä
    $scope.navbarData = {
		
		urls:['/logout','#/delete','#/insert','http://www.kaleva.fi'],
		texts:['Logout','Delete','Insert','News'],
        classes:['','','active','','']
	}
    
    console.log('addController loaded');
    
    //Funktiototeutus Save-nappulan painallukselle partial_addView.html ikkunassa
    $scope.savePersonClicked = function(){
        console.log("Save was pressed");
        // estetään Save-napin painaminen sillä välin kun tiedot tallennetaan tietokantaan
        $('#savePerson').attr("disabled", true);
        
        // temp muuttujien nimet oltava samat kuin Person määrittelyssä database.js:ssä
        var temp = {
            name:$scope.name,
            address:$scope.address,
            age:$scope.age
        };
        
        if(temp.name.length === 0 || temp.address.length === 0 || temp.age.length === 0){
            
            alert('Need more data!');
            return;
        }
        
        var waitPromise = friendDataFactory.insertData(temp);

        waitPromise.then(function(response){
            // queries.js/exports.saveNewPerson: palauttaa data nimisen muuttujan responsessa.
            // Talletetaan se friendsArray:hyn
            friendDataFactory.friendsArray.push(response.data);
            Flash.create('success', 'New friend added', 'custom-class');
            
            $scope.name = "";
            $scope.address = "";
            $scope.age = "";
            
            // sallitaan Save-napin painaminen
            $('#savePerson').attr("disabled", false);
        },function(error){
            
            Flash.create('warning', 'Failed to add friend!', 'custom-class');
            // sallitaan Save-napin painaminen
            $('#savePerson').attr("disabled", false);
        });
        
    };
    
});