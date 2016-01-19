//Create new directive with name ofExample.
// of = opiframe. Direktiiviä käytetään of-example => Example isolla,
// muuten tulee ofexample, mikä ei ole toivottava tapa.
// Nimeämisessä camelCase syntaksi
main_module.directive('ofExample',function(){
    
    // Create empty objrct. We will fill it with needed
    // information below
    var directive = {};
    
    // First define how our directive can be used using the strict attribute.
    // Possibe values are
    //'A' as attribute
    //'C' as class
    //'E' as element
    //'M' as comment
    // or combination of previous values like 'AE'
    //directive.restrict ='E';
    //directive.restrict ='C';
    directive.restrict ='AEC';
    
    //19.1.2016
    //Create isolated scope for our directive
    //From this poin on our directive CANNOT use parent scope
    directive.scope = {
        
        // Text binding
        userName:'@',
        //userName:'@myname'
        
        //Two way binding. Käytetään esim taulukkojen kanssa
        users:'='
    }
    
    
    // 19.1.2016
    
    // Normally you just override the link function
    //in your directive
    directive.link = function link(scope,elem,attrs){
        
        $(elem).click(function(){
            
            console.log('directive clicked');
            scope.getWeather();
        });
    }
    /*
    //Compile function is called before this directive
    //is rendered on browser window
    // => compile ei voi käyttää direktiivin scopea, mutta link voi
    directive.compile = function(elem,attrs){
        
        // määritetään tyyli, ennen renderöintiä
        //Use jQuery to set background for our directive element
        $(elem).css('background-color','lightgrey');
        
        //Compiler must always return link function
        return function link(scope,elem,attrs){
            
            console.log(scope.userName);
            console.log(scope.users);
        }
    }
    */
    
    // 19.1.2016
    //You can define own controller for your directive
    // => voidaan tehdä direktiivin sisältä esim. http-pyyntö serverille
    directive.controller = function($scope,$http){
        
        console.log('directive controller activated');
        // haetaan sää
        // => ei toimi, koska vaatii API keym
        $scope.getWeather = function(){
            
            $http.get('http://api.openweathermap.org/data/2.5/weather?q={oulu}').
                then(function(data){
                
                    console.log(data);
                    $scope.temp = data.temp; // temp = lämpötila
                
                });
        }
        
        
        
    }
    
    
    //Define the template code
    //directive.template = "<h1>This is my directive{{name}}</h1>";
    // minkälaisen html:n generoi, kun käytetään. Tässä staattinen
    
    // {{}} => tuodaan dataa direktiiville mustashen avulla
    // direktiivi on friendDataControllerin scopessa
    
    directive.templateUrl = "/FrontEnd/directives/content.html";
    
    //We must always return an object from directive!
    return directive;
    
    /*Another way to declare and return directive object
    return {
        restrict:'AEC',
        templateUrl:"/FrontEnd/directives/content.html"
    }*/
    
});