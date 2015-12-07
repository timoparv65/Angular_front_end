// $resource objektilla lähetetään pyyntöjä serverille. Sillä on dependency
// kts. Google: angular $resource => vaatii ngResource moduulin lisäämisen.
// onnistuu myös $http objektilla

// Factorille annetty nomi loginFactory
main_module.factory('loginFactory',function($resource){
    
    var factory = {};
    
    // This function can be called from ANY controller using this factory
    // implementation
    factory.startLogin = function(data){
        
        console.log(data);
        // create a resource for context '/friends/login'
        var req = $resource('/friends/login',{},{'post':{method:'POST'}}); // menee kontekstiin /friends/login BackEnd:ssa
        // Use POST method to send the username and password to above context
        // Note that we return an promise object from here
        // => asynkrooninen lähetys. $promise sisältää tiedon onnistuiko vai epäonnistuiko operaatio BackEndissä
        
        return req.post(data).$promise;
    };
    
    
    //Factory must always return an object!!!!
    return factory;
    
});