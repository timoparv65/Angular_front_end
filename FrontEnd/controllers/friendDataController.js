main_module.controller('friendDataController',function($scope,friendDataFactory){
    
    console.log('friedDataController loaded');
    
    //check if factory does not have data
    if(friendDataFactory.friendsArray.length === 0)
    {

        var waitPromise = friendDataFactory.getFriedData();
    
        waitPromise.then(function(data){

            friendDataFactory.friendsArray = data;
            $scope.friendData = data;
        });
        
    }else{
        
        $scope.friendData = friendDataFactory.friendsArray;
    }
    
    $scope.rowClicked = function(id){
        console.log('clikattu riviä, jonka id=' + id);
    }
    
    
});