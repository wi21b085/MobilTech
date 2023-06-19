$(document).ready(function () {

    // überprüfe ob Admin die Seite aufruft
    $.ajax({
        url: "../../backend/logic/requestHandler.php",
        type: "GET",
        dataType: "json",
        data: {
            method: "checkAdmin",
        },
        success: function (response) {
            console.log(response);

            if (response.admin == true) { // wenn admin eingeloggt dann erstelle Tabelle zum Bearbeiten
                createTables()
            } else { // ansonsten geh zu index
                window.location = "index.html"
            }
        },

        error: function () {
            $('main').append('<center><div class="alert alert-danger" role="alert" style="width:50%;">The data could not be loaded! :(</div></center>');
        }
    });

    function createTables() { // Tabellen werden aus sessionStorage-Daten des Customers erstellt
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
                // Überschriften für jede neue Bestellung erzeugen,
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
    // Bei jeder neuen Bestellung die Bestellzeilen einfügen, Daten sind aus verlauf-Tabelle in sessionStorage zwischengespeichert
    function ladeVerlauf(verlauf, oid, count) { //
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

    function createRow(oid, table, gesamtpreis) { // Summenzeile wird erstellt

        let dataRow2 = $('<tr class="test">').appendTo($('#' + oid));
        dataRow2.append($('<td>').text(""));
        dataRow2.append($('<td>').text(""));
        dataRow2.append($('<td>').text(""));

        // button Bearbeiten hier erstellt:
        let span = $("<span>")
        span.attr("class", "btn btn-info");
        span.on("click", function () {
            if (span.text() == "Speichern") {
                let mengen = "";
                $('.mengeInput' + oid).each(function (i, obj) {
                    let vl = $(obj).val();
                    mengen += $(obj).parent().attr("id") + ":" + vl + ",";
                    $(obj).parent().attr("value", vl);
                    $(obj).parent().text(vl);
                });
                mengen = mengen.slice(0, -1);
                console.log(JSON.stringify(mengen))

                speichern(oid, mengen); // führe ajax call aus, sobald auf Speichern geklickt wird

                span.text("Bearbeiten")
                span.attr("class", "btn btn-info");
            } else if (span.text() == "Bearbeiten") {
                $('.menge' + oid).each(function (i, obj) {
                    $(obj).text("")
                    $(obj).append('<input type="number" min="0" oninput="this.value = !!this.value && Math.abs(this.value) >= 0 ? Math.abs(this.value) : null" id="mengeInput' + oid + '" class="borderless-input mengeInput' + oid + '" value="' + $(obj).attr("value") + '">');
                    // Quelle für oninput-Attribut code: https://stackoverflow.com/posts/46039201/revisions
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

    function speichern(oid, mengen) { // Senden der aktualisierten Bestell-Mengen an Backend
        $.ajax({
            url: "../../backend/logic/requestHandler.php",
            type: "POST",
            data: {
                method: "adminVerlauf",
                param: JSON.stringify({
                    oid: oid,
                    mengen
                })
            },
            dataType: "json",
            success: function (response) {
                console.log(response.success)
                if (response.success == true) {
                    // zweiter Ajax-Call sobald das Update erfolgreich war, um die sessionStorage-Daten zu aktualisieren
                    $.ajax({
                        url: "../../backend/logic/requestHandler.php",
                        type: "POST",
                        data: {
                            method: "viewVerlauf",
                            param: {
                                username: sessionStorage.getItem("user")
                            }
                        },
                        success: function (response) {
                            console.log(response.success)
                            if (response.success !== false) {
                                sessionStorage.setItem("order", JSON.stringify(response))
                                window.location.reload(); 

                            } else {
                                alert("Fehler beim Speichern!")
                            }
                        },
                        error: function (error) {
                            console.log("Error on Submitting")
                            console.log(error)
                            alert("Fehler beim ändern der Bestellung!")
                        }
                    });
                }
            },
            error: function (error) {
                console.log("Error on POST of editing Order")
                console.log(error)
                alert("Error on changing Order")
            }
        })
    }

})