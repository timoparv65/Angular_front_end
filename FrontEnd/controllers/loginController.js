//This is the way you define controllers
//the main_module variable is defined in MainModule.js file (located in module folder).
//The first argument is the name of the controller. THIS IS IMPORTANT, because you use THIS
//name when you want to use this controller in some view.
//The $scope object is the glue between the view and controller. You use this object to transfer
//data between the view and controller.
main_module.controller('controllerLogin',function($scope,loginFactory){
    
    //var user = $scope.user;
    //$scope.pass = "halituli"; // luodaan controllerissa muuttuja, liitetään scope-objektiin
    
    // This is called when login is pressed in partial_login.html
    $scope.loginClicked = function(){
        console.log('login was pressed');
        
        var temp = {
            username:$scope.user,
            password:$scope.pass
        };
        
        loginFactory.startLogin(temp);
    };
    
    $scope.registerClicked = function(){
        console.log('register was pressed');
    };
    
});