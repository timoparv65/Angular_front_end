// luo Module:n, kts. kuva. Nimetty main_module:ksi.
// Here we create our main module. First argument is the name of the module, the second one
// the '[] array' contains the dependences to other angular modules
var main_module = angular.module('main_module',['ngRoute','ngResource']);

// Create basic configuration for out angular app.
// Configuration includes USUALLY a router for our views.
// The $routerProvider object comes from ngRoute module => liittyy ng-view direktiiviin
main_module.config(function($routeProvider){
    
    // '/' = konteksti
    $routeProvider.when('/',{
        // renderöi ng-view direktiivin omaavaan elementtiin. Angular tekee sisäisesti GET-pyynnön serverille saadakseen 
        templateUrl:'partial_login.html',
        controller:'controllerLogin'
    }).when('/list',{// listaa kaikki ystävät. Kirjoita selaimeen localhost:3000/#/list
        
        templateUrl:'partial_dataView.html',
        controller:'friendDataController'
    });

});