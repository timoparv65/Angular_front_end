main_module.controller('friendDataController',function($scope,friendDataFactory,$location){
    
    $scope.name = "by Timo Parviainen"; // liittyy direktiivin. Lisätty 18.1.2016
    
    console.log('friedDataController loaded');
    
    friendDataFactory.getFriendData(dataCallback);
    
    $scope.rowClicked = function(id){
    
        friendDataFactory.selected_id = id;
        
        //There is a special replace method which can be used to tell the
        //$location service that the next time the $location service is
        //synced with the browser, the last history record should be replaced
        //instead of creating a new one. This is useful when you want to
        //implement redirection, which would otherwise break the back button
        //(navigating back would retrigger the redirection). To change the
        //current URL without creating a new browser history record you can call:
        // => https://docs.angularjs.org/guide/$location
        
        // menee edit-kontekstiin MainModule.js:ssä.
        // edit-sivu ei mene selaimen historiaan. Estää että taaksepäin mentäessä
        // ei mennä takaisin edit sivulle
        $location.path('/edit').replace();
    }
    
    
    function dataCallback(dataArray){
        
        $scope.friendData = dataArray;
    }
    
    // Search toiminnallisuus
    $scope.search = function(){
        
        console.log('search pressed');
        
        var waitPromise = friendDataFactory.search($scope.search_term);
        
        waitPromise.then(success,error)
    }
    
    function success(response){
        $scope.friendData = response;
    }
    
    function error(response){
        
    }
    
});