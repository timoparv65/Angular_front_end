main_module.controller('deleteController',function($scope){
    console.log('deleteController loaded');
    
    friendDataFactory.getFriendData(dataCallback);
    
    
    
    function dataCallback(dataArray){
        
        $scope.friendData = dataArray;
    }
});