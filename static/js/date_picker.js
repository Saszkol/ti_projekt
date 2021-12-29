$(document).ready(function(){

    $("#available_boats_list").hide();

    var DateRange = {"date_from" : "", "date_to": ""};

    new DateTimePickerComponent.DatePicker( 'select_date_from');
    new DateTimePickerComponent.DatePicker( 'select_date_to');

    $( "#search_button" ).click(function (){
        var selection_from = document.querySelector( 'div#select_date_from input.date_output' ).value;
        var selection_to = document.querySelector( 'div#select_date_to input.date_output' ).value;

        console.log(selection_from);
        console.log(selection_to);

        DateRange["date_from"] = selection_from;
        DateRange["date_to"] = selection_to;

        data = JSON.stringify(DateRange);

        var result = $.get( "/get_available_boats/" + data, function(data){
            console.log(data);
            if(data != 'error'){
                // unhide ul and for loop and append items to ul
                $("#from_when").hide();
                $("#to_when").hide();
                $("#check").hide();
                $("#available_boats_list").show();
                var count = Object.keys(data).length;
                for (var i = 1; i < count + 1; i++){
                    $("#available_boats_list").append('<div class="single_element_wrapper"><div class="boat_pic"></div><div class="boat_desc"><div class="boat_uri">' + '<a href="http://localhost:5000/boat/' + i + '">' + data[i.toString()]['name'] + '</a>' + '</div><div class="boat_short_description"></div></div></div>');
                }
            }
        });
    });

});