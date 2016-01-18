//Create new directive with name ofExample
main_module.directive('ofExample',function(){ // of = opiframe. Direktiiviä käytetään of-example => Example isolla, muuten tulee ofexample, mikä ei ole toivottava tapa
    
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
    //Define the template code
    //directive.template = "<h1>This is my directive{{name}}</h1>"; // minkälaisen html:n generoi, kun käytetään. Tässä staattinen
    // {{}} => tuodaan dataa direktiiville mustashen avulla
    // direktiivi on friendDataControllerin scopessa
    
    directive.templateUrl = "/FrontEnd/directives/content.html";
    
    //We must always return an object from directive!
    return directive;
    
});