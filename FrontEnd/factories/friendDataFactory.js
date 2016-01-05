main_module.factory('friendDataFactory',function($resource,$http){
   
    var factory = {};
    factory.selected_id = null;
    
    // In this array we cache the friends information
    // so that once stored in array we won't make any further requests
    factory.friendsArray = [];
    
    // callBackFunction välitetään, koska koodi ei jää odottamaan asynkronisen
    // funktion tulosten valmistumista vaan jatkaa eteenpäin. Jos ja kun tuloksia
    // käytetään ennen kuin ne on valmiita ollaan ongelmissa. CallBackFunktiolla
    // tulokset saadaan käyttöön myöhemmin... frienDataControllerissa callBackFunktiossa
    // päivitetään frienData-taulukkoa...joka on linkitetty partial_dataView-näkymässä
    // => frienData:n päivittyminen triggaa näytön päivityksen ??
    factory.getFriendData = function(callBackFunction){
        
        //Jos friendsArray on tyhjä haetaan data BackEndistä
        if(factory.friendsArray.length === 0){
            
            // lisätty 5.1.2016
            // Set your own headers in request like this. Tänne token
            $http.defaults.headers.common['x-access-token'] = sessionStorage['token'];
            
            //luodaan resurssi
            var resource = $resource('/friends',{},{'get':{method:'GET'}});
            
            // $promise on asynkroninen
            var waitPromise = resource.query().$promise;
            waitPromise.then(function(data){
                
                // kopioi tiedot cacheen
                factory.friendsArray = data;
                callBackFunction(factory.friendsArray);
            },function(error){
                
                // tyhjennä cache
                factory.friendsArray = [];
                callBackFunction(factory.friendsArray);
            });
            
        } else {
            
            callBackFunction(factory.friendsArray);
        }

    }
    
    
    factory.insertData = function(data){
        
        // lisätty 5.1.2016
        $http.defaults.headers.common['x-access-token'] = sessionStorage['token'];
        
        // luo resurssi objektin
        var resource = $resource('/persons',{},{'post':{method:'POST'}});
        // lähetä data POSTilla ja palauta $promise:n
        return resource.post(data).$promise;
    }
    
    
    /**
      *This function searches a person from array containing an id
      *that was stored when user cliked the row in the partial_dataView
      *page. When it finds the correct one from the array, it returns
      *that object.
      */
    factory.getSelectedFriend = function(){
        
        for (var i = 0; factory.friendsArray.length;i++){
            if (factory.friendsArray[i]._id === factory.selected_id){
                return factory.friendsArray[i];
            }
        }
    }
    
    //updates data to the backend
    factory.updateData = function(data){
        
        // lisätty 5.1.2016
        $http.defaults.headers.common['x-access-token'] = sessionStorage['token'];
        
        // luo resurssi objekti
        var resource = $resource('/persons',{},{'put':{method:'PUT'}});
        // lähetä data PUT:illa ja palauta $promise
        return resource.put(data).$promise;
    }
    
    // delete data from the backend
    factory.deleteData = function(data){
        
        // lisätty 5.1.2016
        $http.defaults.headers.common['x-access-token'] = sessionStorage['token'];
        
        // Markus: tämä ei ole välttämätön tässä. Käytetään myöhemmin
        //$http.defaults.headers.common['content-type'] = 'application/json';
        
        // luo resurssi objekti
        var resource = $resource('/persons',{},{'delete':{method:'DELETE'}});
        //lähetä data DELETE:llä ja palauta $promise
        return resource.delete(data).$promise;
    }
    
    //search data from cache ? or backend
    factory.search = function(term){ // term = etsittävä termi
        
        // lisätty 5.1.2016
        $http.defaults.headers.common['x-access-token'] = sessionStorage['token'];
        
        // luo resurssi objekti
        var resource = $resource('/persons/search/',{name:term},{'get':{method:'GET'}});
        //lähetä data QUERY:llä ja palauta $promise (QUERY = kysely)
        return resource.query().$promise;
    }
    
    return factory;
});