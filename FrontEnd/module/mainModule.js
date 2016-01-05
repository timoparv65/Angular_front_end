// luo Module:n, kts. kuva. Nimetty main_module:ksi.
// Here we create our main module. First argument is the name of the module, the second one
// the '[] array' contains the dependences to other angular modules
var main_module = angular.module('main_module',['ngRoute','ngResource','flash']);

// 4.1.2016
//This function will check if user is logged in or not. This function is used
//in the router below in resolved attribute
// =>$q = yleisin promise implementaatio (q-interface)
// => $promise = tehdään pyynnöt Back Endiin
function loginRequired($q,$resource,$location){
    
    //Create a promise object. Can be in two states: suceed or not
    var deferred = $q.defer();
    
    // promise joko onnistuu tai epäonnistuu
    //$promise tsekkaa mikä oli statuskoodi vastauksessa
    $resource('/isLogged').query().$promise.then(
    // Success function
    function success(){
        
        // Mark the promise to be solved (or resolved)
        deferred.resolve();
        return deferred; // palauta promise objekti
    // Fail function
    },function fail(){
        
        //Mark promise to be failed
        deferred.reject();
        // Go back to root context
        $location.path('/');
        return deferred;
    });
}


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
        controller:'friendDataController',
        
        // 4.1.2016
        // sääntö joka oikeuttaa käyttäjää tulemaan tähän kontekstiin
        // loginRequired on funktio, joka tehdään itse
        // => ei korjaa täysin, koska voidaan BACKilla palata /list:iin, kun ollaan
        //    ekana logattu sisään ja sitten ulos...sitten BACK-nappula...ja palataan /list-sivulle...joka on virhe
        // => ongelmana suorat linkit partial_dataview.html:ssä. Korjataan myöhemmin
        resolve:{loginReguired:loginRequired}
        
    }).when('/insert',{// lisää ystävä
        
        templateUrl:'partial_addView.html',
        controller:'addController',
        resolve:{loginReguired:loginRequired}
        
    }).when('/delete',{//poistaa useita ystäviä kerrallaan
        
        templateUrl:'partial_deleteView.html',
        controller:'deleteController',
        resolve:{loginReguired:loginRequired}
        
    }).when('/edit',{// editoi ystävän tietoja
        
        templateUrl:'partial_editView.html',
        controller:'editController',
        resolve:{loginReguired:loginRequired}
        
    });
});