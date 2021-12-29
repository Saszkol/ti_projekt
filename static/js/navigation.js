$(document).ready(function(){
    $("#boat_config_json").hide();

    $( "#reservation" ).click(function (){
            window.location.replace('http://localhost:5000/reservation')
    });
    $( "#main" ).click(function (){
            window.location.replace('http://localhost:5000/')
    });
});