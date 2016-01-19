main_module.controller('friendDataController',function($scope,friendDataFactory,$location){
    
    $scope.name = "by Timo Parviainen"; // liittyy direktiivin. Lisätty 18.1.2016
    // lisätty 19.1.2016. Liittyy direktiiviin
    $scope.temp = ['Heikki Hela','Risto Mattila','Juha Sipilä','Teuvo Hakkarainen'];
    
    // lisätty 19.1.2016. Navbar toteutettu direktiivillä
    $scope.navbarData = {
        
        urls:['/logout','#/delete','#/insert','#/location','http://www.kaleva.fi'],
		texts:['Logout','Delete','Insert','Your Location','News']
    }
    
    console.log('friedDataController loaded');
    
    friendDataFactory.getFriendData(dataCallback);
    
    $scope.rowClicked = function(id){
    
        friendDataFactory.selected_id = id;
        
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