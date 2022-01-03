$(document).ready(function(){
    var reservation_data = {};
    var config_json = {};
    $("#user_form_wrapper").hide();
    $( "#reserve_button" ).click(function (){
        $("#boat_details_wrapper").hide();
        $("#user_form_wrapper").show();

        config_json = document.getElementById("boat_config_json").innerHTML;
        console.log(config_json);
    });

    $( "#accept_button" ).click(function (){
        reservation_data['name'] = document.getElementById("name").value;
        reservation_data['surname'] = document.getElementById("surname").value;
        reservation_data['email'] = document.getElementById("email").value;
        reservation_data['phone'] = document.getElementById("phone").value;
        reservation_data['config_json'] = config_json.trim();

        console.log(reservation_data)

        data = JSON.stringify(reservation_data);

        var result = $.get( "/accept_reservation/" + data, function(data){
            console.log(data);

            if (data == 'ok'){
                window.location.replace('http://localhost:5000/result_ok')
            }
            else {
                window.location.replace('http://localhost:5000/result_error')
            }
        });
    });
});