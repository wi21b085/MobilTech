$(document).ready(function () {

    let url = "../../backend/logic/requestHandler.php";

    let config = {
        url: url,
        type: "GET",
        dataType: "json",
        data: {
            method: "checkAdmin",
        },
        success: function (response) {
            console.log(response);

            if (response.admin == true) { // wenn admin eingeloggt dann erstelle Tabelle zum Bearbeiten
                createTables()
            } else {
                window.location = "index.html"
            }
        },

        error: function () {
            $('.error').append('<center><div class="alert alert-danger" role="alert" style="width:50%;">The data could not be loaded! :(</div></center>');
        }
    };

    $.ajax(config);

    function createTables() {
        var response = JSON.parse(sessionStorage.getItem("order"));
        if (response == null)
            window.location = "index.html";
        let oid = 0;
        let gesamtpreis = 0;
        let table = null;
        let count = 1;
        for (let i in response) {
            let verlauf = response[i];
            console.log(verlauf);

            if (verlauf.order_id !== oid) {
                if (oid != 0) {
                    createRow(oid, table, gesamtpreis)
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
                count = 1;
            }

            gesamtpreis += verlauf.preis_produkt * verlauf.menge_produkt;
            ladeVerlauf(verlauf, oid, count);
            count++;
        }

        if (oid != 0) {
            createRow(oid, table, gesamtpreis)
        }
    }

    function ladeVerlauf(verlauf, oid, count) {
        if (verlauf.order_id == oid) {
            dataRow = $('<tr>').appendTo($('#' + oid));
            dataRow.append($('<td>').text(verlauf.datum));
            dataRow.append($('<td>').text(verlauf.order_id));
            dataRow.append($('<td>').text(verlauf.produkt_name));
            dataRow.append($('<td class="menge' + oid + ' m' + count + '" id="' + verlauf.verlauf_id + '" value="' + verlauf.menge_produkt + '">').text(verlauf.menge_produkt));
            dataRow.append($('<td>').text("€" + verlauf.preis_produkt));
            dataRow.append($('<td>').text("€" + verlauf.preis_produkt * verlauf.menge_produkt));
        }
    }

    function createRow(oid, table, gesamtpreis) {

        let dataRow2 = $('<tr class="test">').appendTo($('#' + oid));
        dataRow2.append($('<td>').text(""));
        dataRow2.append($('<td>').text(""));
        dataRow2.append($('<td>').text(""));

        // button Bearbeiten hier erstellt:
        let span = $("<span>")
        span.attr("class", "btn btn-info");
        span.on("click", function () {
            if (span.text() == "Speichern") {
                let mengen = [];
                $('.mengeInput' + oid).each(function (i, obj) {
                    let vl = $(obj).val();
                    // let menge = [];
                    // menge.push()
                    mengen.push("{" + $(obj).parent().attr("id") + ":" + vl + "}");
                    $(obj).parent().attr("value", vl);
                    $(obj).parent().text(vl);
                });
                console.log(JSON.stringify(mengen))

                bearbeiten(oid, mengen);

                span.text("Bearbeiten")
                span.attr("class", "btn btn-info");
            } else if (span.text() == "Bearbeiten") {
                $('.menge' + oid).each(function (i, obj) {
                    $(obj).text("")
                    $(obj).append('<input type="number" id="mengeInput' + oid + '" class="borderless-input mengeInput' + oid + '" value="' + $(obj).attr("value") + '">');
                });

                span.text("Speichern");
                span.attr("class", "btn btn-success");
            }
        })
        let td = $('<td>');
        dataRow2.append(td);
        td.append(span.text("Bearbeiten"));

        dataRow2.append($('<td>').append('<b>' + 'Summe:' + '</b>'));
        dataRow2.append($('<td>').append('<b>€' + gesamtpreis + '</b>'));

        $(table).append(dataRow2);
    }

    function bearbeiten(oid, mengen) {
        $.ajax({
            url: "../../backend/logic/requestHandler.php",
            type: "POST",
            data: {
                method: "adminVerlauf.php",
                param: JSON.stringify({
                    vid: oid,
                    mengen: mengen
                })
            },
            dataType: "json",
            success: function (response) {
                console.log(response.success)
                window.location.reload()
            },
            error: function (error) {
                console.log("Error on POST of editing Order")
                console.log(error)
                alert("Error on changing Order")
            }
        })
    }

})