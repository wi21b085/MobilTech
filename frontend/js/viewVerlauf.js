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



let config_user = {
    url: "../../backend/logic/requestHandler.php",
    type: "GET",
    dataType: "json",
    data: {
        method: "kassa"
    },
    success: function (response) {
        if (response.id !== "false") {
            userdaten(response);
            console.log(response)
        } else {
            window.location = "login.html"
            console.log(response)
        }
    },
    error: function () {
        $('.error').append('<center><div class="alert alert-danger" role="alert" style="width:50%;">The data could not be loaded! :(</div></center>');
    }
};

$.ajax(config_user);


function userdaten(response) {
    $('#vorname').html('Vorname: ' + response.vorname);
    $('#nachname').html('Nachname: ' + response.nachname);
    $('#email').html('Email: ' + response.email);
    $('#adresse').html('Adresse: ' + response.adresse);
    $('#plz').html('PLZ: ' + response.plz);
    $('#ort').html('Stadt: ' + response.ort);
}


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

        if (response.success !== false) {
            let oid = 0;
            let gesamtpreis = 0;
            let table = null;
            for (let i in response) {
                let verlauf = response[i];
                console.log(verlauf);

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
                            window.print()
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

                    oid = verlauf.order_id
                    gesamtpreis = 0;
                    table = $('<table>').addClass('table table-striped');
                    let thead = $('<thead>').appendTo(table);
                    let headerRow = $('<tr>').appendTo(thead);
                    headerRow.append($('<th>').text('DATUM'));
                    headerRow.append($('<th>').text('ORDER_ID'));
                    headerRow.append($('<th>').text('PRODUKT'));
                    headerRow.append($('<th>').text('MENGE'));
                    headerRow.append($('<th>').text('PREIS'));
                    headerRow.append($('<th>').text('PREIS * STÜCK'));
                    table.append($('<tbody id=' + verlauf.order_id + '></tbody>'));

                    $('#viewVerlaufTable').append(table);
                }

                gesamtpreis += verlauf.preis_produkt * verlauf.menge_produkt;
                ladeVerlauf(verlauf, oid);
            }

            if (oid != 0) {
                let dataRow2 = $('<tr class="test">').appendTo($('#' + oid));
                let $button = $('<button>')
                $button.attr("class", "btn download")
                $button.attr("id", oid)
                $button.on("click", function () {
                    let $btn_oid = $(this).attr("id");
                    $(".table").hide();
                    $("#table" + $btn_oid).show();
                    window.print()
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
            window.location = "index.html"
        }
    },

    error: function () {
        $('.error').append('<center><div class="alert alert-danger" role="alert" style="width:50%;">The data could not be loaded! :(</div></center>');
    }
};

$.ajax(config);




