$(document).ready(function(){

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

        var result = $.get( "/get_available_boats/" + data);
        console.log(result);

    });

});