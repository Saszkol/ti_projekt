$(document).ready(function(){

    new DateTimePickerComponent.DatePicker( 'select_date_from');


    new DateTimePickerComponent.DatePicker( 'select_date_to');

    var selection_from = document.querySelector( 'div#select_date_from input.date_output' ).value;

    var selection_to = document.querySelector( 'div#select_date_to input.date_output' ).value;

    $( "#search_button" ).click(function (){
        console.log(selection_from)
        console.log(selection_to)
    });

});