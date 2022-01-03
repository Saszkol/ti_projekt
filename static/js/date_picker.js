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
                    var picture_path = "";
                    if ((i.toString() in data) && data[i.toString()]['id'] == 1){
                        picture_path = '<img src="/static/img/tango_780.jpg">';
                        boat_description = 'Tango 780 Jacht rodzinny, cieszący się dużą popularnością wśród żeglarzy, ceniących komfort i wygodę. Duży kokpit zakończony półokrągłą pawężą, zapewniającą bezpieczeństwo zwłaszcza dla najmłodszych członków załogi. Pomimo pawęży w kokpicie może swobodnie przebywać pięciu żeglarzy. Ponad to z tyłu znajduje się pokład kąpielowy umożliwiający swobodne wchodzenie do wody. Wszystkie szoty sprowadzone są do kokpitu. Kabina podzielona jest na dwa przedziały - dziobowy i kambuzowy. W najwyższym punkcie wysokość w kabinie osiąga 175 cm. Jacht posiada 6 koi dla dorosłych członków załogi, istnieje również możliwość przygotowania koi w mesie na lewej burcie w wersji rozkładanej , 2 osobowej. Jacht może mieć wbudowany silnik stacjonarny. Własności nautyczne tej konstrukcji są znane i cenione przez wielu żeglarzy. Jacht jest bardzo stabilny i podczas złych warunków atmosferycznych "słucha się steru". Dla osób ceniących zwrotność i szybkość jednostki, Tango 780 Family jest idealnym jachtem. ';
                    }
                    else if ((i.toString() in data) && data[i.toString()]['id'] == 2){
                        picture_path = '<img src="/static/img/tango_730.jfif">';
                        boat_description = 'Tango 730 był pierwszym naprawdę szybkim jachtem, który w latach 90. XX wieku zmienił mazurskie żeglarstwo. Jednostka ta w czarterze jest dość tania, dlatego polecamy ją zwłaszcza studentom. Dobre właściwości nautyczne i obszerny kokpit rekompensują ograniczone miejsce w środku i ubogie wyposażenie jachtu.';
                    }
                    else if ((i.toString() in data) && data[i.toString()]['id'] == 3){
                        picture_path = '<img src="/static/img/mariner_20.jpg">';
                        boat_description = 'Mariner 20 to 6-cio metrowa łódka mimo niewielkich rozmiarów i wagi może zaskoczyć statecznością , zwrotnością i pewnością w prowadzeniu. Wyposażona w miecz uchylny .  Niezależnie od wersji zawsze będzie dzielnym jachcikiem, który dzięki swoim rozmiarom da się naprawdę łatwo transportować za średnim samochodem osobowym. Kabina Marinera 20 to w 100% wykorzystana przestrzeń, by dać 4-ro osobowej załodze minimum komfortu. Zawiera 4 duże koje, dwa blaty kambuzowe (kuchenka i zlew) oraz stół na skrzyni mieczowej. Istnieje możliwość chowania  chemicznego WC w specjalnie przygotowanym do tego miejscu w kabinie. Pokład jachtu nawiązuje stylistyką do pozostałych Marinerów. Duże okna i luk dziobowy zapewniają znakomite oświetlenie i wentylację. Takielunek jachtu to typowa ułamkowa konstrukcja. Jacht jest wyposażony w roler foka, bramkę do kładzenia masztu i inne urządzenia ułatwiające turystyczną żeglugę . Przygotowany do aktywnej żeglugi duży kokpit jest samoodpływowy, wyposażony w dwie bakisty pod ławkami. ';
                    }
                    else if ((i.toString() in data) && data[i.toString()]['id'] == 4){
                        picture_path = '<img src="/static/img/hansen_348.jpg">';
                        boat_description = 'HANSE 348 Oddajemy do państwa dyspozycji sprawdzony na Bałtyku jacht Hanse 348. Jest to bezpieczna i  łatwa w manewrowaniu portowym jednostka. Oferowany przez nas model wyróżnia się wspaniałymi właściwościami nautycznymi. Wszystko to w połączeniu z właściwie dobranym ożaglowaniem pozwala osiągać doskonałe wyniki na wodzie.';
                    }
                    else if ((i.toString() in data) && data[i.toString()]['id'] == 5){
                        picture_path = '<img src="/static/img/philia_900.jpg">';
                        boat_description = 'PHILA 900 Jacht przeznaczony jest dla ośmioosobowej załogi. Posiada zamykaną kabinę dziobową, dwie kabiny rufowe oraz kabinę z WC. Przestronne wnętrze oraz wygodny kambuz zapewniają komfort podczas długich rejsów. Jacht posiada zbiornik na wodę 100 l, ogrzewanie Eberspaher, lodówkę, radio oraz silnik zaburtowy o mocy 8 KM';
                    }
                    else if ((i.toString() in data) && data[i.toString()]['id'] == 6){
                        picture_path = '<img src="/static/img/delphia_46.jpeg">';
                        boat_description = 'Delphia 46cc jest jachtem przeznaczonym dla klientów ceniących sobie wygodę żeglowania. Do budowy jachtu używane są najwyższej jakości materiały oraz zastosowano najnowocześniejsze rozwiązania elektroniczne. Ten ekskluzywny model z centralnym kokpitem zapewnia komfort nawet najbardziej wymagającym klientom. Obszerny kokpit umożliwia wygodny odpoczynek pod żaglami sześciu osobom. Duży tekowy pokład z platformą kąpielową zachęca do korzystania zarówno z kąpieli słonecznych, jak i wodnych. Delphia 46cc posiada przestronne wnętrze z wszelkimi udogodnieniami, jakich można oczekiwać od luksusowego jachtu. Deck saloon, w którym znajduje się duży stół z kanapami, pozwala swoim gościom podziwiać widok za oknami również podczas posiłku, czy też odpoczynku wewnątrz jachtu. W pełni wyposażona kuchnia umożliwia przygotowanie nawet najbardziej wykwintnych posiłków.  Delphia 46cc posiada dwie duże kabiny z łazienkami. Armatorska kabina rufowa z dużą łazienką,  fotelami i miejscami do wypoczynku pozwala poczuć się na jachcie jak w domu. Gościnna kabina dziobowa również wyposażona jest we własną łazienkę z osobnym prysznicem. Pod pokładem znajduje się dodatkowa łazienka w części dziennej, a także szafy, które pozwalają pomieścić wszelkie bagaże gości.  Jacht zaprojektował światowej sławy projektant Andrzej Skrzat. Stylizacja eleganckiego wnętrza to projekt cenionej w branży jachtowej Birgit Schnaase ze studia projektowego ';
                    }
                    if ((i.toString() in data)){
                        $("#available_boats_list").append('<div class="single_element_wrapper"><div class="boat_pic">' + picture_path + '</div><div class="boat_desc"><div class="boat_uri">' + '<a href="http://localhost:5000/boat/' + i + '">' + data[i.toString()]['name'] + '</a>' + '</div><div class="boat_short_description">' +   boat_description   + '</div></div></div>');
                    }
                }
            }
        });
    });

});