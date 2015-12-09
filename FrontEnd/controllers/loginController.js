//This is the way you define controllers
//the main_module variable is defined in MainModule.js file (located in module folder).
//The first argument is the name of the controller. THIS IS IMPORTANT, because you use THIS
//name when you want to use this controller in some view.
//The $scope object is the glue between the view and controller. You use this object to transfer
//data between the view and controller.

// lisäämällä loginFactory luodaan yhteys controllerin ja Factoryn välille
// $location:lla voidaan tehdä näkymänvaihdot (yleensäkkin käskyttää)
main_module.controller('controllerLogin',function($scope,loginFactory,$location){

    
    // This is called when login is pressed in partial_login.html
    $scope.loginClicked = function(){
        console.log('login was pressed');
        
        var temp = {
            username:$scope.user, // nimet mätsättävä user.js:ssä olevien muuttujien kanssa
            password:$scope.pass
        };
        
        var waitPromise = loginFactory.startLogin(temp);
        // Wait the response from server
        waitPromise.then(function(data){
            $location.path('/list'); // menee list-kontekstiin MainModule.js:ssä
            // code inside this block will be called when success response
            // from server recives
        },function error(data){
            $('.error').text('Wrong username or password!'); // 'error' määritetty partial_login.html:ssä. $ = jQuery
        });
    }
    
    
    $scope.registerClicked = function(){
        console.log('register was pressed');
        
        var temp = {
            username:$scope.user, // nimet mätsättävä user.js:ssä olevien muuttujien kanssa
            password:$scope.pass
        };
        
        var waitPromise = loginFactory.startRegister(temp);
        waitPromise.then(success, error);
        
    }
    
});

function success(data){
    alert('New person registered. You can login with your creadintentials');
}

function error(data){
    alert('Registering person failed. Username already in use');
}