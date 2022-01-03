$(document).ready(function(){
    $("#boat_id").hide();
    var reservation_data = {};
    var config_json = {};
    $("#user_form_wrapper").hide();
    $( "#reserve_button" ).click(function (){
        $("#boat_details_wrapper").hide();
        $("#user_form_wrapper").show();

        config_json = document.getElementById("boat_config_json").innerHTML;
        console.log(config_json);
    });

    var boat_id = document.getElementById("boat_id").innerHTML;

    if (boat_id == 1){
        document.getElementById("boat_details_pic").innerHTML = '<img src="/static/img/tango_730.jfif">';
        document.getElementById("boat_details_long_desc").innerHTML = '<img src="/static/img/tango_730_wnetrze.jfif">';
    }
    if (boat_id == 2){
        document.getElementById("boat_details_pic").innerHTML = '<img src="/static/img/tango_780.jpg">';
        document.getElementById("boat_details_long_desc").innerHTML = '<img src="/static/img/tango_780_wnetrze.jfif">';
    }
    if (boat_id == 3){
        document.getElementById("boat_details_pic").innerHTML = '<img src="/static/img/mariner_20.jpg">';
        document.getElementById("boat_details_long_desc").innerHTML = '<img src="/static/img/mariner_20_wnetrze.jpg">';
    }
    if (boat_id == 4){
        document.getElementById("boat_details_pic").innerHTML = '<img src="/static/img/hansen_348.jpg">';
        document.getElementById("boat_details_long_desc").innerHTML = '<img src="/static/img/hansen_348_wnetrze.jfif">';
    }
    if (boat_id == 5){
        document.getElementById("boat_details_pic").innerHTML = '<img src="/static/img/philia_900.jpg">';
        document.getElementById("boat_details_long_desc").innerHTML = '<img src="/static/img/philia_900_wnetrze.jpg">';
    }
    if (boat_id == 6){
        document.getElementById("boat_details_pic").innerHTML = '<img src="/static/img/delphia_46.jpeg">';
        document.getElementById("boat_details_long_desc").innerHTML = '<img src="/static/img/delphia_46_wnetrze.jpg">';
    }

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