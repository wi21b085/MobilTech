
//hier appenden wir die Werte in td ein und dann alle in einem tr appenden
function ladeVerlauf(verlauf, oid) {
    if (verlauf.order_id == oid) {
        dataRow = $('<tr>').appendTo($('#' + oid));
        dataRow.append($('<td>').text(verlauf.datum));
        dataRow.append($('<td>').text(verlauf.order_id));
        dataRow.append($('<td>').text(verlauf.produkt_name));
        dataRow.append($('<td>').text(verlauf.menge_produkt));
        dataRow.append($('<td>').text(verlauf.preis_produkt));
        dataRow.append($('<td>').text(verlauf.preis_produkt * verlauf.menge_produkt));
    }
}


//hier machen wir ein ajax call durch request handler mit methode kassa um die user daten wie username, email, vorname .. bekommen.
let config_user = {
    url: "../../backend/logic/requestHandler.php",
    type: "GET",
    dataType: "json",
    data: {
        method: "kassa"
    },
    success: function (response) {
        if (response.id !== "false") {
            //hier wird eine tabelle erstellt  mit dem funktion userdaten() die nimmt den response als paramenter mit
            userdaten(response);
            console.log(response)
        } else {
            //wenn der user nicht eingeloggt ist dann ist der User zur login geschickt
            window.location = "login.html"
            console.log(response)
        }
    },
    error: function () {
        $('.error').append('<center><div class="alert alert-danger" role="alert" style="width:50%;">The data could not be loaded! :(</div></center>');
    }
};

$.ajax(config_user);

//hier werden wir die user daten in respektiven id die in html bereits erstellt wurden.
function userdaten(response) {
    $('#vorname').html('Vorname: ' + response.vorname);
    $('#nachname').html('Nachname: ' + response.nachname);
    $('#email').html('Email: ' + response.email);
    $('#adresse').html('Adresse: ' + response.adresse);
    $('#plz').html('PLZ: ' + response.plz);
    $('#ort').html('Stadt: ' + response.ort);
}

//hier machen wir ein ajax call durch request handeler mit methode viewVerlauf
let url = "../../backend/logic/requestHandler.php";

let config = {
    url: url,
    type: "GET",
    dataType: "json",
    data: {
        method: "viewVerlauf",
    },
    success: function (response) {
        console.log(response);
        //wenn wir eine success response habe dann erstellen wir pro order eine neue Tabelle
        if (response.success !== false) {
            //hier machen wir eine globale oid variable
            let oid = 0;
            //hier machenc wir ein gesamptpreis globale variable
            let gesamtpreis = 0;
            //hier machen wir ein table global variable
            let table = null;
            //hier iterieren durch den response
            for (let i in response) {
                let verlauf = response[i];
                console.log(verlauf);
                if (verlauf.gesamtpreis !== 0) {


                //hier wird überprüft ob das order_id von response nicht das selbe wie das globale oid ist
                if (verlauf.order_id !== oid) {
                    if (oid != 0) {
                        let dataRow2 = $('<tr class="test">').appendTo($('#' + oid));
                        let $button = $('<button>')
                        $button.attr("class", "btn download")
                        $button.attr("id", oid)
                        $button.on("click", function () {
                            let $btn_oid = $(this).attr("id");
                            $(".table").hide();
                            $("#table" + $btn_oid).show();
                            $("#footer").hide();
                            $("#navbar").hide();
                            window.print()
                            window.location = "viewVerlauf.html";
                        })

                        //hier appenden wir immer eine tr zeile die immer summe und download button enthält
                        dataRow2.append($('<td>').append($button.append('<i class="fa fa-download"></i>Download</button>')));
                        dataRow2.append($('<td>').text(""));
                        dataRow2.append($('<td>').text(""));
                        dataRow2.append($('<td>').text(""));
                        dataRow2.append($('<td>').append('<b>' + 'Summe:' + '</b>'));
                        dataRow2.append($('<td>').append('<b>' + gesamtpreis + '€' + '</b>'));
                        $(table).append(dataRow2);
                        $(table).attr('id', "table" + oid);

                    }
                    //wenn die oid nicht gleich wie das von der response dann wird oid überschrieben
                    oid = verlauf.order_id
                    //gesamtpreis wird wieder auf null gesetz
                    gesamtpreis = 0;
                    //hier wird eine neue tablle erstellet
                    table = $('<table>').addClass('table table-striped');
                    //hier appenden wir das thead in table
                    let thead = $('<thead>').appendTo(table);
                    let headerRow = $('<tr>').appendTo(thead);
                    headerRow.append($('<th>').text('DATUM'));
                    headerRow.append($('<th>').text('ORDER_ID'));
                    headerRow.append($('<th>').text('PRODUKT'));
                    headerRow.append($('<th>').text('MENGE'));
                    headerRow.append($('<th>').text('PREIS'));
                    headerRow.append($('<th>').text('PREIS * STÜCK'));
                    //jede tbody wird eine id mit dem Wert von verlauf.order_id haben das wird uns bei der wieder erstellung von eine neue tabelle helfen
                    table.append($('<tbody id=' + verlauf.order_id + '></tbody>'));
                    //wir appenden die neue table auf dem div mit dem id viewVerlaufTable
                    $('#viewVerlaufTable').append(table);
                }
                //hier wird die summe alle produkten mit (preis*menge)
                gesamtpreis += verlauf.preis_produkt * verlauf.menge_produkt;

                //hier wird das ladeVerlauf ausgeführt
                if (verlauf.menge_produkt !== 0) {
                    ladeVerlauf(verlauf, oid);
                }
            }
            }

            if (oid != 0) {
                //hier appenden wir das letzte tr zu dem tabelle 
                let dataRow2 = $('<tr class="test">').appendTo($('#' + oid));
                let $button = $('<button>')
                //hier geben wir zu dem button die class btn und download
                $button.attr("class", "btn download")
                //hier geben wir die oid zu jedem button
                $button.attr("id", oid)
                //hier machen wir ein onclick button 
                $button.on("click", function () {
                    //hier fragen wir auf die id von dem button
                    let $btn_oid = $(this).attr("id");
                    //hier verstecken wir alle tabellen
                    $(".table").hide();
                    //hier zeigen wir nur die Tabelle mit dem gleichen oid wir das download der geclick wurde
                    $("#table" + $btn_oid).show();
                    //hier verstecken wir den footer, damit es nicht auf dem pdf steht
                    $("#footer").hide();
                    //window print ist ein browser einstellung die das möglichkeit gibt die seit zu drucken
                    window.print()
                    //wenn der user dass pdf erzeugt hat und gespeichert hat dann wird er wieder alle viewVerlauf geschickt wo da wieder alle verlaufe sehen kann.
                    window.location = "viewVerlauf.html";
                })
                dataRow2.append($('<td>').append($button.append('<i class="fa fa-download"></i>Download</button>')));
                dataRow2.append($('<td>').text(""));
                dataRow2.append($('<td>').text(""));
                dataRow2.append($('<td>').text(""));
                dataRow2.append($('<td>').append('<b>' + 'Summe:' + '</b>'));
                dataRow2.append($('<td>').append('<b>' + gesamtpreis + '€' + '</b>'));
                $(table).append(dataRow2);
                $(table).attr('id', "table" + oid);

            }
        } else {
            //wir eine response.success == false habe dann wird der User auf index.html geschickt
            window.location = "index.html"
        }
    },

    error: function () {
        $('.error').append('<center><div class="alert alert-danger" role="alert" style="width:50%;">The data could not be loaded! :(</div></center>');
    }
};

$.ajax(config);




