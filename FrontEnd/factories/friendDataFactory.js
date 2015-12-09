main_module.factory('friendDataFactory',function($resource){
   
    var factory = {};
    
    // In this array we cache the friends information
    // so that once stored in array we won't make any further requests
    factory.friendsArray = [];
    
    factory.getFriedData = function(){
        
        var resource = $resource('/friends',{},{'get':{method:'GET'}});
        return resource.query().$promise;

    };
    
    
    factory.insertData = function(data){
        
        // luo resurssi objektin
        var resource = $resource('/persons',{},{'post':{method:'POST'}});
        // lähetä data POSTilla ja palauta $promise:n
        return resource.post(data).$promise;
    };
    
    return factory;
});